# Integrations, Forms, & External Dependencies — SparkLab

## 1. Forms

There are **two user-facing forms**, both submitted via tRPC to the same Express process. Both have the same flow: client mutation → tRPC procedure → MySQL insert via Drizzle → optional owner notification.

### 1.1 Contact / "Express Interest" form

| Property | Value |
| --- | --- |
| Location | `client/src/pages/Contact.tsx` |
| Submits to | tRPC procedure `contact.submit` (`server/routers.ts:23-62`), reachable at `POST /api/trpc/contact.submit` |
| Persists to | MySQL table `contact_submissions` (`drizzle/schema.ts:29-38`) |
| Validation | Zod schema in router, `min(1)/max(...)`; client also requires name/email/message via plain `required` attributes |
| Notification | `notifyOwner()` → Manus Forge `SendNotification` (`server/_core/notification.ts`) — best-effort; failures are logged, not surfaced to the user |
| Success UI | `sonner` toast "Thank you for your interest! We'll be in touch soon." |
| Failure UI | `sonner` toast with the tRPC error message (generic "Something went wrong" if none) |

Fields collected:

| Field | UI type | Required | DB column | Notes |
| --- | --- | --- | --- | --- |
| Interest type | 4-button toggle (`student` / `school` / `mentor` / `sponsor`) | required (defaults to `student`) | `role` (varchar 100) | The "other" type is declared in the union but no button surfaces it |
| Name | text input | yes | `name` (varchar 255) | |
| Email | email input | yes, validated via Zod `.email()` | `email` (varchar 320) | |
| Organization / school name | text input | no | `organization` (varchar 255) | label changes copy based on interest type |
| Message | textarea (4 rows) | yes | `message` (text) | placeholder copy changes based on interest type |

There is no spam protection (no honeypot, no CAPTCHA, no rate limit, no CSRF beyond the SameSite cookie default). There is also no file upload, no consent checkbox, and no marketing‑opt‑in pre‑checked or otherwise.

### 1.2 Newsletter signup form

| Property | Value |
| --- | --- |
| Location | `client/src/components/Footer.tsx` (every page) **and** `client/src/pages/Contact.tsx` (bottom of Contact) |
| Submits to | tRPC procedure `newsletter.subscribe` (`server/routers.ts:65-91`), reachable at `POST /api/trpc/newsletter.subscribe` |
| Persists to | MySQL table `newsletter_signups` with a `unique` index on `email` (`drizzle/schema.ts:44-49`) |
| Validation | Zod `.email().max(320)`, plus optional `source` field auto‑set to `"footer"` or `"contact-page"` |
| Notification | `notifyOwner()` only fires on first signup, not duplicates |
| Success UI | toast: "Thanks for subscribing! …" / "You're subscribed! …" |
| Failure UI | toast with tRPC error |

Fields:

| Field | UI type | Required | DB column |
| --- | --- | --- | --- |
| Email | email input | yes | `email` (varchar 320, unique) |
| Source | hidden | `"footer"` or `"contact-page"` | `source` (varchar 100) |

There is **no double opt-in**, no welcome email, no unsubscribe link, and the database has no `unsubscribed_at` column. The copy "We respect your privacy. Unsubscribe at any time." on the contact page is therefore aspirational.

### 1.3 Links labelled as forms but inert

- The `<Link href="/students">` "Apply Now" button on `ForStudents.tsx:44`, the "Apply as a Student" CTAs on the home page, the "Partner With Us" CTA, etc. all route to other marketing pages or back to `/contact`. There is **no separate student application form**, no school onboarding flow, and no mentor/judge intake.
- Footer "Privacy Policy" and "Terms of Service" are `<button>` elements with no `onClick` handler (`Footer.tsx:216-221`). They look like links but go nowhere.

## 2. tRPC API surface

Routes mounted on Express in `server/_core/index.ts` and defined in `server/routers.ts`:

