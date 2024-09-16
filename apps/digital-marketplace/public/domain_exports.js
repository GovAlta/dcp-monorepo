
function isProd() {  
    return window.location.hostname.toLowerCase() == 'digitalmarketplace.alberta.ca';
}

export function getFeedbackUrl() {
    if (isProd()) {
        return 'https://feedback-service.adsp.alberta.ca/feedback/v1/script/adspFeedback.js';
      
    } else {
        return 'https://feedback-service.adsp-uat.alberta.ca/feedback/v1/script/adspFeedback.js'; 
    }
}

export function getGoogle() {  // Start the code with a ? to disable
    if (isProd()) { 
        return '??? G-QWERTY'        
    }       
    else {        
        return '??? G-1234567890';
    }
}