"use client";

import { motion } from "motion/react";
import Section from "./Section";
import { stack } from "@/data/content";

export default function Stack() {
  return (
    <Section id="stack" num="03" label="Compétences">
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="border-b border-ink pb-3 font-display text-lg font-semibold">{group.title}</h3>
            <ul className="mt-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="group flex items-center justify-between border-b border-line py-3 text-[15px] text-muted transition-colors hover:text-ink"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{item}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
