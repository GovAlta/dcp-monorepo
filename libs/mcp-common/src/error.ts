export interface ToolErrorResult {
  [x: string]: unknown;
  content: [{ type: 'text'; text: string }];
  isError: true;
}

export function toolError(err: unknown): ToolErrorResult {
  const message = err instanceof Error ? err.message : String(err);
  console.error('[mcp-common] Tool error:', message);
  return {
    content: [{ type: 'text', text: JSON.stringify({ error: message }) }],
    isError: true,
  };
}
