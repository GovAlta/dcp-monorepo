# mcp-common

Shared library for MCP (Model Context Protocol) server infrastructure in the DCP monorepo.

Provides transport abstraction (stdio/HTTP), rate limiting, error handling, logging, and server factory utilities for building AI-native knowledge bases and tools.

## Overview

`mcp-common` is a utility library that handles the infrastructure complexity of MCP server development, allowing server implementations to focus on business logic.

## Key Features

### Transport Abstraction
- **Stdio Transport**: For local client connections and development
- **HTTP Transport**: For remote clients with optional authentication and session management
- Automatic transport selection via `MCP_TRANSPORT` environment variable

### Server Factory Pattern
- Creates isolated server instances per HTTP session
- Prevents "Already connected to a transport" errors
- Enables stateless HTTP server design

### Rate Limiting
- Basic rate limiter with configurable thresholds
- Keyed rate limiter for per-user or per-resource limits
- Prevents tool abuse and resource exhaustion

### Logging & Audit Trail
- Structured JSON logging for machine parsing
- Built-in audit emitters for compliance tracking
- Correlation ID support for request tracing
- Customizable log levels and output

### Error Handling
- Standardized tool error responses
- Proper MCP error format compliance
- Helpful error messages for debugging

## Core Exports

### Server Creation
```typescript
createMcpServer(config)    // Create an MCP server with capabilities
startServer(factory, opts) // Start server with stdio or HTTP transport
createHttpApp(factory)     // Get Express app for custom HTTP setup
```

### Utilities
```typescript
RateLimiter              // Basic rate limiter
KeyedRateLimiter         // Rate limiter with key support
toolError()              // Create standardized error responses
withLogging()            // Decorator for tool logging
```

### Logging
```typescript
StructuredJsonLogger        // JSON logger instance
ConsoleAuditEmitter         // Console-based audit emitter
McpNotificationLogger       // MCP notification logger
createCorrelationId()       // Generate correlation IDs
```

## Usage Example

```typescript
import {
  createMcpServer,
  startServer,
  RateLimiter,
  StructuredJsonLogger,
  ConsoleAuditEmitter,
  withLogging,
} from '@dcp-monorepo/mcp-common';

const logger = new StructuredJsonLogger();
const rateLimiter = new RateLimiter();
const auditEmitter = new ConsoleAuditEmitter(logger);

const createServer = () => {
  const server = createMcpServer({
    name: 'my-server',
    version: '1.0.0',
    capabilities: { logging: {} },
  });

  server.tool('my-tool', 'A tool', { arg: z.string() }, 
    withLogging('my-tool',
      async (args) => {
        rateLimiter.check();
        return { content: [{ type: 'text', text: 'Done' }] };
      },
      { namespace: 'my-server', emitters: [auditEmitter], stderrLogger: logger }
    )
  );

  return server;
};

await startServer(createServer);
```

## Transport Options

### Stdio Transport (Default)
```bash
npx nx serve my-mcp-server
# Or explicitly:
MCP_TRANSPORT=stdio npx nx serve my-mcp-server
```

### HTTP Transport
```bash
MCP_TRANSPORT=http npx nx serve my-mcp-server
# Default port: 3000, endpoint: /mcp
# Custom port:
PORT=3001 MCP_TRANSPORT=http npx nx serve my-mcp-server
```

### HTTP with Authentication
```typescript
await startServer(createServer, {
  transport: 'http',
  authenticate: async (req) => {
    // Verify token and return auth context
    return { userId: 'user123' };
  },
  onHealthCheck: () => ({ status: 'healthy' }),
});
```

## Architecture

### Transport Layer
- **stdio**: Uses SDK's `StdioServerTransport`
- **HTTP**: Uses SDK's `StreamableHTTPServerTransport` with Express middleware

### Session Management (HTTP)
- 30-minute idle session TTL
- Automatic cleanup of expired sessions
- Garbage collection every 60 seconds

### Error Handling
- Tool errors are wrapped in MCP protocol format
- Rate limit errors return proper MCP error responses
- Logging includes correlation IDs for tracing

## Conventions

- Tools should call `rateLimiter.check()` at the start
- Use `withLogging()` decorator for automatic logging
- Return tool results in MCP content format
- Implement proper error handling with `toolError()`
