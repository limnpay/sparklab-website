import type { Metadata } from "next";
import { SITE } from "./constants";

type PageSEO = {
  title: string;
  description: string;
  /** Path including leading slash, e.g. `/about`. */
  path: string;
  /** Path to an image inside /public. Defaults to the site OG image. */
  image?: string;
  /** Tighter, page-specific keywords. */
  keywords?: string[];
};

/**
 * Build a Next.js `Metadata` object with all the SEO fundamentals
 * (title, description, canonical URL, OG, Twitter, robots, geo) wired up.
 */
export function buildMetadata(seo: PageSEO): Metadata {
  const url = `${SITE.url}${seo.path}`;
  const image = seo.image ?? SITE.defaultOgImage;
  const absoluteImage = image.startsWith("http") ? image : `${SITE.url}${image}`;
  const fullTitle =
    seo.path === "/"
      ? `${seo.title} | ${SITE.name}`
      : `${seo.title} | ${SITE.name}`;

  return {
    metadataBase: new URL(SITE.url),
    // absolute: layout.tsx also has a `%s | SparkLab` template.
    title: { absolute: fullTitle },
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: fullTitle,
      description: seo.description,
      locale: SITE.locale,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: seo.description,
      images: [absoluteImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "geo.region": `${SITE.countryCode}-${SITE.regionCode}`,
      "geo.placename": `${SITE.city}, ${SITE.region}`,
      "geo.position": `${SITE.geoLatitude};${SITE.geoLongitude}`,
      ICBM: `${SITE.geoLatitude}, ${SITE.geoLongitude}`,
    },
  };
}
