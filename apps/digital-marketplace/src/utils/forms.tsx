export const validateForm = (
  values: { [x: string]: any },
  config: { [x: string]: any }
) => {
  const errors: any = {};

  for (const key in config) {
    const fieldConfig = config[key];
    const error = validateField(key, values[key], fieldConfig);
    if (error) {
      errors[key] = error;
    }
  }

  return errors;
};
export const validateField = (name: string, rawValue: any, fieldConfig: any) => {
  const value = String(rawValue).trim();
  if (fieldConfig.required && !value) {
    return fieldConfig.messages.required;
  }
  if (!fieldConfig.required && value === '') {
    return null; // skip validation if value is empty string and field is not required
  }
  if (fieldConfig.validate) {
    const validationErrors = fieldConfig.validate.filter(
      (rule: any) => !rule.regEx.test(value)
    );
    if (validationErrors.length > 0) {
      return validationErrors[0].failed;
    }
  }
  return null;
};
