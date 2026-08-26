import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Trophy } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { COHORTS } from "@/lib/cohorts";
import { PRIZES, SITE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Countdown } from "@/components/effects/Countdown";
import { AmbientOrbs } from "@/components/effects/AmbientOrbs";
import { Magnetic } from "@/components/effects/Magnetic";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Cohort Schedule — Past & Upcoming Pitch Competitions",
  description:
    "SparkLab cohort dates and pitch competition schedule. See past Michigan high school entrepreneurship competitions and upcoming dates to join.",
  path: "/cohorts",
  keywords: [
    "SparkLab cohort schedule",
    "Michigan pitch competition dates",
    "high school entrepreneurship competition Michigan",
    "youth pitch competition 2026",
    "upcoming entrepreneurship cohort",
  ],
});

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function daysUntil(iso: string) {
  const ms = new Date(iso + "T00:00:00").getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export default function CohortsPage() {
  const now = Date.now();
  const upcoming = COHORTS.filter((c) => c.status !== "completed").sort(
    (a, b) => a.startDate.localeCompare(b.startDate)
  );
  const past = COHORTS.filter((c) => c.status === "completed").sort(
    (a, b) => b.startDate.localeCompare(a.startDate)
  );
  // The featured "next cohort" callout uses the next *future* cohort so
  // the live countdown always ticks toward something real. Anything
  // with a past startDate falls through to the regular listing below.
  const nextCohort = upcoming.find(
    (c) => new Date(c.startDate).getTime() > now
  );
  const staticDaysUntil = nextCohort ? daysUntil(nextCohort.startDate) : null;

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Cohorts", href: "/cohorts" },
        ]}
      />

      {/* One Event schema per cohort — gives every pitch competition its own
          shot at appearing in Google's events panel + voice assistant queries. */}
      {COHORTS.map((cohort) => (
        <JsonLd
          key={cohort.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Event",
            "@id": `${SITE.url}/cohorts#${cohort.id}`,
            name: `${cohort.name} — SparkLab Pitch Competition`,
            description: cohort.description,
            startDate: cohort.startDate,
            endDate: cohort.pitchDate,
            eventStatus:
              cohort.status === "completed"
                ? "https://schema.org/EventScheduled"
                : "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: cohort.venue,
              address: {
                "@type": "PostalAddress",
                addressLocality: SITE.city,
                addressRegion: SITE.regionCode,
                addressCountry: SITE.countryCode,
              },
            },
            organizer: { "@id": `${SITE.url}/#organization` },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: `${SITE.url}/contact`,
              validFrom: "2025-01-01",
            },
            image: cohort.image
              ? `${SITE.url}${cohort.image}`
              : `${SITE.url}${SITE.defaultOgImage}`,
          }}
        />
      ))}

      <PageHero
        eyebrow="Cohort Schedule"
        title={
          <>
            When SparkLab{" "}
            <span className="text-gradient-electric">runs.</span>
          </>
        }
        description="Past competitions, current cohorts in progress, and upcoming dates to join. Schools interested in a specific cohort should reach out at least 60 days before the start date."
        imageSrc="/images/heroes/competition.jpg"
      />

      {/* COUNTDOWN to next cohort */}
      {nextCohort && staticDaysUntil !== null && staticDaysUntil > 0 ? (
        <Section
          ariaLabelledby="countdown-heading"
          className="!py-12 relative overflow-hidden"
        >
          <AmbientOrbs
            orbs={[
              { color: "spark", size: 480, top: "0%", left: "10%", duration: 26, delay: 0, blur: 120 },
              { color: "electric", size: 320, top: "20%", left: "70%", duration: 30, delay: 4, blur: 90 },
            ]}
            className="opacity-50"
          />
          <Reveal>
            <div className="relative mx-auto max-w-3xl rounded-3xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-card)]/60 backdrop-blur-2xl p-8 sm:p-12 text-center shadow-[0_25px_80px_-20px_rgba(0,0,0,0.5)]">
              <div
                aria-hidden
                className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[color:var(--color-electric)]/60 to-transparent"
              />
              <p className="eyebrow">Next cohort</p>
              <h2
                id="countdown-heading"
                className="mt-3 text-3xl sm:text-4xl font-bold"
              >
                {nextCohort.name} starts soon.
              </h2>
              <p className="mt-3 text-[color:var(--color-fg-muted)]">
                Week 1: {formatDate(nextCohort.startDate)} · Pitch competition:{" "}
                {formatDate(nextCohort.pitchDate)}
              </p>
              <div className="mt-8 flex justify-center">
                <Countdown targetIso={nextCohort.startDate} />
              </div>
              <div className="mt-10">
                <Magnetic strength={0.25}>
                  <ButtonLink href="/contact" size="lg">
                    Reserve your school's spot
                    <ArrowRight className="h-5 w-5" />
                  </ButtonLink>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </Section>
      ) : null}

      {/* UPCOMING */}
      {upcoming.length > 0 ? (
        <Section tone="card" ariaLabelledby="upcoming-heading">
          <SectionHeader
            eyebrow="Upcoming"
            title={
              <>
                Open{" "}
                <span className="text-gradient-spark">cohorts.</span>
              </>
            }
            description="These cohorts are accepting partner schools now. Reach out early — onboarding takes ~60 days."
            align="left"
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {upcoming.map((cohort, i) => (
              <Reveal key={cohort.id} delay={i * 0.06}>
                <li className="card-elevated h-full p-7 bg-[color:var(--color-bg)] flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-bold">{cohort.name}</h3>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)] px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                      Open
                    </span>
                  </div>
                  <p className="mt-3 text-[color:var(--color-fg-muted)] flex-1">
                    {cohort.description}
                  </p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <Row icon={Calendar} label="Cohort begins">
                      {formatDate(cohort.startDate)}
                    </Row>
                    <Row icon={Trophy} label="Pitch competition">
                      {formatDate(cohort.pitchDate)}
                    </Row>
                    <Row icon={MapPin} label="Venue">
                      {cohort.venue}
                    </Row>
                  </dl>
                  <div className="mt-7">
                    <ButtonLink href="/contact" variant="outline">
                      Join this cohort
                      <ArrowRight className="h-4 w-4" />
                    </ButtonLink>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* PAST */}
      {past.length > 0 ? (
        <Section ariaLabelledby="past-heading">
          <SectionHeader
            eyebrow="Past competitions"
            title="The record so far."
            description="Each completed cohort culminated in a live pitch competition. We're just getting started — and we publicly share the results here as we run more events."
            align="left"
          />
          <ul className="mt-12 space-y-6">
            {past.map((cohort, i) => (
              <Reveal key={cohort.id} delay={i * 0.06}>
                <li className="card-elevated grid lg:grid-cols-[2fr,1fr] gap-8 p-7 sm:p-10">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold">{cohort.name}</h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-border-strong)] text-[color:var(--color-fg-muted)] px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                        Completed
                      </span>
                    </div>
                    <p className="mt-3 text-[color:var(--color-fg-muted)]">
                      {cohort.description}
                    </p>
                    <dl className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      <Row icon={Calendar} label="Cohort">
                        {formatDate(cohort.startDate)} →{" "}
                        {formatDate(cohort.pitchDate)}
                      </Row>
                      <Row icon={MapPin} label="Venue">
                        {cohort.venue}
                      </Row>
                    </dl>
                    {cohort.winners ? (
                      <div className="mt-6 grid sm:grid-cols-3 gap-3">
                        <Prize
                          accent="spark"
                          place={PRIZES.first.label}
                          amount={PRIZES.first.amount}
                        />
                        <Prize
                          accent="electric"
                          place={PRIZES.second.label}
                          amount={PRIZES.second.amount}
                        />
                        <Prize
                          accent="muted"
                          place={PRIZES.third.label}
                          amount={PRIZES.third.amount}
                        />
                      </div>
                    ) : null}
                  </div>
                  {cohort.image ? (
                    <Image
                      src={cohort.image}
                      alt={`${cohort.name} winners on stage`}
                      width={1200}
                      height={900}
                      className="rounded-xl object-cover h-full max-h-72 w-full"
                    />
                  ) : null}
                </li>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* CTA */}
      <Section tone="elevated" ariaLabelledby="cohorts-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="cohorts-cta-heading"
            className="text-3xl sm:text-4xl font-bold"
          >
            Want your school in the next cohort?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            We work with public, private, and charter high schools across
            Michigan and the Midwest. Reach out 60+ days before a cohort start
            for the smoothest onboarding.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/contact" size="lg">
              Contact us
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/program" size="lg" variant="outline">
              See the program
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Calendar;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--color-electric)]"
        aria-hidden
      />
      <div>
        <dt className="inline text-[color:var(--color-fg-subtle)] uppercase text-[10px] tracking-wider mr-2">
          {label}
        </dt>
        <dd className="inline text-[color:var(--color-fg)] font-medium">
          {children}
        </dd>
      </div>
    </div>
  );
}

function Prize({
  place,
  amount,
  accent,
}: {
  place: string;
  amount: string;
  accent: "spark" | "electric" | "muted";
}) {
  const cls =
    accent === "spark"
      ? "border-[color:var(--color-spark)]/40 text-[color:var(--color-spark)]"
      : accent === "electric"
        ? "border-[color:var(--color-electric)]/40 text-[color:var(--color-electric)]"
        : "border-[color:var(--color-border-strong)] text-[color:var(--color-fg-muted)]";
  return (
    <div
      className={`rounded-lg border ${cls} bg-[color:var(--color-bg)] px-3 py-2.5`}
    >
      <div className="text-xs uppercase tracking-wider">{place}</div>
      <div className="text-base font-bold text-[color:var(--color-fg)]">
        {amount}
      </div>
    </div>
  );
}
