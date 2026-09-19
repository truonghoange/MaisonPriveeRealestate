"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { MediaCategory } from "@/types/media";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: MediaCategory;
  artistImpression: boolean;
}

const categoryLabels: Partial<Record<MediaCategory, string>> = {
  architecture: "Kiến trúc",
  lobby: "Sảnh đón",
  amenity: "Tiện ích",
  wellness: "Wellness",
  residence: "Tòa tháp",
};

export function GalleryExplorer({
  images,
}: {
  images: readonly GalleryImage[];
}) {
  const [category, setCategory] = useState<MediaCategory | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const categories = Array.from(new Set(images.map((image) => image.category)));
  const visible =
    category === "all"
      ? images
      : images.filter((image) => image.category === category);
  const selectedIndex = visible.findIndex((image) => image.id === selectedId);
  const selected = selectedIndex >= 0 ? visible[selectedIndex] : null;
  const isOpen = selectedId !== null;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>("[data-gallery-close]")?.focus();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen]);

  function move(direction: -1 | 1) {
    if (selectedIndex < 0) return;
    const next = (selectedIndex + direction + visible.length) % visible.length;
    setSelectedId(visible[next].id);
  }

  return (
    <div className="mt-(--section-space-md)">
      <div
        className="border-border flex flex-wrap gap-x-8 gap-y-4 border-t pt-6 md:gap-x-10"
        aria-label="Lọc ảnh dự án"
      >
        <button
          type="button"
          aria-pressed={category === "all"}
          onClick={() => setCategory("all")}
          className={`hover:text-accent-text cursor-pointer border-b pb-2 text-(length:--text-sm) whitespace-nowrap transition-colors duration-(--duration-fast) ${category === "all" ? "text-foreground border-current" : "text-muted border-transparent"}`}
        >
          Tất cả
        </button>
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={`hover:text-accent-text cursor-pointer border-b pb-2 text-(length:--text-sm) whitespace-nowrap transition-colors duration-(--duration-fast) ${category === item ? "text-foreground border-current" : "text-muted border-transparent"}`}
          >
            {categoryLabels[item] ?? item}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3 lg:gap-x-7 lg:gap-y-12">
        {visible.map((image, index) => {
          const isEditorial = category === "all";
          const isWide = isEditorial && index % 7 === 0;
          const isPortrait =
            isEditorial &&
            (image.id === "private-lift-lobby" ||
              image.id === "tower-m-architecture" ||
              image.id === "tower-p-architecture");

          return (
            <button
              key={image.id}
              type="button"
              aria-label={`Mở ảnh ${index + 1}: ${image.alt}`}
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setSelectedId(image.id);
              }}
              className={`group min-w-0 cursor-pointer text-left ${isWide ? "sm:col-span-2" : ""} ${isPortrait ? "lg:row-span-2" : ""}`}
            >
              <span
                className={`bg-surface relative block overflow-hidden ${isWide ? "aspect-[16/10] sm:aspect-[16/8] lg:aspect-[16/7]" : isPortrait ? "aspect-[4/5] sm:aspect-[3/4]" : "aspect-[4/3]"}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 639px) calc(100vw - 2.5rem), (max-width: 1023px) 48vw, 32vw"
                  className="object-cover transition-transform duration-(--duration-slow) ease-(--ease-luxury) group-hover:scale-[1.035] motion-reduce:transform-none"
                />
              </span>
              <span className="mt-3 flex items-start justify-between gap-3">
                <span className="text-(length:--text-sm) leading-6">
                  {image.alt}
                </span>
                <span aria-hidden="true" className="text-accent-text text-lg">
                  ↗
                </span>
              </span>
              {image.artistImpression ? (
                <span className="text-muted mt-1 block text-[0.625rem] tracking-[0.08em] uppercase">
                  Hình phối cảnh | Artist&apos;s impression
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Xem ảnh dự án"
        onCancel={(event) => {
          event.preventDefault();
          setSelectedId(null);
        }}
        onClose={() => setSelectedId(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
        className="m-auto h-dvh max-h-dvh w-dvw max-w-dvw border-0 bg-(--color-navy-950) p-0 text-(--color-ivory-50) backdrop:bg-(--color-navy-950)"
      >
        {selected ? (
          <div className="flex h-full flex-col px-5 py-4 sm:px-10 sm:py-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[0.6875rem] tracking-[0.16em] uppercase">
                Maison Privée · Thư viện
              </p>
              <button
                data-gallery-close
                type="button"
                onClick={() => setSelectedId(null)}
                className="cursor-pointer border border-white/50 px-4 py-2 text-(length:--text-sm) hover:border-white"
                aria-label="Đóng ảnh"
              >
                Đóng ×
              </button>
            </div>
            <div className="relative my-5 min-h-0 flex-1">
              <Image
                key={selected.src}
                src={selected.src}
                alt={selected.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/30 pt-4">
              <div>
                <p className="text-(length:--text-sm) leading-6">
                  {selected.alt}
                </p>
                {selected.artistImpression ? (
                  <p className="mt-1 text-[0.625rem] tracking-[0.08em] text-white/70 uppercase">
                    Hình phối cảnh | Artist&apos;s impression
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-4 text-(length:--text-sm)">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label="Ảnh trước"
                  className="cursor-pointer p-2 hover:text-(--color-champagne-500)"
                >
                  ←
                </button>
                <span className="min-w-16 text-center tabular-nums">
                  {selectedIndex + 1} / {visible.length}
                </span>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label="Ảnh tiếp"
                  className="cursor-pointer p-2 hover:text-(--color-champagne-500)"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
