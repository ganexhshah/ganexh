import type { Metadata } from "next";

import { BlogsSection } from "@/components/blogs-section";
import { PageShell } from "@/components/page-shell";
import { type BlogPost } from "@/data/blogs";
import { siteConfig } from "@/data/site";
import { sanityFetch } from "@/sanity/lib/client";
import { blogsQuery } from "@/sanity/lib/queries";

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

export default async function BlogsPage() {
  let sanityBlogs: BlogPost[] | undefined;

  try {
    const bData = await sanityFetch({ query: blogsQuery });
    if (Array.isArray(bData) && bData.length > 0) {
      sanityBlogs = bData.map((b: any) => ({
        id: b.slug || b.id || b._id,
        title: b.title,
        description: b.description || "",
        image: b.coverImage || "/blogs/thumb-1.jpg",
        href: `/blogs/${b.slug || b.id}`,
        category: (b.tags?.[0] || "develop") as any,
        accent: "from-red-500/30 to-rose-700/20",
        date: b.publishedAt
          ? new Date(b.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "2026",
        readTime: b.readTime || "5 min read",
        content:
          typeof b.content === "string"
            ? b.content.split("\n\n")
            : b.content || [],
      }));
    }
  } catch (err) {
    console.warn("Sanity fetch fallback:", err);
  }

  return (
    <PageShell>
      <BlogsSection initialBlogs={sanityBlogs} />
    </PageShell>
  );
}
