export interface SiteVerifyResponse {
  success: boolean;
  score: number;
  action: string;
}

export interface RoadmapCsvData {
  when: string;
  provider: string;
  service: string;
  title: string;
  description: string;
  status: string;
  impacts: string;
}
