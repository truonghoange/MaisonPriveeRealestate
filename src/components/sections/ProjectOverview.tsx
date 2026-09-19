import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { overviewMedia } from "@/data/media";
import { project } from "@/data/project";

const publicMetricKeys = [
  "tower-count",
  "curated-experiences",
  "parking-ratio",
] as const;

const publicMetrics = publicMetricKeys.flatMap((key) => {
  const metric = project.metrics.find((item) => item.key === key);
  return metric?.status === "confirmed" ? [metric] : [];
});

const hauteCouture = project.positioning.find(
  (item) => item.id === "haute-couture-residences",
);
const privacy = project.positioning.find((item) => item.id === "privacy");

export function ProjectOverview() {
  return (
    <Section
      id="overview"
      aria-labelledby="overview-heading"
      tone="light"
      spacing="lg"
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:gap-16 lg:gap-24">
          <div>
            <Eyebrow>Tổng quan dự án</Eyebrow>
            <Heading
              id="overview-heading"
              as="h2"
              size="lg"
              className="mt-6 max-w-[11ch] leading-[1.1]"
            >
              {project.name}
            </Heading>
          </div>
          <div className="flex flex-col justify-end md:pb-2">
            {hauteCouture?.status === "confirmed" ? (
              <Text
                size="lead"
                className="font-[family-name:var(--font-serif)]"
              >
                {hauteCouture.label.vi}
              </Text>
            ) : null}
            {privacy?.status === "confirmed" ? (
              <Text tone="muted" className="mt-5 max-w-[30rem]">
                {privacy.label.vi}.
              </Text>
            ) : null}
            {project.location.status === "confirmed" ? (
              <p className="text-accent-text mt-8 text-(length:--text-xs) font-medium tracking-[0.14em] uppercase">
                {project.location.township} · {project.location.city}
              </p>
            ) : null}
          </div>
        </div>

        <dl className="border-border mt-(--section-space-md) grid border-t md:grid-cols-3">
          {publicMetrics.map((metric) => (
            <div
              key={metric.key}
              className="border-border flex items-baseline justify-between gap-6 border-b py-6 md:flex-col md:items-start md:gap-0 md:border-r md:border-b-0 md:px-8 md:py-9 md:first:pl-0 md:last:border-r-0"
            >
              <dt className="text-muted order-2 text-right text-(length:--text-xs) leading-5 font-medium tracking-[0.12em] uppercase md:mt-6 md:text-left">
                {metric.label}
              </dt>
              <dd className="order-1 font-[family-name:var(--font-serif)] text-(length:--heading-sm) leading-none text-nowrap">
                {metric.key === "tower-count"
                  ? String(metric.value).padStart(2, "0")
                  : metric.value}
              </dd>
            </div>
          ))}
        </dl>

        <figure className="mt-(--section-space-md)">
          <div className="bg-surface relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[2/1]">
            <Image
              src={overviewMedia.src}
              alt={overviewMedia.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1440px) calc(100vw - 8vw), 1280px"
              className="object-cover object-center"
            />
          </div>
          {overviewMedia.artistImpression ? (
            <figcaption className="text-muted mt-3 text-right text-[0.625rem] leading-4 tracking-[0.08em] uppercase">
              Hình phối cảnh | Artist&apos;s impression
            </figcaption>
          ) : null}
        </figure>
      </Container>
    </Section>
  );
}
