"use client";

import { useEffect, useRef, useState } from "react";
import { Bebas_Neue } from "next/font/google";

import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

type SiteIntroProps = {
  onComplete?: () => void;
};

type Phase = "boot" | "play" | "done";

export function SiteIntro({ onComplete }: SiteIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("boot");

  useEffect(() => {
    registerGsap();

    const seen = sessionStorage.getItem("gs-intro-seen") === "1";

    if (seen || prefersReducedMotion()) {
      document.documentElement.classList.add("intro-done");
      setPhase("done");
      onComplete?.();
      return;
    }

    setPhase("play");
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "play" || !rootRef.current) return;

    const root = rootRef.current;
    const letters = root.querySelectorAll("[data-intro-letter]");
    const line = root.querySelector("[data-intro-line]") as SVGPathElement | null;
    const tagline = root.querySelector("[data-intro-tag]");
    const panels = root.querySelectorAll("[data-intro-panel]");
    const counter = root.querySelector("[data-intro-count]");

    const finish = () => {
      sessionStorage.setItem("gs-intro-seen", "1");
      document.documentElement.classList.add("intro-done");
      setPhase("done");
      onComplete?.();
    };

    const tl = gsap.timeline({ onComplete: finish });

    if (line) {
      const length = line.getTotalLength();
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    }

    const count = { value: 0 };
    tl.to(count, {
      value: 100,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counter) counter.textContent = `${Math.round(count.value)}`;
      },
    });

    tl.fromTo(
      letters,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.07,
        ease: "power4.out",
      },
      "-=0.6",
    );

    if (line) {
      tl.to(
        line,
        {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: "power2.inOut",
        },
        "-=0.55",
      );
    }

    tl.fromTo(
      tagline,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
      "-=0.25",
    );

    tl.to({}, { duration: 0.28 });

    tl.to(panels, {
      yPercent: (i: number) => (i === 0 ? -105 : 105),
      duration: 1,
      stagger: 0.05,
      ease: "power4.inOut",
    });

    tl.set(root, { pointerEvents: "none", visibility: "hidden" });

    return () => {
      tl.kill();
    };
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      aria-hidden="true"
    >
      {phase === "play" && (
        <>
          <div
            data-intro-panel
            className="absolute inset-x-0 top-0 z-20 h-1/2 bg-black"
          />
          <div
            data-intro-panel
            className="absolute inset-x-0 bottom-0 z-20 h-1/2 bg-black"
          />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6">
            <p
              data-intro-count
              className="font-mono text-[11px] tabular-nums tracking-[0.3em] text-[#e53935]"
            >
              0
            </p>

            <div className="flex overflow-hidden leading-none">
              {"GANESH".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  data-intro-letter
                  className={`${displayFont.className} inline-block bg-gradient-to-b from-white to-white/70 bg-clip-text text-[clamp(3.5rem,14vw,9rem)] font-bold tracking-[0.08em] text-transparent opacity-0`}
                >
                  {letter}
                </span>
              ))}
            </div>

            <svg
              viewBox="0 0 320 12"
              className="h-3 w-[min(70vw,280px)]"
              fill="none"
              aria-hidden="true"
            >
              <path
                data-intro-line
                d="M2 6 C40 2, 80 10, 120 6 S200 2, 240 6 S300 10, 318 6"
                stroke="#e53935"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <p
              data-intro-tag
              className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45 opacity-0 sm:text-[11px]"
            >
              Full-Stack · UI/UX · Nepal
            </p>
          </div>
        </>
      )}
    </div>
  );
}
