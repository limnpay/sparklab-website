import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Tiny replacement for the `prose` plugin — styles arbitrary long-form
 * markup inside a typed container so we don't pull in @tailwindcss/typography.
 */
export function LongForm({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <article
      className={cn(
        "mx-auto max-w-3xl",
        // Headings
        "[&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[color:var(--color-fg)] [&_h2]:scroll-mt-24",
        "[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-[color:var(--color-fg)]",
        // Body
        "[&_p]:my-4 [&_p]:text-[color:var(--color-fg-muted)] [&_p]:leading-relaxed",
        "[&_strong]:text-[color:var(--color-fg)] [&_strong]:font-semibold",
        "[&_a]:text-[color:var(--color-spark)] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[color:var(--color-spark-strong)]",
        // Lists
        "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul_li]:my-1.5 [&_ul_li]:text-[color:var(--color-fg-muted)] [&_ul_li]:leading-relaxed",
        "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol_li]:my-1.5 [&_ol_li]:text-[color:var(--color-fg-muted)]",
        className
      )}
    >
      {children}
    </article>
  );
}
