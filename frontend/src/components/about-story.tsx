"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const story = [
  "I didn’t start coding because everything was easy for me. I started because I wanted to understand how things work.",
  "I’ve always been the kind of person who gets curious about something and refuses to stop until I understand it. When I find a problem, I don’t just look for the answer—I try to break it, rebuild it, and figure out what is happening behind the scenes.",
  "My journey in development has been built through real projects, mistakes, late nights, failed builds, confusing errors, and countless moments of “why isn’t this working?” Those moments taught me more than simply following tutorials ever could.",
  "I work mainly with JavaScript, Node.js, NestJS, React, Next.js, Flutter, databases, APIs, and modern web technologies. But for me, learning a technology has never been the final goal. I want to understand how the pieces connect—from the interface a user sees to the backend logic, database, infrastructure, and everything in between.",
  "I’m still learning. I’m still making mistakes. And I’m still building.",
  "That’s what I love about software development: there is always something deeper to understand and something better to create.",
];

export function AboutStory() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from("[data-story-kicker]", { y: 24, opacity: 0, duration: 0.7 })
        .from("[data-story-title]", { y: 70, opacity: 0, duration: 1 }, "-=0.4")
        .from("[data-story-copy]", { y: 28, opacity: 0, stagger: 0.12, duration: 0.8 }, "-=0.45")
        .from("[data-story-image]", { scale: 0.8, opacity: 0, duration: 1 }, "-=0.8");

      gsap.to("[data-story-orb]", {
        y: 24,
        rotate: 12,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden border-b border-white/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
      <div data-story-orb aria-hidden="true" className="pointer-events-none absolute -right-24 top-12 size-80 rounded-full bg-[#e53935]/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1fr_0.45fr] lg:gap-20">
        <div className="max-w-4xl">
          <p data-story-kicker className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e53935]">
            The person behind the projects
          </p>
          <h1 data-story-title className="max-w-4xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            Still curious.
            <br />
            Still building.
          </h1>
          <div className="mt-10 max-w-2xl space-y-6 text-base leading-relaxed text-white/60 sm:text-lg">
            {story.map((paragraph) => (
              <p key={paragraph} data-story-copy>
                {paragraph}
              </p>
            ))}
          </div>
          <p data-story-copy className="mt-10 max-w-2xl text-xl font-medium leading-relaxed text-white sm:text-2xl">
            I don&apos;t want to be someone who only knows how to write code.
            <br />
            <strong className="text-[#e53935]">I want to understand why the code exists.</strong>
          </p>
        </div>

        <div data-story-image className="relative mx-auto w-full max-w-[280px] lg:mb-10">
          <div className="absolute -inset-4 rounded-[2rem] border border-[#e53935]/30" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-black shadow-[0_30px_90px_-30px_rgba(229,57,53,0.65)]">
            <Image src="/tiktok-avatar.jpeg" alt="Ganesh Shah" fill priority className="object-cover grayscale-[20%]" sizes="280px" />
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-white/35">A record of the journey</p>
        </div>
      </div>
    </section>
  );
}
