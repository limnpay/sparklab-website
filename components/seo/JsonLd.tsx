import { SITE, SOCIAL } from "@/lib/constants";

/**
 * Renders a single JSON-LD `<script type="application/ld+json">` block.
 *
 * Server-rendered, no client JS. Pass any schema.org-shaped object.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema data is built server-side from typed constants, so dangerously
      // setting innerHTML here is safe and is the recommended Next.js pattern.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

/**
 * Site-wide organization block. Render once in the root layout so every page
 * carries it. Pairs `EducationalOrganization` with `LocalBusiness` data so the
 * site shows up for both general "what is SparkLab" searches and local Michigan
 * intent like "youth entrepreneurship program near me".
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.name,
    alternateName: "SparkLab USA",
    url: SITE.url,
    logo: `${SITE.url}/images/sparklab-logo.png`,
    image: `${SITE.url}${SITE.defaultOgImage}`,
    email: SITE.email,
    slogan: SITE.tagline,
    description: SITE.longDescription,
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.regionCode,
      postalCode: SITE.postalCode,
      addressCountry: SITE.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geoLatitude,
      longitude: SITE.geoLongitude,
    },
    areaServed: [
      {
        "@type": "State",
        name: "Michigan",
      },
      ...SITE.secondaryRegions.map((r) => ({
        "@type": "State",
        name: r,
      })),
    ],
    knowsAbout: [
      "youth entrepreneurship",
      "high school business program",
      "student startup competition",
      "STEM education",
      "business pitch competition",
      "career and technical education",
      "financial literacy",
      "marketing fundamentals",
    ],
    sameAs: [SOCIAL.linkedin],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "general",
      email: SITE.email,
      areaServed: "US",
      availableLanguage: "English",
    },
  };
  return <JsonLd data={data} />;
}

/**
 * Site-wide BreadcrumbList placeholder — we add per-page breadcrumbs in each
 * page so search results render them. The component lives here so the shape
 * is consistent.
 */
export function BreadcrumbsJsonLd({
  items,
}: {
  items: Array<{ name: string; href: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE.url}${item.href}`,
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * Site-wide WebSite block. Enables sitelinks searchbox eligibility and
 * declares the canonical site name for Google.
 */
export function WebSiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.shortDescription,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE.url}/#organization` },
  };
  return <JsonLd data={data} />;
}
