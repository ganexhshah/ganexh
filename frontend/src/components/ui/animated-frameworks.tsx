"use client"

import { useEffect, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

type StackItem = {
  id: string
  content: ReactNode
}

const STACK_ITEMS: StackItem[] = [
  {
    id: "mern",
    content: (
      <span className="text-[10px] font-bold tracking-[0.18em] text-neutral-700 dark:text-neutral-100 sm:text-xs">
        MERN
      </span>
    ),
  },
  {
    id: "python",
    content: (
      <Icons.python className="size-6 text-[#3776AB] dark:text-[#5BA3E0] [@media(min-width:500px)]:size-9" />
    ),
  },
  {
    id: "github",
    content: (
      <Icons.gitHub className="size-6 text-neutral-700 dark:text-neutral-100 [@media(min-width:500px)]:size-9" />
    ),
  },
  {
    id: "openai",
    content: (
      <Icons.openai className="size-6 text-neutral-700 dark:text-neutral-100 [@media(min-width:500px)]:size-9" />
    ),
  },
]

type AnimatedFrameworksProps = {
  cardTitle?: string
  cardDescription?: string
  compact?: boolean
}

const AnimatedFrameworks = ({
  cardTitle = "Full-Stack Toolkit",
  cardDescription = "Building with MERN, Python, GitHub, and OpenAI — from backend APIs to polished frontends.",
  compact = false,
}: AnimatedFrameworksProps) => {
  return (
    <div
      className={cn(
        "relative",
        "flex flex-col justify-between",
        compact ? "h-full min-h-0 space-y-2" : "h-[20rem] space-y-4",
        "rounded-md border bg-white shadow-sm",
        "dark:border-neutral-800/50 dark:bg-[#171717]",
        "border-neutral-200"
      )}
    >
      <FrameworkCard items={STACK_ITEMS} compact={compact} />
      <div className={cn("px-4", compact ? "pb-2" : "pb-4")}>
        <div
          className={cn(
            "font-semibold text-neutral-900 dark:text-white",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {cardTitle}
        </div>
        <div
          className={cn(
            "text-neutral-600 dark:text-neutral-400",
            compact ? "mt-0.5 line-clamp-1 text-[10px]" : "mt-2 text-xs"
          )}
        >
          {cardDescription}
        </div>
      </div>
    </div>
  )
}

export default AnimatedFrameworks

function FrameworkCard({
  items,
  compact = false,
}: {
  items: StackItem[]
  compact?: boolean
}) {
  const [transforms, setTransforms] = useState<string[]>(() =>
    items.map(() => "none")
  )

  useEffect(() => {
    let cancelled = false

    const cycleAnimations = async () => {
      const upStyle = "translateY(-3.71px) rotateX(10.71deg) translateZ(20px)"
      const downStyle = "none"
      const transitionDuration = 1100
      const durationOfUpState = 1200
      const delayBetweenCards = 500

      while (!cancelled) {
        for (let i = 0; i < items.length; i++) {
          setTransforms(items.map((_, index) => (index === i ? upStyle : downStyle)))
          await new Promise((resolve) => setTimeout(resolve, durationOfUpState))
          if (cancelled) return

          setTransforms(items.map(() => downStyle))
          await new Promise((resolve) =>
            setTimeout(resolve, transitionDuration + delayBetweenCards)
          )
          if (cancelled) return
        }
      }
    }

    cycleAnimations()

    return () => {
      cancelled = true
    }
  }, [items])

  const cardClasses = cn(
    "flex aspect-square items-center justify-center rounded-md border bg-gradient-to-b from-neutral-50 to-neutral-100 p-3",
    "dark:border-neutral-800 dark:from-[#272727] dark:to-[#3d3d3d]",
    "border-neutral-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
    "transition-transform duration-1000 ease-out will-change-transform",
    compact
      ? "h-10 w-10 [@media(min-width:500px)]:h-12 [@media(min-width:500px)]:w-12"
      : "[@media(min-width:320px)]:h-16 [@media(min-width:500px)]:h-28"
  )

  return (
    <div
      className={cn(
        "relative",
        "flex flex-col items-center justify-center gap-1",
        compact ? "min-h-0 flex-1 w-full" : "h-[14.5rem] w-full"
      )}
    >
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className={cn("h-full max-w-full", compact ? "w-[10rem]" : "w-[18rem]")}>
          <svg
            className="h-full w-full"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
          >
            <g
              stroke="currentColor"
              strokeWidth="0.1"
              className="text-neutral-400 dark:text-neutral-600"
            >
              <path d="M 1 0 v 5 q 0 5 5 5 h 39 q 5 0 5 5 v 71 q 0 5 5 5 h 39 q 5 0 5 5 v 5" />
            </g>
            <g mask="url(#framework-mask)">
              <circle
                className="frameworkline framework-line"
                cx="0"
                cy="0"
                r="12"
                fill="url(#framework-blue-grad)"
              />
            </g>
            <defs>
              <mask id="framework-mask">
                <path
                  d="M 1 0 v 5 q 0 5 5 5 h 39 q 5 0 5 5 v 71 q 0 5 5 5 h 39 q 5 0 5 5 v 5"
                  strokeWidth="0.3"
                  stroke="white"
                />
              </mask>
              <radialGradient id="framework-blue-grad" fx="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center justify-center px-2",
          compact ? "gap-1.5" : "gap-2 sm:gap-3",
          "[perspective:1000px] [transform-style:preserve-3d]"
        )}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cardClasses}
            style={{ transform: transforms[index] ?? "none" }}
          >
            {item.content}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 h-3 w-full bg-gradient-to-t from-white to-transparent dark:from-[#171717]" />
    </div>
  )
}
