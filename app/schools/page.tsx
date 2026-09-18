import Image from "next/image";
import {
  ArrowRight,
  GraduationCap,
  Package,
  Users,
  Award,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PROGRAM, SITE } from "@/lib/constants";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { CITIES } from "@/lib/cities";

export const metadata = buildMetadata({
  title: "For Schools — Drop-In Entrepreneurship Program",
  description: `Bring SparkLab to your school: a turnkey ${PROGRAM.weeks}-week entrepreneurship program with ${PROGRAM.videoModules} masterclass videos, teacher facilitation guides, and student workbooks. Designed for Michigan and Midwest high schools.`,
  path: "/schools",
  keywords: [
    "entrepreneurship program for schools",
    "high school business curriculum Michigan",
    "CTE program",
    "Oakland County schools",
    "Detroit metro high school programs",
    "Midwest career and technical education",
  ],
});

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
};

const BENEFITS: Benefit[] = [
  {
    icon: GraduationCap,
    title: "Standards-aligned",
    description:
      "Content that complements your existing CTE, business, and economics curriculum.",
    bullets: [
      "Aligns with state CTE standards",
      "Maps to business and finance courses",
      "Cross-curricular: math, English, social studies",
    ],
  },
  {
    icon: Package,
    title: "Turnkey delivery",
    description:
      "Everything teachers need to run a session — videos, lesson plans, workbooks, rubrics.",
    bullets: [
      `${PROGRAM.videoModules} masterclass video modules`,
      "Weekly teacher facilitation guides",
      "Coordinated student workbooks",
    ],
  },
  {
    icon: Users,
    title: "Industry connection",
    description:
      "Working entrepreneurs and operators mentor students throughout the program.",
    bullets: [
      "Mentor pool from local Michigan companies",
      "Industry judges for the final pitch",
      "Real-world feedback for students",
    ],
  },
  {
    icon: Award,
    title: "Student outcomes",
    description:
      "Tangible artifacts students take with them: a business plan, a brand, a pitch deck.",
    bullets: [
      "Portfolio-worthy team project",
      "Confidence in public speaking",
      "Resume + college-app material",
    ],
  },
];

const PROCESS = [
  {
    step: "Connect",
    description:
      "Reach out and tell us about your school. We'll schedule a short call.",
  },
  {
    step: "Plan",
    description:
      "We work with your team to fit SparkLab into a class period or after-school slot.",
  },
  {
    step: "Launch",
    description:
      "Your facilitating teachers get full access to materials, videos, and mentor support.",
  },
  {
    step: "Compete",
    description:
      "The program culminates in a live pitch competition with industry judges.",
  },
];

