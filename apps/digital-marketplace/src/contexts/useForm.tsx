import axios from 'axios';
import { useState } from 'react';
import { bookingsUrl, formPostUrl, getCaptchaSiteKey } from '../utils/domain';
import type { FormConfig } from './types';

const useForm = (
  initialValues: any,
  validateForm: any,
  validateField: any,
  formConfig: FormConfig,
) => {
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const getErrorsOnChange = (prevErrors: any, name: string, newValue: any) => {
    let newErrors = Object.assign({}, prevErrors);
    const config = formConfig.properties[name];

    if (config?.oneOf) {
      const choicePropErrors = config.oneOf.reduce((acc: any, current: any) => {
        if (name !== current) {
          acc[current] = null;
        }

        return acc;
      }, {});

      const combinedErrors = Object.assign({}, prevErrors, choicePropErrors);

      newErrors = Object.fromEntries(
        Object.entries(combinedErrors).filter(([key, value]) => !!value),
      );
    }

    if (config?.revalidateOnChange) {
      const error = validateField(newValue, config);
      newErrors[name] = error;
    }

    return newErrors;
  };

  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: newValue,
    }));

    setErrors((prevErrors: any) =>
      getErrorsOnChange(prevErrors, name, newValue),
    );
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors = validateForm(values, formConfig.properties);
    const rawJsonData = { ...values };
    const jsonData = Object.fromEntries(
      Object.entries(rawJsonData)
        .map(([key, value]) => {
          const entryValue = typeof value === 'string' ? value.trim() : value;
          const fieldConfig = formConfig.properties[key];
          let entry: any = [key, entryValue];

          if (fieldConfig) {
            if (
              !fieldConfig.includedInPayload ||
              (!fieldConfig.required && entryValue === '')
            ) {
              entry = null;
            }
          }

          return entry;
        })
        .filter((entry) => !!entry),
    );

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const siteKey = getCaptchaSiteKey();
        const recaptcha = await new Promise((resolve, reject) => {
          const { grecaptcha } = window;
          grecaptcha.ready(async () => {
            try {
              const token = await grecaptcha.execute(siteKey, {
                action: 'submit',
              });
              resolve(token); // Resolve the promise with the recaptcha token
            } catch (error) {
              reject(new Error(`Recaptcha error: ${(error as Error).message}`)); // Reject the promise with an error
            }
          });
        });
        jsonData['token'] = recaptcha;
        if (values.formType === 'consultation') {
          await axios.post(bookingsUrl(), jsonData, {
            headers: { 'Content-Type': 'application/json' },
          });
        }
        if (values.formType === 'signup') {
          await axios.post(
            formConfig.getEntityUrl(formPostUrl(), values),
            jsonData,
            {
              headers: { 'Content-Type': 'application/json' },
            },
          );
        }
        setSuccess(true);
        setValues(initialValues);
        setErrors({});
      } catch (error) {
        setApiError(error.response.data.error || error.response.data);
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };
  const handleBlur = (e: { target: { name: any } }) => {
    const { name } = e.target;
    const fieldConfig = formConfig.properties[name];
    if (fieldConfig) {
      const error = validateField(values[name], fieldConfig);
      setErrors((prevErrors: any) => ({ ...prevErrors, [name]: error }));
    }
  };

  return {
    values,
    errors,
    success,
    loading,
    apiError,
    handleChange,
    handleSubmit,
    handleBlur,
  };
};

export default useForm;
