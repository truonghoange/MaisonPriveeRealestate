# Maison Privée Website

## 1. Overview

Maison Privée is a luxury residential project information and independent property consultancy website. The homepage contains the complete V1 discovery and enquiry journey, from the cinematic opening and project narrative through residences, gallery, Private Preview request, consultant contact layer, and footer.

## 2. Tech Stack

- Next.js 16 with the App Router
- React 19
- TypeScript 6 in strict mode
- Tailwind CSS 4
- ESLint with the official Next.js and Core Web Vitals rules
- Prettier with Tailwind class sorting

## 3. Requirements

- Node.js 20.9 or newer
- npm 10 or newer

## 4. Installation

```bash
npm install
```

Create a local environment file from the committed example:

```bash
copy .env.example .env.local
```

On macOS or Linux, use `cp .env.example .env.local` instead.

## 5. Development

Start the local development server and open [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

All application code lives in `src/`. Imports from that directory should use the `@/` alias, such as `import { cn } from "@/lib/utils"`.

## 6. Available Scripts

| Script                 | Purpose                                       |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Starts the Next.js development server.        |
| `npm run lint`         | Runs ESLint across the repository.            |
| `npm run typecheck`    | Runs TypeScript without emitting files.       |
| `npm run build`        | Creates an optimized production build.        |
| `npm run start`        | Serves the completed production build.        |
| `npm run check`        | Runs lint, typecheck, and build sequentially. |
| `npm run format`       | Formats supported files with Prettier.        |
| `npm run format:check` | Checks formatting without changing files.     |

## 7. Project Structure

```text
public/
└── media/              # Optimized project visual assets
src/
├── app/                # Routes, layouts, metadata, and global CSS
├── components/
│   ├── dev/            # Development-only anchor harness
│   ├── contact/        # Private Preview form and contact actions
│   ├── footer/         # Site footer and project disclaimers
│   ├── gallery/        # Filterable project gallery and fullscreen viewer
│   ├── hero/           # Cinematic project Hero
│   ├── intro/          # Session-scoped cinematic opening
│   ├── layout/         # Shared structural components
│   ├── motion/         # Focused animation primitives
│   ├── navigation/     # Fixed header and responsive navigation
│   ├── residences/     # Tower M/P residence collection explorer
│   ├── sections/       # Page-level sections
│   └── ui/             # Reusable interface primitives
├── data/               # Project content and structured page data
├── hooks/              # Reusable React hooks
├── lib/                # Utilities, technical constants, and integrations
├── styles/             # Shared styles beyond global foundations
└── types/              # Shared TypeScript types
```

Future pages should compose small section components. Components render data supplied from `src/data/`; they must not duplicate project content or communicate directly with external services.

The Maison Privée training PDF in the repository is the current primary source for project content. Domain contracts live in `src/types/`, while verified, source-aware content lives in `src/data/`. Important facts include lightweight page metadata so they can be checked against the source.

UI components must consume these structured modules instead of repeating project facts. Unknown values must remain unknown rather than being guessed. A future CMS or API should replace the data provider while preserving the same domain contracts, so presentation components do not need to be rewritten.

## 8. Design System

The global stylesheet defines raw brand colors and semantic tokens for backgrounds, text, surfaces, borders, and accents. It also contains responsive spacing and typography scales, restrained radii and shadows, motion timing, keyboard focus, and reduced-motion behavior.

Typography uses self-hosted `Playfair Display` (display, weights 400/500) and `Be Vietnam Pro` (body/UI, weights 400/500) through `next/font/google`. Both preload Latin and Vietnamese subsets; `--font-serif` and `--font-sans` remain the component-facing tokens, with metric-adjusted fallbacks to limit layout shift.

Tailwind semantic utilities such as `bg-background`, `text-foreground`, `text-accent-text`, and `border-border` resolve back to the same CSS custom properties. This keeps the CSS variables as the single conceptual source of truth.

`src/components/layout/` provides `Container`, `Section`, and `SectionGrid` for consistent page width, section spacing, and mobile-first editorial columns. `src/components/ui/` provides the reusable typography, button, divider, section-heading, and visually-hidden primitives. Light and dark sections change semantic tokens locally; components should use these tokens rather than repeating raw brand colors. A compact development-only anchor harness represents navigation destinations that are still pending.

`src/components/navigation/SiteHeader.tsx` is the fixed site header. It begins as a transparent overlay on the Hero, while the small `HeaderSurfaceObserver` Client Component switches its visual surface to the approved solid ivory state once the Hero leaves the header boundary. Desktop links remain server-rendered. The mobile menu keeps its Escape handling, focus loop, body scroll restoration, and native hash links.

`src/components/hero/` contains the server-compatible Hero composition, media layer, and structured content layer. Its nighttime project render was extracted as a clean embedded raster from page 30 of the Maison Privée training PDF and optimized to `public/media/hero/maison-privee-night.webp`. `src/data/media.ts` is the canonical source for that asset, including dimensions, source-page metadata, and `artistImpression: true` so the disclosure is rendered from data.

`src/components/sections/Manifesto.tsx` presents the source-supported themes of restraint, rarity, and privacy as an editorial light-to-dark composition. Its concise copy and page references live in `src/data/manifesto.ts` rather than in the component.

`src/components/sections/ProjectOverview.tsx` presents the project identity, three confirmed editorial metrics, and a clean daytime render extracted from page 29 of the training PDF. The optimized 2600 × 1463 WebP lives at `public/media/project/maison-privee-day.webp`, with source and artist-impression metadata in `src/data/media.ts`. The internal, unconfirmed 490 total is intentionally excluded.

`src/components/sections/RareAddress.tsx` places the confirmed Ciputra context and two confirmed connectivity times on a navy editorial surface. The green and water context is recorded with page 9 source metadata in `src/data/location.ts`; connectivity comes from `src/data/project.ts` page 10. The conflicting Hồ Hoàn Kiếm and Nội Bài durations are omitted. Its visual is a clean Ciputra planning render extracted from PDF page 9, explicitly identified as an artist's impression. The page 10 map is not displayed because it embeds the conflicting durations.

`src/components/sections/RareCreators.tsx` renders the lead developer, joint-venture partners, and design consultants in source-aware hierarchy from `src/data/creators.ts`. It uses editorial rows without unsourced biographies or external logos.

`src/components/experiences/` presents all six amenity levels as a descending desktop level navigator and a single-expanded mobile accordion. The total of 68 experiences comes from the confirmed project metric; the displayed amenity names come only from the 32 individually named entries in `src/data/amenities.ts`. A small Client Component owns the active level. Four clean level renders from PDF pages 35, 47, 51, and 56 are registered in `src/data/media.ts`; levels without approved imagery receive a typographic treatment. The images are lazy-loaded and only the active level's image appears.

`src/components/sections/Wellness.tsx` pairs the page 48 sauna render with the exact qualified wording "Hướng tới WELL for Residential Pre-Certification" from the targeting-status project record. Air, water, and material design features are sourced from page 60 and recorded in `src/data/wellness.ts`. The section describes a design direction; it does not claim completed certification or health outcomes.

`src/components/residences/` reads the eight residence groups and approximate areas from `src/data/residences.ts` (training PDF page 63). The local Tower M/P and unit selection updates an editorial summary. Tower visuals extracted from pages 66 and 74 are explicitly labelled as architectural impressions, not unit-specific floor plans. No inventory, price, or availability claim is displayed; the source floor-plan pages are layered vector compositions and have not been repackaged as unit plans.

`src/components/gallery/` presents 13 curated project visuals from `src/data/media.ts`, with filters generated from categories actually present. Five new clean renders from PDF pages 34 and 38–41 join the existing project and amenity assets. The native-dialog viewer supports Escape, arrow keys, previous/next controls, keyboard focus return, and scroll restoration. Artist-impression labels remain attached to every applicable image.

`src/components/contact/` provides the real `#contact` destination. `PrivatePreview` keeps the editorial section layout server-rendered, while `LeadForm` owns client validation and submission states. Residence-interest options are derived from `src/data/residences.ts`; consultant details come from `src/data/consultant.ts`. Empty phone, Zalo, email, and QR values do not render broken actions. `MobileContactBar` shows configured phone/Zalo actions on small screens and always provides a restrained link to the Private Preview section.

`POST /api/leads` parses and validates the request again on the server, enforces field and payload limits, absorbs a hidden honeypot without forwarding it, and delivers normalized lead data through the server-only `CRM_WEBHOOK_URL`. The browser never calls the CRM directly. Development without a webhook returns an explicitly marked simulated success; production returns `503` and does not claim delivery. The route never logs lead content or exposes upstream responses.

`src/components/footer/SiteFooter.tsx` reuses the canonical navigation and source-based project disclaimer. It includes the independent-consultant notice and keeps all contact links conditional on approved consultant configuration.

`src/components/intro/IntroLoader.tsx` places a short opening over the already-rendered Hero on the first visit in each tab. It renders a blank navy checking surface on the server; a small pre-hydration script hides that surface for returning tabs, while the component reads `sessionStorage` after hydration. Normal and reduced-motion playback both last about 3 seconds, including the exit; reduced motion uses a static poster with minimal opacity changes. After exit, scrolling and interaction are restored. In development only, `?intro=1` replays at normal speed and `?intro=debug` stretches the same sequence to about 8 seconds. The consultant identity in `src/data/consultant.ts` remains unconfigured until approved details are available.

These explicit development replay modes bypass the session marker and reduced-motion timing for animation review; production ignores both query values and respects the motion preference. Development logs report elapsed playback time using `performance.now()`. All timing values in `intro.constants.ts` are milliseconds and supply both CSS transitions and JavaScript timers.

## 9. Environment Variables

`.env.example` documents the public site URL, CRM webhook, planned email provider, and analytics. Copy it to `.env.local` for local values. Local `.env*` files are ignored by Git while `.env.example` remains tracked.

`CRM_WEBHOOK_URL` is the server-side lead delivery endpoint. Never prefix it with `NEXT_PUBLIC_`. If it is empty in production, lead submission deliberately returns service unavailable so customer data is not discarded behind a false success response. Replace the empty values in `src/data/consultant.ts` only with approved contact details.

## 10. Development Rules

- Keep strict TypeScript enabled and avoid `any`.
- Keep `page.tsx` focused on composing sections rather than implementing an entire page.
- Store project content in `src/data/` and pass it into reusable, data-driven components.
- Keep utilities and future integration adapters in `src/lib/`.
- Prefer semantic design tokens over raw colors and arbitrary values.
- Preserve accessible focus states, semantic HTML, and reduced-motion support.
- Avoid premature abstractions and large dependencies without a demonstrated need.
- Run `npm run check` before merging production changes.

## 11. Future Architecture

Future work may connect consultant and contact content to a headless WordPress CMS while preserving the current domain shape. CRM delivery can also move behind a dedicated integration adapter without changing `LeadForm` or its `/api/leads` contract.

Expected upgrade paths include a CMS, CRM adapter, apartment inventory, interactive floor plans, analytics, and an AI concierge. Third-party services should be isolated behind future modules such as `src/lib/integrations/crm.ts`, `analytics.ts`, and `email.ts` so UI components remain provider-independent.

## 12. Deployment Notes

Run `npm run check` in continuous integration before deployment. The application can be deployed to Vercel or another Node.js host that supports the installed Next.js version. Configure environment variables in the deployment platform and keep server-only credentials out of the client bundle.

## Production

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, without a path, before building. The site uses it for the canonical URL, Open Graph image URL, `robots.txt`, `sitemap.xml`, and WebSite/WebPage structured data. An absent URL leaves the production build unindexed with an empty sitemap; an invalid URL fails the build. It never publishes a localhost canonical. Preview builds are also unindexed unless deliberately built with the final production URL. Check the generated metadata on the deployed domain.

Set the server-only `CRM_WEBHOOK_URL` before accepting enquiries. Without it, production lead submissions return `503`; they are not falsely reported as delivered. The optional email and analytics keys in `.env.example` are reserved and are not used by V1. Keep the independent-site disclaimer visible and publish consultant name/contact details only after approval.

```bash
npm ci
npm run check
npm run format:check
npm run start
```

Deployment checklist:

- [ ] `NEXT_PUBLIC_SITE_URL` is the final HTTPS origin at build time.
- [ ] `CRM_WEBHOOK_URL` is configured server-side and a fake production enquiry reaches the intended endpoint.
- [ ] Approved consultant identity and any intended phone, email, or Zalo links are configured and tested.
- [ ] Domain HTTPS and `/`, `/robots.txt`, `/sitemap.xml`, and `/api/leads` responses are checked.
- [ ] Canonical, Open Graph/Twitter preview, and independent-site disclaimer are checked on the deployed domain.
- [ ] Keyboard, mobile, gallery, intro, and form flows are smoke-tested in production.
#   M a i s o n P r i v e e R e a l e s t a t e  
 