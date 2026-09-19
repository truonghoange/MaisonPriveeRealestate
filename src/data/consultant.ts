import type { ConsultantConfig } from "@/types/consultant";

export const consultant = {
  // Populate only with approved consultant details.
  name: "Đặng Văn Hưng",
  role: "Tư vấn Maison Privée",
  phone: "0867030418",
  zaloUrl: "https://zalo.me/0867030418",
  email: "",
  qrImage: "",
} as const satisfies ConsultantConfig;
