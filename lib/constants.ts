/**
 * Shared brand + site constants. Anything that would otherwise be hardcoded
 * across multiple files belongs here so a single edit propagates everywhere
 * (and so JSON-LD / OG / footer / about page never drift apart).
 */

export const SITE = {
  name: "SparkLab",
  tagline: "Fuel the Spark. Find Your Light.",
  shortDescription:
    "An immersive 8-week entrepreneurship program where high school students build real businesses, compete for cash prizes, and discover their potential.",
  longDescription:
    "SparkLab is an immersive 8-week entrepreneurship program for high school students based in Birmingham, Michigan. Students work in teams to build a real business from scratch — researching markets, developing brands, building financial projections, and pitching to a panel of industry judges for cash prizes. SparkLab partners with schools across Michigan and the greater Midwest and is a collaborative initiative between SIGU and KMI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sparklabusa.com",
  email: "outreach@sparklabusa.com",
  locale: "en_US",
  defaultOgImage: "/og-image.png",
  themeColor: "#003B46",
  // Locality / geo (used by LocalBusiness schema, geo meta tags, and copy)
  city: "Birmingham",
  region: "Michigan",
  regionCode: "MI",
  country: "United States",
  countryCode: "US",
  postalCode: "48009",
  // Birmingham, MI city center
  geoLatitude: 42.5467,
  geoLongitude: -83.2113,
  // Geographic reach used in copy + structured data
  primaryRegion: "Michigan",
  secondaryRegions: ["Ohio", "Indiana", "Illinois", "Wisconsin"],
  metroAreas: [
    "Detroit metro area",
    "Oakland County",
    "Wayne County",
    "Macomb County",
  ],
} as const;

export const SOCIAL = {
  linkedin: "https://linkedin.com/company/sparklabinfo",
} as const;

export const FORMSPREE = {
  // Public Formspree form IDs (not secrets). Env vars override the defaults.
  contactId: process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID || "mljereqq",
  newsletterId: process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID ?? "",
} as const;

export const GIVEBUTTER = {
  // Public Givebutter campaign URL (not a secret). Checkout stays on Givebutter.
  // Env var overrides the default if a new campaign is published.
  campaignUrl: (
    process.env.NEXT_PUBLIC_GIVEBUTTER_URL ||
    "https://givebutter.com/sparklab-donations-4aerwi"
  ).replace(/\/$/, ""),
} as const;

export const ROUTES = [
  { href: "/", label: "Home" },
  { href: "/program", label: "The Program" },
  {
    href: "#get-involved",
    label: "Get Involved",
    children: [
      { href: "/students", label: "For Students" },
      { href: "/schools", label: "For Schools" },
      { href: "/mentors", label: "For Mentors & Judges" },
    ],
  },
  { href: "/competition", label: "Competition" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export const PROGRAM = {
  weeks: 8,
  videoModules: 42,
  teamSize: 5,
  typicalClassSize: "20-40 students",
  weeklyHours: "2-3 hours",
} as const;

export const PRIZES = {
  totalPool: "$15,000",
  first: { label: "1st Place", amount: "$7,500" },
  second: { label: "2nd Place", amount: "$5,000" },
  third: { label: "3rd Place", amount: "$2,500" },
  disclaimer:
    "Prize amounts may vary by competition and sponsorship. Prize money is distributed directly to winning team members.",
} as const;

export const STATS = [
  { value: "150+", label: "Students Impacted" },
  { value: "3", label: "Partner Schools" },
  { value: "8", label: "Week Program" },
  { value: "42", label: "Video Modules" },
] as const;
