import { FormField, FormProperties, FormValues } from '../contexts/types';
import { FormErrors } from '../contexts/useForm';

const validateFieldAndMarkError = (
    key: string,
    value: FormValues[keyof FormValues],
    fieldConfig: FormField,
    errors: FormErrors,
    validated: Set<string>,
) => {
    const error = validateField(value, fieldConfig);
    validated.add(key);
    if (error) {
        errors[key] = error;
    }
};

export const validateForm = (values: FormValues, config: FormProperties) => {
    const validated = new Set<string>();
    const errors = {};
    for (const key in config) {
        if (!validated.has(key)) {
            const fieldConfig = config[key as keyof FormProperties];

            if (!fieldConfig) {
                continue;
            }

            if (fieldConfig.oneOf) {
                const groupErrors = {};
                fieldConfig.oneOf.forEach((value) => {
                    const field = value as keyof FormValues;
                    validateFieldAndMarkError(
                        field,
                        values[field],
                        fieldConfig,
                        groupErrors,
                        validated,
                    );
                });

                // If any of the values for properties within oneOf are valid, then we know that the form is valid
                if (
                    Object.keys(groupErrors).length === fieldConfig.oneOf.length
                ) {
                    Object.assign(errors, groupErrors);
                }
            } else {
                const field = key as keyof FormValues;
                validateFieldAndMarkError(
                    key,
                    values[field],
                    fieldConfig,
                    errors,
                    validated,
                );
            }
        }
    }

    return errors;
};
export const validateField = (
    rawValue: FormValues[keyof FormValues],
    fieldConfig: FormField,
) => {
    const value =
        typeof rawValue === 'string' ? String(rawValue).trim() : rawValue;
    if (fieldConfig.required && !value) {
        return fieldConfig.messages.required;
    }
    if (!fieldConfig.required && value === '') {
        return null; // skip validation if value is empty string and field is not required
    }
    if (fieldConfig.validate) {
        const validationErrors = fieldConfig.validate.filter(
            (rule) => !rule.regEx.test(value as string),
        );
        if (validationErrors.length > 0) {
            return validationErrors[0].failed;
        }
    }
    return null;
};
