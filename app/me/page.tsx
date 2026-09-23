import Image from "next/image";

import DottedSection from "@/components/dotted-section";
import Navbar from "@/components/navbar";
import NowPlaying from "@/components/now-playing";
import Recommendations from "@/components/recommendations";
import SectionReveal from "@/components/section-reveal";
import ShayariFooter from "@/components/shayari-footer";
import Stars from "@/components/stars";

export const metadata = {
  title: "Anubhab Pradhan | Me",
  description: "About Anubhab Pradhan — education, hobbies, and things outside the terminal.",
};

const HOBBIES = [
  {
    title: "Chess",
    description: "The only place where I willingly think three moves ahead.",
  },
  {
    title: "Binge-watching",
    description:
      "Comfort shows, strange documentaries, and anything with a pilot worth staying for.",
  },
  {
    title: "Travelling",
    description:
      "Unfamiliar streets, new places, and stories I haven't heard before.",
  },
  {
    title: "Music",
    description: "Usually one earphone in. Always something playing.",
  },
] as const;

export default function MePage() {
  return (
    <main className="bg-background font-sans text-neutral-100 relative min-h-screen flex-1 overflow-x-clip py-6 sm:py-10">
      <Stars />
      <div className="relative z-10 mx-auto flex max-w-5xl justify-center px-3 sm:px-5">
        <div className="flex w-full max-w-2xl flex-col gap-5">
          <Navbar activePage="me" />
          {/* ponytail: mirrors ThemeBanner's header image only (no IST clock); sync here if the Home header treatment changes */}
          <div className="relative h-40 w-full overflow-hidden border-b border-dotted border-neutral-800 animate-[hero-fade_0.6s_ease_both] sm:h-48">
            <Image
              src="/dark_header.png"
              alt="Cinematic city and mountain landscape"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <DottedSection
            id="about"
            title="ABOUT ME"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <div className="border-dotted border-neutral-800/80 bg-neutral-900/10 relative overflow-hidden rounded-2xl border">
                <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
                  <p className="font-sans text-xs leading-relaxed text-neutral-400 sm:text-sm text-justify [text-align-last:left]">
                    I&apos;m Anubhab Pradhan — pursuing a BE in Artificial
                    Intelligence and Data Science at CMR Institute of Technology,
                    Bangalore. Most of my time goes into building AI systems,
                    figuring out how things work, and turning ideas into
                    something that actually runs. When I&apos;m away from the
                    terminal, I disappear into chess boards, music, unfamiliar
                    streets, and whatever catches my curiosity.
                  </p>
                  <p className="font-sans text-xs leading-relaxed text-neutral-400 sm:text-sm text-justify [text-align-last:left]">
                    This is the part of the portfolio where the terminal fades out
                    and everything else gets a little louder.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="hobbies"
            title="OFF THE TERMINAL"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <div className="border-dotted border-neutral-800/80 bg-neutral-900/10 relative overflow-hidden rounded-2xl border">
                <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
                  <p className="font-mono text-[10px] leading-relaxed tracking-widest text-neutral-500">
                    These are the things I disappear into when I&apos;m away from
                    the terminal.
                  </p>
                  <div className="grid gap-x-6 sm:grid-cols-2">
                    {HOBBIES.map((hobby, i) => (
                      <div
                        key={hobby.title}
                        className="group/hobby flex gap-3 border-t border-dotted border-neutral-800/50 py-3 transition-colors hover:bg-neutral-900/20"
                      >
                        <span className="font-mono pt-0.5 text-[10px] font-semibold text-neutral-600 transition-colors group-hover/hobby:text-[#B90E0A]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex min-w-0 flex-col gap-1">
                          <span className="font-sans text-xs font-semibold text-neutral-200 sm:text-sm">
                            {hobby.title}
                          </span>
                          <span className="font-sans text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                            {hobby.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="relaxing"
            title="WHILE RELAXING..."
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <NowPlaying />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="watching"
            title="THINGS WORTH YOUR TIME."
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Recommendations />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="shayari"
            title="SIRF USKE LIYE..."
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <ShayariFooter />
            </SectionReveal>
          </DottedSection>
        </div>
      </div>
    </main>
  );
}
