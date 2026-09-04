export const education = [
  {
    id: "plus-two",
    degree: "+2 Management (Computer Science)",
    period: "2024 – 2026",
    institution: "Sushma Godawari College",
    image: "/education/1.png",
  },
  {
    id: "secondary",
    degree: "Secondary Education",
    period: "2014 – 2024",
    institution: "Standard Secondary Boarding School",
    image: "/education/2.png",
  },
] as const;

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Figma",
  "GSAP",
  "Python",
  "Git / GitHub",
  "REST APIs",
  "UI / UX",
] as const;

export const workProcess = [
  {
    id: "discover",
    step: "01",
    title: "Discover",
    description: "Understanding goals, audience, and project requirements.",
  },
  {
    id: "ideate",
    step: "02",
    title: "Ideate",
    description: "Exploring concepts, structure, and creative direction.",
  },
  {
    id: "design",
    step: "03",
    title: "Design",
    description: "Crafting interfaces with clarity, hierarchy, and flow.",
  },
  {
    id: "develop",
    step: "04",
    title: "Develop",
    description: "Building performant, scalable, and polished experiences.",
  },
  {
    id: "deliver",
    step: "05",
    title: "Deliver",
    description: "Launching, refining, and supporting what ships.",
  },
] as const;

export const quoteContent = {
  text: "Good design is not just how it looks, but how it works.",
  signature: "Ganesh",
  cta: "Let's create something great together.",
  email: "mailto:hello.ganeshshah@gmail.com",
} as const;
