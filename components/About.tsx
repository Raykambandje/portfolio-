"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, MotionValue, useInView, useScroll, useTransform } from "motion/react";
import Section from "./Section";
import { aboutLead, aboutText, stats } from "@/data/content";

// Un mot qui s'éclaircit selon la progression du scroll
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}

function Counter({ prefix, value, suffix }: { prefix: string; value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  const leadRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: leadRef, offset: ["start 0.85", "end 0.5"] });
  const words = aboutLead.split(" ");

  return (
    <Section id="apropos" num="01" label="À propos">
      <p
        ref={leadRef}
        className="max-w-3xl font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.02em]"
      >
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </p>

      <div className="mt-10 grid max-w-3xl gap-5 text-[17px] leading-relaxed text-muted sm:grid-cols-2 sm:gap-8">
        {aboutText.map((t, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            {t}
          </motion.p>
        ))}
      </div>

      {/* TODO : ajoute ta photo dans public/photo.jpg puis décommente
      <img src="/photo.jpg" alt="Portrait de Ray Kambandje"
           className="mt-12 aspect-[4/3] w-full max-w-md rounded-2xl object-cover" /> */}

      <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex flex-col-reverse bg-surface p-6 sm:p-8"
          >
            <dt className="mt-2 text-sm text-muted">{s.label}</dt>
            <dd className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              <Counter {...s} />
            </dd>
          </motion.div>
        ))}
      </dl>
    </Section>
  );
}
