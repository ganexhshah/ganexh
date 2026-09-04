import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";

export function JsonLd() {
  const personId = `${siteConfig.url}/#person`;
  const websiteId = `${siteConfig.url}/#website`;

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Ganesh Shah",
    givenName: "Ganesh",
    familyName: "Shah",
    additionalName: "ganexhshah",
    alternateName: [
      "ganexhshah",
      "GaneshShah",
      "ganesh_sha1",
      "_ganexx",
      "Ganesh Shah Nepal",
      "Ganesh Shah Developer",
      "Ganesh Shah Software Engineer",
      "Ganesh Shah Biratnagar",
    ],
    url: siteConfig.url,
    email: socialLinks.email,
    jobTitle: "Full-Stack Developer & Software Engineer",
    description: siteConfig.description,
    image: `${siteConfig.url}/profile-ClwFbffV.jpg`,
    gender: "Male",
    nationality: {
      "@type": "Country",
      name: "Nepal",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Biratnagar",
      addressRegion: "Koshi",
      addressCountry: "NP",
    },
    sameAs: [
      socialLinks.github,
      socialLinks.linkedin,
      socialLinks.instagram,
      socialLinks.tiktok,
      "https://x.com/ganesh_sha1",
      "https://twitter.com/ganesh_sha1",
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "Software Engineering",
      "Node.js",
      "NestJS",
      "Laravel",
      "Next.js",
      "React",
      "React Native",
      "TypeScript",
      "JavaScript",
      "PostgreSQL",
      "Tailwind CSS",
      "REST APIs",
      "System Architecture",
      "Cloudflare R2",
    ],
    mainEntityOfPage: siteConfig.url,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "Ganesh Shah",
    alternateName: [
      "Ganesh Shah Official Website",
      "Ganesh Shah Portfolio",
      "ganeshshah.com",
      "ganexhshah",
    ],
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@id": personId,
    },
    publisher: {
      "@id": personId,
    },
    inLanguage: "en",
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    name: "Ganesh Shah — Full-Stack Developer & Software Engineer",
    url: siteConfig.url,
    mainEntity: {
      "@id": personId,
    },
    isPartOf: {
      "@id": websiteId,
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Who is Ganesh Shah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ganesh Shah is a full-stack developer and software engineer from Nepal specializing in Node.js, NestJS, Laravel, Next.js, and high-performance web systems.",
        },
      },
      {
        "@type": "Question",
        name: "What is the official website of Ganesh Shah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The official website of Ganesh Shah is https://ganeshshah.com, showcasing his software projects, technical blog posts, achievements, and contact details.",
        },
      },
      {
        "@type": "Question",
        name: "What projects has Ganesh Shah built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ganesh Shah has built applications including Scrim (esports tournament platform), NotesChaiyo, BolKharcha (AI expense tracker), RestroPRO, NayaMenu, and P2P Share.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Ganesh Shah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reach Ganesh Shah by email at hello.ganeshshah@gmail.com or via GitHub (@ganexhshah), LinkedIn, TikTok (@_ganexx), and Instagram (@ganesh_sha1).",
        },
      },
      {
        "@type": "Question",
        name: "Where is Ganesh Shah located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ganesh Shah is based in Biratnagar, Nepal.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}

export function ProjectJsonLd({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
}) {
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description: description,
    url: url,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    author: {
      "@type": "Person",
      name: "Ganesh Shah",
      url: siteConfig.url,
    },
    applicationCategory: "WebApplication",
    operatingSystem: "All",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: url,
    image: image.startsWith("http") ? image : `${siteConfig.url}${image}`,
    datePublished: datePublished || new Date().toISOString(),
    author: {
      "@type": "Person",
      name: "Ganesh Shah",
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: "Ganesh Shah",
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}
