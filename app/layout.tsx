import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
} from "@/components/seo/JsonLd";
import { Plausible } from "@/components/analytics/Plausible";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Youth Entrepreneurship Program in Michigan`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.shortDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "SparkLab",
    "youth entrepreneurship",
    "high school business program",
    "student entrepreneurship Michigan",
    "Birmingham Michigan",
    "Detroit metro entrepreneurship",
    "Macomb County schools",
    "Macomb County pitch competition",
    "Midwest student startup competition",
    "teen pitch competition",
    "8-week entrepreneurship program",
    "STEM business education",
    "high school CTE",
    "career and technical education Michigan",
  ],
  category: "education",
  formatDetection: { email: false, telephone: false, address: false },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: `${SITE.name} | Youth Entrepreneurship Program in Michigan`,
    description: SITE.shortDescription,
    images: [
      {
        url: SITE.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Youth Entrepreneurship Program in Michigan`,
    description: SITE.shortDescription,
    images: [SITE.defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    // Set NEXT_PUBLIC_GOOGLE_VERIFICATION / NEXT_PUBLIC_BING_VERIFICATION /
    // NEXT_PUBLIC_YANDEX_VERIFICATION in production to claim each property.
    // Each is the verification token (not the full meta tag string).
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
  other: {
    "geo.region": `${SITE.countryCode}-${SITE.regionCode}`,
    "geo.placename": `${SITE.city}, ${SITE.region}`,
    "geo.position": `${SITE.geoLatitude};${SITE.geoLongitude}`,
    ICBM: `${SITE.geoLatitude}, ${SITE.geoLongitude}`,
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <link rel="preconnect" href="https://formspree.io" />
        <Plausible />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:rounded-md focus:bg-[color:var(--color-spark)] focus:px-4 focus:py-2 focus:text-white focus:font-semibold"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
