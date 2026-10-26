"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Hash,
  Layers,
  ListFilter,
  Search,
  X,
} from "lucide-react";

export type TocItem = {
  id: string;
  title: string;
  level: number;
};

type TableOfContentsProps = {
  items: TocItem[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>("");
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState<"all" | "h2" | "h3">("all");
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Track scroll position & reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(100, Math.round((scrollY / totalHeight) * 100)) : 0;
      setReadingProgress(progress);
      setShowFloatingNav(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active heading via IntersectionObserver
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-90px 0% -60% 0%",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const h2Count = useMemo(() => items.filter((i) => i.level === 2).length, [items]);
  const h3Count = useMemo(() => items.filter((i) => i.level === 3).length, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (filterLevel === "h2" && item.level !== 2) return false;
      if (filterLevel === "h3" && item.level !== 3) return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        return item.title.toLowerCase().includes(query);
      }
      return true;
    });
  }, [items, filterLevel, search]);

  const activeItem = useMemo(() => {
    return items.find((i) => i.id === activeId);
  }, [items, activeId]);

  if (items.length === 0) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      setShowFloatingMenu(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Inline Table of Contents Card */}
      <nav
        aria-label="Table of contents"
        className="my-8 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl shadow-2xl transition-all"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 text-left text-sm font-semibold tracking-wide text-white transition-colors hover:text-[#e53935]"
          >
            <div className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#e53935]">
              <ListFilter className="size-4" />
            </div>
            <span>Table of Contents</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/60">
              {items.length} sections
            </span>
            {isOpen ? (
              <ChevronUp className="size-4 text-white/40" />
            ) : (
              <ChevronDown className="size-4 text-white/40" />
            )}
          </button>

          {isOpen && (
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Filter Pills */}
              <div className="inline-flex rounded-lg border border-white/10 bg-black/40 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setFilterLevel("all")}
                  className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                    filterLevel === "all"
                      ? "bg-[#e53935] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  All ({items.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterLevel("h2")}
                  className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                    filterLevel === "h2"
                      ? "bg-[#e53935] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Phases ({h2Count})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterLevel("h3")}
                  className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                    filterLevel === "h3"
                      ? "bg-[#e53935] text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Gates ({h3Count})
                </button>
              </div>

              {/* Quick Search */}
              <div className="relative w-full sm:w-48">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sections..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 py-1 pl-8 pr-7 text-xs text-white placeholder-white/40 transition-colors focus:border-[#e53935]/50 focus:outline-none focus:ring-1 focus:ring-[#e53935]/50"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="max-h-[380px] overflow-y-auto p-3 sm:p-4 scrollbar-thin scrollbar-thumb-white/10">
                {filteredItems.length === 0 ? (
                  <p className="py-6 text-center text-xs text-white/40">
                    No matching sections found for &ldquo;{search}&rdquo;
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {filteredItems.map((item) => {
                      const isActive = activeId === item.id;
                      const isMajor = item.level === 2;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollTo(item.id)}
                          className={`group flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-all ${
                            isActive
                              ? "bg-[#e53935]/15 font-semibold text-[#e53935] ring-1 ring-[#e53935]/30"
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          } ${!isMajor ? "pl-5 text-white/50" : ""}`}
                        >
                          <Hash
                            className={`mt-0.5 size-3 shrink-0 ${
                              isActive
                                ? "text-[#e53935]"
                                : "text-white/30 group-hover:text-white/60"
                            }`}
                          />
                          <span className="line-clamp-1 leading-snug">
                            {item.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Floating Reading Progress & Quick Jump Nav */}
      <AnimatePresence>
        {showFloatingNav && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
          >
            {/* Quick TOC Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowFloatingMenu(!showFloatingMenu)}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/90 px-3.5 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-xl transition hover:border-[#e53935]/50 hover:bg-zinc-800"
                title="Table of Contents"
              >
                <Layers className="size-3.5 text-[#e53935]" />
                <span className="hidden sm:inline max-w-[140px] truncate text-white/80">
                  {activeItem ? activeItem.title : "Contents"}
                </span>
                <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[10px] text-white/60">
                  {readingProgress}%
                </span>
              </button>

              {/* Floating TOC Popover Menu */}
              <AnimatePresence>
                {showFloatingMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full right-0 mb-3 w-80 sm:w-96 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-3 shadow-2xl backdrop-blur-2xl"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 px-1">
                      <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <ListFilter className="size-3.5 text-[#e53935]" /> Jump to Section
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowFloatingMenu(false)}
                        className="text-white/40 hover:text-white"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>

                    <div className="max-h-[300px] overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-white/10">
                      {items.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => scrollTo(item.id)}
                            className={`w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition ${
                              isActive
                                ? "bg-[#e53935]/20 font-semibold text-[#e53935]"
                                : "text-white/60 hover:bg-white/5 hover:text-white"
                            } ${item.level === 3 ? "pl-5 text-white/50" : ""}`}
                          >
                            <Hash className="size-3 shrink-0 opacity-40" />
                            <span className="truncate">{item.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-zinc-900/90 text-white shadow-xl backdrop-blur-xl transition hover:border-[#e53935]/50 hover:bg-zinc-800"
              title="Back to Top"
            >
              <ArrowUp className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
