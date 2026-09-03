const PROJECT_ID = "97jei0ea";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const TOKEN = "skFTQNY2PPHm4JFQR3c18q5HfNNDsYvVs8xTcb2p6qaSUupAFRy636iMTcxlJ6hkZgmV4TW8zACegV4oBblihBnKQAyqUGVL1OqLYIZNIgRbTqoxwmE4lBgH299mxDnzzz3zIQGSxFndlwl46Tfuqji8pUp31vv5jLxoDfpNzBeiOPcLeelH";

const projects = [
  {
    _id: "project-scrim",
    _type: "project",
    title: "Skill-Based Free Fire Scrims Platform",
    slug: { _type: "slug", current: "scrim" },
    client: "Scrim",
    description: "Marketing site and Android beta for skill-based Free Fire scrims — Clash squads and Full Map rooms with entry fees and prizes based on competitive play, not chance.",
    year: "2026",
    role: "Full-Stack · Product",
    status: "Live · Android beta",
    featured: true,
    liveDemo: "https://goscrim.live/",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Android", "Google Play beta"],
    content: [
      "Scrim is a skill-based competitive platform for Free Fire scrims — Clash squads and Full Map rooms where outcomes depend on player skill, not lottery mechanics.",
      "The product loop covers room creation and join flows, in-app wallet for deposits and withdrawals, Free Fire top-up, leaderboards, tournaments, and support — all under an Android beta on Google Play internal testing.",
      "The marketing site at goscrim.live handles beta invites, user guides, feedback, and help center content — with a dark, game-native landing experience built around clear CTAs and trust messaging.",
      "Scrim is an independent platform — not affiliated with, endorsed by, or sponsored by Garena International or Free Fire."
    ],
    features: ["Clash Squad Rooms", "Full Map Scrims", "Tournament Tab", "In-App Wallet", "Free Fire Top-Up", "Leaderboard", "Beta Invite Flow", "User Guide & Help Center", "Feedback Collection", "Skill-Based Prize Model"],
    challenges: [
      {
        title: "Skill-Based Trust Messaging",
        challenge: "Communicating that Scrim is competitive play — not gambling — while still explaining entry fees and prizes clearly.",
        solution: "Consistent copy across hero, FAQ, and legal sections emphasizing skill-based outcomes and independence from Garena/Free Fire."
      },
      {
        title: "Beta Onboarding Funnel",
        challenge: "Getting testers from landing page to installed app through Google Play internal testing.",
        solution: "Dedicated invite flow with email capture, Play internal test links, install guide, and step-by-step getting-started content."
      },
      {
        title: "Full Product Loop",
        challenge: "Connecting scrim rooms, wallet, top-up, and leaderboard into one coherent in-app experience.",
        solution: "Structured tabs and flows so players can fund wallets, enter paid rooms, track results, and redeem value without leaving the app."
      }
    ]
  },
  {
    _id: "project-noteschaiyo",
    _type: "project",
    title: "Student Notes Marketplace",
    slug: { _type: "slug", current: "noteschaiyo" },
    client: "NotesChaiyo",
    description: "A student marketplace to share, discover, and earn from study notes — page-by-page viewing, coin rewards, and waitlist access for iOS and Android.",
    year: "2026",
    role: "Full-Stack · Product",
    status: "Live · Waitlist",
    featured: true,
    liveDemo: "https://finora.lol/about",
    techStack: ["Next.js", "TypeScript", "React Native", "Tailwind CSS", "iOS", "Android"],
    content: [
      "NotesChaiyo is a student notes marketplace — share clear notes, discover community tips, and earn coins when uploads help someone else pass.",
      "The product is built like a study app, not a PDF dump: page previews, fullscreen gallery, pinch-to-zoom, chapters, bookmarks, comments, and downloads live in one note viewer.",
      "The full loop covers Home, Explore, Upload, Wallet, Profile, chat, community posts, and alerts — with coins from downloads, views, daily tasks, referrals, and a contributor leaderboard.",
      "The marketing site at finora.lol/about handles waitlist signup, feature catalog, and how-it-works — early access for iOS and Android."
    ],
    features: ["Note Viewer (page-by-page)", "Pinch-to-Zoom Gallery", "Explore & Subject Feeds", "Upload from Camera or Files", "Coin Wallet & Withdrawals", "Daily Tasks & Referrals", "Contributor Leaderboard", "Realtime Chat", "Bookmarks, Likes & Comments", "Waitlist Onboarding"],
    challenges: [
      {
        title: "Study-App Note Viewing",
        challenge: "Students bounce when notes feel like a dumped PDF instead of something they can actually study from.",
        solution: "A dedicated viewer with page previews, fullscreen gallery, pinch-to-zoom, chapter lists, save-to-gallery, and comments in one place."
      },
      {
        title: "Earn Without Breaking Trust",
        challenge: "Rewarding uploads can invite spam if coins are easy to farm and quality is invisible.",
        solution: "Coins tied to helpful downloads and engagement, plus daily tasks, referrals, wallet history, and a monthly contributor leaderboard."
      },
      {
        title: "Discovery Across Subjects",
        challenge: "Notes only help if the right student finds the right chapter before an exam.",
        solution: "Subject chips, ranked feeds, class/chapter/college filters, and cards that surface likes, comments, and bookmarks."
      }
    ]
  },
  {
    _id: "project-restropro",
    _type: "project",
    title: "Restaurant POS SaaS",
    slug: { _type: "slug", current: "restropro" },
    client: "RestroPRO",
    description: "A PWA restaurant management system that streamlines orders, reservations, customers, and metrics — installable as an app on Android, iPhone, iPad, or desktop.",
    year: "2025",
    role: "Full-Stack · SaaS",
    status: "Completed",
    featured: true,
    techStack: ["PWA", "React", "SaaS", "Multi-tenant", "POS", "Stripe"],
    content: [
      "RestroPRO is a restaurant management POS built to simplify daily operations, empower staff, and elevate guest service — from orders and reservations to customers and key metrics, in one place.",
      "It is a progressive web app, so the same product installs on Android, iPhone, iPad, or desktop. POS is the hub: tickets go to kitchen displays, printers, and the live orders board without a native store listing.",
      "Floor staff take dine-in and walk-in orders with drafts, variants, add-ons, and kitchen notes. Kitchen screens announce new tickets and mark items preparing or complete. Reservations, customer records, QR digital menus, invoices, users, and reports sit in the same back office.",
      "The SaaS layer is multi-tenant: a super-admin portal onboards restaurants, tracks active and inactive tenants, plans, and subscription windows — so one codebase can run many independent businesses."
    ],
    features: ["Installable PWA (phone, tablet, desktop)", "Point of Sale with drafts & variants", "Kitchen display & order announcements", "Live order tracking & reprint receipts", "Reservations inside the POS", "Customer management & loyalty insights", "QR / digital menu ordering", "Invoices, reports & metrics dashboard", "Role-based staff access", "Multi-tenant SaaS admin"],
    challenges: [
      {
        title: "One App Across Devices",
        challenge: "Restaurants mix Android phones, iPads, kitchen monitors, and desktops — a native app per platform would slow rollout.",
        solution: "Ship as a PWA so staff can install the same product on any device and keep POS, kitchen, and back office in sync."
      },
      {
        title: "Floor-to-Kitchen Flow",
        challenge: "Orders stall when printers, kitchen, and waitstaff see different states for the same ticket.",
        solution: "POS as the hub: send to kitchen now or pay first, announce new orders, track preparing/ready/complete, and reprint receipts from a live orders board."
      },
      {
        title: "Multi-Tenant SaaS",
        challenge: "Each restaurant needs isolated data, plans, and staff — without deploying a new stack per location.",
        solution: "A super-admin tenants portal for onboarding, active/inactive status, subscription windows, and plans on one shared SaaS."
      }
    ]
  },
  {
    _id: "project-bolkharcha",
    _type: "project",
    title: "AI-Powered Personal Finance Manager",
    slug: { _type: "slug", current: "bolkharcha" },
    client: "BolKharcha",
    description: "A comprehensive personal finance management app with AI-powered chat interface, multi-language support, and smart expense tracking.",
    year: "2024",
    role: "Full-Stack · Mobile",
    status: "Completed",
    featured: true,
    github: "https://github.com/ganexhshah",
    techStack: ["React Native", "TypeScript", "Node.js", "PostgreSQL", "Ollama AI", "Expo"],
    content: [
      "BolKharcha is an AI-powered personal finance manager built for Nepal — conversational expense tracking in English, Nepali, and Hinglish.",
      "Users can speak or type natural commands like “got salary” or “got phone”, and the app’s 3-mode system (Income, Expense, Account setup) with Ollama understands the intent.",
      "It includes dashboards, multi-account balances (Cash, Bank, eSewa, Khalti, IME Pay), budgets across 12 categories, transfers, loans, reports, and a dark modern UI.",
      "The stack is React Native + Expo Router, TypeScript, Node.js, PostgreSQL, and Ollama for on-device/local AI chat."
    ],
    features: ["AI-Powered Chat Interface", "3-Mode System (Income, Expense, Account)", "Smart Intent Detection", "Voice Input Support", "Multi-language: English, Nepali, Hinglish", "Real-time Balance Dashboard", "Budget Manager (12 categories)", "Multiple Account Types", "Transaction Tracking", "Smart Search", "Comprehensive Reports", "Dark Theme & Modern UI/UX"],
    challenges: [
      {
        title: "AI Context Understanding",
        challenge: "Implementing natural language processing to understand financial context in multiple languages.",
        solution: "Custom prompt engineering with Ollama and a 3-mode system to distinguish transactions like “got salary” vs “got phone”."
      },
      {
        title: "Multi-language NLP",
        challenge: "Supporting English, Nepali, and Hinglish within the same conversation.",
        solution: "Language detection with seamless code-switching and fallbacks for unclear inputs."
      },
      {
        title: "Real-time Data Synchronization",
        challenge: "Keeping financial data accurate across accounts with concurrent transactions.",
        solution: "Optimistic updates, conflict resolution, and PostgreSQL constraints for reliable sync."
      }
    ]
  },
  {
    _id: "project-nayamenu",
    _type: "project",
    title: "Restaurant Management System",
    slug: { _type: "slug", current: "nayamenu" },
    client: "NayaMenu",
    description: "A full-stack restaurant management system with dashboard, order management, QR digital menu, POS screens, and a mobile app with role-based authentication.",
    year: "2024",
    role: "Full-Stack Developer",
    status: "Completed",
    featured: false,
    github: "https://github.com/ganexhshah/nayamenu",
    techStack: ["React", "Node.js", "Express", "REST APIs", "Mobile App", "Responsive UI"],
    content: [
      "I developed NayaMenu while learning React, Node.js, and Express — a full-stack restaurant management system built end to end.",
      "It features an admin dashboard, order management, QR-based digital menus, POS screens, and a mobile app with role-based authentication for staff and owners.",
      "Frontend and backend are connected through REST APIs, with a responsive UI designed for kitchen, counter, and floor workflows.",
      "This project gave me hands-on experience with real-time order flows, staff management, and inventory — and strengthened my understanding of full-stack development."
    ],
    features: ["Restaurant Dashboard", "Order Management", "QR-Based Digital Menu", "POS Screens", "Mobile App", "Role-Based Authentication", "Staff Management", "Inventory Tracking", "REST API Integration", "Responsive UI"],
    challenges: [
      {
        title: "Real-time Order Workflows",
        challenge: "Keeping kitchen, POS, and waitstaff in sync as orders change status throughout service.",
        solution: "Structured order states and API-driven updates so each role sees the right queue at the right time."
      },
      {
        title: "Role-Based Access",
        challenge: "Different staff need different screens and permissions without leaking admin controls.",
        solution: "Role-based authentication and route guards across web dashboard and mobile app."
      },
      {
        title: "QR Digital Menu + POS",
        challenge: "Unifying customer-facing menus with counter POS and backend inventory.",
        solution: "Shared menu data model served to QR menu and POS, with inventory hooks on order completion."
      }
    ]
  },
  {
    _id: "project-p2p-share",
    _type: "project",
    title: "Privacy-First File Sharing",
    slug: { _type: "slug", current: "p2p-share" },
    client: "P2P Share",
    description: "Peer-to-peer file sharing with WebRTC — direct device transfers, no server storage, no login, unlimited file sizes, and real-time progress.",
    year: "2025",
    role: "Full-Stack · Realtime",
    status: "Completed",
    featured: true,
    liveDemo: "https://p2pshare-pgvq.vercel.app/",
    github: "https://github.com/ganexhshah",
    techStack: ["React", "WebRTC", "Socket.IO", "Node.js", "Tailwind CSS"],
    content: [
      "P2P Share is a privacy-first peer-to-peer file sharing app that transfers files directly between devices using WebRTC — without server storage or login.",
      "A lightweight Node.js + Socket.IO server handles signaling only, while files move peer-to-peer and stay encrypted in transit.",
      "The app supports unlimited file sizes, QR code and code-based sharing, and real-time progress tracking so users always know transfer status.",
      "Building it deepened my understanding of real-time communication, state management, and production deployment — and reinforced learning by shipping."
    ],
    features: ["WebRTC Direct Transfers", "No Server File Storage", "No Login Required", "Encrypted P2P Transfer", "Unlimited File Size", "QR Code Sharing", "Code-Based Sharing", "Real-time Progress Tracking", "Socket.IO Signaling", "Tailwind CSS UI"],
    challenges: [
      {
        title: "WebRTC Signaling",
        challenge: "Peers need a way to find each other without ever uploading file bytes to a server.",
        solution: "A minimal Socket.IO signaling server exchanges offers/answers/ICE only; payload stays on the P2P data channel."
      },
      {
        title: "Large File Transfers",
        challenge: "Browsers and networks struggle with huge files if you treat them as one blob.",
        solution: "Chunked transfer with progress events so unlimited sizes remain practical and visible to users."
      },
      {
        title: "Simple Sharing UX",
        challenge: "Users expect AirDrop-like simplicity, not networking jargon.",
        solution: "QR codes and short share codes hide WebRTC complexity behind a clean React + Tailwind interface."
      }
    ]
  }
];

