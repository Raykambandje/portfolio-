"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Section from "./Section";
import SplitText from "./SplitText";
import { projects, type Project } from "@/data/content";

// Carte « collante » : elle reste en place et recule légèrement quand la suivante arrive
function Card({
  project,
  i,
  progress,
  range,
  targetScale,
  last,
}: {
  project: Project;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  last: boolean;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);
  const external = project.link.href.startsWith("http");

  // Inclinaison 3D + reflet qui suit la souris
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 150, damping: 18 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgb(43 74 203 / 0.08), transparent 65%)`;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ scale, rotateX, rotateY, transformPerspective: 1200, top: `${96 + i * 20}px` }}
      className={`group/card sticky origin-top overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-10 ${last ? "" : "mb-[22vh]"}`}
    >
      <motion.div
        aria-hidden
        style={{ background: sheen }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
      />
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em] text-subtle">
        <span>{project.index} / 0{projects.length}</span>
        <span>{project.type}</span>
      </div>

      <h3 className="mt-8 font-display text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-none tracking-[-0.03em]">
        {project.title}
      </h3>

      <p className="mt-5 max-w-2xl leading-relaxed text-muted">{project.description}</p>

      <div className="mt-8 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-2">
          {project.chips.map((c) => (
            <li key={c} className="rounded-full bg-paper px-3 py-1 text-xs text-muted ring-1 ring-line">
              {c}
            </li>
          ))}
        </ul>

        <a
          href={project.link.href}
          target={external ? "_blank" : undefined}
          rel="noopener"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium"
        >
          <span className="relative">
            {project.link.label}
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 group-hover:scale-x-100" />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
            <span className="transition-transform duration-300 group-hover:-rotate-45">→</span>
          </span>
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <Section id="projets" num="02" label="Projets">
      <h2 className="mb-12 max-w-2xl font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-medium leading-tight tracking-[-0.02em]">
        <SplitText text="Une sélection de produits que j'ai conçus et développés." mode="view" stagger={0.04} />
      </h2>

      <div ref={container}>
        {projects.map((p, i) => (
          <Card
            key={p.title}
            project={p}
            i={i}
            progress={scrollYProgress}
            range={[i / projects.length, 1]}
            targetScale={1 - (projects.length - i - 1) * 0.04}
            last={i === projects.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
