import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

export interface McpServerConfig {
  name: string;
  version: string;
  description?: string;
  /** MCP server capabilities to advertise (e.g. `{ logging: {} }` to enable notifications/message). */
  capabilities?: Record<string, Record<string, unknown>>;
}

export function createMcpServer(config: McpServerConfig): McpServer {
  return new McpServer(
    {
      name: config.name,
      version: config.version,
      description: config.description,
    },
    config.capabilities ? { capabilities: config.capabilities } : undefined,
  );
}
