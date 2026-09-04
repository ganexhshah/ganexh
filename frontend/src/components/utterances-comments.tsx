"use client";

import { useEffect, useRef } from "react";

type UtterancesCommentsProps = {
  issueTerm: string;
};

export function UtterancesComments({ issueTerm }: UtterancesCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (container.querySelector("script[src='https://utteranc.es/client.js']")) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.setAttribute("repo", "ganexhshah/ganexh");
    script.setAttribute("issue-term", issueTerm);
    script.setAttribute("theme", "github-dark");
    script.setAttribute("crossorigin", "anonymous");
    container.appendChild(script);
  }, [issueTerm]);

  return (
    <section
      aria-label="Comments"
      className="mt-16 border-t border-white/10 pt-10"
    >
      <h2 className="mb-5 text-xl font-semibold text-white">Comments</h2>
      <div ref={containerRef} />
    </section>
  );
}
