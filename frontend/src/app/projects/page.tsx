import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { ProjectsGrid } from "@/components/projects-grid";
import { ProjectsSection } from "@/components/projects-section";
import { getProject, type Project } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { sanityFetch } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";

import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Projects by Ganesh Shah — Full-Stack & Software Portfolio",
  description:
    "Explore production software projects built by Ganesh Shah (ganeshshah.com) — including Scrim, NotesChaiyo, BolKharcha, RestroPRO, NayaMenu, and P2P Share.",
  keywords: [
    "Ganesh Shah projects",
    "Projects by Ganesh Shah",
    "Ganesh Shah portfolio",
    "Scrim Ganesh Shah",
    "NotesChaiyo Ganesh Shah",
    "BolKharcha Ganesh Shah",
    "RestroPRO Ganesh Shah",
    "Ganesh Shah developer",
    "ganeshshah.com",
  ],
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: "Projects by Ganesh Shah — Full-Stack & Software Portfolio",
    description:
      "Explore production software projects built by Ganesh Shah (ganeshshah.com) — Scrim, NotesChaiyo, BolKharcha, RestroPRO, and more.",
    url: `${siteConfig.url}/projects`,
    siteName: "Ganesh Shah — Official Website",
    images: [{ url: "/projects/bolkharcha.jpg", alt: "Ganesh Shah Software Projects" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects by Ganesh Shah — Full-Stack & Software Portfolio",
    description: "Explore software projects built by Ganesh Shah on ganeshshah.com.",
    images: ["/projects/bolkharcha.jpg"],
  },
};

export default async function ProjectsPage() {
  let sanityProjects: Project[] | undefined;

  try {
    const pData = await sanityFetch({ query: projectsQuery });
    if (Array.isArray(pData) && pData.length > 0) {
      sanityProjects = pData.map((p: any) => {
        const fallbackProject = getProject(p.slug || p.id);
        return {
          id: p.slug || p.id || p._id,
          client: p.client || fallbackProject?.client || p.title,
          title: p.title,
          description: p.description || fallbackProject?.description || "",
          image: p.image || fallbackProject?.image || "/projects/scrim.png",
          href: `/projects/${p.slug || p.id}`,
          year: p.year || fallbackProject?.year || "2026",
          role: p.role || fallbackProject?.role || "Developer",
          status: p.status || fallbackProject?.status || "Completed",
          featured: Boolean(p.featured),
          techStack: p.techStack || fallbackProject?.techStack || [],
          content: p.content || fallbackProject?.content || [],
          features: p.features || fallbackProject?.features || [],
          challenges: p.challenges || fallbackProject?.challenges || [],
          liveDemo: p.liveDemo || fallbackProject?.liveDemo,
          github: p.github || fallbackProject?.github,
          gallery: p.gallery || fallbackProject?.gallery || [],
        };
      });
    }
  } catch (err) {
    console.warn("Sanity fetch fallback:", err);
  }

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Projects", url: `${siteConfig.url}/projects` },
        ]}
      />
      <ProjectsSection initialProjects={sanityProjects} />

      <section className="border-t border-white/10 px-4 pb-16 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-2xl font-semibold text-white sm:text-3xl">
            All Projects
          </h2>
          <ProjectsGrid />
        </div>
      </section>
    </PageShell>
  );
}
