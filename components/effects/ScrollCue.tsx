"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The little "scroll to explore" indicator that anchors the bottom of
 * the hero. Two-line label + an animated dot travelling inside a pill.
 */
export function ScrollCue({ label = "Scroll" }: { label?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex flex-col items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-fg-muted)]">
      <span>{label}</span>
      <div className="relative h-9 w-5 rounded-full border border-[color:var(--color-border-strong)] overflow-hidden">
        <motion.span
          aria-hidden
          className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[color:var(--color-spark)]"
          animate={reduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
