import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";

import { GsapExperience } from "@/components/gsap-experience";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";

import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Ganesh Shah | Full-Stack Developer — ganeshshah.com",
    template: "%s | Ganesh Shah — ganeshshah.com",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [...siteConfig.keywords],
  category: "technology",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: "ganeshshah.com",
    title: "Ganesh Shah | Full-Stack Developer — ganeshshah.com",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Ganesh Shah — Portfolio at ganeshshah.com",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Shah | Full-Stack Developer — ganeshshah.com",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/fev.png", type: "image/png" }],
    apple: [{ url: "/fev.png", type: "image/png" }],
    shortcut: "/fev.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // Add Google Search Console verification token when available:
    // google: "YOUR_VERIFICATION_CODE",
  },
  other: {
    "contact:email": socialLinks.email,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} h-full font-sans antialiased`}
    >
      <body className="flex min-h-full flex-col bg-black text-white md:cursor-none">
        <JsonLd />
        <GsapExperience>{children}</GsapExperience>
      </body>
    </html>
  );
}
