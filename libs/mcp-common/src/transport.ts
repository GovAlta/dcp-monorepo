import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import type { Server } from 'http';

const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes idle timeout
const CLEANUP_INTERVAL_MS = 60 * 1000; // sweep every 60 seconds

/**
 * Result of a successful authentication.
 * Consumers define their own shape; mcp-common is agnostic.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthResult {
  [key: string]: unknown;
}

/**
 * Factory that creates a fully-configured McpServer instance.
 * Called once per HTTP session so each transport gets its own server.
 */
export type McpServerFactory = () => McpServer;

export interface StartServerOptions {
  port?: number;
  transport?: 'stdio' | 'http';

  /**
   * Optional authentication callback for HTTP transport.
   * Called on every `/mcp` request. Must resolve with caller identity
   * or throw to reject the request with 401.
   * If not provided, HTTP transport runs unauthenticated.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticate?: (req: Request) => Promise<any>;

  /**
   * Optional hook to enrich the `/health` endpoint response.
   * The returned object is merged into `{ status: 'ok' }`.
   */
  onHealthCheck?: () => Record<string, unknown>;

  /**
   * If provided, served at `/.well-known/oauth-protected-resource`
   * per RFC 9728 (OAuth 2.0 Protected Resource Metadata).
   */
  protectedResourceMetadata?: Record<string, unknown>;

  /**
   * Value for `WWW-Authenticate` header on 401 responses.
   * Only used when `authenticate` is provided.
   * Example: `Bearer resource_metadata="https://example.com/.well-known/oauth-protected-resource"`
   */
  wwwAuthenticate?: string;
}

/**
 * Start the MCP server.
 *
 * Requires a factory function that creates a fresh McpServer per session.
 * For HTTP each session gets its own instance; for stdio the factory is
 * called once for the single transport.
 */
export async function startServer(
  serverFactory: McpServerFactory,
  options?: StartServerOptions,
): Promise<void> {
  const transport =
    options?.transport ??
    (process.env['MCP_TRANSPORT'] as 'stdio' | 'http') ??
    'stdio';

  if (transport === 'http') {
    await startHttpTransport(serverFactory, options);
  } else {
    await startStdioTransport(serverFactory());
  }
}

async function startStdioTransport(server: McpServer): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`[mcp-common] Server running on stdio`);
}

interface SessionEntry {
  server: McpServer;
  transport: StreamableHTTPServerTransport;
  lastActivity: number;
}

interface HttpAppResult {
  app: ReturnType<typeof express>;
  cleanup: () => void;
}

/**
 * Build the Express app with CORS, health, optional auth, and MCP routes.
 * Exported for testability. Does NOT listen — call `app.listen()` yourself
 * or use `startServer()` which handles listening and graceful shutdown.
 *
 * Requires a McpServerFactory so each HTTP session gets its own server
 * instance, preventing "Already connected to a transport" errors when
 * clients reconnect or multiple clients connect concurrently.
 */
