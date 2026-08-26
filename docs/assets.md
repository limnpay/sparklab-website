# Asset Inventory — SparkLab

All static assets shipped by the repo, plus every remote asset the site pulls in at runtime. The asset story is unusually thin: **most visible imagery is hot‑linked from the Manus CDN**, not stored locally.

## 1. Local images (in `client/public/`)

| File | Path | Size | Where it is used |
| --- | --- | --- | --- |
| Favicon | `client/public/favicon.png` | 8 014 B | `<link rel="icon">` in `client/index.html` |
| Brand logo | `client/public/images/SL_Logo_Primary_Electric.png` | bundled by Vite as `/images/SL_Logo_Primary_Electric.png` | `client/src/components/Layout.tsx:70` (header), `client/src/components/Footer.tsx:105` (footer) |
| Duplicate favicon copy | `client/public/images/favicon.png` | 8 014 B | Not referenced anywhere; safe to delete |

There is **no other local imagery**. The `IMAGE_AUDIT.md` and the various `*photo*.md` files at the repo root describe images that were once expected under `/images/` but were never committed.

## 2. Remote imagery (Manus CDN, hot‑linked)

Every hero, gallery photo, and inline product photo is loaded from `https://files.manuscdn.com/user_upload_by_module/session_file/310519663096503204/<hash>.jpg`. The 20 unique URLs and their hosts:

