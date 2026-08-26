import { ArrowRight, GraduationCap, School, Heart, Briefcase, Gift, type LucideIcon } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { FAQ_CATEGORIES } from "@/lib/faq";

export const metadata = buildMetadata({
  title: "FAQ — Common Questions about SparkLab",
  description:
    "Answers to common questions about SparkLab from students, parents, teachers, schools, mentors, judges, and donors. Time commitment, prizes, costs, giving, and how to get involved.",
  path: "/faq",
  keywords: [
    "SparkLab FAQ",
    "youth entrepreneurship program questions",
    "high school business program Michigan",
    "SparkLab cost",
    "pitch competition rules",
  ],
});

const ICONS: Record<string, LucideIcon> = {
  students: GraduationCap,
  schools: School,
  parents: Heart,
  mentors: Briefcase,
  giving: Gift,
};

export default function FaqPage() {
  // Flatten all Q&A for a single JSON-LD FAQPage block — gives every category
  // a shot at appearing as a rich result. (We render each accordion as a native
  // <details>/<summary> so crawlers and Cmd-F see everything on first paint —
  // unlike the original site which hid 75% of questions behind tabs.)
  const allFaqs = FAQ_CATEGORIES.flatMap((c) => c.items);

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <PageHero
        eyebrow="Frequently Asked Questions"
        title={
          <>
            Everything you{" "}
            <span className="text-gradient-spark">need to know.</span>
          </>
        }
        description="Don't see your question? Reach out — we read every message."
        imageSrc="/images/heroes/about.jpg"
      />

      {/* In-page nav (anchor links to each category, since all Q&A is on one page) */}
      <Section ariaLabelledby="categories-heading" className="!py-12">
        <h2 id="categories-heading" className="sr-only">
          FAQ categories
        </h2>
        <nav aria-label="FAQ categories" className="flex flex-wrap gap-3 justify-center">
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = ICONS[cat.id] ?? GraduationCap;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-card)] px-5 py-2.5 text-sm font-medium hover:border-[color:var(--color-spark)] hover:bg-[color:var(--color-spark)]/5 transition-colors"
              >
                <Icon className="h-4 w-4 text-[color:var(--color-spark)]" aria-hidden />
                {cat.title}
              </a>
            );
          })}
        </nav>
      </Section>

      {/* All categories rendered statically */}
      {FAQ_CATEGORIES.map((cat, catIdx) => {
        const Icon = ICONS[cat.id] ?? GraduationCap;
        return (
          <Section
            key={cat.id}
            id={cat.id}
            tone={catIdx % 2 === 0 ? "card" : "default"}
            ariaLabelledby={`${cat.id}-heading`}
          >
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div>
                  <h2
                    id={`${cat.id}-heading`}
                    className="text-2xl sm:text-3xl font-bold"
                  >
                    {cat.title}
                  </h2>
                  <p className="text-sm text-[color:var(--color-fg-muted)]">
                    {cat.description}
                  </p>
                </div>
              </div>

              <ul className="mt-10 space-y-3">
                {cat.items.map((item, i) => (
                  <li
                    key={item.q}
                    className="rounded-xl bg-[color:var(--color-bg)] border border-[color:var(--color-border)] hover:border-[color:var(--color-spark)]/30 transition-colors"
                  >
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4">
                        <span className="font-semibold pr-4">{item.q}</span>
                        <span
                          aria-hidden
                          className="flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--color-bg-card)] text-[color:var(--color-spark)] transition-transform group-open:rotate-45 text-xl leading-none"
                        >
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5 -mt-1 text-[color:var(--color-fg-muted)] text-[15px] leading-relaxed">
                        {item.a}
                      </div>
                    </details>
                    {/* Visually hidden answer so Cmd-F & screen readers still find the text
                        even when the accordion is collapsed. */}
                    <div className="sr-only">
                      Q: {item.q} A: {item.a}
                    </div>
                    {i < cat.items.length - 1 ? null : null}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        );
      })}

      {/* CTA */}
      <Section tone="elevated" ariaLabelledby="faq-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="faq-cta-heading" className="text-3xl sm:text-4xl font-bold">
            Still have questions?
          </h2>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            Reach out — we typically reply within 2 business days.
          </p>
          <div className="mt-10">
            <ButtonLink href="/contact" size="lg">
              Contact us
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
