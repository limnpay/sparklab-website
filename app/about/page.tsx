import Image from "next/image";
import { ArrowRight, Target, Heart, Zap, Users } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { COHORT, SITE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "About SparkLab — A SIGU × KMI Initiative",
  description:
    "SparkLab is a collaborative initiative between SIGU and KMI, built to spark purpose, curiosity, and confidence in high school students across Michigan and the Midwest.",
  path: "/about",
  keywords: [
    "about SparkLab",
    "SIGU KMI",
    "youth entrepreneurship Michigan",
    "SparkLab mission",
    "Birmingham Michigan education",
  ],
});

const PILLARS = [
  {
    icon: Target,
    title: "Bridge the gap",
    description:
      "Connect potential with progress by investing in students, ideas, and communities.",
  },
  {
    icon: Zap,
    title: "Spark potential",
    description:
      "Help students uncover talents and passions they may not have explored yet.",
  },
  {
    icon: Heart,
    title: "Drive impact",
    description:
      "Strategic, scalable, purpose-driven programming that meets schools where they are.",
  },
  {
    icon: Users,
    title: "Build community",
    description:
      "Connect students with mentors, professionals, and peers who share their ambition.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <PageHero
        eyebrow="About SparkLab"
        title={
          <>
            Igniting the{" "}
            <span className="text-gradient-electric">
              entrepreneurial spirit.
            </span>
          </>
        }
        description="SparkLab is our way of paying it forward to the students who remind us of ourselves — once sitting in classroom chairs, full of potential, looking for what comes next."
        imageSrc="/images/heroes/about.jpg"
      />

      {/* WHAT IS SPARKLAB */}
      <Section ariaLabelledby="what-heading">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left">
            <p className="eyebrow">What is SparkLab</p>
            <h2 id="what-heading" className="mt-4 text-3xl sm:text-4xl font-bold">
              A startup accelerator, designed for high schoolers.
            </h2>
            <div className="mt-6 space-y-5 text-lg text-[color:var(--color-fg-muted)]">
              <p>
                SparkLab is an immersive 8-week program developed by SIGU and
                KMI, designed to ignite the entrepreneurial spirit in high
                school students. We complement traditional education by
                offering hands-on experience in business, strategy, and
                innovation.
              </p>
              <p>
                Unlike regular classes where students read about business
                concepts, SparkLab puts them in the driver's seat. Teams of
                five create a real business idea, develop marketing materials,
                build financial projections, and pitch to actual industry
                professionals.
              </p>
              <p>
                Think of it as a startup accelerator for high schoolers —
                with the support, structure, and guidance to help them
                succeed.
              </p>
            </div>
          </Reveal>
          <Reveal direction="right">
            <Image
              src="/images/heroes/about-detail.jpg"
              alt="A SparkLab mentor working with students during a hands-on session"
              width={1200}
              height={900}
              className="rounded-2xl shadow-2xl"
            />
          </Reveal>
        </div>
      </Section>

      {/* MISSION */}
      <Section tone="card" ariaLabelledby="mission-heading">
        <SectionHeader
          eyebrow="Our Mission"
          title={
            <>
              Empower the next generation of{" "}
              <span className="text-gradient-spark">
                confident leaders and bold changemakers.
              </span>
            </>
          }
          description="Through education, access, and opportunity — meeting students where they are and helping them build what comes next."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="card-elevated h-full p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                  <p.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <blockquote className="mt-16 mx-auto max-w-3xl text-center">
            <div className="mx-auto h-1 w-12 bg-[color:var(--color-electric)]" />
            <p className="mt-7 text-2xl md:text-3xl font-bold italic text-balance">
              We believe philanthropy should be strategic, scalable, and
              purpose-driven. That meaningful impact begins with exposure,
              curiosity, and belief.
            </p>
            <div className="mt-7 mx-auto h-1 w-12 bg-[color:var(--color-electric)]" />
          </blockquote>
        </Reveal>
      </Section>

      {/* WHO WE ARE */}
      <Section ariaLabelledby="who-heading">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="eyebrow">Who We Are</p>
            <h2 id="who-heading" className="mt-4 text-3xl sm:text-4xl font-bold">
              A collaborative initiative by{" "}
              <span className="text-gradient-spark">SIGU</span> and{" "}
              <span className="text-gradient-electric">KMI</span>.
            </h2>
            <div className="mt-6 space-y-5 text-lg text-[color:var(--color-fg-muted)]">
              <p>
                SparkLab is a collaborative initiative between SIGU and KMI,
                created to ignite purpose, curiosity, and confidence in the
                next generation of students. We are founders, investors,
                operators, and mentors coming together to create a program
                inspired by the opportunities that shaped our own journeys.
              </p>
              <p>
                We believe real-world exposure drives real-world impact. We're
                not just teaching — we're investing in each student's
                discovery process, helping them connect with what excites them
                and what they're capable of achieving.
              </p>
            </div>
            <blockquote className="mt-10 pl-6 border-l-4 border-[color:var(--color-electric)]">
              <p className="text-xl md:text-2xl font-bold italic text-balance">
                We're here to spark more than ideas. We're here to spark
                potential that lasts a lifetime.
              </p>
            </blockquote>
            <p className="mt-8 text-lg text-[color:var(--color-fg-muted)]">
              At our core, SparkLab is a bridge between experience and
              opportunity — built to spark something real, based in {SITE.city},{" "}
              {SITE.region}, and serving schools across the Midwest.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="card" ariaLabelledby="about-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="about-cta-heading"
            className="text-3xl sm:text-4xl font-bold"
          >
            Want to bring SparkLab to your school or community?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            {COHORT.label} kicked off {COHORT.kickoff} at nine high schools
            across Macomb County. We&apos;re still expanding across Michigan
            and the Midwest. Start the conversation — we read every message.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/program">
              See the Program
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Get in Touch
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
