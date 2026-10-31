import type { ArtPreset, FolderFile } from "@/components/ui/glass-folder-cards";

export type RecentWorkItem = {
  id: string;
  title: string;
  client: string;
  category: string;
  tagline: string;
  description: string;
  logo: string;
  thumbnail: string;
  liveUrl?: string;
  year: string;
  role: string;
  status: string;
  featured: boolean;
  techStack: string[];
  highlights: string[];
  folderTone?: "light" | "dark";
  folderArt?: ArtPreset | "none";
  folderSeed?: number;
  folderFiles: FolderFile[];
};

export const recentWorks: RecentWorkItem[] = [
  {
    id: "kirana-pasal",
    title: "Kirana Pasal Management System",
    client: "Kirana Pasal POS",
    category: "Retail POS & Inventory System",
    tagline: "POS, Inventory, Billing & Credit Ledger for Grocery Stores in Nepal",
    description:
      "Kirana Pasal Management System built using Flutter, Laravel, PostgreSQL, and Docker. Manage products, inventory, purchases, suppliers, customers, POS billing, sales, expenses, credit payments, and profit reports with secure APIs, accurate calculations, automatic stock updates, and a simple user-friendly interface for grocery stores in Nepal.",
    logo: "https://assets.ganeshshah.com/Untitled%20design%20(1)/kiranapos.svg",
    thumbnail: "https://assets.ganeshshah.com/Untitled%20design%20(1)/kiranapos.svg",
    liveUrl: "/projects/kirana-pasal",
    year: "2026",
    role: "Full-Stack & Mobile Architect",
    status: "Production Ready",
    featured: true,
    techStack: [
      "Flutter",
      "Laravel",
      "PostgreSQL",
      "Docker",
      "RESTful API",
      "POS Billing",
    ],
    highlights: [
      "Fast POS counter billing with barcode scanning and instant thermal receipts",
      "Automatic real-time inventory updates across purchases, sales, and returns",
      "Customer credit (Khata / Udharo) ledger with partial payment tracking",
      "Comprehensive daily/monthly profit reports, supplier ledgers, and expense monitoring",
      "Dockerized microservices architecture with PostgreSQL transactional consistency",
    ],
    folderTone: "light",
    folderArt: "ember",
    folderSeed: 35,
    folderFiles: [
      {
        name: "Kirana POS App",
        meta: "Flutter · Mobile & Tablet",
        image: "https://assets.ganeshshah.com/Untitled%20design%20(1)/kiranapos.svg",
        href: "/projects/kirana-pasal",
      },
      {
        name: "kiranapos.svg",
        meta: "Vector Brand Asset",
        image: "https://assets.ganeshshah.com/Untitled%20design%20(1)/kiranapos.svg",
        href: "https://assets.ganeshshah.com/Untitled%20design%20(1)/kiranapos.svg",
      },
      {
        name: "Backend Services",
        meta: "Laravel 11 & PostgreSQL",
        art: "ember",
        href: "/projects/kirana-pasal",
      },
      {
        name: "Deployment Engine",
        meta: "Docker Containerized",
        art: "glacier",
        href: "/projects/kirana-pasal",
      },
    ],
  },
  {
    id: "jimi-achar",
    title: "Jimi Achar",
    client: "Jimi Achar",
    category: "E-Commerce & Food Brand",
    tagline: "Authentic Homemade Pickles & Flavor Destination",
    description:
      "Modern online storefront and e-commerce experience built for Jimi Achar — featuring authentic Nepali artisanal pickles with interactive product exploration, rich visual storytelling, and direct online ordering.",
    logo: "/work/jimi.svg",
    thumbnail: "/work/jimi.png",
    liveUrl: "https://jimiachar.goscrim.live/",
    year: "2026",
    role: "Full-Stack Developer & Brand Architect",
    status: "Live in Production",
    featured: true,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "E-Commerce", "Stripe Checkout", "Framer Motion"],
    highlights: [
      "Interactive jar catalog with spice-level and variant selection",
      "High-converting landing page optimized for fast checkout",
      "Direct mobile ordering with instant receipt confirmations",
      "SEO-optimized brand architecture with high Core Web Vitals",
    ],
    folderTone: "light",
    folderArt: "ember",
    folderSeed: 7,
    folderFiles: [
      {
        name: "jimiachar.goscrim.live",
        meta: "Live Website ↗",
        image: "/work/jimi.png",
        href: "https://jimiachar.goscrim.live/",
      },
      {
        name: "Jimi Achar Logo",
        meta: "Vector SVG",
        image: "/work/jimi.svg",
        href: "https://jimiachar.goscrim.live/",
      },
      {
        name: "Artisanal Storefront",
        meta: "E-Commerce · Next.js",
        image: "/work/jimi.png",
        href: "https://jimiachar.goscrim.live/",
      },
      {
        name: "Order & Checkout Flow",
        meta: "Stripe & Delivery ↗",
        art: "ember",
        href: "https://jimiachar.goscrim.live/",
      },
    ],
  },
  {
    id: "mummy-ko-achar",
    title: "Mummy Ko Achar",
    client: "Mummy Ko Achar",
    category: "Artisanal Brand & Web Catalog",
    tagline: "Traditional Generational Recipe Pickles",
    description:
      "Vibrant brand presence and product catalog for Mummy Ko Achar, bringing authentic generational recipe pickles to modern online shoppers with warm aesthetics and seamless mobile browsing.",
    logo: "/work/mummy-logo.svg",
    thumbnail: "/work/mummy.png",
    liveUrl: "https://mummykoacharr.vercel.app/",
    year: "2026",
    role: "UI/UX Design & Frontend Engineering",
    status: "Live in Production",
    featured: true,
    techStack: ["Next.js", "React", "Tailwind CSS", "Product Showcase", "Mobile-First"],
    highlights: [
      "Generational heritage storytelling & flavor discovery",
      "High-definition product showcases with ingredient details",
      "Ultra-responsive mobile UI tailored for local foodies",
      "Seamless WhatsApp and phone inquiry integration",
    ],
    folderTone: "dark",
    folderArt: "dusk",
    folderSeed: 14,
    folderFiles: [
      {
        name: "mummykoacharr.vercel.app",
        meta: "Live Website ↗",
        image: "/work/mummy.png",
        href: "https://mummykoacharr.vercel.app/",
      },
      {
        name: "Official Brand Logo",
        meta: "Artisanal SVG",
        image: "/work/mummy-logo.svg",
        href: "https://mummykoacharr.vercel.app/",
      },
      {
        name: "Generational Recipes",
        meta: "Traditional Jars ↗",
        image: "/work/mummy.png",
        href: "https://mummykoacharr.vercel.app/",
      },
      {
        name: "Flavor Discovery",
        meta: "Handmade Pickles ↗",
        art: "dusk",
        href: "https://mummykoacharr.vercel.app/",
      },
    ],
  },
  {
    id: "simrik",
    title: "Simrik",
    client: "Simrik",
    category: "Corporate Brand & Services Hub",
    tagline: "High-Impact Corporate Services Platform",
    description:
      "Clean, modern corporate website and digital identity designed for Simrik, highlighting company services, credentials, and customer acquisition channels with lightning-fast load times.",
    logo: "/work/simrik.svg",
    thumbnail: "/work/simrik.png",
    liveUrl: "https://simrik.goscrim.live/",
    year: "2025",
    role: "Web Architecture & Digital Design",
    status: "Live in Production",
    featured: false,
    techStack: ["Next.js", "Tailwind CSS", "Corporate Web", "Responsive UX"],
    highlights: [
      "Modern corporate layout with sleek visual accents",
      "Interactive services matrix and lead capture flows",
      "Optimized for conversion and corporate trust",
    ],
    folderTone: "light",
    folderArt: "verdant",
    folderSeed: 21,
    folderFiles: [
      {
        name: "simrik.goscrim.live",
        meta: "Live Website ↗",
        image: "/work/simrik.png",
        href: "https://simrik.goscrim.live/",
      },
      {
        name: "Simrik Vector Logo",
        meta: "Brand System",
        image: "/work/simrik.svg",
        href: "https://simrik.goscrim.live/",
      },
      {
        name: "Corporate Services",
        meta: "Inquiry Hub ↗",
        art: "verdant",
        href: "https://simrik.goscrim.live/",
      },
    ],
  },
  {
    id: "touring-travel",
    title: "Touring Travel",
    client: "Touring & Travel",
    category: "Travel & Tour Discovery Platform",
    tagline: "Curated Itineraries & Himalayan Travel Adventures",
    description:
      "Comprehensive travel exploration web platform featuring curated tour packages, destination visual guides, and smooth inquiry workflows for local and international travelers.",
    logo: "/work/touringtravel.svg",
    thumbnail: "/work/touring.png",
    liveUrl: "https://touringtravelandtours.goscrim.live/",
    year: "2025",
    role: "Full-Stack Development & UI/UX",
    status: "Live in Production",
    featured: false,
    techStack: ["React", "Next.js", "Tailwind CSS", "Booking Funnel"],
    highlights: [
      "Curated tour package directory with destination filters",
      "Visual itinerary breakdowns with interactive maps",
      "Streamlined travel booking inquiry forms",
    ],
    folderTone: "dark",
    folderArt: "glacier",
    folderSeed: 29,
    folderFiles: [
      {
        name: "touringtravelandtours.goscrim.live",
        meta: "Live Website ↗",
        image: "/work/touring.png",
        href: "https://touringtravelandtours.goscrim.live/",
      },
      {
        name: "Touring Travel Logo",
        meta: "Travel Identity",
        image: "/work/touringtravel.svg",
        href: "https://touringtravelandtours.goscrim.live/",
      },
      {
        name: "Himalayan Itineraries",
        meta: "Booking Engine ↗",
        art: "glacier",
        href: "https://touringtravelandtours.goscrim.live/",
      },
    ],
  },
];
