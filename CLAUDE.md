# CLAUDE.md

Public marketing site for Cogeto (cogeto.eu). Next.js 15 App Router,
TypeScript, Tailwind CSS 4, Framer Motion, Node 22 (`nvm use`). This is a
production site: no placeholder copy, no "coming soon" language, ever.

## Hard rules

1. **All copy lives in typed per-locale content modules under
   `content/<locale>/`** (shapes in `content/types.ts`, loader in
   `lib/content-loader.ts`), plus `lib/compliance-content.json` for
   /compliance. Never put visible text in markup. The site is multilingual
   (en, hr, de; owner decision 2026-08-01): English is canonical at the
   root, hr and de activate in `lib/i18n.ts` when their content lands.
2. **No em dashes or en dashes anywhere in visible copy.** Use commas, colons,
   or plain hyphens. This includes JSON content and anything server-rendered.
3. **Brand assets in `public/brand/` are verbatim copies from the product
   repo.** Never modify, restyle, recreate, or recolor them (trademark rules
   in `public/brand/README.md`).
4. **Zero external requests from the browser.** The privacy policy promises no
   cookies, no trackers, no third-party resources. Fonts are self-hosted in
   `fonts/` (Poppins). Never add a CDN script, external font, or remote image.
5. **Marketing voice with a hard balance line.** Owner decision (2026-07-16,
   restated emphatically 2026-08-01): this is a marketing and product site,
   and roadmap capabilities are presented in present tense as part of the
   product offer. That explicitly includes connectors (Jira, Google,
   Microsoft, Slack, Teams) and other planned features. Never flag or
   soften a roadmap capability as unshipped in site copy. The line that
   holds: everything backed by an inspectable artifact stays strictly real
   (trust scores, receipt samples, schemas, license terms, the compliance
   page, install instructions, measurements), and do not invent
   certifications, audits, named customers, user counts, or benchmark
   numbers. The product repo at `/Users/igolubic/coding_projects/cogeto` is
   the read-only source of truth for what is real. Product license is
   AGPLv3 with a commercial exemption; this site's code is MIT.
6. **No preloader.** Removed by owner decision 2026-08-01: nothing may delay
   the hero, which is itself the brand moment. This supersedes the earlier
   preloader-on-every-visit rule; do not reintroduce one.
7. All animations must be disabled or static under `prefers-reduced-motion`.

## Architecture notes

- **Rendering strategy is flexible (owner decision 2026-07-16).** The site is
  not required to be hard-static. Pick the Next.js rendering mode that fits
  each page: static generation for pure marketing pages, ISR or server-side
  rendering where content derives from live or generated data. Server-side
  fetching and build-time automation (generated PDFs, assets, derived labels)
  are encouraged wherever they remove manual drift. The invariant is rule 4,
  zero external requests from the visitor's browser, never the rendering mode.
- `/` is one component per section in `components/sections/` (static today).
- `/trust` uses ISR (`revalidate = 3600`).
  `lib/trust.ts` fetches trust scores server-side from the public product repo
  on GitHub; the visitor's browser never talks to GitHub. Total fetch failure
  must throw so ISR keeps serving the last good page.
- `/compliance` is static; `scripts/generate-compliance-pdf.mjs` regenerates
  the one-pager PDF from `lib/compliance-content.json` on `prebuild`, so page
  and PDF cannot drift. Never edit the PDF by hand.
- `scripts/generate-assets.mjs` (`npm run assets`) regenerates og.png and
  favicons from the brand SVGs.

## Commands

```sh
npm run dev      # local dev
npm run build    # must pass before shipping; runs the compliance PDF prebuild
npm start        # production build on :3000
```

## Verification before shipping

- `npm run build` passes.
- No dashes in served HTML:
  `curl -s localhost:3000 | grep -c $'—\|–'` is 0 (repeat per page).
- Reduced-motion check in devtools.
- Lighthouse baseline is 98/100/100/100 on /trust and /compliance; do not
  regress, accessibility stays 100.

## Deploy

pm2 behind nginx on port 3000 (`ecosystem.config.js`). After every rebuild on
the server run `pm2 reload`; a stale process serves dead asset hashes.

## Git workflow (owner decision 2026-08-01)

Everything stays local: work on a local branch per phase, verify the build,
then squash merge into local main. Never push to the remote and never open
pull requests; the owner pushes once everything checks out. Commits are
authored as Ivan Golubic <ivan@themrcto.com>, never with any AI attribution.

## Current state and standing decisions

The 2026-08 rebuild is complete and trilingual (en at the root, /hr and
/de, hreflang everywhere). The working docs that governed the rebuild were
removed from the repo by owner decision (2026-08-01); they remain in git
history if ever needed. The decisions that continue to bind:

- Design: pages sell, never headings-plus-paragraphs. Benefit-led
  headings, blocks under 60 words, product-artifact mockups, stat bands
  with real published numbers, one rehearsed primary CTA sitewide
  ("Start a pilot"), every page ends in a closing CTA band with two
  doors, buttons only at conversion moments, arrow links mid page.
- The homepage keeps the animated hero scene, bento grid, flow diagram,
  and sovereignty band. Header is always visible, never appear-on-scroll.
  No preloader, ever (removed 2026-08-01; nothing may delay the hero).
- Contact: the /get-started form relays via Mailgun EU (/api/contact,
  env in .env.local); "we reply within one business day" is the standing
  promise; no third-party captcha ever. Case study CTAs mail
  ivan@cogeto.eu with industry subjects.
- Case studies are owner-authorized illustrative engagements: generated
  numbers and findings of kinds the engine really detects, anonymous
  framing, never real customer names, quotes, or deployment claims.
- /trust shows only the v1 release line, capped at the ten most recent;
  reader accepts trust schema 1.0 and 1.1; per-language gate floors.
- The compliance one-pager PDF stays English and generates from
  lib/compliance-content.json on prebuild; hr/de compliance pages are
  translations in content/<locale>/compliance.json.
- Fonts are subset to latin plus latin-ext; never reintroduce a
  latin-only subset (Croatian diacritics broke once already).
- Sanctioned deviations from hard rule 1: decorative mockup micro-text in
  components/mockups.tsx and mock examples inside ZPage.tsx.
