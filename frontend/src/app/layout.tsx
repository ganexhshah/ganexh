import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import localFont from "next/font/local";
import Script from "next/script";

import { GsapExperience } from "@/components/gsap-experience";
import { JsonLd } from "@/components/json-ld";
import { siteConfig } from "@/data/site";
import { socialLinks } from "@/data/social";

import "./globals.css";

const googleSans = Google_Sans({
  variable: "--font-google-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});

const myFont = localFont({
  src: "../fonts/myfont.woff2",
  variable: "--font-myfont",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Ganesh Shah — Full-Stack Developer & Software Engineer | Official Website",
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
    siteName: "Ganesh Shah — Official Website",
    title: "Ganesh Shah — Full-Stack Developer & Software Engineer | Official Website",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Ganesh Shah — Full-Stack Developer & Software Engineer (ganeshshah.com)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh Shah — Full-Stack Developer & Software Engineer",
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
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
      className={`${googleSans.variable} ${myFont.variable} dark h-full font-sans antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-neutral-50 text-neutral-900 transition-colors duration-300 dark:bg-black dark:text-white md:cursor-none">
        <GsapExperience>{children}</GsapExperience>
        <Analytics />
      </body>
    </html>
  );
}
