import type { Metadata } from "next";

import { BlogsSection } from "@/components/blogs-section";
import { PageShell } from "@/components/page-shell";
import { type BlogPost } from "@/data/blogs";
import { siteConfig } from "@/data/site";
import { sanityFetch } from "@/sanity/lib/client";
import { blogsQuery } from "@/sanity/lib/queries";

import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Blogs & Articles by Ganesh Shah — Full-Stack Development & Tech",
  description:
    "Read articles, tutorials, and engineering insights by Ganesh Shah (ganeshshah.com) — covering full-stack development, Node.js, NestJS, Next.js, and product shipping.",
  keywords: [
    "Ganesh Shah blog",
    "Ganesh Shah articles",
    "Ganesh Shah tutorials",
    "Ganesh Shah developer",
    "Ganesh Shah tech",
    "ganeshshah.com",
    "ganexhshah",
  ],
  alternates: { canonical: `${siteConfig.url}/blogs` },
  openGraph: {
    title: "Blogs & Articles by Ganesh Shah — Full-Stack Development & Tech",
    description:
      "Read articles, tutorials, and engineering insights by Ganesh Shah (ganeshshah.com).",
    url: `${siteConfig.url}/blogs`,
    siteName: "Ganesh Shah — Official Website",
    images: [{ url: "/blogs/thumb-1.jpg", alt: "Ganesh Shah Articles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs & Articles by Ganesh Shah",
    description: "Read engineering articles and insights by Ganesh Shah on ganeshshah.com.",
    images: ["/blogs/thumb-1.jpg"],
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
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blogs", url: `${siteConfig.url}/blogs` },
        ]}
      />
      <BlogsSection initialBlogs={sanityBlogs} />
    </PageShell>
  );
}
