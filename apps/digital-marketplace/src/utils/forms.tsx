import { FormField } from '../contexts/types';

const validateFieldAndMarkError = (
  key: string,
  value: any,
  fieldConfig: any,
  errors: any,
  validated: Set<string>,
) => {
  const error = validateField(value, fieldConfig);
  validated.add(key);
  if (error) {
    errors[key] = error;
  }
};

export const validateForm = (
  values: { [x: string]: any },
  config: { [x: string]: any },
) => {
  const validated = new Set<string>();
  const errors: any = {};
  for (const key in config) {
    if (!validated.has(key)) {
      const fieldConfig = config[key];

      if (fieldConfig.oneOf) {
        const groupErrors: any = {};
        fieldConfig.oneOf.forEach((field: any) => {
          validateFieldAndMarkError(
            field,
            values[field],
            config[field],
            groupErrors,
            validated,
          );
        });

        // If any of the values for properties within oneOf are valid, then we know that the form is valid
        if (Object.keys(groupErrors).length === fieldConfig.oneOf.length) {
          Object.assign(errors, groupErrors);
        }
      } else {
        validateFieldAndMarkError(
          key,
          values[key],
          fieldConfig,
          errors,
          validated,
        );
      }
    }
  }

  return errors;
};
export const validateField = (rawValue: any, fieldConfig: FormField) => {
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
      (rule) => !rule.regEx.test(value),
    );
    if (validationErrors.length > 0) {
      return validationErrors[0].failed;
    }
  }
  return null;
};
