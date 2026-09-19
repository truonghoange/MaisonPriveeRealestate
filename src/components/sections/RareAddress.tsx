import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { locationContext } from "@/data/location";
import { locationMedia } from "@/data/media";
import { project } from "@/data/project";
import type { ConnectivityItem } from "@/types/project";

const publicConnectivityIds = ["strategic-ring-roads", "key-metro-lines"];
const publicConnectivity: readonly ConnectivityItem[] =
  project.connectivity.filter(
    (item) =>
      publicConnectivityIds.includes(item.id) &&
      item.status === "confirmed" &&
      item.duration !== undefined,
  );

export function RareAddress() {
  return (
    <Section
      id="location"
      aria-labelledby="location-heading"
      tone="dark"
      spacing="lg"
    >
      <Container>
        <div className="max-w-4xl">
          <Eyebrow>Rare Address</Eyebrow>
          <Heading id="location-heading" as="h2" size="lg" className="mt-6">
            Tọa độ hiếm có
          </Heading>
        </div>

        <div className="mt-(--section-space-md) grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-accent-text text-(length:--text-xs) font-medium tracking-[0.16em] uppercase">
                Maison Privée tại
              </p>
              <Heading as="h3" size="md" className="mt-5">
                {project.location.township}, {project.location.city}
              </Heading>
              <Text tone="muted" size="lead" className="mt-8 max-w-[29rem]">
                Một địa chỉ giữa {locationContext[0].label.toLowerCase()}, nơi
                có {locationContext[1].label.toLowerCase()}.
              </Text>
            </div>
            <p className="text-accent-text mt-12 text-(length:--text-xs) tracking-[0.14em] uppercase">
              {project.location.township} / {project.location.city}
            </p>
          </div>

          <figure>
            <div className="bg-surface relative min-h-80 overflow-hidden sm:min-h-96 lg:h-full">
              <Image
                src={locationMedia.src}
                alt={locationMedia.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1023px) 100vw, (max-width: 1440px) 54vw, 700px"
                className="object-cover object-center"
              />
              <div
                aria-hidden="true"
                className="from-background/80 absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t to-transparent"
              />
              <p className="text-foreground absolute bottom-6 left-7 font-[family-name:var(--font-serif)] text-(length:--heading-sm) sm:bottom-8 sm:left-9">
                {project.location.township}
              </p>
            </div>
            {locationMedia.artistImpression ? (
              <figcaption className="text-muted mt-3 text-right text-[0.625rem] leading-4 tracking-[0.08em] uppercase">
                Phối cảnh quy hoạch | Artist&apos;s impression
              </figcaption>
            ) : null}
          </figure>
        </div>

        <div className="border-border mt-(--section-space-md) grid gap-8 border-t pt-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
          <div>
            <Eyebrow>Kết nối</Eyebrow>
            <Text tone="muted" className="mt-4 max-w-sm">
              Kết nối từ Ciputra đến các trục giao thông trọng điểm.
            </Text>
          </div>
          <dl>
            {publicConnectivity.map((item) => (
              <div
                key={item.id}
                className="border-border flex items-baseline justify-between gap-5 border-b py-5 first:pt-0"
              >
                <dt className="text-sm leading-6 sm:text-base">
                  {item.label.vi}
                </dt>
                <dd className="font-[family-name:var(--font-serif)] text-2xl whitespace-nowrap sm:text-3xl">
                  {item.duration} phút
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
import Image from "next/image";
