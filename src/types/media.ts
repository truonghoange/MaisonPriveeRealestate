import type { ContentSource } from "@/types/common";

export type MediaCategory =
  | "hero"
  | "architecture"
  | "location"
  | "lobby"
  | "amenity"
  | "wellness"
  | "residence"
  | "creator";

export interface ProjectMedia {
  id: string;
  src: string;
  alt: string;
  category: MediaCategory;
  width?: number;
  height?: number;
  featured?: boolean;
  artistImpression?: boolean;
  source?: ContentSource;
}
