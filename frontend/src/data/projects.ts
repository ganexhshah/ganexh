export type Project = {
  id: string;
  client: string;
  title: string;
  description: string;
  image: string;
  href: string;
  year: string;
  role: string;
  status: string;
  featured: boolean;
  techStack: string[];
  content: string[];
  features: string[];
  challenges: { title: string; challenge: string; solution: string }[];
  liveDemo?: string;
  github?: string;
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    id: "scrim",
    client: "Scrim",
    title: "Skill-Based Free Fire Scrims Platform",
    description:
      "Marketing site and Android beta for skill-based Free Fire scrims — Clash squads and Full Map rooms with entry fees and prizes based on competitive play, not chance.",
    image: "/projects/scrim.png",
    href: "/projects/scrim",
    year: "2026",
    role: "Full-Stack · Product",
    status: "Live · Android beta",
    featured: true,
    liveDemo: "https://goscrim.live/",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "React",
      "Android",
      "Google Play beta",
    ],
    content: [
      "Scrim is a skill-based competitive platform for Free Fire scrims — Clash squads and Full Map rooms where outcomes depend on player skill, not lottery mechanics.",
      "The product loop covers room creation and join flows, in-app wallet for deposits and withdrawals, Free Fire top-up, leaderboards, tournaments, and support — all under an Android beta on Google Play internal testing.",
      "The marketing site at goscrim.live handles beta invites, user guides, feedback, and help center content — with a dark, game-native landing experience built around clear CTAs and trust messaging.",
      "Scrim is an independent platform — not affiliated with, endorsed by, or sponsored by Garena International or Free Fire.",
    ],
    features: [
      "Clash Squad Rooms",
      "Full Map Scrims",
      "Tournament Tab",
      "In-App Wallet",
      "Free Fire Top-Up",
      "Leaderboard",
      "Beta Invite Flow",
      "User Guide & Help Center",
      "Feedback Collection",
      "Skill-Based Prize Model",
    ],
    challenges: [
      {
        title: "Skill-Based Trust Messaging",
        challenge:
          "Communicating that Scrim is competitive play — not gambling — while still explaining entry fees and prizes clearly.",
        solution:
          "Consistent copy across hero, FAQ, and legal sections emphasizing skill-based outcomes and independence from Garena/Free Fire.",
      },
      {
        title: "Beta Onboarding Funnel",
        challenge:
          "Getting testers from landing page to installed app through Google Play internal testing.",
        solution:
          "Dedicated invite flow with email capture, Play internal test links, install guide, and step-by-step getting-started content.",
      },
      {
        title: "Full Product Loop",
        challenge:
          "Connecting scrim rooms, wallet, top-up, and leaderboard into one coherent in-app experience.",
        solution:
          "Structured tabs and flows so players can fund wallets, enter paid rooms, track results, and redeem value without leaving the app.",
      },
    ],
  },
  {
    id: "noteschaiyo",
    client: "NotesChaiyo",
    title: "Student Notes Marketplace",
    description:
      "A student marketplace to share, discover, and earn from study notes — page-by-page viewing, coin rewards, and waitlist access for iOS and Android.",
    image: "/projects/noteschaiyo.png",
    href: "/projects/noteschaiyo",
    year: "2026",
    role: "Full-Stack · Product",
    status: "Live · Waitlist",
    featured: true,
    liveDemo: "https://finora.lol/about",
    techStack: [
      "Next.js",
      "TypeScript",
      "React Native",
      "Tailwind CSS",
      "iOS",
      "Android",
    ],
    content: [
      "NotesChaiyo is a student notes marketplace — share clear notes, discover community tips, and earn coins when uploads help someone else pass.",
      "The product is built like a study app, not a PDF dump: page previews, fullscreen gallery, pinch-to-zoom, chapters, bookmarks, comments, and downloads live in one note viewer.",
      "The full loop covers Home, Explore, Upload, Wallet, Profile, chat, community posts, and alerts — with coins from downloads, views, daily tasks, referrals, and a contributor leaderboard.",
      "The marketing site at finora.lol/about handles waitlist signup, feature catalog, and how-it-works — early access for iOS and Android.",
    ],
    features: [
      "Note Viewer (page-by-page)",
      "Pinch-to-Zoom Gallery",
      "Explore & Subject Feeds",
      "Upload from Camera or Files",
      "Coin Wallet & Withdrawals",
      "Daily Tasks & Referrals",
      "Contributor Leaderboard",
      "Realtime Chat",
      "Bookmarks, Likes & Comments",
      "Waitlist Onboarding",
    ],
    challenges: [
      {
        title: "Study-App Note Viewing",
        challenge:
          "Students bounce when notes feel like a dumped PDF instead of something they can actually study from.",
        solution:
          "A dedicated viewer with page previews, fullscreen gallery, pinch-to-zoom, chapter lists, save-to-gallery, and comments in one place.",
      },
      {
        title: "Earn Without Breaking Trust",
        challenge:
          "Rewarding uploads can invite spam if coins are easy to farm and quality is invisible.",
        solution:
          "Coins tied to helpful downloads and engagement, plus daily tasks, referrals, wallet history, and a monthly contributor leaderboard.",
      },
      {
        title: "Discovery Across Subjects",
        challenge:
          "Notes only help if the right student finds the right chapter before an exam.",
        solution:
          "Subject chips, ranked feeds, class/chapter/college filters, and cards that surface likes, comments, and bookmarks.",
      },
    ],
  },
  {
    id: "restropro",
    client: "RestroPRO",
    title: "Restaurant POS SaaS",
    description:
      "A PWA restaurant management system that streamlines orders, reservations, customers, and metrics — installable as an app on Android, iPhone, iPad, or desktop.",
    image: "/projects/ros/02-dashboard.png",
    href: "/projects/restropro",
    year: "2025",
    role: "Full-Stack · SaaS",
    status: "Completed",
    featured: true,
    techStack: [
      "PWA",
      "React",
      "SaaS",
      "Multi-tenant",
      "POS",
      "Stripe",
    ],
    content: [
      "RestroPRO is a restaurant management POS built to simplify daily operations, empower staff, and elevate guest service — from orders and reservations to customers and key metrics, in one place.",
      "It is a progressive web app, so the same product installs on Android, iPhone, iPad, or desktop. POS is the hub: tickets go to kitchen displays, printers, and the live orders board without a native store listing.",
      "Floor staff take dine-in and walk-in orders with drafts, variants, add-ons, and kitchen notes. Kitchen screens announce new tickets and mark items preparing or complete. Reservations, customer records, QR digital menus, invoices, users, and reports sit in the same back office.",
      "The SaaS layer is multi-tenant: a super-admin portal onboards restaurants, tracks active and inactive tenants, plans, and subscription windows — so one codebase can run many independent businesses.",
    ],
    features: [
      "Installable PWA (phone, tablet, desktop)",
      "Point of Sale with drafts & variants",
      "Kitchen display & order announcements",
      "Live order tracking & reprint receipts",
      "Reservations inside the POS",
      "Customer management & loyalty insights",
      "QR / digital menu ordering",
      "Invoices, reports & metrics dashboard",
      "Role-based staff access",
      "Multi-tenant SaaS admin",
    ],
    gallery: [
      { src: "/projects/ros/02-dashboard.png", alt: "RestroPRO dashboard with reservations, top sellers, and metrics" },
      { src: "/projects/ros/04-setup.png", alt: "Recommended POS setup linking printer, kitchen, and orders" },
      { src: "/projects/ros/05.png", alt: "Feature grid covering POS, kitchen, reservations, and QR menu" },
      { src: "/projects/ros/07-dashboard.png", alt: "Dashboard as the daily command centre for restaurant metrics" },
      { src: "/projects/ros/08.png", alt: "POS screen with menu grid, cart, and pay or send-to-kitchen" },
      { src: "/projects/ros/09.png", alt: "Drafts, add-ons, variants, and flexible billing options" },
      { src: "/projects/ros/11-kitchen.png", alt: "Kitchen display with live tokens and preparing or complete actions" },
      { src: "/projects/ros/13.png", alt: "Current orders board with paid and pending tickets" },
      { src: "/projects/ros/14.png", alt: "Reservation page for bookings, filters, and table assignment" },
      { src: "/projects/ros/16.png", alt: "Customer management cards with search, edit, and contact details" },
      { src: "/projects/ros/25.png", alt: "QR digital menu on mobile with search, variants, and prices" },
      { src: "/projects/ros/29-tenants.png", alt: "Super-admin tenants portal with plans and subscription status" },
    ],
    challenges: [
      {
        title: "One App Across Devices",
        challenge:
          "Restaurants mix Android phones, iPads, kitchen monitors, and desktops — a native app per platform would slow rollout.",
        solution:
          "Ship as a PWA so staff can install the same product on any device and keep POS, kitchen, and back office in sync.",
      },
      {
        title: "Floor-to-Kitchen Flow",
        challenge:
          "Orders stall when printers, kitchen, and waitstaff see different states for the same ticket.",
        solution:
          "POS as the hub: send to kitchen now or pay first, announce new orders, track preparing/ready/complete, and reprint receipts from a live orders board.",
      },
      {
        title: "Multi-Tenant SaaS",
        challenge:
          "Each restaurant needs isolated data, plans, and staff — without deploying a new stack per location.",
        solution:
          "A super-admin tenants portal for onboarding, active/inactive status, subscription windows, and plans on one shared SaaS.",
      },
    ],
  },
  {
    id: "bolkharcha",
    client: "BolKharcha",
    title: "AI-Powered Personal Finance Manager",
    description:
      "A comprehensive personal finance management app with AI-powered chat interface, multi-language support, and smart expense tracking.",
    image: "/projects/bolkharcha.jpg",
    href: "/projects/bolkharcha",
    year: "2024",
    role: "Full-Stack · Mobile",
    status: "Completed",
    featured: true,
    github: "https://github.com/ganexhshah",
    techStack: [
      "React Native",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Ollama AI",
      "Expo",
    ],
    content: [
      "BolKharcha is an AI-powered personal finance manager built for Nepal — conversational expense tracking in English, Nepali, and Hinglish.",
      "Users can speak or type natural commands like “got salary” or “got phone”, and the app’s 3-mode system (Income, Expense, Account setup) with Ollama understands the intent.",
      "It includes dashboards, multi-account balances (Cash, Bank, eSewa, Khalti, IME Pay), budgets across 12 categories, transfers, loans, reports, and a dark modern UI.",
      "The stack is React Native + Expo Router, TypeScript, Node.js, PostgreSQL, and Ollama for on-device/local AI chat.",
    ],
    features: [
      "AI-Powered Chat Interface",
      "3-Mode System (Income, Expense, Account)",
      "Smart Intent Detection",
      "Voice Input Support",
      "Multi-language: English, Nepali, Hinglish",
      "Real-time Balance Dashboard",
      "Budget Manager (12 categories)",
      "Multiple Account Types",
      "Transaction Tracking",
      "Smart Search",
      "Comprehensive Reports",
      "Dark Theme & Modern UI/UX",
    ],
    challenges: [
      {
        title: "AI Context Understanding",
        challenge:
          "Implementing natural language processing to understand financial context in multiple languages.",
        solution:
          "Custom prompt engineering with Ollama and a 3-mode system to distinguish transactions like “got salary” vs “got phone”.",
      },
      {
        title: "Multi-language NLP",
        challenge:
          "Supporting English, Nepali, and Hinglish within the same conversation.",
        solution:
          "Language detection with seamless code-switching and fallbacks for unclear inputs.",
      },
      {
        title: "Real-time Data Synchronization",
        challenge:
          "Keeping financial data accurate across accounts with concurrent transactions.",
        solution:
          "Optimistic updates, conflict resolution, and PostgreSQL constraints for reliable sync.",
      },
    ],
  },
  {
    id: "nayamenu",
    client: "NayaMenu",
    title: "Restaurant Management System",
    description:
      "A full-stack restaurant management system with dashboard, order management, QR digital menu, POS screens, and a mobile app with role-based authentication.",
    image: "/projects/nayamenu.jpg",
    href: "/projects/nayamenu",
    year: "2024",
    role: "Full-Stack Developer",
    status: "Completed",
    featured: false,
    liveDemo: undefined,
    github: "https://github.com/ganexhshah/nayamenu",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "REST APIs",
      "Mobile App",
      "Responsive UI",
    ],
    content: [
      "I developed NayaMenu while learning React, Node.js, and Express — a full-stack restaurant management system built end to end.",
      "It features an admin dashboard, order management, QR-based digital menus, POS screens, and a mobile app with role-based authentication for staff and owners.",
      "Frontend and backend are connected through REST APIs, with a responsive UI designed for kitchen, counter, and floor workflows.",
      "This project gave me hands-on experience with real-time order flows, staff management, and inventory — and strengthened my understanding of full-stack development.",
    ],
    features: [
      "Restaurant Dashboard",
      "Order Management",
      "QR-Based Digital Menu",
      "POS Screens",
      "Mobile App",
      "Role-Based Authentication",
      "Staff Management",
      "Inventory Tracking",
      "REST API Integration",
      "Responsive UI",
    ],
    challenges: [
      {
        title: "Real-time Order Workflows",
        challenge:
          "Keeping kitchen, POS, and waitstaff in sync as orders change status throughout service.",
        solution:
          "Structured order states and API-driven updates so each role sees the right queue at the right time.",
      },
      {
        title: "Role-Based Access",
        challenge:
          "Different staff need different screens and permissions without leaking admin controls.",
        solution:
          "Role-based authentication and route guards across web dashboard and mobile app.",
      },
      {
        title: "QR Digital Menu + POS",
        challenge:
          "Unifying customer-facing menus with counter POS and backend inventory.",
        solution:
          "Shared menu data model served to QR menu and POS, with inventory hooks on order completion.",
      },
    ],
  },
  {
    id: "p2p-share",
    client: "P2P Share",
    title: "Privacy-First File Sharing",
    description:
      "Peer-to-peer file sharing with WebRTC — direct device transfers, no server storage, no login, unlimited file sizes, and real-time progress.",
    image: "/projects/p2p.jpg",
    href: "/projects/p2p-share",
    year: "2025",
    role: "Full-Stack · Realtime",
    status: "Completed",
    featured: true,
    liveDemo: "https://p2pshare-pgvq.vercel.app/",
    github: "https://github.com/ganexhshah",
    techStack: [
      "React",
      "WebRTC",
      "Socket.IO",
      "Node.js",
      "Tailwind CSS",
    ],
    content: [
      "P2P Share is a privacy-first peer-to-peer file sharing app that transfers files directly between devices using WebRTC — without server storage or login.",
      "A lightweight Node.js + Socket.IO server handles signaling only, while files move peer-to-peer and stay encrypted in transit.",
      "The app supports unlimited file sizes, QR code and code-based sharing, and real-time progress tracking so users always know transfer status.",
      "Building it deepened my understanding of real-time communication, state management, and production deployment — and reinforced learning by shipping.",
    ],
    features: [
      "WebRTC Direct Transfers",
      "No Server File Storage",
      "No Login Required",
      "Encrypted P2P Transfer",
      "Unlimited File Size",
      "QR Code Sharing",
      "Code-Based Sharing",
      "Real-time Progress Tracking",
      "Socket.IO Signaling",
      "Tailwind CSS UI",
    ],
    challenges: [
      {
        title: "WebRTC Signaling",
        challenge:
          "Peers need a way to find each other without ever uploading file bytes to a server.",
        solution:
          "A minimal Socket.IO signaling server exchanges offers/answers/ICE only; payload stays on the P2P data channel.",
      },
      {
        title: "Large File Transfers",
        challenge:
          "Browsers and networks struggle with huge files if you treat them as one blob.",
        solution:
          "Chunked transfer with progress events so unlimited sizes remain practical and visible to users.",
      },
      {
        title: "Simple Sharing UX",
        challenge:
          "Users expect AirDrop-like simplicity, not networking jargon.",
        solution:
          "QR codes and short share codes hide WebRTC complexity behind a clean React + Tailwind interface.",
      },
    ],
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
