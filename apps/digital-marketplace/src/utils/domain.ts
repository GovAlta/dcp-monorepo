export function isProd() {
    return (
        window.location.hostname.toLowerCase() ==
            'digitalmarketplace.alberta.ca' ||
        window.location.hostname.toLowerCase() ==
            'digital-marketplace-dcp-prod.apps.aro.gov.ab.ca'
        // || window.location.hostname.toLowerCase() == 'localhost'
    );
}

export function formPostUrl() {
    if (isProd()) {
        // PROD
        return 'https://api.digitalmarketplace.alberta.ca/marketplace/v1/forms';
    } else {
        // ALL OTHER: DEV/UAT
        return 'https://digital-marketplace-api-dcp-uat.apps.aro.gov.ab.ca/marketplace/v1/forms';
        // return "http://localhost:3333/marketplace/v1/forms/";
    }
}

export function bookingsUrl() {
    if (isProd()) {
        // PROD
        return 'https://api.digitalmarketplace.alberta.ca/marketplace/v1/bookings';
    } else {
        // ALL OTHER: DEV/UAT
        return 'https://digital-marketplace-api-dcp-uat.apps.aro.gov.ab.ca/marketplace/v1/bookings';
        // return "http://localhost:3333/marketplace/v1/bookings/";
    }
}

export function domainEnv() {
    switch (window.location.hostname.toLowerCase()) {
        case 'digitalmarketplace.alberta.ca':
        case 'digital-marketplace-dcp-prod.apps.aro.gov.ab.ca':
            return 'PROD';

        case 'digital-marketplace-dcp-uat.apps.aro.gov.ab.ca':
        case 'digital-marketplace-dcp-dev.apps.aro.gov.ab.ca':
        case 'localhost':
            return 'UAT';

        default:
            return '?';
    }
}
export function getCaptchaSiteKey() {
    switch (domainEnv()) {
        case 'PROD':
            return '6LcudEgqAAAAAOZbmzzvKwQHyAsG8ZvQWpwoNx5m';
        case 'UAT':
            return '6LcNdUgqAAAAAPQb9tND2WEVpjctW07ua5mGdclm';
        default:
            return '?'; // first character == "?" will disable
    }
}
