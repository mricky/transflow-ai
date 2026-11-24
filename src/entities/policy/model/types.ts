export type PolicyCategory = 
  | "baggage" 
  | "pool_location" 
  | "reschedule" 
  | "fleet_spec"
  | "toll_mbz_routing"
  | "rest_area"
  | "weather_safety";

export interface PolicyDoc {
  id: string;
  category: PolicyCategory;
  title: string;
  code: string;
  summary: string;
  content: string[];
  rules: Record<string, string>;
  citation: string;
}

export interface RagSearchResult {
  document: PolicyDoc;
  score: number;
  highlightSnippet: string;
}
