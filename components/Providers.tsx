"use client";

import { MotionConfig } from "motion/react";
import SmoothScroll from "./SmoothScroll";

// Respecte le réglage « réduire les animations » du système de l'utilisateur
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
