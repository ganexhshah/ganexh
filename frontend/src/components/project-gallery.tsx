"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import type { GalleryItem } from "@/data/projects";

type ProjectGalleryProps = {
  gallery: GalleryItem[];
  projectTitle: string;
};

export function ProjectGallery({ gallery, projectTitle }: ProjectGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    gallery.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ["All", ...Array.from(set)];
  }, [gallery]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return gallery;
    return gallery.filter((item) => item.category === selectedCategory);
  }, [gallery, selectedCategory]);

  const handleOpen = useCallback((index: number) => {
    setActiveModalIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const handleClose = useCallback(() => {
    setActiveModalIndex(null);
    document.body.style.overflow = "auto";
  }, []);

  const handlePrev = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length
    );
  }, [activeModalIndex, gallery.length]);

  const handleNext = useCallback(() => {
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev === null ? 0 : (prev + 1) % gallery.length
    );
  }, [activeModalIndex, gallery.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, handleClose, handlePrev, handleNext]);

  return (
    <section className="mt-12 border-t border-neutral-800 pt-10">
      {/* Clean section header */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Application Screens
          </h2>
          <p className="text-sm text-neutral-400">
            Preview of all {gallery.length} screens designed for {projectTitle}.
          </p>
        </div>
        <div className="text-xs text-neutral-400">
          Showing {filteredItems.length} of {gallery.length} screens
        </div>
      </div>

      {/* Clean category tabs without neon */}
      {categories.length > 2 && (
        <div className="no-scrollbar mb-8 flex flex-wrap gap-2 border-b border-neutral-800/80 pb-4">
          {categories.map((category) => {
            const count =
              category === "All"
                ? gallery.length
                : gallery.filter((item) => item.category === category).length;
            const isSelected = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-white text-black"
                    : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[11px] ${
                    isSelected ? "text-neutral-600 font-semibold" : "text-neutral-500"
                  }`}
                >
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Clean Screen Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredItems.map((shot) => {
          const rawIndex = gallery.findIndex((item) => item.src === shot.src);

          return (
            <div
              key={shot.src}
              onClick={() => handleOpen(rawIndex)}
              className="group cursor-pointer flex flex-col rounded-xl border border-neutral-800 bg-neutral-950 p-2 transition-colors hover:border-neutral-600"
            >
              {/* Screen Preview Container */}
              <div className="relative aspect-[9/19] w-full overflow-hidden rounded-lg bg-neutral-900">
                <Image
                  src={shot.src}
                  alt={shot.title || shot.alt || "Screen Preview"}
                  fill
                  unoptimized={shot.src.endsWith(".svg") || shot.src.includes(".svg")}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-top"
                  loading="lazy"
                />
              </div>

              {/* Clean Caption */}
              <div className="mt-2.5 px-0.5">
                <p className="truncate text-xs font-medium text-white group-hover:text-neutral-200">
                  {shot.title || shot.alt}
                </p>
                {shot.category && (
                  <p className="mt-0.5 text-[11px] text-neutral-500">
                    {shot.category}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Lightbox Modal */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={handleClose}
        >
          {/* Top Bar */}
          <div
            className="absolute left-0 right-0 top-0 flex items-center justify-between border-b border-neutral-800 bg-black/80 px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-400">
                {String(activeModalIndex + 1).padStart(2, "0")} /{" "}
                {String(gallery.length).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold text-white">
                {gallery[activeModalIndex].title || gallery[activeModalIndex].alt}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={gallery[activeModalIndex].src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-md border border-neutral-700 bg-neutral-900 text-neutral-300 transition-colors hover:text-white"
                title="Open SVG in new tab"
              >
                <ExternalLink className="size-4" />
              </a>
              <button
                type="button"
                onClick={handleClose}
                className="flex size-8 items-center justify-center rounded-md border border-neutral-700 bg-neutral-900 text-neutral-300 transition-colors hover:text-white"
                title="Close"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/90 text-white transition-colors hover:bg-neutral-800"
            title="Previous (←)"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/90 text-white transition-colors hover:bg-neutral-800"
            title="Next (→)"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Screen Image Display */}
          <div
            className="relative flex max-h-[82vh] w-full max-w-sm flex-col items-center pt-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[9/19] max-h-[75vh] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
              <Image
                key={gallery[activeModalIndex].src}
                src={gallery[activeModalIndex].src}
                alt={gallery[activeModalIndex].alt}
                fill
                unoptimized={gallery[activeModalIndex].src.includes(".svg")}
                className="object-cover object-top"
                sizes="420px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
