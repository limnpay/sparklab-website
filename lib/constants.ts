/**
 * Shared brand + site constants. Anything that would otherwise be hardcoded
 * across multiple files belongs here so a single edit propagates everywhere
 * (and so JSON-LD / OG / footer / about page never drift apart).
 */

export const SITE = {
  name: "SparkLab",
  tagline: "Fuel the Spark. Find Your Light.",
  shortDescription:
    "An immersive 8-week entrepreneurship program where high school students build real businesses and compete for cash prizes. Year 2 is underway at nine Macomb County high schools, with county finals on December 17, 2026.",
  longDescription:
    "SparkLab is an immersive 8-week entrepreneurship program for high school students, based in Birmingham, Michigan. Students work in teams to build a real business from scratch — researching markets, developing brands, building financial projections, and pitching to industry judges for cash prizes. Year 2 kicked off on October 5, 2026 at nine high schools across eight Macomb County districts. Twelve teams advance to the Macomb County Pitch Competition on December 17, 2026. SparkLab is a collaborative initiative between SIGU and KMI.",
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
  /** Student-facing count from the 2026 kickoff. */
  videoModulesLabel: "40+",
  teamSize: 5,
  typicalClassSize: "20-40 students",
  weeklyHours: "2-3 hours",
  immersiveDays: 4,
} as const;

/** Year 2 cohort. Kickoff was October 5, 2026. */
export const COHORT = {
  year: 2026,
  label: "Year 2",
  kickoff: "October 5, 2026",
  finalsName: "Macomb County Pitch Competition",
  finalsDate: "December 17, 2026",
  schoolCount: 9,
  districtCount: 8,
  finalistTeams: 12,
} as const;

/** Public arc of the program. Not the student lesson plan. */
export const PROGRAM_ARC = [
  {
    label: "Weeks 1–2",
    title: "Find the spark",
    body: "A team comes together and an idea starts to take shape.",
  },
  {
    label: "Weeks 3–5",
    title: "Build the business",
    body: "Money, brand, and a plan for how the company would actually run.",
  },
  {
    label: "Weeks 6–7",
    title: "Shape the pitch",
    body: "The story gets tighter, with time to practice before the room is full.",
  },
  {
    label: "Week 8",
    title: "Take the stage",
    body: "Teams pitch at their own school. Finalists move on to the county competition.",
  },
] as const;

export const PRIZES = {
  totalPool: "$40,000",
  first: { label: "1st Place", amount: "$20,000" },
  second: { label: "2nd Place", amount: "$12,000" },
  third: { label: "3rd Place", amount: "$8,000" },
  disclaimer: `${COHORT.finalsName}, ${COHORT.finalsDate}. Prize money is distributed directly to winning team members. Amounts can vary by competition and sponsorship.`,
} as const;

/** Amounts on the December 15, 2025 checks. Do not reuse for the 2026 finals. */
export const PRIZES_2025 = {
  totalPool: "$15,000",
  first: { label: "1st Place", amount: "$7,500" },
  second: { label: "2nd Place", amount: "$5,000" },
  third: { label: "3rd Place", amount: "$2,500" },
} as const;

export const STATS = [
  { value: "9", label: "High Schools" },
  { value: "8", label: "Districts" },
  { value: "12", label: "Finalist Teams" },
  { value: PROGRAM.videoModulesLabel, label: "Masterclass Videos" },
] as const;

export const GUEST_SPEAKERS = [
  {
    year: "2026",
    name: "Preston Brikho",
    role: "Kickoff guest speaker",
    bio: "Joined SparkLab students at the October 5, 2026 kickoff.",
  },
  {
    year: "2025",
    name: "Steve Jbara",
    role: "Guest speaker",
    bio: "Owner and president of the Grand Rapids Gold. Spoke at the 2025 SparkLab event.",
  },
] as const;
