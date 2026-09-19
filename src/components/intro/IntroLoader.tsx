"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import { IntroContent } from "./IntroContent";
import { INTRO_SESSION_KEY, INTRO_TIMING } from "./intro.constants";
import styles from "./IntroLoader.module.css";

type IntroPhase = "checking" | "visible" | "exiting" | "hidden";
type Sequence = "normal" | "debug";
type IntroView = {
  phase: IntroPhase;
  sequence: Sequence;
  forceMotion: boolean;
};
type IntroDecision =
  | { kind: "skip" }
  | {
      kind: "play";
      sequence: Sequence;
      forceMotion: boolean;
      reducedMotion: boolean;
    };

function decideIntro(): IntroDecision {
  const replay =
    process.env.NODE_ENV === "development"
      ? new URLSearchParams(window.location.search).get("intro")
      : null;

  if (replay === "1" || replay === "debug") {
    return {
      kind: "play",
      sequence: replay === "debug" ? "debug" : "normal",
      forceMotion: true,
      reducedMotion: false,
    };
  }

  try {
    if (window.sessionStorage.getItem(INTRO_SESSION_KEY) === "1") {
      return { kind: "skip" };
    }
  } catch {
    // Privacy settings may block storage; still play the intro.
  }

  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "1");
  } catch {
    // The intro still runs when its session marker cannot be saved.
  }

  return {
    kind: "play",
    sequence: "normal",
    forceMotion: false,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches,
  };
}

function getTimingStyle(sequence: Sequence): CSSProperties {
  const timing = INTRO_TIMING[sequence];

  return {
    "--intro-brand-delay": `${timing.brandDelayMs}ms`,
    "--intro-tagline-delay": `${timing.taglineDelayMs}ms`,
    "--intro-english-delay": `${timing.englishDelayMs}ms`,
    "--intro-consultant-delay": `${timing.consultantDelayMs}ms`,
    "--intro-reveal-duration": `${timing.revealDurationMs}ms`,
    "--intro-exit-duration": `${timing.exitDurationMs}ms`,
    "--intro-reduced-reveal-duration": `${INTRO_TIMING.reduced.revealDurationMs}ms`,
    "--intro-reduced-exit-duration": `${INTRO_TIMING.reduced.exitDurationMs}ms`,
  } as CSSProperties;
}

export function IntroLoader() {
  const [view, setView] = useState<IntroView>({
    phase: "checking",
    sequence: "normal",
    forceMotion: false,
  });
  const decisionRef = useRef<IntroDecision | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Keep the original decision across React Strict Mode's effect replay.
    decisionRef.current ??= decideIntro();
    const decision = decisionRef.current;

    if (decision.kind === "skip") {
      const frame = window.requestAnimationFrame(() =>
        setView((current) => ({ ...current, phase: "hidden" })),
      );
      return () => window.cancelAnimationFrame(frame);
    }

    const site = document.querySelector<HTMLElement>("[data-intro-site]");
    const previousInert = site?.inert ?? false;
    const previousOverflow = document.body.style.overflow;
    let restored = false;
    let exitTimer: number | undefined;
    let finishTimer: number | undefined;
    let finishFrame: number | undefined;

    if (site) site.inert = true;
    document.body.style.overflow = "hidden";

    function restoreSite() {
      if (restored) return;
      restored = true;
      if (site) site.inert = previousInert;
      document.body.style.overflow = previousOverflow;
    }

    const timing =
      decision.sequence === "debug"
        ? INTRO_TIMING.debug
        : decision.reducedMotion
          ? INTRO_TIMING.reduced
          : INTRO_TIMING.normal;

    const frame = window.requestAnimationFrame(() => {
      const visibleAt = window.performance.now();
      setView({
        phase: "visible",
        sequence: decision.sequence,
        forceMotion: decision.forceMotion,
      });

      if (process.env.NODE_ENV === "development") {
        console.info(`[Intro] visible at: ${visibleAt.toFixed(1)} ms`);
      }

      exitTimer = window.setTimeout(() => {
        const exitingAt = window.performance.now();
        setView({
          phase: "exiting",
          sequence: decision.sequence,
          forceMotion: decision.forceMotion,
        });
        if (process.env.NODE_ENV === "development") {
          console.info(`[Intro] exiting at: ${exitingAt.toFixed(1)} ms`);
        }
      }, timing.exitAtMs);

      const finishIntro = () => {
        const overlay = overlayRef.current;
        // A delayed React commit must not cut the actual exit transition short.
        if (
          overlay &&
          (overlay.dataset.phase !== "exiting" ||
            overlay
              .getAnimations()
              .some(
                (animation) =>
                  animation.playState === "running" || animation.pending,
              ))
        ) {
          finishFrame = window.requestAnimationFrame(finishIntro);
          return;
        }
        const hiddenAt = window.performance.now();
        restoreSite();
        setView({
          phase: "hidden",
          sequence: decision.sequence,
          forceMotion: decision.forceMotion,
        });
        if (process.env.NODE_ENV === "development") {
          console.info(`[Intro] hidden at: ${hiddenAt.toFixed(1)} ms`);
          console.info(
            `[Intro] total visible duration: ${(hiddenAt - visibleAt).toFixed(1)} ms`,
          );
        }
      };

      // The absolute deadline includes the exit, regardless of motion preference.
      finishTimer = window.setTimeout(finishIntro, timing.unmountAtMs);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
      if (finishFrame !== undefined) window.cancelAnimationFrame(finishFrame);
      restoreSite();
    };
  }, []);

  if (view.phase === "hidden") return null;

  return (
    <div
      ref={overlayRef}
      data-intro-overlay
      data-phase={view.phase}
      data-force-motion={view.forceMotion || undefined}
      aria-hidden="true"
      className={styles.root}
      style={getTimingStyle(view.sequence)}
    >
      <IntroContent />
    </div>
  );
}
