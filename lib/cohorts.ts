/**
 * Past + upcoming SparkLab cohorts and pitch competitions.
 *
 * Every entry becomes an Event in the JSON-LD on /cohorts, so each
 * competition has a chance to appear in Google's events panel and
 * voice-assistant queries for "high school pitch competition Michigan".
 *
 * Dates are best-effort placeholders — replace with the real schedule
 * as you confirm partner-school timing.
 */

export type Cohort = {
  id: string;
  /** Display label, e.g. "2025 Spring Cohort" */
  name: string;
  status: "completed" | "in-progress" | "upcoming";
  /** ISO date for cohort start (week 1) */
  startDate: string;
  /** ISO date for the live pitch competition */
  pitchDate: string;
  /** City + venue name for the pitch event */
  venue: string;
  /** Brief summary shown on the page */
  description: string;
  /** Optional photo from /public/images/winners */
  image?: string;
  /** If completed, the winners */
  winners?: {
    first?: string;
    second?: string;
    third?: string;
  };
};

export const COHORTS: Cohort[] = [
  {
    id: "2025-spring",
    name: "2025 Spring Cohort",
    status: "completed",
    startDate: "2025-02-03",
    pitchDate: "2025-05-15",
    venue: "Birmingham, Michigan",
    description:
      "Our inaugural SparkLab cohort. Three winning teams across our partner Michigan high schools, judged by a panel of working entrepreneurs and investors.",
    image: "/images/winners/group-on-stage.jpg",
    winners: {
      first: "$7,500 — Team awarded 1st place",
      second: "$5,000 — Team awarded 2nd place",
      third: "$2,500 — Team awarded 3rd place",
    },
  },
  {
    id: "2026-spring",
    name: "2026 Spring Cohort",
    status: "completed",
    startDate: "2026-02-02",
    pitchDate: "2026-05-14",
    venue: "Birmingham, Michigan",
    description:
      "Second full SparkLab cohort. Expanded to more schools across metro Detroit with a $15,000 total prize pool.",
  },
  {
    id: "2026-fall",
    name: "2026 Fall Cohort",
    status: "upcoming",
    startDate: "2026-09-08",
    pitchDate: "2026-12-04",
    venue: "Birmingham, Michigan",
    description:
      "Fall 2026 cohort. Open to Michigan and Midwest partner schools. Applications open now — cohort kicks off after Labor Day with a $15,000 total prize pool.",
  },
  {
    id: "2027-spring",
    name: "2027 Spring Cohort",
    status: "upcoming",
    startDate: "2027-02-01",
    pitchDate: "2027-05-13",
    venue: "Birmingham, Michigan",
    description:
      "Spring 2027 cohort. Ideal for schools that align entrepreneurship with a spring semester elective.",
  },
];

export function getCohort(id: string) {
  return COHORTS.find((c) => c.id === id);
}
