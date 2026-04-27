import request from 'supertest';
import { createMcpServer } from './server';
import { createHttpApp } from './transport';
import type { StartServerOptions } from './transport';

function createTestServer() {
  return createMcpServer({
    name: 'test-server',
    version: '0.0.1',
  });
}

describe('createHttpApp', () => {
  describe('health endpoint', () => {
    it('returns { status: ok } by default', async () => {
      const server = createTestServer();
      const { app, cleanup } = createHttpApp(server);

      const res = await request(app).get('/health');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
      cleanup();
    });

    it('merges onHealthCheck output', async () => {
      const server = createTestServer();
      const options: StartServerOptions = {
        onHealthCheck: () => ({ documentsLoaded: 42, adspConnected: true }),
      };
      const { app, cleanup } = createHttpApp(server, options);

      const res = await request(app).get('/health');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 'ok',
        documentsLoaded: 42,
        adspConnected: true,
      });
      cleanup();
    });

    it('health is accessible without auth', async () => {
      const server = createTestServer();
      const options: StartServerOptions = {
        authenticate: async () => {
          throw new Error('should not be called');
        },
      };
      const { app, cleanup } = createHttpApp(server, options);

      const res = await request(app).get('/health');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      cleanup();
    });
  });

  describe('RFC 9728 metadata endpoint', () => {
    it('serves metadata when configured', async () => {
      const server = createTestServer();
      const metadata = {
        resource: 'http://localhost:3000/mcp',
        authorization_servers: ['https://auth.example.com'],
      };
      const { app, cleanup } = createHttpApp(server, {
        protectedResourceMetadata: metadata,
      });

      const res = await request(app).get(
        '/.well-known/oauth-protected-resource',
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual(metadata);
      expect(res.headers['cache-control']).toBe('public, max-age=3600');
      cleanup();
    });

    it('returns 404 when metadata not configured', async () => {
      const server = createTestServer();
      const { app, cleanup } = createHttpApp(server);

      const res = await request(app).get(
        '/.well-known/oauth-protected-resource',
      );

      expect(res.status).toBe(404);
      cleanup();
    });
  });

  describe('authentication', () => {
    it('allows /mcp requests when no authenticate callback', async () => {
      const server = createTestServer();
      const { app, cleanup } = createHttpApp(server);

      const res = await request(app)
        .post('/mcp')
        .send({ jsonrpc: '2.0', method: 'initialize', id: 1, params: {} });

      expect(res.status).not.toBe(401);
      cleanup();
    });

    it('rejects /mcp requests when authenticate throws', async () => {
      const server = createTestServer();
      const { app, cleanup } = createHttpApp(server, {
        authenticate: async () => {
          throw new Error('Invalid token');
        },
      });

      const res = await request(app)
        .post('/mcp')
        .send({ jsonrpc: '2.0', method: 'initialize', id: 1, params: {} });

      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Unauthorized');
      expect(res.body.message).toBe('Invalid token');
      cleanup();
    });

    it('sets WWW-Authenticate header on 401 when configured', async () => {
      const server = createTestServer();
      const { app, cleanup } = createHttpApp(server, {
        authenticate: async () => {
          throw new Error('bad');
        },
        wwwAuthenticate: 'Bearer realm="test"',
      });

      const res = await request(app).post('/mcp').send({});

      expect(res.status).toBe(401);
      expect(res.headers['www-authenticate']).toContain('Bearer');
      cleanup();
    });

    it('passes when authenticate resolves', async () => {
      const server = createTestServer();
      const { app, cleanup } = createHttpApp(server, {
        authenticate: async () => ({ clientId: 'test-client' }),
      });

      const res = await request(app)
        .post('/mcp')
        .send({ jsonrpc: '2.0', method: 'initialize', id: 1, params: {} });

      expect(res.status).not.toBe(401);
      cleanup();
    });

    it('extracts bearer token from Authorization header', async () => {
      let receivedHeader: string | undefined;
      const server = createTestServer();
      const { app, cleanup } = createHttpApp(server, {
        authenticate: async (req) => {
          receivedHeader = req.headers.authorization;
          return { clientId: 'test' };
        },
      });

      await request(app)
        .post('/mcp')
        .set('Authorization', 'Bearer test-tok')
        .send({ jsonrpc: '2.0', method: 'initialize', id: 1, params: {} });

      expect(receivedHeader).toBe('Bearer test-tok');
      cleanup();
    });
  });

  describe('CORS', () => {
    it('returns CORS headers on preflight', async () => {
      const server = createTestServer();
      const { app, cleanup } = createHttpApp(server);

      const res = await request(app).options('/mcp');

      expect(res.status).toBe(204);
      expect(res.headers['access-control-allow-origin']).toBe('*');
      expect(res.headers['access-control-allow-headers']).toContain(
        'Authorization',
      );
      cleanup();
    });
  });
});
