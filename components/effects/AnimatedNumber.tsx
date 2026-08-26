"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Counts from 0 to `value` when scrolled into view. Preserves leading
 * characters (e.g. "$"), trailing characters (e.g. "+", "K", "%"), and
 * thousands separators. If the input isn't numeric it renders as-is.
 */
export function AnimatedNumber({
  value,
  duration = 1.6,
  className,
  once = true,
}: {
  /** The final formatted value to reach, e.g. "$15,000" or "150+" or "42". */
  value: string;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const parsed = parseNumeric(value);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -80px 0px" });
  const reduce = useReducedMotion();

  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (latest) =>
    formatWith(latest, parsed.prefix, parsed.suffix, parsed.hasCommas)
  );

  useEffect(() => {
    if (!isInView || parsed.numeric == null) return;
    if (reduce) {
      mv.set(parsed.numeric);
      return;
    }
    const controls = animate(mv, parsed.numeric, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [isInView, parsed.numeric, mv, duration, reduce]);

  if (parsed.numeric == null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={cn(className)} aria-label={value}>
      <motion.span aria-hidden>{rounded}</motion.span>
    </span>
  );
}

type Parsed = {
  numeric: number | null;
  prefix: string;
  suffix: string;
  hasCommas: boolean;
};

function parseNumeric(v: string): Parsed {
  const match = /^([^\d]*)([\d.,]+)([^\d]*)$/.exec(v.trim());
  if (!match) return { numeric: null, prefix: "", suffix: "", hasCommas: false };
  const [, prefix, rawNum, suffix] = match;
  const hasCommas = rawNum.includes(",");
  const clean = rawNum.replace(/,/g, "");
  const numeric = Number(clean);
  if (!isFinite(numeric)) {
    return { numeric: null, prefix: "", suffix: "", hasCommas: false };
  }
  return { numeric, prefix, suffix, hasCommas };
}

function formatWith(
  n: number,
  prefix: string,
  suffix: string,
  hasCommas: boolean
) {
  const isInt = Math.floor(n) === n;
  const rounded = Math.round(n);
  const body = hasCommas
    ? rounded.toLocaleString("en-US")
    : isInt
      ? String(rounded)
      : n.toFixed(1);
  return `${prefix}${body}${suffix}`;
}
