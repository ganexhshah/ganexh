"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!barRef.current || prefersReducedMotion()) return;

    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[90] h-[2px] w-full origin-left bg-transparent"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-[#e53935] via-[#ff6b68] to-[#e53935]"
      />
    </div>
  );
}
