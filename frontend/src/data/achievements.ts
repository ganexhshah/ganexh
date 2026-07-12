export type AchievementTeamMember = {
  initials: string;
  name: string;
  role: string;
};

export type Achievement = {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  event: string;
  image: string;
  year: string;
  stats: { label: string; value: string }[];
  story: string[];
  highlights: string[];
  team: AchievementTeamMember[];
  tech: string[];
  tagline: string;
};

export const achievements: Achievement[] = [
  {
    id: "daydream-biratnagar",
    title: "Daydream Biratnagar Game Jam Winner",
    subtitle:
      "Building the impossible, one line of code at a time.",
    badge: "Game Jam Winner",
    event: "Daydream Biratnagar",
    image: "/achievements/daydream-biratnagar.jpg",
    year: "2024",
    tagline: "Code. Create. Conquer.",
    stats: [
      { label: "Team", value: "3 Developers" },
      { label: "Game Dev", value: "Unreal Engine 5" },
      { label: "Programming", value: "C++ & Blueprint" },
      { label: "UI/UX", value: "Game Interface" },
      { label: "Duration", value: "24 Hours" },
    ],
    story: [
      "Our journey began at Daydream Biratnagar, where we had exactly 24 hours to transform an idea into reality. Those hours weren't just about coding—they were about pure creation. We weren't just participants, we weren't just competitors—but we had passion, skills, and determination that shaped something incredible in record time.",
      "Then the timer started. Everything became focused. Code became art. And we became unstoppable. But in that intensity, something magical happened inside our team.",
      "We began with nothing but an idea and Unreal Engine 5. Each team member brought their unique strengths—I focused on game mechanics and UI, Aayush handled the core gameplay systems, and Raj crafted the visual elements that brought our world to life.",
      "I learned the true meaning of rapid development—every decision mattered, every line of code counted. No time for second-guessing, no room for perfectionism. Just pure, focused creation under the most intense deadline imaginable.",
      "Along the way, we discovered that game jams aren't just about the final product—they're about pushing your limits, learning to work under pressure, and discovering what you're truly capable of when everything is on the line.",
      "Now I'm proud to say we completed a full PC game in just 24 hours, with polished UI, engaging gameplay, and a level of quality that impressed both judges and fellow participants. This wasn't just about winning—it was about proving to ourselves that we could rise to any challenge.",
      "This game jam wasn't about the prize—it was about growth under pressure.",
      "It's about learning that the best solutions come when you have no choice but to innovate, collaborate, and push beyond what you thought was possible.",
      "And this is just the beginning of our game development journey.",
    ],
    highlights: [
      "Full PC game shipped in 24 hours",
      "Polished UI and engaging gameplay",
      "Impressed judges and fellow participants",
      "Grew under pressure as a team of three",
    ],
    team: [
      {
        initials: "GS",
        name: "Ganesh Shah",
        role: "Game Developer — Mechanics & UI",
      },
      {
        initials: "AA",
        name: "Aayush Acharya",
        role: "Game Developer — Core Systems",
      },
      {
        initials: "RA",
        name: "Raj Acharya",
        role: "Game Developer — Visuals",
      },
    ],
    tech: [
      "Unreal Engine 5",
      "Blueprint",
      "C++",
      "UI/UX Design",
      "Game Design",
    ],
  },
];

export function getAchievement(id: string) {
  return achievements.find((item) => item.id === id);
}
