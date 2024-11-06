import React, { useCallback, useRef, useState } from 'react';
import { ContextProviderFactory, GoARenderers, GoACells } from '@abgov/jsonforms-components';
import type { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import './styles.css';
import { GoAButton, GoAModal, GoANotification } from '@abgov/react-components';
import type { Service } from '../../types/types';

type ServiceFormProps = {
  data?: Service;
  dataSchema: JsonSchema;
  onSubmit?: (data: Service) => Promise<any>;
  uiSchema: UISchemaElement;
};

enum SubmitStatus {
  NotSubmitted,
  Submitting,
  Submitted
}

const ContextProvider = ContextProviderFactory();

const FormWrapper = ({ data, dataSchema, uiSchema, readOnly }: {
   data?: any;
   dataSchema: JsonSchema;
   uiSchema: UISchemaElement;
   readOnly: boolean;
}) => {
  return (
    <JsonForms
      schema={dataSchema}
      cells={GoACells}
      uischema={uiSchema}
      readonly={readOnly}
      data={data}
      validationMode="ValidateAndShow"
      renderers={GoARenderers}
    />
  );
}

const ServiceForm = ({ data, dataSchema, uiSchema, onSubmit }: ServiceFormProps) => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(SubmitStatus.NotSubmitted);
  const [error, setError] = useState<Error | null>(null);
  const errorRef = useRef<Error | null>();

  errorRef.current = error;

  const onSubmitFunction = useCallback(async (formData: Service) => {
    if (!errorRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSubmitStatus(SubmitStatus.Submitting);

      try {
        await onSubmit?.(formData);
        setSubmitStatus(SubmitStatus.Submitted);
      } catch (e) {
        setError(e as Error);
        setSubmitStatus(SubmitStatus.NotSubmitted);
      }
    }
  }, [error, setSubmitStatus, setError, onSubmit]);

  const onDialogDismiss = useCallback(() => {
    setError(null);
  }, [setError]);

    // TODO some form of saving indicator?
  return (
    <>
      {
        error && 
          <GoANotification 
            type="emergency" 
            ariaLive="assertive"
            onDismiss={onDialogDismiss}
          >
            {`Error when submitting service form: ${error.message}`}
          </GoANotification>
      }
      <GoAModal 
        open={submitStatus === SubmitStatus.Submitted} 
        heading="Your service has been successfully submitted for review"
      >
        <GoAButton type="primary" onClick={()=>  window.location.href='/services/index.html'}>
          Back to services
        </GoAButton>
      </GoAModal>
      <ContextProvider
        submit={{
          submitForm: onSubmitFunction,
        }}
      >
        <FormWrapper
          data={data}
          dataSchema={dataSchema}
          uiSchema={uiSchema}
          readOnly={submitStatus === SubmitStatus.Submitting}/>
      </ContextProvider>
    </>
  );
}

export default ServiceForm;
