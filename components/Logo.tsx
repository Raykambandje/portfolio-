"use client";

import { motion } from "motion/react";
import { LOGO_BOWL as BOWL, LOGO_LEG as LEG } from "@/lib/logo";

// Monogramme « R » : traits arrondis + petit curseur bleu (clin d'œil au code)

export function LogoMark({
  className = "",
  animated = false,
  delay = 0,
  inverted = false,
}: {
  className?: string;
  animated?: boolean;
  delay?: number;
  inverted?: boolean;
}) {
  const bg = inverted ? "#fff" : "var(--color-ink)";
  const fg = inverted ? "var(--color-ink)" : "#fff";
  const draw = (d: number, dur: number) =>
    animated
      ? {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: dur, delay: delay + d, ease: [0.65, 0, 0.35, 1] as const },
        }
      : {};

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <motion.rect
        width="100"
        height="100"
        rx="26"
        fill={bg}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        {...(animated
          ? {
              initial: { scale: 0, rotate: -25 },
              animate: { scale: 1, rotate: 0 },
              transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
            }
          : {})}
      />
      <g fill="none" stroke={fg} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d={BOWL} {...draw(0.35, 0.7)} />
        <motion.path d={LEG} {...draw(1, 0.3)} />
      </g>
      <motion.rect
        x="71"
        y="68"
        width="11"
        height="9"
        rx="2"
        fill="var(--color-accent)"
        {...(animated
          ? {
              initial: { opacity: 0 },
              animate: { opacity: [0, 1, 0, 1] },
              transition: { duration: 0.9, delay: delay + 1.25, times: [0, 0.01, 0.5, 0.51] },
            }
          : {})}
      />
    </svg>
  );
}
