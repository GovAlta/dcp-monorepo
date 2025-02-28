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

export type ContactMethod = {
    type: string;
    value: string;
    url: string;
};

export type Contact = {
    details: string;
    methods: Array<ContactMethod>;
};

enum RoadmapStatus {
    Commited = 'Commited',
    Tentative = 'Tentative',
}

export type Roadmap = {
    title: string;
    when: string;
    status: RoadmapStatus;
    type: string;
    description: string;
    impacts: string;
};

export type ServiceListingResponse = {
    services: Array<Service>;
};

export enum Status {
    Live = 'Live',
    Alpha = 'Alpha',
    Beta = 'Beta',
    Future = 'Future',
    Deprecated = 'Deprecated',
    Decommissioned = 'Decommissioned',
    Other = 'Other',
}

export type Service = {
    appId: string;
    serviceName: string;
    summary: string;
    description: string;
    recommended: boolean;
    provider: string;
    functionalGroup: string;
    environment: Array<{ item: string }>;
    language: Array<{ item: string }>;
    documentation: Array<{ url: string; name: string }>;
    keywords: Array<{ item: string }>;
    usageMethod: string;
    status: Status;
    version: string;
    useCases: string;
    prerequisites: string;
    comments: string;
    cmra: string;
    stra: string;
    cmraReq: string;
    im: string;
    data: string;
    risk: string;
    cybersecurity: string;
    classification: string;
    controller: string;
    considerations: string;
    contact: Contact;
    filterText: string;
    supportLevel: string;
    audience: Array<{ item: string }>;
    editorName: string;
    editorEmail: string;
    roadmap: Array<Roadmap>;
    lastUpdatedDate: string;
};

export type ServiceAttribute = keyof Service;
