import React from 'react';
import ServiceForm from '../../components/ServiceForm';
import { GoACircularProgress, GoANotification, GoAThreeColumnLayout } from '@abgov/react-components';
import { getSchemaUrl } from '../../utils/configs';
import { Service } from '../../types/types';
import useFetch from '../../hooks/useFetch';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';

type ServiceFormWrapperProps = {
    pageHeader: string;
    service?: Service;
    handleSubmit: (data: Service) => Promise<any>;
}

type SchemaResponse = {
  dataSchema: JsonSchema;
  uiSchema: UISchemaElement;  
}

export default function ServiceFormWrapper({pageHeader, service, handleSubmit}: ServiceFormWrapperProps) {
  const schemaUrl = getSchemaUrl('common-capabilities-intake');
  const [data, error, isLoading] = useFetch<SchemaResponse>(schemaUrl);

  let content;
  
  if (data) {
    content = (
      <ServiceForm
        data={service}
        dataSchema={data?.dataSchema}
        onSubmit={handleSubmit}
        uiSchema={data?.uiSchema}
      />
    );
  } else if (error) {
    content = (
      <div>
        <GoANotification type="emergency" ariaLive="assertive">
          Failed to load form definitions. Please try again later.
        </GoANotification>
      </div>
    );
  }

  return (
    <>
      <GoAThreeColumnLayout
        maxContentWidth="1550px"
        rightColumnWidth="8%"
        leftColumnWidth="18%"
      >
        <div>
          <h1>{pageHeader}</h1>
          <div className="progress-indicator">
            <GoACircularProgress variant="inline" size="large" message="Loading form information..." visible={isLoading} />
          </div>
          {content}
        </div>
      </GoAThreeColumnLayout>
    </>
  );
}
