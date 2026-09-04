import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Trophy } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { achievements, getAchievement } from "@/data/achievements";
import { siteConfig } from "@/data/site";

import { BreadcrumbJsonLd } from "@/components/json-ld";

type AchievementDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return achievements.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: AchievementDetailPageProps) {
  const { id } = await params;
  const item = getAchievement(id);
  if (!item) return { title: "Achievement Not Found | Ganesh Shah" };

  const url = `${siteConfig.url}/achievements/${item.id}`;

  return {
    title: `${item.title} — Ganesh Shah | Achievements`,
    description: `${item.badge} — ${item.subtitle} Won by Ganesh Shah (ganeshshah.com).`,
    keywords: [
      item.title,
      `${item.title} Ganesh Shah`,
      item.event,
      "Ganesh Shah achievement",
      "Ganesh Shah award",
      "ganeshshah.com",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${item.title} — Ganesh Shah | Achievements`,
      description: item.subtitle,
      url,
      siteName: "Ganesh Shah — Official Website",
      images: [{ url: item.image, alt: `${item.title} - Ganesh Shah` }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Ganesh Shah`,
      description: item.subtitle,
      images: [item.image],
    },
  };
}

export default async function AchievementDetailPage({
  params,
}: AchievementDetailPageProps) {
  const { id } = await params;
  const item = getAchievement(id);

  if (!item) notFound();

  const url = `${siteConfig.url}/achievements/${item.id}`;

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Achievements", url: `${siteConfig.url}/achievements` },
          { name: item.title, url },
        ]}
      />
      <article className="mx-auto max-w-4xl px-4 pb-16 pt-4 sm:px-8 sm:pt-6">
        <ScrollReveal
          scale={0.98}
          y={20}
          className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e53935]/40 bg-[#e53935]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e53935]">
              <Trophy className="size-3" />
              {item.badge}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
              {item.year}
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e53935]">
            {item.event}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {item.title}
          </h1>
          <p className="text-lg text-white/60 sm:text-xl">{item.subtitle}</p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
            24-hour game development challenge
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.14} className="mt-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {item.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  {stat.label}
                </p>
                <p className="mt-1.5 text-sm font-medium text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.16} className="mt-12 space-y-5">
          <h2 className="text-xl font-semibold text-white">The journey</h2>
          {item.story.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="text-sm leading-relaxed text-white/60 sm:text-base"
            >
              {paragraph}
            </p>
          ))}
        </ScrollReveal>

        <ScrollReveal delay={0.18} className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e53935]">
            Game jam highlights
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            “{item.tagline}”
          </p>
          <ul className="mt-6 space-y-3">
            {item.highlights.map((line) => (
              <li
                key={line}
                className="flex gap-3 text-sm text-white/60 sm:text-base"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#e53935]" />
                {line}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-14">
          <h2 className="text-xl font-semibold text-white">Dream team</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/50">
            Three passionate developers who came together to create something
            extraordinary in just 24 hours.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {item.team.map((member) => (
              <div
                key={member.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex size-12 items-center justify-center rounded-full border border-[#e53935]/35 bg-[#e53935]/10 text-sm font-bold text-[#e53935]">
                  {member.initials}
                </div>
                <p className="mt-4 font-semibold text-white">{member.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/40">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.22} className="mt-14">
          <h2 className="text-xl font-semibold text-white">Tech &amp; tools</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/50">
            Cutting-edge technologies that powered our 24-hour development
            marathon.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tech.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white/65"
              >
                {tool}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/45">
            This game jam wasn’t about the prize — it was about growth under
            pressure.
          </p>
          <Link
            href="/achievements"
            className="mt-4 inline-block text-sm text-[#e53935] transition-opacity hover:opacity-80"
          >
            ← All achievements
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
