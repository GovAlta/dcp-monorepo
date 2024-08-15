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