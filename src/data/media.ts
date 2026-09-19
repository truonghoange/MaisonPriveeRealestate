import { createProjectTrainingSource } from "@/lib/content";
import type { ProjectMedia } from "@/types/media";

export const heroMedia = {
  id: "hero-night",
  src: "/media/hero/maison-privee-night.webp",
  alt: "Phối cảnh ban đêm của hai tòa tháp Maison Privée tại Ciputra, Hà Nội",
  category: "hero",
  width: 2731,
  height: 1536,
  featured: true,
  artistImpression: true,
  source: createProjectTrainingSource(
    30,
    "Clean embedded nighttime raster extracted directly from the PDF with pdfimages.",
  ),
} as const satisfies ProjectMedia;

export const overviewMedia = {
  id: "overview-day",
  src: "/media/project/maison-privee-day.webp",
  alt: "Phối cảnh ban ngày của hai tòa tháp Maison Privée giữa cảnh quan xanh và mặt nước",
  category: "architecture",
  width: 2600,
  height: 1463,
  featured: true,
  artistImpression: true,
  source: createProjectTrainingSource(
    29,
    "Clean embedded daytime raster extracted directly from the PDF and optimized to WebP.",
  ),
} as const satisfies ProjectMedia;

export const locationMedia = {
  id: "ciputra-aerial",
  src: "/media/location/ciputra-aerial.webp",
  alt: "Phối cảnh quy hoạch khu đô thị Ciputra với cảnh quan xanh và mặt nước",
  category: "location",
  width: 2200,
  height: 1190,
  artistImpression: true,
  source: createProjectTrainingSource(
    9,
    "Clean embedded Ciputra aerial raster.",
  ),
} as const satisfies ProjectMedia;

export const experienceMedia = {
  "privee-oasis": {
    id: "serene-courtyard",
    src: "/media/amenities/serene-courtyard.webp",
    alt: "Phối cảnh Vườn Tĩnh Uyển với lối dạo, cây xanh và mặt nước",
    category: "amenity",
    width: 2200,
    height: 1237,
    artistImpression: true,
    source: createProjectTrainingSource(35),
  },
  "wellness-suite": {
    id: "four-season-spa-pool",
    src: "/media/amenities/four-season-spa-pool.webp",
    alt: "Phối cảnh Bể Bơi Bốn Mùa bên cửa kính và khu ghế nghỉ",
    category: "amenity",
    width: 2200,
    height: 1224,
    artistImpression: true,
    source: createProjectTrainingSource(47),
  },
  "vitality-hub": {
    id: "golf-simulator",
    src: "/media/amenities/golf-simulator.webp",
    alt: "Phối cảnh Phòng Golf 3D với hai khu tập trong nhà",
    category: "amenity",
    width: 2200,
    height: 1238,
    artistImpression: true,
    source: createProjectTrainingSource(51),
  },
  "the-crest-35": {
    id: "pearl-infinity-pool",
    src: "/media/amenities/pearl-infinity-pool.webp",
    alt: "Phối cảnh Bể Bơi Ngọc Trai Vô Cực trên tầng cao",
    category: "amenity",
    width: 2200,
    height: 1238,
    artistImpression: true,
    source: createProjectTrainingSource(56),
  },
} as const satisfies Partial<Record<string, ProjectMedia>>;

export const wellnessMedia = {
  id: "wellness-sauna",
  src: "/media/amenities/wellness-sauna.webp",
  alt: "Phối cảnh không gian xông hơi và bể trị liệu tại Wellness Suite",
  category: "wellness",
  width: 2200,
  height: 1237,
  artistImpression: true,
  source: createProjectTrainingSource(48),
} as const satisfies ProjectMedia;

export const residenceCollectionMedia = {
  M: {
    id: "tower-m-architecture",
    src: "/media/residences/tower-m.webp",
    alt: "Phối cảnh kiến trúc tòa M của Maison Privée",
    category: "residence",
    width: 1727,
    height: 2298,
    artistImpression: true,
    source: createProjectTrainingSource(
      66,
      "Clean embedded tower rendering; this is not a unit-specific floor plan.",
    ),
  },
  P: {
    id: "tower-p-architecture",
    src: "/media/residences/tower-p.webp",
    alt: "Phối cảnh kiến trúc tòa P của Maison Privée",
    category: "residence",
    width: 1749,
    height: 2473,
    artistImpression: true,
    source: createProjectTrainingSource(
      74,
      "Clean embedded tower rendering; this is not a unit-specific floor plan.",
    ),
  },
} as const satisfies Record<"M" | "P", ProjectMedia>;

export const galleryMedia = [
  overviewMedia,
  {
    id: "arrival-courtyard",
    src: "/media/project/arrival-courtyard.webp",
    alt: "Phối cảnh sân đón và lối vào Maison Privée",
    category: "architecture",
    width: 2200,
    height: 1237,
    artistImpression: true,
    source: createProjectTrainingSource(
      34,
      "Clean embedded arrival rendering.",
    ),
  },
  {
    id: "grand-lobby",
    src: "/media/project/grand-lobby.webp",
    alt: "Phối cảnh sảnh đón với quầy tiếp tân Maison Privée",
    category: "lobby",
    width: 2200,
    height: 1250,
    artistImpression: true,
    source: createProjectTrainingSource(
      38,
      "Clean embedded grand lobby rendering.",
    ),
  },
  {
    id: "grand-lobby-lounge",
    src: "/media/project/grand-lobby-lounge.webp",
    alt: "Phối cảnh không gian tiếp khách tại sảnh Maison Privée",
    category: "lobby",
    width: 2200,
    height: 1238,
    artistImpression: true,
    source: createProjectTrainingSource(
      39,
      "Clean embedded lobby lounge rendering.",
    ),
  },
  {
    id: "private-lift-lobby",
    src: "/media/project/private-lift-lobby.webp",
    alt: "Phối cảnh sảnh thang máy riêng với vật liệu đá và gỗ",
    category: "lobby",
    width: 2200,
    height: 1809,
    artistImpression: true,
    source: createProjectTrainingSource(
      40,
      "Clean embedded private lift lobby rendering.",
    ),
  },
  {
    id: "club-lounge",
    src: "/media/project/club-lounge.webp",
    alt: "Phối cảnh không gian lounge Maison Privée với cửa kính cao và khu tiếp khách",
    category: "lobby",
    width: 2200,
    height: 1238,
    artistImpression: true,
    source: createProjectTrainingSource(41, "Clean embedded lounge rendering."),
  },
  ...Object.values(experienceMedia),
  wellnessMedia,
  residenceCollectionMedia.M,
  residenceCollectionMedia.P,
] as const satisfies readonly ProjectMedia[];

export const projectMedia: readonly ProjectMedia[] = [
  heroMedia,
  locationMedia,
  ...galleryMedia,
];
