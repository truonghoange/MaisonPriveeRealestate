import type { ConsultantConfig } from "@/types/consultant";

export const consultant = {
  // Populate only with approved consultant details.
  name: "",
  role: "Tư vấn Maison Privée",
  phone: "",
  zaloUrl: "",
  email: "",
  qrImage: "",
} as const satisfies ConsultantConfig;
