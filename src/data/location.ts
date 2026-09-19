import { createProjectTrainingSource } from "@/lib/content";

export const locationContext = [
  {
    id: "international-township",
    label: "Khu đô thị quốc tế",
    source: createProjectTrainingSource(9),
  },
  {
    id: "greenery-and-water",
    label: "Không gian xanh và mặt nước",
    source: createProjectTrainingSource(9),
  },
] as const;