export default function SchoolsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "For Schools", href: "/schools" },
        ]}
      />

      <PageHero
        eyebrow="For Schools"
        title={
          <>
            A program your{" "}
            <span className="text-gradient-spark">teachers</span> can run.
          </>
        }
        description={`Drop-in ready: ${PROGRAM.weeks} weeks, ${PROGRAM.videoModules} masterclass videos, full facilitation guides, and a culminating pitch competition. Designed to fit a standard class period in any Michigan, Midwest, or Midwest-adjacent high school.`}
        imageSrc="/images/heroes/schools.jpg"
      >
        <ButtonLink href="/contact?interest=school" size="lg">
          Bring SparkLab to your school
          <ArrowRight className="h-5 w-5" />
        </ButtonLink>
      </PageHero>

      <TrustStrip eyebrow="Partnering with schools across Michigan & the Midwest" />

      {/* BENEFITS */}
      <Section ariaLabelledby="benefits-heading">
        <SectionHeader
          eyebrow="Why partner with SparkLab"
          title={
            <>
              Curriculum that{" "}
              <span className="text-gradient-electric">lifts your existing program.</span>
            </>
          }
          description="Schools partner with SparkLab because it gives teachers real entrepreneurship content they can deliver — and gives students an experience that compounds far beyond the program."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <article className="card-elevated h-full p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)]">
                  <b.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-bold">{b.title}</h3>
                <p className="mt-3 text-[color:var(--color-fg-muted)]">
                  {b.description}
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {b.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-[color:var(--color-fg-muted)]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-electric)]"
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT'S INCLUDED */}
      <Section tone="card" ariaLabelledby="included-heading">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left">
            <Image
              src="/images/heroes/schools-detail.jpg"
              alt="SparkLab program materials and student workbooks"
              width={1200}
              height={900}
              className="rounded-2xl shadow-2xl"
            />
          </Reveal>
          <Reveal direction="right">
            <p className="eyebrow">What's included</p>
            <h2 id="included-heading" className="mt-4 text-3xl sm:text-4xl font-bold">
              Everything you need.{" "}
              <span className="text-gradient-spark">Nothing extra to build.</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                {
                  title: "Complete curriculum",
                  body: `${PROGRAM.videoModules} masterclass videos + facilitation guides + student workbooks`,
                },
                {
                  title: "Mentor network",
                  body: "Working entrepreneurs and operators paired to your class",
                },
                {
                  title: "Final pitch competition",
                  body: "We help organize the in-person pitch event with industry judges",
                },
                {
                  title: "Prize pool",
                  body: "Cash prizes for top teams, distributed directly to winning students",
                },
                {
                  title: "Implementation support",
                  body: "Direct line to the SparkLab team throughout the program",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 flex-shrink-0 text-[color:var(--color-electric)]"
                    aria-hidden
                  />
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-[color:var(--color-fg-muted)]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* PROCESS */}
      <Section ariaLabelledby="process-heading">
        <SectionHeader
          eyebrow="How to get started"
          title={
            <>
              Four steps from{" "}
              <span className="text-gradient-electric">hello</span> to launch.
            </>
          }
          description="SparkLab is designed to be easy to bring in. Most partner schools go from first email to running the program in under one semester."
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.06}>
              <li className="card-elevated h-full p-6 relative">
                <span className="absolute top-4 right-4 text-5xl font-bold text-[color:var(--color-spark)]/15">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold">{p.step}</h3>
                <p className="mt-3 text-[color:var(--color-fg-muted)]">
                  {p.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* GEO REACH — city grid */}
      <Section tone="card" ariaLabelledby="geo-heading">
        <SectionHeader
          eyebrow="Geographic reach"
          title={
            <>
              Active and expanding across{" "}
              <span className="text-gradient-electric">{SITE.region}.</span>
            </>
          }
          description={`SparkLab launched in the ${SITE.metroAreas[0]} and is actively expanding to ${SITE.secondaryRegions.join(", ")}. Pick your city below to see a tailored page — or reach out and we'll come to you.`}
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CITIES.map((city) => (
            <li key={city.slug}>
              <Link
                href={`/schools/${city.slug}`}
                className="block h-full rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] p-5 hover:border-[color:var(--color-spark)]/50 hover:bg-[color:var(--color-spark)]/5 transition-colors group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)]">
                    {city.county}
                  </span>
                  <span
                    className={
                      city.status === "active"
                        ? "inline-block h-2 w-2 rounded-full bg-[color:var(--color-electric)]"
                        : "inline-block h-2 w-2 rounded-full bg-[color:var(--color-spark)]"
                    }
                    aria-label={
                      city.status === "active"
                        ? "Currently active"
                        : "Actively expanding"
                    }
                  />
                </div>
                <div className="mt-2 font-bold text-lg">
                  {city.name}, MI
                </div>
                <p className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
                  {city.tagline}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-spark)] group-hover:gap-1.5 transition-all">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-[color:var(--color-fg-muted)]">
          Don't see your city?{" "}
          <Link
            href="/contact?interest=school"
            className="text-[color:var(--color-spark)] hover:underline font-medium"
          >
            Tell us where to expand next
          </Link>
          .
        </p>
        <div className="mt-10 text-center">
          <ButtonLink href="/contact?interest=school" size="lg">
            Start the conversation
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
