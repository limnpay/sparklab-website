/**
 * Michigan cities + nearby metros where SparkLab actively partners or wants to
 * partner with schools. Each entry becomes its own statically-rendered landing
 * page at /schools/[slug] with LocalBusiness JSON-LD scoped to that city —
 * a high-leverage move for "high school entrepreneurship program in [city]"
 * type searches.
 *
 * Adding a city here automatically:
 *   • generates a new static page at /schools/[slug]
 *   • adds it to sitemap.xml
 *   • adds a card to the /schools "Serving these areas" grid
 */

export type City = {
  slug: string;
  name: string;
  county: string;
  /** Short locality tagline used in hero + meta description */
  tagline: string;
  /** 1-2 sentences specific to this place */
  intro: string;
  /** Other partner cities nearby — used for internal linking */
  nearbyCities: string[];
  /** Approximate population — pulled from US Census 2020. Optional. */
  population?: number;
  /** Lat/lng for the LocalBusiness geo block */
  latitude: number;
  longitude: number;
  /** Whether SparkLab has already partnered with schools here vs aspirationally serving */
  status: "active" | "expanding";
  /** Overrides the default status card when the generic active/expanding line would be wrong. */
  statusDetail?: { headline: string; body: string };
  /** Named 2026 partner schools in this city. */
  partnerSchools?: string[];
};

