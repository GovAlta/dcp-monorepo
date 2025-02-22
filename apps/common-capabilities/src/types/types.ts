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

type Contact = {
  details: string;
  methods: Array<{ type: string; value: string; url: string }>;
};

enum RoadmapStatus {
  Commited = 'Commited',
  Tentative = 'Tentative',
}

type Roadmap = {
  title: string;
  when: string;
  status: RoadmapStatus;
  type: string;
  description: string;
  impacts: Array<{ item: string }>;
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
