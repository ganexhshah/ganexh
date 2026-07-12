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
};

export const projects: Project[] = [
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
