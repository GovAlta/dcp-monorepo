declare global {
  interface Window {
    grecaptcha: any;
  }
}

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
  environment: Array<{item: string}>;
  language: Array<{item: string}>;
  documentation: Array<{url: string, name: string}>;
  keywords: Array<{item: string}>;
  usageMethod: string;
  status: string;
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
  audience: Array<{item: string}>;
  editorName: string,
  editorEmail: string
}
