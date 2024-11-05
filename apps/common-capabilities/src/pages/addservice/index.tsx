import React, { useCallback } from 'react';
import ServiceForm from '../../components/ServiceForm';
import { GoAThreeColumnLayout } from '@abgov/react-components';
import axios from 'axios';
import { getGatewayConfigs } from '../../utils/configs';
import FormDataSchema from '../../content/schemas/data/formintake.json';
import FormUISchema from '../../content/schemas/ui/formintake.json';

export default function AddServicePage() {
  const submitService = useCallback((data: any) => {
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
    <GoAThreeColumnLayout
      maxContentWidth="1550px"
      rightColumnWidth="8%"
      leftColumnWidth="18%"
    >
      <div>
        <h1>Add a service</h1>

        <ServiceForm
          dataSchema={FormDataSchema}
          onSubmit={submitService}
          uiSchema={FormUISchema}
        />
      </div>
    </GoAThreeColumnLayout>
  );
};
