import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  Users,
  Trophy,
  School,
  CheckCircle2,
  Sparkles,
  Zap,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PRIZES, PROGRAM, SITE, STATS } from "@/lib/constants";
import { COHORTS } from "@/lib/cohorts";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PrizePodium } from "@/components/sections/PrizePodium";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { SparkCanvas } from "@/components/effects/SparkCanvas";
import { AmbientOrbs } from "@/components/effects/AmbientOrbs";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { KineticText } from "@/components/effects/KineticText";
import { AnimatedNumber } from "@/components/effects/AnimatedNumber";
import { Magnetic } from "@/components/effects/Magnetic";
import { Countdown } from "@/components/effects/Countdown";
import { ScrollCue } from "@/components/effects/ScrollCue";

export const metadata = buildMetadata({
  title: "Youth Entrepreneurship Program in Birmingham, Michigan",
  description:
    "SparkLab is an 8-week entrepreneurship program where high school students in Michigan build real businesses, compete for cash prizes, and discover their potential.",
  path: "/",
  keywords: [
    "youth entrepreneurship program",
    "high school business program Michigan",
    "Birmingham Michigan",
    "Detroit metro student startup competition",
    "Midwest pitch competition",
    "SparkLab",
  ],
});

const KEY_DIFFERENTIATORS = [
  {
    icon: Lightbulb,
    title: "Real-world skills",
    description:
      "Marketing, finance, branding, and public speaking taught by people who've actually done the work — not from a textbook.",
  },
  {
    icon: Users,
    title: "Team collaboration",
    description:
      "Five students per team, just like a real startup: a builder, a marketer, a finance lead, a designer, and a presenter.",
  },
  {
    icon: Trophy,
    title: "Compete for cash",
    description: `${PRIZES.totalPool} total prize pool split between the top three teams, distributed directly to the students who win.`,
  },
];

const GALLERY = [
  { src: "/images/gallery/01-pitch-stage.jpg", alt: "SparkLab students pitching their business on stage at the final competition" },
  { src: "/images/gallery/02-mentor-collab.jpg", alt: "Students collaborating with an industry mentor during a SparkLab session" },
  { src: "/images/gallery/03-judges-evaluating.jpg", alt: "Industry judges evaluating SparkLab pitch presentations" },
  { src: "/images/gallery/04-lecture-hall.jpg", alt: "SparkLab teams presenting in a Michigan high school lecture hall" },
];

const WEEKS = [
  { range: "Week 1–2", title: "Ideation & market research" },
  { range: "Week 3–4", title: "Business model & strategy" },
  { range: "Week 5–6", title: "Branding & marketing" },
  { range: "Week 7–8", title: "Financials & pitch prep" },
];

