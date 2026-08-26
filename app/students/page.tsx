import Image from "next/image";
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  Users,
  Trophy,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PRIZES, PROGRAM } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "For Students — Start a Real Business in High School",
  description:
    "Join SparkLab and build a real business with a team of five. Win cash prizes, get mentored by working entrepreneurs, and discover what you're capable of — no experience required.",
  path: "/students",
  keywords: [
    "high school entrepreneurship program",
    "student business competition Michigan",
    "teen startup",
    "youth business skills",
    "Michigan high school CTE",
  ],
});

type Benefit = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: Rocket,
    title: "Launch a real business",
    description:
      "Not a hypothetical. Pick a real problem, validate a real audience, build a real plan.",
  },
  {
    icon: Users,
    title: "Build with a team",
    description:
      "Work with 4 other students across roles — like a real founding team.",
  },
  {
    icon: Lightbulb,
    title: "Learn from operators",
    description:
      "Get mentored by entrepreneurs, investors, and professionals — not just teachers.",
  },
  {
    icon: Trophy,
    title: "Win cash prizes",
    description: `Top three teams split a ${PRIZES.totalPool} prize pool — paid directly to the students.`,
  },
];

const WHAT_YOULL_DO = [
  "Identify a real problem and the people who have it",
  "Build a brand from naming to logo to voice",
  "Construct a financial model and a pricing strategy",
  "Design a go-to-market plan and run early experiments",
  "Pitch on a real stage to working entrepreneurs",
  "Walk away with a portfolio-worthy project (and maybe prize money)",
];

export default function StudentsPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "For Students", href: "/students" },
        ]}
      />

      <PageHero
        eyebrow="For Students"
        title={
          <>
            Discover what{" "}
            <span className="text-gradient-spark">you're capable of.</span>
          </>
        }
        description={`Eight weeks. Five teammates. One real business. ${PROGRAM.videoModules} masterclass modules from working entrepreneurs, plus the chance to pitch for cash prizes.`}
        imageSrc="/images/heroes/students.jpg"
        imagePosition="top"
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ButtonLink href="/contact" size="lg">
            Apply Now
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/program" size="lg" variant="outline">
            See the program
          </ButtonLink>
        </div>
      </PageHero>

      {/* WHY JOIN */}
      <Section ariaLabelledby="why-heading">
        <SectionHeader
          eyebrow="Why join SparkLab"
          title={
            <>
              Build skills that{" "}
              <span className="text-gradient-electric">actually matter.</span>
            </>
          }
          description="College applications, your first job, your future startup — SparkLab is the experience that compounds across all of them."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.06}>
              <article className="card-elevated h-full p-7">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                  <b.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 font-bold text-lg">{b.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
                  {b.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHAT YOU'LL DO */}
      <Section tone="card" ariaLabelledby="do-heading">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left">
            <p className="eyebrow">What you'll do</p>
            <h2 id="do-heading" className="mt-4 text-3xl sm:text-4xl font-bold">
              You will leave SparkLab with something{" "}
              <span className="text-gradient-spark">you actually built.</span>
            </h2>
            <ul className="mt-8 space-y-3.5">
              {WHAT_YOULL_DO.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[color:var(--color-fg)]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--color-electric)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="right">
            <Image
              src="/images/heroes/students-detail.jpg"
              alt="SparkLab students collaborating in their school during a session"
              width={1200}
              height={900}
              className="rounded-2xl shadow-2xl"
            />
          </Reveal>
        </div>
      </Section>

      {/* NO EXPERIENCE NEEDED */}
      <Section ariaLabelledby="experience-heading">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)] mx-auto">
            <Lightbulb className="h-7 w-7" aria-hidden />
          </div>
          <h2
            id="experience-heading"
            className="mt-6 text-3xl sm:text-4xl font-bold"
          >
            No experience? <span className="text-gradient-electric">Perfect.</span>
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            You don't need to have a business idea, know what you want to
            study, or have any background in entrepreneurship. SparkLab is
            designed to meet you where you are — and take you somewhere new.
          </p>
        </div>
      </Section>

      {/* TIME COMMITMENT */}
      <Section tone="card" ariaLabelledby="time-heading">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <p className="eyebrow">Time commitment</p>
            <h2 id="time-heading" className="mt-4 text-3xl sm:text-4xl font-bold">
              Fits inside your school day.
            </h2>
            <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
              {PROGRAM.weeks} weeks. Roughly {PROGRAM.weeklyHours} of work per
              week. Most schools run SparkLab during a regular class period —
              not on top of your existing homework. No outside meetings, no
              "extra" required.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4">
              <Stat label="Weeks" value={`${PROGRAM.weeks}`} />
              <Stat label="Hours / week" value={PROGRAM.weeklyHours} />
              <Stat label="Team size" value={`${PROGRAM.teamSize}`} />
              <Stat label="Modules" value={`${PROGRAM.videoModules}`} />
            </ul>
          </Reveal>
          <Reveal direction="right">
            <div className="card-elevated p-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                <Clock className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-bold">A typical week</h3>
              <ol className="mt-5 space-y-3 text-sm text-[color:var(--color-fg-muted)]">
                <li>1 masterclass module (~20–30 min)</li>
                <li>1 team work session (~45 min)</li>
                <li>Optional homework / async</li>
                <li>Bi-weekly mentor check-in</li>
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="elevated" ariaLabelledby="students-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="students-cta-heading"
            className="text-3xl sm:text-4xl font-bold"
          >
            Ready to fuel your{" "}
            <span className="text-gradient-spark">spark</span>?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            SparkLab partners directly with schools. If your school doesn't
            run SparkLab yet, tell us — we'll reach out to them.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/contact" size="lg">
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/faq" size="lg" variant="outline">
              Read student FAQ
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[color:var(--color-bg)] border border-[color:var(--color-border)] p-4">
      <div className="text-2xl font-bold text-[color:var(--color-electric)]">
        {value}
      </div>
      <div className="mt-0.5 text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)]">
        {label}
      </div>
    </div>
  );
}
