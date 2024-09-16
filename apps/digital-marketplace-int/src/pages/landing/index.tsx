import axios from 'axios';
import React, { useEffect } from 'react';
import './styles.css'

const downloadFormData = async (url: string, fileName: string) => {
  const download = await axios.get(url);
  const blob = new Blob([download.data], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
};

export default function LandingPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const getDownloadUrl = (role: 'buyer' | 'supplier' | 'partner') => {
    if (
      window.location.hostname ===
        'digital-marketplace-int-dcp-uat.apps.aro.gov.ab.ca' ||
      window.location.hostname === 'localhost'
    ) {
      // return `http://localhost:3333/marketplace/v1/forms/${role}/downloadcsv`;
      return `https://dcp-proxy-api-int-dcp-uat.apps.aro.gov.ab.ca/marketplace/v1/forms/${role}/downloadcsv`;
    } else {
      return `https://dcp-proxy-api-int-dcp-prod.apps.aro.gov.ab.ca/marketplace/v1/forms/${role}/downloadcsv`;
    }
  };

  const downloadFormDataByRole = async (role: 'buyer' | 'supplier' | 'partner') => {
    setIsLoading(true);
    await downloadFormData(getDownloadUrl(role), `${role}_data.csv`);
    setIsLoading(false);
  };

  return (
    <div className="landing-page">
      <h1>Digital Marketplace portal</h1>
      <div className="buttons">
        <button
          disabled={isLoading}
          className="button"
          onClick={() => downloadFormDataByRole('buyer')}
        >
          Download buyer data
        </button>
        <button
          disabled={isLoading}
          className="button"
          onClick={() => downloadFormDataByRole('supplier')}
        >
          Download supplier data
        </button>
        <button
          disabled={isLoading}
          className="button"
          onClick={() => downloadFormDataByRole('partner')}
        >
          Download partner data
        </button>
      </div>
    </div>
  );
}


