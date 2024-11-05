import React from 'react';
import { GoAThreeColumnLayout } from '@abgov/react-components';
import ServiceForm from '../../components/ServiceForm';
import FormDataSchema from '../../content/schemas/data/formintake.json';
import FormUISchema from '../../content/schemas/ui/formintake.json';

export interface UpdateServicePageProps {
  id: string;
}

export default function UpdateServicePage(props: UpdateServicePageProps): JSX.Element {
  return (
    <GoAThreeColumnLayout
      maxContentWidth="1550px"
      rightColumnWidth="8%"
      leftColumnWidth="18%"
    >
      <div>
        <h1>Update Service</h1>

        <ServiceForm
          dataSchema={FormDataSchema}
          onSubmit={() => null}
          uiSchema={FormUISchema}
        />
      </div>
    </GoAThreeColumnLayout>
  );
}
