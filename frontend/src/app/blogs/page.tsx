import type { Metadata } from "next";

import { BlogsSection } from "@/components/blogs-section";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Blogs by Ganesh Shah on ganeshshah.com — development, design, BolKharcha, React Native, and building in public.",
  alternates: { canonical: `${siteConfig.url}/blogs` },
  openGraph: {
    title: "Blogs — Ganesh Shah | ganeshshah.com",
    description:
      "Articles on development, design, AI finance apps, and shipping solo.",
    url: `${siteConfig.url}/blogs`,
  },
};

export default function BlogsPage() {
  return (
    <PageShell>
      <BlogsSection />
    </PageShell>
  );
}