export default function HomePage() {
  const now = Date.now();
  const nextCohort = COHORTS.filter(
    (c) => c.status !== "completed" && new Date(c.startDate).getTime() > now
  ).sort((a, b) => a.startDate.localeCompare(b.startDate))[0];

  return (
    <>
      <BreadcrumbsJsonLd items={[{ name: "Home", href: "/" }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE.url}/#webpage`,
          url: SITE.url,
          name: `${SITE.name} — Youth Entrepreneurship Program in Michigan`,
          isPartOf: { "@id": `${SITE.url}/#website` },
          about: { "@id": `${SITE.url}/#organization` },
          primaryImageOfPage: `${SITE.url}/images/heroes/home.jpg`,
        }}
      />

      {/* ============ HERO ============ */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden min-h-[100svh] flex items-center pt-24 pb-16 sm:pt-32 sm:pb-24"
      >
        {/* Layer 1: photo, deeply overlaid */}
        <div className="absolute inset-0 -z-30">
          <Image
            src="/images/heroes/home.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-bg)]/60 via-[color:var(--color-bg)]/85 to-[color:var(--color-bg)]" />
        </div>

        {/* Layer 2: ambient drifting orbs */}
        <AmbientOrbs className="-z-20" />

        {/* Layer 3: cursor-reactive particle mesh */}
        <div className="absolute inset-0 -z-10">
          <SparkCanvas />
        </div>

        {/* Layer 4: subtle grid + grain */}
        <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />
        <NoiseOverlay opacity={0.05} className="-z-10" />

        <div className="container-prose relative">
          <div className="grid gap-16 lg:grid-cols-[1.35fr,1fr] items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-elevated)]/60 backdrop-blur-md px-4 py-1.5 text-xs font-medium">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-electric)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-electric)]" />
                  </span>
                  <span className="text-[color:var(--color-fg-muted)]">
                    Birmingham, Michigan · Serving the Midwest
                  </span>
                </div>
              </Reveal>

              <KineticText
                as="h1"
                delay={0.15}
                className="mt-7 text-[3.25rem] leading-[0.95] sm:text-7xl lg:text-[7.5rem] font-bold tracking-tight"
              >
                {[
                  "Fuel the ",
                  <span key="spark" className="text-gradient-spark">
                    Spark.
                  </span>,
                  " Find Your ",
                  <span key="light" className="text-gradient-electric">
                    Light.
                  </span>,
                ]}
              </KineticText>

              <Reveal delay={0.55}>
                <p className="mt-8 max-w-xl text-lg sm:text-xl text-[color:var(--color-fg-muted)] leading-relaxed">
                  An immersive <strong className="text-[color:var(--color-fg)]">
                  {PROGRAM.weeks}-week entrepreneurship program</strong> where
                  high school students in Michigan build a real business,
                  work with industry mentors, and pitch for {PRIZES.totalPool}{" "}
                  in cash prizes.
                </p>
              </Reveal>

              <Reveal delay={0.7}>
                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  <Magnetic strength={0.25}>
                    <ButtonLink
                      href="/students"
                      size="lg"
                      className="group relative overflow-hidden"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                      />
                      <span className="relative">Apply as a Student</span>
                      <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </ButtonLink>
                  </Magnetic>
                  <Magnetic strength={0.25}>
                    <ButtonLink
                      href="/schools"
                      variant="secondary"
                      size="lg"
                      className="backdrop-blur-md"
                    >
                      Bring SparkLab to Your School
                    </ButtonLink>
                  </Magnetic>
                </div>
              </Reveal>
            </div>

            {/* Right: floating glass "next cohort" card */}
            {nextCohort ? (
              <Reveal delay={0.35} direction="right">
                <aside
                  aria-label="Next SparkLab cohort"
                  className="relative rounded-3xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-card)]/60 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)]"
                >
                  {/* corner accent */}
                  <div
                    aria-hidden
                    className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[color:var(--color-electric)]/60 to-transparent"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <p className="eyebrow !text-[color:var(--color-electric)]">Live</p>
                    <span className="text-xs text-[color:var(--color-fg-subtle)] uppercase tracking-wider">
                      Next cohort
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-bold">{nextCohort.name}</h2>
                  <p className="mt-1.5 text-sm text-[color:var(--color-fg-muted)]">
                    Applications open · Program starts{" "}
                    {new Date(nextCohort.startDate + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </p>
                  <div className="mt-6">
                    <Countdown targetIso={nextCohort.startDate} />
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3 pt-6 border-t border-[color:var(--color-border)]">
                    <div className="flex-1 min-w-[8rem]">
                      <div className="text-xs text-[color:var(--color-fg-subtle)] uppercase tracking-wider">
                        Prize pool
                      </div>
                      <div className="mt-1 text-2xl font-bold text-[color:var(--color-spark)]">
                        <AnimatedNumber value={PRIZES.totalPool} />
                      </div>
                    </div>
                    <Link
                      href="/cohorts"
                      data-cursor="cta"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-electric)] hover:gap-2 transition-all"
                    >
                      See schedule
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </aside>
              </Reveal>
            ) : null}
          </div>

          {/* Bottom row: stats + scroll cue */}
          <div className="mt-20 flex flex-col-reverse lg:flex-row lg:items-end lg:justify-between gap-10">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-[color:var(--color-border)] border border-[color:var(--color-border)] flex-1">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="bg-[color:var(--color-bg-card)]/70 backdrop-blur-md p-5 sm:p-6 text-center"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <div className="text-3xl sm:text-4xl font-bold text-[color:var(--color-spark)] tabular-nums">
                      <AnimatedNumber value={s.value} />
                    </div>
                    <div className="mt-1.5 text-[10px] sm:text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)] font-medium">
                      {s.label}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="hidden lg:block">
              <ScrollCue />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* ============ WHAT IS SPARKLAB ============ */}
      <Section tone="card" id="overview" ariaLabelledby="overview-heading" className="relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "spark", size: 500, top: "20%", left: "-10%", duration: 28, delay: 0, blur: 120 },
            { color: "electric", size: 380, top: "60%", left: "80%", duration: 32, delay: 4, blur: 100 },
          ]}
          className="opacity-40"
        />
        <SectionHeader
          eyebrow="What is SparkLab"
          title={
            <>
              A real <span className="text-gradient-spark">startup</span>{" "}
              accelerator, built for high schoolers.
            </>
          }
          description="SparkLab is not a textbook. It is hands-on entrepreneurship: students work in teams of five to take a business from idea to pitch in eight weeks, learning from people who've built and run companies."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {KEY_DIFFERENTIATORS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/60 backdrop-blur-md p-7 transition-all hover:border-[color:var(--color-spark)]/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(255,92,34,0.5)]">
                <div
                  aria-hidden
                  className="absolute -top-1 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[color:var(--color-spark)]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)] group-hover:bg-[color:var(--color-spark)]/25 transition-colors">
                  <item.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-[color:var(--color-fg-muted)]">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ GALLERY ============ */}
      <Section ariaLabelledby="gallery-heading">
        <SectionHeader
          eyebrow="See it in action"
          title={
            <>
              Real cohorts. Real{" "}
              <span className="text-gradient-electric">pitches.</span>
            </>
          }
          description="Photos from past SparkLab cohorts across Michigan. Students researching markets, building decks, and competing on stage."
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={i * 0.05}>
              <figure className="group relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ============ BENTO: WHO IT'S FOR ============ */}
      <Section
        tone="card"
        ariaLabelledby="audience-heading"
        id="get-involved"
        className="relative overflow-hidden"
      >
        <SectionHeader
          eyebrow="Who SparkLab is for"
          title={
            <>
              One program.{" "}
              <span className="text-gradient-spark">Four roles.</span>
            </>
          }
          description="Students, schools, volunteer mentors and judges, and sponsors — SparkLab connects all four to make every cohort run."
        />

        <div className="mt-14 grid gap-4 sm:gap-5 md:grid-cols-6 md:grid-rows-2 md:auto-rows-fr min-h-[38rem]">
          <BentoCard
            href="/students"
            title="Students"
            eyebrow="I'm a high schooler"
            body="Build a real business with 4 teammates. Work with industry mentors. Compete for cash prizes. Discover what you're capable of."
            image="/images/audiences/students.jpg"
            icon={Users}
            accent="spark"
            className="md:col-span-4 md:row-span-1"
            featured
          />
          <BentoCard
            href="/schools"
            title="Schools"
            eyebrow="I run programs"
            body="Drop-in ready. Fits any class period."
            image="/images/audiences/schools.jpg"
            icon={School}
            accent="electric"
            className="md:col-span-2 md:row-span-1"
          />
          <BentoCard
            href="/mentors"
            title="Mentors & Judges"
            eyebrow="I'm an operator"
            body="Two flexible ways to give back — mentor a team through the cohort or judge the final pitch competition."
            image="/images/audiences/mentors.jpg"
            icon={Sparkles}
            accent="electric"
            className="md:col-span-3 md:row-span-1"
          />
          <BentoCard
            href="/contact"
            title="Sponsors"
            eyebrow="I want to back this"
            body="Back the prize pool. Get your brand in front of entrepreneurial teens across Michigan."
            image="/images/audiences/sponsors.jpg"
            icon={Trophy}
            accent="spark"
            className="md:col-span-3 md:row-span-1"
          />
        </div>
      </Section>

      {/* ============ 8 WEEKS ============ */}
      <Section ariaLabelledby="program-heading" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left">
            <p className="eyebrow">The Program</p>
            <h2
              id="program-heading"
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Eight weeks to ship a{" "}
              <span className="text-gradient-electric">real business.</span>
            </h2>
            <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
              <AnimatedNumber
                value={`${PROGRAM.videoModules}`}
                className="text-[color:var(--color-spark)] font-bold"
              />{" "}
              masterclass video modules, weekly facilitation guides, student
              workbooks, and a final pitch competition — all designed to drop
              into a standard semester schedule.
            </p>
            <ol className="mt-8 space-y-3">
              {WEEKS.map((w, i) => (
                <li key={w.range} className="flex items-center gap-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)] font-bold text-sm">
                    {i + 1}
                  </span>
                  <span>
                    <span className="text-sm font-semibold text-[color:var(--color-electric)]">
                      {w.range}
                    </span>
                    <span className="ml-2 text-[color:var(--color-fg)]">
                      {w.title}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <Magnetic strength={0.2}>
                <ButtonLink href="/program" variant="outline">
                  See the full curriculum
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="relative">
              <Image
                src="/images/program/team-presenting.jpg"
                alt="A SparkLab team presenting their business plan"
                width={1200}
                height={900}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-[color:var(--color-spark)]/95 backdrop-blur-md text-white p-5 shadow-2xl">
                <div className="text-3xl font-bold tabular-nums">
                  <AnimatedNumber value={PRIZES.totalPool} />
                </div>
                <div className="text-xs uppercase tracking-wider opacity-90">
                  Total prize pool
                </div>
              </div>
              <div className="absolute -top-6 -right-6 rounded-2xl bg-[color:var(--color-bg-elevated)]/80 backdrop-blur-md border border-[color:var(--color-border-strong)] text-[color:var(--color-fg)] p-5 shadow-2xl">
                <div className="text-3xl font-bold text-[color:var(--color-electric)] tabular-nums">
                  <AnimatedNumber value={`${PROGRAM.videoModules}`} />
                </div>
                <div className="text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)]">
                  Modules
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ============ COMPETITION + PODIUM ============ */}
      <Section
        tone="card"
        ariaLabelledby="comp-heading"
        className="relative overflow-hidden"
      >
        <AmbientOrbs
          orbs={[
            { color: "spark", size: 480, top: "10%", left: "50%", duration: 30, delay: 0, blur: 130 },
          ]}
          className="opacity-40"
        />
        <SectionHeader
          eyebrow="The Competition"
          title={
            <>
              Pitch. Compete.{" "}
              <span className="text-gradient-spark">Win.</span>
            </>
          }
          description="SparkLab culminates in an in-person pitch competition where teams present to a panel of working entrepreneurs, investors, and operators. Top three teams win cash distributed directly to students."
        />
        <div className="mt-16">
          <PrizePodium />
        </div>
        <div className="mt-14 text-center">
          <Magnetic strength={0.2}>
            <ButtonLink href="/competition" variant="outline">
              See the 2025 winners
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Magnetic>
        </div>
      </Section>

      {/* ============ GEO REACH ============ */}
      <Section ariaLabelledby="reach-heading">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Serving Michigan & the Midwest</p>
          <h2
            id="reach-heading"
            className="mt-4 text-3xl md:text-5xl font-bold leading-tight"
          >
            Built in Birmingham. Open to schools across the region.
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            SparkLab launched with schools in {SITE.metroAreas[0]} and is
            actively expanding across {SITE.region}, {SITE.secondaryRegions.slice(0, -1).join(", ")}, and {SITE.secondaryRegions.slice(-1)[0]}.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[SITE.region, ...SITE.secondaryRegions, ...SITE.metroAreas].map(
              (r) => (
                <span
                  key={r}
                  className="rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-card)]/60 backdrop-blur px-3 py-1.5 text-xs text-[color:var(--color-fg-muted)]"
                >
                  {r}
                </span>
              )
            )}
          </div>
          <div className="mt-10">
            <Magnetic strength={0.25}>
              <ButtonLink href="/contact">
                Bring SparkLab to your school
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </Section>

      {/* ============ FINAL CTA ============ */}
      <Section
        tone="elevated"
        ariaLabelledby="cta-heading"
        className="relative overflow-hidden"
      >
        <AmbientOrbs
          orbs={[
            { color: "spark", size: 600, top: "-20%", left: "40%", duration: 24, delay: 0, blur: 140 },
            { color: "electric", size: 400, top: "50%", left: "10%", duration: 28, delay: 3, blur: 100 },
          ]}
          className="opacity-50"
        />
        <NoiseOverlay opacity={0.05} />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-card)]/60 backdrop-blur-md px-4 py-1.5 text-xs font-medium">
            <Zap className="h-3.5 w-3.5 text-[color:var(--color-electric)]" />
            <span className="text-[color:var(--color-fg-muted)]">
              Applications open now
            </span>
          </div>
          <h2 id="cta-heading" className="mt-6 text-4xl md:text-6xl font-bold leading-[1.05]">
            Ready to ignite your{" "}
            <span className="text-gradient-spark">spark</span>?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            Whether you're a student, a school, a mentor, or a sponsor —
            there's a way in.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Magnetic strength={0.25}>
              <ButtonLink href="/students" size="lg">
                I'm a Student
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <ButtonLink href="/schools" size="lg" variant="secondary">
                I represent a School
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <ButtonLink href="/mentors" size="lg" variant="outline">
                I want to volunteer
              </ButtonLink>
            </Magnetic>
          </div>
          <ul className="mt-12 mx-auto inline-flex flex-wrap gap-x-8 gap-y-3 justify-center text-sm text-[color:var(--color-fg-muted)]">
            {[
              "No business background required",
              "Works during class time",
              "Cash prizes for the top teams",
            ].map((bullet) => (
              <li key={bullet} className="inline-flex items-center gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-[color:var(--color-electric)]"
                  aria-hidden
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}

function BentoCard({
  href,
  title,
  eyebrow,
  body,
  image,
  icon: Icon,
  accent,
  className,
  featured,
}: {
  href: string;
  title: string;
  eyebrow: string;
  body: string;
  image: string;
  icon: typeof Users;
  accent: "spark" | "electric";
  className?: string;
  featured?: boolean;
}) {
  const accentText =
    accent === "spark"
      ? "text-[color:var(--color-spark)]"
      : "text-[color:var(--color-electric)]";
  const accentGlow =
    accent === "spark"
      ? "hover:shadow-[0_25px_80px_-20px_rgba(255,92,34,0.45)]"
      : "hover:shadow-[0_25px_80px_-20px_rgba(120,217,0,0.4)]";
  return (
    <Link
      href={href}
      data-cursor="cta"
      className={`group relative overflow-hidden rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] transition-all hover:-translate-y-1 hover:border-[color:var(--color-spark)]/40 ${accentGlow} ${className}`}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          sizes={featured ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
          className="object-cover opacity-40 transition-all duration-700 group-hover:opacity-55 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)] via-[color:var(--color-bg)]/70 to-[color:var(--color-bg)]/40" />
      </div>
      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--color-bg-elevated)]/80 backdrop-blur-md border border-[color:var(--color-border-strong)] text-[color:var(--color-fg)]">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className={`text-[10px] uppercase tracking-widest font-semibold ${accentText}`}>
            {eyebrow}
          </span>
        </div>
        <div className="mt-auto pt-16">
          <h3 className={`font-bold ${featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"}`}>
            {title}
          </h3>
          <p className="mt-2 text-sm text-[color:var(--color-fg-muted)] max-w-md">
            {body}
          </p>
          <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium ${accentText} group-hover:gap-2 transition-all`}>
            Explore
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
