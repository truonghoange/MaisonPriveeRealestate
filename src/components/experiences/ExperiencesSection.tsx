import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { amenityLevels } from "@/data/amenities";
import { experienceMedia } from "@/data/media";
import { project } from "@/data/project";
import type { ProjectMedia } from "@/types/media";

import { ExperienceNavigator } from "./ExperienceNavigator";
import type { ExperienceLevelView } from "./ExperienceNavigator";

const mediaByLevel: Partial<Record<string, ProjectMedia>> = experienceMedia;
const experienceMetric = project.metrics.find(
  (item) => item.key === "curated-experiences" && item.status === "confirmed",
);

const levels: ExperienceLevelView[] = [...amenityLevels]
  .sort((first, second) => second.level - first.level)
  .map((level) => {
    const media = mediaByLevel[level.id];

    return {
      id: level.id,
      number: level.level,
      name: level.name,
      amenities: level.amenities.map((amenity) => ({
        id: amenity.id,
        name: amenity.nameVi,
        featured: "featured" in amenity ? amenity.featured : false,
      })),
      media: media
        ? {
            src: media.src,
            alt: media.alt,
            artistImpression: media.artistImpression,
          }
        : undefined,
    };
  });

export function ExperiencesSection() {
  return (
    <Section
      id="experiences"
      aria-labelledby="experiences-heading"
      tone="dark"
      spacing="lg"
    >
      <Container>
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1.45fr)] md:items-center md:gap-12 lg:gap-16">
          <div>
            <Eyebrow>Curated Experiences</Eyebrow>
            {experienceMetric ? (
              <p className="mt-3 font-[family-name:var(--font-serif)] text-[clamp(5.75rem,15vw,12rem)] leading-[0.85] tracking-[-0.05em]">
                {experienceMetric.value}
              </p>
            ) : null}
          </div>
          <div className="md:pt-7">
            <Heading
              id="experiences-heading"
              as="h2"
              size="lg"
              className="max-w-[15ch]"
            >
              {experienceMetric?.label ?? "Trải nghiệm đa tầng tinh chọn"}
            </Heading>
            <p className="text-muted mt-6 max-w-[32rem] text-(length:--text-sm) leading-7">
              Khám phá những trải nghiệm tiêu biểu theo từng tầng.
            </p>
          </div>
        </div>

        <ExperienceNavigator levels={levels} />
      </Container>
    </Section>
  );
}
