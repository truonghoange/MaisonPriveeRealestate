export const INTRO_SESSION_KEY = "maison-privee:intro-seen";

export const INTRO_TIMING = {
  normal: {
    brandDelayMs: 350,
    taglineDelayMs: 900,
    englishDelayMs: 1400,
    consultantDelayMs: 1800,
    revealDurationMs: 550,
    exitAtMs: 2500,
    exitDurationMs: 450,
    unmountAtMs: 3000,
  },
  debug: {
    brandDelayMs: 1000,
    taglineDelayMs: 2300,
    englishDelayMs: 3500,
    consultantDelayMs: 4800,
    revealDurationMs: 1000,
    exitAtMs: 6800,
    exitDurationMs: 1200,
    unmountAtMs: 8000,
  },
  reduced: {
    revealDurationMs: 90,
    exitAtMs: 2500,
    exitDurationMs: 450,
    unmountAtMs: 3000,
  },
} as const;
