# SparkLab Website

The marketing site for **SparkLab** ([sparklabusa.com](https://sparklabusa.com)) — an immersive 8-week entrepreneurship program for high school students based in Birmingham, Michigan.

## Stack

- **Next.js 15** (App Router, React 19, React Server Components)
- **TypeScript** (strict)
- **Tailwind CSS v4**
- **Framer Motion** for the few animation flourishes
- **lucide-react** for icons
- **Formspree** for the contact + newsletter forms (no backend, no database)
- **next/font** self-hosts Google's Inter + Space Grotesk
- Static generation everywhere — every page is pre-rendered HTML so AI crawlers and Googlebot see the full content with zero JS execution

The legacy vendor codebase (React 19 + Vite + Express + tRPC + Drizzle + MySQL) is preserved under `_legacy/` for reference.

## Quick start

```bash
# 1. install deps
npm install

# 2. (optional) set up Formspree IDs so the forms actually deliver mail
cp .env.example .env.local
# then edit .env.local

# 3. run dev
npm run dev          # http://localhost:3000

# 4. ship it
npm run build && npm run start
```

## Repo layout

```
app/                     Next.js App Router pages, layout, sitemap, robots, manifest, OG image
components/
  layout/                Header + Footer
  forms/                 Formspree-backed Contact + Newsletter forms
  ui/                    Reusable primitives (Button, Section, PageHero, Reveal, LongForm)
  seo/                   JsonLd helpers (Organization, WebSite, Breadcrumbs)
lib/
  constants.ts           Brand + site metadata in one place
  seo.ts                 buildMetadata() helper
  faq.ts                 Single FAQ source of truth (rendered as accordions AND JSON-LD)
  cn.ts                  clsx + tailwind-merge wrapper
public/
  images/                All 24 SparkLab photos, self-hosted
  llms.txt               Crawler-friendly site map for LLM search engines
  favicon.png
docs/                    Audit artifacts from the original site (read-only history)
screenshots/             Visual snapshots of every page at 1440px + 390px
scripts/
  download-images.sh     Re-pulls all photos from the source Manus CDN
  screenshots.mjs        Playwright-based full-page capture
_legacy/                 Original vendor codebase, archived
```

## SEO infrastructure

Every page ships with:

- Per-page `<title>` + `<meta description>` + canonical URL
- Open Graph + Twitter card metadata
- Geo meta tags (`geo.region`, `geo.position`, `ICBM`) for Michigan
- JSON-LD: `EducationalOrganization` + `LocalBusiness` (org), `WebSite`, `BreadcrumbList`
- Page-type JSON-LD where relevant: `Course` (Program), `Event` (Competition), `FAQPage` (FAQ), `ContactPage` (Contact)

Routes provided by the framework:

| URL | Purpose |
| --- | --- |
| `/sitemap.xml` | Auto-generated sitemap with 9 marketing pages |
| `/robots.txt` | Allow-all (explicit allowlist for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) |
| `/llms.txt` | Crawler-friendly site overview written for LLM answer engines |
| `/manifest.webmanifest` | PWA-style manifest |
| `/opengraph-image` | Dynamic 1200×630 OG image (renders at the edge) |
| `/favicon.png` | Site icon |

## Forms

Both forms POST JSON to Formspree. They render and submit even without env vars (showing a graceful "not configured yet" message) so local dev is frictionless. To wire them up:

1. The contact form is already wired to Formspree (`mljereqq`). Create a second form for the newsletter.
2. Copy any overrides into `.env.local`:
   ```env
   NEXT_PUBLIC_FORMSPREE_CONTACT_ID=mljereqq
   NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID=xxxxxxxx
   ```
3. Restart `npm run dev`.

There is no database, no Drizzle, no tRPC server. Submissions go straight to Formspree, which then emails you and persists them in your Formspree dashboard.

## Deploy

Built for Vercel out of the box (`next build && next start`), but any Node 20+ host works:

```bash
npm run build
npm run start          # Defaults to PORT=3000
```

Required env vars in production:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin used by sitemap.xml, OG, JSON-LD. e.g. `https://sparklabusa.com` |
| `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` | Formspree form ID for the contact form |
| `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID` | Formspree form ID for the newsletter |

## Refreshing photos

If you want to update or re-pull the imagery:

```bash
bash scripts/download-images.sh
```

(Edit the script to point at new URLs — currently it pulls from the original Manus CDN.)

## Re-running the visual audit

```bash
npm run build && npm run start &        # serve in another terminal
node scripts/screenshots.mjs            # writes ./screenshots/01-home-1440.png …
```
