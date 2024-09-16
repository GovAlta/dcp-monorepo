import axios from 'axios';
import React, { useEffect } from 'react';

export default function LandingPage() {
  const [buyerDataUrl, setBuyerDataUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (
      window.location.hostname ===
        'digital-marketplace-int-dcp-uat.apps.aro.gov.ab.ca' ||
      window.location.hostname === 'localhost'
    ) {
      setBuyerDataUrl(
        'https://dcp-proxy-api-int-dcp-uat.apps.aro.gov.ab.ca/marketplace/v1/forms/buyer/downloadcsv'
      ); // uat url
    } else {
      setBuyerDataUrl(
        'https://dcp-proxy-api-int-dcp-prod.apps.aro.gov.ab.ca/marketplace/v1/forms/buyer/downloadcsv'
      );
    }
  }, []);

  const downloadBuyerFormData = async () => {
    setIsLoading(true);
    const download = await axios.get(buyerDataUrl);
    const blob = new Blob([download.data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buyer_data.csv';
    a.click();
    URL.revokeObjectURL(url);
    setIsLoading(false);
  };
  return (
    <div>
      <h1>Digital Marketplace portal</h1>
      <button disabled={isLoading} onClick={() => downloadBuyerFormData()}>
        Download buyer data
      </button>
    </div>
  );
}
