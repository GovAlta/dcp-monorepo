import type { FormConfig } from "../../contexts/types";

export const signUpFormConfig: FormConfig = {
  properties: {
    signUpType: {
      required: true,
      messages: {
        required: 'Select one of the options'
      },
      validate: [],
      includedInPayload: false,
      revalidateOnChange: true,
    },
    orgName: {
      required: true,
      messages: {
        required: 'Enter your organization name',
      },
      validate: [
        {
          regEx: /^(.){2,100}$/,
          failed: 'Must be between 2 and 100 characters long',
        },
        {
          regEx: /^[a-zA-Z0-9&.,' -]+$/,
          failed: `Name should use letters, numbers, spaces or &'.,- "`,
        },
      ],
      includedInPayload: true,
      revalidateOnChange: false,
    },
    email: {
      required: true,
      messages: {
        required: 'Enter your email address',
      },
      validate: [
        {
          regEx: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          failed: 'Invalid email address',
        },
      ],
      includedInPayload: true,
      revalidateOnChange: false,
    },
    firstName: {
      required: true,
      messages: {
        required: 'Enter your first name',
      },
      validate: [
        {
          regEx: /^(.){2,100}$/,
          failed: 'Must be between 2 and 100 characters long',
        },
        {
          regEx: /^[a-zA-Z0-9' -]+$/,
          failed: `Name should use letters, numbers, spaces`,
        },
      ],
      includedInPayload: true,
      revalidateOnChange: false,
    },
    lastName: {
      required: true,
      messages: {
        required: 'Enter your last name',
      },
      validate: [
        {
          regEx: /^(.){2,100}$/,
          failed: 'Must be between 2 and 100 characters long',
        },
        {
          regEx: /^[a-zA-Z0-9' -]+$/,
          failed: `Name should use letters, numbers, spaces`,
        },
      ],
      includedInPayload: true,
      revalidateOnChange: false,
    },
    website: {
      required: false,
      messages: {},
      validate: [
        {
          regEx:
            /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
          failed: 'Please check the web address.',
        },
      ],
      includedInPayload: true,
      revalidateOnChange: false,
    },
    agreement: {
      required: false,
      messages: {},
      validate: [],
      includedInPayload: true,
      revalidateOnChange: true,
    },
  },
  getEntityUrl: (gatewayUrl: string, values: any) => `${gatewayUrl}/${values.signUpType}`,
};
