import DottedSection from "@/components/dotted-section";
import Navbar from "@/components/navbar";
import NowPlaying from "@/components/now-playing";
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
    description: "The only place where I think three moves ahead.",
  },
  {
    title: "Binge-watching",
    description: "Comfort shows, obscure documentaries, and anything with a good pilot episode.",
  },
  {
    title: "Travelling",
    description: "New places, unfamiliar streets, and stories I haven't heard yet.",
  },
  {
    title: "Music",
    description: "Always one earphone in. Always.",
  },
] as const;

export default function MePage() {
  return (
    <main className="bg-background font-sans text-neutral-100 relative min-h-screen flex-1 overflow-x-clip py-6 sm:py-10">
      <Stars />
      <div className="relative z-10 mx-auto flex max-w-5xl justify-center px-3 sm:px-5">
        <div className="flex w-full max-w-2xl flex-col gap-5">
          <Navbar activePage="me" />
          <DottedSection
            id="about"
            title="ABOUT ME"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <div className="border-dotted border-neutral-800/80 bg-neutral-900/10 relative overflow-hidden rounded-2xl border">
                <div className="flex flex-col gap-4 px-5 py-5 sm:px-6 sm:py-6">
                  <p className="font-sans text-xs leading-relaxed text-neutral-400 sm:text-sm">
                    I&apos;m Anubhab Pradhan — a Computer Science undergrad at CMR
                    Institute of Technology, Bangalore, specialization in AI &amp;
                    Data Science. I build AI systems, write code that ships, and
                    spend the rest of my time disappearing into chess boards and
                    unfamiliar streets.
                  </p>
                  <p className="font-sans text-xs leading-relaxed text-neutral-400 sm:text-sm">
                    This is the part of the portfolio where the terminal fades out
                    and everything else fades in.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="education"
            title="EDUCATION"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <div className="border-dotted border-neutral-800/80 bg-neutral-900/10 relative overflow-hidden rounded-2xl border">
                <div className="flex flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm font-semibold text-neutral-200 sm:text-base">
                      CMR Institute of Technology, Bangalore
                    </span>
                    <span className="font-mono text-[10px] text-neutral-500">
                      2023 – 2027
                    </span>
                  </div>
                  <p className="font-sans text-xs text-neutral-500 sm:text-sm">
                    B.Tech in Computer Science — Artificial Intelligence &amp; Data
                    Science
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
                <div className="grid gap-4 sm:grid-cols-2 px-5 py-5 sm:px-6 sm:py-6">
                  {HOBBIES.map((hobby) => (
                    <div key={hobby.title} className="flex flex-col gap-1">
                      <span className="font-sans text-xs font-semibold text-neutral-200 sm:text-sm">
                        {hobby.title}
                      </span>
                      <span className="font-sans text-[11px] leading-relaxed text-neutral-500 sm:text-xs">
                        {hobby.description}
                      </span>
                    </div>
                  ))}
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
