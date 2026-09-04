"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavMenu } from "@/components/nav-menu";
import { ThemeToggle } from "@/components/theme-toggle";

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
      ? "absolute left-0 right-0 top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:py-4 md:px-8"
      : "sticky top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-md dark:border-white/10 dark:bg-black/80 not-dark:border-neutral-200 not-dark:bg-white/80 sm:py-4 md:px-8";

  return (
    <motion.header
      initial={false}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={headerClass}
    >
      <div className="flex min-w-0 items-center justify-start gap-2 sm:gap-3">
        <NavMenu />
        {variant === "page" && backLink ? (
          <Link
            href={backLink.href}
            className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white dark:text-white/50 dark:hover:text-white not-dark:text-neutral-500 not-dark:hover:text-neutral-900 sm:gap-2 sm:text-sm"
          >
            <ArrowLeft className="size-4 shrink-0" />
            <span className="truncate">{backLink.label}</span>
          </Link>
        ) : null}
      </div>

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

      <div className="flex items-center justify-end">
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
