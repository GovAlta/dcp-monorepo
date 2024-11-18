import axios from 'axios';
import { Service } from '../types/types';
import { getCaptchaSiteKey, getApiUrl } from '../utils/configs';

const useForm = () => {
  const handleSubmit = async (data: Service) => {    
    const siteKey = getCaptchaSiteKey();
    return new Promise((resolve, reject) => {
      (window as any).grecaptcha.ready(async () => {
        try {
          const token = await (window as any).grecaptcha.execute(siteKey, {
            action: 'submit',
          });

          return axios.post(
            getApiUrl('listings'),
            {formData: data, captchaToken: token},
            {
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
              }
            }
          )
          .then(resolve)
          .catch(reject);
        } catch (error: any) {
          reject(new Error(`Recaptcha error: ${error.message}`));
        }
      });
    });
  };

  return {
    handleSubmit
  };
};

export default useForm;