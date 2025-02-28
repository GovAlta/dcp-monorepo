declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            execute: (
                siteKey: string,
                { action }: { action: string },
            ) => Promise<string>;
        };
    }
}

export type ApptFormValues = {
    orgName: string;
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    signUpType: string;
    techProvider: string;
    toDiscuss: string;
    agreement: boolean;
    formType: string;
    date: string;
    slot: string;
    calendarId: string;
};

export type SignUpFormValues = {
    signUpType: string;
    orgName: string;
    email: string;
    firstName: string;
    lastName: string;
    website: string;
    agreement: boolean;
    formType: string;
};

export type FormValues = ApptFormValues | SignUpFormValues;

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

export type FormProperties = {
    [K in keyof (ApptFormValues & SignUpFormValues)]?: FormField;
};

export type FormConfig = {
    properties: FormProperties;
    getEntityUrl: (gatewayUrl: string, values: FormValues) => string;
};
