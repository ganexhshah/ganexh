"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { Mail, MoreVertical, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { socialLinks } from "@/data/social";

function GitHubIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63a1.63 1.63 0 0 0 1.63 1.63c.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
    </svg>
  );
}

function InstagramIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const navItems = [
  { heading: "Home", href: "/", subheading: "Official portfolio" },
  { heading: "Projects", href: "/projects", subheading: "Selected work & apps" },
  { heading: "Blogs", href: "/blogs", subheading: "Articles & learnings" },
  { heading: "Achievements", href: "/achievements", subheading: "Awards & milestones" },
];

const MENU_SLIDE_ANIMATION = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
  },
};

function Curve() {
  const [h, setH] = useState(800);

  useEffect(() => {
    setH(window.innerHeight);
    const onResize = () => setH(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const initialPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`;

  const curve = {
    initial: { d: initialPath },
    enter: {
      d: targetPath,
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  return (
    <svg
      className="pointer-events-none absolute -left-[99px] top-0 h-full w-[100px] stroke-none fill-zinc-950/98 dark:fill-zinc-950/98 not-dark:fill-white/98"
    >
      <motion.path
        variants={curve}
        initial="initial"
        animate="enter"
        exit="exit"
      />
    </svg>
  );
}

function NavLinkItem({
  heading,
  href,
  subheading,
  index,
  isActiveRoute,
  onSelect,
}: {
  heading: string;
  href: string;
  subheading?: string;
  index: number;
  isActiveRoute: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-white/10 py-3.5 transition-colors duration-500 sm:py-5 not-dark:border-neutral-200"
    >
      <Link
        ref={ref}
        onMouseMove={handleMouseMove}
        href={href}
        onClick={onSelect}
        className="flex w-full items-center justify-between"
      >
        <div className="relative flex items-baseline gap-3 sm:gap-4">
          <span className="font-mono text-sm text-[#e53935] sm:text-base">
            0{index}.
          </span>
          <div>
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 10 },
              }}
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 18,
              }}
              className={`block text-2xl font-light tracking-tight transition-colors duration-300 sm:text-3xl md:text-4xl ${
                isActiveRoute
                  ? "text-[#e53935] font-normal"
                  : "text-white group-hover:text-[#e53935] not-dark:text-neutral-900"
              }`}
            >
              {heading}
            </motion.span>
            {subheading && (
              <p className="mt-0.5 text-xs text-white/40 not-dark:text-neutral-500">
                {subheading}
              </p>
            )}
          </div>
        </div>

        {isActiveRoute && (
          <span className="size-2 rounded-full bg-[#e53935] shadow-[0_0_12px_#e53935]" />
        )}
      </Link>
    </motion.div>
  );
}

export function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* 3-Dot Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? "Close menu" : "Open curved navigation menu"}
        aria-expanded={isOpen}
        className={`relative z-50 flex size-9 items-center justify-center rounded-full border transition-all duration-300 ${
          isOpen
            ? "border-[#e53935]/60 bg-[#e53935]/20 text-[#e53935] shadow-[0_0_24px_rgba(229,57,53,0.4)]"
            : "border-white/20 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10 hover:text-white dark:border-white/20 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/40 not-dark:border-neutral-300 not-dark:bg-neutral-100 not-dark:text-neutral-700 not-dark:hover:bg-neutral-200"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="size-4" />
            </motion.div>
          ) : (
            <motion.div
              key="dots"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MoreVertical className="size-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full-Screen Curved Drawer Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />

            {/* Curved Sliding Drawer */}
            <motion.aside
              variants={MENU_SLIDE_ANIMATION}
              initial="initial"
              animate="enter"
              exit="exit"
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-[480px] flex-col justify-between border-l border-white/10 bg-zinc-950/98 p-6 shadow-2xl backdrop-blur-2xl sm:p-10 dark:border-white/10 dark:bg-zinc-950/98 not-dark:border-neutral-200 not-dark:bg-white/98"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 not-dark:border-neutral-200">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e53935]">
                  Navigation
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-white/15 p-1.5 text-white/60 transition-colors hover:border-[#e53935] hover:text-[#e53935] not-dark:border-neutral-300 not-dark:text-neutral-600"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="my-auto flex flex-col py-4">
                {navItems.map((item, index) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <NavLinkItem
                      key={item.href}
                      heading={item.heading}
                      href={item.href}
                      subheading={item.subheading}
                      index={index + 1}
                      isActiveRoute={isActive}
                      onSelect={() => setIsOpen(false)}
                    />
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="border-t border-white/10 pt-4 not-dark:border-neutral-200">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 not-dark:text-neutral-400">
                  Connect &amp; Socials
                </p>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white/80 not-dark:border-neutral-200 not-dark:bg-neutral-100 not-dark:text-neutral-800"
                  >
                    <GitHubIcon className="size-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white/80 not-dark:border-neutral-200 not-dark:bg-neutral-100 not-dark:text-neutral-800"
                  >
                    <LinkedInIcon className="size-3.5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/80 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white dark:border-white/10 dark:bg-white/5 dark:text-white/80 not-dark:border-neutral-200 not-dark:bg-neutral-100 not-dark:text-neutral-800"
                    title="Instagram"
                  >
                    <InstagramIcon className="size-3.5" />
                  </a>
                  <a
                    href={socialLinks.mailto}
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2.5 text-white/80 transition-colors hover:border-[#e53935] hover:bg-[#e53935]/15 hover:text-[#e53935] dark:border-white/10 dark:bg-white/5 dark:text-white/80 not-dark:border-neutral-200 not-dark:bg-neutral-100 not-dark:text-neutral-800"
                    title="Email"
                  >
                    <Mail className="size-3.5" />
                  </a>
                </div>
              </div>

              {/* Animated SVG Curve */}
              <Curve />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default NavMenu;
