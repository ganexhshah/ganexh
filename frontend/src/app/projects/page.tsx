import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { ProjectsGrid } from "@/components/projects-grid";
import { ProjectsSection } from "@/components/projects-section";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Ganesh Shah on ganeshshah.com — Scrim, NotesChaiyo, RestroPRO, BolKharcha, NayaMenu, P2P Share, and more full-stack work.",
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: "Projects — Ganesh Shah | ganeshshah.com",
    description:
      "Scrim, NotesChaiyo, RestroPRO, BolKharcha, NayaMenu, P2P Share, and selected full-stack projects.",
    url: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <ProjectsSection />

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
