import React, { useCallback } from 'react';
import axios from 'axios';
import { getGatewayConfigs } from '../../utils/configs';
import { Service } from '../../types/types';
import ServiceFormWrapper from '../../components/ServiceForm/ServiceFormWrapper';

export default function AddServicePage() {
  const handleSubmit = useCallback((data: Service) => {
    const config = getGatewayConfigs();

    return new Promise((resolve, reject) => {
      axios.post(
        `${config.url}/services`, // TODO update this
        data,
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          }
        }
      )
      .then(resolve)
      .catch(reject);
    });
  }, []);

  return (
    <ServiceFormWrapper
      handleSubmit={handleSubmit}
    />
  );
};
