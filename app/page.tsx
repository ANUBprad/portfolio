import Contact from "@/components/contact";
import DottedSection from "@/components/dotted-section";
import DailyQuote from "@/components/daily-quote";
import Experience from "@/components/experience";
import GitHubActivity from "@/components/github-activity";
import Hero from "@/components/hero";
import LeetCodeActivity from "@/components/leetcode-activity";
import Navbar from "@/components/navbar";
import OpenSource from "@/components/open-source";
import Overview from "@/components/overview";
import Projects from "@/components/projects";
import Research from "@/components/research";
import SectionReveal from "@/components/section-reveal";
import ShayariFooter from "@/components/shayari-footer";
import Skills from "@/components/skills";
import Stars from "@/components/stars";
import WelcomeIntro from "@/components/welcome-intro";

export default function Home() {
  return (
    <main className="bg-background font-sans text-neutral-100 relative min-h-screen flex-1 overflow-x-clip py-6 sm:py-10">
      <WelcomeIntro />
      <Stars />
      <div className="mx-auto flex max-w-5xl justify-center px-3 sm:px-5">
        <div className="flex w-full max-w-2xl flex-col gap-5">
          <Navbar />
          <Hero />
          <DottedSection
            id="overview"
            title="Overview"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Overview />
            </SectionReveal>
          </DottedSection>
          <DottedSection id="quote" className="px-2 sm:px-3">
            <SectionReveal>
              <DailyQuote />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="projects"
            title="Projects"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Projects />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="experience"
            title="Experience"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Experience />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="skills"
            title="Skills"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Skills />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="open-source"
            title="Open Source"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <OpenSource />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="github"
            title="GitHub Activity"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <GitHubActivity />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="leetcode"
            title="LeetCode Activity"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <LeetCodeActivity />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="research"
            title="Research & Publications"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Research />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="contact"
            title="Contact"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Contact />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="shayari"
            title="Sirf uske liye..."
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