const blogs = [
  {
    _id: "blog-bolkharcha-origin",
    _type: "blog",
    title: "Why I Built BolKharcha",
    slug: { _type: "slug", current: "bolkharcha-origin" },
    publishedAt: "2026-06-28T00:00:00.000Z",
    description: "Personal finance in Nepal needed a conversational product — not another spreadsheet clone.",
    readTime: "12 min read",
    tags: ["develop", "fintech", "ai", "react-native"],
    content: "Most finance apps assume you want to fill forms. In Nepal, people talk about money the way they talk about life: “salary aayo,” “esewa ma pathaye,” “phone kine.” BolKharcha started from that gap between how software expects input and how humans actually speak.\n\nI did not want another clone of a Western budgeting template with a Nepali flag sticker on it. I wanted a product that understood local wallets, mixed languages, and the emotional friction of tracking every small expense. That product became BolKharcha — an AI-powered personal finance manager with chat at the center.\n\nThe first version was ugly and incomplete, but it could already turn a sentence into a draft transaction. That single loop — speak or type, confirm, save — proved more valuable than a polished dashboard with empty data. Users care about speed to honesty: how fast does the app reflect real life?\n\nBuilding locally also meant designing for Cash, Bank, eSewa, Khalti, and IME Pay as first-class accounts. Transfers between wallets are everyday behavior here. If your data model only knows “checking” and “savings,” you are already lying to the user."
  },
  {
    _id: "blog-ai-chat-finance",
    _type: "blog",
    title: "AI Chat for Money Apps",
    slug: { _type: "slug", current: "ai-chat-finance" },
    publishedAt: "2026-06-14T00:00:00.000Z",
    description: "How conversational UI changes expense tracking when language and context matter.",
    readTime: "11 min read",
    tags: ["explore", "ai", "chat-ui"],
    content: "Chat interfaces in finance fail when they try to be clever instead of careful. Money is trust. If the model invents a transaction, the product dies. The goal of AI chat in BolKharcha was never “wow the demo.” It was “reduce typing without reducing accuracy.”\n\nConversational UI works because it matches cognition. People already narrate their day. Turning narration into structured ledger entries is the product. The chat screen is just the friendliest door into that transformation."
  },
  {
    _id: "blog-got-salary-vs-phone",
    _type: "blog",
    title: "“Got Salary” vs “Got Phone”",
    slug: { _type: "slug", current: "got-salary-vs-phone" },
    publishedAt: "2026-05-30T00:00:00.000Z",
    description: "Intent detection is everything when one phrase can mean income and another means expense.",
    readTime: "10 min read",
    tags: ["develop", "nlp", "ai"],
    content: "Two phrases. Same verb. Opposite money directions. “Got salary” is income. “Got phone” is expense. That tiny linguistic trap is why naive keyword bots fail in personal finance.\n\nEarly BolKharcha prototypes misclassified constantly. The model loved the word “got” and guessed. Guessing is unacceptable when balances are involved. We needed intent, not token matching."
  },
  {
    _id: "blog-multilingual-nlp",
    _type: "blog",
    title: "Building Multilingual NLP",
    slug: { _type: "slug", current: "multilingual-nlp" },
    publishedAt: "2026-05-12T00:00:00.000Z",
    description: "English, Nepali, and Hinglish in one conversation — and why code-switching breaks naive systems.",
    readTime: "13 min read",
    tags: ["learn", "nlp", "nepal"],
    content: "Users in Nepal do not speak “one language per message.” They code-switch. A single line can mix English verbs, Nepali nouns, and Hindi-adjacent fillers. If your NLP pipeline assumes monolingual purity, it will misunderstand daily speech.\n\nHinglish is not a third official language. It is a usage pattern. Treating it as noise is how products alienate the exact audience that would love them most."
  },
  {
    _id: "blog-expo-router-notes",
    _type: "blog",
    title: "Expo Router in Production",
    slug: { _type: "slug", current: "expo-router-notes" },
    publishedAt: "2026-04-26T00:00:00.000Z",
    description: "File-based navigation that stays clean as screens, auth, and deep links grow.",
    readTime: "9 min read",
    tags: ["develop", "react-native", "expo"],
    content: "Expo Router gave BolKharcha a mental model I already loved from the web: folders are routes. Auth groups, tabs, and modals become a readable tree instead of a spaghetti navigator config.\n\nThe win shows up months later. New screens land where they belong. Deep links stay predictable. Onboarding and main app can share patterns without sharing messy state."
  },
  {
    _id: "blog-gsap-portfolio-craft",
    _type: "blog",
    title: "GSAP on a Portfolio Site",
    slug: { _type: "slug", current: "gsap-portfolio-craft" },
    publishedAt: "2026-01-18T00:00:00.000Z",
    description: "Scroll reveals, SVG text, and intro loaders that feel premium without feeling heavy.",
    readTime: "11 min read",
    tags: ["create", "gsap", "animation", "portfolio"],
    content: "A portfolio is a timed performance. GSAP gives you a conductor’s baton: intros, scroll reveals, SVG strokes, and micro-interactions that feel intentional.\n\nOn my site, the opening loader counts up, reveals GANESH letter by letter, draws an SVG line, then splits away. It sets tone before the hero speaks."
  },
  {
    _id: "blog-nextjs-app-router",
    _type: "blog",
    title: "Next.js App Router Patterns",
    slug: { _type: "slug", current: "nextjs-app-router" },
    publishedAt: "2026-01-04T00:00:00.000Z",
    description: "Static params, page shells, and detail routes that stay fast as content grows.",
    readTime: "11 min read",
    tags: ["develop", "nextjs", "react"],
    content: "The App Router shines when your portfolio content is structured data. Projects and blogs become arrays, routes become `[id]`, and `generateStaticParams` prebuilds the pages.\n\nI keep a PageShell for navbar and footer so detail pages inherit chrome without copy-paste. Home stays a composition of sections; subpages stay focused."
  }
];

