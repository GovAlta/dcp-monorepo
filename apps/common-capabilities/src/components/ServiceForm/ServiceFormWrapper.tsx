import React from 'react';
import ServiceForm from '../../components/ServiceForm';
import { GoAThreeColumnLayout } from '@abgov/react-components';
import { getGatewayConfigs } from '../../utils/configs';
import FormDataSchema from '../../content/schemas/data/formintake.json';
import FormUISchema from '../../content/schemas/ui/formintake.json';
import { Service } from '../../types/types';
import useFetch from '../../hooks/useFetch';
import { JsonSchema, UISchemaElement } from '@jsonforms/core';

type ServiceFormWrapperProps = {
    pageHeader: string;
    service?: Service;
    handleSubmit: (data: Service) => Promise<any>;
}

type SchemaResponse = {
  formSchema: JsonSchema;
  uiSchema: UISchemaElement;  
};

export default function ServiceFormWrapper({pageHeader, service, handleSubmit}: ServiceFormWrapperProps) {
  const config = getGatewayConfigs();
  const schemaUrl = `${config.url}/schema`;
  
  const [data, error, isLoading] = useFetch<SchemaResponse>(schemaUrl);

  let content;
  
  if (isLoading) {
    content = <div>Loading...</div>;
//   } else if (error) {
//     content = <div>Error: {error.message}</div>;
  } else {
    content = (
      <ServiceForm
        data={service}
        dataSchema={data?.formSchema || FormDataSchema}
        onSubmit={handleSubmit}
        uiSchema={data?.uiSchema ||FormUISchema}
      />
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

          {content}
        </div>
      </GoAThreeColumnLayout>
    </>
  );
};
