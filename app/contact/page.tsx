import { Mail, Clock, MapPin, Linkedin } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { SITE, SOCIAL } from "@/lib/constants";
import { Section } from "@/components/ui/Section";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { BreadcrumbsJsonLd, JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: "Contact SparkLab — Get in Touch",
  description:
    "Contact SparkLab. Students, schools, mentors, and sponsors — reach out through the form or email outreach@sparklabusa.com. Based in Birmingham, Michigan.",
  path: "/contact",
  keywords: [
    "contact SparkLab",
    "youth entrepreneurship Michigan contact",
    "SparkLab Birmingham Michigan",
    "outreach@sparklabusa.com",
  ],
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact SparkLab",
          url: `${SITE.url}/contact`,
          mainEntity: { "@id": `${SITE.url}/#organization` },
        }}
      />

      <PageHero
        eyebrow="Get in Touch"
        title={
          <>
            Let's{" "}
            <span className="text-gradient-spark">talk.</span>
          </>
        }
        description="Whether you're a student looking to join, a school exploring partnership, a professional wanting to mentor, or a company interested in sponsoring — we'd love to hear from you."
        imageSrc="/images/heroes/about.jpg"
      />

      <Section ariaLabelledby="form-heading" className="!pt-12">
        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
          <div className="card-elevated p-7 sm:p-10">
            <h2 id="form-heading" className="text-2xl font-bold">
              Send us a message
            </h2>
            <p className="mt-2 text-[color:var(--color-fg-muted)]">
              Pick the role that fits you best and tell us a bit about your
              situation.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div className="card-elevated p-7">
              <h2 className="text-xl font-bold">Direct contact</h2>
              <ul className="mt-5 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <div className="font-medium">Email</div>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-spark)] transition-colors break-all"
                    >
                      {SITE.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)]">
                    <Clock className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <div className="font-medium">Response time</div>
                    <p className="text-[color:var(--color-fg-muted)]">
                      We typically reply within 2 business days.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-spark)]/15 text-[color:var(--color-spark)]">
                    <MapPin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <div className="font-medium">Based in</div>
                    <address className="not-italic text-[color:var(--color-fg-muted)]">
                      {SITE.city}, {SITE.region} {SITE.postalCode}
                      <br />
                      <span className="text-[color:var(--color-fg-subtle)]">
                        Serving Michigan & the Midwest
                      </span>
                    </address>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-electric)]/15 text-[color:var(--color-electric)]">
                    <Linkedin className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <a
                      href={SOCIAL.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-spark)] transition-colors"
                    >
                      @sparklabinfo
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[color:var(--color-spark)]/30 bg-[color:var(--color-spark)]/5 p-7">
              <h3 className="font-bold">Quick guide to your role</h3>
              <ul className="mt-4 space-y-3 text-sm text-[color:var(--color-fg-muted)]">
                <li>
                  <strong className="text-[color:var(--color-fg)]">Students:</strong>{" "}
                  pick "I'm a Student" and tell us about your school.
                </li>
                <li>
                  <strong className="text-[color:var(--color-fg)]">
                    Schools:
                  </strong>{" "}
                  pick "I represent a School" and share your school or district.
                </li>
                <li>
                  <strong className="text-[color:var(--color-fg)]">
                    Mentors / Judges:
                  </strong>{" "}
                  share your background and the role you'd like.
                </li>
                <li>
                  <strong className="text-[color:var(--color-fg)]">
                    Sponsors:
                  </strong>{" "}
                  tell us about your company and partnership interest.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
