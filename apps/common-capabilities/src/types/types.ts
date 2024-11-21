type Contact = {
  details: string;
  methods: Array<{method: string, value: string, url: string}>;
}

export type ServiceListingResponse = {
  services: Array<Service>;
};

export type Service = {
  appId: string;
  serviceName: string;
  summary: string;
  description: string;
  recommended: boolean;
  provider: string;
  functionalGroup: string;
  environment: Array<{name: string}>;
  language: Array<{name: string}>;
  documentation: Array<string>;
  keywords: Array<{keyword: string}>;
  usageMethod: string;
  status: string;
  version: string;
  useCases: string;
  prerequisites: string;
  comments: string;
  cmra: string;
  stra: boolean;
  cmraReq: boolean;
  im: boolean;
  data: boolean;
  risk: boolean;
  cybersecurity: boolean;
  classification: string;
  controller: string;
  considerations: string;
  contact: Contact;
  filterText: string;
  supportLevel: string;
  audience: Array<{name: string}>;
  editorName: string,
  editorEmail: string
}
