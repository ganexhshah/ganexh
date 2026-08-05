"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { projects, type Project } from "@/data/projects";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectsGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8"
    >
      {projects.map((project) => (
        <ProjectGridCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}

function ProjectGridCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.7, ease: EASE }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all hover:border-[#e53935]/40 hover:bg-white/[0.04] hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.7)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <span className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.14em] text-[#e53935]">
            {project.client}
          </span>
        </div>
        <div className="space-y-2 p-5">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-white/50">
            {project.description}
          </p>
          <span className="inline-block text-sm text-white/70 transition-colors group-hover:text-[#e53935]">
            View project ›
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
