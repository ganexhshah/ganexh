"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bebas_Neue } from "next/font/google";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Magnetic } from "@/components/gsap-ui";
import { contactLinks, socialLinks } from "@/data/social";

gsap.registerPlugin(ScrollTrigger);

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

function NepalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kathmandu",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums text-white/45">
      Nepal {time}
    </span>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current || !nameRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const letters = nameRef.current!.querySelectorAll("[data-letter]");

      gsap.fromTo(
        letters,
        { yPercent: 120, opacity: 0, rotateX: -40 },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: nameRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        nameRef.current,
        { scale: 0.96 },
        {
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: nameRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        "[data-footer-item]",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 92%",
            once: true,
          },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden border-t border-white/10 bg-black px-4 pb-4 pt-6 sm:px-6 sm:pt-8 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(ellipse_at_50%_120%,rgba(229,57,53,0.12),transparent_65%)]"
      />

      <div
        ref={nameRef}
        aria-label="Ganesh"
        className={`${displayFont.className} relative mx-auto flex w-full max-w-7xl select-none justify-center overflow-hidden leading-[0.85] perspective-[1200px]`}
      >
        {"Ganesh".split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            data-letter
            className="inline-block origin-bottom bg-gradient-to-b from-white via-white/85 to-white/25 bg-clip-text text-[clamp(4.5rem,20vw,18rem)] tracking-[0.03em] text-transparent"
          >
            {letter}
          </span>
        ))}
      </div>

      <div data-footer-item className="relative mx-auto mt-6 flex justify-center sm:mt-8">
        <Magnetic strength={0.3}>
          <motion.a
            href={socialLinks.mailto}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#e53935] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_40px_-12px_rgba(229,57,53,0.7)]"
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
              animate={{ translateX: ["-100%", "100%"] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.2,
              }}
            />
            <span className="relative">Let&apos;s work together</span>
            <ArrowUpRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </Magnetic>
      </div>

      <nav
        data-footer-item
        className="relative mx-auto mt-5 flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-7 gap-y-2 sm:mt-6"
      >
        {contactLinks.map((link) => (
          <Magnetic key={link.label} strength={0.4}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="group relative text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#e53935]"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#e53935] transition-all duration-300 group-hover:w-full" />
            </a>
          </Magnetic>
        ))}
      </nav>

      <div
        data-footer-item
        className="relative mx-auto mt-5 flex w-full max-w-7xl flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.16em] text-white/40 sm:mt-6 sm:flex-row sm:text-[11px]"
      >
        <p>Ganesh Shah &copy; 2026</p>
        <NepalClock />
      </div>
    </footer>
  );
}
