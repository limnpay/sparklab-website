"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Orb = {
  color: "spark" | "electric" | "teal";
  size: number;
  top: string;
  left: string;
  duration: number;
  delay: number;
  blur: number;
};

const COLORS = {
  spark: "rgba(255, 92, 34, 0.28)",
  electric: "rgba(120, 217, 0, 0.22)",
  teal: "rgba(0, 180, 200, 0.20)",
};

const DEFAULT_ORBS: Orb[] = [
  { color: "spark", size: 520, top: "-8%", left: "-6%", duration: 22, delay: 0, blur: 100 },
  { color: "electric", size: 380, top: "60%", left: "70%", duration: 26, delay: 3, blur: 80 },
  { color: "teal", size: 300, top: "40%", left: "20%", duration: 30, delay: 6, blur: 90 },
];

/**
 * Slowly drifting gradient orbs used behind hero content for depth +
 * that "generative gradient" feeling every futuristic 2026 site has.
 *
 * Purely decorative, hidden from screen readers, disabled by
 * prefers-reduced-motion. Positioned absolutely so callers put it
 * inside a `relative` container.
 */
export function AmbientOrbs({
  orbs = DEFAULT_ORBS,
  className,
}: {
  orbs?: Orb[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle at 30% 30%, ${COLORS[orb.color]}, transparent 60%)`,
            filter: `blur(${orb.blur}px)`,
            willChange: "transform",
          }}
          animate={
            reduce
              ? undefined
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -30, 40, 0],
                  scale: [1, 1.08, 0.95, 1],
                }
          }
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
