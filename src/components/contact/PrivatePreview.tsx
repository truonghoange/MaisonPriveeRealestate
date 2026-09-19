import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { contactContent } from "@/data/contact";
import { residences } from "@/data/residences";

import { ConsultantProfile } from "./ConsultantProfile";
import { LeadForm } from "./LeadForm";

const residenceOptions = residences.map((residence) => ({
  value: residence.id,
  label: `Tower ${residence.tower} · ${residence.displayName}`,
}));

export function PrivatePreview() {
  return (
    <Section
      id="contact"
      aria-labelledby="contact-heading"
      tone="dark"
      spacing="lg"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-20 xl:gap-28">
          <div className="lg:flex lg:min-h-[42rem] lg:flex-col lg:justify-between">
            <div>
              <Eyebrow>{contactContent.eyebrow}</Eyebrow>
              <Heading
                id="contact-heading"
                as="h2"
                size="lg"
                className="mt-6 max-w-[13ch] text-[clamp(3rem,5.5vw,5.25rem)] leading-[1.12]"
              >
                {contactContent.heading}
              </Heading>
              <p className="text-muted mt-7 max-w-[31rem] text-(length:--text-sm) leading-7">
                {contactContent.introduction}
              </p>
            </div>
            <div className="mt-14 lg:mt-20">
              <ConsultantProfile />
            </div>
          </div>

          <div className="border-border border-t pt-7 lg:mt-1">
            <p className="text-accent-text mb-10 text-(length:--text-xs) font-medium tracking-[0.16em] uppercase">
              Yêu cầu tư vấn riêng
            </p>
            <LeadForm
              residenceOptions={residenceOptions}
              privacyNotice={contactContent.privacyNotice}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
