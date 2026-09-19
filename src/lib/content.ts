import type { Amenity, AmenityLevel } from "@/types/amenity";
import type { ContentSource } from "@/types/common";
import type { Residence, ResidenceType, TowerCode } from "@/types/residence";

const EMPTY_AMENITIES: readonly Amenity[] = [];

export function createProjectTrainingSource(
  page: number,
  note?: string,
): ContentSource {
  return {
    type: "project-training",
    label: "Maison Privée Training",
    page,
    ...(note ? { note } : {}),
  };
}

export function getAmenitiesByLevel(
  amenityLevels: readonly AmenityLevel[],
  level: number,
): readonly Amenity[] {
  return (
    amenityLevels.find((amenityLevel) => amenityLevel.level === level)
      ?.amenities ?? EMPTY_AMENITIES
  );
}

export function getFeaturedAmenities(
  amenityLevels: readonly AmenityLevel[],
): readonly Amenity[] {
  return amenityLevels.flatMap((amenityLevel) =>
    amenityLevel.amenities.filter((amenity) => amenity.featured),
  );
}

export function getResidencesByTower(
  residences: readonly Residence[],
  tower: TowerCode,
): readonly Residence[] {
  return residences.filter((residence) => residence.tower === tower);
}

export function getResidencesByType(
  residences: readonly Residence[],
  type: ResidenceType,
): readonly Residence[] {
  return residences.filter((residence) => residence.type === type);
}
