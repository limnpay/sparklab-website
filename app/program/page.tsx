import {
  ArrowRight,
  Video,
  FileText,
  BookOpen,
  CheckCircle2,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { COHORT, GUEST_SPEAKERS, PROGRAM, PROGRAM_ARC, SITE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "The Program — 8 Weeks, 40+ Masterclass Videos",
  description: `SparkLab's 8-week entrepreneurship curriculum: ${PROGRAM.videoModulesLabel} masterclass videos, a structured LMS, four immersive days, teacher facilitation guides, and a home-school pitch before the ${COHORT.finalsDate} county finals.`,
  path: "/program",
  keywords: [
    "entrepreneurship curriculum high school",
    "8 week business program",
    "masterclass video curriculum",
    "CTE entrepreneurship Michigan",
    "high school business class",
  ],
});

type Deliverable = {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets: string[];
};

const DELIVERABLES: Deliverable[] = [
  {
    icon: Video,
    title: "Masterclass video series",
    description: `${PROGRAM.videoModulesLabel} masterclass videos from industry experts and professionals, plus bonus sessions students can watch alongside the weekly work.`,
    bullets: [
      "Expert-led instruction",
      "Real-world case studies",
      "Week-by-week guidance in the LMS",
      "Designed for in-class viewing",
    ],
  },
  {
    icon: FileText,
    title: "Student workbooks & printables",
    description:
      "A workbook coordinated to every video module — exercises, business templates, financial worksheets, and progress trackers.",
    bullets: [
      "Coordinated with video content",
      "Hands-on activities",
      "Business templates",
      "Progress tracking",
    ],
  },
  {
    icon: BookOpen,
    title: "Teacher facilitation guides",
    description:
      "Everything a facilitating teacher needs to run a session — discussion prompts, activity instructions, and assessment rubrics.",
    bullets: [
      "Standards-aligned content",
      "Cross-curricular connections",
      "Teacher facilitation guides",
      "Assessment rubrics",
    ],
  },
];

const SKILLS = [
  { skill: "Critical thinking", description: "Analyze problems and design creative solutions." },
  { skill: "Public speaking", description: "Present ideas confidently to any audience." },
  { skill: "Teamwork", description: "Collaborate across roles, the way real companies do." },
  { skill: "Financial literacy", description: "Understand money, budgets, and unit economics." },
  { skill: "Marketing", description: "Reach customers and tell a brand story." },
  { skill: "Leadership", description: "Take initiative and rally a team behind a vision." },
  { skill: "Problem solving", description: "Navigate ambiguity with resilience." },
  { skill: "Communication", description: "Write and speak with clarity and intent." },
];

