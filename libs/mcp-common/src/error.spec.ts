import { toolError } from './error';

describe('toolError', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format an Error object', () => {
    const result = toolError(new Error('something failed'));
    expect(result.isError).toBe(true);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.error).toBe('something failed');
  });

  it('should format a string error', () => {
    const result = toolError('simple string error');
    expect(result.isError).toBe(true);
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.error).toBe('simple string error');
  });

  it('should format a non-string/non-Error value', () => {
    const result = toolError(42);
    const parsed = JSON.parse(result.content[0].text);
    expect(parsed.error).toBe('42');
  });

  it('should log to console.error', () => {
    toolError(new Error('logged'));
    expect(console.error).toHaveBeenCalledWith(
      '[mcp-common] Tool error:',
      'logged',
    );
  });
});
