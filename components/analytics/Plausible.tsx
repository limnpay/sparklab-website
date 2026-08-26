import Script from "next/script";

/**
 * Lightweight, privacy-friendly analytics. No cookies, no PII, ~1KB script.
 *
 * Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=sparklabusa.com` in production to enable.
 * If the env var is absent, the component renders nothing — so local dev,
 * CI, and previews never ship trackers to real users.
 *
 * To swap for another tool (GA4, Umami, PostHog, Fathom), drop a similar
 * `<Script />` here and update the env-var check. Don't pile multiple
 * trackers into prod.
 */
export function Plausible() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
