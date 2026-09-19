import { createProjectTrainingSource } from "@/lib/content";
import type { ContentSource, LocalizedText } from "@/types/common";

export interface ManifestoItem {
  id: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  body?: LocalizedText;
  source: ContentSource;
}

export const manifestoItems = [
  {
    id: "restraint",
    eyebrow: {
      vi: "Nghệ thuật gạn lọc",
      en: "The mastery of restraint",
    },
    title: {
      vi: "Vượt trên sự xa hoa, nghệ thuật làm chủ sự gạn lọc.",
      en: "Beyond the urge to accumulate lies the mastery of restraint.",
    },
    body: {
      vi: "Từ chối sự ồn ào để giữ lấy nét tĩnh lặng.",
      en: "To refuse the loud, embrace the quiet.",
    },
    source: createProjectTrainingSource(3),
  },
  {
    id: "rarity",
    eyebrow: { vi: "Sự hiếm có", en: "Rarity" },
    title: {
      vi: "Sự hiếm có không tự nhiên sinh ra.",
      en: "Rarity is never born by chance.",
    },
    body: {
      vi: "Sự hiếm có là kết quả của một hành trình gạn lọc khắt khe.",
      en: "Rarity is the result of a rigorous journey of refusal and refinement.",
    },
    source: createProjectTrainingSource(4),
  },
  {
    id: "privacy",
    eyebrow: {
      vi: "Haute Couture Residences",
      en: "Haute Couture Residences",
    },
    title: {
      vi: "Chốn ẩn mình dành cho những ai thấu cảm sự riêng tư.",
      en: "A sanctuary for those who appreciate the value of privacy.",
    },
    source: createProjectTrainingSource(6),
  },
] as const satisfies readonly ManifestoItem[];
