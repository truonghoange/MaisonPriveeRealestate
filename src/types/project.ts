import type {
  ContentSource,
  ContentStatus,
  LocalizedText,
  ProjectMetric,
} from "@/types/common";

export interface ProjectLocation {
  projectAddress?: string;
  township?: string;
  ward?: string;
  city?: string;
  country?: string;
  status: ContentStatus;
  source?: ContentSource;
}

export interface ProjectPositioning {
  id: string;
  label: LocalizedText;
  status: ContentStatus;
  source?: ContentSource;
}

export interface ConnectivityItem {
  id: string;
  label: LocalizedText;
  duration?: number;
  durationUnit?: "min";
  description?: string;
  status: ContentStatus;
  source?: ContentSource;
}

export interface ProjectCertification {
  id: string;
  name: string;
  wording: string;
  status: "targeting" | "planned" | "certified" | "unknown";
  source?: ContentSource;
}

export interface ProjectCompletion {
  estimatedHandover?: string;
  wording?: LocalizedText;
  status: "estimated" | "confirmed" | "unknown";
  source?: ContentSource;
}

export interface ProjectDisclaimer {
  id: string;
  text: LocalizedText;
  source?: ContentSource;
}

export interface Project {
  id: string;
  name: string;
  shortName: string;
  tagline: LocalizedText;
  source?: ContentSource;
  taglineSource?: ContentSource;
  location: ProjectLocation;
  positioning: readonly ProjectPositioning[];
  developers: readonly string[];
  metrics: readonly ProjectMetric[];
  connectivity: readonly ConnectivityItem[];
  certifications: readonly ProjectCertification[];
  completion: ProjectCompletion;
  disclaimers: readonly ProjectDisclaimer[];
}
