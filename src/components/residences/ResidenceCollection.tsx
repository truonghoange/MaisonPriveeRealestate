import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { residenceCollectionMedia } from "@/data/media";
import { residences } from "@/data/residences";

import { ResidenceExplorer } from "./ResidenceExplorer";

export function ResidenceCollection() {
  const collection = residences.map(({ id, tower, displayName, area }) => ({
    id,
    tower,
    displayName,
    area,
  }));

  return (
    <Section
      id="residences"
      aria-labelledby="residences-heading"
      tone="dark"
      spacing="lg"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-end md:gap-16">
          <div>
            <Eyebrow>Private Residences</Eyebrow>
            <Heading
              id="residences-heading"
              as="h2"
              size="lg"
              className="mt-6 max-w-[15ch]"
            >
              Bộ sưu tập căn hộ
            </Heading>
          </div>
          <p className="text-muted max-w-[29rem] text-(length:--text-sm) leading-7">
            Khám phá các dòng căn hộ được giới thiệu tại hai tòa tháp M và P.
            Diện tích hiển thị là số liệu xấp xỉ theo tài liệu dự án.
          </p>
        </div>
        <ResidenceExplorer
          residences={collection}
          towerMedia={{
            M: {
              src: residenceCollectionMedia.M.src,
              alt: residenceCollectionMedia.M.alt,
              artistImpression: residenceCollectionMedia.M.artistImpression,
            },
            P: {
              src: residenceCollectionMedia.P.src,
              alt: residenceCollectionMedia.P.alt,
              artistImpression: residenceCollectionMedia.P.artistImpression,
            },
          }}
        />
      </Container>
    </Section>
  );
}
