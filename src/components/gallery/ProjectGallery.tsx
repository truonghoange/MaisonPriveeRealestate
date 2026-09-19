import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { galleryMedia } from "@/data/media";

import { GalleryExplorer } from "./GalleryExplorer";

export function ProjectGallery() {
  const images = galleryMedia.map(
    ({ id, src, alt, category, artistImpression }) => ({
      id,
      src,
      alt,
      category,
      artistImpression: artistImpression ?? false,
    }),
  );

  return (
    <Section
      id="gallery"
      aria-labelledby="gallery-heading"
      tone="light"
      spacing="lg"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-16">
          <div>
            <Eyebrow>Project Gallery</Eyebrow>
            <Heading id="gallery-heading" as="h2" size="lg" className="mt-6">
              Thư viện
            </Heading>
          </div>
          <p className="text-muted max-w-[31rem] text-(length:--text-sm) leading-7">
            Một góc nhìn về kiến trúc, không gian đón tiếp và các trải nghiệm
            tại Maison Privée.
          </p>
        </div>
        <GalleryExplorer images={images} />
      </Container>
    </Section>
  );
}
