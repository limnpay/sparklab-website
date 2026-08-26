import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AmbientOrbs } from "@/components/effects/AmbientOrbs";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { KineticText } from "@/components/effects/KineticText";

/**
 * Standard inner-page hero. Background photo (deeply overlaid) + ambient
 * gradient orbs + subtle grain + kinetic H1 reveal + optional glass
 * badge for the eyebrow. Every non-home page inherits this treatment so
 * the site has a consistent "futuristic" vibe from the moment you land.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "center",
  children,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: "center" | "top" | "bottom";
  children?: ReactNode;
  align?: "center" | "left";
}) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className="relative isolate overflow-hidden bg-[color:var(--color-bg-card)]"
    >
      {/* Photo layer */}
      <div className="absolute inset-0 -z-30">
        <Image
          src={imageSrc}
          alt={imageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          quality={75}
          className={cn(
            "object-cover opacity-25",
            imagePosition === "top" && "object-top",
            imagePosition === "bottom" && "object-bottom"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--color-bg-card)]/60 via-[color:var(--color-bg-card)]/85 to-[color:var(--color-bg-card)]" />
      </div>

      {/* Ambient orbs */}
      <AmbientOrbs
        className="-z-20 opacity-70"
        orbs={[
          { color: "spark", size: 460, top: "-10%", left: "-6%", duration: 24, delay: 0, blur: 100 },
          { color: "electric", size: 340, top: "50%", left: "78%", duration: 28, delay: 4, blur: 90 },
        ]}
      />

      {/* Grid + grain */}
      <div className="absolute inset-0 -z-10 grid-pattern opacity-30" />
      <NoiseOverlay opacity={0.04} className="-z-10" />

      <div className="container-prose py-24 sm:py-32 relative">
        <div
          className={cn(
            "max-w-4xl",
            align === "center" ? "mx-auto text-center" : ""
          )}
        >
          {/* Glass badge for the eyebrow */}
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-strong)] bg-[color:var(--color-bg-elevated)]/60 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]",
              "text-[color:var(--color-spark)]"
            )}
          >
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-spark)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-spark)]" />
            </span>
            {eyebrow}
          </div>

          <KineticText
            as="h1"
            delay={0.1}
            className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
          >
            {title as ReactNode}
          </KineticText>

          {description ? (
            <p className="mt-6 text-lg sm:text-xl text-[color:var(--color-fg-muted)] leading-relaxed">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
