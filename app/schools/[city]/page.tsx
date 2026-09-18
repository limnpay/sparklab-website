import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Users, CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { CITIES, getCity } from "@/lib/cities";
import { PROGRAM, SITE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";

type Params = Promise<{ city: string }>;

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return buildMetadata({
    title: `SparkLab in ${city.name}, Michigan`,
    description: `SparkLab brings an 8-week youth entrepreneurship program to high schools in ${city.name}, ${city.county}, Michigan. Real businesses, industry mentors, cash prizes.`,
    path: `/schools/${city.slug}`,
    keywords: [
      `${city.name} high school entrepreneurship`,
      `youth business program ${city.name}`,
      `${city.name} pitch competition`,
      `${city.county} schools`,
      `${city.name} Michigan student startup`,
      "SparkLab",
    ],
  });
}

export default async function CityPage({ params }: { params: Params }) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const otherCities = CITIES.filter((c) => c.slug !== city.slug).slice(0, 4);

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "For Schools", href: "/schools" },
          { name: city.name, href: `/schools/${city.slug}` },
        ]}
      />

      {/* City-scoped LocalBusiness so search engines connect SparkLab to this
          specific locality, not just the Birmingham HQ. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "EducationalOrganization"],
          "@id": `${SITE.url}/schools/${city.slug}#localbusiness`,
          name: `SparkLab — ${city.name}, Michigan`,
          parentOrganization: { "@id": `${SITE.url}/#organization` },
          url: `${SITE.url}/schools/${city.slug}`,
          image: `${SITE.url}${SITE.defaultOgImage}`,
          telephone: undefined,
          areaServed: {
            "@type": "City",
            name: city.name,
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: city.county,
              containedInPlace: { "@type": "State", name: "Michigan" },
            },
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: city.name,
            addressRegion: SITE.regionCode,
            addressCountry: SITE.countryCode,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: city.latitude,
            longitude: city.longitude,
          },
          knowsAbout: [
            `high school entrepreneurship ${city.name}`,
            `youth business program ${city.county}`,
            `pitch competition Michigan`,
          ],
        }}
      />

      <PageHero
        eyebrow={`${city.county} · ${city.tagline}`}
        title={
          <>
            SparkLab in{" "}
            <span className="text-gradient-spark">{city.name}, Michigan</span>
          </>
        }
        description={city.intro}
        imageSrc="/images/heroes/schools.jpg"
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ButtonLink href="/contact?interest=school" size="lg">
            Bring SparkLab to your {city.name} school
            <ArrowRight className="h-5 w-5" />
          </ButtonLink>
          <ButtonLink href="/program" size="lg" variant="outline">
            See the program
          </ButtonLink>
        </div>
      </PageHero>

      {/* CITY STATUS */}
      <Section ariaLabelledby="status-heading" className="!py-12">
        <div className="mx-auto max-w-3xl">
          <div className="card-elevated p-6 sm:p-8 flex items-start gap-4">
            <span
              className={
                city.status === "active"
                  ? "inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)]"
                  : "inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]"
              }
            >
              <MapPin className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 id="status-heading" className="font-bold">
                {city.status === "active"
                  ? `SparkLab is active in ${city.name}.`
                  : `SparkLab is expanding to ${city.name}.`}
              </h2>
              <p className="mt-1.5 text-sm text-[color:var(--color-fg-muted)]">
                {city.status === "active"
                  ? `We're already partnering with schools in the ${city.name} area. Reach out to the SparkLab team and we'll help bring the program to your class.`
                  : `We're actively building partnerships with schools in ${city.county}. Be among the first ${city.name} schools to bring SparkLab to your students.`}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* WHAT THIS LOOKS LIKE IN YOUR CITY */}
      <Section tone="card" ariaLabelledby="local-heading">
        <SectionHeader
          eyebrow={`What it looks like in ${city.name}`}
          title={
            <>
              The exact same program.{" "}
              <span className="text-gradient-electric">
                Tailored to {city.name}.
              </span>
            </>
          }
          description={`SparkLab runs the same proven 8-week curriculum in every partner school — adapted to fit ${city.name}'s school schedules, mentor pool, and pitch-night venue options.`}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Drop-in to existing schedule",
              body: `${PROGRAM.weeks} weeks of ${PROGRAM.weeklyHours}-hour modules that fit a standard ${city.name} high school class period.`,
            },
            {
              title: "Local Michigan mentors",
              body: `Pair students with working entrepreneurs and operators from ${city.name} and the broader Detroit metro.`,
            },
            {
              title: "Real cash prizes",
              body: `Top ${city.name}-area teams compete in our regional pitch competition for a $15,000 prize pool.`,
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <article className="card-elevated h-full p-6 bg-[color:var(--color-bg)]">
                <CheckCircle2
                  className="h-6 w-6 text-[color:var(--color-electric)]"
                  aria-hidden
                />
                <h3 className="mt-4 font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHO THIS IS FOR — RE-INDEXED FOR THE CITY */}
      <Section ariaLabelledby="who-heading">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="left">
            <p className="eyebrow">For {city.name}</p>
            <h2 id="who-heading" className="mt-4 text-3xl sm:text-4xl font-bold">
              Built for {city.name} students,{" "}
              <span className="text-gradient-spark">teachers, and families.</span>
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                {
                  k: "Students",
                  v: `High schoolers in ${city.name} who want to build something real and competitive.`,
                  href: "/students",
                },
                {
                  k: "Teachers & schools",
                  v: `${city.county} public, private, and charter schools looking for a turnkey entrepreneurship program.`,
                  href: "/schools",
                },
                {
                  k: "Mentors & judges",
                  v: `Operators, investors, and founders in the ${city.name} / Detroit metro area who want to give back.`,
                  href: "/mentors",
                },
              ].map((item) => (
                <li key={item.k} className="flex items-start gap-4">
                  <Users
                    className="mt-1 h-5 w-5 flex-shrink-0 text-[color:var(--color-spark)]"
                    aria-hidden
                  />
                  <div>
                    <Link
                      href={item.href}
                      className="font-bold hover:text-[color:var(--color-spark)] transition-colors"
                    >
                      {item.k}
                    </Link>
                    <p className="text-[color:var(--color-fg-muted)]">{item.v}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="right">
            <Image
              src="/images/heroes/schools-detail.jpg"
              alt={`A SparkLab session in a school similar to those in ${city.name}, Michigan`}
              width={1200}
              height={900}
              className="rounded-2xl shadow-2xl"
            />
          </Reveal>
        </div>
      </Section>

      {/* NEARBY CITIES — internal linking */}
      <Section tone="card" ariaLabelledby="nearby-heading">
        <SectionHeader
          eyebrow="Nearby"
          title="SparkLab also serves these areas."
          description={`If your school isn't in ${city.name} proper, we partner with surrounding ${city.county} districts and the broader Detroit metro.`}
        />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {otherCities.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/schools/${other.slug}`}
                className="block h-full rounded-xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] p-5 hover:border-[color:var(--color-spark)]/50 transition-colors"
              >
                <div className="text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)]">
                  {other.county}
                </div>
                <div className="mt-1 font-bold flex items-center gap-1.5">
                  {other.name}, MI
                  <ArrowRight className="h-3.5 w-3.5 text-[color:var(--color-spark)]" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <Section tone="elevated" ariaLabelledby="city-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="city-cta-heading" className="text-3xl sm:text-4xl font-bold">
            Ready to bring SparkLab to a {city.name} school?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            Tell us about your school — public, private, or charter — and
            we&apos;ll plan a timeline that fits your calendar. We typically
            respond within 2 business days.
          </p>
          <div className="mt-10">
            <ButtonLink href="/contact?interest=school" size="lg">
              Start the conversation
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