export const CITIES: City[] = [
  {
    slug: "new-baltimore-mi",
    name: "New Baltimore",
    county: "Macomb County",
    tagline: "Anchor Bay High School is in the 2026 cohort.",
    intro:
      "Anchor Bay High School is one of nine Macomb County schools in SparkLab year 2. Students kicked off on October 5, 2026, pitch at their home school in week 8, and send a team to the county finals on December 17.",
    nearbyCities: ["Richmond", "Clinton Township", "Macomb Township", "Sterling Heights"],
    population: 12117,
    latitude: 42.6811,
    longitude: -82.7369,
    status: "active",
    partnerSchools: ["Anchor Bay High School"],
  },
  {
    slug: "clinton-township-mi",
    name: "Clinton Township",
    county: "Macomb County",
    tagline: "Chippewa Valley High School is in the 2026 cohort.",
    intro:
      "Chippewa Valley High School is running SparkLab year 2. Students build a business over eight weeks, pitch at school, and send a team to the Macomb County finals on December 17, 2026.",
    nearbyCities: ["Sterling Heights", "Macomb Township", "Warren", "New Baltimore"],
    population: 100513,
    latitude: 42.5869,
    longitude: -82.9199,
    status: "active",
    partnerSchools: ["Chippewa Valley High School"],
  },
  {
    slug: "sterling-heights-mi",
    name: "Sterling Heights",
    county: "Macomb County",
    tagline: "Two Utica Community Schools in the 2026 cohort.",
    intro:
      "Henry Ford II High School and Adlai E. Stevenson High School are both in SparkLab year 2. Each school sends two teams to the Macomb County Pitch Competition on December 17, 2026.",
    nearbyCities: ["Warren", "Clinton Township", "Troy", "Macomb Township"],
    population: 134346,
    latitude: 42.5803,
    longitude: -83.0302,
    status: "active",
    partnerSchools: [
      "Henry Ford II High School",
      "Adlai E. Stevenson High School",
    ],
  },
  {
    slug: "macomb-township-mi",
    name: "Macomb Township",
    county: "Macomb County",
    tagline: "L'Anse Creuse North is in the 2026 cohort.",
    intro:
      "L'Anse Creuse North High School joined SparkLab year 2. Students kicked off on October 5, pitch at their home school, and send a team to the county finals on December 17, 2026.",
    nearbyCities: ["Clinton Township", "New Baltimore", "Sterling Heights", "Romeo"],
    population: 91663,
    latitude: 42.6706,
    longitude: -82.9174,
    status: "active",
    partnerSchools: ["L'Anse Creuse North High School"],
  },
  {
    slug: "richmond-mi",
    name: "Richmond",
    county: "Macomb County",
    tagline: "Richmond High School is in the 2026 cohort.",
    intro:
      "Richmond High School is part of SparkLab year 2. Students spend eight weeks building a real business and send a team to the Macomb County finals on December 17, 2026.",
    nearbyCities: ["New Baltimore", "Romeo", "Macomb Township", "Clinton Township"],
    population: 5878,
    latitude: 42.8089,
    longitude: -82.756,
    status: "active",
    partnerSchools: ["Richmond High School"],
  },
  {
    slug: "romeo-mi",
    name: "Romeo",
    county: "Macomb County",
    tagline: "Romeo High School sends two teams to finals.",
    intro:
      "Romeo High School is in the 2026 SparkLab cohort. Two teams advance from Romeo to the Macomb County Pitch Competition on December 17, 2026.",
    nearbyCities: ["Richmond", "Macomb Township", "Sterling Heights", "Clinton Township"],
    population: 3767,
    latitude: 42.8028,
    longitude: -83.0127,
    status: "active",
    partnerSchools: ["Romeo High School"],
  },
  {
    slug: "warren-mi",
    name: "Warren",
    county: "Macomb County",
    tagline: "Two Warren high schools in the 2026 cohort.",
    intro:
      "Warren Career Prep Center and Warren Woods High School are both running SparkLab year 2. Each school sends a team to the Macomb County finals on December 17, 2026.",
    nearbyCities: ["Sterling Heights", "Clinton Township", "Troy", "Royal Oak"],
    population: 139387,
    latitude: 42.5145,
    longitude: -83.0147,
    status: "active",
    partnerSchools: ["Warren Career Prep Center", "Warren Woods High School"],
  },
  {
    slug: "birmingham-mi",
    name: "Birmingham",
    county: "Oakland County",
    tagline: "SparkLab's home base.",
    intro:
      "Birmingham is where SparkLab is based. The 2026 school cohort is underway at nine high schools in Macomb County. Schools in Birmingham can bring the same eight-week program to their students.",
    nearbyCities: ["Royal Oak", "Bloomfield Hills", "Troy", "Beverly Hills"],
    population: 21813,
    latitude: 42.5467,
    longitude: -83.2113,
    status: "expanding",
    statusDetail: {
      headline: "SparkLab is based in Birmingham.",
      body: "Our home base is here. Year 2 is running at nine Macomb County high schools. Birmingham schools can bring the same program to their students. Reach out.",
    },
  },
  {
    slug: "royal-oak-mi",
    name: "Royal Oak",
    county: "Oakland County",
    tagline: "Entrepreneurship for Royal Oak high schoolers.",
    intro:
      "Royal Oak schools are minutes from the Detroit metro startup scene. SparkLab brings working entrepreneurs into Royal Oak high schools through an 8-week program that maps directly to existing CTE and business curricula.",
    nearbyCities: ["Birmingham", "Berkley", "Ferndale", "Madison Heights"],
    population: 58211,
    latitude: 42.4895,
    longitude: -83.1446,
    status: "expanding",
  },
  {
    slug: "bloomfield-hills-mi",
    name: "Bloomfield Hills",
    county: "Oakland County",
    tagline: "Pitch competitions for Bloomfield Hills students.",
    intro:
      "Bloomfield Hills is a natural fit for SparkLab — strong academic programs, motivated students, and immediate access to mentors across Oakland County. We work with Bloomfield Hills Schools and surrounding districts to drop our program into existing class periods.",
    nearbyCities: ["Birmingham", "Bloomfield Township", "West Bloomfield", "Troy"],
    population: 4308,
    latitude: 42.5837,
    longitude: -83.2455,
    status: "expanding",
  },
  {
    slug: "troy-mi",
    name: "Troy",
    county: "Oakland County",
    tagline: "Real-world business skills for Troy high schoolers.",
    intro:
      "Troy School District students get hands-on entrepreneurship experience through SparkLab — building real businesses, working with local Michigan founders, and competing for cash prizes against teams across Oakland County.",
    nearbyCities: ["Birmingham", "Rochester Hills", "Madison Heights", "Sterling Heights"],
    population: 87294,
    latitude: 42.6064,
    longitude: -83.1498,
    status: "expanding",
  },
  {
    slug: "detroit-mi",
    name: "Detroit",
    county: "Wayne County",
    tagline: "Building the next generation of Detroit founders.",
    intro:
      "Detroit's resurgence has been driven by entrepreneurs. SparkLab is working to bring that energy directly into Detroit Public Schools Community District high schools — connecting students to the founders, operators, and investors building in their own city.",
    nearbyCities: ["Hamtramck", "Highland Park", "Dearborn", "Ferndale"],
    population: 639111,
    latitude: 42.3314,
    longitude: -83.0458,
    status: "expanding",
  },
  {
    slug: "ann-arbor-mi",
    name: "Ann Arbor",
    county: "Washtenaw County",
    tagline: "Entrepreneurship education for Ann Arbor students.",
    intro:
      "Ann Arbor's blend of research, tech, and startup culture makes it a high-value SparkLab expansion target. We partner with Ann Arbor Public Schools and area private schools to give high schoolers a real business-building experience that complements the academic rigor they already get.",
    nearbyCities: ["Ypsilanti", "Saline", "Chelsea", "Dexter"],
    population: 123851,
    latitude: 42.2808,
    longitude: -83.7430,
    status: "expanding",
  },
  {
    slug: "grand-rapids-mi",
    name: "Grand Rapids",
    county: "Kent County",
    tagline: "Bringing SparkLab to West Michigan.",
    intro:
      "Grand Rapids is West Michigan's entrepreneurial hub. SparkLab is actively building relationships with Grand Rapids Public Schools and surrounding districts to extend our 8-week program across West Michigan high schools.",
    nearbyCities: ["Kentwood", "Wyoming", "East Grand Rapids", "Walker"],
    population: 198917,
    latitude: 42.9634,
    longitude: -85.6681,
    status: "expanding",
  },
  {
    slug: "rochester-mi",
    name: "Rochester",
    county: "Oakland County",
    tagline: "Pitch. Compete. Win. — in Rochester.",
    intro:
      "Rochester Community Schools serves a highly motivated student body. SparkLab brings an 8-week startup-style accelerator directly into Rochester high schools, complete with mentor pairings and a culminating pitch competition.",
    nearbyCities: ["Rochester Hills", "Auburn Hills", "Troy", "Lake Orion"],
    population: 13192,
    latitude: 42.6806,
    longitude: -83.1339,
    status: "expanding",
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}
