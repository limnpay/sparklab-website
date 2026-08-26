import Link from "next/link";
import Image from "next/image";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { SITE, SOCIAL } from "@/lib/constants";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const PROGRAM_LINKS = [
  { href: "/about", label: "About SparkLab" },
  { href: "/program", label: "The Program" },
  { href: "/competition", label: "Competition" },
  { href: "/cohorts", label: "Cohort Schedule" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

const INVOLVE_LINKS = [
  { href: "/students", label: "For Students" },
  { href: "/schools", label: "For Schools" },
  { href: "/mentors", label: "For Mentors & Judges" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-[color:var(--color-bg-card)] border-t border-[color:var(--color-border)] mt-16">
      {/* Newsletter band */}
      <div className="border-b border-[color:var(--color-border)]">
        <div className="container-prose py-14">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Stay in the loop
            </h2>
            <p className="mt-3 text-[color:var(--color-fg-muted)]">
              Cohort dates, competition highlights, and ways to get involved —
              roughly once a month, never spammy.
            </p>
            <div className="mt-6">
              <NewsletterForm source="footer" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-prose py-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/sparklab-logo.png"
                alt="SparkLab"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-[color:var(--color-fg-muted)]">
              An immersive 8-week entrepreneurship program for high school
              students. Based in {SITE.city}, {SITE.region}; partnering with
              schools across the Midwest.
            </p>
            <p className="mt-4 text-sm font-medium text-[color:var(--color-spark)]">
              Fuel the Spark. Find Your Light.
            </p>
            <p className="mt-6 pt-6 border-t border-[color:var(--color-border)] text-xs text-[color:var(--color-fg-subtle)]">
              A collaborative initiative between SIGU and KMI.
            </p>
          </div>

          <FooterColumn title="Program" links={PROGRAM_LINKS} />
          <FooterColumn title="Get Involved" links={INVOLVE_LINKS} />

          <div>
            <h3 className="font-semibold text-[color:var(--color-fg)] mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-spark)] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[color:var(--color-fg-muted)]">
                <MapPin className="h-4 w-4 mt-0.5" />
                <address className="not-italic">
                  {SITE.city}, {SITE.region} {SITE.postalCode}
                  <br />
                  <span className="text-[color:var(--color-fg-subtle)]">
                    Serving schools across {SITE.primaryRegion} and the Midwest
                  </span>
                </address>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-fg-muted)] mb-3">
                Follow
              </h4>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SparkLab on LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--color-bg-elevated)] text-[color:var(--color-fg-muted)] hover:bg-[color:var(--color-spark)] hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-border)]">
        <div className="container-prose py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[color:var(--color-fg-subtle)]">
            <p>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-[color:var(--color-spark)] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-[color:var(--color-spark)] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h3 className="font-semibold text-[color:var(--color-fg)] mb-4">
        {title}
      </h3>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[color:var(--color-fg-muted)] hover:text-[color:var(--color-spark)] transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
