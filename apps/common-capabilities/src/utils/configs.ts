enum Environment {
  dev = 'dev',
  uat = 'uat',
  prod = 'prod'
}

type GatewayConfigs = {
  url: string;
}

type ServiceConfig = {
  [key in Environment]: {
    gateway: GatewayConfigs
  }
}

const serviceConfigs: ServiceConfig = {
  dev: {
    gateway: {
      url: 'https://ccl-api-dcp-dev.apps.aro.gov.ab.ca'
    }
  },
  uat: {
    gateway: {
      url: 'https://ccl-api-dcp-uat.apps.aro.gov.ab.ca'
    }
  },
  prod: {
    gateway: {
      url: 'https://ccl-api-dcp-prod.apps.aro.gov.ab.ca'
    }
  }
}

function getEnv() {
    //
    // window.location.hostname.toLowerCase() == 'digitalmarketplace.alberta.ca' ||
    // window.location.hostname.toLowerCase() ==
    // 'digital-marketplace-dcp-prod.apps.aro.gov.ab.ca'

  return Environment.uat;
}

export function getGatewayConfigs() {
  const env = getEnv();

  return serviceConfigs[env].gateway;
}
