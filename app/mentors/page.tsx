import {
  ArrowRight,
  Briefcase,
  Lightbulb,
  Users,
  Award,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "For Mentors & Judges — Volunteer with SparkLab",
  description:
    "Volunteer with SparkLab as a mentor or pitch competition judge. Two flexible paths for working entrepreneurs, investors, and operators to give back to the next generation in Michigan.",
  path: "/mentors",
  keywords: [
    "mentor high school students",
    "pitch competition judge",
    "Michigan entrepreneur volunteer",
    "give back youth entrepreneurship",
    "SparkLab volunteer",
  ],
});

const ROLES = [
  {
    icon: Briefcase,
    title: "Mentor",
    tagline: "Walk a team through the program.",
    description:
      "Be paired with one or two student teams. Meet bi-weekly to offer guidance, feedback, and the perspective of someone who has built and run a business.",
    commitment: [
      "Bi-weekly 30-min check-ins (video or in person)",
      "Async feedback on team deliverables",
      "Optional attendance at the final pitch",
    ],
  },
  {
    icon: Award,
    title: "Pitch competition judge",
    tagline: "Score and give feedback at the final event.",
    description:
      "Join the panel for the in-person pitch competition. Evaluate teams, ask the kinds of questions real investors ask, and help decide the cash prize winners.",
    commitment: [
      "One in-person event (typically 2–3 hours)",
      "Pre-read of finalist materials",
      "Score using SparkLab rubric",
    ],
  },
];

const WHY = [
  {
    icon: Lightbulb,
    title: "Shape the next generation",
    description:
      "Your perspective compounds for decades in the careers of the students you reach.",
  },
  {
    icon: Users,
    title: "Connect with other operators",
    description:
      "The SparkLab mentor pool is a community of Michigan founders, investors, and operators.",
  },
  {
    icon: Calendar,
    title: "Flexible commitment",
    description:
      "Volunteer with one school program or come back every year. Two role options to fit your bandwidth.",
  },
];

const REQUIREMENTS = [
  "Professional or entrepreneurial experience (any industry)",
  "Comfortable giving honest, useful feedback to high schoolers",
  "Background check required for in-person school visits",
  "Excited about the next generation of founders",
];

export default function MentorsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "For Mentors & Judges", href: "/mentors" },
        ]}
      />

      <PageHero
        eyebrow="For Mentors & Judges"
        title={
          <>
            Share what you know.{" "}
            <span className="text-gradient-spark">Shape what's next.</span>
          </>
        }
        description="SparkLab connects working entrepreneurs, investors, and operators with high school students who are building real businesses. Two volunteer paths — both flexible."
        imageSrc="/images/heroes/mentors.jpg"
      >
        <ButtonLink href="/contact" size="lg">
          Volunteer Now
          <ArrowRight className="h-5 w-5" />
        </ButtonLink>
      </PageHero>

      {/* TWO ROLES */}
      <Section ariaLabelledby="roles-heading">
        <SectionHeader
          eyebrow="Two ways to get involved"
          title={
            <>
              Pick the role that{" "}
              <span className="text-gradient-electric">fits your bandwidth.</span>
            </>
          }
          description="Most of our volunteers start as a judge and later mentor a team. Some do both. Both are essential."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {ROLES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <article className="card-elevated h-full p-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                  <r.icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{r.title}</h3>
                <p className="mt-2 text-[color:var(--color-electric)] font-medium">
                  {r.tagline}
                </p>
                <p className="mt-5 text-[color:var(--color-fg-muted)]">
                  {r.description}
                </p>
                <h4 className="mt-7 text-sm font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)]">
                  Commitment
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {r.commitment.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-2.5 text-sm text-[color:var(--color-fg)]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-electric)]"
                        aria-hidden
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY VOLUNTEER */}
      <Section tone="card" ariaLabelledby="why-heading">
        <SectionHeader
          eyebrow="Why mentor or judge"
          title={
            <>
              The ROI is{" "}
              <span className="text-gradient-spark">deep.</span>
            </>
          }
          description="A few hours of your time will be referenced by students for years."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="card-elevated h-full p-7 bg-[color:var(--color-bg)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)]">
                  <w.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 font-bold text-lg">{w.title}</h3>
                <p className="mt-2 text-[color:var(--color-fg-muted)]">
                  {w.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT WE LOOK FOR */}
      <Section ariaLabelledby="reqs-heading">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="eyebrow">What we look for</p>
            <h2 id="reqs-heading" className="mt-4 text-3xl sm:text-4xl font-bold">
              No specific resume required.
            </h2>
            <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
              The best SparkLab mentors are operators who can give a high
              schooler the kind of feedback they'd give a junior teammate —
              honest, kind, and useful.
            </p>
            <ul className="mt-8 space-y-3">
              {REQUIREMENTS.map((req) => (
                <li
                  key={req}
                  className="flex items-start gap-3 text-[color:var(--color-fg)]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--color-electric)]"
                    aria-hidden
                  />
                  {req}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="elevated" ariaLabelledby="mentors-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="mentors-cta-heading"
            className="text-3xl sm:text-4xl font-bold"
          >
            Ready to give back?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            Tell us a bit about your background and which role appeals to
            you. We'll match you with a school that's running SparkLab.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/contact" size="lg">
              Volunteer Now
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/faq" size="lg" variant="outline">
              Mentor & judge FAQ
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
