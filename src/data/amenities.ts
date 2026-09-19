import { createProjectTrainingSource } from "@/lib/content";
import type { AmenityLevel } from "@/types/amenity";

const featuredAmenitySource = (page: number) =>
  createProjectTrainingSource(
    page,
    "Presented on a dedicated amenity slide; used as the featured criterion.",
  );

export const amenityLevels = [
  {
    id: "privee-oasis",
    level: 1,
    name: "PRIVÉE OASIS",
    amenities: [
      {
        id: "private-car-garage",
        nameVi: "Khu Đỗ Siêu Xe",
        nameEn: "Private Car Garage",
        featured: true,
        source: featuredAmenitySource(37),
      },
      {
        id: "serene-courtyard",
        nameVi: "Vườn Tĩnh Uyển",
        nameEn: "Serene Courtyard",
        featured: true,
        source: featuredAmenitySource(35),
      },
      {
        id: "grand-lobby-and-reception",
        nameVi: "Đại Sảnh Và Lễ Tân",
        nameEn: "Grand Lobby & Reception",
        featured: true,
        source: featuredAmenitySource(38),
      },
      {
        id: "private-lift-lobby",
        nameVi: "Sảnh Chờ Thang Máy Riêng",
        nameEn: "Private Lift Lobby",
        featured: true,
        source: featuredAmenitySource(40),
      },
      {
        id: "resident-lounge",
        nameVi: "Sảnh Cư Dân",
        nameEn: "Resident Lounge",
        featured: true,
        source: featuredAmenitySource(41),
      },
      {
        id: "whisky-club",
        nameVi: "Sảnh Thưởng Rượu",
        nameEn: "Whisky Club",
        featured: true,
        source: featuredAmenitySource(42),
      },
      {
        id: "coworking-corner",
        nameVi: "Góc Làm Việc Chung",
        nameEn: "Coworking Corner",
      },
    ],
    source: createProjectTrainingSource(32),
  },
  {
    id: "wellness-suite",
    level: 2,
    name: "WELLNESS SUITE",
    amenities: [
      {
        id: "four-season-spa-pool",
        nameVi: "Bể Bơi Bốn Mùa",
        nameEn: "4-season Spa Pool",
        featured: true,
        source: featuredAmenitySource(47),
      },
      {
        id: "kids-wonder-lagoon",
        nameVi: "Hồ Bơi Thần Tiên",
        nameEn: "Kid’s Wonder Lagoon",
      },
      {
        id: "infrared-sauna-room",
        nameVi: "Phòng Xông Hơi Hồng Ngoại",
        nameEn: "Infrared Sauna Room",
        featured: true,
        source: featuredAmenitySource(48),
      },
      {
        id: "frost-chamber",
        nameVi: "Bể Trị Liệu Lạnh",
        nameEn: "Frost Chamber",
      },
      {
        id: "steam-room",
        nameVi: "Phòng Xông Hơi Nước",
        nameEn: "Steam Room",
        featured: true,
        source: featuredAmenitySource(48),
      },
      {
        id: "privee-spa-suite",
        nameVi: "Phòng Spa Chuyên Sâu",
        nameEn: "Privée Spa Suite",
        featured: true,
        source: featuredAmenitySource(49),
      },
      {
        id: "gym-arena",
        nameVi: "Phòng Tập Gym",
        nameEn: "Gym Arena",
        featured: true,
        source: featuredAmenitySource(46),
      },
      {
        id: "yoga-studio",
        nameVi: "Phòng Tập Yoga",
        nameEn: "Yoga Studio",
      },
      {
        id: "pilates-studio",
        nameVi: "Phòng Tập Pilates",
        nameEn: "Pilates Studio",
      },
      {
        id: "privee-nail-salon",
        nameVi: "Phòng Salon Nail",
        nameEn: "Privée Nail Salon",
      },
      {
        id: "privee-wellness-suite",
        nameVi: "Phòng Chăm Sóc Sức Khỏe",
        nameEn: "Privée Wellness Suite",
        featured: true,
        source: featuredAmenitySource(44),
      },
    ],
    source: createProjectTrainingSource(
      32,
      "The overview names 11 items; page 44 states that the Wellness Suite comprises 16 facilities.",
    ),
  },
  {
    id: "vitality-hub",
    level: 3,
    name: "VITALITY HUB",
    amenities: [
      {
        id: "grill-and-smoke-terrace",
        nameVi: "Vườn BBQ",
        nameEn: "Grill & Smoke Terrace",
      },
      {
        id: "twilight-promenade",
        nameVi: "Đường Dạo Hoàng Hôn",
        nameEn: "Twilight Promenade",
      },
      {
        id: "kids-adventure-land",
        nameVi: "Vùng Đất Phiêu Lưu",
        nameEn: "Kid's Adventure Land",
      },
      {
        id: "banquet-house",
        nameVi: "Sảnh Tiệc",
        nameEn: "Banquet House",
        featured: true,
        source: featuredAmenitySource(53),
      },
      {
        id: "three-dimensional-golf-simulator",
        nameVi: "Phòng Golf 3D",
        nameEn: "3D Golf Simulator",
        featured: true,
        source: featuredAmenitySource(51),
      },
      {
        id: "multimedia-theater",
        nameVi: "Phòng Chiếu Phim Đa Năng",
        nameEn: "Multimedia Theater",
        featured: true,
        source: featuredAmenitySource(52),
      },
      {
        id: "recreation-corner",
        nameVi: "Góc Giải Trí",
        nameEn: "Recreation Corner",
      },
    ],
    source: createProjectTrainingSource(32),
  },
  {
    id: "the-gathering",
    level: 13,
    name: "THE GATHERING",
    amenities: [
      {
        id: "sky-garden",
        nameVi: "Vườn Thượng Uyển",
        nameEn: "Sky Garden",
      },
    ],
    source: createProjectTrainingSource(32),
  },
  {
    id: "terrace-gardens",
    level: 20,
    name: "TERRACE GARDENS",
    amenities: [
      {
        id: "celestial-terrace",
        nameVi: "Vườn Dạo Thiên Hà",
        nameEn: "Celestial Terrace",
      },
      {
        id: "bonding-haven",
        nameVi: "Góc Gắn Kết",
        nameEn: "Bonding Haven",
      },
    ],
    source: createProjectTrainingSource(32),
  },
  {
    id: "the-crest-35",
    level: 35,
    name: "THE CREST 35",
    amenities: [
      {
        id: "starlight-bridge",
        nameVi: "Cầu Ánh Sao",
        nameEn: "Starlight Bridge",
      },
      {
        id: "pearl-infinity-pool",
        nameVi: "Bể Bơi Ngọc Trai Vô Cực",
        nameEn: "Pearl Infinity Pool",
        featured: true,
        source: featuredAmenitySource(56),
      },
      {
        id: "jacuzzi-nest",
        nameVi: "Bể Sục Thư Giãn",
        nameEn: "Jacuzzi Nest",
      },
      {
        id: "cloud-pavilion",
        nameVi: "Chòi Chân Mây",
        nameEn: "Cloud Pavilion",
      },
    ],
    source: createProjectTrainingSource(32),
  },
] as const satisfies readonly AmenityLevel[];
