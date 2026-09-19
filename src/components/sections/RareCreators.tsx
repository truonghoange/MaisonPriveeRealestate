import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { projectCreators } from "@/data/creators";
import type { ProjectCreator } from "@/types/creator";

const leadDeveloper = projectCreators.find(
  (item) => item.category === "developer",
);
const developmentPartners = projectCreators.filter(
  (item) => item.category === "joint-venture-partner",
);
const designConsultants: readonly ProjectCreator[] = projectCreators.filter(
  (item) => ["architecture", "interior", "landscape"].includes(item.category),
);

export function RareCreators() {
  return (
    <Section
      id="creators"
      aria-labelledby="creators-heading"
      tone="light"
      spacing="lg"
    >
      <Container>
        <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-14">
          <Eyebrow>Rare Creators</Eyebrow>
          <Heading
            id="creators-heading"
            as="h2"
            size="lg"
            className="max-w-[16ch]"
          >
            Những nhà kiến tạo hiếm có
          </Heading>
        </div>

        {leadDeveloper ? (
          <div className="border-border mt-(--section-space-md) grid gap-7 border-t py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-14 md:py-14">
            <p className="text-accent-text text-(length:--text-xs) font-medium tracking-[0.16em] uppercase">
              {leadDeveloper.roleVi}
            </p>
            <Heading as="h3" size="md" className="max-w-[20ch]">
              {leadDeveloper.name}
            </Heading>
          </div>
        ) : null}

        <div className="border-border grid gap-7 border-t py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-14 md:py-14">
          <p className="text-accent-text text-(length:--text-xs) font-medium tracking-[0.16em] uppercase">
            Đối tác phát triển
          </p>
          <ul className="space-y-6">
            {developmentPartners.map((creator) => (
              <li key={creator.id}>
                <p className="font-[family-name:var(--font-serif)] text-(length:--heading-sm) leading-[1.15]">
                  {creator.name}
                </p>
                <p className="text-muted mt-2 text-(length:--text-xs) tracking-[0.1em] uppercase">
                  {creator.roleVi}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-border grid gap-7 border-t pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-14 md:pt-14">
          <p className="text-accent-text text-(length:--text-xs) font-medium tracking-[0.16em] uppercase">
            Đội ngũ thiết kế
          </p>
          <ul className="border-border border-t">
            {designConsultants.map((creator) => (
              <li
                key={creator.id}
                className="border-border hover:text-accent-text grid gap-2 border-b py-5 transition-colors duration-(--duration-fast) sm:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] sm:items-baseline sm:gap-6"
              >
                <p className="font-[family-name:var(--font-serif)] text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2]">
                  {creator.name}
                </p>
                <div className="text-muted flex flex-wrap justify-between gap-x-4 gap-y-1 text-(length:--text-xs) tracking-[0.07em] uppercase">
                  <span>{creator.roleVi}</span>
                  {creator.country ? <span>{creator.country}</span> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
