"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { projects, type Project } from "@/data/projects";

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

function BackgroundCard({
  project,
  index,
  activeIndex,
}: {
  project: Project;
  index: number;
  activeIndex: number;
}) {
  const offset = index - activeIndex;
  if (offset === 0) return null;

  const positions = [
    { x: "-58%", y: "-10%", rotate: -8, scale: 0.48, blur: 12 },
    { x: "58%", y: "-8%", rotate: 8, scale: 0.46, blur: 14 },
    { x: "0%", y: "42%", rotate: -3, scale: 0.4, blur: 18 },
  ];

  const pos = positions[Math.abs(offset) % positions.length];

  return (
    <motion.div
      key={`${project.id}-${activeIndex}`}
      initial={{
        opacity: 0,
        scale: pos.scale * 0.92,
        filter: `blur(${pos.blur + 6}px)`,
      }}
      animate={{
        opacity: 0.18,
        x: pos.x,
        y: pos.y,
        rotate: pos.rotate,
        scale: pos.scale,
        filter: `blur(${pos.blur}px)`,
      }}
      exit={{
        opacity: 0,
        scale: pos.scale * 0.88,
        filter: `blur(${pos.blur + 8}px)`,
      }}
      transition={{ duration: 1.1, ease: SMOOTH_EASE }}
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-[4/3] w-[min(38vw,300px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl"
    >
      <Image
        src={project.image}
        alt=""
        fill
        loading="lazy"
        className="object-cover"
        sizes="300px"
      />
    </motion.div>
  );
}

type ProjectsSectionProps = {
  compact?: boolean;
  showViewAll?: boolean;
  initialProjects?: Project[];
};

export function ProjectsSection({
  compact = false,
  showViewAll = false,
  initialProjects,
}: ProjectsSectionProps) {
  const allProjects = initialProjects && initialProjects.length > 0 ? initialProjects : projects;
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const activeProject = allProjects[activeIndex] || allProjects[0];

  const animateCardIn = useCallback((isInitial = false) => {
    if (!cardRef.current) return;

    gsap.killTweensOf(cardRef.current);

    if (isInitial) {
      gsap.fromTo(
        cardRef.current,
        { rotateY: -8, rotateX: 6, scale: 0.92, opacity: 0 },
        {
          rotateY: -4,
          rotateX: 3,
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        },
      );
      return;
    }

    const tl = gsap.timeline();
    tl.to(cardRef.current, {
      rotateY: -1,
      rotateX: 1,
      scale: 0.96,
      opacity: 0.75,
      duration: 0.45,
      ease: "power2.inOut",
    }).to(cardRef.current, {
      rotateY: -4,
      rotateX: 3,
      scale: 1,
      opacity: 1,
      duration: 0.85,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      animateCardIn(true);
      return;
    }
    animateCardIn(false);
  }, [activeIndex, animateCardIn]);

  useEffect(() => {
    if (!sectionRef.current || compact) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
    );
  }, [compact]);

  const goTo = (index: number) => {
    setActiveIndex((index + allProjects.length) % allProjects.length);
  };

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  if (compact) {
    return (
      <section
        id="projects"
        ref={sectionRef}
        className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 p-3"
      >
        <h2 className="mb-2 shrink-0 text-base font-semibold leading-none tracking-tight text-white">
          Projects
        </h2>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2">
          <div className="relative h-[100px] w-full max-w-[180px] shrink-0">
            <div className="relative mx-auto h-full w-full overflow-hidden rounded-lg ring-1 ring-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: SMOOTH_EASE }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="180px"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="min-h-0 w-full flex-1 space-y-1 text-center">
            <h3 className="truncate text-sm font-medium tracking-tight text-white">
              {activeProject.title}
            </h3>
            <p className="line-clamp-2 text-[11px] leading-relaxed text-white/55">
              {activeProject.description}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative flex w-full flex-col items-center overflow-hidden px-4 pb-2 pt-3 sm:px-6 sm:pt-4 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(80,45,20,0.18),transparent_55%),radial-gradient(ellipse_at_70%_40%,rgba(40,30,20,0.22),transparent_50%)]" />

      <div className="relative mb-3 flex flex-col items-center text-center sm:mb-4">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e53935]"
        >
          Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: SMOOTH_EASE, delay: 0.08 }}
          className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Selected Projects
        </motion.h2>
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center gap-5 sm:gap-6 lg:grid-cols-[minmax(180px,220px)_minmax(260px,440px)_minmax(180px,280px)] lg:items-start lg:justify-center lg:gap-x-10 xl:gap-x-14">
        <div className="order-2 flex w-full max-w-xs flex-col items-center justify-center gap-3 lg:order-1 lg:min-h-[360px] lg:max-w-none lg:items-center lg:gap-4">
          {allProjects.map((project, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`project-btn-${project.id}-${index}`}
                type="button"
                onClick={() => goTo(index)}
                className="flex h-11 w-full items-center justify-center overflow-hidden text-center transition-opacity duration-500 sm:h-12 lg:h-14 lg:justify-center lg:text-center"
              >
                <span
                  className={`block w-full truncate transition-all duration-500 ${
                    isActive
                      ? "text-xl font-semibold tracking-tight text-white sm:text-2xl lg:text-[1.75rem] lg:leading-tight"
                      : "text-sm font-normal text-white/35 hover:text-white/55"
                  }`}
                >
                  {project.client}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative order-1 flex w-full items-center justify-center perspective-[1400px] lg:order-2 lg:min-h-[360px]">
      <div
        data-gsap-scale
        className="relative mx-auto aspect-[4/3] w-full max-w-[400px]"
      >
            <AnimatePresence mode="popLayout">
              {allProjects.map((project, index) => (
                <BackgroundCard
                  key={`project-bg-${project.id}-${index}`}
                  project={project}
                  index={index}
                  activeIndex={activeIndex}
                />
              ))}
            </AnimatePresence>

            <div
              ref={cardRef}
              className="relative mx-auto aspect-[4/3] w-full max-w-[400px] will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85)] ring-1 ring-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.65, ease: SMOOTH_EASE }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 768px) 90vw, 400px"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="order-3 flex w-full max-w-sm flex-col items-center justify-center text-center lg:min-h-[360px] lg:max-w-[280px] lg:items-center lg:pl-0">
          <div className="flex min-h-[5.5rem] w-full items-start justify-center gap-4 sm:min-h-[6rem] sm:gap-5">
            <div className="min-h-[5.5rem] flex-1 sm:min-h-[6rem]">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activeProject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: SMOOTH_EASE }}
                  className="line-clamp-2 text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-[1.15]"
                >
                  {activeProject.title}
                </motion.h3>
              </AnimatePresence>
            </div>

            <div className="flex shrink-0 flex-col gap-2 pt-1">
              <motion.button
                type="button"
                onClick={goPrev}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                aria-label="Previous project"
                className="flex size-8 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80 sm:size-9"
              >
                <ChevronUp className="size-4" />
              </motion.button>
              <motion.button
                type="button"
                onClick={goNext}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                aria-label="Next project"
                className="flex size-8 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80 sm:size-9"
              >
                <ChevronDown className="size-4" />
              </motion.button>
            </div>
          </div>

          <div className="mt-3 flex min-h-[6rem] w-full justify-center sm:mt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: SMOOTH_EASE }}
                className="space-y-4"
              >
                <p className="line-clamp-3 text-sm leading-relaxed text-white/55 sm:text-[15px]">
                  {activeProject.description}
                </p>
                <Link
                  href={activeProject.href}
                  className="inline-block text-sm text-white underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Watch
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {showViewAll && (
        <div className="relative mt-3 text-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
          >
            View all projects
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      )}
    </section>
  );
}
