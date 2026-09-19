export type ContentStatus = "confirmed" | "placeholder" | "unknown";

export type SourceType =
  "project-training" | "official-project" | "consultant" | "internal";

export interface ContentSource {
  type: SourceType;
  label: string;
  page?: number;
  note?: string;
}

export interface LocalizedText {
  vi: string;
  en?: string;
}

export interface ProjectMetric {
  key: string;
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  status: ContentStatus;
  source?: ContentSource;
}
