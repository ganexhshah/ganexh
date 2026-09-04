import Image from "next/image";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { UtterancesComments } from "@/components/utterances-comments";
import { blogCategories, getBlogPost } from "@/data/blogs";
import { siteConfig } from "@/data/site";

import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";

type BlogDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const { blogPosts } = await import("@/data/blogs");
  return blogPosts.map((post) => ({ id: post.id }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { id } = await params;
  const post = getBlogPost(id);
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
  const post = getBlogPost(id);

  if (!post) notFound();

  const url = `${siteConfig.url}/blogs/${post.id}`;
  const categoryLabel =
    blogCategories.find((category) => category.id === post.category)?.label ??
    post.category;

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
          className={`relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${post.accent}`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover mix-blend-overlay opacity-90"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.12} className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-white/45">
            <span className="rounded-full border border-[#e53935]/40 px-3 py-1 text-[#e53935]">
              {categoryLabel}
            </span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-base leading-relaxed text-white/70 sm:text-lg">
            {post.description}
          </p>
        </ScrollReveal>

        <div className="mt-10 space-y-5 border-t border-white/10 pt-10">
          {post.content.map((paragraph, index) => (
            <ScrollReveal key={paragraph} delay={index * 0.06} y={20}>
              <p className="text-sm leading-relaxed text-white/55 sm:text-base">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
        <UtterancesComments issueTerm={url} />
      </article>
    </PageShell>
  );
}
