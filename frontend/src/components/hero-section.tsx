"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FileText, Globe, Sparkles } from "lucide-react";
import { Bebas_Neue, Great_Vibes } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/navbar";
import { socialLinks } from "@/data/social";

gsap.registerPlugin(ScrollTrigger);

const scriptFont = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const EASE = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const stats = [
  { value: "3+", label: "YEARS EXPERIENCE" },
  { value: "40+", label: "PROJECTS COMPLETED" },
  { value: "20+", label: "HAPPY CLIENTS" },
];

function StatValue({ value, className }: { value: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();

  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/^\d+/, "");

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (reducedMotion) {
      node.textContent = value;
      return;
    }

    const controls = animate(0, target, {
      duration: 1.5,
      delay: 0.4,
      ease: EASE,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });

    return () => controls.stop();
  }, [inView, reducedMotion, target, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}

function PortraitImage({ className }: { className?: string }) {
  return (
    <Image
      src="/hero-portrait.png"
      alt="Ganesh Shah"
      fill
      priority
      className={className}
      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 720px"
    />
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !watermarkRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(watermarkRef.current, {
        yPercent: 24,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="relative m-2 overflow-x-hidden bg-black sm:m-3 lg:min-h-[calc(100dvh-1.5rem)] lg:overflow-hidden"
    >
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className={`${displayFont.className} pointer-events-none absolute inset-x-0 top-[3%] z-0 hidden select-none px-1 text-center sm:top-[5%] sm:block lg:top-[8%]`}
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="inline-block bg-gradient-to-b from-[#e53935] to-[#6b0f0f] bg-clip-text text-[clamp(3.75rem,18vw,8rem)] leading-[0.78] tracking-[0.04em] text-transparent lg:text-[clamp(5rem,24vw,18rem)]"
        >
          GANESH
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-14 z-[5] hidden justify-center lg:flex lg:top-16"
      >
        <div className="relative h-full w-full max-w-[min(95vw,720px)]">
          <PortraitImage className="object-contain object-bottom" />
        </div>
      </motion.div>

      <Navbar />

      <div className="relative z-10 flex flex-col gap-5 px-4 pb-8 pt-20 sm:gap-6 sm:px-5 sm:pb-10 sm:pt-24 lg:min-h-[calc(100dvh-1.5rem)] lg:grid lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-12 lg:pt-28">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-1 flex flex-col lg:order-none lg:min-h-full lg:max-w-md lg:justify-end lg:pb-4"
        >
          <div className="space-y-3 sm:space-y-4">
            <div>
              <motion.p
                variants={fadeUpItem}
                className={`${scriptFont.className} text-xl text-white sm:text-2xl lg:text-[1.75rem]`}
              >
                Hello, I&apos;m
              </motion.p>
              <motion.h1
                variants={fadeUpItem}
                className={`${displayFont.className} mt-0.5 text-[clamp(2.5rem,12vw,3.75rem)] uppercase leading-[0.9] tracking-[0.04em] text-white sm:mt-1 sm:text-[clamp(3rem,11vw,5.5rem)]`}
              >
                Ganesh Shah
              </motion.h1>
              <motion.p
                variants={fadeUpItem}
                className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-[#e53935] sm:mt-3 sm:text-sm sm:tracking-[0.1em] lg:text-base"
              >
                Full-Stack Developer &amp; UI/UX Creator
              </motion.p>
            </div>

            <motion.p
              variants={fadeUpItem}
              className="max-w-none text-sm leading-relaxed text-white/80 sm:max-w-md sm:text-[15px] lg:max-w-sm"
            >
              I design and build stylish, user-focused web experiences that
              combine creativity with strategy. Passionate about clean design,
              smooth interactions, and details that make a difference.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUpItem}
            className="mt-5 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e53935] sm:mt-8 sm:flex sm:text-[11px] lg:mt-10"
          >
            <Globe className="size-3.5 shrink-0" aria-hidden="true" />
            <span>Available Worldwide</span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="order-2 flex flex-col gap-6 sm:gap-8 lg:order-none lg:relative lg:min-h-full lg:items-end lg:justify-end lg:gap-0 lg:pb-4"
        >
          <motion.div
            variants={fadeUpItem}
            className="flex max-w-full items-start gap-3 sm:max-w-[280px] lg:absolute lg:right-0 lg:top-[38%] lg:max-w-[260px] lg:-translate-y-1/2"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#8b1a1a] bg-black sm:size-9">
              <Sparkles className="size-3.5 text-white" aria-hidden="true" />
            </div>
            <p className="pt-0.5 text-sm leading-relaxed text-white/75 sm:pt-1 lg:text-right">
              Turning ideas into powerful digital experiences.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="flex w-full flex-nowrap items-baseline justify-between gap-2 sm:gap-4 lg:mt-auto lg:max-w-full lg:justify-end lg:gap-6"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 items-baseline gap-1.5 sm:gap-2"
              >
                <StatValue
                  value={stat.value}
                  className={`${displayFont.className} shrink-0 text-2xl leading-none tracking-wide text-[#e53935] sm:text-3xl lg:text-4xl`}
                />
                <span className="text-[8px] font-medium uppercase leading-tight tracking-[0.12em] text-white/70 sm:text-[10px] sm:tracking-[0.16em] lg:text-[11px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUpItem}
            className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e53935] sm:hidden"
          >
            <Globe className="size-3.5 shrink-0" aria-hidden="true" />
            <span>Available Worldwide</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          className="order-3 flex w-full flex-wrap items-center justify-center gap-3 sm:gap-4 lg:col-span-2 lg:mt-2"
        >
          <Link
            href="https://pub-3ecae00ed691451da4b557c40303c0d5.r2.dev/ganeshsahu_cv%20(2).pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#e53935] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90 sm:px-6 sm:py-3 sm:text-xs"
          >
            <FileText className="size-3.5 shrink-0" aria-hidden="true" />
            View CV
          </Link>
          <a
            href={socialLinks.mailto}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-white/50 hover:bg-white/5 sm:px-6 sm:py-3 sm:text-xs"
          >
            Contact Me
            <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
