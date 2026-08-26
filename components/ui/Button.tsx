import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "md" | "lg";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-[color:var(--color-spark)] text-white hover:bg-[color:var(--color-spark-strong)] shadow-[0_8px_24px_-12px_rgba(255,92,34,0.65)]",
  secondary:
    "bg-[color:var(--color-bg-elevated)] text-[color:var(--color-fg)] hover:bg-white/5 border border-[color:var(--color-border-strong)]",
  outline:
    "bg-transparent text-[color:var(--color-fg)] border border-[color:var(--color-border-strong)] hover:bg-white/5",
  ghost:
    "bg-transparent text-[color:var(--color-fg)] hover:bg-white/5",
};

const SIZE: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type LinkProps = Common & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;

type ButtonProps = Common & ComponentPropsWithoutRef<"button">;

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed";

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(baseClass, VARIANT[variant], SIZE[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClass, VARIANT[variant], SIZE[size], className)}
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(baseClass, VARIANT[variant], SIZE[size], className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
