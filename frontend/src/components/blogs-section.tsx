"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  blogCategories,
  blogPosts,
  type BlogFilter,
  type BlogPost,
} from "@/data/blogs";

gsap.registerPlugin(ScrollTrigger);

const VISIBLE_RANGE = 3;
const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

function getArcTransform(offset: number, xStep: number) {
  const abs = Math.abs(offset);
  const isCenter = offset === 0;

  return {
    x: offset * xStep,
    y: isCenter ? 0 : abs * abs * 14 + 18,
    rotateY: offset * -18,
    rotateZ: offset * -2,
    scale: isCenter ? 1.08 : Math.max(0.72, 1 - abs * 0.12),
    zIndex: isCenter ? 40 : 20 - abs,
    opacity: abs > VISIBLE_RANGE ? 0 : isCenter ? 1 : Math.max(0.35, 1 - abs * 0.22),
    filter: isCenter ? "blur(0px)" : `blur(${Math.min(abs * 1.5, 4)}px)`,
  };
}

function BlogCard({
  post,
  offset,
  isActive,
  xStep,
  onSelect,
}: {
  post: BlogPost;
  offset: number;
  isActive: boolean;
  xStep: number;
  onSelect: () => void;
}) {
  const transform = getArcTransform(offset, xStep);

  return (
    <motion.article
      initial={false}
      animate={transform}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 0.9,
      }}
      onClick={() => {
        if (!isActive) onSelect();
      }}
      className="absolute left-1/2 top-2 w-[min(82vw,300px)] -translate-x-1/2 sm:top-0 sm:w-[320px]"
      style={{
        transformStyle: "preserve-3d",
        pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",
        cursor: isActive ? "default" : "pointer",
      }}
    >
      <motion.div
        whileHover={isActive ? { y: -6 } : { scale: 1.02 }}
        transition={{ duration: 0.4, ease: SMOOTH_EASE }}
        className={`flex h-[360px] flex-col overflow-hidden rounded-2xl border bg-zinc-950 sm:h-[380px] sm:rounded-3xl ${
          isActive
            ? "border-[#e53935]/50 shadow-[0_28px_60px_-12px_rgba(229,57,53,0.35),0_20px_50px_-12px_rgba(0,0,0,0.9)] ring-1 ring-[#e53935]/25"
            : "border-white/10 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)]"
        }`}
      >
        <div
          className={`relative h-[52%] w-full shrink-0 overflow-hidden bg-gradient-to-br ${post.accent}`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover mix-blend-overlay opacity-90 transition-transform duration-700"
            sizes="320px"
          />
          {isActive && (
            <motion.div
              layoutId="blog-active-glow"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
              transition={{ type: "spring", stiffness: 200, damping: 28 }}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 text-left sm:p-5">
          <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-white/50 sm:text-sm">
            {post.description}
          </p>
          {isActive ? (
            <Link
              href={post.href}
              className="mt-3 inline-block text-xs font-medium text-[#e53935] transition-colors hover:text-white sm:text-sm"
              onClick={(event) => event.stopPropagation()}
            >
              Learn More ›
            </Link>
          ) : (
            <span className="mt-3 inline-block text-xs font-medium text-white/40 sm:text-sm">
              Tap to focus
            </span>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

type BlogsSectionProps = {
  compact?: boolean;
  showViewAll?: boolean;
};

export function BlogsSection({
  compact = false,
  showViewAll = false,
}: BlogsSectionProps) {
  const [filter, setFilter] = useState<BlogFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const filteredPosts = useMemo(
    () =>
      filter === "all"
        ? blogPosts
        : blogPosts.filter((post) => post.category === filter),
    [filter],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || compact) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [compact]);

  const goTo = useCallback(
    (index: number) => {
      if (filteredPosts.length === 0) return;
      setActiveIndex((index + filteredPosts.length) % filteredPosts.length);
    },
    [filteredPosts.length],
  );

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  const [xStep, setXStep] = useState(200);

  useEffect(() => {
    const updateStep = () => {
      setXStep(
        window.innerWidth < 640 ? 150 : window.innerWidth < 1024 ? 175 : 200,
      );
    };

    updateStep();
    window.addEventListener("resize", updateStep);
    return () => window.removeEventListener("resize", updateStep);
  }, []);

  if (compact) {
    return (
      <section
        id="blogs"
        ref={sectionRef}
        className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 p-3"
      >
        <h2 className="mb-2 shrink-0 text-base font-semibold leading-none tracking-tight text-white">
          Blogs
        </h2>
        <p className="text-xs text-white/50">Open on desktop for full carousel.</p>
      </section>
    );
  }

  return (
    <section
      id="blogs"
      ref={sectionRef}
      className="relative flex w-full flex-col items-center overflow-hidden px-4 pb-6 pt-2 sm:px-6 sm:pb-8 sm:pt-3 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-[#e53935]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 size-80 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e53935]"
        >
          Writing
        </motion.p>
        <h2
          ref={headingRef}
          className="mb-4 max-w-3xl text-center text-3xl font-bold tracking-tight sm:mb-5 sm:text-4xl md:text-5xl"
        >
          <span className="text-[#e53935]">Be</span>
          <span className="text-white"> the first to read &amp; learn</span>
        </h2>

        <motion.div
          ref={stageRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          dragMomentum={false}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 || info.velocity.x < -400) goNext();
            else if (info.offset.x > 50 || info.velocity.x > 400) goPrev();
          }}
          className="relative mx-auto flex h-[400px] w-full max-w-5xl items-start justify-center perspective-[1600px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[430px]"
        >
          {filteredPosts.map((post, index) => {
            const offset = index - activeIndex;
            if (Math.abs(offset) > VISIBLE_RANGE) return null;

            return (
              <BlogCard
                key={`${filter}-${post.id}`}
                post={post}
                offset={offset}
                isActive={offset === 0}
                xStep={xStep}
                onSelect={() => goTo(index)}
              />
            );
          })}
        </motion.div>

        <div className="mt-1 flex items-center justify-center gap-2">
          {filteredPosts.map((post, index) => (
            <button
              key={post.id}
              type="button"
              aria-label={`Go to ${post.title}`}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                index === activeIndex
                  ? "w-6 bg-[#e53935]"
                  : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-3">
          <motion.button
            type="button"
            onClick={goPrev}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88 }}
            aria-label="Previous blog"
            className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </motion.button>
          <motion.button
            type="button"
            onClick={goNext}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.88 }}
            aria-label="Next blog"
            className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="size-4" />
          </motion.button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {blogCategories.map((category) => {
            const isActive = filter === category.id;
            return (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.45, ease: SMOOTH_EASE }}
                whileTap={{ scale: 0.94 }}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  isActive
                    ? "bg-white/15 text-white ring-1 ring-[#e53935]/40"
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {category.label}
              </motion.button>
            );
          })}
        </motion.div>

        {showViewAll && (
          <div className="mt-4 text-center">
            <Link
              href="/blogs"
              className="group inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
            >
              View all blogs
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
