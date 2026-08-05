"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  variant?: "hero" | "page";
};

export function Navbar({ variant = "hero" }: NavbarProps) {
  const headerClass =
    variant === "hero"
      ? "absolute left-0 right-0 top-0 z-20 flex items-center justify-center gap-4 px-4 py-3 sm:py-4 md:px-8"
      : "sticky top-0 z-30 flex items-center justify-center gap-4 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md sm:py-4 md:px-8";

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={headerClass}
    >
      <Link href="/" aria-label="Go to home" className="shrink-0">
        <Image
          src="/logo.png"
          alt="Ganesh Shah"
          width={140}
          height={40}
          priority
          className="h-8 w-auto object-contain sm:h-9"
        />
      </Link>
    </motion.header>
  );
}
