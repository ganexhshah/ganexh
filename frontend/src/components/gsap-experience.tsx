"use client";

import { SiteIntro } from "@/components/site-intro";
import { ScrollProgress } from "@/components/scroll-progress";
import { GsapCursor } from "@/components/gsap-ui";
import { GsapPageEffects } from "@/components/gsap-page-effects";

export function GsapExperience({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteIntro />
      <ScrollProgress />
      <GsapCursor />
      <GsapPageEffects />
      {children}
    </>
  );
}
