import type { MetadataRoute } from "next";

import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable || !site.url) return [];

  return [{ url: site.url.origin }];
}
