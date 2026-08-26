import {
  ArrowRight,
  Building2,
  ExternalLink,
  Heart,
  School,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { GIVEBUTTER, PRIZES, SITE } from "@/lib/constants";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Donate — Fuel the Next Cohort",
  description:
    "Support SparkLab with an individual gift. Your donation helps fund student prizes, bring the program to more Michigan schools, and keep every cohort running.",
  path: "/donate",
  keywords: [
    "donate to SparkLab",
    "support youth entrepreneurship Michigan",
    "SparkLab donation",
    "high school entrepreneurship fund",
  ],
});

const IMPACT: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Trophy,
    title: "Student prizes",
    description: `The final pitch competition awards a ${PRIZES.totalPool} prize pool — paid directly to winning students. Gifts help keep that promise funded.`,
  },
  {
    icon: School,
    title: "More schools",
    description:
      "We're expanding partner schools across Michigan and the Midwest. Support helps us show up where students already are.",
  },
  {
    icon: Heart,
    title: "Every cohort",
    description:
      "Curriculum, facilitation, mentors, and the pitch night all have to run. Individual gifts help keep the program in motion.",
  },
];

function DonateCheckoutButton({
  size = "lg",
}: {
  size?: "md" | "lg";
}) {
  const href = GIVEBUTTER.campaignUrl || "/contact";
  const configured = Boolean(GIVEBUTTER.campaignUrl);

  return (
    <ButtonLink href={href} size={size}>
      {configured ? "Donate now" : "Contact us to give"}
      {configured ? (
        <ExternalLink className="h-5 w-5" />
      ) : (
        <ArrowRight className="h-5 w-5" />
      )}
    </ButtonLink>
  );
}

export default function DonatePage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Donate", href: "/donate" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Donate to SparkLab",
          url: `${SITE.url}/donate`,
          description:
            "Support SparkLab with an individual gift processed through Givebutter.",
          mainEntity: { "@id": `${SITE.url}/#organization` },
          potentialAction: {
            "@type": "DonateAction",
            target: GIVEBUTTER.campaignUrl || `${SITE.url}/contact`,
            recipient: { "@id": `${SITE.url}/#organization` },
          },
        }}
      />

      <PageHero
        eyebrow="Donate"
        title={
          <>
            Fuel the spark.{" "}
            <span className="text-gradient-spark">Fund the next cohort.</span>
          </>
        }
        description="Individual gifts go through Givebutter. Corporate sponsorships — prize-pool underwriting, brand partnership — still start with a conversation."
        imageSrc="/images/heroes/about.jpg"
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <DonateCheckoutButton />
          <ButtonLink href="/contact" size="lg" variant="outline">
            Corporate sponsorship
          </ButtonLink>
        </div>
      </PageHero>

      <Section ariaLabelledby="impact-heading">
        <SectionHeader
          eyebrow="Where gifts go"
          title={
            <>
              What your donation{" "}
              <span className="text-gradient-electric">helps run.</span>
            </>
          }
          description="SparkLab is an 8-week entrepreneurship program for high school students. Gifts support the work that makes each cohort possible."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {IMPACT.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="card-elevated h-full p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-fg-muted)]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="card" ariaLabelledby="how-heading">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <Reveal direction="left">
            <p className="eyebrow">Individual gifts</p>
            <h2 id="how-heading" className="mt-4 text-3xl sm:text-4xl font-bold">
              Checkout is on Givebutter.
            </h2>
            <div className="mt-6 space-y-5 text-lg text-[color:var(--color-fg-muted)]">
              <p>
                We use Givebutter so donations, receipts, and recurring gifts
                stay on a platform built for that — not on this site.
              </p>
              <p>
                Givebutter issues a receipt for every completed gift. If you
                need additional documentation, email{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-[color:var(--color-spark)] hover:underline"
                >
                  {SITE.email}
                </a>
                .
              </p>
            </div>
            <div className="mt-8">
              <DonateCheckoutButton size="md" />
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="card-elevated p-7 sm:p-8">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)]">
                <Building2 className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 text-xl font-bold">
                Want to sponsor as a company?
              </h3>
              <p className="mt-3 text-[color:var(--color-fg-muted)]">
                Brand partnership, prize-pool underwriting, and multi-cohort
                support are a different path. Tell us about your company and
                we'll follow up.
              </p>
              <div className="mt-6">
                <ButtonLink href="/contact" variant="outline">
                  Talk sponsorship
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
