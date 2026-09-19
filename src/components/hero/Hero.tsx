import { Container } from "@/components/layout/Container";
import { heroMedia } from "@/data/media";
import { cn } from "@/lib/utils";

import styles from "./Hero.module.css";
import { HeroContent } from "./HeroContent";
import { HeroMedia } from "./HeroMedia";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="section-tone-dark bg-background text-foreground relative isolate min-h-svh overflow-hidden"
    >
      <HeroMedia media={heroMedia} />
      <HeroContent />

      <Container
        className={cn(
          styles.scrollCue,
          "pointer-events-none absolute inset-x-0 z-10 flex items-end",
        )}
      >
        <a
          href="#manifesto"
          className="text-inverse-foreground pointer-events-auto inline-flex items-center gap-3 font-[family-name:var(--font-sans)] text-(length:--text-eyebrow) font-medium tracking-[0.16em] uppercase no-underline opacity-80 transition-opacity duration-(--duration-fast) hover:opacity-100"
        >
          <span
            aria-hidden="true"
            className="h-px w-9 bg-current transition-[width] duration-(--duration-normal) ease-(--ease-luxury)"
          />
          Khám phá
        </a>
      </Container>

      {heroMedia.artistImpression ? (
        <p
          className={cn(
            styles.artistLabel,
            "text-inverse-foreground/80 absolute right-(--container-padding) z-10 max-w-[12ch] text-right font-[family-name:var(--font-sans)] text-[0.625rem] leading-4 tracking-[0.08em] uppercase sm:max-w-none",
          )}
        >
          <span className="sm:hidden">Hình phối cảnh</span>
          <span className="hidden sm:inline">
            Hình phối cảnh | Artist&apos;s impression
          </span>
        </p>
      ) : null}
    </section>
  );
}
