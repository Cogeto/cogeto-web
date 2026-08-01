# cogeto.eu: marketing website

Public marketing site for [Cogeto](https://cogeto.eu): verified institutional
memory for your documents. Cogeto reads document sets, verifies every fact
against its source, reports where documents contradict each other, and
produces a signed findings report. EU hosted, self hosted, or fully offline.

Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Node 22.

## Routes

- `/` home: animated hero scene, bento capability grid, flow diagram,
  sovereignty band, live proof strip, logos, assistant prompt block.
- `/product/contradiction-findings`, `/product/verified-memory`,
  `/product/findings-report`: Z-rhythm product pages with live stat bands.
- `/case-studies` plus four industry studies (static content).
- `/security`, `/open-source`, `/whitepaper`, `/get-started`.
- `/docs`, `/docs/quickstart`, `/docs/self-hosted`, `/docs/offline`:
  installation paths verified against the product repo per release.
- `/trust` ISR (`revalidate = 3600`): published trust scores fetched
  server-side from the product repo; a failed refresh keeps serving the
  last good page. The homepage proof strip uses the same fetch. No other
  route talks to the network at request time.
- `/compliance` static, sourced from `lib/compliance-content.json`; the
  one-pager PDF regenerates from the same JSON on `prebuild`.
- `/privacy`, `/imprint`, `sitemap.ts`, `robots.ts`, a 404 page, and
  `/api/contact` (the pilot form relay).

There are no analytics, no cookies, and zero external requests from the
visitor's browser.

## Content

- Copy lives in typed per-locale modules under `content/<locale>/`
  (`content/types.ts` shapes, `lib/content-loader.ts` loader,
  `lib/i18n.ts` locales). English is canonical; hr and de activate when
  their content lands.
- House style: no em or en dashes, no emoji, no exclamation marks.
- `public/brand/` is verbatim from the product repo; never modify,
  restyle, or recreate (see its README).
- `public/documents/` holds the whitepaper (its size is read from disk at
  build time) and the generated compliance one-pager (never edit by hand).
- `public/clients-partners/` holds client and partner logos; after adding
  a PNG run `node scripts/normalize-logos.mjs` to match the set.
- `fonts/` holds self-hosted Poppins, subset to latin plus latin-ext (Croatian and German diacritics included); no external font CDN, ever.

## Contact form

`/api/contact` relays through Mailgun's EU API server-side; the visitor's
browser never talks to a third party. Configure via `.env.local` (see
`.env.example`); without a key the form fails honestly and points to
direct email. Spam control is a honeypot, a minimum fill time, and a
per-IP rate limit; no third-party captcha, by privacy design.

## Commands

```sh
nvm use          # Node 22
npm install
npm run dev      # http://localhost:3000
npm run build    # must pass before shipping; regenerates the compliance PDF
npm start        # serves the production build on :3000
npm run assets   # regenerate og images (incl. case studies) and favicons
```

## Verification before shipping

- `npm run build` passes.
- No em or en dashes in served HTML, per page:
  `curl -s localhost:3000 | grep -c $'—\|–'` must print 0.
- Keyboard-only pass: both header dropdowns, mobile menu (Tab, Escape),
  FAQ disclosures, the contact form.
- Reduced motion emulated in devtools: hero scene static, bento and flow
  static, no drifting blobs.
- Lighthouse: accessibility 100 on every page; performance 94+ on `/`,
  97+ on `/trust` and `/compliance`. Do not regress.

## Ship an update (the routine)

1. Commit locally (branches squash-merge to main, owner pushes; see
   CLAUDE.md), then push.

2. Deploy on the server:

   ```sh
   ssh <server>
   cd /srv/cogeto-web/app
   sudo -u cogeto git pull
   sudo -u cogeto npm ci
   sudo -u cogeto npm run build
   sudo -u cogeto pm2 restart all
   ```

   Restart, not reload, after `.env.local` changes; a stale process serves
   dead asset hashes.

Site code is MIT. The Cogeto product is AGPLv3 with a commercial license;
brand assets are trademarks.