| Procedure | HTTP route | Public? | Notes |
| --- | --- | --- | --- |
| `system.health` | `POST /api/trpc/system.health` | yes | From `_core/systemRouter.ts` — boilerplate ping |
| `auth.me` | `POST /api/trpc/auth.me` | yes | Returns the session user (or `null`). Unused by the site. |
| `auth.logout` | `POST /api/trpc/auth.logout` | yes | Clears the session cookie. Unused by the site. |
| `contact.submit` | `POST /api/trpc/contact.submit` | yes | The contact form (see §1.1) |
| `newsletter.subscribe` | `POST /api/trpc/newsletter.subscribe` | yes | The newsletter form (see §1.2) |

Plus the non‑tRPC route `GET /api/oauth/callback` (`server/_core/oauth.ts`) which completes the Manus OAuth handshake. Nothing in the marketing UI triggers it.

## 3. Analytics, chat, payments, quote tools

| Category | Status |
| --- | --- |
| **Analytics** | A single Umami tag is hard-coded in `client/index.html:21-24`: `<script defer src="%VITE_ANALYTICS_ENDPOINT%/umami" data-website-id="%VITE_ANALYTICS_WEBSITE_ID%">`. The `%PLACEHOLDER%` syntax is not interpolated by Vite, so as shipped the browser requests literally `/%VITE_ANALYTICS_ENDPOINT%/umami` and gets a 404. Functionally **no analytics fire today**. There is no GA4, no GTM, no Segment, no Mixpanel, no Plausible, no Fathom, no Hotjar, no Microsoft Clarity. |
| **Chat / messaging widget** | None. (The `client/src/components/AIChatBox.tsx` component exists as Manus template scaffolding but is not rendered by any page or route.) |
| **Payments / Stripe / checkout** | None. |
| **Quote / lead capture tools** (Calendly, HubSpot, Drift, etc.) | None. |
| **Embedded video** | None on the public pages. (The PR text mentions "42 masterclass videos" but no `<iframe>`, no Vimeo/YouTube embed exists in the codebase.) |
| **Maps** | The reusable `client/src/components/Map.tsx` loads Google Maps JS through a Manus "forge" proxy. **No page renders it**, so no map ever appears on the live site. |

## 4. External services the server actually calls

