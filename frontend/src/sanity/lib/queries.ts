import { defineQuery } from "next-sanity";

// Projects Queries
export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(year desc, _createdAt desc) {
    _id,
    id,
    title,
    client,
    description,
    "image": image.asset->url,
    "slug": slug.current,
    year,
    role,
    status,
    featured,
    liveDemo,
    github,
    techStack,
    content,
    features,
    challenges[] {
      title,
      challenge,
      solution
    },
    gallery[] {
      "src": asset->url,
      alt
    }
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && (slug.current == $slug || id == $slug)][0] {
    _id,
    id,
    title,
    client,
    description,
    "image": image.asset->url,
    "slug": slug.current,
    year,
    role,
    status,
    featured,
    liveDemo,
    github,
    techStack,
    content,
    features,
    challenges[] {
      title,
      challenge,
      solution
    },
    gallery[] {
      "src": asset->url,
      alt
    }
  }
`);

// Blogs Queries
export const blogsQuery = defineQuery(`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    "coverImage": coverImage.asset->url,
    tags,
    readTime,
    content
  }
`);

export const blogBySlugQuery = defineQuery(`
  *[_type == "blog" && (slug.current == $slug || id == $slug)][0] {
    _id,
    id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    "coverImage": coverImage.asset->url,
    tags,
    readTime,
    content
  }
`);

// Achievements Queries
export const achievementsQuery = defineQuery(`
  *[_type == "achievement"] | order(date desc) {
    _id,
    id,
    title,
    "slug": slug.current,
    date,
    organization,
    "certificateImage": certificateImage.asset->url,
    description,
    link
  }
`);