const achievements = [
  {
    _id: "achievement-daydream-biratnagar",
    _type: "achievement",
    title: "Daydream Biratnagar Game Jam Winner",
    slug: { _type: "slug", current: "daydream-biratnagar" },
    date: "2024",
    organization: "Daydream Biratnagar",
    description: "Our journey began at Daydream Biratnagar, where we had exactly 24 hours to transform an idea into reality. Completed a full PC game with Unreal Engine 5 in 24 hours with a team of three.",
    link: "https://ganeshshah.com/achievements/daydream-biratnagar"
  }
];

async function seed() {
  console.log("Starting Sanity seeding...");

  const mutations = [
    ...projects.map((doc) => ({ createOrReplace: doc })),
    ...blogs.map((doc) => ({ createOrReplace: doc })),
    ...achievements.map((doc) => ({ createOrReplace: doc })),
  ];

  try {
    const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION.replace(/^v/, '')}/data/mutate/${DATASET}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ mutations }),
    });

    const result = await response.json();
    if (result.error) {
      console.error("Mutation error:", result.error);
    } else {
      console.log("Successfully seeded to Sanity!", JSON.stringify(result, null, 2));
      console.log(`Summary: ${projects.length} projects, ${blogs.length} blogs, and ${achievements.length} achievements added!`);
    }
  } catch (err) {
    console.error("Failed to seed Sanity:", err);
  }
}

seed();