| # | URL (host omitted) | Used by | Alt text in code |
| --- | --- | --- | --- |
| 1 | `mSjabLfskvmsDpSY.jpg` | `Home.tsx:29` (hero) | Students collaborating in classroom |
| 2 | `GUardqukcXWIPWJK.jpg` | `Home.tsx:198` (gallery 1) | Students pitching on stage at competition |
| 3 | `YxquwaUrNCZAfWZe.jpg` | `Home.tsx:199` (gallery 2) | Students collaborating with mentor |
| 4 | `caQirMgKnUxUsZIh.jpg` | `Home.tsx:200` (gallery 3) | Judges evaluating presentations |
| 5 | `NGAaSoSQKvtdyCBC.jpg` | `Home.tsx:201` (gallery 4) | Students presenting in lecture hall |
| 6 | `ZivuPckgeBmijEym.jpg` | `Home.tsx:254` (For Students card) | Students |
| 7 | `zlnSsPKTbxmMDZVV.jpg` | `Home.tsx:262` (For Schools card) | Schools |
| 8 | `nImKTlGofZgPsEMS.jpg` | `Home.tsx:270` (For Mentors card) | Mentors & Judges |
| 9 | `nLMgrCIsalrkdWFN.jpg` | `Home.tsx:278` (For Sponsors card) | Sponsors |
| 10 | `fiRvvKJKYULSmKQj.jpg` | `Home.tsx:366` (Program Preview) | Students presenting their business |
| 11 | `yOnhpumqEGLatfns.jpg` | `Home.tsx:391` (Competition Highlight) | Students on stage at competition |
| 12 | `ZHgaouaPMcOYBbrr.jpg` | `About.tsx:20` (hero) | SparkLab competition |
| 13 | `ZhStgQhoAmQOcEjX.jpg` | `About.tsx:86` (What is SparkLab) | Mentor teaching students |
| 14 | `eAIGaqmdJToovDBU.jpg` | `Program.tsx:20` (hero) | Students working in groups |
| 15 | `ALJubIxaAqIgICoH.jpg` | `ForStudents.tsx:20` (hero) | Students collaborating |
| 16 | `yXcGvIoCzcHeQlbQ.jpg` | `ForStudents.tsx:97` (What You'll Do) | Student at laptop |
| 17 | `rJgMFWikhOLoazLq.jpg` | `ForSchools.tsx:20` (hero) | Students in classroom |
| 18 | `CKgwvROQpJfjOhJW.jpg` | `ForSchools.tsx:172` (What's Included) | SparkLab competition event |
| 19 | `uErtWNAKCxRHYEpp.jpg` | `ForMentors.tsx:20` (hero) | SparkLab Judges Panel |
| 20 | `MWNwIYmIjlqrlMVc.jpg` | `Competition.tsx:21` (hero) | SparkLab Competition |
| 21 | `RftAKQoVgSmGAQnu.jpg` | `Competition.tsx:262` (2025 winners group) | SparkLab 2025 Winners on stage with their checks |
| 22 | `MBYzJsatXCRSsALh.jpg` | `Competition.tsx:283` (1st place card) | 1st Place Winners |
| 23 | `eupfCjkzjZAiHwya.jpg` | `Competition.tsx:305` (2nd place card) | 2nd Place Winners |
| 24 | `vNUWHwSwXJsTlWWm.jpg` | `Competition.tsx:327` (3rd place card) | 3rd Place Winner |

All 24 URLs returned **HTTP 200** at audit time (June 18, 2026), so the live site still renders. But they sit on a session-scoped Manus upload bucket (`session_file/310519663096503204/`) that the SparkLab team does not control. If those URLs ever expire, the site will go visually empty across every page.

There are also several legacy markdown notes referring to local files that never made it into `client/public/images/`: `homepage-hero.jpg`, `winner-1st.jpg`, etc. (see `IMAGE_AUDIT.md`, `photo-*.md`, `correct-photo-mapping.md`, `final-correct-mapping.md`, `gdrive-photos.md`, etc.). None of those file names exist in the repo today.

## 3. Fonts

| Family | Weights | Source |
| --- | --- | --- |
| **Space Grotesk** | 400, 500, 600, 700 | Google Fonts — `<link>` in `client/index.html:15` |
| **Inter** | 400, 500, 600, 700 | Google Fonts — same `<link>` |

Bound to CSS variables in `client/src/index.css`:

```47:60:client/src/index.css
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
```

Applied in `@layer base` (`index.css:144‑154`): body text uses `Inter`, all `h1…h6` use `Space Grotesk`.

No locally hosted font files. No font preloading beyond `<link rel="preconnect">` to Google's font CDN.

## 4. Icons

| Source | Usage |
| --- | --- |
| **lucide-react** v0.453.0 | Sole icon library. Each page imports the exact icons it needs (`ArrowRight`, `Lightbulb`, `Users`, `Trophy`, etc.). |
| Inline SVG | Mobile menu / close glyph in `client/src/components/Layout.tsx:160-181`. Back‑to‑top arrow in `client/src/components/Footer.tsx:236-248`. |

There are no `.svg`, `.ico`, `.webp`, `.avif`, or vector files in the repo aside from the `client/src/components/ui/*.tsx` icons that shadcn ships internally.

## 5. Other notable files in `client/public/`

| File | Purpose |
| --- | --- |
| `client/public/__manus__/debug-collector.js` | 772-line Manus instrumentation script. Captures console, network, and UI events and POSTs them to `/__manus__/logs`. Not referenced by `index.html`, but Vite serves it because it sits in `public/`. |
| `client/public/__manus__/version.json` | Single‑line build metadata (empty values in this checkout). |
| `client/public/.gitkeep` | Empty placeholder. |

## 6. Generated/build assets

Nothing currently in `dist/`. The build outputs `dist/public/` (client bundle) and `dist/index.js` (server bundle) per `vite.config.ts` and `package.json`.

## Asset health summary

- **Brand:** logo only, no logo variants (no monochrome / dark / favicon‑in‑SVG / social card / OG image).
- **Photography:** entirely off‑host; pages will go blank if Manus expires the URLs.
- **Fonts:** Google‑hosted; one extra network round trip on first paint.
- **OG / social cards:** none. `<meta property="og:*">` and `<meta name="twitter:*">` are absent.
- **Apple touch icon, manifest, theme-color:** none.
