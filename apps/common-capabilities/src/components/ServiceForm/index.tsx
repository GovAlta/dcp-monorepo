import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ContextProviderFactory,
  GoARenderers,
  GoACells,
  createDefaultAjv,
} from '@abgov/jsonforms-components';
import type { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { JsonForms } from '@jsonforms/react';
import './styles.css';
import {
  GoAButton,
  GoACircularProgress,
  GoAModal,
  GoANotification,
} from '@abgov/react-components';
import type { Service } from '../../types/types';
import GoACaptchaSection from '../Captcha/GoACaptchaSection';
import { useNavigate } from 'react-router-dom';

type ServiceFormProps = {
  data?: Service;
  dataSchema: JsonSchema;
  onSubmit?: (data: Service) => Promise<unknown>;
  uiSchema: UISchemaElement;
};

enum SubmitStatus {
  NotSubmitted,
  Submitting,
  Submitted,
}

const ContextProvider = ContextProviderFactory();

const FormWrapper = ({
  data,
  dataSchema,
  uiSchema,
  readOnly,
}: {
  data?: Service;
  dataSchema: JsonSchema;
  uiSchema: UISchemaElement;
  readOnly: boolean;
}) => {
  const ajv = useMemo(() => createDefaultAjv(dataSchema), [dataSchema]);

  return (
    <JsonForms
      ajv={ajv}
      schema={dataSchema}
      cells={GoACells}
      uischema={uiSchema}
      readonly={readOnly}
      data={data}
      validationMode="ValidateAndShow"
      renderers={GoARenderers}
    />
  );
};

const ServiceForm = ({
  data,
  dataSchema,
  uiSchema,
  onSubmit,
}: ServiceFormProps) => {
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(
    SubmitStatus.NotSubmitted,
  );
  const [error, setError] = useState<Error | null>(null);
  const errorRef = useRef<Error | null>();

  errorRef.current = error;

  const onSubmitFunction = useCallback(
    async (formData: Service) => {
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
    },
    [setSubmitStatus, setError, onSubmit],
  );

  const onDialogDismiss = useCallback(() => {
    setError(null);
  }, [setError]);

  return (
    <>
      <div className="progress-indicator">
        <GoACircularProgress
          variant="inline"
          size="small"
          message="Submitting your service for review..."
          visible={submitStatus === SubmitStatus.Submitting}
        />
      </div>
      {error && (
        <GoANotification
          type="emergency"
          ariaLive="assertive"
          onDismiss={onDialogDismiss}
        >
          {`Error when submitting service form: ${error.message}`}
        </GoANotification>
      )}
      <GoAModal
        open={submitStatus === SubmitStatus.Submitted}
        heading="Your service has been successfully submitted for review"
      >
        <GoAButton type="primary" onClick={() => navigate('/services')}>
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
          readOnly={submitStatus === SubmitStatus.Submitting}
        />
      </ContextProvider>
      <GoACaptchaSection />
    </>
  );
};

export default ServiceForm;
