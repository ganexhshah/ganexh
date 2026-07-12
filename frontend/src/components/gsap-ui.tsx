"use client";

import { useEffect, useRef } from "react";

import { gsap, prefersReducedMotion, registerGsap } from "@/lib/gsap";

export function GsapCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!ringRef.current || !dotRef.current) return;

    const ring = ringRef.current;
    const dot = dotRef.current;

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    const onMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      gsap.to(dot, { x: mouse.x, y: mouse.y, duration: 0.15, ease: "power2.out" });
      gsap.to(ring, { x: mouse.x, y: mouse.y, duration: 0.45, ease: "power3.out" });
    };

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-magnetic], [role='button']",
      );
      if (interactive) {
        gsap.to(ring, {
          scale: 2.2,
          borderColor: "rgba(229,57,53,0.85)",
          duration: 0.3,
        });
        gsap.to(dot, { scale: 0.4, duration: 0.3 });
      }
    };

    const onOut = (event: MouseEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (related?.closest("a, button, [data-magnetic], [role='button']")) return;
      gsap.to(ring, {
        scale: 1,
        borderColor: "rgba(255,255,255,0.35)",
        duration: 0.3,
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden size-9 rounded-full border border-white/35 mix-blend-difference md:block"
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden size-1.5 rounded-full bg-[#e53935] md:block"
        aria-hidden="true"
      />
    </>
  );
}

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(node, {
        x: x * strength,
        y: y * strength,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" });
    };

    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}

export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useMagnetic(strength);

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      data-magnetic
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
