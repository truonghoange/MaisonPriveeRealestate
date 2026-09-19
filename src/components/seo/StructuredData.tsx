import { site } from "@/config/site";

export function StructuredData() {
  if (!site.indexable || !site.url) return null;

  const websiteId = new URL("/#website", site.url).toString();
  const pageId = new URL("/#webpage", site.url).toString();
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: site.name,
        url: site.url.origin,
        inLanguage: site.language,
        description: site.description,
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        name: site.title,
        url: site.url.origin,
        inLanguage: site.language,
        description: site.description,
        isPartOf: { "@id": websiteId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
