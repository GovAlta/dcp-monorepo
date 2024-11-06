import React from 'react';
import ServiceFormWrapper from '../../../components/ServiceForm/ServiceFormWrapper';

export interface UpdateServicePageProps {
  service: any;
}

export default function UpdateServicePage({service}: UpdateServicePageProps): JSX.Element {
  return (
    <ServiceFormWrapper
      service={service}
      handleSubmit={(data) => {
        return Promise.resolve(data);
      }}
    />
  );
}
