"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
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
      className="absolute left-1/2 top-2 w-[min(84vw,315px)] -translate-x-1/2 sm:top-0 sm:w-[335px]"
      style={{
        transformStyle: "preserve-3d",
        pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",
        cursor: isActive ? "default" : "pointer",
      }}
    >
      <motion.div
        whileHover={isActive ? { y: -6 } : { scale: 1.02 }}
        transition={{ duration: 0.4, ease: SMOOTH_EASE }}
        className={`flex h-[390px] flex-col overflow-hidden rounded-2xl border bg-zinc-950 sm:h-[415px] sm:rounded-3xl ${
          isActive
            ? "border-white/20 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9)]"
            : "border-white/10 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)]"
        }`}
      >
        <div className="relative h-[48%] w-full shrink-0 overflow-hidden bg-zinc-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="335px"
          />
          {post.category && (
            <span className="absolute left-3.5 top-3.5 z-10 rounded-full border border-white/20 bg-black/65 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {post.category}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4 text-left sm:p-5">
          <div className="flex items-center gap-2 text-[11px] font-medium text-white/50">
            <span>{post.date}</span>
            <span className="size-1 rounded-full bg-white/30" />
            <span>{post.readTime}</span>
          </div>

          <h3 className="mt-1.5 line-clamp-2 text-base font-semibold tracking-tight text-white sm:text-lg">
            {post.title}
          </h3>

          <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-white/50 sm:text-sm">
            {post.description}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {isActive ? (
            <Link
              href={post.href}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#e53935] transition-colors hover:text-white sm:text-sm"
              onClick={(event) => event.stopPropagation()}
            >
              Read Article
              <span>›</span>
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
  initialBlogs?: BlogPost[];
};

export function BlogsSection({
  compact = false,
  showViewAll = false,
  initialBlogs,
}: BlogsSectionProps) {
  const allBlogs = initialBlogs && initialBlogs.length > 0 ? initialBlogs : blogPosts;
  const [filter, setFilter] = useState<BlogFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const filteredPosts = useMemo(
    () =>
      filter === "all"
        ? allBlogs
        : allBlogs.filter((post) => {
            if (post.category === filter) return true;
            if (post.tags && post.tags.some((t) => t.toLowerCase() === filter.toLowerCase())) {
              return true;
            }
            return false;
          }),
    [filter, allBlogs],
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          className="mb-8 flex flex-col items-center text-center sm:mb-10"
        >
          <h2
            ref={headingRef}
            className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl dark:text-white"
          >
            Blogs
          </h2>
        </motion.div>

        {allBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: SMOOTH_EASE }}
            className="my-8 flex w-full max-w-md flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-md sm:p-10"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl border border-[#e53935]/30 bg-[#e53935]/10 text-[#e53935] shadow-[0_0_30px_-5px_rgba(229,57,53,0.3)]">
              <BookOpen className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-white sm:text-xl">
              Articles Coming Soon
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/50 sm:text-sm">
              New writing on full-stack architecture, software craftsmanship, and tech insights will be published here.
            </p>
          </motion.div>
        ) : (
          <>
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
              className="relative mx-auto flex h-[425px] w-full max-w-5xl items-start justify-center perspective-[1600px] cursor-grab touch-pan-y active:cursor-grabbing sm:h-[450px]"
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



          </>
        )}
      </div>
    </section>
  );
}
