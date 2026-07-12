"use client";

import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
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

function EducationSkillsColumn() {
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-60px" });

  return (
    <ScrollReveal
      y={20}
      className="group flex h-full flex-col border-b border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04] sm:p-7 lg:border-b-0 lg:border-r"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-sm font-bold uppercase tracking-[0.18em] text-white text-center"
      >
        Education &amp; Skills
      </motion.h2>

      <div className="mt-8 flex flex-col items-center">
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
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full border border-white/15 bg-black sm:size-14">
                <Image
                  src={item.image}
                  alt={item.institution}
                  fill
                  className="object-cover"
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
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
          }}
          className="mt-6 flex flex-wrap justify-center gap-3.5 w-full"
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
                scale: 1.05,
                borderColor: "rgba(229, 57, 53, 0.55)",
                backgroundColor: "rgba(229, 57, 53, 0.08)",
              }}
              className="cursor-default rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white transition-colors sm:text-[11px]"
            >
              {skill}
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
      <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#140808] px-5 py-6 sm:px-7 sm:py-8">
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
          className="relative z-[1] mt-5 flex items-center justify-center gap-4 border-t border-white/10 pt-5"
        >
          <a
            href={quoteContent.email}
            className="group inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 transition-colors hover:text-[#e53935] sm:text-[11px]"
          >
            <span className="relative">
              {quoteContent.cta}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#e53935] transition-all duration-300 group-hover:w-full" />
            </span>
          </a>

          <motion.div
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles
              className="size-4 shrink-0 text-[#e53935]"
              aria-hidden="true"
            />
          </motion.div>
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

      <div className="relative mb-3 flex flex-col items-center text-center sm:mb-4">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e53935]"
        >
          About
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Behind the Work
        </motion.h2>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 lg:grid-cols-2">
        <EducationSkillsColumn />
        <QuoteCtaColumn />
      </div>
    </section>
  );
}
