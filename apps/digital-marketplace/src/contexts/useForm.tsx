import axios, { isAxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';
import { bookingsUrl, formPostUrl, getCaptchaSiteKey } from '../utils/domain';
import type {
    FormConfig,
    FormField,
    FormProperties,
    FormValues,
} from './types';

export type FormErrors = {
    [key: string]: string | null;
};

const useForm = <T extends FormValues>(
    initialValues: T,
    validateForm: (values: FormValues, config: FormProperties) => FormErrors,
    validateField: (value: T[keyof T], fieldConfig: FormField) => string | null,
    formConfig: FormConfig,
) => {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);

    const getErrorsOnChange = (
        prevErrors: FormErrors,
        name: keyof FormProperties,
        newValue: T[keyof T],
    ) => {
        let newErrors = Object.assign({}, prevErrors);
        const config = formConfig.properties[name];

        if (config?.oneOf) {
            const choicePropErrors = config.oneOf.reduce(
                (acc: { [x: string]: null }, current: string) => {
                    if (name !== current) {
                        acc[current] = null;
                    }

                    return acc;
                },
                {},
            );

            const combinedErrors = Object.assign(
                {},
                prevErrors,
                choicePropErrors,
            );

            newErrors = Object.fromEntries(
                Object.entries(combinedErrors).filter(([, value]) => !!value),
            );
        }

        if (config?.revalidateOnChange) {
            const error = validateField(newValue, config);
            newErrors[name] = error;
        }

        return newErrors;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setValues((prevValues: T) => ({
            ...prevValues,
            [name]: newValue,
        }));

        setErrors((prevErrors: FormErrors) =>
            getErrorsOnChange(
                prevErrors,
                name as keyof FormProperties,
                newValue as T[keyof T],
            ),
        );
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const validationErrors = validateForm(values, formConfig.properties);

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);

            const rawJsonData = { ...values };
            const jsonData = Object.fromEntries(
                Object.entries(rawJsonData)
                    .map(([key, value]) => {
                        const field = key as keyof T;
                        const entryValue = (
                            typeof value === 'string' ? value.trim() : value
                        ) as T[keyof T];
                        const fieldConfig =
                            formConfig.properties[
                                field as keyof FormProperties
                            ];
                        let entry: [keyof T, T[keyof T]] | null = [
                            field,
                            entryValue,
                        ];

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
                    .filter((entry): entry is [keyof T, T[keyof T]] => !!entry),
            ) as { [key in keyof T]: T[keyof T] };

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
                            reject(
                                new Error(
                                    `Recaptcha error: ${(error as Error).message}`,
                                ),
                            ); // Reject the promise with an error
                        }
                    });
                });

                const requestData = {
                    ...jsonData,
                    token: recaptcha as string,
                };

                if (values.formType === 'consultation') {
                    await axios.post(bookingsUrl(), requestData, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                }
                if (values.formType === 'signup') {
                    await axios.post(
                        formConfig.getEntityUrl(formPostUrl(), values),
                        requestData,
                        {
                            headers: { 'Content-Type': 'application/json' },
                        },
                    );
                }
                setSuccess(true);
                setValues(initialValues);
                setErrors({});
            } catch (error) {
                if (isAxiosError(error)) {
                    setApiError(
                        error.response?.data.error || error.response?.data,
                    );
                }
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(validationErrors);
        }
    };
    const handleBlur = (e: { target: { name: string } }) => {
        const { name } = e.target;
        const fieldConfig = formConfig.properties[name as keyof FormProperties];
        if (fieldConfig) {
            const error = validateField(values[name as keyof T], fieldConfig);
            setErrors((prevErrors: FormErrors) => ({
                ...prevErrors,
                [name]: error,
            }));
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
