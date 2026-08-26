# Page: 404 / Not Found — `/404` and `*`

- **File:** `client/src/pages/NotFound.tsx`
- **Layout:** wrapped in the same `Layout` (so the dark header/footer still surround it). However the page body itself uses an entirely different visual language than the rest of the site.

## Content
- Animated red AlertCircle icon
- H1: `404`
- H2: `Page Not Found`
- Body: "Sorry, the page you are looking for doesn't exist. It may have been moved or deleted."
- CTA: `Go Home` (a blue, shadcn `Button` that routes to `/` via `useLocation`)

## Per-page issues — major design inconsistency
- Background: `from-slate-50 to-slate-100` (light grey gradient) instead of the dark teal site theme.
- Card: white with `backdrop-blur-sm` — no other page uses these tokens.
- Button: `bg-blue-600`, blue-hover — does not exist anywhere else in the design system; SparkLab's primary color is orange (`oklch(0.65 0.22 30)`).
- Font: defaults to `Inter`, but uses Tailwind's stock `font-bold` instead of `font-display`.
- This page is the original shadcn starter 404 that was never themed. Any visitor who mistypes a URL lands in what looks like a different product.
