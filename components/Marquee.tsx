"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { marqueeItems } from "@/data/content";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

// Bandeau de technologies qui défile doucement et accélère légèrement avec le scroll
export default function Marquee() {
  const reduced = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const factor = useTransform(smooth, [0, 1000], [0, 2], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * 1.2 * (delta / 1000);
    moveBy += moveBy * Math.abs(factor.get());
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-line bg-surface [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <motion.div style={{ x }} className="flex w-max whitespace-nowrap py-5">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center text-sm text-muted">
                <span className="px-7">{item}</span>
                <span className="h-1 w-1 rounded-full bg-subtle/60" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
