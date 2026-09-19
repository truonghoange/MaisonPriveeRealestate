"use client";

import { useEffect } from "react";

type HeaderSurfaceObserverProps = {
  heroId: string;
};

export function HeaderSurfaceObserver({ heroId }: HeaderSurfaceObserverProps) {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const hero = document.getElementById(heroId);

    if (!header || !hero) return;

    let observer: IntersectionObserver | undefined;

    const setSurface = (surface: "overlay" | "solid") => {
      if (header.dataset.surface !== surface) {
        header.dataset.surface = surface;
      }
    };

    const updateFromPosition = () => {
      const headerBottom = header.getBoundingClientRect().bottom;
      const heroRect = hero.getBoundingClientRect();
      setSurface(
        heroRect.top < headerBottom && heroRect.bottom > headerBottom
          ? "overlay"
          : "solid",
      );
    };

    const observe = () => {
      observer?.disconnect();
      const headerHeight = header.getBoundingClientRect().height;

      observer = new IntersectionObserver(updateFromPosition, {
        rootMargin: `-${headerHeight}px 0px 0px 0px`,
        threshold: 0,
      });
      observer.observe(hero);
      updateFromPosition();
    };

    const resizeObserver = new ResizeObserver(observe);
    resizeObserver.observe(header);
    observe();

    return () => {
      observer?.disconnect();
      resizeObserver.disconnect();
    };
  }, [heroId]);

  return null;
}
