import type { FormConfig } from "../../contexts/types";

export const apptFormConfig: FormConfig = {
  properties: {
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
      oneOf: ['email', 'phoneNumber'],
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
    phoneNumber: {
      required: true,
      oneOf: ['email', 'phoneNumber'],
      messages: {
        required: 'Enter your phone number',
      },
      validate: [
        {
          regEx: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
          failed: 'Enter a valid phone number, including dashes',
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
    signUpType: {
      required: true,
      messages: {
        required: 'Select one of the options',
      },
      validate: [],
      includedInPayload: false,
      revalidateOnChange: true,
    },
    techProvider: {
      required: true,
      messages: {
        required: 'Select one of the options',
      },
      validate: [],
      includedInPayload: true,
      revalidateOnChange: true,
    },
    toDiscuss: {
      required: true,
      messages: {
        required: 'Describe what you would like to discuss'
      },
      validate: [],
      includedInPayload: true,
      revalidateOnChange: false,
    },
    agreement: {
      required: true,
      messages: {
        required: 'You will need to agree in order to be contacted',
      },
      validate: [],
      includedInPayload: true,
      revalidateOnChange: true,
    },
    date: {
      required: true,
      messages: {
        required: 'Select a date',
      },
      validate: [],
      includedInPayload: true,
      revalidateOnChange: true,
    },
    slot: {
      required: true,
      messages: {
        required: 'Select a time slot',
      },
      validate: [],
      includedInPayload: true,
      revalidateOnChange: true,
    },
  },
  getEntityUrl: (gatewayUrl: string, values: any) => `${gatewayUrl}/${values}`, // TODO replace returned url with a valid one
};
