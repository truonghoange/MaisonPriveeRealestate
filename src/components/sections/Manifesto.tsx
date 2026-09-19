import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Divider } from "@/components/ui/Divider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { manifestoItems } from "@/data/manifesto";

const [restraint, rarity, privacy] = manifestoItems;

export function Manifesto() {
  return (
    <Section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      tone="light"
      spacing="lg"
      className="overflow-hidden pb-0"
    >
      <Container>
        <div className="grid gap-y-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-16 lg:gap-x-24">
          <div className="md:pt-3">
            <Eyebrow>{restraint.eyebrow.vi}</Eyebrow>
            <p className="text-muted mt-4 font-[family-name:var(--font-sans)] text-(length:--text-xs) tracking-[0.12em] uppercase">
              01 — Tuyên ngôn
            </p>
          </div>

          <div className="max-w-4xl">
            <Heading
              id="manifesto-heading"
              as="h2"
              size="lg"
              className="leading-[1.08] tracking-[-0.01em]"
            >
              {restraint.title.vi}
            </Heading>
            {restraint.body ? (
              <Text size="lead" tone="muted" className="mt-8 max-w-[34rem]">
                {restraint.body.vi}
              </Text>
            ) : null}
          </div>
        </div>

        <Divider className="my-(--section-space-md)" aria-hidden="true" />

        <div className="grid gap-y-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-16 lg:gap-x-24">
          <div className="md:pt-3">
            <Eyebrow>{rarity.eyebrow.vi}</Eyebrow>
            <p className="text-muted mt-4 font-[family-name:var(--font-sans)] text-(length:--text-xs) tracking-[0.12em] uppercase">
              02 — Gạn lọc
            </p>
          </div>

          <div className="max-w-3xl md:ml-auto md:w-full">
            <Heading as="h3" size="md" className="leading-[1.1]">
              {rarity.title.vi}
            </Heading>
            {rarity.body ? (
              <Text size="lead" tone="muted" className="mt-8 max-w-[36rem]">
                {rarity.body.vi}
              </Text>
            ) : null}
          </div>
        </div>
      </Container>

      <div className="section-tone-dark bg-background text-foreground mt-(--section-space-lg) py-(--section-space-md)">
        <Container>
          <div className="grid items-end gap-y-9 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-16 lg:gap-x-24">
            <Eyebrow>{privacy.eyebrow.vi}</Eyebrow>
            <Heading as="h3" size="md" className="max-w-3xl leading-[1.1]">
              {privacy.title.vi}
            </Heading>
          </div>
        </Container>
      </div>
    </Section>
  );
}
