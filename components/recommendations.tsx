"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

import { RECOMMENDATIONS, type Recommendation } from "@/lib/recommendations";
import SectionCard from "./section-card";

const pad = (i: number) => String(i + 1).padStart(2, "0");

function WatchLabel() {
  return (
    <span className="font-mono inline-flex items-center gap-1.5 text-[10px] tracking-wider text-neutral-500 transition-colors duration-300 group-hover:text-[#B90E0A]">
      WATCH
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </span>
  );
}

function RecommendationEntry({ item, index }: { item: Recommendation; index: number }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch "${item.title}" by ${item.creator} on YouTube (opens in a new tab)`}
      className="group flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-dotted border-neutral-800/80 bg-neutral-900/10 transition-colors duration-300 hover:border-neutral-600/70 hover:bg-neutral-900/20"
    >
      {/* Top row: index + thumbnail | category + title + author */}
      <div className="flex flex-col md:flex-row md:items-start md:gap-7 md:px-5 md:pt-5">
        <div className="md:flex md:shrink-0 md:items-start md:gap-4">
          <span className="font-mono hidden w-5 shrink-0 pt-0.5 text-[10px] font-semibold text-neutral-600 md:block">
            {pad(index)}
          </span>
          <div className="relative aspect-video w-full overflow-hidden md:w-56">
            <Image
              src={`https://i.ytimg.com/vi/${item.videoId}/hq720.jpg`}
              alt={`${item.title} by ${item.creator} — YouTube thumbnail`}
              fill
              sizes="(min-width: 768px) 224px, 92vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-col px-4 pt-4 md:flex-1 md:px-0 md:pt-0">
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#B90E0A] sm:text-[10px]">
            {item.category}
          </span>
          <h3 className="font-sans mt-1.5 text-sm leading-snug font-bold tracking-tight text-heading sm:text-[15px]">
            {item.title}
          </h3>
          <span className="font-sans mt-1 text-xs text-neutral-500">{item.creator}</span>
        </div>
      </div>

      {/* Bottom area: about + why I like it */}
      <div className="px-4 pt-3 pb-4 md:px-5 md:pt-4 md:pb-5">
        <div className="rule-x h-px w-full" aria-hidden="true" />
        <div className="font-sans mt-3 text-[11px] leading-relaxed text-neutral-400 sm:text-xs">
          <span className="font-mono block text-[9px] tracking-widest text-[#B90E0A]">
            ABOUT THE VIDEO
          </span>
          <p className="mt-1 text-justify [text-align-last:left]">{item.summary}</p>
        </div>
        <div className="font-sans mt-3 text-[11px] leading-relaxed text-neutral-300 sm:text-xs">
          <span className="font-mono block text-[9px] tracking-widest text-[#B90E0A]">
            WHY I LIKE IT
          </span>
          <p className="mt-1 text-justify [text-align-last:left]">{item.reason}</p>
        </div>
        <div className="flex items-center justify-end pt-4">
          <WatchLabel />
        </div>
      </div>
    </a>
  );
}

export default function Recommendations() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(RECOMMENDATIONS.length - 1, Math.max(0, index)));
  };

  const scrollToSlide = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <SectionCard>
        <div className="flex flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6">
          <p className="font-sans text-sm leading-relaxed text-neutral-300 sm:text-base">
            Some things taught me something.
            <br />
            Some changed how I think.
            <br />
            Some were simply too good not to share.
          </p>
        </div>
      </SectionCard>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="region"
        aria-label="Recommended videos, swipe to browse"
        className="flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:snap-none md:flex-col md:gap-5 md:overflow-visible"
      >
        {RECOMMENDATIONS.map((item, i) => (
          <RecommendationEntry key={item.videoId} item={item} index={i} />
        ))}
      </div>

      <div
        className="flex items-center justify-center gap-2 md:hidden"
        role="group"
        aria-label="Video carousel pagination"
      >
        {RECOMMENDATIONS.map((item, i) => (
          <button
            key={item.videoId}
            type="button"
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to video ${i + 1}: ${item.title}`}
            aria-current={active === i ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? "w-5 bg-[#B90E0A]" : "w-1.5 bg-neutral-600 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}