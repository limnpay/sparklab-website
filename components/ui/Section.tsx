import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "card" | "elevated";

const TONE_CLASSES: Record<Tone, string> = {
  default: "",
  card: "bg-[color:var(--color-bg-card)]",
  elevated: "bg-[color:var(--color-bg-elevated)]",
};

type SectionProps = {
  as?: ElementType;
  tone?: Tone;
  id?: string;
  ariaLabelledby?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

export function Section({
  as: Tag = "section",
  tone = "default",
  id,
  ariaLabelledby,
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("section", TONE_CLASSES[tone], className)}
    >
      <div className={cn("container-prose", innerClassName)}>{children}</div>
    </Tag>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-lg text-[color:var(--color-fg-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
