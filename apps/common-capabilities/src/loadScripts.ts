type GTagConfig = {
  key: string;
  async: boolean;
  src: string;
};

type FeedbackConfig = {
  async: boolean;
  src: string;
};

function addScripts(gtagConfig: GTagConfig, feedbackConfig: FeedbackConfig) {
  window.dataLayer = window.dataLayer || [];
  function gtag(key: string, value: Date | string) {
    window.dataLayer.push(key, value);
  }
  gtag('js', new Date());
  gtag('config', gtagConfig.key);
  const script = document.createElement('script');
  script.async = gtagConfig.async;
  script.src = gtagConfig.src;

  const feedbackscript = document.createElement('script');
  feedbackscript.async = feedbackConfig.async;
  feedbackscript.src = feedbackConfig.src;

  document.head.appendChild(script);
  document.head.appendChild(feedbackscript);
}

// load google tag manager and feedback service and anything else that might trigger script CSP issues
function loadGtag() {
  const hostName = window.location.hostname;
  if (
    hostName === 'common-capabilities-dcp-uat.apps.aro.gov.ab.ca' ||
    hostName === 'common-capabilities-uat.alberta.ca'
  ) {
    addScripts(
      {
        key: 'G-1DJCQRHZ8D',
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-1DJCQRHZ8D',
      },
      {
        async: true,
        src: 'https://feedback-service.adsp-uat.alberta.ca/feedback/v1/script/adspFeedback.js',
      },
    );
  } else if (
    hostName === 'common-capabilities.digital.gov.ab.ca' ||
    hostName === 'common-capabilities.gov.ab.ca'
  ) {
    addScripts(
      {
        key: 'G-4TW8MFQ4GT',
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=G-4TW8MFQ4GT',
      },
      {
        async: true,
        src: 'https://feedback-service.adsp.alberta.ca/feedback/v1/script/adspFeedback.js',
      },
    );
  }
}

export default loadGtag();
