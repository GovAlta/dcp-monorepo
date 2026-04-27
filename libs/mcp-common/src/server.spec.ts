import { createMcpServer } from './server';

describe('createMcpServer', () => {
  it('should create a server with the given config', () => {
    const server = createMcpServer({
      name: 'test-server',
      version: '1.0.0',
      description: 'A test server',
    });
    expect(server).toBeDefined();
  });

  it('should create a server without description', () => {
    const server = createMcpServer({
      name: 'test-server',
      version: '0.1.0',
    });
    expect(server).toBeDefined();
  });

  it('should create a server with capabilities', () => {
    const server = createMcpServer({
      name: 'test-server',
      version: '1.0.0',
      capabilities: { logging: {} },
    });
    expect(server).toBeDefined();
  });
});
