export const socialLinks = {
  github: "https://github.com/ganexhshah",
  linkedin: "https://www.linkedin.com/in/ganesh-shah2064",
  instagram: "https://www.instagram.com/ganesh_sha1",
  tiktok: "https://www.tiktok.com/@_ganexx",
  tiktokHandle: "@_ganexx",
  email: "hello.ganeshshah@gmail.com",
  mailto: "mailto:hello.ganeshshah@gmail.com",
} as const;

export const contactLinks = [
  { label: "Email", href: socialLinks.mailto },
  { label: "GitHub", href: socialLinks.github },
  { label: "LinkedIn", href: socialLinks.linkedin },
  { label: "Instagram", href: socialLinks.instagram },
  { label: "TikTok", href: socialLinks.tiktok },
] as const;
