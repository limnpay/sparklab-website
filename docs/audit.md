# SparkLab Website Audit — June 2026

This is an honest assessment of `sparklabusa.com` as captured in the vendor handoff. I ran the dev server (`pnpm dev`), captured full-page screenshots at 1440 px and 390 px (in `/screenshots`), read every page component, every server route, the schema, the build config, and the env contract.

The verdict in one sentence: **the site is a competent first draft built on a clearly-borrowed template, with a few thoughtful interactions, but several structural risks (image hosting, duplicated content, inconsistent 404), thin actual content, and significant gaps in SEO/accessibility/performance fundamentals that you'd want in place before going to district decision-makers.**

---

## 1. Design — how dated does it feel?

**Not dated, but generic.** The visual language is contemporary 2024-2025 SaaS marketing: dark teal, big sans-serif display headlines (Space Grotesk), gradient accent text, glow shadows on the primary button, Framer Motion entrance animations on every card. It would not look out of place on a Y Combinator alum's landing page.

What works:
- Strong color story (dark teal `#003B46` + orange `#FF5C22` + electric green `#78D900`).
- `Space Grotesk` for display is a smart, slightly distinctive choice.
- Cards have consistent radius (`rounded-2xl`), consistent border (`border border-border`), and consistent hover states.
- Framer Motion entrances (`whileInView` with `once: true`) give the scroll a sense of life.

What feels weak or off‑brand:
- **The 404 page is from a different design system entirely** — white card, blue button, light grey gradient (`docs/pages/notfound.md`). This is the original shadcn starter; it was never themed. Any mistyped URL drops you into what looks like a different product.
- **Almost every section uses the same composition:** centered eyebrow → centered H2 with one word in primary or accent color → muted-grey subhead → grid of 3-6 icon cards. After 3 pages it reads as one giant template loop. There is no editorial layout, no off-grid imagery, no quotes pulled out into hero blocks, no infographic, no chart.
- **Dark mode is forced** (`ThemeProvider defaultTheme="dark"` with no toggle). On harsh-light projector screens, in school computer labs, or in print, the dark theme is a liability — and there's no light fallback even though the design tokens support one.
- **Hero treatment is uniform** across all 8 marketing pages: full-bleed photo background at 15-20% opacity, three-line centered headline, one CTA. By page 4 there is no surprise.
- **Decorative SVG/illustration is absent.** No custom shapes, no diagrams of the 8-week journey, no illustrated icons. Lucide icons are tasteful but interchangeable.
- **No founder photography, no real names, no real team.** The site reads as if produced by a single anonymous "we." For a brand that is fundamentally relationship-driven (mentors, judges, schools), this is conspicuous.
- The orange primary button has a fixed neon `box-shadow` glow (`.glow-orange` in `index.css:204-209`) that reads as "trendy circa 2022" and clashes slightly with the more serious institutional tone the body copy is reaching for.
- The "Powered by SIGU x KMI" eyebrow on the homepage is shouted at the top of every visit; SIGU and KMI are never explained.

## 2. Code quality

The technical foundation is solid but the bundle is full of dead template code from the source platform (Manus WebDev).

**Strengths**
- TypeScript everywhere, strict-ish (`tsconfig.json` extends `tsconfig.node.json`). `pnpm check` (`tsc --noEmit`) passes.
- Real validation on the server: Zod schemas on both tRPC mutations. Tests exist for both happy + sad paths (`server/forms.test.ts`).
- Drizzle schema is small and clean. The newsletter `email` column has a unique index and duplicates are handled gracefully (`server/db.ts:114-127`).
- Server lazily connects to MySQL (`getDb()` in `server/db.ts`), so the app boots and pages render without a database. Good local-dev posture.
- Sensible directory split (`client`, `server`, `shared`, `drizzle`). Path aliases configured.
- Pre-set up Prettier, Vitest, Drizzle Kit, components.json.

