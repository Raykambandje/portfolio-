"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import RollText from "./RollText";
import { LogoMark } from "./Logo";
import { profile } from "@/data/content";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-24 sm:px-8 lg:pt-32">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-white/50">
          <span className="text-white">06</span>
          <span className="h-px w-6 bg-white/20" />
          Contact
        </p>

        <h2 className="mt-8 font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          <SplitText text="Un projet en tête ?" mode="view" />
          <SplitText text="Parlons-en." mode="view" delay={0.15} className="text-white/40" />
        </h2>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Magnetic strength={0.15}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 font-medium text-ink transition-colors hover:bg-accent hover:text-white"
            >
              {profile.email}
              <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
            </a>
          </Magnetic>
          <button
            onClick={copy}
            className="relative h-[56px] min-w-[150px] overflow-hidden rounded-full border border-white/20 px-6 text-sm text-white/80 transition-colors hover:border-white hover:text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "ok" : "copy"}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {copied ? "Adresse copiée ✓" : "Copier l'adresse"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-6">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex text-white/60 transition-colors hover:text-white"
                >
                  <RollText>{`${s.label} ↗`}</RollText>
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-3 text-white/40">
            <LogoMark inverted className="h-6 w-6" />© {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          </p>
        </div>
      </div>
    </footer>
  );
}
