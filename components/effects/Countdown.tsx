"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Diff = { days: number; hours: number; minutes: number; seconds: number };

/**
 * Live-ticking countdown to a target ISO date. Renders as four
 * side-by-side digit blocks. Renders server-side with the maximum
 * value (in case JS never boots) and updates every second on the
 * client. Displays "In progress" once the target is past.
 */
export function Countdown({
  targetIso,
  className,
}: {
  targetIso: string;
  className?: string;
}) {
  const [diff, setDiff] = useState<Diff | null>(() => computeDiff(targetIso));

  useEffect(() => {
    setDiff(computeDiff(targetIso));
    const id = setInterval(() => setDiff(computeDiff(targetIso)), 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  if (!diff) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-electric)]",
          className
        )}
      >
        <span className="relative inline-flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[color:var(--color-electric)] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-electric)]" />
        </span>
        Cohort in progress
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2 sm:gap-3", className)}>
      <Cell value={diff.days} label="Days" />
      <Cell value={diff.hours} label="Hrs" />
      <Cell value={diff.minutes} label="Min" />
      <Cell value={diff.seconds} label="Sec" pulse />
    </div>
  );
}

function Cell({
  value,
  label,
  pulse = false,
}: {
  value: number;
  label: string;
  pulse?: boolean;
}) {
  const padded = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "min-w-[3.5rem] sm:min-w-[4rem] rounded-xl px-2 sm:px-3 py-2.5 sm:py-3 text-center tabular-nums font-bold text-2xl sm:text-3xl",
          "bg-[color:var(--color-bg-elevated)]/80 backdrop-blur-sm border border-[color:var(--color-border-strong)] text-[color:var(--color-fg)]",
          pulse && "text-[color:var(--color-spark)]"
        )}
      >
        {padded}
      </div>
      <div className="mt-1.5 text-[10px] uppercase tracking-wider text-[color:var(--color-fg-muted)] font-semibold">
        {label}
      </div>
    </div>
  );
}

function computeDiff(iso: string): Diff | null {
  const target = new Date(iso + (iso.includes("T") ? "" : "T00:00:00")).getTime();
  const ms = target - Date.now();
  if (isNaN(ms) || ms <= 0) return null;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}
