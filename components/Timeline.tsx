"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Section from "./Section";
import { timeline } from "@/data/content";

export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.5"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <Section id="parcours" num="04" label="Parcours">
      <ol ref={ref} className="relative max-w-2xl">
        {/* Ligne qui se dessine au scroll */}
        <span aria-hidden className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-line" />
        <motion.span
          aria-hidden
          style={{ scaleY }}
          className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-ink"
        />
        {timeline.map((item, i) => (
          <motion.li
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative pb-12 pl-10 last:pb-0"
          >
            <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-ink bg-paper" />
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtle">{item.when}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-1.5 text-muted">{item.place}</p>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
