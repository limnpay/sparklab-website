import Image from "next/image";
import {
  ArrowRight,
  Trophy,
  Mic,
  Users,
  Target,
  Award,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { PRIZES, SITE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { AmbientOrbs } from "@/components/effects/AmbientOrbs";
import { Magnetic } from "@/components/effects/Magnetic";
import { PrizePodium } from "@/components/sections/PrizePodium";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: `Pitch Competition — ${PRIZES.totalPool} Prize Pool`,
  description: `SparkLab culminates in an in-person pitch competition. ${PRIZES.totalPool} prize pool split between the top three teams, distributed directly to winning students.`,
  path: "/competition",
  keywords: [
    "high school pitch competition Michigan",
    "student business competition",
    "youth entrepreneurship contest",
    "Michigan startup competition",
    "SparkLab competition winners",
  ],
});

type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const HOW = [
  {
    icon: Users,
    title: "Form your team",
    description:
      "Students form teams of 5 during their SparkLab program and choose a business idea to develop together.",
  },
  {
    icon: Target,
    title: "Develop your pitch",
    description:
      "Over 8 weeks, teams build a complete business plan, brand identity, financial projections, and pitch deck.",
  },
  {
    icon: Mic,
    title: "Present to judges",
    description:
      "Teams present their pitches in person to a panel of working entrepreneurs, investors, and operators.",
  },
  {
    icon: Trophy,
    title: "Compete for prizes",
    description: `The top three teams split a ${PRIZES.totalPool} prize pool — distributed directly to winning students.`,
  },
] satisfies Step[];

const CRITERIA = [
  {
    title: "Business viability",
    description:
      "Is this a real opportunity? Is there an addressable market? Does the unit economics make sense?",
  },
  {
    title: "Innovation & creativity",
    description:
      "What makes this idea original? Why now? What is the team's unfair advantage?",
  },
  {
    title: "Market understanding",
    description:
      "Does the team know their customer? Have they validated the problem and the willingness to pay?",
  },
  {
    title: "Presentation quality",
    description:
      "Is the pitch clear, confident, and compelling? Can they handle hard questions?",
  },
];

export default function CompetitionPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Competition", href: "/competition" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "SparkLab Pitch Competition",
          url: `${SITE.url}/competition`,
          description: `SparkLab's culminating pitch competition where high school student teams present their businesses to a panel of industry judges for a ${PRIZES.totalPool} prize pool.`,
          isPartOf: { "@id": `${SITE.url}/#website` },
          about: { "@id": `${SITE.url}/#organization` },
        }}
      />

      <PageHero
        eyebrow="The Competition"
        title={
          <>
            Pitch. Compete.{" "}
            <span className="text-gradient-spark">Win.</span>
          </>
        }
        description={`The grand finale of every program. Student teams pitch real businesses to a panel of working entrepreneurs and investors, competing for a ${PRIZES.totalPool} prize pool.`}
        imageSrc="/images/heroes/competition.jpg"
      >
        <ButtonLink href="/program">
          Learn how to qualify
          <ArrowRight className="h-4 w-4" />
        </ButtonLink>
      </PageHero>

      {/* PRIZES — animated podium */}
      <Section ariaLabelledby="prizes-heading" className="relative overflow-hidden">
        <AmbientOrbs
          orbs={[
            { color: "spark", size: 500, top: "20%", left: "45%", duration: 28, delay: 0, blur: 130 },
          ]}
          className="opacity-40"
        />
        <SectionHeader
          eyebrow="The prize pool"
          title={
            <>
              <span className="text-gradient-spark">{PRIZES.totalPool}</span>{" "}
              up for grabs.
            </>
          }
          description="Cash prizes are distributed directly to winning team members."
        />
        <div className="mt-16">
          <PrizePodium />
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section tone="card" ariaLabelledby="how-heading">
        <SectionHeader
          eyebrow="How it works"
          title={
            <>
              From classroom to{" "}
              <span className="text-gradient-electric">competition stage.</span>
            </>
          }
          description="The pitch competition is the culmination of an 8-week program. Teams that complete the program are eligible to compete."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <article className="card-elevated h-full p-6 relative bg-[color:var(--color-bg)]">
                <span className="absolute top-4 right-4 text-5xl font-bold text-[color:var(--color-spark)]/15">
                  {i + 1}
                </span>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                  <s.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
                  {s.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* JUDGING CRITERIA */}
      <Section ariaLabelledby="criteria-heading">
        <SectionHeader
          eyebrow="What judges look for"
          title="Judging criteria."
          description="Teams are evaluated on the same dimensions a real investor would weigh."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 max-w-4xl mx-auto">
          {CRITERIA.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="card-elevated p-6 hover:border-[color:var(--color-electric)]/40 transition-colors">
                <h3 className="font-bold flex items-center gap-2">
                  <CheckCircle2
                    className="h-5 w-5 text-[color:var(--color-electric)]"
                    aria-hidden
                  />
                  {c.title}
                </h3>
                <p className="mt-2 text-sm text-[color:var(--color-fg-muted)] pl-7">
                  {c.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 2025 WINNERS */}
      <Section tone="card" ariaLabelledby="winners-heading">
        <SectionHeader
          eyebrow="2025 winners"
          title={
            <>
              Meet our{" "}
              <span className="text-gradient-spark">winners.</span>
            </>
          }
          description="The 2025 SparkLab pitch competition. Three winning teams, all from our partner schools in Michigan."
        />

        <Reveal>
          <figure className="mt-14 max-w-5xl mx-auto">
            <Image
              src="/images/winners/group-on-stage.jpg"
              alt="The 2025 SparkLab winning teams on stage"
              width={1600}
              height={1066}
              className="w-full rounded-2xl shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm text-[color:var(--color-fg-subtle)]">
              Top three teams from the 2025 SparkLab pitch competition.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {[
            { place: PRIZES.first, src: "/images/winners/1st.jpg", accent: "spark" },
            { place: PRIZES.second, src: "/images/winners/2nd.jpg", accent: "electric" },
            { place: PRIZES.third, src: "/images/winners/3rd.jpg", accent: "muted" },
          ].map((w, i) => (
            <Reveal key={w.place.label} delay={i * 0.08}>
              <figure className="card-elevated overflow-hidden bg-[color:var(--color-bg)]">
                <div className="relative aspect-square">
                  <Image
                    src={w.src}
                    alt={`SparkLab 2025 ${w.place.label} team`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-5 text-center">
                  <div
                    className={
                      w.accent === "spark"
                        ? "text-[color:var(--color-spark)] text-sm font-semibold uppercase tracking-wider"
                        : w.accent === "electric"
                          ? "text-[color:var(--color-electric)] text-sm font-semibold uppercase tracking-wider"
                          : "text-[color:var(--color-fg-muted)] text-sm font-semibold uppercase tracking-wider"
                    }
                  >
                    {w.place.label}
                  </div>
                  <div className="mt-1 text-2xl font-bold">
                    {w.place.amount}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="elevated" ariaLabelledby="comp-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="comp-cta-heading" className="text-3xl sm:text-4xl font-bold">
            Want to compete?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            The pitch competition is open to teams who complete a SparkLab
            program at their school. If your school doesn&apos;t offer it yet,
            reach out and we&apos;ll help bring SparkLab there.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Magnetic strength={0.25}>
              <ButtonLink href="/students" size="lg">
                Join as a Student
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </Magnetic>
            <Magnetic strength={0.25}>
              <ButtonLink href="/mentors" size="lg" variant="outline">
                Judge the next competition
              </ButtonLink>
            </Magnetic>
          </div>
        </div>
      </Section>
    </>
  );
}
