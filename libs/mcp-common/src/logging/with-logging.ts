import type { AuditEmitter, AuditEvent, AuditEventActor } from './types';
import { StandardEventName } from './types';
import { createCorrelationId } from './correlation';
import { StructuredJsonLogger } from './technical-logger';
import { McpNotificationLogger } from './mcp-notification-logger';

// ─── Arg Redaction ────────────────────────────────────────────────────────────

const ENV_LOG_ARGS = process.env['GOA_LOG_ARGS'] === 'true';

/** Return arg keys only (values replaced with type names) unless full logging is enabled. */
function redactArgs(
  args: Record<string, unknown>,
  logArgs?: boolean,
): Record<string, unknown> {
  if (logArgs ?? ENV_LOG_ARGS) return args;
  const redacted: Record<string, unknown> = {};
  for (const key of Object.keys(args)) {
    redacted[key] = typeof args[key];
  }
  return redacted;
}

// ─── Console Emitter ──────────────────────────────────────────────────────────

/** Writes audit events as structured NDJSON to stderr via the shared logger. */
export class ConsoleAuditEmitter implements AuditEmitter {
  constructor(private readonly logger: StructuredJsonLogger) {}

  async emit(event: AuditEvent): Promise<void> {
    const level = event.result === 'error' ? 'error' : 'info';
    this.logger.write(
      level,
      `audit:${event.toolName}`,
      `${event.eventName} [${event.result}] ${event.durationMs}ms`,
      event.correlationId,
      {
        eventName: event.eventName,
        namespace: event.namespace,
        toolName: event.toolName,
        args: event.args,
        result: event.result,
        durationMs: event.durationMs,
        ...(event.actor ? { actor: event.actor } : {}),
        ...(event.metadata ? { metadata: event.metadata } : {}),
      },
    );
  }
}

// ─── withLogging Wrapper ──────────────────────────────────────────────────────

export interface WithLoggingConfig {
  logArgs?: boolean;
  adspEventsEnabled?: boolean;
}

export interface WithLoggingOptions {
  namespace: string;
  emitters: AuditEmitter[];
  stderrLogger: StructuredJsonLogger;
  mcpLogger?: McpNotificationLogger;
  /** Optional getter for runtime config (e.g. from a configuration service). */
  getConfig?: () => WithLoggingConfig | undefined;
}

/**
 * Higher-order function that wraps a tool handler with three-channel logging:
 *  1. MCP protocol notifications to connected clients
 *  2. Structured NDJSON to stderr
 *  3. Pluggable audit emitters (console, ADSP, etc.)
 *
 * The original handler's return value is passed through unmodified.
 */
export function withLogging<TArgs, TResult>(
  toolName: string,
  handler: (args: TArgs, extra: unknown) => Promise<TResult>,
  options: WithLoggingOptions,
  getActor?: (extra: unknown) => AuditEventActor | undefined,
): (args: TArgs, extra: unknown) => Promise<TResult> {
  const { namespace, emitters, stderrLogger, mcpLogger, getConfig } = options;

  return async (args: TArgs, extra: unknown): Promise<TResult> => {
    const config = getConfig?.();
    const correlationId = createCorrelationId();
    const timestamp = new Date().toISOString();
    const safeArgs = redactArgs(
      args as Record<string, unknown>,
      config?.logArgs,
    );
    const actor = getActor?.(extra);

    // ── Channel 1: MCP notification — tool invoked ────────────────────
    mcpLogger?.send('info', toolName, {
      event: StandardEventName.TOOL_INVOKED,
      correlationId,
      args: safeArgs,
    });

    // ── Channel 2: stderr — tool invoked ──────────────────────────────
    stderrLogger.info(
      toolName,
      `${StandardEventName.TOOL_INVOKED}`,
      correlationId,
      {
        args: safeArgs,
      },
    );

    const start = performance.now();
    let result: TResult;
    let eventName: string;
    let outcome: 'success' | 'error';

    try {
      result = await handler(args, extra);
      eventName = StandardEventName.TOOL_SUCCEEDED;
      outcome = 'success';
    } catch (err) {
      eventName = StandardEventName.TOOL_FAILED;
      outcome = 'error';

      const durationMs = Math.round(performance.now() - start);
      const errorMessage = err instanceof Error ? err.message : String(err);

      // ── Channels on failure ─────────────────────────────────────────
      mcpLogger?.send('error', toolName, {
        event: eventName,
        correlationId,
        durationMs,
        error: errorMessage,
      });

      stderrLogger.error(
        toolName,
        `${eventName}: ${errorMessage}`,
        correlationId,
        { durationMs },
      );

      const auditEvent: AuditEvent = {
        eventName,
        namespace,
        timestamp,
        correlationId,
        toolName,
        args: safeArgs,
        result: outcome,
        durationMs,
        actor,
        metadata: { error: errorMessage },
      };

      // Fire-and-forget emitters (skip ADSP if disabled via config)
      for (const emitter of emitters) {
        if (emitter.isADSP && config?.adspEventsEnabled === false) continue;
        emitter.emit(auditEvent).catch(() => {
          /* swallow */
        });
      }

      throw err; // Re-throw so the caller's error handling still works
    }

    const durationMs = Math.round(performance.now() - start);

    // ── Channels on success ─────────────────────────────────────────
    mcpLogger?.send('info', toolName, {
      event: eventName,
      correlationId,
      durationMs,
    });

    stderrLogger.info(toolName, `${eventName} ${durationMs}ms`, correlationId, {
      durationMs,
    });

    const auditEvent: AuditEvent = {
      eventName,
      namespace,
      timestamp,
      correlationId,
      toolName,
      args: safeArgs,
      result: outcome,
      durationMs,
      actor,
    };

    // Fire-and-forget emitters (skip ADSP if disabled via config)
    for (const emitter of emitters) {
      if (emitter.isADSP && config?.adspEventsEnabled === false) continue;
      emitter.emit(auditEvent).catch(() => {
        /* swallow */
      });
    }

    return result;
  };
}
