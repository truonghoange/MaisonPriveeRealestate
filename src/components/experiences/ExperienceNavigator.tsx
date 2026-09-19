"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ProjectMedia } from "@/types/media";

import styles from "./ExperienceNavigator.module.css";

export type ExperienceLevelView = {
  id: string;
  number: number;
  name: string;
  amenities: readonly {
    id: string;
    name: string;
    featured: boolean;
  }[];
  media?: Pick<ProjectMedia, "src" | "alt" | "artistImpression">;
};

function levelNumber(number: number) {
  return String(number).padStart(2, "0");
}

function ExperienceVisual({ level }: { level: ExperienceLevelView }) {
  if (!level.media) {
    return (
      <div
        aria-hidden="true"
        className="border-border bg-surface relative hidden min-h-72 items-center justify-center overflow-hidden border lg:flex"
      >
        <span className="text-foreground/10 font-[family-name:var(--font-serif)] text-[clamp(9rem,22vw,19rem)] leading-none">
          {levelNumber(level.number)}
        </span>
        <span className="text-accent-text absolute bottom-7 left-7 text-(length:--text-xs) tracking-[0.16em] uppercase">
          {level.name}
        </span>
      </div>
    );
  }

  return (
    <figure className={styles.visual}>
      <div className="bg-surface relative aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-[16/9]">
        <Image
          src={level.media.src}
          alt={level.media.alt}
          fill
          loading="lazy"
          sizes="(max-width: 1023px) 100vw, (max-width: 1440px) 56vw, 720px"
          className="object-cover"
        />
      </div>
      {level.media.artistImpression ? (
        <figcaption className="text-muted mt-2 text-right text-[0.625rem] leading-4 tracking-[0.08em] uppercase">
          Hình phối cảnh | Artist&apos;s impression
        </figcaption>
      ) : null}
    </figure>
  );
}

function ExperienceDetails({ level }: { level: ExperienceLevelView }) {
  return (
    <div>
      <p className="text-accent-text text-(length:--text-xs) tracking-[0.15em] uppercase">
        Tầng {levelNumber(level.number)}
      </p>
      <h3 className="mt-3 font-[family-name:var(--font-serif)] text-(length:--heading-sm) leading-[1.15]">
        {level.name}
      </h3>
      <ul className="border-border mt-8 grid border-t sm:grid-cols-2 sm:gap-x-10">
        {level.amenities.map((amenity) => (
          <li
            key={amenity.id}
            className={cn(
              "border-border border-b py-4.5 text-(length:--text-sm) leading-7",
              amenity.featured ? "text-foreground" : "text-muted",
            )}
          >
            {amenity.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceNavigator({
  levels,
}: {
  levels: readonly ExperienceLevelView[];
}) {
  const [activeId, setActiveId] = useState(levels[0]?.id ?? "");
  const activeLevel =
    levels.find((level) => level.id === activeId) ?? levels[0];

  if (!activeLevel) return null;

  return (
    <div className="border-border mt-16 border-t pt-7 md:mt-20 lg:mt-24 lg:pt-10">
      <div className="hidden gap-12 lg:grid lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:gap-16 xl:gap-24">
        <nav aria-label="Chọn tầng trải nghiệm">
          <p className="text-accent-text mb-5 text-(length:--text-xs) tracking-[0.16em] uppercase">
            Khám phá theo tầng
          </p>
          {levels.map((level) => {
            const selected = level.id === activeId;
            return (
              <button
                key={level.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveId(level.id)}
                className={cn(
                  "flex min-h-20 w-full items-center gap-6 border-b py-4 text-left transition-colors duration-(--duration-fast)",
                  selected
                    ? "border-accent text-foreground"
                    : "border-border text-muted hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-[family-name:var(--font-serif)] text-4xl leading-none",
                    selected && "text-accent-text",
                  )}
                >
                  {levelNumber(level.number)}
                </span>
                <span className="text-(length:--text-xs) font-medium tracking-[0.12em] uppercase">
                  {level.name}
                </span>
              </button>
            );
          })}
        </nav>
        <div key={activeLevel.id} className="min-w-0">
          <ExperienceVisual level={activeLevel} />
          <div className="mt-9">
            <ExperienceDetails level={activeLevel} />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <p className="text-accent-text mb-4 text-(length:--text-xs) tracking-[0.16em] uppercase">
          Khám phá theo tầng
        </p>
        {levels.map((level) => {
          const expanded = level.id === activeId;
          return (
            <div key={level.id} className="border-border border-b">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setActiveId(level.id)}
                className={cn(
                  "-mb-px flex min-h-20 w-full items-center gap-5 border-b py-4 text-left transition-colors duration-(--duration-fast)",
                  expanded
                    ? "border-accent text-foreground"
                    : "text-muted hover:text-foreground border-transparent",
                )}
              >
                <span
                  className={cn(
                    "font-[family-name:var(--font-serif)] text-4xl leading-none",
                    expanded && "text-accent-text",
                  )}
                >
                  {levelNumber(level.number)}
                </span>
                <span className="flex-1 text-(length:--text-xs) font-medium tracking-[0.11em] uppercase">
                  {level.name}
                </span>
                <span aria-hidden="true" className="text-2xl font-light">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              {expanded ? (
                <div className="pb-10">
                  <ExperienceVisual level={level} />
                  <div className="mt-7">
                    <ExperienceDetails level={level} />
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
