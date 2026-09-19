import { createProjectTrainingSource } from "@/lib/content";

export const wellnessPositioning = {
  heading: "Lấy con người làm trung tâm",
  source: createProjectTrainingSource(58),
} as const;

export const wellnessFeatures = [
  {
    id: "air",
    label: "Không khí",
    detail: "Hệ thống cấp khí tươi có lọc cho Tòa P",
    source: createProjectTrainingSource(60),
  },
  {
    id: "water",
    label: "Nước",
    detail: "Hệ thống lọc nước UF cho tòa nhà",
    source: createProjectTrainingSource(60),
  },
  {
    id: "materials",
    label: "Vật liệu",
    detail: "Sơn có hàm lượng VOC thấp",
    source: createProjectTrainingSource(60),
  },
] as const;
