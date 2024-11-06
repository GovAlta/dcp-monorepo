import React, { useCallback } from 'react';
import axios from 'axios';
import ServiceFormWrapper from '../../../components/ServiceForm/ServiceFormWrapper';
import { getGatewayConfigs } from 'apps/common-capabilities/src/utils/configs';
import { Service } from 'apps/common-capabilities/src/types/types';

export interface UpdateServicePageProps {
  service: Service;
}

export default function UpdateServicePage({service}: UpdateServicePageProps): JSX.Element {
  const handleSubmit = useCallback(async (data: Service) => {
    const config = getGatewayConfigs();

    return new Promise((resolve, reject) => {
      axios.put(
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
  }, [service]);

  return (
    <ServiceFormWrapper
      pageHeader={`Update ${service.ServiceName}`}
      service={service}
      handleSubmit={handleSubmit}
    />
  );
}
