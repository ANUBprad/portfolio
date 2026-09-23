import DottedSection from "@/components/dotted-section";
import Experience from "@/components/experience";
import BhagavadGita from "@/components/bhagavad-gita";
import GitHubActivity from "@/components/github-activity";
import Hero from "@/components/hero";
import LeetCodeActivity from "@/components/leetcode-activity";
import Navbar from "@/components/navbar";
import OpenSource from "@/components/open-source";
import Overview from "@/components/overview";
import Projects from "@/components/projects";
import Research from "@/components/research";
import SectionReveal from "@/components/section-reveal";
import Skills from "@/components/skills";
import Stars from "@/components/stars";
import WhatIDo from "@/components/what-i-build";

export default function Home() {
  return (
    <main className="bg-background font-sans text-neutral-100 relative min-h-screen flex-1 overflow-x-clip py-6 sm:py-10">
      <Stars />
      <div className="relative z-10 mx-auto flex max-w-5xl justify-center px-3 sm:px-5">
        <div className="flex w-full max-w-2xl flex-col gap-5">
          <Navbar activePage="home" />
          <Hero />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Overview />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="what-i-do"
            title="WHAT I DO"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <WhatIDo />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="experience"
            title="EXPERIENCE"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Experience />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="skills"
            title="SKILLS"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Skills />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="projects"
            title="PROJECTS"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Projects />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="research"
            title="RESEARCH & PUBLICATIONS"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <Research />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="open-source"
            title="OPEN SOURCE"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <OpenSource />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="github"
            title="GITHUB ACTIVITY"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <GitHubActivity />
            </SectionReveal>
          </DottedSection>
          <DottedSection
            id="leetcode"
            title="LEETCODE ACTIVITY"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <LeetCodeActivity />
            </SectionReveal>
          </DottedSection>
          <BhagavadGita />
        </div>
      </div>
    </main>
  );
}
