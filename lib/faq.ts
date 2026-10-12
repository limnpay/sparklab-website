/**
 * Single source of truth for FAQ content. Rendered both as visible accordions
 * (so it's accessible and Cmd-F-able) AND as schema.org FAQPage JSON-LD
 * (so Google can surface answers directly in search results).
 */

import { COHORT, PRIZES } from "@/lib/constants";

export type FaqCategory = {
  id: string;
  title: string;
  description: string;
  items: Array<{ q: string; a: string }>;
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "students",
    title: "For Students",
    description: "Common questions from high schoolers thinking about joining.",
    items: [
      {
        q: "Do I need any business experience to join SparkLab?",
        a: "Not at all. SparkLab is designed for students with no prior business experience. We start from the basics and progressively build skills throughout the 8-week program. All you need is curiosity and a willingness to learn.",
      },
      {
        q: "What's the time commitment?",
        a: "SparkLab takes 2-3 hours per week over the 8-week program. Most schools run the program during a regular class period, so you don't need extra time outside of school. You'll watch one masterclass module and have one team work session each week.",
      },
      {
        q: "How are teams selected?",
        a: "Teams form inside each participating school, with 5 students per team. Teachers help match interests and complementary skills.",
      },
      {
        q: "Can my team really win cash prizes?",
        a: `Yes. At the ${COHORT.finalsName} on ${COHORT.finalsDate}, the top three teams split a ${PRIZES.totalPool} prize pool: ${PRIZES.first.amount} for 1st, ${PRIZES.second.amount} for 2nd, and ${PRIZES.third.amount} for 3rd. Prize money is distributed directly to the winning team members. The 2025 competition awarded a $15,000 pool.`,
      },
      {
        q: "What if my school doesn't offer SparkLab?",
        a: "Reach out to us through the contact form. We're always looking to expand to new schools — and we'll happily reach out to your school directly to start a conversation.",
      },
    ],
  },
  {
    id: "schools",
    title: "For Teachers & Schools",
    description: "How SparkLab works for educators and administrators.",
    items: [
      {
        q: "How does SparkLab fit into our existing curriculum?",
        a: "SparkLab is designed to complement existing CTE, business, economics, and STEM courses. It can be implemented during regular class time or as an after-school program. Our content aligns with state standards across multiple subject areas.",
      },
      {
        q: "What training do teachers need?",
        a: "Teachers act as facilitators, not subject-matter experts. We provide complete facilitation guides, professional development sessions, and ongoing support. Teachers don't need a business background — our materials guide both the teacher and the students.",
      },
      {
        q: "How much does it cost?",
        a: "SparkLab partners with schools individually to align pricing with your district's needs and budget. Reach out via the contact form and we'll set up a conversation about your specific situation.",
      },
      {
        q: "Do we need to provide the cash prizes?",
        a: "No. Prize money for the final competition comes from SparkLab and our sponsors. Schools focus on running the program — we handle the competition prize pool.",
      },
      {
        q: "When does SparkLab start?",
        a: `${COHORT.label} kicked off ${COHORT.kickoff} at nine Macomb County high schools. Those students pitch at their home school in week 8, and ${COHORT.finalistTeams} teams advance to the ${COHORT.finalsName} on ${COHORT.finalsDate}. If your school wants SparkLab, reach out.`,
      },
      {
        q: "How do we bring SparkLab to our school?",
        a: "Reach out through the contact form or email outreach@sparklabusa.com. Tell us about your school or district.",
      },
      {
        q: "Can we customize the program?",
        a: "Yes. While our core 8-week curriculum is well-designed, we work with schools to adapt timing, depth, and emphasis to fit local needs.",
      },
    ],
  },
  {
    id: "parents",
    title: "For Parents",
    description: "What parents should know about SparkLab.",
    items: [
      {
        q: "What does my child gain from SparkLab?",
        a: "Beyond business knowledge, students develop critical thinking, public speaking, teamwork, financial literacy, and leadership skills. They leave with a real project they built — a portfolio-worthy artifact for college applications, internships, and beyond.",
      },
      {
        q: "Is SparkLab safe and supervised?",
        a: "Absolutely. SparkLab runs through your child's school, with teachers facilitating sessions. All mentors and judges go through background screening before working with students.",
      },
      {
        q: "How does it impact college applications?",
        a: "SparkLab gives students concrete entrepreneurial experience — a documented business plan, brand, and pitch — to discuss in essays and interviews. It demonstrates initiative, leadership, and real-world problem-solving in a way colleges value.",
      },
      {
        q: "What if my child is shy or not naturally outgoing?",
        a: "SparkLab is designed to meet students where they are. The team structure ensures every student finds a role that fits them, whether that's research, design, finance, or presenting. Many shy students discover hidden strengths in front of their team.",
      },
    ],
  },
  {
    id: "mentors",
    title: "For Mentors & Judges",
    description: "Volunteering with SparkLab.",
    items: [
      {
        q: "What's the time commitment for mentors?",
        a: "Mentors typically meet with their assigned team for 30-minute check-ins every two weeks throughout the 8-week program. We also do async feedback on team deliverables. Total commitment is roughly 4-6 hours over the program.",
      },
      {
        q: "What background do I need to mentor?",
        a: "We look for professionals with entrepreneurial experience — founders, operators, marketers, investors, designers, executives. You don't need to have run a billion-dollar company; you just need real experience to share and the patience to mentor a high schooler.",
      },
      {
        q: "What does judging the pitch competition involve?",
        a: "Judges attend one in-person pitch event (typically 2-3 hours), pre-read finalist materials, and use our scoring rubric to evaluate teams across business viability, innovation, market understanding, and presentation quality.",
      },
      {
        q: "Can I do both mentoring and judging?",
        a: "Yes — many of our best volunteers do both. Mentor a team through the program and join the judging panel for the final pitch.",
      },
      {
        q: "Is there a background check?",
        a: "Yes. All mentors and judges complete a background check before working with students, in line with school district requirements.",
      },
    ],
  },
  {
    id: "giving",
    title: "Giving",
    description: "Individual gifts and how they reach SparkLab.",
    items: [
      {
        q: "How do I donate?",
        a: "Use the Donate tab in the header, or go to the Donate page. Individual gifts are processed through Givebutter, the fundraising platform we use for checkout and receipts.",
      },
      {
        q: "What does my donation support?",
        a: "Gifts help fund the student prize pool, bring SparkLab to more schools, and keep each 8-week program running — curriculum, facilitation, mentors, and the pitch night.",
      },
      {
        q: "Can my company sponsor instead of making an individual gift?",
        a: "Yes. Corporate sponsorship — prize-pool underwriting, brand partnership, multi-school support — starts on the Contact page. Choose “I want to Sponsor” and tell us about your company. That’s a different path from an individual Givebutter gift.",
      },
      {
        q: "Will I get a receipt?",
        a: "Givebutter issues a receipt for every completed gift. If you need additional documentation, email outreach@sparklabusa.com.",
      },
    ],
  },
];
