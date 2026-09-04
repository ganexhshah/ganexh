import type { Metadata } from "next";
import type { SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  FolderKanban,
  Mail,
  Newspaper,
  Trophy,
} from "lucide-react";

import { Icons } from "@/components/icons";
import { achievements } from "@/data/achievements";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";

import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "TikTok @_ganexx — Ganesh Shah | Tech & Dev Socials",
  description:
    "Connect with Ganesh Shah on TikTok (@_ganexx) — tech content, developer life, project builds, and tutorials from Nepal on ganeshshah.com.",
  keywords: [
    "Ganesh Shah TikTok",
    "@_ganexx",
    "Ganesh Shah @_ganexx",
    "Ganesh Shah developer",
    "ganeshshah.com",
    "ganexhshah",
  ],
  alternates: { canonical: `${siteConfig.url}/tiktok` },
  openGraph: {
    title: "TikTok @_ganexx — Ganesh Shah | Tech & Dev Socials",
    description:
      "Follow @_ganexx on TikTok. Explore the full portfolio at ganeshshah.com.",
    url: `${siteConfig.url}/tiktok`,
    siteName: "Ganesh Shah — Official Website",
    images: [{ url: "/tiktok-avatar.jpeg", alt: "Ganesh Shah @_ganexx" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Shah on TikTok — @_ganexx",
    description: "Follow Ganesh Shah on TikTok (@_ganexx).",
    images: ["/tiktok-avatar.jpeg"],
  },
};

type IconProps = SVGProps<SVGSVGElement>;

function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.79a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const socials = [
  {
    label: "TikTok",
    href: socialLinks.tiktok,
    icon: TikTokIcon,
  },
  {
    label: "GitHub",
    href: socialLinks.github,
    icon: Icons.gitHub,
  },
  {
    label: "LinkedIn",
    href: socialLinks.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: socialLinks.instagram,
    icon: InstagramIcon,
  },
  {
    label: "Email",
    href: socialLinks.mailto,
    icon: Mail,
  },
] as const;

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
    href: "/achievements",
    label: "Achievements",
    sub: "Game Jam Winner · Daydream",
    icon: Trophy,
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "TikTok @_ganexx", url: `${siteConfig.url}/tiktok` },
        ]}
      />
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
            src="/tiktok-avatar.jpeg"
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

        <div className="mt-6 flex w-full max-w-sm items-start justify-between gap-1 sm:gap-2">
          {socials.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={item.label}
                className="group flex min-w-0 flex-1 flex-col items-center gap-2"
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 transition-colors group-hover:border-[#e53935]/50 group-hover:bg-white/[0.08] group-hover:text-white">
                  <Icon className="size-4" />
                </span>
                <span className="w-full truncate text-center text-[10px] font-medium uppercase tracking-[0.08em] text-white/45 transition-colors group-hover:text-white/80">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="mt-8 w-full space-y-3">
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Achievements
          </p>
          {achievements.map((item) => (
            <Link
              key={item.id}
              href={`/achievements/${item.id}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-[#e53935]/40 hover:bg-white/[0.06]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 448px) 100vw, 448px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#e53935]/40 bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#e53935] backdrop-blur-sm">
                  <Trophy className="size-3" />
                  {item.badge}
                </span>
              </div>
              <div className="flex items-start gap-3 px-4 py-4">
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-sm font-semibold text-white">
                    {item.event}
                  </span>
                  <span className="mt-0.5 block text-xs text-white/40">
                    {item.subtitle}
                  </span>
                </span>
                <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#e53935]" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 w-full space-y-3">
          <p className="px-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
            Explore
          </p>
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
      </main>

      <p className="relative z-10 mt-10 text-[10px] uppercase tracking-[0.18em] text-white/25">
        ganeshshah.com
      </p>
    </div>
  );
}
