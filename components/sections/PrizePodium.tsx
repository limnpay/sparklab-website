"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Trophy, Medal, Award } from "lucide-react";
import { PRIZES } from "@/lib/constants";
import { AnimatedNumber } from "@/components/effects/AnimatedNumber";

/**
 * Podium-style prize visualization. Three columns rise into position on
 * scroll, with the 1st place block in the center + tallest. Each block
 * counts up its dollar amount as it rises.
 *
 * Client component because it uses IntersectionObserver + Framer Motion.
 */
export function PrizePodium() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" });
  const reduce = useReducedMotion();

  const columns = [
    {
      key: "second",
      place: PRIZES.second.label,
      amount: PRIZES.second.amount,
      icon: Medal,
      height: "h-40 sm:h-48",
      barHeight: reduce ? "auto" : 160,
      order: "order-1",
      accent: "electric" as const,
      delay: 0.15,
    },
    {
      key: "first",
      place: PRIZES.first.label,
      amount: PRIZES.first.amount,
      icon: Trophy,
      height: "h-52 sm:h-64",
      barHeight: reduce ? "auto" : 220,
      order: "order-2",
      accent: "spark" as const,
      delay: 0,
    },
    {
      key: "third",
      place: PRIZES.third.label,
      amount: PRIZES.third.amount,
      icon: Award,
      height: "h-32 sm:h-40",
      barHeight: reduce ? "auto" : 120,
      order: "order-3",
      accent: "muted" as const,
      delay: 0.3,
    },
  ];

  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end">
        {columns.map((col) => {
          const Icon = col.icon;
          const accentGlow =
            col.accent === "spark"
              ? "shadow-[0_-30px_120px_-20px_rgba(255,92,34,0.6)] border-[color:var(--color-spark)]/60"
              : col.accent === "electric"
                ? "shadow-[0_-24px_100px_-30px_rgba(120,217,0,0.55)] border-[color:var(--color-electric)]/50"
                : "shadow-[0_-20px_80px_-30px_rgba(255,255,255,0.15)] border-[color:var(--color-border-strong)]";
          const accentText =
            col.accent === "spark"
              ? "text-[color:var(--color-spark)]"
              : col.accent === "electric"
                ? "text-[color:var(--color-electric)]"
                : "text-[color:var(--color-fg-muted)]";
          const accentBg =
            col.accent === "spark"
              ? "bg-[color:var(--color-spark)]"
              : col.accent === "electric"
                ? "bg-[color:var(--color-electric)]"
                : "bg-[color:var(--color-fg-muted)]";
          const accentIconBg =
            col.accent === "spark"
              ? "bg-[color:var(--color-spark)]/20 text-[color:var(--color-spark)]"
              : col.accent === "electric"
                ? "bg-[color:var(--color-electric)]/20 text-[color:var(--color-electric)]"
                : "bg-[color:var(--color-border-strong)] text-[color:var(--color-fg-muted)]";
          return (
            <div key={col.key} className={`flex flex-col items-center ${col.order}`}>
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: col.delay + 0.35 }}
                className={`inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl mb-4 ${accentIconBg}`}
              >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
              </motion.div>

              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: col.delay + 0.15 }}
                className={`text-3xl sm:text-4xl font-bold ${accentText} mb-3 tabular-nums`}
              >
                <AnimatedNumber value={col.amount} />
              </motion.div>

              <motion.div
                initial={reduce ? { height: "auto" } : { height: 0 }}
                animate={isInView ? { height: col.barHeight } : {}}
                transition={{
                  duration: 0.9,
                  delay: col.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative w-full rounded-t-2xl border-t border-x bg-gradient-to-b from-[color:var(--color-bg-card)] to-[color:var(--color-bg-elevated)] ${accentGlow} overflow-hidden`}
                style={{ minHeight: reduce ? "8rem" : undefined }}
              >
                {/* Vertical accent line inside the bar */}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 ${accentBg}`}
                />
                {/* Place label at the top of the bar */}
                <div className="absolute inset-x-0 top-3 text-center text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[color:var(--color-fg)]">
                  {col.place}
                </div>
                {/* Rank number carved into the bar face */}
                <div
                  aria-hidden
                  className={`absolute inset-x-0 bottom-3 text-center text-4xl sm:text-6xl font-black leading-none ${accentText} opacity-15`}
                >
                  {col.key === "first" ? "01" : col.key === "second" ? "02" : "03"}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
      {/* Stage base */}
      <div
        aria-hidden
        className="mt-0 h-1.5 rounded-b-lg bg-gradient-to-r from-transparent via-[color:var(--color-border-strong)] to-transparent"
      />
      <p className="mt-8 text-center text-xs text-[color:var(--color-fg-subtle)]">
        {PRIZES.disclaimer}
      </p>
    </div>
  );
}
