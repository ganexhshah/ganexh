"use client";

import React from "react";
import { MarqueeAlongSvgPath } from "./marquee-along-svg-path";

const demoItems = [
  {
    title: "Next.js 16",
    tag: "Framework",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
  },
  {
    title: "TypeScript",
    tag: "Language",
    color: "from-blue-600/20 to-indigo-500/20",
    border: "border-blue-400/30",
  },
  {
    title: "Tailwind CSS",
    tag: "Styling",
    color: "from-teal-500/20 to-emerald-500/20",
    border: "border-teal-400/30",
  },
  {
    title: "Framer Motion",
    tag: "Animation",
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-400/30",
  },
  {
    title: "Sanity CMS",
    tag: "Content",
    color: "from-orange-500/20 to-amber-500/20",
    border: "border-orange-400/30",
  },
  {
    title: "Cloudflare R2",
    tag: "Storage",
    color: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-400/30",
  },
];

export function MarqueeAlongSvgPathDemo() {
  // S-Curve wavy infinite path
  const infinityPath = "M 50 200 C 250 50, 250 350, 500 200 C 750 50, 750 350, 950 200 C 750 50, 750 350, 500 200 C 250 50, 250 350, 50 200 Z";

  return (
    <div className="relative flex h-[460px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/80 p-4">
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
        <span className="text-xs font-semibold tracking-wider text-neutral-400 uppercase">
          Marquee Along SVG Path
        </span>
        <span className="text-xs text-neutral-500">
          Hover to slow down • Drag horizontally to scrub
        </span>
      </div>

      <MarqueeAlongSvgPath
        path={infinityPath}
        viewBox="0 0 1000 400"
        baseVelocity={6}
        showPath={true}
        pathColor="rgba(255, 255, 255, 0.08)"
        pathWidth={2}
        pathStrokeDasharray="6 6"
        repeat={1}
      >
        {demoItems.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-3 rounded-xl border ${item.border} bg-gradient-to-br ${item.color} px-4 py-2.5 shadow-lg backdrop-blur-md transition-transform hover:scale-105`}
          >
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">
                {item.title}
              </span>
              <span className="text-[10px] text-neutral-400">{item.tag}</span>
            </div>
          </div>
        ))}
      </MarqueeAlongSvgPath>
    </div>
  );
}

export default MarqueeAlongSvgPathDemo;

