import axios from 'axios';
import { getCaptchaSiteKey, getApiUrl } from '../utils/configs';
import type { Service } from '../types/types';

const useForm = () => {
    const handleSubmit = async (data: Service, authToken?: string) => {
        const siteKey = getCaptchaSiteKey();
        return new Promise((resolve, reject) => {
            const { grecaptcha } = window;
            grecaptcha.ready(async () => {
                try {
                    const token = await grecaptcha.execute(siteKey, {
                        action: 'submit',
                    });

                    return axios
                        .post(
                            getApiUrl('listings'),
                            { formData: data, captchaToken: token },
                            {
                                headers: Object.assign(
                                    {},
                                    {
                                        'Content-Type':
                                            'application/json;charset=utf-8',
                                    },
                                    authToken
                                        ? {
                                              Authorization: `Bearer ${authToken}`,
                                          }
                                        : {},
                                ),
                            },
                        )
                        .then(resolve)
                        .catch(reject);
                } catch (error) {
                    reject(
                        new Error(
                            `Recaptcha error: ${(error as Error).message}`,
                        ),
                    );
                }
            });
        });
    };

    return {
        handleSubmit,
    };
};

export default useForm;
