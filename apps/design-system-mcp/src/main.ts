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
 *
 * NOTE: tool surface tightening from Brief 22 is paused at design + impl checkpoint
 * pending Brief 19 (docs-site-as-source-of-truth pipe). End-to-end diagnostic
 * verification will happen with real guidance data after Brief 19 lands.
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
    `Search the GoA Design System. Good for discovery: describe what you're trying to build ("worker case-management tool") or name something fuzzy ("table with filters"). For known IDs, use \`get\` instead. Filters narrow what comes back.

collection: components | guidance | examples | productTypes
size (examples): interaction (single gesture) | section (card-level) | page (full screen) | task (start to finish) | product (entire app)
productType (examples): workspace | public-form
framework (examples): react | angular | web-components
status: published | draft | deprecated
component (guidance scoping): a component id like "goa-table"
context (guidance scoping): an example id like "case-detail"

Returns: { results: [{ id, collection, name, size?, productType?, summary, aliases }], next: { suggested_call, why } }`,
    {
      query: z.string().describe("What you're looking for"),
      collection: z
        .enum(['components', 'guidance', 'examples', 'productTypes'])
        .optional()
        .describe('Filter by content collection'),
      size: z
        .enum(['interaction', 'section', 'page', 'task', 'product'])
        .optional()
        .describe('Filter by size (examples only)'),
      productType: z
        .enum(['workspace', 'public-form'])
        .optional()
        .describe('Filter by product type (examples only)'),
      framework: z
        .enum(['react', 'angular', 'web-components'])
        .optional()
        .describe('Filter by framework support (examples only)'),
      status: z
        .enum(['published', 'draft', 'deprecated'])
        .optional()
        .describe('Filter by lifecycle status'),
      component: z
        .string()
        .optional()
        .describe("Scope guidance results to a component id like 'goa-table'"),
      context: z
        .string()
        .optional()
        .describe("Scope guidance results to an example context id like 'case-detail'"),
      limit: z
        .number()
        .optional()
        .default(10)
        .describe('Max results (default: 10)'),
    },
    withLogging(
      'search',
      async (args: {
        query: string;
        collection?: string;
        size?: string;
        productType?: string;
        framework?: string;
        status?: string;
        component?: string;
        context?: string;
        limit?: number;
      }) => {
        rateLimiter.check();
        const {
          query,
          collection,
          size,
          productType,
          framework,
          status,
          component,
          context,
          limit = 10,
        } = args;
        const results = await dataLoader.search(query, {
          collection,
          size,
          productType,
          framework,
          status,
          component,
          context,
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
                    collection: r.collection,
                    name: r.name || r.id,
                    summary: r.summary,
                    score: r.score,
                    aliases: r.aliases,
                  })),
                  next: buildSearchNext(results),
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
    `Fetch one item by ID or alias. Use for known IDs, or after \`search\` returns a high-confidence match. Aliases work too. Old slugs like "confirm-that-an-application-was-submitted" resolve to current entries ("result-page"). The response's resolved_via field tells you which path matched.

collection: components | guidance | examples | productTypes (recommended; resolution order without it: productTypes, components, examples, guidance)
detail: summary (default, ~1KB) | full (entire entry)

Returns: { id, collection, resolved_via, entry, related: { components, examples, guidance }, next: { suggested_calls } }`,
    {
      id: z
        .string()
        .describe('Item ID or alias (from search results or known name)'),
      collection: z
        .enum(['components', 'guidance', 'examples', 'productTypes'])
        .optional()
        .describe('Collection to disambiguate against (recommended)'),
      detail: z
        .enum(['summary', 'full'])
        .optional()
        .default('summary')
        .describe("Output detail level (default: 'summary')"),
    },
    withLogging(
      'get',
      async (args: {
        id: string;
        collection?: string;
        detail?: 'summary' | 'full';
      }) => {
        rateLimiter.check();
        const { id, collection, detail = 'summary' } = args;
        const result = dataLoader.get(id, { collection });

        if (!result) {
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

        const entry =
          detail === 'summary' ? toSummaryEntry(result.data) : result.data;

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  id: result.id,
                  collection: result.collection,
                  resolved_via: result.resolved_via,
                  entry,
                  related: buildGetRelated(
                    result.collection,
                    result.id,
                    result.data,
                    dataLoader,
                  ),
                  next: buildGetNext(result.collection, result.id, result.data),
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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toSummaryEntry(data: any): Record<string, unknown> {
  const summary: Record<string, unknown> = {
    name: data.componentName || data.name || data.patternName,
    summary: data.summary || data.description || data.purpose,
    status: data.status,
    size: data.size,
    productType: data.productType,
    aliases: data.aliases,
  };
  return Object.fromEntries(
    Object.entries(summary).filter(([, v]) => v !== undefined),
  );
}

/**
 * Build a hint for the most likely next call after a search response.
 */
function buildSearchNext(
  results: { id: string; score: number }[],
): { suggested_call: string; why: string } | undefined {
  if (results.length === 0) return undefined;
  if (results.length === 1) {
    return {
      suggested_call: `get({ id: '${results[0].id}' })`,
      why: 'Single match. Fetch the full entry.',
    };
  }
  return {
    suggested_call: `get({ id: '${results[0].id}' })`,
    why: `Top match (score ${results[0].score}). Fetch its full entry.`,
  };
}

/**
 * Build a hint for the most likely next call after a get response.
 */
function buildGetNext(
  collection: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): { suggested_calls: string[] } {
  const suggested_calls: string[] = [];

  if (collection === 'components') {
    suggested_calls.push(
      `search({ collection: 'guidance', component: '${id}' })`,
    );
  } else if (collection === 'examples') {
    if (
      Array.isArray(data.relatedPatterns) &&
      data.relatedPatterns.length > 0
    ) {
      suggested_calls.push(`get({ id: '${data.relatedPatterns[0]}' })`);
    }
  }

  return { suggested_calls };
}

/**
 * Build the related block for a get response.
 *
 * For components: relatedComponents and relatedExamples are read directly.
 * For examples: components are reverse-looked-up; relatedPatterns surface as examples.
 * Guidance is empty until PR #3771 ingests atoms; the field is present so
 * agents can rely on its shape.
 */
function buildGetRelated(
  collection: string,
  id: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  dataLoader: DataLoader,
): {
  components: { id: string }[];
  examples: { id: string }[];
  guidance: { id: string }[];
} {
  const components: { id: string }[] = [];
  const examples: { id: string }[] = [];

  if (collection === 'components') {
    if (Array.isArray(data.relatedComponents)) {
      data.relatedComponents.forEach((cid: string) =>
        components.push({ id: cid }),
      );
    }
    if (Array.isArray(data.relatedExamples)) {
      data.relatedExamples.forEach((eid: string) =>
        examples.push({ id: eid }),
      );
    }
  } else if (collection === 'examples') {
    dataLoader
      .findComponentsRelatedToExample(id)
      .forEach((cid) => components.push({ id: cid }));
    if (Array.isArray(data.relatedPatterns)) {
      data.relatedPatterns.forEach((pid: string) =>
        examples.push({ id: pid }),
      );
    }
  }

  return {
    components,
    examples,
    guidance: [], // pending PR #3771 atom ingestion
  };
}

main().catch((error) => {
  logger.error('server', `Server failed to start: ${error}`);
  process.exit(1);
});
