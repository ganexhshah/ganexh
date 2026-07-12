import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, FolderKanban, Newspaper } from "lucide-react";

import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";

export const metadata: Metadata = {
  title: "TikTok @_ganexx",
  description:
    "Ganesh Shah on TikTok as @_ganexx — full-stack developer from Nepal. Visit ganeshshah.com for projects, blogs, and portfolio.",
  alternates: { canonical: `${siteConfig.url}/tiktok` },
  openGraph: {
    title: "Ganesh Shah on TikTok — @_ganexx | ganeshshah.com",
    description:
      "Follow @_ganexx on TikTok. Explore the full portfolio at ganeshshah.com.",
    url: `${siteConfig.url}/tiktok`,
  },
};

const links = [
  {
    href: "/",
    label: "Full Portfolio",
    sub: "ganeshshah.com",
    icon: ArrowUpRight,
  },
  {
    href: "/projects",
    label: "Projects",
    sub: "BolKharcha · NayaMenu · P2P",
    icon: FolderKanban,
  },
  {
    href: "/blogs",
    label: "Blogs",
    sub: "Build · Design · Ship",
    icon: Newspaper,
  },
  {
    href: "/about",
    label: "About",
    sub: "Skills · Education · GitHub",
    icon: Code2,
  },
];

export default function TikTokPage() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-black px-4 py-10 text-white sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-[#e53935]/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 size-72 rounded-full bg-white/5 blur-3xl"
      />

      <main className="relative z-10 flex w-full max-w-md flex-1 flex-col items-center">
        <div className="relative size-24 overflow-hidden rounded-full border-2 border-[#e53935]/50 bg-black shadow-[0_0_40px_-8px_rgba(229,57,53,0.55)] sm:size-28">
          <Image
            src="/fev.png"
            alt="Ganesh Shah"
            fill
            priority
            className="object-cover"
            sizes="112px"
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
          Ganesh Shah
        </h1>
        <p className="mt-1 text-sm font-medium text-[#e53935]">
          {socialLinks.tiktokHandle}
        </p>
        <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-white/55">
          Full-stack developer &amp; UI/UX creator from Nepal. Building apps,
          shipping in public.
        </p>

        <a
          href={socialLinks.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-black transition-opacity hover:opacity-90"
        >
          Follow on TikTok
          <ArrowUpRight className="size-3.5" />
        </a>

        <div className="mt-8 w-full space-y-3">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 transition-colors hover:border-[#e53935]/40 hover:bg-white/[0.06]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black text-white/70 transition-colors group-hover:border-[#e53935]/40 group-hover:text-[#e53935]">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-sm font-semibold text-white">
                    {item.label}
                  </span>
                  <span className="block text-xs text-white/40">{item.sub}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#e53935]" />
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[11px] uppercase tracking-[0.2em] text-white/30">
          Add to TikTok bio
        </p>
        <p className="mt-2 select-all rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-center text-sm text-white/70">
          ganeshshah.com/tiktok
        </p>
      </main>

      <p className="relative z-10 mt-10 text-[10px] uppercase tracking-[0.18em] text-white/25">
        ganeshshah.com
      </p>
    </div>
  );
}
