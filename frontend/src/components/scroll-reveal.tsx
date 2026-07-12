"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

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
  y = 16,
  scale = 1,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 1, y: Math.min(y, 16), scale: scale === 1 ? 1 : Math.max(scale, 0.98) }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
