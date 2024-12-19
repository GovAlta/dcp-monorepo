enum Environment {
  local = 'local',
  dev = 'dev',
  uat = 'uat',
  prod = 'prod',
}
type GatewayConfigs = {
    baseUrl: string;
  }
  
type ServiceConfig = {
  [key in Environment]: {
    gateway: GatewayConfigs;
  };
};

const serviceConfigs: ServiceConfig = {
  local: {
    gateway: {
      baseUrl: 'http://localhost:3333',
    },
  },
  dev: {
    gateway: {
      baseUrl: 'https://digital-marketplace-api-dcp-dev.apps.aro.gov.ab.ca',
    },
  },
  uat: {
    gateway: {
      baseUrl: 'https://digital-marketplace-api-dcp-uat.apps.aro.gov.ab.ca',
    },
  },
  prod: {
    gateway: {
      baseUrl: 'https://api.digitalmarketplace.alberta.ca',
    },
  },
};

export function getBookingsUrl(path: string) {
  const trimmedPath = path.startsWith('/') ? path.substring(1) : path;

  return `${getGatewayConfigs().baseUrl}/marketplace/v1/${trimmedPath}`;
}

function getGatewayConfigs(env?: Environment) {
  env ??= getEnv();

  return serviceConfigs[env].gateway;
}
function getEnv() {
  const url = window.location.hostname.toLowerCase();
  const match = url.match(
    /digital-marketplace-dcp-(\w+)\.apps\.aro\.gov\.ab\.ca/
  );
  const env = match ? match[1] : null;
  console.log(url);
  if (!env) {
    if (url === 'localhost') {
      return Environment.local;
    } else if (url === 'digitalmarketplace.alberta.ca') {
      return Environment.prod;
    }
  }

  return Environment[env as keyof typeof Environment];
}