| Service | Code path | Trigger |
| --- | --- | --- |
| **Manus Forge** notification service (`<BUILT_IN_FORGE_API_URL>/webdevtoken.v1.WebDevService/SendNotification`) | `server/_core/notification.ts:88` | `notifyOwner()` on every contact submit + first newsletter signup |
| **Manus Forge** generic data API (`<BUILT_IN_FORGE_API_URL>/webdevtoken.v1.WebDevService/CallApi`) | `server/_core/dataApi.ts:31` | Helper only; no caller |
| **Manus Forge** storage proxy (`<BUILT_IN_FORGE_API_URL>/v1/storage/upload\|downloadUrl`) | `server/storage.ts:79,37` | Helper only; no caller |
| **Manus Forge** LLM, image gen, voice transcription | `server/_core/llm.ts`, `imageGeneration.ts`, `voiceTranscription.ts` | Helpers only; no caller |
| **Manus OAuth** (`<OAUTH_SERVER_URL>/webdev.v1.WebDevAuthPublicService/...`) | `server/_core/sdk.ts:46-77` | `GET /api/oauth/callback` (no UI trigger) |
| **Google Maps JS** via Manus Forge proxy (`<VITE_FRONTEND_FORGE_API_URL>/v1/maps/proxy/maps/api/js`) | `client/src/components/Map.tsx:95-110` | Only loaded if `<MapView>` mounts — no page mounts it |
| **AWS S3** | `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner` installed | Imported nowhere; pure dead dependency |
| **Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`) | `client/index.html:13-15` | Every page load |
| **Manus CDN** (`files.manuscdn.com`) | All `client/src/pages/*.tsx` hero/gallery images | Every page load |

## 5. Inbound webhooks / cron / background jobs

None. There is no `node-cron`, no BullMQ, no AWS Lambda triggers, no inbound webhook endpoints (Stripe, Mailchimp, etc.).

## 6. Secrets & credentials — where they should come from

Every credential is read from environment variables; **no secrets are hardcoded**. Compiled the full list by reading `server/_core/env.ts` plus every `process.env.*` and `import.meta.env.*` reference in the codebase.

| Variable | Read at | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | `server/db.ts:11`, `server/_core/env.ts:4`, `drizzle.config.ts:3` | MySQL connection string for Drizzle + drizzle‑kit |
| `JWT_SECRET` | `server/_core/env.ts:3` (used in `sdk.ts:158-160` to sign sessions) | HMAC secret for session cookies |
| `OAUTH_SERVER_URL` | `server/_core/env.ts:5`, `sdk.ts:33-37` | Manus OAuth backend base URL |
| `VITE_APP_ID` | `server/_core/env.ts:2`, `client/src/const.ts:6` | Manus application ID, sent in both server token exchange and the client login URL |
| `VITE_OAUTH_PORTAL_URL` | `client/src/const.ts:5` | Manus OAuth portal hostname used to build the login URL |
| `OWNER_OPEN_ID` | `server/_core/env.ts:6`, `server/db.ts:58` | Designates the admin user during upsert |
| `BUILT_IN_FORGE_API_URL` | `server/_core/env.ts:8` | Base URL for Manus Forge endpoints |
| `BUILT_IN_FORGE_API_KEY` | `server/_core/env.ts:9` | Bearer token for Manus Forge calls |
| `VITE_FRONTEND_FORGE_API_URL` | `client/src/components/Map.tsx:91` | Forge proxy URL used by the Google Maps loader |
| `VITE_FRONTEND_FORGE_API_KEY` | `client/src/components/Map.tsx:89` | Forge proxy API key (exposed to the browser by design) |
| `VITE_ANALYTICS_ENDPOINT`, `VITE_ANALYTICS_WEBSITE_ID` | `client/index.html:23-24` | Umami script URL + site ID (currently broken because Vite does not substitute `%PLACEHOLDER%`) |
| `PORT` | `server/_core/index.ts:53` | Optional starting port for Express |
| `NODE_ENV` | `server/_core/index.ts:47` | Selects dev/prod static-serving branch |

## 7. Hardcoded secrets / credentials found

**None.** I grep'd the workspace for JWT tokens (`eyJ…`), AWS access keys (`AKIA…`), GitHub tokens (`ghp_…`), OpenAI keys (`sk-…`), and long random‑looking literals adjacent to `key`/`secret`/`token`/`password` identifiers — no hits.

There is no `.env`, `.env.local`, `.env.example`, or `.env.production` file committed.

The one thing worth flagging: `client/public/__manus__/debug-collector.js` is a 772-line Manus diagnostic script that hooks `console`, `fetch`, `XHR`, and DOM events and POSTs to `/__manus__/logs`. It self-masks fields named `password`, `token`, `secret`, `key`, `authorization`, `cookie`, `session` (see lines 30-38). It is served to every visitor but the receiving endpoint (`/__manus__/logs`) doesn't exist in this Express app, so events go nowhere — but the script still attaches to every browser session. **Recommend deleting `client/public/__manus__/` for the redesign**.

## 8. Third-party scripts loaded in the browser

Loaded by `client/index.html`:

1. `https://fonts.googleapis.com/css2?family=Space+Grotesk:...&family=Inter:...&display=swap` — Google Fonts stylesheet
2. `https://fonts.gstatic.com/...` — actual font files (preconnected)
3. `/src/main.tsx` — the app bundle
4. `%VITE_ANALYTICS_ENDPOINT%/umami` — Umami tag (broken; see §3)

Loaded by the React app at runtime:

5. `https://files.manuscdn.com/user_upload_by_module/session_file/310519663096503204/...` — every hero/gallery photo

Loaded by `Map.tsx` if mounted (currently never): a script tag pointing at the Manus Forge maps proxy.

No `gtag.js`, no GTM container, no Facebook Pixel, no LinkedIn Insight Tag, no TikTok Pixel, no Hotjar, no Intercom, no Drift, no Stripe.js, no reCAPTCHA, no Sentry.
