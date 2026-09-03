"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Navbar } from "@/components/navbar";

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section id="profile" className="relative flex w-full flex-col overflow-hidden px-4 pb-4 pt-14 sm:px-6 sm:pt-16">
      <Navbar />

      <div className="relative mx-auto w-full max-w-[620px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-4 md:flex md:flex-row md:items-center md:gap-6"
        >
          {/* Left Text Content */}
          <div className="flex-1 text-left">
            <h1 className="font-myfont text-3xl text-neutral-900 sm:text-4xl dark:text-white">
              <span className="group relative inline-block cursor-pointer overflow-hidden select-none">
                <span className="block transform transition-transform duration-500 group-hover:-translate-y-full">
                  Ganesh Shah
                </span>
                <span className="absolute inset-0 block transform translate-y-full text-neutral-500 transition-transform duration-500 group-hover:translate-y-0 dark:text-neutral-400">
                  @ganexhshah
                </span>
              </span>
            </h1>

            <p className="mt-0.5 text-sm font-medium text-neutral-500 sm:text-base dark:text-neutral-400">
              Developer &amp; Student
            </p>

            <p className="mt-2 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
              Backend developer building real systems with Node.js, NestJS, and
              Laravel. Focused on clean architecture, robust REST APIs, and
              understanding how things work end to end.
            </p>
          </div>

          {/* Right Avatar Character */}
          <div className="flex shrink-0 items-center justify-end md:justify-center">
            <div className="group relative isolate h-28 w-28 transform-gpu transition-transform duration-500 ease-out sm:h-36 sm:w-36 md:h-36 md:w-36">
              <Image
                src="/Untitled design.png"
                alt="Ganesh Shah avatar"
                fill
                priority
                className="pointer-events-none select-none object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                sizes="(max-width: 768px) 112px, 144px"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
