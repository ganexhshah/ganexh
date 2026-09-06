import type { Metadata } from "next";
import { AboutStory } from "@/components/about-story";
import { AboutSection } from "@/components/about-section";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/data/site";

import { BreadcrumbJsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About Ganesh Shah — Full-Stack Developer & Software Engineer | Nepal",
  description:
    "Learn about Ganesh Shah (ganeshshah.com) — full-stack developer & software engineer from Nepal. Explore his background, technical skills, education, and development philosophy.",
  keywords: [
    "About Ganesh Shah",
    "Ganesh Shah",
    "Ganesh Shah Nepal",
    "Ganesh Shah developer",
    "Ganesh Shah software engineer",
    "Ganesh Shah education",
    "Ganesh Shah skills",
    "ganeshshah.com",
    "ganexhshah",
  ],
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About Ganesh Shah — Full-Stack Developer & Software Engineer | Nepal",
    description:
      "Learn about Ganesh Shah (ganeshshah.com) — full-stack developer & software engineer from Nepal. Background, skills, and projects.",
    url: `${siteConfig.url}/about`,
    siteName: "Ganesh Shah — Official Website",
    images: [{ url: "/tiktok-avatar.jpeg", alt: "Ganesh Shah - Full-Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ganesh Shah — Full-Stack Developer & Software Engineer",
    description: "Learn about Ganesh Shah — full-stack developer & software engineer from Nepal.",
    images: ["/tiktok-avatar.jpeg"],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: siteConfig.url },
          { name: "About", url: `${siteConfig.url}/about` },
        ]}
      />
      <AboutStory />
      <AboutSection />
    </PageShell>
  );
}
