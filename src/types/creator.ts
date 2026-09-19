import type { ContentSource } from "@/types/common";

export type CreatorCategory =
  | "developer"
  | "joint-venture-partner"
  | "architecture"
  | "interior"
  | "landscape"
  | "consultant";

export interface ProjectCreator {
  id: string;
  name: string;
  category: CreatorCategory;
  roleVi: string;
  roleEn?: string;
  country?: string;
  description?: string;
  logo?: string;
  source?: ContentSource;
}
