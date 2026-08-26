import { GraduationCap, Building2, Briefcase, Award } from "lucide-react";

/**
 * Placeholder "logo strip" rendered as branded badges instead of real PNGs.
 *
 * When real partner-school and sponsor logos are available, swap the
 * `<Badge>` children for `<Image src="/images/partners/foo.svg" />` and the
 * surrounding markup keeps working.
 *
 * Until then, the badges still serve their purpose: they signal that
 * SparkLab partners with multiple categories of organizations — schools,
 * sponsors, judges, and mentor companies — without inventing fake logos.
 */
export function TrustStrip({
  eyebrow = "Built in partnership with",
}: {
  eyebrow?: string;
}) {
  return (
    <section
      aria-label="SparkLab partners"
      className="border-y border-[color:var(--color-border)] bg-[color:var(--color-bg-card)]"
    >
      <div className="container-prose py-10">
        <p className="text-center text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)] font-semibold">
          {eyebrow}
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Badge icon={GraduationCap}>Michigan partner schools</Badge>
          <Badge icon={Building2}>Detroit metro businesses</Badge>
          <Badge icon={Briefcase}>Industry mentors</Badge>
          <Badge icon={Award}>Competition sponsors</Badge>
        </ul>
        <p className="mt-5 text-center text-xs text-[color:var(--color-fg-subtle)]">
          Real partner & sponsor logos coming soon. Want to be listed?{" "}
          <a
            href="/contact"
            className="text-[color:var(--color-spark)] hover:underline"
          >
            Get in touch.
          </a>
        </p>
      </div>
    </section>
  );
}

function Badge({
  icon: Icon,
  children,
}: {
  icon: typeof GraduationCap;
  children: React.ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] px-4 py-2 text-sm text-[color:var(--color-fg-muted)]">
      <Icon
        className="h-4 w-4 text-[color:var(--color-electric)]"
        aria-hidden
      />
      {children}
    </li>
  );
}
