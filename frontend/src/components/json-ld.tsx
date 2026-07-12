import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: socialLinks.email,
    jobTitle: "Full-Stack Developer & UI/UX Creator",
    description: siteConfig.description,
    image: `${siteConfig.url}/fev.png`,
    sameAs: [
      socialLinks.github,
      socialLinks.linkedin,
      socialLinks.instagram,
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: ["ganeshshah.com", "GaneshShah", "ganexhshah"],
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    inLanguage: "en",
  };

  const portfolio = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${siteConfig.name} — Portfolio`,
    url: siteConfig.url,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolio) }}
      />
    </>
  );
}
