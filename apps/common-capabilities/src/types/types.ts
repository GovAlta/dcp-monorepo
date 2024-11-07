type Contact = {
  details: string;
  methods: Array<{method: string, value: string, url: string}>;
}

export type Service = {
  ServiceName: string;
  Summary: string;
  Description: string;
  InternalWeightage: boolean;
  Provider: string;
  FunctionalGroup: string;
  Environment: Array<{name: string}>;
  Language: Array<{name: string}>;
  Documentation: Array<string>;
  Keywords: Array<{keyword: string}>;
  UsageMethod: string;
  Status: string;
  Version: string;
  UseCases: string;
  Prerequisites: string;
  Comments: string;
  CMRA: string;
  STRA: boolean;
  CmraReq: boolean;
  IM: boolean;
  Data: boolean;
  Risk: boolean;
  Cybersecurity: boolean;
  Classification: string;
  Controller: string;
  Considerations: string;
  Contact: Contact;
  filterText: string;
  SupportLevel: string;
  Audience: Array<{name: string}>;
}
