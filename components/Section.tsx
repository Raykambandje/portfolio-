"use client";

import { motion } from "motion/react";

// Mise en page éditoriale : étiquette à gauche, contenu à droite
export default function Section({
  id,
  num,
  label,
  children,
  className = "",
}: {
  id: string;
  num: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-[180px_1fr] md:gap-12 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          className="md:sticky md:top-24 md:self-start"
        >
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">{num}</span>
            <span className="h-px w-6 bg-line" />
            {label}
          </p>
        </motion.div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
