"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function ThemeBanner() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hourCycle: "h23",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const tick = () => {
      setTime(format.format(new Date()));
    };

    tick();

    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-40 w-full overflow-hidden border-b border-dotted border-neutral-800 animate-[hero-fade_0.6s_ease_both] sm:h-48">
      <Image
        src="/dark_header.png"
        alt="Cinematic city and mountain landscape"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div
        aria-label="Current time in India Standard Time"
        className="bg-neutral-900/60 border-dotted border-neutral-700/70 absolute right-4 bottom-3 flex items-baseline gap-1 rounded-md border px-2 py-1 font-mono text-[10px] font-semibold whitespace-nowrap text-neutral-100 backdrop-blur-sm sm:right-[22px] sm:bottom-[18px] sm:text-[11px]"
      >
        <span>{time ?? "··:··:··"}</span>

        <span
          className="text-neutral-400 text-[0.9em]"
          aria-hidden="true"
        >
          IST
        </span>
      </div>
    </div>
  );
}