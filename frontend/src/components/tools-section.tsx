"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import AnimatedFrameworks from "@/components/ui/animated-frameworks";

type ToolsSectionProps = {
  compact?: boolean;
};

export function ToolsSection({ compact = false }: ToolsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current || compact) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
    );
  }, [compact]);

  if (compact) {
    return (
      <section
        id="tools"
        ref={sectionRef}
        className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 p-3"
      >
        <h2 className="mb-2 shrink-0 text-base font-semibold leading-none tracking-tight text-white">
          Stack
        </h2>

        <div className="dark min-h-0 flex-1">
          <AnimatedFrameworks
            compact
            cardTitle="Full-Stack Toolkit"
            cardDescription="MERN, Python, GitHub, and OpenAI."
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative flex w-full flex-col items-center px-8 pb-16 pt-2 sm:px-12 md:px-16 lg:px-24"
    >
      <h2 className="mx-auto mb-6 w-full max-w-xl text-center text-2xl font-semibold leading-none tracking-tight text-white sm:text-3xl">
        Stack
      </h2>

      <div className="dark mx-auto w-full max-w-lg">
        <AnimatedFrameworks
          cardTitle="Full-Stack Toolkit"
          cardDescription="Building with MERN, Python, GitHub, and OpenAI — from backend APIs to polished frontends."
        />
      </div>
    </section>
  );
}
