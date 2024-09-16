
function isProd() {  
    return window.location.hostname.toLowerCase() == 'digitalmarketplace.alberta.ca';
}

function formPostUrl() {
    if ( isProd() ) {
        // PROD        
        return 'https://api.digitalmarketplace.alberta.ca/marketplace/v1/forms/';        
    } else {
        // ALL OTHER: DEV/UAT
        return 'https://digital-marketplace-api-dcp-uat.apps.aro.gov.ab.ca/marketplace/v1/forms/';        
    }
}

if (globalThis.adspFeedback != undefined) {
    adspFeedback.initialize({
        tenant: 'digital_marketplace'
    })
} else {
    console.log('adspFeedback not avaliable');
}