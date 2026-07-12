"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

type SvgTextBandProps = {
  text?: string;
  className?: string;
};

export function SvgTextBand({
  text = "GANESH · DEVELOP · DESIGN · CREATE ·",
  className = "",
}: SvgTextBandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!rootRef.current || !trackRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        trackRef.current,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 95%",
            once: true,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const content = `${text} ${text}`;

  return (
    <div
      ref={rootRef}
      className={`relative w-full overflow-hidden border-y border-white/5 py-3 ${className}`}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap will-change-transform"
      >
        <svg
          viewBox="0 0 2400 80"
          className="h-10 w-auto sm:h-12 md:h-14"
          role="presentation"
        >
          <text
            x="0"
            y="58"
            fill="none"
            stroke="rgba(229,57,53,0.55)"
            strokeWidth="1.25"
            style={{
              fontFamily: "Bebas Neue, Impact, sans-serif",
              fontSize: 64,
              letterSpacing: "0.12em",
            }}
          >
            {content}
          </text>
          <text
            x="0"
            y="58"
            fill="rgba(255,255,255,0.08)"
            style={{
              fontFamily: "Bebas Neue, Impact, sans-serif",
              fontSize: 64,
              letterSpacing: "0.12em",
            }}
          >
            {content}
          </text>
        </svg>
      </div>
    </div>
  );
}
