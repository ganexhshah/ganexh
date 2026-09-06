"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AboutStoryProps = {
  className?: string;
};

export function AboutStory({ className = "" }: AboutStoryProps) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Header text and avatar reveal
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-story-kicker]", { y: 16, opacity: 0, duration: 0.6 })
        .from("[data-story-title]", { y: 32, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(
          "[data-story-avatar]",
          { y: 24, opacity: 0, scale: 0.92, duration: 0.7 },
          "-=0.3"
        );

      // Paragraph-by-paragraph scroll animation
      const paragraphs = root.querySelectorAll("[data-story-p]");
      paragraphs.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Background ambient orb
      gsap.to("[data-story-orb]", {
        y: 35,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`relative w-full overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12 lg:px-12 ${className}`}
    >
      {/* Subtle background ambient glow */}
      <div
        data-story-orb
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 size-80 rounded-full bg-[#e53935]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Header: Title on Left, Circular Profile Image on Right */}
        <div className="mb-10 flex items-center justify-between gap-4 sm:mb-14 sm:gap-8">
          {/* Left: Text */}
          <div className="flex-1 text-left">
            <p
              data-story-kicker
              className="text-xs font-semibold tracking-[0.2em] text-[#e53935] sm:text-sm"
            >
              Hi, I am ganexh
            </p>
            <h2
              data-story-title
              className="mt-2 font-myfont text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl dark:text-white"
            >
              Still curious.
              <br />
              <span className="text-[#e53935]">Still building.</span>
            </h2>
          </div>

          {/* Right: Circular Profile Image */}
          <div data-story-avatar className="shrink-0">
            <div className="group relative isolate size-24 overflow-hidden rounded-full border-2 border-[#e53935]/60 bg-black shadow-[0_0_36px_-6px_rgba(229,57,53,0.55)] transition-transform duration-500 hover:scale-105 sm:size-32 md:size-36">
              <Image
                src="/profile-ClwFbffV.jpg"
                alt="Ganesh Shah"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, 144px"
              />
            </div>
          </div>
        </div>

        {/* Narrative Prose (Story Format - No Boxes) */}
        <div className="space-y-8 text-base leading-relaxed text-neutral-600 sm:space-y-10 sm:text-lg dark:text-white/60">
          <p
            data-story-p
            className="text-lg text-neutral-800 sm:text-xl dark:text-white/80"
          >
            I didn’t start coding because everything was easy for me. I started because I wanted to{" "}
            <strong className="font-semibold text-neutral-900 underline decoration-[#e53935] decoration-2 underline-offset-4 dark:text-white">
              understand how things work
            </strong>
            .
          </p>

          <p data-story-p>
            I’ve always been the kind of person who gets curious about something and refuses to stop until I understand it. When I find a problem, I don’t just look for the answer—I try to{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              break it, rebuild it
            </span>
            , and figure out what is happening{" "}
            <span className="font-semibold text-[#e53935]">
              behind the scenes
            </span>
            .
          </p>

          <p data-story-p>
            My journey in development has been built through{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              real projects, mistakes, late nights, failed builds
            </span>
            , confusing errors, and countless moments of{" "}
            <em className="font-medium text-[#e53935] not-italic">
              “why isn’t this working?”
            </em>{" "}
            Those moments taught me more than simply following tutorials ever could.
          </p>

          <p data-story-p>
            I work mainly with{" "}
            <span className="font-medium text-neutral-900 dark:text-white">
              JavaScript, Node.js, NestJS, React, Next.js, Flutter, databases, APIs
            </span>
            , and modern web technologies. But for me, learning a technology has never been the final goal. I want to understand{" "}
            <span className="font-semibold text-[#e53935]">
              how the pieces connect
            </span>
            —from the interface a user sees to the{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              backend logic, database, infrastructure
            </span>
            , and everything in between.
          </p>

          <p
            data-story-p
            className="text-xl font-medium text-neutral-900 sm:text-2xl dark:text-white"
          >
            I’m still learning. I’m still making mistakes.{" "}
            <span className="text-[#e53935]">And I’m still building.</span>
          </p>

          <p data-story-p>
            That’s what I love about software development: there is always{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              something deeper to understand
            </span>{" "}
            and{" "}
            <span className="font-semibold text-[#e53935]">
              something better to create
            </span>
            .
          </p>

          {/* Standout Philosophy Block (Typographic - No Box) */}
          <div data-story-p className="pt-6 sm:pt-8">
            <p className="text-lg font-medium text-neutral-700 sm:text-xl dark:text-white/70">
              I don&apos;t want to be someone who only knows how to write code.
            </p>
            <p className="mt-3 text-2xl font-bold leading-snug tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
              I want to become someone who understands{" "}
              <span className="text-[#e53935]">why the code exists</span>,{" "}
              how the system works, and how to build things that{" "}
              <span className="text-[#e53935]">actually matter</span>.
            </p>
          </div>

          {/* Signoff */}
          <div data-story-p className="pt-4 sm:pt-6">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-400 dark:text-white/40">
              This portfolio is not a showcase of perfection.
            </p>
            <p className="mt-2 font-myfont text-2xl font-bold text-neutral-900 sm:text-3xl dark:text-white">
              It&apos;s a record of my journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
