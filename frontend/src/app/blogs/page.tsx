import type { Metadata } from "next";
import Link from "next/link";

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

      <div className="pb-12 text-center">
        <Link
          href="/"
          className="text-sm text-white/50 transition-colors hover:text-white"
        >
          ← Back to home
        </Link>
      </div>
    </PageShell>
  );
}
