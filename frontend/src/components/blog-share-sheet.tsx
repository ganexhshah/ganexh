"use client";

import { useState } from "react";
import { Check, Copy, Mail, Share2 } from "lucide-react";

type BlogShareSheetProps = {
  title: string;
  url: string;
};

export function BlogShareSheet({ title, url }: BlogShareSheetProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }
    await copyLink();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-y border-white/10 py-4">
      <span className="mr-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
        Share
      </span>
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/70 transition-colors hover:border-[#e53935]/60 hover:text-white"
      >
        <Share2 className="size-3.5" />
        Share
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/70 transition-colors hover:border-[#e53935]/60 hover:text-white"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/70 transition-colors hover:border-[#e53935]/60 hover:text-white"
      >
        <Mail className="size-3.5" />
        Email
      </a>
    </div>
  );
}
