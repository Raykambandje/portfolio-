"use client";

import { motion } from "motion/react";

const word = {
  hidden: { y: "105%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

// Révèle un texte mot par mot, chaque mot glissant depuis sous la ligne.
// mode "mount" : au chargement ; mode "view" : quand le texte entre à l'écran.
export default function SplitText({
  text,
  delay = 0,
  stagger = 0.06,
  mode = "mount",
  className = "",
}: {
  text: string;
  delay?: number;
  stagger?: number;
  mode?: "mount" | "view";
  className?: string;
}) {
  const words = text.split(" ");
  const trigger =
    mode === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, amount: 0.6 } };

  return (
    <motion.span
      aria-label={text}
      className={`block ${className}`}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-top">
          <motion.span className="inline-block" variants={word}>
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
