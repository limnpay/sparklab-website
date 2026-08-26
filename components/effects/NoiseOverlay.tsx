import { cn } from "@/lib/cn";

/**
 * Subtle SVG grain overlay — the trick every high-craft 2026 site uses
 * to make gradients look like photographic surfaces instead of Figma
 * exports. Fixed opacity, GPU-friendly, one SVG data URL (no HTTP
 * request), no JS.
 *
 * Callers put this as the topmost sibling inside a `relative` section.
 */
export function NoiseOverlay({
  className,
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
  const dataUrl = `data:image/svg+xml;utf8,${svg.replace(/#/g, "%23")}`;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 mix-blend-overlay", className)}
      style={{
        opacity,
        backgroundImage: `url("${dataUrl}")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
