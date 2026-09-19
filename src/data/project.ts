import { createProjectTrainingSource } from "@/lib/content";
import type { Project } from "@/types/project";

export const project = {
  id: "maison-privee",
  name: "Maison Privée",
  shortName: "Maison Privée",
  tagline: {
    vi: "Số ít chạm tới. Hiếm ai thuộc về.",
    en: "Few qualify. Fewer belong.",
  },
  source: createProjectTrainingSource(1),
  taglineSource: createProjectTrainingSource(96),
  location: {
    township: "Ciputra",
    city: "Hà Nội",
    status: "confirmed",
    source: createProjectTrainingSource(9),
  },
  positioning: [
    {
      id: "restraint",
      label: {
        vi: "Nghệ thuật gạn lọc",
        en: "The mastery of restraint",
      },
      status: "confirmed",
      source: createProjectTrainingSource(3),
    },
    {
      id: "rarity",
      label: { vi: "Sự hiếm có", en: "Rarity" },
      status: "confirmed",
      source: createProjectTrainingSource(4),
    },
    {
      id: "haute-couture-residences",
      label: {
        vi: "Haute Couture Residences",
        en: "Haute Couture Residences",
      },
      status: "confirmed",
      source: createProjectTrainingSource(6),
    },
    {
      id: "privacy",
      label: {
        vi: "Chốn ẩn mình dành cho những ai thấu cảm sự riêng tư",
        en: "A sanctuary for those who appreciate the value of privacy",
      },
      status: "confirmed",
      source: createProjectTrainingSource(6),
    },
  ],
  developers: [
    "capitaland-development",
    "mitsubishi-estate",
    "nomura-real-estate-development",
  ],
  metrics: [
    {
      key: "tower-count",
      label: "Số tòa tháp",
      value: 2,
      status: "confirmed",
      source: createProjectTrainingSource(63),
    },
    {
      key: "displayed-product-total",
      label: "Tổng theo bảng sản phẩm",
      value: 490,
      description:
        "Giá trị cộng từ Total 182 của Tòa P và Total 308 của Tòa M; tài liệu không ghi rõ đơn vị của hai tổng này.",
      status: "unknown",
      source: createProjectTrainingSource(
        63,
        "Derived from the displayed totals 182 and 308; the table does not explicitly label them as unit counts.",
      ),
    },
    {
      key: "curated-experiences",
      label: "Trải nghiệm đa tầng tinh chọn",
      value: 68,
      unit: "trải nghiệm",
      status: "confirmed",
      source: createProjectTrainingSource(
        32,
        "The overview states 68 experiences and names 32 individual items.",
      ),
    },
    {
      key: "parking-ratio",
      label: "Tỷ lệ đỗ xe",
      value: "1:1",
      status: "confirmed",
      source: createProjectTrainingSource(96),
    },
  ],
  connectivity: [
    {
      id: "hoan-kiem-lake",
      label: { vi: "Hồ Hoàn Kiếm", en: "Hoan Kiem Lake" },
      description:
        "Danh sách ghi 15 phút, trong khi bản đồ cùng trang ghi 30 phút.",
      status: "unknown",
      source: createProjectTrainingSource(
        10,
        "The list states 15 minutes; the map states 30 minutes.",
      ),
    },
    {
      id: "noi-bai-international-airport",
      label: {
        vi: "Sân bay Quốc tế Nội Bài",
        en: "Noi Bai International Airport",
      },
      description:
        "Danh sách ghi 20 phút, trong khi bản đồ cùng trang ghi 30 phút.",
      status: "unknown",
      source: createProjectTrainingSource(
        10,
        "The list states 20 minutes; the map states 30 minutes.",
      ),
    },
    {
      id: "strategic-ring-roads",
      label: {
        vi: "Hệ thống vành đai chiến lược (1, 2, 2.5, 3)",
        en: "Strategic Ring Road system (1, 2, 2.5, 3)",
      },
      duration: 5,
      durationUnit: "min",
      status: "confirmed",
      source: createProjectTrainingSource(10),
    },
    {
      id: "key-metro-lines",
      label: {
        vi: "Các tuyến metro trọng điểm (2, 10, 14)",
        en: "Key metro lines (2, 10, 14)",
      },
      duration: 5,
      durationUnit: "min",
      status: "confirmed",
      source: createProjectTrainingSource(10),
    },
  ],
  certifications: [
    {
      id: "well-residential-pre-certification",
      name: "WELL for Residential Pre-Certification",
      wording:
        "Targeting Vietnam's first WELL for Residential Pre-Certification",
      status: "targeting",
      source: createProjectTrainingSource(59),
    },
  ],
  completion: {
    estimatedHandover: "Quý 4/2029",
    wording: {
      vi: "Dự kiến bàn giao",
      en: "Estimated handover",
    },
    status: "estimated",
    source: createProjectTrainingSource(
      91,
      "This is an estimated handover date, not a confirmed completion date.",
    ),
  },
  disclaimers: [
    {
      id: "project-information",
      text: {
        vi: "Lưu ý: Chúng tôi rất cẩn trọng trong việc chuẩn bị tài liệu này, tuy nhiên chúng tôi sẽ không đảm bảo tính chính xác hoặc không chịu trách nhiệm pháp lý cho bản thông tin và các đặc điểm kỹ thuật này. Chủ đầu tư có quyền thay đổi những thông tin liên quan đến dự án hoặc bất kỳ những phát sinh nào theo yêu cầu hoặc sự chấp thuận của cơ quan nhà nước có thẩm quyền.",
        en: "Whilst every care has been taken to ensure accuracy in the preparation of the information contained herein, no warranties whatsoever are given, or legal representations provided in respect thereon. The Developer reserves the right to modify information of the development or any part thereof, subject to requirements or approvals by the competent authorities.",
      },
      source: createProjectTrainingSource(63),
    },
  ],
} as const satisfies Project;
