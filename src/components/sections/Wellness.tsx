import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { wellnessMedia } from "@/data/media";
import { project } from "@/data/project";
import { wellnessFeatures, wellnessPositioning } from "@/data/wellness";

const wellDirection = project.certifications.find(
  (item) =>
    item.id === "well-residential-pre-certification" &&
    item.status === "targeting",
);

export function Wellness() {
  return (
    <Section aria-labelledby="wellness-heading" tone="light" spacing="lg">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-end lg:gap-20">
          <div>
            <Eyebrow>Wellness</Eyebrow>
            <Heading
              id="wellness-heading"
              as="h2"
              size="lg"
              className="mt-6 max-w-[13ch]"
            >
              {wellnessPositioning.heading}
            </Heading>
          </div>
          {wellDirection ? (
            <div className="border-border border-l pl-6 lg:mb-2 lg:pl-8">
              <p className="text-accent-text text-(length:--text-xs) font-medium tracking-[0.16em] uppercase">
                Định hướng chứng chỉ
              </p>
              <p className="mt-4 max-w-[32rem] font-[family-name:var(--font-serif)] text-(length:--text-lead) leading-[1.45]">
                Hướng tới {wellDirection.name}
              </p>
            </div>
          ) : null}
        </div>

        <figure className="mt-14 md:mt-16 lg:mt-20">
          <div className="bg-surface relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[2/1]">
            <Image
              src={wellnessMedia.src}
              alt={wellnessMedia.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1440px) calc(100vw - 8vw), 1280px"
              className="object-cover object-center"
            />
          </div>
          {wellnessMedia.artistImpression ? (
            <figcaption className="text-muted mt-3 text-right text-[0.625rem] leading-4 tracking-[0.08em] uppercase">
              Hình phối cảnh | Artist&apos;s impression
            </figcaption>
          ) : null}
        </figure>

        <div className="border-border mt-(--section-space-md) border-t pt-8">
          <Eyebrow>Định hướng thiết kế</Eyebrow>
          <dl className="mt-8 grid gap-8 md:grid-cols-3 md:gap-12">
            {wellnessFeatures.map((feature, index) => (
              <div key={feature.id} className="border-border border-t pt-6">
                <dt className="text-accent-text text-(length:--text-xs) font-medium tracking-[0.14em] uppercase">
                  {String(index + 1).padStart(2, "0")} / {feature.label}
                </dt>
                <dd className="mt-5 max-w-[20rem] font-[family-name:var(--font-serif)] text-[clamp(1.5rem,2.4vw,2.125rem)] leading-[1.25]">
                  {feature.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
