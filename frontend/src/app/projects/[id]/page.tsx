import Image from "next/image";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getProject } from "@/data/projects";
import { siteConfig } from "@/data/site";

import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/json-ld";

type ProjectDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { projects } = await import("@/data/projects");
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Project Not Found | Ganesh Shah" };

  const url = `${siteConfig.url}/projects/${project.id}`;

  return {
    title: `${project.client} — ${project.title} | Ganesh Shah`,
    description: `${project.description} Engineered by Ganesh Shah (ganeshshah.com).`,
    keywords: [
      project.client,
      `${project.client} Ganesh Shah`,
      "Ganesh Shah project",
      "Ganesh Shah developer",
      "Ganesh Shah portfolio",
      ...project.techStack,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${project.client} — ${project.title} | Ganesh Shah`,
      description: project.description,
      url,
      siteName: "Ganesh Shah — Official Website",
      images: [{ url: project.image, alt: `${project.title} by Ganesh Shah` }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.client} | Ganesh Shah`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProject(id);

  if (!project) notFound();

  const url = `${siteConfig.url}/projects/${project.id}`;

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Projects", url: `${siteConfig.url}/projects` },
          { name: project.client, url },
        ]}
      />
      <ProjectJsonLd
        title={`${project.client} — ${project.title}`}
        description={project.description}
        url={url}
        image={project.image}
      />
      <article className="mx-auto max-w-4xl px-4 pb-16 pt-4 sm:px-8 sm:pt-6">
        <ScrollReveal
          scale={0.98}
          y={20}
          className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-black"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {project.featured && (
              <span className="rounded-full border border-[#e53935]/40 bg-[#e53935]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e53935]">
                Featured Project
              </span>
            )}
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
              {project.status}
            </span>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e53935]">
            {project.client}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/45">
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.role}</span>
          </div>
          <p className="text-base leading-relaxed text-white/70 sm:text-lg">
            {project.description}
          </p>

          {(project.liveDemo || project.github) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-[#e53935] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  GitHub
                </a>
              )}
            </div>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-10 border-t border-white/10 pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e53935]">
            Tech Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 space-y-5 border-t border-white/10 pt-10">
          {project.content.map((paragraph, index) => (
            <ScrollReveal key={paragraph} delay={index * 0.06} y={20}>
              <p className="text-sm leading-relaxed text-white/55 sm:text-base">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <ScrollReveal delay={0.08} className="mt-12 border-t border-white/10 pt-10">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e53935]">
              Product screens
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((shot) => (
                <div
                  key={shot.src}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white"
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    loading="lazy"
                    className="object-contain"
                    sizes="(max-width: 896px) 100vw, 440px"
                  />
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.1} className="mt-12 border-t border-white/10 pt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e53935]">
            Key Features
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70"
              >
                {feature}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-12 border-t border-white/10 pt-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e53935]">
            Technical Challenges
          </h2>
          <div className="mt-5 space-y-5">
            {project.challenges.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
              >
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#e53935]">
                  Challenge
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/50">
                  {item.challenge}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#e53935]">
                  Solution
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/50">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </article>
    </PageShell>
  );
}
