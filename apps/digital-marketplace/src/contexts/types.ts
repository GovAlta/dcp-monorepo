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
        }
    };
    getEntityUrl: (gatewayUrl: string, values: any) => string;
}