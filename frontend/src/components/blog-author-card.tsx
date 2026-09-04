import Image from "next/image";
import Link from "next/link";

import { socialLinks } from "@/data/social";

export function BlogAuthorCard() {
  return (
    <aside className="mt-12 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <Image
        src="/profile-ClwFbffV.jpg"
        alt="Ganesh Shah"
        width={56}
        height={56}
        className="size-14 rounded-full object-cover"
      />
      <div>
        <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
          Written by
        </p>
        <Link
          href="/about"
          className="mt-1 block font-semibold text-white transition-colors hover:text-[#e53935]"
        >
          Ganesh Shah
        </Link>
        <p className="mt-1 text-xs text-white/50">
          Full-stack developer and software engineer from Nepal.
        </p>
        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-[#e53935] hover:underline"
        >
          View profile
        </a>
      </div>
    </aside>
  );
}
