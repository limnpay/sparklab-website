# Running the SparkLab site locally

The site is a static-rendered **Next.js 15** app. No database, no backend, no Docker — just `npm install && npm run dev`.

## Prerequisites

- **Node.js 20+** (Next 15 requires Node 18.18+ and works best on Node 20 LTS or newer).
- **npm** (ships with Node). Yarn or pnpm work fine too if you prefer.

That's it. There is no MySQL, no migration tooling, no OAuth, no Manus dependency.

## First-time setup

```bash
git clone <repo>
cd "Sparklab Website"
npm install
cp .env.example .env.local       # only required if you want forms to actually send
```

## Running

```bash
npm run dev              # http://localhost:3000, hot reload
```

Production build:

```bash
npm run build
npm run start
```

Type check / lint:

```bash
npm run typecheck
npm run lint
```

## Environment variables

All env vars are **optional for local dev**. The site renders fully without any of them; only the forms will show a "not configured yet" message until you wire up Formspree.

```env
# Set in .env.local

# Canonical site origin (no trailing slash). Used for sitemap.xml, OG tags, JSON-LD.
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Formspree form IDs (public — Formspree IDs are not secrets).
# Get them at https://formspree.io after creating one form for each.
NEXT_PUBLIC_FORMSPREE_CONTACT_ID=mljereqq
NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID=xxxxxxxx

# Givebutter campaign URL (public). Individual Donate CTAs use this.
NEXT_PUBLIC_GIVEBUTTER_URL=https://givebutter.com/sparklab-donations-4aerwi
```

For production, set `NEXT_PUBLIC_SITE_URL`, the two Formspree IDs, and `NEXT_PUBLIC_GIVEBUTTER_URL`.

## Verifying the SEO setup

After running `npm run start`, hit these to confirm the SEO infrastructure is alive:

| URL | Expected |
| --- | --- |
| `http://localhost:3000/` | 200, ~130 KB of static HTML |
| `http://localhost:3000/sitemap.xml` | 200, lists all 9 marketing pages |
| `http://localhost:3000/robots.txt` | 200, allow-all + AI-crawler allowlist |
| `http://localhost:3000/llms.txt` | 200, LLM-friendly site overview |
| `http://localhost:3000/manifest.webmanifest` | 200, PWA manifest |
| `http://localhost:3000/opengraph-image` | 200, 1200×630 PNG |

To verify the JSON-LD structured data:

```bash
curl -sS http://localhost:3000/program \
  | grep -oE '"@type":"[^"]+"' | sort -u
```

You should see at least: `WebSite`, `BreadcrumbList`, `Course`, `Organization` types.

## Deployment

The simplest target is **Vercel** — push the repo and point a project at it, set the three env vars above, and it builds and deploys. Any Node 20+ host (Render, Fly, Railway, your own box behind a reverse proxy) works the same way:

```bash
npm ci --omit=dev=false
npm run build
NODE_ENV=production npm run start
```

Static files are served from `.next/` and `public/`. There is no separate static build artifact to ship.

## Re-running the visual audit

```bash
npm run build && npm run start &      # leave running in another shell
node scripts/screenshots.mjs          # captures all 10 pages × 2 viewports
# Output lands in ./screenshots/
```

## Refreshing imagery

All 24 photos are committed under `public/images/`. If you ever need to re-pull from the original Manus CDN:

```bash
bash scripts/download-images.sh
```

## Notes

- The original vendor codebase (Vite + Express + tRPC + Drizzle + MySQL) is preserved under `_legacy/` — don't run anything from there; it's for reference only.
- The legacy `tsx watch` sandboxing issue from the audit is no longer relevant — Next.js dev server doesn't have that problem.
- The legacy `docs/integrations.md`, `docs/assets.md`, `docs/audit.md`, etc., describe the **old** site. They're kept as historical context, not as documentation of the new build.
