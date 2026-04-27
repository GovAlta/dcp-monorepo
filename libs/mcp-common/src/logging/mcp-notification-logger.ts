import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { LoggingLevel } from './types';

/**
 * Sends structured log notifications to connected MCP clients via the
 * protocol's `notifications/message` mechanism (MCP 2025-11-25 spec).
 *
 * The SDK automatically:
 *  - Handles `logging/setLevel` requests from clients
 *  - Filters notifications below the client's requested level
 *  - No-ops gracefully when no client is connected
 */
export class McpNotificationLogger {
  constructor(private readonly server: McpServer) {}

  /**
   * Send a log notification to the connected MCP client.
   *
   * @param level   RFC 5424 severity level
   * @param logger  Logger name (use tool name or component, e.g. "search_documents", "server")
   * @param data    Any JSON-serializable value — per MCP spec §4.2
   */
  async send(
    level: LoggingLevel,
    logger: string,
    data: unknown,
  ): Promise<void> {
    try {
      await this.server.sendLoggingMessage({ level, logger, data });
    } catch {
      // Swallow — client may have disconnected or transport may not support notifications.
      // Avoid cascading failures from the logging channel itself.
    }
  }
}
