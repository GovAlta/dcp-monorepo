import axios from 'axios';
import { useState } from 'react';
import { formPostUrl, getCaptchaSiteKey } from '../utils/domain';

const useForm = (
  initialValues: any,
  validateForm: any,
  validateField: any,
  signUpFormConfig: any
) => {
  const [values, setValues] = useState<any>(initialValues);
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmitSupplier = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors = validateForm(values, signUpFormConfig);
    
    const rawJsonData = { ...values };
    const jsonData = Object.fromEntries(
      Object.entries(rawJsonData).map(([key, value]) => [
        key,
        typeof value === 'string' ? value.trim() : value
      ])
    );
    if (values['website'] === '') {
      delete jsonData['website'];
    }
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
        const response = await axios.post(
          `${formPostUrl()}/supplier`,
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

  const handleSubmitPartner = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const validationErrors = validateForm(values, signUpFormConfig);
    const jsonData = { ...values };
    if (values['website'] === '') {
      delete jsonData['website'];
    }
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
        const response = await axios.post(
          `${formPostUrl()}/stakeholder`,
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
    // console.log(signUpFormConfig);
    const fieldConfig = signUpFormConfig[name];
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
    handleSubmitSupplier,
    handleSubmitPartner,
    handleBlur,
  };
};

export default useForm;
