export type FormField = {
  required: boolean;
  oneOf?: string[];
  messages: {
    [key: string]: string;
  };
  validate: {
    regEx: RegExp;
    failed: string;
  }[];
  includedInPayload: boolean;
  revalidateOnChange: boolean; // some fields should have immediate feedback on errors, however we dont want some input to be revalidated on every key stroke (onChange)
};

export type FormConfig = {
  properties: {
    [key: string]: FormField;
  };
  getEntityUrl: (
    gatewayUrl: string,
    values: string | { [key: string]: string },
  ) => string;
};
