"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Section from "./Section";
import RollText from "./RollText";
import { certifications } from "@/data/content";

export default function Certifications() {
  return (
    <Section id="certifications" num="05" label="Certifications">
      <div className="grid gap-6">
        {certifications.map((c) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group/cert grid gap-8 rounded-2xl border border-line bg-surface p-6 shadow-card sm:grid-cols-[160px_1fr] sm:p-10"
          >
            {/* Le badge pivote légèrement à l'apparition puis au survol */}
            <motion.div
              initial={{ rotate: -8, scale: 0.85 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
              className="w-32 transition-transform duration-500 group-hover/cert:-rotate-3 group-hover/cert:scale-105 sm:w-40"
            >
              <Image
                src={c.image}
                alt={`Badge ${c.title} — ${c.issuer}`}
                width={600}
                height={600}
                className="h-auto w-full drop-shadow-md"
              />
            </motion.div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-subtle">
                <span>{c.issuer}</span>
                <span className="h-1 w-1 rounded-full bg-line" />
                <span>{c.date}</span>
              </div>

              <h3 className="mt-4 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em]">
                {c.title}
              </h3>

              <ul className="mt-5 grid gap-2 text-[15px] text-muted sm:grid-cols-2 sm:gap-x-8">
                {c.skills.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="flex gap-2.5"
                  >
                    <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {s}
                  </motion.li>
                ))}
              </ul>

              <a
                href={c.verifyUrl}
                target="_blank"
                rel="noopener"
                className="group mt-7 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                <RollText>Vérifier sur Credly</RollText>
                <span aria-hidden>↗</span>
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
