import Image from "next/image";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { UtterancesComments } from "@/components/utterances-comments";
import { blogCategories, getBlogPost, type BlogPost } from "@/data/blogs";
import { siteConfig } from "@/data/site";
import { sanityFetch } from "@/sanity/lib/client";
import { blogBySlugQuery, blogsQuery } from "@/sanity/lib/queries";

import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { TableOfContents, type TocItem } from "@/components/table-of-contents";

type BlogDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function fetchBlog(slug: string): Promise<BlogPost | undefined> {
  try {
    const sanityPost = await sanityFetch({
      query: blogBySlugQuery,
      params: { slug },
    });
    if (sanityPost) {
      const fallbackBlog = getBlogPost(sanityPost.slug || sanityPost.id);
      return {
        id: sanityPost.slug || sanityPost.id || sanityPost._id,
        title: sanityPost.title,
        description: sanityPost.description || fallbackBlog?.description || "",
        image: sanityPost.coverImage || fallbackBlog?.image || "/blogs/thumb-1.jpg",
        href: `/blogs/${sanityPost.slug || sanityPost.id}`,
        category: (sanityPost.tags?.[0] || fallbackBlog?.category || "develop") as any,
        accent: fallbackBlog?.accent || "from-red-500/30 to-rose-700/20",
        date: sanityPost.publishedAt
          ? new Date(sanityPost.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : fallbackBlog?.date || "2026",
        readTime: sanityPost.readTime || fallbackBlog?.readTime || "5 min read",
        content:
          typeof sanityPost.content === "string"
            ? sanityPost.content.split("\n\n")
            : sanityPost.content || fallbackBlog?.content || [],
        tags: Array.isArray(sanityPost.tags) ? sanityPost.tags : fallbackBlog?.tags || [],
      };
    }
  } catch (err) {
    console.warn("Sanity fetch blog by slug fallback:", err);
  }

  return getBlogPost(slug);
}

export async function generateStaticParams() {
  const { blogPosts } = await import("@/data/blogs");
  try {
    const sanityBlogs = await sanityFetch({ query: blogsQuery });
    if (Array.isArray(sanityBlogs) && sanityBlogs.length > 0) {
      const slugs = new Set<string>();
      sanityBlogs.forEach((b: any) => {
        if (b.slug) slugs.add(b.slug);
        if (b.id) slugs.add(b.id);
      });
      blogPosts.forEach((p) => slugs.add(p.id));
      return Array.from(slugs).map((id) => ({ id }));
    }
  } catch {
    // fallback
  }
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const post = await fetchBlog(id);
  if (!post) return { title: "Blog Not Found | Ganesh Shah" };

  const url = `${siteConfig.url}/blogs/${post.id}`;

  return {
    title: `${post.title} — Ganesh Shah`,
    description: `${post.description} Written by Ganesh Shah (ganeshshah.com).`,
    keywords: [
      post.title,
      `${post.title} Ganesh Shah`,
      "Ganesh Shah blog",
      "Ganesh Shah article",
      "ganeshshah.com",
      post.category,
      ...(post.tags || []),
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} — Ganesh Shah`,
      description: post.description,
      url,
      siteName: "Ganesh Shah — Official Website",
      images: [{ url: post.image, alt: `${post.title} by Ganesh Shah` }],
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Ganesh Shah`,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const post = await fetchBlog(id);

  if (!post) notFound();

  const url = `${siteConfig.url}/blogs/${post.id}`;
  const categoryLabel =
    blogCategories.find((category) => category.id === post.category)?.label ??
    post.category;

  const tocItems: TocItem[] = [];
  const blockIds = new Map<number, string>();
  const seen = new Map<string, number>();

  post.content.forEach((paragraph, index) => {
    const trimmed = paragraph.trim();
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      const isH2 = trimmed.startsWith("## ");
      const rawTitle = trimmed.replace(/^###?\s+/, "");
      let id = slugifyHeading(rawTitle);
      const count = seen.get(id) || 0;
      seen.set(id, count + 1);
      if (count > 0) {
        id = `${id}-${count}`;
      }
      blockIds.set(index, id);
      tocItems.push({
        id,
        title: rawTitle,
        level: isH2 ? 2 : 3,
      });
    }
  });

  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "Blogs", url: `${siteConfig.url}/blogs` },
          { name: post.title, url },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={url}
        image={post.image}
        datePublished={post.date}
      />
      <article className="mx-auto max-w-3xl px-4 pb-16 pt-4 sm:px-8 sm:pt-6">
        <ScrollReveal
          scale={0.98}
          y={20}
          className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-white/45">
            <span className="rounded-full border border-[#e53935]/40 px-3 py-1 text-[#e53935]">
              {categoryLabel}
            </span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-base leading-relaxed text-white/70 sm:text-lg">
            {post.description}
          </p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </ScrollReveal>

        {tocItems.length > 0 && (
          <ScrollReveal delay={0.15} y={16}>
            <TableOfContents items={tocItems} />
          </ScrollReveal>
        )}

        <div className="mt-10 space-y-4 border-t border-white/10 pt-10">
          {post.content.map((paragraph, index) => (
            <ScrollReveal key={`${index}-${paragraph.slice(0, 16)}`} delay={Math.min(index * 0.02, 0.3)} y={16}>
              {renderContentBlock(paragraph, index, blockIds.get(index))}
            </ScrollReveal>
          ))}
        </div>
        <UtterancesComments issueTerm={url} />
      </article>
    </PageShell>
  );
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/^#+\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function renderContentBlock(content: string, key: string | number, headingId?: string) {
  const trimmed = content.trim();

  if (trimmed.startsWith("## ")) {
    const title = trimmed.replace(/^##\s+/, "");
    const id = headingId || slugifyHeading(title);
    return (
      <h2
        key={key}
        id={id}
        className="group mt-12 mb-4 scroll-mt-24 border-b border-white/10 pb-3 text-2xl font-bold tracking-tight text-white"
      >
        <a href={`#${id}`} className="inline-flex items-center gap-2 transition-colors hover:text-[#e53935]">
          <span>{title}</span>
          <span className="text-xs font-normal text-white/30 opacity-0 transition-opacity group-hover:opacity-100">#</span>
        </a>
      </h2>
    );
  }

  if (trimmed.startsWith("### ")) {
    const title = trimmed.replace(/^###\s+/, "");
    const id = headingId || slugifyHeading(title);
    return (
      <h3
        key={key}
        id={id}
        className="group mt-8 mb-3 flex scroll-mt-24 items-center gap-2.5 text-lg font-bold tracking-tight text-white/95"
      >
        <span className="size-2 rounded-full bg-[#e53935]" />
        <a href={`#${id}`} className="inline-flex items-center gap-2 transition-colors hover:text-[#e53935]">
          <span>{title}</span>
          <span className="text-xs font-normal text-white/30 opacity-0 transition-opacity group-hover:opacity-100">#</span>
        </a>
      </h3>
    );
  }

  if (trimmed.startsWith("[BLOCKER]") || trimmed.startsWith("> [!IMPORTANT]") || trimmed.startsWith("Critical:")) {
    return (
      <div key={key} className="my-6 rounded-2xl border border-[#e53935]/40 bg-[#e53935]/10 p-5 text-sm text-red-200 backdrop-blur-sm sm:text-base">
        <span className="font-bold uppercase tracking-wider text-[#e53935]">CRITICAL GATE: </span>
        {formatInlineMarkdown(trimmed.replace(/^(\[BLOCKER\]|> \[!IMPORTANT\]|Critical:)\s*/, ""))}
      </div>
    );
  }

  if (trimmed.startsWith("> ")) {
    return (
      <blockquote key={key} className="my-5 border-l-2 border-[#e53935] bg-white/[0.02] py-2 pl-4 pr-3 text-sm italic text-white/75 sm:text-base">
        {formatInlineMarkdown(trimmed.replace(/^>\s*/, ""))}
      </blockquote>
    );
  }

  const lines = trimmed.split("\n");
  if (lines.some((l) => l.trim().startsWith("- ") || l.trim().startsWith("• ") || /^\d+\.\s/.test(l.trim()))) {
    return (
      <ul key={key} className="my-3 space-y-1.5 pl-1 text-sm leading-relaxed text-white/70 sm:text-base">
        {lines.map((line, idx) => {
          const lTrimmed = line.trim();
          if (!lTrimmed) return null;
          const clean = lTrimmed.replace(/^[-•]\s+|\d+\.\s+/, "");
          return (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#e53935]/70" />
              <span>{formatInlineMarkdown(clean)}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <p key={key} className="my-3 text-sm leading-relaxed text-white/65 sm:text-base">
      {formatInlineMarkdown(trimmed)}
    </p>
  );
}

function formatInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-white/90">
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e53935] underline underline-offset-4 transition-colors hover:text-white"
        >
          {linkMatch[1]}
        </a>
      );
    }
    return part;
  });
}

