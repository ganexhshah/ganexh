import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AboutSection } from "@/components/about-section";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/data/site";
import { contactLinks, socialLinks } from "@/data/social";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ganesh Shah — education, skills, GitHub activity, and philosophy. Full-stack developer from Nepal at ganeshshah.com.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About Ganesh Shah — ganeshshah.com",
    description:
      "Education, skills, and the story behind Ganesh Shah’s work.",
    url: `${siteConfig.url}/about`,
    images: [{ url: "/tiktok-avatar.jpeg", alt: "Ganesh Shah" }],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-white/10 px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[#e53935]/15 blur-3xl"
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="relative size-28 overflow-hidden rounded-full border-2 border-[#e53935]/50 bg-black shadow-[0_0_48px_-10px_rgba(229,57,53,0.55)] sm:size-32">
            <Image
              src="/tiktok-avatar.jpeg"
              alt="Ganesh Shah"
              fill
              priority
              className="object-cover"
              sizes="128px"
            />
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e53935]">
            About
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ganesh Shah
          </h1>
          <p className="mt-1 text-sm text-white/45">
            Full-Stack Developer &amp; UI/UX Creator · Nepal
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
            I design and build stylish, user-focused web and mobile experiences
            — from AI finance apps like BolKharcha to restaurant systems and
            privacy-first tools. Shipping in public as{" "}
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e53935] transition-opacity hover:opacity-80"
            >
              {socialLinks.tiktokHandle}
            </a>
            .
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-[#e53935]/40 hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="size-3" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <AboutSection />
    </PageShell>
  );
}
