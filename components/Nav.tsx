"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { profile } from "@/data/content";
import { LogoMark } from "./Logo";
import RollText from "./RollText";
import { INTRO_DURATION } from "@/lib/intro";

const links = [
  { href: "#apropos", label: "À propos" },
  { href: "#projets", label: "Projets" },
  { href: "#stack", label: "Compétences" },
  { href: "#parcours", label: "Parcours" },
  { href: "#certifications", label: "Certifications" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [delayIn, setDelayIn] = useState(INTRO_DURATION);

  // Cache la barre quand on descend, la réaffiche quand on remonte
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 200 && !open);
    setScrolled(latest > 10);
    if (delayIn) setDelayIn(0);
  });

  return (
    <motion.header
      initial={{ y: "-100%" }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: hidden ? 0 : delayIn }}
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5 font-display text-[15px] font-semibold tracking-tight">
          <LogoMark className="h-8 w-8 transition-transform duration-500 group-hover:-rotate-6" />
          <span>
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <nav aria-label="Navigation principale">
          <ul className="hidden items-center gap-8 text-sm md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group text-muted transition-colors hover:text-ink">
                  <RollText>{l.label}</RollText>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="group inline-flex rounded-full bg-ink px-4 py-2 font-medium text-white transition-colors hover:bg-accent"
              >
                <RollText>Me contacter</RollText>
              </a>
            </li>
          </ul>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-ink transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`}
            />
            <span
              className={`absolute h-px w-4 bg-ink transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`}
            />
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="menu-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            {[...links, { href: "#contact", label: "Contact" }].map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.04 * i }}
                className="border-t border-line"
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 font-display text-lg font-medium"
                >
                  {l.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
