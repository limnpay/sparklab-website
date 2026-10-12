/**
 * 2026 participating schools, from the October 5 student kickoff.
 * Team counts are the finals berths: twelve teams advance to the
 * December 17 Macomb County Pitch Competition.
 *
 * Henry Ford II and Adlai E. Stevenson are both Utica Community Schools,
 * which is why nine schools sit inside eight districts.
 */

export type PartnerSchool = {
  name: string;
  district: string;
  city: string;
  citySlug: string;
  /** Teams from this school that advance to the county finals. */
  finalistTeams: number;
};

export const PARTNER_SCHOOLS: PartnerSchool[] = [
  {
    name: "Anchor Bay High School",
    district: "Anchor Bay School District",
    city: "New Baltimore",
    citySlug: "new-baltimore-mi",
    finalistTeams: 1,
  },
  {
    name: "Chippewa Valley High School",
    district: "Chippewa Valley Schools",
    city: "Clinton Township",
    citySlug: "clinton-township-mi",
    finalistTeams: 1,
  },
  {
    name: "Henry Ford II High School",
    district: "Utica Community Schools",
    city: "Sterling Heights",
    citySlug: "sterling-heights-mi",
    finalistTeams: 2,
  },
  {
    name: "L'Anse Creuse North High School",
    district: "L'Anse Creuse Public Schools",
    city: "Macomb Township",
    citySlug: "macomb-township-mi",
    finalistTeams: 1,
  },
  {
    name: "Richmond High School",
    district: "Richmond Community Schools",
    city: "Richmond",
    citySlug: "richmond-mi",
    finalistTeams: 1,
  },
  {
    name: "Romeo High School",
    district: "Romeo Community Schools",
    city: "Romeo",
    citySlug: "romeo-mi",
    finalistTeams: 2,
  },
  {
    name: "Adlai E. Stevenson High School",
    district: "Utica Community Schools",
    city: "Sterling Heights",
    citySlug: "sterling-heights-mi",
    finalistTeams: 2,
  },
  {
    name: "Warren Career Prep Center",
    district: "Warren Consolidated Schools",
    city: "Warren",
    citySlug: "warren-mi",
    finalistTeams: 1,
  },
  {
    name: "Warren Woods High School",
    district: "Warren Woods Public Schools",
    city: "Warren",
    citySlug: "warren-mi",
    finalistTeams: 1,
  },
];
