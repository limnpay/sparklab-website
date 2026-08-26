import Link from "next/link";
import { Home, ArrowRight, Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";

export const metadata = {
  title: "Page Not Found",
  description:
    "The page you're looking for doesn't exist. Head back to the SparkLab homepage or jump to one of the main sections.",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: "/program", label: "The Program" },
  { href: "/students", label: "For Students" },
  { href: "/schools", label: "For Schools" },
  { href: "/competition", label: "Competition" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section
      aria-labelledby="nf-heading"
      className="relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 grid-pattern opacity-50" />
      <div className="absolute -top-32 -right-32 -z-10 h-96 w-96 rounded-full bg-[color:var(--color-spark)]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 -z-10 h-96 w-96 rounded-full bg-[color:var(--color-electric)]/15 blur-3xl" />

      <div className="container-prose py-24 sm:py-32 min-h-[calc(100vh-12rem)] flex items-center">
        <div className="mx-auto max-w-2xl text-center">
          <div
            aria-hidden
            className="mx-auto inline-flex items-center justify-center text-9xl sm:text-[12rem] font-bold leading-none tracking-tighter"
          >
            <span className="text-gradient-spark">4</span>
            <span className="text-gradient-electric mx-2">0</span>
            <span className="text-gradient-spark">4</span>
          </div>
          <h1
            id="nf-heading"
            className="mt-8 text-3xl sm:text-4xl font-bold"
          >
            That spark didn't catch.
          </h1>
          <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
            We can't find the page you're looking for. It may have moved, or
            the link could be off by a character. Try one of these instead.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <ButtonLink href="/" size="lg">
              <Home className="h-5 w-5" />
              Back to homepage
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline">
              <Compass className="h-5 w-5" />
              Tell us what you were looking for
            </ButtonLink>
          </div>

          <div className="mt-14">
            <p className="text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)] mb-4">
              Or jump to
            </p>
            <ul className="flex flex-wrap gap-2 justify-center">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-card)] px-4 py-2 text-sm hover:border-[color:var(--color-spark)] hover:text-[color:var(--color-spark)] transition-colors"
                  >
                    {l.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
