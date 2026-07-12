import type { Metadata } from "next";

import { AboutSection } from "@/components/about-section";
import { BlogsSection } from "@/components/blogs-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { SvgTextBand } from "@/components/svg-text-band";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Ganesh Shah | Full-Stack Developer — ganeshshah.com",
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Ganesh Shah | Official Portfolio — ganeshshah.com",
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />

      <SvgTextBand text="PROJECTS · BUILD · SHIP · ITERATE ·" />
      <ProjectsSection showViewAll />

      <SvgTextBand text="ABOUT · CRAFT · PROCESS · DETAIL ·" />
      <AboutSection />

      <SvgTextBand text="BLOGS · LEARN · WRITE · EXPLORE ·" />
      <BlogsSection showViewAll />

      <Footer />
    </div>
  );
}
