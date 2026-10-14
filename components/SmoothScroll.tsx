"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

// Défilement fluide (désactivé si l'utilisateur préfère réduire les animations)
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -72 } }}>
      {children}
    </ReactLenis>
  );
}
