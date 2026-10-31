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

export function SiteIntro({ onComplete }: SiteIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    registerGsap();

    const seen = sessionStorage.getItem("gs-intro-seen") === "1";

    if (seen || prefersReducedMotion()) {
      document.documentElement.classList.add("intro-done");
      onComplete?.();
      return;
    }

    document.documentElement.classList.add("intro-playing");
    setPlay(true);
  }, [onComplete]);

  useEffect(() => {
    if (!play || !rootRef.current) return;

    const root = rootRef.current;
    const content = root.querySelector("[data-intro-content]");
    const letters = root.querySelectorAll("[data-intro-letter]");
    const panels = root.querySelectorAll("[data-intro-panel]");

    const finish = () => {
      sessionStorage.setItem("gs-intro-seen", "1");
      document.documentElement.classList.remove("intro-playing");
      document.documentElement.classList.add("intro-done");
      setPlay(false);
      onComplete?.();
    };

    const tl = gsap.timeline({ onComplete: finish });

    tl.fromTo(
      letters,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: "power4.out",
      },
    );

    tl.to({}, { duration: 0.35 });

    tl.to(content, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(
      panels,
      {
        yPercent: (i: number) => (i === 0 ? -105 : 105),
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.inOut",
      },
      "-=0.1",
    );

    tl.set(root, { pointerEvents: "none", visibility: "hidden" });

    return () => {
      tl.kill();
    };
  }, [play, onComplete]);

  if (!play) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      aria-hidden="true"
    >
      <div
        data-intro-panel
        className="absolute inset-x-0 top-0 z-10 h-1/2 bg-black"
      />
      <div
        data-intro-panel
        className="absolute inset-x-0 bottom-0 z-10 h-1/2 bg-black"
      />

      <div
        data-intro-content
        className="relative z-20 flex flex-col items-center justify-center px-6"
      >
        <div className="flex overflow-hidden leading-none">
          {"GANESH".split("").map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              data-intro-letter
              className={`${displayFont.className} inline-block bg-gradient-to-b from-white to-white/80 bg-clip-text text-[clamp(4rem,16vw,10rem)] font-bold tracking-[0.1em] text-transparent opacity-0`}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
