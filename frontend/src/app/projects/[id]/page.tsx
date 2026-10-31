import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { getProject } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/json-ld";
import { ProjectGallery } from "@/components/project-gallery";

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

      <article className="mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/#recent-work"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Recent Work
          </Link>
        </div>

        {/* Project Landing Hero Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-md border border-neutral-800 bg-neutral-900 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-300">
              {project.client}
            </span>
            <span className="rounded-md border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 text-xs text-neutral-400">
              {project.status}
            </span>
            <span className="text-xs text-neutral-500">·</span>
            <span className="text-xs text-neutral-400">{project.year}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {(project.liveDemo || project.github) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition-opacity hover:opacity-90"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  GitHub Repository
                </a>
              )}
            </div>
          )}
        </div>

        {/* Project Main Showcase Image */}
        <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 sm:mt-10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            loading="lazy"
            unoptimized={project.image.includes(".svg")}
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Project Overview Content */}
        {project.content && project.content.length > 0 && (
          <div className="mt-12 space-y-4 border-t border-neutral-800 pt-8">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              About the Project
            </h2>
            <div className="space-y-4">
              {project.content.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-neutral-300 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Key Features Grid */}
        {project.features && project.features.length > 0 && (
          <div className="mt-12 border-t border-neutral-800 pt-8">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Key Features
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {project.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2.5 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3.5"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-neutral-400" />
                  <span className="text-xs font-medium text-neutral-200 sm:text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Screens Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <ProjectGallery
            gallery={project.gallery}
            projectTitle={project.title}
          />
        )}
      </article>
    </PageShell>
  );
}
