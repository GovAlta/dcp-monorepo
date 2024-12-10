export type FormConfig = {
    properties: { 
        [key: string]: {
            required: boolean;
            oneOf?: string[];
            messages: { 
                [key: string]: string 
            };
            validate: { 
                regEx: RegExp;
                failed: string;
            }[];
            includedInPayload: boolean;
            revalidateOnChange: boolean; // some fields should have immediate feedback on errors, however we dont want some input to be revalidated on every key stroke (onChange)
        }
    };
    getEntityUrl: (gatewayUrl: string, values: any) => string;
}