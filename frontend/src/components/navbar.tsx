"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarProps = {
  variant?: "hero" | "page";
};

function getBackLink(pathname: string) {
  if (pathname === "/") return null;

  if (pathname.startsWith("/projects/")) {
    return { href: "/projects", label: "Projects" };
  }
  if (pathname === "/projects") {
    return { href: "/", label: "Home" };
  }
  if (pathname.startsWith("/blogs/")) {
    return { href: "/blogs", label: "Blogs" };
  }
  if (pathname === "/blogs") {
    return { href: "/", label: "Home" };
  }
  if (pathname.startsWith("/achievements/")) {
    return { href: "/achievements", label: "Achievements" };
  }
  if (pathname === "/achievements") {
    return { href: "/", label: "Home" };
  }

  return { href: "/", label: "Home" };
}

export function Navbar({ variant = "hero" }: NavbarProps) {
  const pathname = usePathname();
  const backLink = variant === "page" ? getBackLink(pathname) : null;

  const headerClass =
    variant === "hero"
      ? "absolute left-0 right-0 top-0 z-20 flex items-center justify-center gap-4 px-4 py-3 sm:py-4 md:px-8"
      : "sticky top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md sm:py-4 md:px-8";

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={headerClass}
    >
      {variant === "page" ? (
        <div className="flex min-w-0 items-center justify-start">
          {backLink ? (
            <Link
              href={backLink.href}
              className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white sm:gap-2 sm:text-sm"
            >
              <ArrowLeft className="size-4 shrink-0" />
              <span className="truncate">{backLink.label}</span>
            </Link>
          ) : null}
        </div>
      ) : null}

      <Link href="/" aria-label="Go to home" className="shrink-0 justify-self-center">
        <Image
          src="/logo.png"
          alt="Ganesh Shah"
          width={140}
          height={40}
          priority
          className="h-8 w-auto object-contain sm:h-9"
        />
      </Link>

      {variant === "page" ? <div aria-hidden="true" /> : null}
    </motion.header>
  );
}
