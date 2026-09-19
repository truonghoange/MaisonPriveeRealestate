"use client";

import Image from "next/image";
import { useState } from "react";

import { formatResidenceArea } from "@/lib/formatResidenceArea";
import type { AreaRange, TowerCode } from "@/types/residence";

interface ResidenceView {
  id: string;
  tower: TowerCode;
  displayName: string;
  area: AreaRange;
}

interface CollectionMedia {
  src: string;
  alt: string;
  artistImpression: boolean;
}

interface ResidenceExplorerProps {
  residences: readonly ResidenceView[];
  towerMedia: Record<TowerCode, CollectionMedia>;
}

const towers: readonly TowerCode[] = ["M", "P"];

export function ResidenceExplorer({
  residences,
  towerMedia,
}: ResidenceExplorerProps) {
  const [tower, setTower] = useState<TowerCode>("M");
  const [selectedId, setSelectedId] = useState<string | undefined>(
    residences.find((residence) => residence.tower === "M")?.id ??
      residences[0]?.id,
  );
  const visible = residences.filter((residence) => residence.tower === tower);
  const selected =
    visible.find((residence) => residence.id === selectedId) ?? visible[0];
  const media = towerMedia[tower];

  function selectTower(nextTower: TowerCode) {
    setTower(nextTower);
    setSelectedId(
      residences.find((residence) => residence.tower === nextTower)?.id,
    );
  }

  if (!selected) return null;

  return (
    <div className="border-border mt-(--section-space-md) border-t pt-8 md:pt-12">
      <div
        className="flex flex-wrap"
        style={{
          columnGap: "clamp(2rem, 4vw, 3rem)",
          rowGap: "1rem",
        }}
        aria-label="Chọn tòa tháp"
      >
        {towers.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={tower === item}
            onClick={() => selectTower(item)}
            className={`hover:text-accent-text after:bg-accent relative cursor-pointer pb-3 text-(length:--text-sm) font-medium tracking-[0.18em] whitespace-nowrap uppercase transition-colors duration-(--duration-fast) after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:transition-transform after:duration-(--duration-fast) ${tower === item ? "text-foreground after:scale-x-100" : "text-muted after:scale-x-0"}`}
          >
            Tower {item}
          </button>
        ))}
      </div>

      <div className="mt-9 grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20">
        <div>
          <p className="text-accent-text text-(length:--text-xs) tracking-[0.16em] uppercase">
            Các dòng căn hộ · Tower {tower}
          </p>
          <div className="border-border mt-5 border-t">
            {visible.map((residence, index) => (
              <button
                key={residence.id}
                type="button"
                aria-pressed={selected.id === residence.id}
                onClick={() => setSelectedId(residence.id)}
                className={`group hover:text-accent-text flex w-full cursor-pointer items-center gap-4 border-b py-5 text-left transition-[color,border-color] duration-(--duration-fast) sm:gap-6 sm:py-6 ${selected.id === residence.id ? "border-accent text-foreground" : "border-border text-muted"}`}
              >
                <span className="text-accent-text w-7 shrink-0 text-[0.6875rem] tracking-[0.12em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 font-[family-name:var(--font-serif)] text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.2]">
                  {residence.displayName}
                </span>
                <span
                  className={`shrink-0 text-(length:--text-sm) tabular-nums ${selected.id === residence.id ? "font-medium" : ""}`}
                >
                  {formatResidenceArea(residence.area)}
                </span>
                <span
                  aria-hidden="true"
                  className="text-accent-text hidden text-xl sm:block"
                >
                  ↗
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8" aria-live="polite">
            <p className="text-accent-text text-(length:--text-xs) tracking-[0.16em] uppercase">
              Đang xem · Tower {tower}
            </p>
            <p className="mt-3 font-[family-name:var(--font-serif)] text-[clamp(1.875rem,3vw,3rem)] leading-[1.15]">
              {selected.displayName}
            </p>
            <p className="text-muted mt-2 text-(length:--text-sm)">
              Diện tích xấp xỉ {formatResidenceArea(selected.area)}
            </p>
          </div>
        </div>
        <figure className="lg:pl-4">
          <div className="bg-surface relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              key={media.src}
              src={media.src}
              alt={media.alt}
              fill
              loading="lazy"
              sizes="(max-width: 1023px) calc(100vw - 8vw), 45vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="text-muted mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[0.625rem] leading-5 tracking-[0.08em] uppercase">
            <span>
              Phối cảnh kiến trúc Tower {tower} · Không phải mặt bằng căn hộ
            </span>
            {media.artistImpression ? (
              <span>Hình phối cảnh | Artist&apos;s impression</span>
            ) : null}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
