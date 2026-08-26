"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Fragment, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Character-by-character reveal for headings. Splits by word first (so
 * text wraps normally at word boundaries) and then by character within
 * each word.
 *
 * Accepts a `children` prop that must be either a plain string or an
 * array of strings and inline elements (used for the highlighted
 * gradient words in the SparkLab hero). Nested elements are shown as-is
 * without character-splitting so their custom styling survives.
 */
export function KineticText({
  children,
  className,
  delay = 0,
  duration = 0.55,
  stagger = 0.025,
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}) {
  const reduce = useReducedMotion();
  const MotionTag =
    Tag === "h1"
      ? motion.h1
      : Tag === "h2"
        ? motion.h2
        : Tag === "h3"
          ? motion.h3
          : Tag === "p"
            ? motion.p
            : Tag === "span"
              ? motion.span
              : motion.div;

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  const items = normalizeChildren(children);

  let charIndex = 0;

  return (
    <MotionTag
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={cn("inline-block", className)}
      aria-label={flattenLabel(children)}
    >
      {items.map((item, wIdx) => {
        if (typeof item === "string") {
          const words = item.split(/(\s+)/);
          return (
            <Fragment key={wIdx}>
              {words.map((word, wi) => {
                if (/^\s+$/.test(word)) {
                  return <span key={wi}>&nbsp;</span>;
                }
                return (
                  <span
                    key={wi}
                    className="inline-block whitespace-nowrap"
                    style={{ verticalAlign: "top" }}
                  >
                    {[...word].map((char) => {
                      const idx = charIndex++;
                      return (
                        <motion.span
                          key={idx}
                          aria-hidden
                          className="inline-block"
                          variants={{
                            hidden: {
                              opacity: 0,
                              y: "0.4em",
                              filter: "blur(8px)",
                            },
                            visible: {
                              opacity: 1,
                              y: 0,
                              filter: "blur(0px)",
                              transition: {
                                duration,
                                ease: [0.22, 1, 0.36, 1],
                              },
                            },
                          }}
                        >
                          {char}
                        </motion.span>
                      );
                    })}
                  </span>
                );
              })}
            </Fragment>
          );
        }
        // Non-string nodes (e.g. gradient <span>s) get their own reveal
        // as a single unit so their color styling is preserved.
        return (
          <motion.span
            key={wIdx}
            variants={{
              hidden: {
                opacity: 0,
                y: "0.4em",
                filter: "blur(8px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  duration: duration * 1.4,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="inline-block"
          >
            {item}
          </motion.span>
        );
      })}
    </MotionTag>
  );
}

/**
 * Flatten React children into a list of strings and non-string nodes,
 * unwrapping Fragments (including nested ones). Strings survive so we
 * can char-split them; elements pass through as opaque blocks whose
 * styling (e.g. gradient <span>) is preserved.
 */
function normalizeChildren(children: ReactNode): ReactNode[] {
  const out: ReactNode[] = [];
  const push = (n: ReactNode) => {
    if (n == null || n === false || n === true) return;
    if (typeof n === "string" || typeof n === "number") {
      out.push(String(n));
      return;
    }
    if (Array.isArray(n)) {
      n.forEach(push);
      return;
    }
    if (isValidElement(n) && n.type === Fragment) {
      // biome-ignore lint/suspicious/noExplicitAny: Fragment children traversal
      push((n as any).props?.children);
      return;
    }
    out.push(n);
  };
  push(children);
  return out;
}

function flattenLabel(node: ReactNode): string {
  if (node == null || node === false || node === true) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenLabel).join("");
  if (typeof node === "object" && "props" in node) {
    // biome-ignore lint/suspicious/noExplicitAny: React element traversal
    return flattenLabel((node as any).props?.children);
  }
  return "";
}
