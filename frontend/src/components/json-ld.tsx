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
      "Ganesh Shah Full Stack Developer",
      "Ganesh Shah Portfolio",
      "ganeshshah.com",
    ],
    url: siteConfig.url,
    email: socialLinks.email,
    jobTitle: "Full-Stack Developer & Software Engineer",
    description:
      "Ganesh Shah is a full-stack developer and software engineer based in Biratnagar, Nepal. He builds high-performance web systems and applications using Node.js, NestJS, Next.js, and Laravel, and is the creator of Scrim, NotesChaiyo, BolKharcha, and RestroPRO.",
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
      "https://github.com/ganexhshah",
      "https://www.linkedin.com/in/ganesh-shah2064",
    ],
    knowsAbout: [
      "Ganesh Shah",
      "Full-Stack Web Development",
      "Software Engineering",
      "System Architecture",
      "Next.js",
      "React",
      "Node.js",
      "NestJS",
      "Laravel",
      "TypeScript",
      "JavaScript",
      "PostgreSQL",
      "MongoDB",
      "Tailwind CSS",
      "REST APIs",
      "Docker",
      "Cloudflare R2",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Full-Stack Developer & Software Engineer",
      occupationLocation: {
        "@type": "City",
        name: "Biratnagar",
      },
      skills:
        "Full-Stack Development, Node.js, NestJS, Next.js, Laravel, TypeScript, React, PostgreSQL, REST APIs",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Sushma Godawari College",
        address: {
          "@type": "PostalAddress",
          addressCountry: "NP",
        },
      },
      {
        "@type": "EducationalOrganization",
        name: "Standard Secondary Boarding School",
        address: {
          "@type": "PostalAddress",
          addressCountry: "NP",
        },
      },
    ],
    award: [
      "Daydream Biratnagar 24-hour Game Jam Winner",
    ],
    creator: [
      {
        "@type": "SoftwareApplication",
        name: "Scrim",
        applicationCategory: "GameApplication",
        operatingSystem: "Android, Web",
        url: "https://goscrim.live",
      },
      {
        "@type": "SoftwareApplication",
        name: "NotesChaiyo",
        applicationCategory: "EducationalApplication",
        url: `${siteConfig.url}/projects/noteschaiyo`,
      },
      {
        "@type": "SoftwareApplication",
        name: "BolKharcha",
        applicationCategory: "FinanceApplication",
        url: `${siteConfig.url}/projects/bolkharcha`,
      },
      {
        "@type": "SoftwareApplication",
        name: "RestroPRO",
        applicationCategory: "BusinessApplication",
        url: `${siteConfig.url}/projects/restropro`,
      },
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    name: "Ganesh Shah — Full-Stack Developer & Software Engineer | Official Website",
    url: siteConfig.url,
    mainEntity: {
      "@id": personId,
    },
    isPartOf: {
      "@id": websiteId,
    },
    description:
      "Official portfolio and profile of Ganesh Shah (ganeshshah.com), full-stack developer and software engineer from Nepal.",
    primaryImageOfPage: `${siteConfig.url}/profile-ClwFbffV.jpg`,
    dateCreated: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
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
          text: "Ganesh Shah is a full-stack developer and software engineer based in Biratnagar, Nepal. He specializes in building robust, performant web applications and backend systems using Node.js, NestJS, Next.js, and Laravel.",
        },
      },
      {
        "@type": "Question",
        name: "What is the official website of Ganesh Shah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The official website of Ganesh Shah is https://ganeshshah.com, featuring his software projects, engineering articles, achievements, and direct contact options.",
        },
      },
      {
        "@type": "Question",
        name: "What software projects has Ganesh Shah built?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ganesh Shah has built production applications including Scrim (skill-based Free Fire tournament platform at https://goscrim.live), NotesChaiyo (academic notes platform), BolKharcha (AI expense tracker), RestroPRO (restaurant POS system), NayaMenu, and P2P Share.",
        },
      },
      {
        "@type": "Question",
        name: "How can I contact Ganesh Shah?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Ganesh Shah directly at hello.ganeshshah@gmail.com, or connect on GitHub (@ganexhshah), LinkedIn (in/ganesh-shah2064), TikTok (@_ganexx), and Instagram (@ganesh_sha1).",
        },
      },
      {
        "@type": "Question",
        name: "Where is Ganesh Shah located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ganesh Shah is located in Biratnagar, Koshi Province, Nepal.",
        },
      },
      {
        "@type": "Question",
        name: "What awards and achievements does Ganesh Shah have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ganesh Shah won the Daydream Biratnagar 24-hour Game Jam championship and has built multiple high-impact software products.",
        },
      },
      {
        "@type": "Question",
        name: "What technical skills does Ganesh Shah have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ganesh Shah's technical skills include TypeScript, JavaScript, Next.js, React, Node.js, NestJS, Laravel, PHP, PostgreSQL, MongoDB, Tailwind CSS, Docker, Cloudflare R2, and RESTful API architecture.",
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