**Weaknesses**
- **Massive amount of unused template code** ships in source control (and would ship in the bundle if it were tree‑shaken differently): `AIChatBox.tsx` (335 lines), `Map.tsx` (155 lines), `ComponentShowcase.tsx` (1437 lines), `DashboardLayout.tsx` + skeleton, `ManusDialog.tsx`, `server/_core/{llm,imageGeneration,voiceTranscription,map,dataApi,storage,sdk,oauth}.ts`, `_core/types/manusTypes.ts`, `client/src/_core/hooks/*`. None of these are reached by any route in `App.tsx`. The `client/public/__manus__/debug-collector.js` instrumentation script (772 lines) is served to every visitor and tries to POST to a `/__manus__/logs` endpoint that does not exist.
- **AWS S3 SDK** (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`) is in `dependencies` but imported nowhere. Roughly +15 MB of `node_modules` for nothing.
- **`patches/wouter@3.7.1.patch`** does not apply because the lockfile pins `wouter@3.3.5`. pnpm logs a warning every install.
- **Drizzle migrations live in two places** (`drizzle/0000_*.sql` + `drizzle/0001_*.sql` at the root, and an *empty* `drizzle/migrations/` folder). `drizzle-kit migrate` may not pick them up.
- **`<script>` tag for Umami analytics** uses `%VITE_ANALYTICS_ENDPOINT%` literal placeholders. Vite does not substitute these. As shipped, the browser fires a 404 to `/%VITE_ANALYTICS_ENDPOINT%/umami` — analytics are silently off.
- **Page components are very long and very copy-paste-y.** Every section block in every page repeats the same `motion.div` + `initial`/`whileInView`/`viewport`/`transition` props. The repetition makes future content edits costly. There is no shared `<Section>`, `<Hero>`, `<FeatureCard>`, or `<Eyebrow>` primitive even though they are clearly needed.
- **Component variants live as ad-hoc Tailwind classes,** not as `cva` variants. Buttons in particular re-declare the same long string in 15+ places (`px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all glow-orange inline-flex …`). A `<Button variant="primary">` would shrink the codebase noticeably.
- **`Footer.tsx` includes a "fixed bottom-right back-to-top button on every page,"** even on the 404 and over the chat-style submit buttons on Contact. The 12 × 12 floating orange circle competes for attention in every screenshot.
- **The newsletter form is duplicated on the Contact page:** the page renders its own "Stay Updated" section *and* the global footer's "Stay Updated" section right below it. Visitors see two consecutive newsletter signups.
- **Cookie/SameSite/CSRF strategy** is the default and the cookie name `app_session_id` is template-flavored.
- **No `robots.txt`, no `sitemap.xml`,** no `humans.txt`, no security.txt, no `manifest.json`.

## 3. SEO

This is the weakest area.

- **One global `<title>`** for the whole site (`SparkLab | Youth Entrepreneurship for Students`). Every page returns the same title, the same description, the same keywords. Google effectively sees a single page.
- **No per-page `<meta>` overrides.** No `react-helmet`, no `@unhead/react`, no SSR. wouter + CSR means every route serves the same `index.html`.
- **No SSR / no static pre-render.** Bots that don't execute JavaScript see an empty `<div id="root"></div>`. Modern Googlebot will render, but social cards and link previews on LinkedIn/Slack/iMessage will not.
- **No Open Graph or Twitter tags.** Sharing the site on LinkedIn (their only social channel) yields no preview image.
- **No JSON-LD structured data.** A program like this is a near-perfect fit for `EducationalOrganization`, `Course`, `Event` (the competition), and `FAQPage` schemas.
- **`<meta name="keywords">`** is still here. Google ignored it ~15 years ago, but Bing/Yandex still parse it; not a bug, just dated.
- **FAQ content is tab-gated.** Only one of four FAQ tabs renders to the DOM on initial load. Three quarters of the FAQ answers are not crawlable until the user (or a JS-aware crawler) clicks.
- **No `sitemap.xml`, no `robots.txt`, no canonical URLs.**
- **`favicon.png` ships at 8 KB** but there is no apple-touch-icon, no `<link rel="manifest">`, no theme-color meta. Bookmarking on iOS / pinning on Windows yields a generic placeholder.
- **Image alt text** exists on most photos and reads naturally, but: the hero on `/mentors` is alt'd "SparkLab Judges Panel" (good), while the hero on Competition is alt'd just "SparkLab Competition" (less useful). Several decorative images do not have empty alt (`alt=""`), they instead have semantic alt — which screen readers will read aloud unnecessarily.
- **Heading hierarchy is mostly clean** but each page jumps `h1 → h2 → h3`, sometimes skipping `h2` (e.g. About hero is `h1` then About body jumps to `h2`).
- **Internal linking is shallow.** No breadcrumbs, no cross-links inside body copy (e.g. About → Program), only end-of-section CTAs.
- **URL structure is fine** (`/students`, `/schools`, `/mentors`, `/competition`, `/faq`, `/contact`) — short, descriptive, kebab-friendly. Nothing to change here.

## 4. Mobile experience

- **The mobile layout actually works.** Hamburger menu at `lg` breakpoint, single-column stacks below it, body type scales down through the `text-4xl md:text-6xl` pattern. No horizontal scroll anywhere in the 390 px screenshots I captured.
- **Hit targets are large enough** (`py-3 px-6` on most CTAs), but the back-to-top floating button overlaps the bottom of the page content on the 390 px screenshots and partially covers form-submit buttons on the Contact page.
- **The "Get Started" header CTA disappears** below the `lg` breakpoint and is not replaced anywhere else in the mobile chrome. On mobile, the only path forward is to open the menu, scroll to "Get Started" inside it.
- **Mobile menu dropdown for "Get Involved"** uses the same hover-trigger pattern as desktop, but on tap. It works, but the click target is the whole row including a chevron that rotates — fine, but it does not match the native iOS/Android disclosure pattern (no spring animation on the children).
- **Hero text on mobile** still sits over a full-bleed background photo at low opacity. The contrast ratio of "Powered by SIGU x KMI" eyebrow text on the home hero on mobile drops below 4.5:1 (orange `#FF5C22` over the photo's brighter areas).
- **Font sizes look fine** but body line-height is a touch tight on mobile (default Tailwind `leading-normal` ≈ 1.5) for the long-form sections on About and Program.
- **Sticky header height** (`h-20` = 80 px) eats ~10% of a 390×844 viewport. Could be reduced on scroll.
- **No `theme-color` meta**, so iOS Safari renders the chrome bar in white over the dark teal site — a visible seam.

## 5. Performance

I did not run Lighthouse against the dev server (HMR distorts numbers), but several issues will show up in any production audit:

- **No image optimization.** Every photo is a JPEG served at full resolution from `files.manuscdn.com` with no responsive `srcset`, no `loading="lazy"` (above-the-fold is fine, but the photo grids should lazy-load), no `decoding="async"`, no `width`/`height` to avoid layout shift, no WebP/AVIF. The home hero alone is the entire viewport's worth of pixels at whatever the source JPEG's dimensions are.
- **External font** with `display=swap` — fine, but no `preload`, so first paint will use the fallback for ~200ms.
- **External photos = layout shift + cumulative-layout-shift hit.** Without intrinsic dimensions or aspect-ratio boxes, every photo grid item resizes after load.
- **Animations on every section** via Framer Motion. Each section attaches an Intersection Observer, runs an opacity+transform animation. On low-end Chromebooks (which is your actual audience: school IT), this measurably affects scroll smoothness.
- **Bundle size is unmeasured** but will include `framer-motion`, all 30+ Radix UI primitives via shadcn (even the ones never used: Carousel, Calendar, Drawer, OTP, Resizable, Command, ContextMenu, Menubar, HoverCard, Pagination, etc.), `recharts`, `embla-carousel-react`, `date-fns`, `streamdown`. None of those are referenced by any page that ships to users.
- **No CDN** — assumed to be a single-region Node process serving both API and static files.
- **No HTTP caching headers** are configured in Express's static handler (`app.use(express.static(distPath))` uses defaults).

## 6. Accessibility

- **Color contrast** of muted-grey body text (`--muted-foreground: oklch(0.70 0.01 60)`) on dark teal `--background` measures roughly 5.5:1 — passes WCAG AA for body text but is borderline for small text.
- **Focus rings** are configured (`--ring` is the orange) but several custom interactive elements (the mobile menu button, the back-to-top button, the FAQ tab buttons, the audience-type buttons in the Contact form) rely on a `cursor: pointer` rule and the default browser focus outline, which the dark backgrounds make nearly invisible.
- **Form labels** are real `<label>` elements in `Contact.tsx` — good — but the newsletter input in `Footer.tsx` has no `<label>` at all, just a placeholder, which fails WCAG 1.3.1.
- **The FAQ accordion** uses `<button>` + state, not the native `<details>/<summary>` pattern. No `aria-expanded`, no `aria-controls`. Screen readers can hit the button but can't tell whether it's expanded.
- **Animated entrances trigger off scroll** with no respect for `prefers-reduced-motion`. Framer Motion supports this but the code does not opt in.
- **The fixed back-to-top floating button** has an `aria-label="Back to top"` (good) but it is always rendered, even when the user is at the top of the page.
- **404 page heading** is "404" (an `<h1>` with just digits), which screen readers will pronounce as the number, not "page not found". The actual page name is `<h2>`.

## 7. Content gaps vs. a strong modern fintech/payments site

Comparing against the kind of marketing site I'd build for a serious education-tech operator (Synthesis, BrightChamps, NFTE, Junior Achievement, AltSchool, etc.):

| Category | Today | What's expected |
| --- | --- | --- |
| **Proof / outcomes** | "150+ Students Impacted", "3 Schools Serviced" — no source, no time period | Named partner schools (with logos), real student outcome stats, before/after stories, alumni now in college, peer-reviewed studies, NPS from teachers |
| **Testimonials / quotes** | Two anonymous pull quotes only | Named teacher quote with school + photo, named student quote with year + business, named judge quote with company + title |
| **Founders / team** | "SIGU x KMI" name‑dropped, never explained | About page with founders' photos, names, backgrounds, why they started, board / advisory list |
| **Case studies** | One photo of "2025 Winners" with no team name or business | A short case study per winning team (problem they solved, MVP, judges' notes, where they are now) |
| **Press / coverage** | None | Local press, podcasts, conference talks, partner blog posts |
| **Curriculum proof** | "42 video modules" claim, no video previews | A sample lesson page (5-min video + the worksheet that goes with it), an outline of the 42 modules, a sample rubric |
| **Pricing / how to engage** | "Contact us to discuss" in FAQ #5 | At minimum a tier breakdown (district vs single-school vs after-school vs scholarship), sample timelines, sample MoU |
| **Application / intake flow** | One generic contact form for every audience | Distinct flows: student application (with parental consent), school inquiry (with district info), mentor signup (with industry + LinkedIn), sponsor packet request |
| **Calendar / events** | No mention of upcoming program dates or competition dates | Cohort calendar with "Applications close", "Cohort begins", "Competition day" milestones |
| **Brand assets / press kit** | None | Logo download (light + dark + mono SVG), brand guidelines PDF, headshots |
| **Trust / legal** | Privacy and Terms are non-functional `<button>`s | Real Privacy Policy and Terms; COPPA/FERPA stance (you're serving minors in schools — this is mandatory); accessibility statement |
| **Geographic reach** | "Birmingham, Michigan" in footer, "greater metropolitan area" on Contact | Map of partner schools, list of districts, "coming soon" cities, scholarship/financial-aid information |
| **Engagement / community** | One LinkedIn link in the footer | Newsletter archive, blog/news section, social proof aggregator |
| **Conversion tracking** | Zero (Umami tag is broken) | At least one working analytics platform, plus event tracking on form submit and CTA clicks |

## 8. Other smells worth flagging

- **Hardcoded prize amounts on the Home page** ($15K+, $7,500, $5,000, $2,500) directly contradict the explicit decision logged in `todo.md` ("Remove prize amounts") and the Competition page itself, which removed them. This is a real inconsistency a school administrator will notice immediately.
- **"Inaugural" competition winners** are shown without team names, schools, business ideas, or quotes. The visual proof exists; the storytelling does not.
- **No favicon variants, no apple-touch-icon, no OG image.** Sharing the site on LinkedIn gives you a blank preview tile.
- **Contact page lists no phone number, no city, no postal address.** "Greater metropolitan area" is too coy for a B2B education sale.
- **Footer Privacy Policy + Terms of Service** are styled like links but render as `<button>` elements with no `onClick` and no destination.
- **Image hot-linking from a third-party CDN** the team does not control (`files.manuscdn.com/user_upload_by_module/session_file/310519663096503204/...`) is a single point of failure. If the upload session expires or is purged, every hero on every page goes blank.
- **The "Powered by SIGU x KMI" eyebrow + footer mark** suggest a partnership that is not explained anywhere. This will confuse anyone who doesn't already know what SIGU and KMI are.
- **No site search.** Acceptable for a 9-page site, but worth noting.

---

## Prioritized improvement list for the redesign

### P0 — must fix before relaunch
1. **Theme the 404 page** to the dark teal/orange brand. Match typography, color, and CTA style.
2. **Remove or define SIGU and KMI.** Either drop the "Powered by" line, or add a one-paragraph explainer with logos and links on the About page.
3. **Resolve the prize-amount contradiction.** Decide whether to publish amounts. If yes, publish them everywhere consistently. If no, remove from the Home page.
4. **Self-host every image.** Pull the 24 `files.manuscdn.com` photos into `client/public/images/`, give each one a `width`/`height`, add `loading="lazy"` to anything below the fold, generate WebP/AVIF alternates.
5. **Fix the broken Umami tag.** Either replace the literal `%VITE_ANALYTICS_ENDPOINT%` placeholders with `import.meta.env.*` substitution, switch to GA4/Plausible, or remove the tag.
6. **Wire up the Privacy Policy and Terms of Service** with real content (or remove the buttons until they exist). These are not optional when serving minors.
7. **Delete the duplicated "Stay Updated" block on Contact** (the page-level one is redundant given the global footer one).
8. **Add per-page `<title>` and `<meta description>`.** Even with CSR, ship them via a lightweight head manager or hand-roll updates in each page's `useEffect`.
9. **Add Open Graph + Twitter Card meta tags** plus a 1200×630 OG image. The site is shared on LinkedIn — make that share useful.
10. **Add a `<label>` for the footer newsletter input** (or wrap the input in one). Accessibility violation.

### P1 — should fix before serious district outreach
11. **Replace generic "Contact" flow with audience-specific intake forms** (Student / School / Mentor / Sponsor), each with the fields that audience actually needs. Connect to a real mailer (Postmark/Resend) and CRM (HubSpot/Pipedrive). Add a "What to expect" timeline below each form.
12. **Add structured data:** `EducationalOrganization` for the site, `Course` for the program, `Event` for the competition, `FAQPage` for the FAQ tabs, `Organization` with founders + sameAs links to LinkedIn.
13. **Add real proof:** named teacher quote with school + photo, named student quote with year + business name, named judge quote with title. Replace the abstract "150+ students" with citable numbers and a footnote.
14. **Name the 2025 winning teams.** Team name, school, business idea, one quote each, founders pictured. Right now the winners are anonymous — the social proof is wasted.
15. **Surface the 8-week breakdown on the Program page** (currently only on Home). Add a sample video and a sample worksheet.
16. **Make the FAQ crawlable without JS** (render all tabs as collapsed `<details>` elements, or use `aria-expanded` properly). Add `FAQPage` JSON-LD.
17. **Add a `sitemap.xml`, `robots.txt`, and `manifest.json`.** Add apple-touch-icon and theme-color meta.
18. **Standards alignment claim** ("Curriculum Alignment" on Program page) should name actual standards (CTE clusters, MBA Research LAP, NBEA, state-specific).
19. **Add COPPA/FERPA stance.** You serve students under 13 (likely) and under 18 (definitely); this is required.
20. **Add `prefers-reduced-motion` support** to the Framer Motion animations.

### P2 — quality-of-life and polish
21. **Refactor the page components.** Introduce shared `<Section>`, `<Hero>`, `<FeatureCard>`, `<EyebrowLabel>`, `<CTAGroup>`, `<PullQuote>` primitives so future content edits are 1 prop, not 12 lines of JSX.
22. **Replace ad-hoc button classes with `cva` variants** in `components/ui/button.tsx` and use them throughout.
23. **Remove all dead Manus template code:** `AIChatBox`, `Map`, `ComponentShowcase`, `DashboardLayout*`, `ManusDialog`, `server/_core/{llm,imageGeneration,voiceTranscription,map,dataApi,storage,oauth,sdk}.ts`, `client/public/__manus__/`, `@aws-sdk/*`, `streamdown`, `recharts`, `embla-carousel-react`. Trim the bundle and the cognitive load.
24. **Add a press/news section** even if it starts empty — it creates a place to publish updates and announcements as cohorts run.
25. **Add a calendar / cohort dates section.** "Applications close" / "Cohort begins" / "Competition day" with countdown.
26. **Consider an SSR/SSG framework switch (Next.js or Astro).** Marketing sites with under 20 pages should not be CSR. SSR gives you free per-page meta, instant crawlability, and faster first paint.
27. **Lighten the dark-only theme.** Add a light variant or at minimum a higher-contrast variant for school computer-lab projectors.
28. **Strengthen visual hierarchy:** vary section layouts (full-bleed photo, two-column, three-column, quote pull, large-stat callout) so the page does not feel like 8 identical card grids in a row.
29. **Add team / founder bios on About.** Real names, real photos, real LinkedIn links. Pages selling to school districts cannot be anonymous.
30. **Add a brand kit / press kit** download (logo SVGs, fact sheet PDF, headshots) — both for journalists and for partner schools who need to put SparkLab on their own website.

### P3 — nice to have
31. **Dark/light toggle** wired through the existing `ThemeContext`.
32. **In-page search / Cmd-K** (`cmdk` is already a dependency).
33. **Newsletter double opt-in + unsubscribe link.** Add an `unsubscribed_at` column, support an unsubscribe route, switch to a transactional/marketing email service.
34. **Per-route loading states.** Currently the only feedback during a wouter route change is a top-of-page scroll.
35. **Site-wide error boundary message** (the existing `ErrorBoundary.tsx` shows a developer-y fallback).
36. **A short blog / news / "from the cohort" feed.** Cheap to start with MDX. Builds SEO long-tail and gives existing schools something to share.
