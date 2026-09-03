"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light") {
        setTheme("light");
        document.documentElement.classList.remove("dark");
      } else {
        setTheme("dark");
        document.documentElement.classList.add("dark");
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {}

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div
        className={`size-9 rounded-full border border-white/10 bg-white/5 opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex size-9 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 border-white/15 bg-white/10 text-white hover:border-white/30 hover:bg-white/20 dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/20 not-dark:border-neutral-800/20 not-dark:bg-neutral-900/10 not-dark:text-neutral-900 not-dark:hover:bg-neutral-900/15 ${className}`}
      aria-label={isDark ? "Switch to normal (light) mode" : "Switch to dark mode"}
      title={isDark ? "Switch to normal (light) mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="size-4.5 text-amber-300 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="size-4.5 text-neutral-800 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}

