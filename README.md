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