import { overviewMedia } from "@/data/media";
import { project } from "@/data/project";

function getSiteUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return process.env.NODE_ENV === "development"
      ? new URL("http://localhost:3000")
      : null;
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid HTTPS origin.");
  }

  if (
    (url.protocol !== "https:" &&
      !(process.env.NODE_ENV === "development" && url.protocol === "http:")) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid HTTPS origin.");
  }

  return new URL(url.origin);
}

const url = getSiteUrl();

export const site = {
  name: project.shortName,
  title: `${project.shortName} | Thông tin & tư vấn dự án`,
  description:
    "Khám phá Maison Privée tại Ciputra, Hà Nội: thông tin dự án, bộ sưu tập căn hộ và trải nghiệm sống. Website tư vấn độc lập, hỗ trợ đặt lịch Private Preview.",
  language: "vi",
  locale: "vi_VN",
  url,
  indexable: process.env.NODE_ENV === "production" && url !== null,
  ogImage: overviewMedia,
} as const;
