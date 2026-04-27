/**
 * GoA Design System MCP Server
 *
 * Migrated to dcp-monorepo, using mcp-common for transport and server infrastructure.
 *
 * 2 focused tools:
 * - search: Find components, patterns, concepts, examples
 * - get: Get specific item details by ID
 *
 * Philosophy: Rich data, simple tools. The quality of knowledge determines output quality.
 */

import {
  createMcpServer,
  startServer,
  toolError,
  RateLimiter,
  StructuredJsonLogger,
  ConsoleAuditEmitter,
  withLogging,
} from '@dcp-monorepo/mcp-common';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type {
  McpServerFactory,
  WithLoggingOptions,
} from '@dcp-monorepo/mcp-common';
import { z } from 'zod';
import { DataLoader } from './data-loader';

const logger = new StructuredJsonLogger();
const rateLimiter = new RateLimiter();
const auditEmitter = new ConsoleAuditEmitter(logger);

async function main() {
  const dataLoader = new DataLoader();
  await dataLoader.initialize();

  const itemCount = dataLoader.getStats().totalItems;

  const loggingOptions = {
    namespace: 'design-system-mcp',
    emitters: [auditEmitter],
    stderrLogger: logger,
  };

  // Factory: each HTTP session gets its own McpServer instance with
  // tools registered, avoiding "Already connected to a transport" errors.
  const createServer: McpServerFactory = () => {
    const server = createMcpServer({
      name: 'goa-design-system-mcp',
      version: '2.0.0',
      description:
        'AI-native knowledge base for the Government of Alberta Design System. Provides component details, patterns, and implementation examples.',
      capabilities: { logging: {} },
    });

    registerTools(server, dataLoader, loggingOptions);
    return server;
  };

  // ── Start server ──────────────────────────────────────────────────────
  await startServer(createServer, {
    onHealthCheck: () => ({
      name: 'goa-design-system-mcp',
      version: '2.0.0',
      itemsLoaded: itemCount,
    }),
  });

  logger.info(
    'server',
    `GoA Design System MCP v2.0 ready (${itemCount} items loaded)`,
  );
}

function registerTools(
  server: McpServer,
  dataLoader: DataLoader,
  loggingOptions: WithLoggingOptions,
) {
  server.tool(
    'search',
    `Search GoA Design System knowledge. Find components, patterns, concepts, and examples.

Use for:
- Finding components: "button", "form input", "table"
- Finding patterns: "dashboard layout", "form wizard", "data table"
- Finding concepts: "citizen vs worker", "accessibility", "spacing"
- Finding examples: "login form", "case management", "file upload"

Returns matching items with relevance scores.`,
    {
      query: z.string().describe("What you're looking for"),
      type: z
        .enum(['component', 'pattern', 'concept', 'example', 'system'])
        .optional()
        .describe('Filter by type'),
      limit: z
        .number()
        .optional()
        .default(10)
        .describe('Max results (default: 10)'),
    },
    withLogging(
      'search',
      async (args: { query: string; type?: string; limit?: number }) => {
        rateLimiter.check();
        const { query, type, limit = 10 } = args;
        const results = await dataLoader.search(query, {
          type,
          maxResults: limit,
        });

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  query,
                  count: results.length,
                  results: results.map((r) => ({
                    id: r.id,
                    type: r.type,
                    name: r.name || r.id,
                    summary: r.summary,
                    score: r.score,
                    preview: r.preview,
                  })),
                  tip:
                    results.length === 0
                      ? `No matches for "${query}". Try simpler terms or different type filter.`
                      : `Use 'get' tool with an id to see full details.`,
                },
                null,
                2,
              ),
            },
          ],
        };
      },
      loggingOptions,
    ),
  );

  server.tool(
    'get',
    `Get complete details for a specific item by ID.

Use after searching to get full details:
- Component: "button", "input", "table", "modal"
- Pattern: "dashboard-page", "list-page", "form-wizard"
- Concept: "user-types", "accessibility", "service-types"
- Example: "login-form", "case-detail", "file-upload"

Returns the complete item data including all properties, examples, and guidance.`,
    {
      id: z.string().describe('Item ID (from search results or known name)'),
    },
    withLogging(
      'get',
      async (args: { id: string }) => {
        rateLimiter.check();
        const { id } = args;
        const item = dataLoader.get(id);

        if (!item) {
          const suggestions = await dataLoader.search(id, { maxResults: 5 });
          return toolError(
            new Error(
              `Item '${id}' not found. ` +
                (suggestions.length > 0
                  ? `Did you mean: ${suggestions.map((s) => s.id).join(', ')}?`
                  : 'Use search to find available items.'),
            ),
          );
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(item, null, 2),
            },
          ],
        };
      },
      loggingOptions,
    ),
  );
}

main().catch((error) => {
  logger.error('server', `Server failed to start: ${error}`);
  process.exit(1);
});
