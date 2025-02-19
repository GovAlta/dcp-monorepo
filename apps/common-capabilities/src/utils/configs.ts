enum Environment {
  local = 'local',
  dev = 'dev',
  uat = 'uat',
  prod = 'prod'
}

type GatewayConfigs = {
  baseUrl: string;
}

type ADSPConfigs = {
  auth_url: string;
  realm: string;
  idp_client_id: string;
  idp_alias: string;
}

type ServiceConfig = {
  [key in Environment]: {
    adsp: ADSPConfigs
    gateway: GatewayConfigs
  }
}

const serviceConfigs: ServiceConfig = {
  local: {
    adsp: {
      idp_client_id: 'urn:ads:cc:uiam_saml',
      idp_alias: 'saml',
      auth_url: 'https://access-uat.alberta.ca/auth',
      realm: '9b2d9233-4d9f-432d-9471-9f95861db16d',
    },
    gateway: {
      baseUrl: 'http://localhost:3333'
    }
  },
  dev: {
    adsp: {
      idp_client_id: 'urn:ads:cc:uiam_saml',
      idp_alias: 'saml',
      auth_url: 'https://access-uat.alberta.ca/auth',
      realm: '9b2d9233-4d9f-432d-9471-9f95861db16d',
    },
    gateway: {
      baseUrl: 'https://cc-api-dcp-dev.apps.aro.gov.ab.ca',
    }
  },
  uat: {
    adsp: {
      idp_client_id: 'urn:ads:cc:uiam_saml',
      idp_alias: 'saml',
      auth_url: 'https://access-uat.alberta.ca/auth',
      realm: '9b2d9233-4d9f-432d-9471-9f95861db16d',
    },
    gateway: {
      baseUrl: 'https://common-capabilities-api-uat.alberta.ca'
    }
  },
  prod: {
    adsp: {
      idp_client_id: 'urn:ads:cc:uiam_saml',
      idp_alias: 'saml',
      auth_url: 'https://access.alberta.ca/auth',
      realm: '650cd96a-1a14-4988-826d-bb108047f2a8',
    },
    gateway: {
      baseUrl: 'https://common-capabilities-api.gov.ab.ca'
    }
  }
}

function getEnv() {
    const url = window.location.hostname.toLowerCase();
    const match = url.match(/(?<=-)(uat|prod|dev)(?=[.-])/);
    const env = match ? match[1] : null;

    if (!env) {
      if (url === 'localhost') {
        return Environment.uat;
      } else if (url === 'common-capabilities.digital.gov.ab.ca' || url === 'common-capabilities.gov.ab.ca') {
        return Environment.prod;
      }
    }

  return Environment[env as keyof typeof Environment];
}

function getConfigs(env?: Environment) {
  env ??= getEnv();

  return serviceConfigs[env];
}

export function getApiUrl(path: string) {
  const configs = getConfigs();
  const trimmedPath = path.startsWith('/') ? path.substring(1) : path;
  
  return `${configs.gateway.baseUrl}/cc/v1/${trimmedPath}`;
}

export function getAdspConfigs() {
  const configs = getConfigs();
  
  return configs.adsp;
}

export function getSchemaUrl(definition: string) {
  return getApiUrl(`listings/schema/${definition}`);
}

export function getCaptchaSiteKey() {
  switch (getEnv()) {
    case Environment.prod:
      return '6LcaDIMqAAAAANe6sjq3lcjDCMFYeaucnQRQ2h76';
    case Environment.local:
    case Environment.dev:
    case Environment.uat:
      return '6LcEDIMqAAAAAFcF-DAoBUVWXIBNYVswsv_7JAgN';
    default:
      return '?'; // first character == "?" will disable
  }
}

export function getProperty(obj:any, path:any) {
  return path.split('.').reduce((acc:any, key:any) => acc?.[key], obj); 
}