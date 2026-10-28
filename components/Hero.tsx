"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import SplitText from "./SplitText";
import Magnetic from "./Magnetic";
import RollText from "./RollText";
import { heroWords, profile } from "@/data/content";
import { introDelay } from "@/lib/intro";

const ease = [0.22, 1, 0.36, 1] as const;

const meta = [
  { k: "Actuellement", v: profile.company },
  { k: "Formation", v: "Bac 4 · Génie logiciel" },
  { k: "Spécialité", v: "Web full-stack & intégrations" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [word, setWord] = useState(0);
  const D = introDelay();

  // Parallaxe à la sortie de l'écran
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Halo lumineux qui suit la souris et allume les points de la grille
  const mx = useSpring(useMotionValue(-1000), { stiffness: 150, damping: 25 });
  const my = useSpring(useMotionValue(-1000), { stiffness: 150, damping: 25 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${mx}px ${my}px, rgb(43 74 203 / 0.07), transparent 70%)`;
  const dotsMask = useMotionTemplate`radial-gradient(220px circle at ${mx}px ${my}px, black, transparent)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => setWord((w) => (w + 1) % heroWords.length), 2600);
    }, D * 1000);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, []);

  return (
    <section id="top" ref={ref} onPointerMove={onMove} className="relative isolate overflow-x-clip">
      {/* Grille de points discrète */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--color-line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,black,transparent)]"
      />
      {/* Points qui s'allument autour de la souris */}
      <motion.div
        aria-hidden
        style={{ maskImage: dotsMask, WebkitMaskImage: dotsMask }}
        className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--color-accent)_1px,transparent_1px)] [background-size:22px_22px] opacity-60"
      />
      <motion.div aria-hidden style={{ background: glow }} className="absolute inset-0 -z-10" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24 lg:pb-24 lg:pt-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: D, ease }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Disponible pour missions et collaborations
        </motion.p>

        <h1 className="font-display text-[clamp(2.6rem,8vw,6.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          <SplitText text={`${profile.firstName} ${profile.lastName},`} delay={D + 0.1} />
          <SplitText text="développeur full-stack." delay={D + 0.3} className="text-subtle" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: D + 0.7, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          Je conçois et développe des produits web fiables, de la base de données à
          l&apos;interface — notamment pour{" "}
          <span className="relative inline-flex overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={heroWords[word]}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.4, ease }}
                className="inline-block font-medium text-ink"
              >
                {heroWords[word]}
              </motion.span>
            </AnimatePresence>
          </span>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: D + 0.85, ease }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic strength={0.2}>
            <a
              href="#projets"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent"
            >
              <RollText>Voir mes projets</RollText>
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              className="group inline-flex items-center rounded-full border border-line bg-surface px-6 py-3.5 text-sm font-medium transition-colors hover:border-ink"
            >
              <RollText>Me contacter</RollText>
            </a>
          </Magnetic>
        </motion.div>

        <motion.dl
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.08, delayChildren: D + 1.05 }}
          className="mt-20 grid gap-6 border-t border-line pt-8 sm:grid-cols-3"
        >
          {meta.map((m) => (
            <motion.div
              key={m.k}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease }}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">{m.k}</dt>
              <dd className="mt-1.5 text-sm font-medium">{m.v}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
