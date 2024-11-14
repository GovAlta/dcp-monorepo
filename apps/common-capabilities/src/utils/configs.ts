enum Environment {
  local = 'local',
  dev = 'dev',
  uat = 'uat',
  prod = 'prod'
}

type GatewayConfigs = {
  baseUrl: string;
}

type ServiceConfig = {
  [key in Environment]: {
    gateway: GatewayConfigs
  }
}

const serviceConfigs: ServiceConfig = {
  local: {
    gateway: {
      baseUrl: 'http://localhost:3333'
    }
  },
  dev: {
    gateway: {
      baseUrl: 'https://cc-api-dcp-dev.apps.aro.gov.ab.ca',
    }
  },
  uat: {
    gateway: {
      baseUrl: 'https://cc-api-dcp-uat.apps.aro.gov.ab.ca'
    }
  },
  prod: {
    gateway: {
      baseUrl: 'https://cc-api-dcp-prod.apps.aro.gov.ab.ca'
    }
  }
}

function getEnv() {
    const url = window.location.hostname.toLowerCase();
    const match = url.match(/common-capabilities-dcp-(\w+)\.apps\.aro\.gov\.ab\.ca/);
    const env = match ? match[1] : null;

    if (!env) {
      if (url === 'localhost') {
        return Environment.local;
      } else if (url === 'common-capabilities.digital.gov.ab.ca') {
        return Environment.prod;
      }
    }

  return Environment[env as keyof typeof Environment];
}

export function getGatewayConfigs(env?: Environment) {
  env ??= getEnv();

  return serviceConfigs[env].gateway;
}

export function getApiUrl(path: string) {
  const trimmedPath = path.startsWith('/') ? path.substring(1) : path;
  
  return `${getGatewayConfigs().baseUrl}/cc/v1/${trimmedPath}`;
}

export function getSchemaUrl(definition: string) {
  const schemaEnv = getEnv() === Environment.prod ? Environment.prod : Environment.uat;
  const configs = getGatewayConfigs(schemaEnv);

  return `${configs.baseUrl}/cc/v1/listings/schema/${definition}`;
}