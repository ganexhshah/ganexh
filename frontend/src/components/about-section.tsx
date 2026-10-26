"use client";

import { useEffect, useRef, useState } from "react";
import { Great_Vibes } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { GitHubCalendar } from "react-github-calendar";

import { ScrollReveal } from "@/components/scroll-reveal";
import { education, quoteContent, skills } from "@/data/about";
import { socialLinks } from "@/data/social";

gsap.registerPlugin(ScrollTrigger);

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const EASE = [0.16, 1, 0.3, 1] as const;

const skillLogos: Record<string, string> = {
  React: "https://svgl.app/library/react_dark.svg",
  "Next.js": "https://svgl.app/library/nextjs_icon_dark.svg",
  TypeScript: "https://svgl.app/library/typescript.svg",
  "Node.js": "https://svgl.app/library/nodejs.svg",
  MongoDB: "https://svgl.app/library/mongodb-icon-dark.svg",
  "Tailwind CSS": "https://svgl.app/library/tailwindcss.svg",
  Figma: "https://svgl.app/library/figma.svg",
  GSAP: "https://svgl.app/library/motion_dark.svg",
  Python: "https://svgl.app/library/python.svg",
  "Git / GitHub": "https://svgl.app/library/git.svg",
  "REST APIs": "https://svgl.app/library/rapidapi.svg",
  "UI / UX": "https://svgl.app/library/figma.svg",
};

function EducationSkillsColumn() {
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-60px" });

  return (
    <ScrollReveal
      y={20}
      className="group flex h-full flex-col p-6 sm:p-7"
    >
      <div className="flex flex-col items-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e53935] text-center">
          Education
        </p>

        <ul className="mt-6 flex w-full flex-col space-y-4">
          {education.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: EASE, delay: index * 0.12 }}
              className="flex w-full items-center gap-3 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-white/10 hover:bg-white/[0.03] sm:gap-4"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white p-1 shadow-sm sm:size-14">
                <Image
                  src={item.image}
                  alt={item.institution}
                  fill
                  className="rounded-full object-contain p-0.5"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-medium leading-snug text-white">
                  {item.degree}
                </p>
                <p className="mt-1 text-xs text-white/45">{item.institution}</p>
                <span className="mt-1.5 inline-block rounded-full bg-[#e53935]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#e53935]">
                  {item.period}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className="my-9 h-px origin-center bg-gradient-to-r from-transparent via-[#e53935]/40 to-transparent"
      />

      <div ref={skillsRef} className="flex flex-col items-center w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e53935] text-center">
          Skills
        </p>

        <motion.div
          initial="hidden"
          animate={skillsInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
          }}
          className="mt-6 flex w-full flex-nowrap items-center justify-between sm:justify-center gap-1.5 sm:gap-2 lg:gap-2.5 overflow-x-auto no-scrollbar py-3 px-1"
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 10 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: EASE }}
              whileHover={{
                scale: 1.15,
                y: -3,
                borderColor: "rgba(229, 57, 53, 0.7)",
                backgroundColor: "rgba(229, 57, 53, 0.14)",
              }}
              aria-label={skill}
              title={skill}
              className="group/skill relative inline-flex size-9 sm:size-10 shrink-0 cursor-default items-center justify-center rounded-full border border-white/25 bg-black/40 p-1.5 sm:p-2 transition-all shadow-sm"
            >
              {skillLogos[skill] ? (
                <Image
                  src={skillLogos[skill]}
                  alt={skill}
                  width={20}
                  height={20}
                  className="size-5 sm:size-5.5 object-contain transition-transform group-hover/skill:scale-110"
                />
              ) : (
                <span className="sr-only">{skill}</span>
              )}
              {/* Floating Tooltip */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900/90 border border-white/15 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover/skill:opacity-100 z-20">
                {skill}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

function GitHubActivity() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[120px] w-full items-center justify-center rounded-lg border border-white/10 bg-black/30 text-[10px] uppercase tracking-[0.16em] text-white/35">
        Loading contributions…
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full max-w-full origin-left scale-[0.92] text-[10px] text-white/50 sm:scale-100 [&_.react-activity-calendar]:!max-w-full [&_.react-activity-calendar]:!w-full [&_svg]:!max-w-full [&_svg]:h-auto">
        <GitHubCalendar
          username="ganexhshah"
          colorScheme="dark"
          blockSize={8}
          blockMargin={2}
          fontSize={10}
          theme={{
            dark: ["#1a0a0a", "#5c1515", "#8b1a1a", "#c62828", "#e53935"],
          }}
          labels={{
            totalCount: "{{count}} contributions in the last year",
          }}
        />
      </div>
    </div>
  );
}

function QuoteCtaColumn() {
  return (
    <ScrollReveal delay={0.2} y={20} className="h-full">
      <div className="relative flex h-full flex-col justify-between overflow-hidden px-5 py-6 sm:px-7 sm:py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#e53935]/10 blur-3xl"
        />

        <div className="relative z-[1] flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-hidden="true"
            className="inline-block text-4xl font-serif leading-none text-[#e53935] sm:text-5xl"
          >
            &ldquo;
          </motion.span>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="mt-1 max-w-sm text-base leading-relaxed text-white sm:text-lg"
          >
            {quoteContent.text}
          </motion.blockquote>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
            className={`${scriptFont.className} mt-4 text-2xl text-white sm:text-3xl`}
          >
            {quoteContent.signature}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          className="relative z-[1] mt-6 w-full border-t border-white/10 pt-5"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e53935]">
              GitHub Activity
            </p>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-[#e53935]"
            >
              @ganexhshah
            </a>
          </div>

          <GitHubActivity />

          <div className="mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-white/35">
            <span>Less</span>
            <div className="flex items-center gap-1">
              {["#1a0a0a", "#5c1515", "#8b1a1a", "#c62828", "#e53935"].map(
                (color) => (
                  <span
                    key={color}
                    className="size-2.5 rounded-[2px]"
                    style={{ backgroundColor: color }}
                  />
                ),
              )}
            </div>
            <span>More</span>
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative flex w-full flex-col items-center overflow-hidden px-4 pb-2 pt-2 sm:px-6 sm:pb-3 sm:pt-3 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(229,57,53,0.06),transparent_50%),radial-gradient(ellipse_at_80%_50%,rgba(255,255,255,0.03),transparent_45%)]" />


      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
        <EducationSkillsColumn />
        <QuoteCtaColumn />
      </div>
    </section>
  );
}
