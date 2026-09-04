import type { MetadataRoute } from "next";

import { achievements } from "@/data/achievements";
import { blogPosts } from "@/data/blogs";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { sanityFetch } from "@/sanity/lib/client";
import { blogsQuery, projectsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/achievements`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/tiktok`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Merge static project IDs with dynamic Sanity project IDs
  const projectIds = new Set<string>(projects.map((p) => p.id));
  try {
    const sanityProjects = await sanityFetch({ query: projectsQuery });
    if (Array.isArray(sanityProjects)) {
      for (const p of sanityProjects) {
        const id = p.slug || p.id;
        if (id) projectIds.add(id);
      }
    }
  } catch (err) {
    console.warn("Sitemap: Sanity projects fetch fallback", err);
  }

  const projectRoutes: MetadataRoute.Sitemap = Array.from(projectIds).map((id) => ({
    url: `${siteConfig.url}/projects/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Merge static blog IDs with dynamic Sanity blog IDs
  const blogIds = new Set<string>(blogPosts.map((b) => b.id));
  try {
    const sanityBlogs = await sanityFetch({ query: blogsQuery });
    if (Array.isArray(sanityBlogs)) {
      for (const b of sanityBlogs) {
        const id = b.slug || b.id;
        if (id) blogIds.add(id);
      }
    }
  } catch (err) {
    console.warn("Sitemap: Sanity blogs fetch fallback", err);
  }

  const blogRoutes: MetadataRoute.Sitemap = Array.from(blogIds).map((id) => ({
    url: `${siteConfig.url}/blogs/${id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const achievementRoutes: MetadataRoute.Sitemap = achievements.map((item) => ({
    url: `${siteConfig.url}/achievements/${item.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...achievementRoutes,
  ];
}
