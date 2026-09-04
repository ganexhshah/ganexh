import type { Metadata } from "next";

import { AboutSection } from "@/components/about-section";
import { BlogsSection } from "@/components/blogs-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SvgTextBand } from "@/components/svg-text-band";
import { getBlogPost, type BlogPost } from "@/data/blogs";
import { getProject, type Project } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { sanityFetch } from "@/sanity/lib/client";
import { blogsQuery, projectsQuery } from "@/sanity/lib/queries";

import { SeoFaqSection } from "@/components/seo-faq";

export const metadata: Metadata = {
  title: "Ganesh Shah — Full-Stack Developer & Software Engineer | Official Website",
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Ganesh Shah — Full-Stack Developer & Software Engineer | Official Website",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Ganesh Shah — Official Website",
  },
};

export default async function Home() {
  let sanityProjects: Project[] | undefined;
  let sanityBlogs: BlogPost[] | undefined;

  try {
    const [pData, bData] = await Promise.all([
      sanityFetch({ query: projectsQuery }),
      sanityFetch({ query: blogsQuery }),
    ]);

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

    if (Array.isArray(bData) && bData.length > 0) {
      sanityBlogs = bData.map((b: any) => {
        const fallbackBlog = getBlogPost(b.slug || b.id);
        return {
          id: b.slug || b.id || b._id,
          title: b.title,
          description: b.description || fallbackBlog?.description || "",
          image: b.coverImage || fallbackBlog?.image || "/blogs/thumb-1.jpg",
          href: `/blogs/${b.slug || b.id}`,
          category: (b.tags?.[0] || fallbackBlog?.category || "develop") as any,
          accent: fallbackBlog?.accent || "from-red-500/30 to-rose-700/20",
          date: b.publishedAt
            ? new Date(b.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : fallbackBlog?.date || "2026",
          readTime: b.readTime || fallbackBlog?.readTime || "5 min read",
          content:
            typeof b.content === "string"
              ? b.content.split("\n\n")
              : b.content || fallbackBlog?.content || [],
        };
      });
    }
  } catch (err) {
    console.warn("Sanity fetch fallback:", err);
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <HeroSection />

      <SvgTextBand text="PROJECTS · BUILD · SHIP · ITERATE ·" />
      <ProjectsSection showViewAll initialProjects={sanityProjects} />

      <SvgTextBand text="ABOUT · CRAFT · PROCESS · DETAIL ·" />
      <AboutSection />

      <SvgTextBand text="BLOGS · LEARN · WRITE · EXPLORE ·" />
      <BlogsSection showViewAll initialBlogs={sanityBlogs} />

      <SvgTextBand text="FAQ · KNOWLEDGE · ABOUT · CONNECT ·" />
      <SeoFaqSection />

      <Footer />
    </div>
  );
}
