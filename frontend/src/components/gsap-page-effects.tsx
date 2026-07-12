"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion, registerGsap, ScrollTrigger } from "@/lib/gsap";

type GsapRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function GsapReveal({
  children,
  className = "",
  delay = 0,
  y = 40,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!ref.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function GsapPageEffects() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-gsap-fade]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-scale]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-gsap-parallax]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.gsapParallax || -12),
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return <div ref={rootRef} className="contents" />;
}
