"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Tiny wrapper around Framer Motion's `whileInView` pattern that respects
 * `prefers-reduced-motion`. The original codebase repeated this incantation
 * dozens of times — centralizing it keeps pages tight.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const reduce = useReducedMotion();
  const offset = reduce ? OFFSETS.none : OFFSETS[direction];

  const MotionTag =
    as === "div" ? motion.div : as === "span" ? motion.span : motion.li;

  return (
    <MotionTag
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
