import Image from "next/image";

import DottedSection from "./dotted-section";
import Greeting from "./greeting";
import Name from "./name";
import ThemeBanner from "./theme-banner";

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
        </div>
      </section>
    </DottedSection>
  );
}
