const PROJECT_ID = "97jei0ea";
const DATASET = "production";
const API_VERSION = "2024-03-01";
const TOKEN = "skFTQNY2PPHm4JFQR3c18q5HfNNDsYvVs8xTcb2p6qaSUupAFRy636iMTcxlJ6hkZgmV4TW8zACegV4oBblihBnKQAyqUGVL1OqLYIZNIgRbTqoxwmE4lBgH299mxDnzzz3zIQGSxFndlwl46Tfuqji8pUp31vv5jLxoDfpNzBeiOPcLeelH";

const allBlogs = [
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
    _id: "blog-react-native-reanimated",
    _type: "blog",
    title: "Smooth Motion on Mobile",
    slug: { _type: "slug", current: "react-native-reanimated" },
    publishedAt: "2026-04-10T00:00:00.000Z",
    description: "Using Reanimated for finance UI that feels fast without sacrificing clarity.",
    readTime: "9 min read",
    tags: ["create", "react-native", "animation"],
    content: "Finance UI should feel calm. Flashy animations make balances feel unserious. Reanimated helped BolKharcha move sheets, lists, and chat transitions on the UI thread without jank.\n\nI use motion to answer questions: Did the save succeed? Which panel opened? Where did this row go? If motion does not answer, it is noise."
  },
  {
    _id: "blog-voice-expense-input",
    _type: "blog",
    title: "Voice Input for Expenses",
    slug: { _type: "slug", current: "voice-expense-input" },
    publishedAt: "2026-03-28T00:00:00.000Z",
    description: "Letting users speak transactions — and cleaning speech-to-text for financial accuracy.",
    readTime: "10 min read",
    tags: ["explore", "voice", "mobile"],
    content: "People abandon expense apps because typing NPR 80 for tea feels ridiculous. Voice is the obvious fix — until speech-to-text mangles numbers and merchant names.\n\nBolKharcha treats voice as an input pipeline, not a magic mic button. Capture audio, transcribe, normalize, interpret, confirm. Each stage can fail gracefully."
  },
  {
    _id: "blog-postgres-money",
    _type: "blog",
    title: "PostgreSQL for Money Data",
    slug: { _type: "slug", current: "postgres-money" },
    publishedAt: "2026-03-08T00:00:00.000Z",
    description: "Constraints, decimals, and sync strategies that keep balances trustworthy.",
    readTime: "12 min read",
    tags: ["develop", "postgresql", "database"],
    content: "Money data is unforgiving. A one-rupee drift destroys trust. That is why BolKharcha uses PostgreSQL with careful numeric types and constraints instead of casual floating point.\n\nAccounts, transactions, transfers, and loans are related on purpose. Foreign keys and transactional writes prevent orphan states that JSON blobs love to create."
  },
  {
    _id: "blog-wallet-accounts-nepal",
    _type: "blog",
    title: "Designing for Nepal Wallets",
    slug: { _type: "slug", current: "wallet-accounts-nepal" },
    publishedAt: "2026-02-20T00:00:00.000Z",
    description: "Cash, Bank, eSewa, Khalti, IME Pay — modeling how people actually hold money.",
    readTime: "10 min read",
    tags: ["create", "fintech", "nepal", "ui"],
    content: "A finance app built only for “bank account” misunderstands Nepal. People split money across cash, cards, and digital wallets like eSewa, Khalti, and IME Pay — often in the same afternoon.\n\nBolKharcha models each as an account type with its own balance and history. Transfers are not edge cases; they are the plot."
  },
  {
    _id: "blog-budget-12-categories",
    _type: "blog",
    title: "12-Category Budget Systems",
    slug: { _type: "slug", current: "budget-12-categories" },
    publishedAt: "2026-02-02T00:00:00.000Z",
    description: "Enough structure to guide spending without making users hate budgeting.",
    readTime: "8 min read",
    tags: ["learn", "budget", "product-design"],
    content: "Budget category design is psychology. Too few buckets hide problems. Too many buckets guarantee abandonment by week two.\n\nTwelve categories gave BolKharcha a practical middle path: food, transport, rent, utilities, education, health, entertainment, shopping, family, loans, savings goals, and other."
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
  },
  {
    _id: "blog-dark-theme-ux",
    _type: "blog",
    title: "Designing Dark Themes",
    slug: { _type: "slug", current: "dark-theme-ux" },
    publishedAt: "2025-12-16T00:00:00.000Z",
    description: "Contrast, red accents, and calm surfaces that stay readable at night.",
    readTime: "9 min read",
    tags: ["create", "design-system", "dark-mode"],
    content: "Dark themes fail when designers treat them as “invert the whites.” Hierarchy dies, borders vanish, and text becomes a fog.\n\nMy system uses near-black bases, white copy at controlled opacities, and a single hot accent — red — for kickers, CTAs, and focus."
  },
  {
    _id: "blog-shipping-solo",
    _type: "blog",
    title: "Shipping Solo in 2026",
    slug: { _type: "slug", current: "shipping-solo" },
    publishedAt: "2025-12-01T00:00:00.000Z",
    description: "Focus systems, scope cuts, and the discipline of finishing what you start.",
    readTime: "8 min read",
    tags: ["learn", "productivity", "indie-hacker"],
    content: "Solo development is a focus sport. Skill matters, but unfinished projects are usually attention failures, not talent failures.\n\nI ship vertical slices. One journey works end-to-end before I polish secondary screens. A talking expense logger beats a perfect settings page with no core loop."
  },
  {
    _id: "blog-oauth-jwt-mobile",
    _type: "blog",
    title: "Auth That Users Trust",
    slug: { _type: "slug", current: "oauth-jwt-mobile" },
    publishedAt: "2025-11-14T00:00:00.000Z",
    description: "Email, OTP, Google OAuth, and JWT middleware — security without friction theater.",
    readTime: "12 min read",
    tags: ["develop", "security", "jwt", "oauth"],
    content: "Finance apps live or die on auth trust. Users will not type salary details into something that feels sketchy at login.\n\nBolKharcha supports email/password, phone OTP, and Google OAuth so people can enter through the door they already trust."
  },
  {
    _id: "blog-reports-that-matter",
    _type: "blog",
    title: "Reports People Actually Read",
    slug: { _type: "slug", current: "reports-that-matter" },
    publishedAt: "2025-10-28T00:00:00.000Z",
    description: "Income, expense, party, and bank statements designed for clarity over charts for charts’ sake.",
    readTime: "9 min read",
    tags: ["explore", "analytics", "ui"],
    content: "Dashboards often optimize for screenshots. Users optimize for answers: “How much did I spend on food?” “What does Ram still owe?” “What left my bank this week?”\n\nBolKharcha prioritizes statements over ornamental charts. Income vs expense, party ledgers, and bank-like histories earn their pixels."
  },
  {
    _id: "blog-pull-to-refresh",
    _type: "blog",
    title: "Micro-interactions That Teach",
    slug: { _type: "slug", current: "pull-to-refresh" },
    publishedAt: "2025-10-08T00:00:00.000Z",
    description: "Pull-to-refresh, loading states, and feedback loops that keep mobile apps honest.",
    readTime: "8 min read",
    tags: ["create", "micro-interactions", "mobile-ux"],
    content: "Micro-interactions are how an app tells the truth. Pull-to-refresh says data can change. Spinners say work is happening. Empty states say what to do next.\n\nBolKharcha uses loading and success feedback on every async money action. Silence feels like a crash when cash is involved."
  },
  {
    _id: "blog-typescript-everywhere",
    _type: "blog",
    title: "TypeScript Across the Stack",
    slug: { _type: "slug", current: "typescript-everywhere" },
    publishedAt: "2025-09-20T00:00:00.000Z",
    description: "Shared types between React Native, Node, and data models — fewer surprises in production.",
    readTime: "10 min read",
    tags: ["learn", "typescript", "fullstack"],
    content: "TypeScript earns its keep when mobile and API disagree about a field. That disagreement should fail at compile time, not in a user’s balance screen.\n\nI keep domain types close to the source of truth and reuse them at the edges. Account, Transaction, and Budget shapes should not be reinvented three times."
  },
  {
    _id: "blog-learning-in-public-nepal",
    _type: "blog",
    title: "Learning in Public from Nepal",
    slug: { _type: "slug", current: "learning-in-public-nepal" },
    publishedAt: "2025-09-02T00:00:00.000Z",
    description: "Building, writing, and sharing as a student developer with global tools and local problems.",
    readTime: "9 min read",
    tags: ["learn", "career", "nepal"],
    content: "You do not need a coastal zip code to ship useful software. You need a real problem, steady reps, and the courage to show unfinished work.\n\nNepal gives unfair advantages: multilingual life, wallet diversity, and users who will tell you quickly when something feels foreign."
  },
  {
    _id: "blog-portfolio-as-product",
    _type: "blog",
    title: "Treat Your Portfolio Like a Product",
    slug: { _type: "slug", current: "portfolio-as-product" },
    publishedAt: "2025-08-15T00:00:00.000Z",
    description: "Projects, blogs, about, and motion — packaging craft so visitors feel who you are in seconds.",
    readTime: "10 min read",
    tags: ["explore", "portfolio", "product-thinking"],
    content: "A portfolio is not a folder of screenshots. It is a product with a job: help a visitor understand who you are and what you can build — quickly.\n\nMy site sequences Hero → Projects → About/Education → Blogs → Footer. Each section has one job. Gaps stay tight so the story does not leak energy."
  }
];

async function seedAll() {
  console.log("Seeding all 20 blogs...");
  const mutations = allBlogs.map((b) => ({ createOrReplace: b }));

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
  console.log("Result:", JSON.stringify(result));
}

seedAll();

