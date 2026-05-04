# Digital Content Platform (DCP)

DCP is a platform for digital content products. It includes shared libraries and micro-apps for rapid authoring and publishing of content with workflows for technical and non-technical writers.

This monorepo uses the [Nx](https://nx.dev) tool-stack with the [@nxtensions/astro](https://github.com/nxtensions/nxtensions) extension for [Astro](https://astro.build/) support.


## Getting started
The @nxtensions/astro extension generates projects that use targets matching the Astro CLI.

For example, use the following command to to run a project in a development server:
```
npx nx dev dcp-guide
```

This aligns to the `dev` Astro CLI command instead of the nx convention `serve` target. Similarly the `check` target is included, instead of the `lint` target, for static checks.

## Generating an astro starter app using pre-built generator

To generate an Astro app, use the following command, which utilizes a custom generator to create an Astro app starter kit and generate the necessary deployment files:

```
 npx nx run dcp-common:gen-astro --args="--title=app-title --integrations=react,mdx"
 ```
 
After executing the command, a basic Astro app structure will be set up in the "app/app-title" directory. You can proceed with customizing and developing your Astro app based on your specific requirements.

### Generating micro-apps on your own
@nxtensions/astro extension includes generators for applications and libraries.

Run the nx `list` command to see what is available:
```
npx nx list @nxtensions/astro
```

Run the `application` generator to create a new micro-app:
```
npx nx g @nxtensions/astro:application
```

### Adding custombuild command

The `buildcustom` target has been introduced to provide flexibility in adding custom post-build steps to the build process. This allows for tasks such as indexing the app for search to be executed after the build is complete.

Once the app is generated it is important to add this command to `project.json` file in our project. Otherwise the build will fail.

```javascript
"buildcustom": {
  "executor": "nx:run-commands",
  "dependsOn": [
    {
      "target": "build",
      "projects": "self"
    }
  ],
  "options": {
    "commands": []
  }
}
```

### Adding Custom Post-Build Steps

To add custom post-build steps, simply add commands to the commands array in the options section of the buildcustom target. For example:

```javascript
"buildcustom": {
  "executor": "nx:run-commands",
  "dependsOn": [
    {
      "target": "build",
      "projects": "self"
    }
  ],
  "options": {
    "commands": [
      "npx pagefind --site dist/apps/app_name"
    ]
  }
}
```

after the build is complete. It will start executing the commands under the `commands` array. In this case, it will index the site.

## Deployment

OpenShift manifests and deployments are maintained in source control and the pipeline automatically applies them during deployment stages. This is convention based and new applications can follow the existing files to adhere to conventions.

Application specific manifests and supporting files are maintained under `.openshift/<sub_project_name>` with a main template in `<sub_project_name>.yml`.

Apply the manifests for one environment to create the BuildConfig and ImageStream. For example:
```
oc login ...
oc process -f .openshift/dcp-guide/dcp-guide.yml -p PROJECT=dcp-dev -p DEPLOY_TAG=dev | oc apply -f -
```

Creation of resources in downstream environments is handled by the pipeline when promoting new builds.

## Accessing the deployed app

Upon app deployment, you can employ the provided URL structure to access it within specific environments. Please note that these URLs are exclusively accessible via an internal network.

dev:  https://{app_name}-dcp-dev.apps.aro.gov.ab.ca

uat:  https://{app_name}-dcp-uat.apps.aro.gov.ab.ca

prod:  https://{app_name}-dcp-prod.apps.aro.gov.ab.ca

As an illustration, to access the "common-capabilities" app within the development environment, you would use the following URL: https://common-capabilities-dcp-dev.apps.aro.gov.ab.ca

## Implementing Search component in your app

Refer to `digital-standards` app for example on the setup

### Overview

The Search component is a reusable feature that can be easily integrated into various apps within our ecosystem. To utilize this component, we need to follow a simple implementation process and add a crucial step to our build process.

### Implementation Steps

1. **Import the Search component**: Import the Search component into your app's codebase.

```javascript
import { Search as DCPSearch} from "@abgov/dcp-common"
```
    
2. **Use the Search component**: Use the Search component in your app's JSX/HTML.
```jsx
<DCPSearch title="Digital Standards"/>
```

### Build Process Update

To enable the Search component to function correctly, we need to add an additional step to our build process. After building the app, we need to index the site using Pagefind.

**Add the following command to your `buildcustom` step under `options.commands`**:
```bash
npx pagefind --site dist/apps/app_name
```
Replace `app_name` with the actual name of your app.

This command will index your app's site, making it searchable using the Search component after the build stage.

## Applications in this monorepo

This workspace contains multiple user-facing micro-apps and supporting APIs.

### Frontend applications

| Project | Tech | Purpose |
|---|---|---|
| `dcp-guide` | Astro + React islands | Introductory guide to the Digital Content Platform (DCP), including onboarding/tutorial-style content for teams. |
| `digital-playbook` | Astro + MDX | Digital Delivery Playbook content site for guidance, principles, stories, and team information. |
| `digital-standards` | Astro + React islands | Digital Service Standards microsite containing standards, principles, assessments, glossary, and related guidance. |
| `digital-marketplace` | Astro + React islands | Public-facing Alberta Digital Marketplace site with informational pages, contact flows, join forms, and supplier outreach content. |
| `digital-marketplace-int` | Astro + React island | Internal companion portal for marketplace operations (for example, exporting form submission data as CSV). |
| `common-capabilities` | Vite + React | Common Capabilities catalog and workflow app with pages for service listings, details, roadmap, ecosystem, support, and service add/update flows. |

### Backend/API applications

| Project | Tech | Purpose |
|---|---|---|
| `cc-api` | Node.js + Express (`@nx/esbuild`) | Gateway API for Common Capabilities features. Exposes `/cc/v1` routes and integrates with ADSP services (form, event, value), including cache refresh scheduling. |
| `dcp-proxy-api-int` | Node.js + Express (`@nx/esbuild`) | Integration proxy for marketplace form endpoints under `/marketplace/v1`, designed for internal integration scenarios. |
| `digital-marketplace-api` | Node.js + Express (`@nx/esbuild`) | Marketplace API gateway under `/marketplace/v1` supporting forms and bookings flows, including event/calendar integrations and optional reCAPTCHA handling. |

### End-to-end test projects

| Project | Purpose |
|---|---|
| `dcp-proxy-api-int-e2e` | Jest-based e2e test project for `dcp-proxy-api-int`. |
| `digital-marketplace-api-e2e` | Jest-based e2e test project for `digital-marketplace-api`. |

### Shared libraries/packages

| Project | Purpose |
|---|---|
| `libs/dcp-common` (`dcp-common`) | Reusable DCP UI/layout assets for microsites, including shared layout, header/footer, search component, and captcha component. Also includes a custom generator target (`gen-astro`) used to scaffold Astro starter apps. |
| `package/shared` (`shared`) | Small shared utility package used across workspace projects (for example, JSDOM polyfill helpers). |

## Architecture at a glance

- Content-oriented microsites are built primarily with Astro and React islands.
- Transactional or integration workloads are handled by Express APIs.
- APIs and frontends commonly integrate with Alberta Digital Service Platform (ADSP) services.
- Nx is used to orchestrate builds, checks, tests, and project-level task execution.

## MCP Server Support

The DCP monorepo includes Model Context Protocol (MCP) server infrastructure for building AI-native knowledge bases and tools. This enables seamless integration with Claude and other AI assistants.

### Common MCP Infrastructure

Shared MCP utilities are located in **`libs/mcp-common`**, which provides:

- **Transport Abstraction**: Support for both stdio and HTTP transports
- **Server Factory**: Creates MCP server instances with proper isolation
- **Rate Limiting**: Built-in rate limiter to prevent abuse
- **Logging & Audit**: Structured JSON logging with audit trails and correlation IDs
- **Error Handling**: Standardized error responses for tools

**Key exports from `libs/mcp-common`:**
```typescript
// Server creation
createMcpServer()           // Create an MCP server instance
startServer()               // Start with stdio or HTTP transport

// Utilities
RateLimiter                 // Rate limiting for tool calls
StructuredJsonLogger        // JSON-based logging
ConsoleAuditEmitter         // Audit event emission
withLogging()               // Decorator for tool logging
toolError()                 // Standard error responses
```

### MCP Applications

| Project | Purpose |
|---|---|
| `design-system-mcp` | AI-native knowledge base for GoA Design System with search and retrieval tools for components, patterns, and examples |

### Setting Up an MCP Server

#### 1. Create a new MCP app

Use the Nx generator to create a new Node.js application:

```bash
npx nx g @nx/node:app --name my-mcp-server --directory apps
```

#### 2. Add mcp-common as a dependency

Update `apps/my-mcp-server/project.json` to include the `build` target with proper configuration:

```json
{
  "targets": {
    "build": {
      "executor": "@nx/esbuild:esbuild",
      "options": {
        "platform": "node",
        "outputPath": "dist/apps/my-mcp-server",
        "format": ["cjs"],
        "main": "apps/my-mcp-server/src/main.ts",
        "tsConfig": "apps/my-mcp-server/tsconfig.app.json",
        "generatePackageJson": true
      }
    },
    "serve": {
      "executor": "@nx/js:node",
      "options": {
        "buildTarget": "my-mcp-server:build:development"
      }
    }
  }
}
```

#### 3. Implement the server

**`apps/my-mcp-server/src/main.ts`:**

```typescript
import {
  createMcpServer,
  startServer,
  RateLimiter,
  StructuredJsonLogger,
  ConsoleAuditEmitter,
  withLogging,
} from '@dcp-monorepo/mcp-common';
import type { McpServer, McpServerFactory } from '@dcp-monorepo/mcp-common';
import { z } from 'zod';

const logger = new StructuredJsonLogger();
const rateLimiter = new RateLimiter();
const auditEmitter = new ConsoleAuditEmitter(logger);

async function main() {
  const loggingOptions = {
    namespace: 'my-mcp-server',
    emitters: [auditEmitter],
    stderrLogger: logger,
  };

  // Factory creates a new server per HTTP session
  const createServer: McpServerFactory = () => {
    const server = createMcpServer({
      name: 'my-mcp-server',
      version: '1.0.0',
      description: 'My custom MCP server',
      capabilities: { logging: {} },
    });

    registerTools(server, loggingOptions);
    return server;
  };

  await startServer(createServer, {
    onHealthCheck: () => ({
      name: 'my-mcp-server',
      version: '1.0.0',
    }),
  });

  logger.info('server', 'MCP server started');
}

function registerTools(server: McpServer, loggingOptions: WithLoggingOptions) {
  server.tool(
    'my-tool',
    'Description of my tool',
    {
      input: z.string().describe('Tool input'),
    },
    withLogging(
      'my-tool',
      async (args: { input: string }) => {
        rateLimiter.check();
        // Your tool logic here
        return {
          content: [
            {
              type: 'text' as const,
              text: `Processed: ${args.input}`,
            },
          ],
        };
      },
      loggingOptions,
    ),
  );
}

main().catch((error) => {
  logger.error('server', `Server failed: ${error}`);
  process.exit(1);
});
```

### Running MCP Servers

#### Development (stdio transport)

```bash
npx nx serve design-system-mcp
```

This starts the server on stdio, suitable for local client testing.

#### Production (HTTP transport)

```bash
MCP_TRANSPORT=http npx nx serve design-system-mcp
# Server runs on http://localhost:3000/mcp by default
```

To specify a custom port:

```bash
MCP_TRANSPORT=http PORT=3001 npx nx serve design-system-mcp
```

#### With authentication (HTTP transport)

Update `startServer` options to include authentication:

```typescript
await startServer(createServer, {
  transport: 'http',
  authenticate: async (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Unauthorized');
    return { userId: 'verified-user' };
  },
  protectedResourceMetadata: {
    issuer: 'https://your-auth-provider',
  },
  wwwAuthenticate: 'Bearer realm="MCP"',
});
```

### Building for Deployment

```bash
npx nx build design-system-mcp
```

This generates a production bundle in `dist/apps/design-system-mcp/` with all dependencies included. The bundle can be deployed as a standalone Node.js application or containerized.

## Helpful project commands

Run a specific app in development:

```bash
npx nx dev dcp-guide
npx nx dev digital-standards
npx nx dev digital-marketplace
```

Run React/Vite app in development:

```bash
npx nx dev common-capabilities
```

Run API services locally:

```bash
npx nx serve cc-api
npx nx serve dcp-proxy-api-int
npx nx serve digital-marketplace-api
```

Run MCP servers locally:

```bash
npx nx serve design-system-mcp
```

Run tests/checks:

```bash
npx nx test dcp-proxy-api-int-e2e
npx nx test digital-marketplace-api-e2e
npx nx check dcp-guide
```