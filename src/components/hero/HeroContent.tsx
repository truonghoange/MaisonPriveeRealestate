import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { privatePreviewLink } from "@/data/navigation";
import { project } from "@/data/project";
import { cn } from "@/lib/utils";

import styles from "./Hero.module.css";

export function HeroContent() {
  const location = [project.location.township, project.location.city]
    .filter(Boolean)
    .join(" · ");

  return (
    <Container className={cn(styles.content, "relative z-10")}>
      <div className="w-full max-w-3xl">
        <Eyebrow className="text-inverse-foreground">{location}</Eyebrow>
        <Heading
          id="hero-title"
          as="h1"
          size="lg"
          className="text-inverse-foreground mt-5 whitespace-nowrap"
        >
          {project.name}
        </Heading>
        <p className="text-inverse-foreground mt-5 max-w-[18ch] font-[family-name:var(--font-serif)] text-(length:--heading-sm) leading-[1.12] tracking-[-0.005em]">
          {project.tagline.vi}
        </p>

        <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href="#manifesto" className="max-sm:w-full">
            Khám phá
          </Button>
          <Button
            href={privatePreviewLink.href}
            variant="secondary"
            className="max-sm:w-full"
          >
            {privatePreviewLink.label}
          </Button>
        </div>
      </div>
    </Container>
  );
}