export default function ProgramPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "The Program", href: "/program" },
        ]}
      />

      {/* schema.org Course structured data — this is the page that should win
          "entrepreneurship program for high school students" type queries */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "SparkLab Youth Entrepreneurship Program",
          description: `SparkLab's 8-week entrepreneurship program for high school students. ${PROGRAM.videoModulesLabel} masterclass videos, a structured LMS, ${PROGRAM.immersiveDays} immersive days, and a pitch at school before the county finals.`,
          provider: {
            "@id": `${SITE.url}/#organization`,
          },
          url: `${SITE.url}/program`,
          inLanguage: "en-US",
          educationalLevel: "high school",
          teaches: [
            "Entrepreneurship",
            "Marketing",
            "Financial literacy",
            "Public speaking",
            "Teamwork",
            "Brand strategy",
          ],
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "Blended",
            courseWorkload: `PT${PROGRAM.weeks * 3}H`,
            location: {
              "@type": "Place",
              name: "Partner high schools across Michigan and the Midwest",
              address: {
                "@type": "PostalAddress",
                addressRegion: SITE.regionCode,
                addressCountry: SITE.countryCode,
              },
            },
          },
        }}
      />

      <PageHero
        eyebrow="The Program"
        title={
          <>
            Learn from the{" "}
            <span className="text-gradient-electric">best.</span>
          </>
        }
        description={`Eight weeks, ${PROGRAM.videoModulesLabel} masterclass videos, a structured LMS, and ${PROGRAM.immersiveDays} immersive days. Week 8 is the pitch at your home school. ${COHORT.finalistTeams} teams then advance to the ${COHORT.finalsName} on ${COHORT.finalsDate}.`}
        imageSrc="/images/heroes/program.jpg"
      />

      {/* WHAT WE DELIVER */}
      <Section ariaLabelledby="deliver-heading">
        <SectionHeader
          eyebrow="What we deliver"
          title={
            <>
              Everything a school needs.{" "}
              <span className="text-gradient-spark">Drop-in ready.</span>
            </>
          }
          description="Three core deliverables, designed to coordinate with each other. Your teachers facilitate, our materials do the heavy lifting."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {DELIVERABLES.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <article className="card-elevated h-full p-8">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)]">
                  <d.icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="mt-5 text-xl font-bold">{d.title}</h3>
                <p className="mt-3 text-[color:var(--color-fg-muted)]">
                  {d.description}
                </p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {d.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[color:var(--color-fg-muted)]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-electric)]"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8 WEEK TIMELINE */}
      <Section tone="card" ariaLabelledby="weeks-heading">
        <SectionHeader
          eyebrow="The 8-week journey"
          title={
            <>
              Idea to pitch in{" "}
              <span className="text-gradient-electric">{PROGRAM.weeks} weeks.</span>
            </>
          }
          description="Eight weeks, from a first idea to a pitch at school. The lessons stay with the class. This is the shape of the journey."
        />
        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROGRAM_ARC.map((step, i) => (
            <li key={step.label}>
              <Reveal delay={i * 0.06}>
                <article className="card-elevated h-full p-6 bg-[color:var(--color-bg)]">
                  <div className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-electric)]">
                    {step.label}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-[color:var(--color-fg-muted)]">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* GUEST SPEAKERS */}
      <Section ariaLabelledby="speaker-heading">
        <SectionHeader
          eyebrow="Guest speakers"
          title={
            <>
              People who&apos;ve{" "}
              <span className="text-gradient-spark">been in the room.</span>
            </>
          }
          description="Each SparkLab event brings in someone who has built something of their own."
        />
        <ul className="mt-12 mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {GUEST_SPEAKERS.map((speaker) => (
            <li key={speaker.name}>
              <article className="card-elevated h-full p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-electric)]">
                  {speaker.year}
                </p>
                <h3 className="mt-3 text-2xl font-bold">{speaker.name}</h3>
                <p className="mt-1 text-sm font-medium text-[color:var(--color-fg-muted)]">
                  {speaker.role}
                </p>
                <p className="mt-3 text-[color:var(--color-fg-muted)]">
                  {speaker.bio}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      {/* FEEDBACK LOOP */}
      <Section ariaLabelledby="feedback-heading">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal direction="left">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)]">
              <MessageSquare className="h-7 w-7" aria-hidden />
            </div>
            <h2
              id="feedback-heading"
              className="mt-5 text-3xl sm:text-4xl font-bold"
            >
              Continuous improvement, every program.
            </h2>
            <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
              We get better every year. The curriculum evolves based on
              direct input from the educators and students who use it.
            </p>
            <ul className="mt-8 space-y-3 text-[color:var(--color-fg)]">
              {[
                "Regular feedback collection from teachers and students",
                "Content updates based on educator insights",
                "Continuous enhancement of teaching methods",
                "Responsive to changing industry needs",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--color-electric)]"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="right">
            <div className="card-elevated p-8">
              <h3 className="text-xl font-bold text-center">How it works</h3>
              <ol className="mt-6 space-y-5">
                {[
                  {
                    title: "Deliver",
                    description:
                      "Teachers facilitate the program using our materials.",
                  },
                  {
                    title: "Collect",
                    description:
                      "We gather feedback from educators and students.",
                  },
                  {
                    title: "Analyze",
                    description:
                      "Our team reviews insights and identifies improvements.",
                  },
                  {
                    title: "Enhance",
                    description:
                      "We update content and teaching approaches.",
                  },
                ].map((step, i) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)] font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-bold">{step.title}</h4>
                      <p className="text-sm text-[color:var(--color-fg-muted)]">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SKILLS */}
      <Section tone="card" ariaLabelledby="skills-heading">
        <SectionHeader
          eyebrow="Skills students develop"
          title={
            <>
              More than{" "}
              <span className="text-gradient-spark">business.</span>
            </>
          }
          description="The skills students build during SparkLab carry into any career — and into the rest of high school."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((s, i) => (
            <Reveal key={s.skill} delay={i * 0.04}>
              <div className="card-elevated h-full p-5 hover:border-[color:var(--color-spark)]/40 transition-colors">
                <h3 className="font-bold">{s.skill}</h3>
                <p className="mt-1.5 text-sm text-[color:var(--color-fg-muted)]">
                  {s.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="elevated" ariaLabelledby="program-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="program-cta-heading"
            className="text-3xl sm:text-4xl font-bold"
          >
            Ready to put SparkLab in front of students?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            Whether you're a student ready to apply or a school evaluating
            fit, we'll walk you through next steps.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/students" size="lg">
              Apply as a Student
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/schools" size="lg" variant="secondary">
              Bring it to my School
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