export function createHttpApp(
  serverFactory: McpServerFactory,
  options?: StartServerOptions,
): HttpAppResult {

  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // ── CORS ────────────────────────────────────────────────────────────────
  app.use((_req, res, next) => {
    const allowedOrigin = process.env['CORS_ORIGIN'] ?? '*';
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Content-Type, mcp-session-id',
    );
    res.setHeader('Access-Control-Expose-Headers', 'mcp-session-id');
    if (_req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });

  const sessions = new Map<string, SessionEntry>();

  // ── Session TTL cleanup ─────────────────────────────────────────────────
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [id, entry] of sessions) {
      if (now - entry.lastActivity > SESSION_TTL_MS) {
        console.error(`[mcp-common] Cleaning up idle session ${id}`);
        // Remove from map FIRST to prevent re-entrant onclose → close loop
        sessions.delete(id);
        entry.server.close?.();
      }
    }
  }, CLEANUP_INTERVAL_MS);
  cleanupTimer.unref();

  function touchSession(sessionId: string): void {
    const entry = sessions.get(sessionId);
    if (entry) entry.lastActivity = Date.now();
  }

  // ── RFC 9728: Protected Resource Metadata ─────────────────────────────
  if (options?.protectedResourceMetadata) {
    const metadata = options.protectedResourceMetadata;
    app.get('/.well-known/oauth-protected-resource', (_req, res) => {
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.status(200).json(metadata);
    });
  }

  // ── Health (public, no auth) ────────────────────────────────────────────
  app.get('/health', (_req, res) => {
    const base = { status: 'ok' };
    const extra = options?.onHealthCheck?.() ?? {};
    res.status(200).json({ ...base, ...extra });
  });

  // ── Auth middleware for /mcp routes ──────────────────────────────────────
  if (options?.authenticate) {
    const authenticate = options.authenticate;
    const wwwAuth = options.wwwAuthenticate;

    app.use('/mcp', async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authResult = await authenticate(req);
        // Store auth result for downstream consumers via res.locals
        res.locals['authResult'] = authResult;
        next();
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        // Only send WWW-Authenticate when no credentials were provided at all.
        if (wwwAuth && !req.headers['authorization']) {
          res.setHeader('WWW-Authenticate', wwwAuth);
        }
        res.status(401).json({ error: 'Unauthorized', message });
      }
    });
  }

  app.post('/mcp', async (req, res) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    let transport: StreamableHTTPServerTransport;

    if (sessionId && sessions.has(sessionId)) {
      transport = (sessions.get(sessionId) as SessionEntry).transport;
      touchSession(sessionId);
    } else {
      const newSessionId = randomUUID();
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => newSessionId,
        onsessioninitialized: (id) => {
          sessions.set(id, {
            server: sessionServer,
            transport,
            lastActivity: Date.now(),
          });
        },
      });

      transport.onclose = () => {
        const id = [...sessions.entries()].find(
          ([, e]) => e.transport === transport,
        )?.[0];
        if (id) {
          // Remove from map FIRST to prevent re-entrant close loop:
          // server.close() → transport.close() → onclose → server.close() …
          const entry = sessions.get(id);
          sessions.delete(id);
          entry?.server.close?.();
        }
      };

      // Each session gets its own McpServer to avoid
      // "Already connected to a transport" errors on reconnect.
      const sessionServer = serverFactory();
      await sessionServer.connect(transport);
    }

    await transport.handleRequest(req, res, req.body);
  });

  app.get('/mcp', async (req, res) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (!sessionId || !sessions.has(sessionId)) {
      res.status(400).json({ error: 'Invalid or missing session ID' });
      return;
    }
    touchSession(sessionId);
    const transport = (sessions.get(sessionId) as SessionEntry).transport;
    await transport.handleRequest(req, res);
  });

  app.delete('/mcp', async (req, res) => {
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    if (!sessionId || !sessions.has(sessionId)) {
      res.status(400).json({ error: 'Invalid or missing session ID' });
      return;
    }
    const entry = sessions.get(sessionId) as SessionEntry;
    // Remove from map FIRST to prevent re-entrant onclose → close loop
    sessions.delete(sessionId);
    await entry.transport.handleRequest(req, res);
  });

  const cleanup = () => {
    clearInterval(cleanupTimer);
    for (const [id, entry] of sessions) {
      // Remove from map FIRST to prevent re-entrant onclose → close loop
      sessions.delete(id);
      entry.server.close?.();
    }
  };

  return { app, cleanup };
}

async function startHttpTransport(
  serverFactory: McpServerFactory,
  options?: StartServerOptions,
): Promise<void> {
  const resolvedPort =
    options?.port ?? parseInt(process.env['PORT'] ?? '3000', 10);
  const { app, cleanup } = createHttpApp(serverFactory, options);

  return new Promise((resolve) => {
    const httpServer: Server = app.listen(resolvedPort, () => {
      const authMode = options?.authenticate
        ? 'authenticated'
        : 'unauthenticated';
      console.error(
        `[mcp-common] Server running on http://localhost:${resolvedPort} (POST /mcp, GET /health) [${authMode}]`,
      );
      resolve();
    });

    // ── Graceful shutdown ───────────────────────────────────────────────
    function shutdown() {
      console.error('[mcp-common] Shutting down gracefully…');
      cleanup();
      httpServer.close(() => {
        console.error('[mcp-common] Server closed');
        process.exit(0);
      });
      // Force exit if drain takes too long
      setTimeout(() => process.exit(1), 5000).unref();
    }

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  });
}
