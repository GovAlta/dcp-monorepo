import axios from 'axios';
import { useState } from 'react';
import { formPostUrl, getCaptchaSiteKey } from '../utils/domain';
import { FormConfig } from './types';

const useForm = (
  initialValues: any,
  validateForm: any,
  validateField: any,
  formConfig: FormConfig
) => {
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const getErrorsOnChange = (prevErrors:any, name: string) => {
    let newErrors = prevErrors;

    if (formConfig.properties[name]?.oneOf) {
      const choicePropErrors =  formConfig.properties[name].oneOf.reduce((acc: any, current: any) => {
        if (name !== current) {
          acc[current] = null;
        }

        return acc;
      }, {});

      const combinedErrors = Object.assign({}, prevErrors, choicePropErrors);
    
      newErrors = Object.fromEntries(
        Object.entries(combinedErrors).filter(([key, value]) => !!value)
      );
    }

    return newErrors;
  };

  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });

    setErrors((prevErrors: any) => getErrorsOnChange(prevErrors, name));
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
            if (!fieldConfig.includedInPayload || (!fieldConfig.required && entryValue === '')) {
              entry = null;
            }
          }

          return entry;
        })
        .filter(entry => !!entry)
    );

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const siteKey = getCaptchaSiteKey();
        const recaptcha = await new Promise((resolve, reject) => {
          (window as any).grecaptcha.ready(async () => {
            try {
              const token = await (window as any).grecaptcha.execute(siteKey, {
                action: 'submit',
              });
              resolve(token); // Resolve the promise with the recaptcha token
            } catch (error: any) {
              reject(new Error(`Recaptcha error: ${error.message}`)); // Reject the promise with an error
            }
          });
        });
        jsonData['token'] = recaptcha;
        await axios.post(
          formConfig.getEntityUrl(formPostUrl(), values),
          jsonData,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log('Form data submitted:', values);
        setSuccess(true);
        setValues(initialValues);
        setErrors({});
      } catch (error: any) {
        setApiError(error.message);
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
      const error = validateField(name, values[name], fieldConfig);
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
