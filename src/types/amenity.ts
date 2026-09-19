import type { ContentSource } from "@/types/common";

export interface Amenity {
  id: string;
  nameVi: string;
  nameEn?: string;
  shortDescription?: string;
  featured?: boolean;
  source?: ContentSource;
}

export interface AmenityLevel {
  id: string;
  level: number;
  name: string;
  nameVi?: string;
  amenities: readonly Amenity[];
  source?: ContentSource;
}
