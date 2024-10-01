function isProd() {
  return (
    window.location.hostname.toLowerCase() == 'digitalmarketplace.alberta.ca' ||
    window.location.hostname.toLowerCase() == 'digital-marketplace-dcp-prod.apps.aro.gov.ab.ca'
  );
}

function formPostUrl() {
  if (isProd()) {
    // PROD
    return 'https://api.digitalmarketplace.alberta.ca/marketplace/v1/forms/';
  } else {
    // ALL OTHER: DEV/UAT
    return 'https://digital-marketplace-api-dcp-uat.apps.aro.gov.ab.ca/marketplace/v1/forms/';
    // return "http://localhost:3333/marketplace/v1/forms/";
  }
}
