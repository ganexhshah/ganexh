"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  scale = 1,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, scale }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
