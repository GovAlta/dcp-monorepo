export const signUpFormConfig: any = {
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
  },
  agreement: {
    required: false,
    messages: {},
    validate: [],
  },
};
