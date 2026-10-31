"use client";

import { useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { recentWorks } from "@/data/recent-work";

const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

function getDisplayUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("/")) return "ganeshshah.com" + url;
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function RecentWorkSection() {
  const headingId = useId();

  return (
    <section
      id="recent-work"
      aria-labelledby={headingId}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
    >
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(229,57,53,0.06),transparent_65%)]"
      />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center">
        {/* Minimalist Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: SMOOTH_EASE }}
          className="mb-8 flex flex-col items-center text-center sm:mb-10"
        >
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e53935]">
            Work
          </p>
          <h2
            id={headingId}
            className="font-heading mt-1 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white"
          >
            Recent Work
          </h2>
        </motion.div>

        {/* Project Showcase List: Tight gap between items, no outer background box */}
        <div className="flex w-full flex-col gap-5 sm:gap-6">
          {recentWorks.map((item, idx) => {
            const displayUrl = getDisplayUrl(item.liveUrl);
            const isExternal = item.liveUrl?.startsWith("http");

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  ease: SMOOTH_EASE,
                  delay: idx * 0.08,
                }}
                className="group flex w-full flex-col items-start gap-4 sm:gap-6 md:flex-row md:items-center"
              >
                {/* Left: Clean Thumbnail Image without extra divs or top bar */}
                <Link
                  href={item.liveUrl || "#"}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="relative h-[155px] w-full shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg transition-all duration-300 hover:border-white/25 sm:h-[175px] md:w-[280px] lg:w-[320px]"
                >
                  <Image
                    src={item.thumbnail}
                    alt={`${item.title} Preview`}
                    fill
                    unoptimized={item.thumbnail.endsWith(".svg") || item.thumbnail.includes(".svg")}
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </Link>

                {/* Right: Typography & Live Website Link */}
                <div className="flex flex-1 flex-col text-left">
                  {/* Title */}
                  <Link
                    href={item.liveUrl || "#"}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group/title inline-block"
                  >
                    <h3 className="font-heading text-lg font-bold tracking-tight text-neutral-900 transition-colors duration-200 group-hover/title:text-[#e53935] sm:text-xl md:text-2xl dark:text-white">
                      {item.title}
                    </h3>
                  </Link>

                  {/* Subtitle / Category */}
                  <p className="mt-0.5 text-xs font-medium text-neutral-600 sm:text-sm dark:text-neutral-300">
                    {item.category}
                  </p>

                  {/* Description */}
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-600 sm:text-[13.5px] dark:text-neutral-400">
                    {item.description}
                  </p>

                  {/* Live Website Link with Favicon Badge */}
                  {item.liveUrl && (
                    <Link
                      href={item.liveUrl}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group/link mt-2.5 inline-flex items-center gap-2 text-xs font-medium text-neutral-500 transition-colors duration-200 hover:text-neutral-900 sm:text-sm dark:text-neutral-400 dark:hover:text-white"
                    >
                      {/* Logo / Favicon Badge */}
                      <div className="flex size-4.5 shrink-0 items-center justify-center overflow-hidden rounded-[5px] border border-white/20 bg-white p-0.5 shadow-sm">
                        <img
                          src={item.logo}
                          alt=""
                          className="size-3 object-contain"
                        />
                      </div>

                      {/* Display URL */}
                      <span className="tracking-wide group-hover/link:underline underline-offset-4">
                        {displayUrl}
                      </span>
                    </Link>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
