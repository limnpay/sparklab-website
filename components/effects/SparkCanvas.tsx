"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-reactive particle mesh. Renders a Canvas 2D scene of drifting
 * orange sparks connected to nearby neighbors by thin gradient lines.
 * The cursor pushes particles away with a soft force field.
 *
 * Design notes:
 *   • Canvas 2D, not WebGL — well below 5% CPU on modern hardware.
 *   • Particle count scales with viewport area so mobile phones don't
 *     churn.
 *   • Uses devicePixelRatio for crisp lines on retina without exploding
 *     the fill-rate.
 *   • Auto-pauses when the tab is hidden.
 *   • Silently no-ops on prefers-reduced-motion (returns an empty div
 *     the same size so layout stays stable).
 *
 * Meant to be placed inside a `relative` parent that spans the full
 * hero. This component itself is `absolute inset-0`.
 */
export function SparkCanvas({
  className,
  density = 0.00012, // particles per square pixel
  linkDistance = 130,
  cursorRadius = 140,
  cursorPush = 0.6,
  color = "#FF5C22",
  secondaryColor = "#78D900",
}: {
  className?: string;
  density?: number;
  linkDistance?: number;
  cursorRadius?: number;
  cursorPush?: number;
  color?: string;
  secondaryColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.max(20, Math.floor(width * height * density));
      // Rebuild particle set on resize (keeps density constant).
      particlesRef.current = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.8,
        hueShift: Math.random() > 0.85, // 15% get the electric-green tint
      }));
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }
    function onTouch(e: TouchEvent) {
      if (!e.touches[0]) return;
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
      mouseRef.current.active = true;
    }

    let paused = false;
    function onVisibility() {
      paused = document.hidden;
      if (!paused) tick();
    }

    function tick() {
      if (paused) return;
      const ps = particlesRef.current;
      const m = mouseRef.current;

      ctx!.clearRect(0, 0, width, height);

      // Update
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;

        // Cursor repulsion
        if (m.active) {
          const dx = p.x - m.x;
          const dy = p.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < cursorRadius) {
            const force = (1 - dist / cursorRadius) * cursorPush;
            p.vx += (dx / (dist || 1)) * force;
            p.vy += (dy / (dist || 1)) * force;
          }
        }

        // Gentle drag so the field settles instead of accelerating
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Wrap around edges for continuity
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      // Draw connections
      ctx!.lineWidth = 1;
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i];
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < linkDistance * linkDistance) {
            const dist = Math.sqrt(dist2);
            const alpha = (1 - dist / linkDistance) * 0.35;
            ctx!.strokeStyle = withAlpha(color, alpha);
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      for (const p of ps) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.hueShift ? secondaryColor : color;
        ctx!.globalAlpha = 0.85;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave, { passive: true });
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouch);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [density, linkDistance, cursorRadius, cursorPush, color, secondaryColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hueShift: boolean;
};

function withAlpha(hex: string, alpha: number) {
  // Fast hex → rgba conversion for #RRGGBB inputs.
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
