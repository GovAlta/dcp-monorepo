function loadGtag() {
  const hostName = window.location.hostname;
  if (
    hostName === 'common-capabilities-dcp-uat.apps.aro.gov.ab.ca' ||
    hostName === 'common-capabilities-uat.alberta.ca'
  ) {
    (function () {
      window.dataLayer = window.dataLayer || [];
      function gtag(key: string, value: unknown) {
        window.dataLayer.push(key, value);
      }
      gtag('js', new Date());
      gtag('config', 'G-1DJCQRHZ8D');
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1DJCQRHZ8D';

      const feedbackscript = document.createElement('script');
      feedbackscript.async = true;
      feedbackscript.src =
        'https://feedback-service.adsp-uat.alberta.ca/feedback/v1/script/adspFeedback.js';
      document.head.appendChild(script);
      document.head.appendChild(feedbackscript);
    })();
  } else if (
    hostName === 'common-capabilities.digital.gov.ab.ca' ||
    hostName === 'common-capabilities.gov.ab.ca'
  ) {
    (function () {
      window.dataLayer = window.dataLayer || [];
      function gtag(key: string, value: unknown) {
        window.dataLayer.push(key, value);
      }
      gtag('js', new Date());
      gtag('config', 'G-4TW8MFQ4GT');
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4TW8MFQ4GT';

      const feedbackscript = document.createElement('script');
      feedbackscript.async = true;
      feedbackscript.src =
        'https://feedback-service.adsp.alberta.ca/feedback/v1/script/adspFeedback.js';
      document.head.appendChild(script);
      document.head.appendChild(feedbackscript);
    })();
  }
}

export default loadGtag();
