"use client";

import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { LogoMark } from "./Logo";
import { INTRO_DURATION } from "@/lib/intro";
import { profile } from "@/data/content";

const ease = [0.76, 0, 0.24, 1] as const;

// Écran d'intro : le logo se dessine, un compteur monte à 100, puis le rideau remonte
export default function Intro() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const lenis = useLenis();

  // Bloque le scroll pendant l'intro
  useEffect(() => {
    if (done) {
      lenis?.start();
      document.documentElement.style.overflow = "";
    } else {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [done, lenis]);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: INTRO_DURATION - 0.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setTimeout(() => setDone(true), 250),
    });
    return () => controls.stop();
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease }}
          className="fixed inset-0 z-[100] flex flex-col bg-ink p-6 text-white sm:p-10"
        >
          <div className="flex flex-1 items-center justify-center">
            <motion.div exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.4 }}>
              <LogoMark animated inverted delay={0.1} className="h-20 w-20 sm:h-24 sm:w-24" />
            </motion.div>
          </div>

          <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="mb-4 flex items-end justify-between text-sm text-white/50">
              <span>
                {profile.firstName} {profile.lastName} — Portfolio
              </span>
              <span className="font-display text-2xl font-medium tabular-nums text-white">{count}%</span>
            </div>
            <div className="h-px w-full overflow-hidden bg-white/10">
              <div className="h-full origin-left bg-white" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
