"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Who is Ganesh Shah?",
    answer:
      "Ganesh Shah is a full-stack developer and software engineer based in Biratnagar, Nepal. He specializes in designing and building scalable backend architectures, high-performance REST APIs, and refined user interfaces with Node.js, NestJS, Laravel, Next.js, and TypeScript.",
  },
  {
    question: "What is the official website of Ganesh Shah?",
    answer:
      "The official website of Ganesh Shah is https://ganeshshah.com. It is the verified home for his production software projects, open-source work, achievements, and engineering insights.",
  },
  {
    question: "What projects has Ganesh Shah developed?",
    answer:
      "Ganesh Shah has built numerous applications including Scrim (skill-based Free Fire tournament & scrims platform), NotesChaiyo (collaborative academic sharing platform), BolKharcha (AI-assisted personal expense manager), RestroPRO (restaurant point-of-sale system), NayaMenu (digital QR menu system), and P2P Share (peer-to-peer file transfer).",
  },
  {
    question: "What technical stack does Ganesh Shah specialize in?",
    answer:
      "Ganesh Shah specializes in backend and frontend technologies including Node.js, NestJS, Laravel, Next.js, React, React Native, TypeScript, Tailwind CSS, PostgreSQL, Cloudflare R2, and clean RESTful API design.",
  },
  {
    question: "How can I contact or hire Ganesh Shah?",
    answer:
      "You can contact Ganesh Shah directly via email at hello.ganeshshah@gmail.com. You can also connect with him on his verified profiles on GitHub (@ganexhshah), LinkedIn (ganesh-shah2064), TikTok (@_ganexx), and Instagram (@ganesh_sha1).",
  },
];

export function SeoFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions about Ganesh Shah"
      className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e53935]/40 bg-[#e53935]/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e53935]">
          <HelpCircle className="size-3.5" />
          Frequently Asked Questions
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
          About Ganesh Shah
        </h2>
        <p className="mt-2 text-sm text-neutral-600 sm:text-base dark:text-white/50">
          Everything you need to know about Ganesh Shah, his work, background, and projects.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-neutral-200 bg-white/60 transition-colors dark:border-white/10 dark:bg-white/[0.02]"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-neutral-100/50 dark:hover:bg-white/[0.02]"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-neutral-900 sm:text-base dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 text-neutral-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-[#e53935]" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-neutral-100 px-5 pb-5 pt-3 dark:border-white/5">
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-white/60">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

