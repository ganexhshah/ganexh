import type { Metadata } from "next";
import Link from "next/link";

import { AboutSection } from "@/components/about-section";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Ganesh Shah — education, skills, GitHub activity, and philosophy. Full-stack developer from Nepal at ganeshshah.com.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: "About Ganesh Shah — ganeshshah.com",
    description:
      "Education, skills, and the story behind Ganesh Shah’s work.",
    url: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutSection />

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
