import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PARTNER_SCHOOLS } from "@/lib/schools";

export function SchoolRoster({ showTeams = false }: { showTeams?: boolean }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {PARTNER_SCHOOLS.map((school) => (
        <li key={school.name}>
          <Link
            href={`/schools/${school.citySlug}`}
            className="flex h-full flex-col rounded-2xl border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg)] p-5 transition-colors hover:border-[color:var(--color-spark)]/50 hover:bg-[color:var(--color-spark)]/5 group"
          >
            <span className="text-xs uppercase tracking-wider text-[color:var(--color-fg-muted)]">
              {school.district}
            </span>
            <span className="mt-2 font-bold text-lg leading-snug">
              {school.name}
            </span>
            <span className="mt-1 text-sm text-[color:var(--color-fg-muted)]">
              {school.city}, MI
              {showTeams
                ? ` · ${school.finalistTeams} ${school.finalistTeams === 1 ? "team" : "teams"} to finals`
                : ""}
            </span>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-spark)] group-hover:gap-1.5 transition-all">
              {school.city}
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
