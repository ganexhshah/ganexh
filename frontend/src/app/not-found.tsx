import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Home, Layers, Sparkles } from "lucide-react";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Ganesh Shah",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    { label: "Selected Projects", href: "/projects", icon: Layers },
    { label: "Recent Work", href: "/#recent-work", icon: Sparkles },
    { label: "Engineering Blogs", href: "/blogs", icon: Compass },
  ];

  return (
    <PageShell>
      <section className="relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Ambient atmospheric red & dark glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(229,57,53,0.14),transparent_65%),radial-gradient(ellipse_at_20%_80%,rgba(255,110,60,0.06),transparent_50%)]"
        />

        {/* Subtle grid pattern background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e53935] backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[#e53935] animate-ping" />
            <span>404 Error · Void Detected</span>
          </div>

          {/* Giant artistic 404 headline */}
          <div className="relative my-4 select-none">
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 translate-y-3 blur-3xl text-7xl font-black tracking-tighter text-[#e53935]/25 sm:text-9xl md:text-[13rem]"
            >
              404
            </span>
            <h1 className="bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-400 bg-clip-text text-7xl font-extrabold tracking-tighter text-transparent sm:text-9xl md:text-[13rem] dark:from-white dark:via-neutral-200 dark:to-neutral-500">
              404
            </h1>
          </div>

          {/* Descriptive text */}
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl md:text-3xl dark:text-white">
            This coordinate does not exist.
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-400">
            The page you are looking for has departed, never reached production, or was rerouted into another branch.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full bg-[#e53935] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_4px_20px_rgba(229,57,53,0.35)] transition-all duration-300 hover:bg-[#d32f2f] hover:shadow-[0_6px_28px_rgba(229,57,53,0.5)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <Home className="size-4 transition-transform group-hover:scale-110" />
              <span>Return to Home</span>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-800 backdrop-blur-md transition-all duration-300 hover:border-neutral-400 hover:bg-white hover:-translate-y-0.5 active:translate-y-0 dark:border-white/15 dark:bg-white/5 dark:text-neutral-200 dark:hover:border-white/30 dark:hover:bg-white/10"
            >
              <span>Explore Projects</span>
              <ArrowLeft className="size-3.5 rotate-180" />
            </Link>
          </div>

          {/* Quick destination links */}
          <div className="mt-12 w-full max-w-md border-t border-neutral-200/80 pt-6 dark:border-white/10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
              Popular Destinations
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-200/90 bg-white/50 px-3.5 py-2 text-xs font-medium text-neutral-700 transition-all hover:border-[#e53935]/50 hover:bg-neutral-100 hover:text-[#e53935] dark:border-white/10 dark:bg-white/[0.03] dark:text-neutral-300 dark:hover:border-[#e53935]/40 dark:hover:bg-white/[0.08] dark:hover:text-white"
                  >
                    <Icon className="size-3.5 text-[#e53935]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
