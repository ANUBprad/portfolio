import Image from "next/image";

import DottedSection from "./dotted-section";
import Greeting from "./greeting";
import Name from "./name";
import ThemeBanner from "./theme-banner";

const POINTS = [
  "Building production-grade AI systems, evaluation pipelines, and developer tools.",
  "Chess, binge-watching, and travelling are some of my favorite ways to disappear from the terminal.",
  "Always curious about new ideas, unfamiliar places, and things I haven't figured out yet.",
];

export default function Hero() {
  return (
    <DottedSection id="header">
      <section className="border-dotted border-neutral-800/80 bg-neutral-900/10 relative flex flex-col overflow-hidden border">
        <ThemeBanner />
        <div className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-6">
          <div className="flex flex-row items-center gap-3.5 text-left animate-[hero-reveal_0.6s_ease_1.15s_both] sm:gap-5">
            <Image
              src="/pfp.jpg"
              alt="Anubhab Pradhan"
              width={96}
              height={96}
              priority
              className="border-dotted border-neutral-800 aspect-square h-20 w-20 rounded-xl border object-cover sm:h-24 sm:w-24 sm:rounded-[18px]"
            />
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
              <Name className="font-sans text-base leading-[1em] font-bold tracking-tight text-heading sm:text-2xl" />
              <Greeting />
            </div>
          </div>
          <ul className="flex flex-col gap-2 border-t border-dotted border-neutral-800/70 pt-4 text-xs leading-relaxed text-neutral-400 sm:text-sm">
            {POINTS.map((point) => (
              <li key={point} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="bg-neutral-500 mt-[0.55em] size-1 shrink-0 rounded-full"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </DottedSection>
  );
}
