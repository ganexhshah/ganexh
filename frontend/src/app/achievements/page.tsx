import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { achievements } from "@/data/achievements";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Achievements by Ganesh Shah — Daydream Biratnagar Game Jam winner and more milestones from ganeshshah.com.",
  alternates: { canonical: `${siteConfig.url}/achievements` },
  openGraph: {
    title: "Achievements — Ganesh Shah | ganeshshah.com",
    description:
      "24-hour game jam wins, milestones, and highlights from Ganesh Shah’s journey.",
    url: `${siteConfig.url}/achievements`,
    images: [
      {
        url: "/achievements/daydream-biratnagar.jpg",
        alt: "Daydream Biratnagar Game Jam",
      },
    ],
  },
};

export default function AchievementsPage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden border-b border-white/10 px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[#e53935]/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e53935]">
            <Trophy className="size-3.5" />
            Achievements
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Wins, growth &amp; pressure-tested builds
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-base">
            From 24-hour game jams to shipped products — moments that proved what
            focused teams can create.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {achievements.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <Link
                href={`/achievements/${item.id}`}
                className="group grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-[#e53935]/35 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
              >
                <div className="relative aspect-[16/11] sm:aspect-auto sm:min-h-[280px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={index === 0}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/40" />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <span className="w-fit rounded-full border border-[#e53935]/40 bg-[#e53935]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e53935]">
                    {item.badge}
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                    {item.event} · {item.year}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {item.subtitle}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-white/35">
                    24-hour game development challenge
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#e53935] transition-transform group-hover:translate-x-0.5">
                    Read the story
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
