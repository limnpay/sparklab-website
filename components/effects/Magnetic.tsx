"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Wraps any element in a subtle magnetic hover effect: as the cursor
 * approaches, the child translates toward it. Uses springs so the motion
 * feels physical, not glidey.
 *
 * Wraps only, so the child element (e.g. a Button) keeps all its own
 * semantics. Disabled for touch devices and prefers-reduced-motion.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  /** How far the element follows the cursor (0-1). Default 0.3 is subtle. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
