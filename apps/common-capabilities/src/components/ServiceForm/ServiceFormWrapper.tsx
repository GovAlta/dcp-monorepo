import React, { useMemo } from 'react';
import ServiceForm from '../../components/ServiceForm';
import { GoACircularProgress, GoANotification, GoAThreeColumnLayout } from '@abgov/react-components';
import { getSchemaUrl } from '../../utils/configs';
import useFetch from '../../hooks/useFetch';
import type { JsonSchema, UISchemaElement } from '@jsonforms/core';
import type { Service } from '../../types/types';

type ServiceFormWrapperProps = {
    backLink?: JSX.Element;
    pageHeader: string;
    service?: Service;
    handleSubmit: (data: Service) => Promise<any>;
}

type SchemaResponse = {
  dataSchema: JsonSchema;
  uiSchema: UISchemaElement;  
}

export default function ServiceFormWrapper({backLink,pageHeader, service, handleSubmit}: ServiceFormWrapperProps) {
  const schemaUrl = useMemo(() => getSchemaUrl('common-capabilities-intake'), []);
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
      <GoANotification type="emergency" ariaLive="assertive">
        Failed to load form definitions. Please try again later.
      </GoANotification>
    );
  }

  return (
    <>
      <GoAThreeColumnLayout
        maxContentWidth="1550px"
        rightColumnWidth="8%"
        leftColumnWidth="18%"
      >
        {backLink}
        <h1>{pageHeader}</h1>
        <div className="progress-indicator">
          <GoACircularProgress variant="inline" size="large" message="Loading form information..." visible={isLoading} />
        </div>
        {content}
      </GoAThreeColumnLayout>
    </>
  );
}
