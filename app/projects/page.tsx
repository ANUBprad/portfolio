import type { Metadata } from "next";

import DottedSection from "@/components/dotted-section";
import Navbar from "@/components/navbar";
import { ProjectGrid } from "@/components/projects";
import SectionReveal from "@/components/section-reveal";
import { MORE_PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "More Projects — Pradhan-e-portfolio",
  description: "Additional projects built by Pradhan-e-portfolio.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-background font-sans text-neutral-100 min-h-screen flex-1 overflow-x-clip py-6 sm:py-10">
      <div className="mx-auto flex max-w-5xl justify-center px-3 sm:px-5">
        <div className="flex w-full max-w-2xl flex-col gap-5">
          <Navbar />
          <DottedSection
            id="projects"
            title="More Projects"
            className="flex items-center px-3 py-2 sm:px-4"
          />
          <DottedSection className="px-2 sm:px-3">
            <SectionReveal>
              <ProjectGrid projects={MORE_PROJECTS} start={3} />
            </SectionReveal>
          </DottedSection>
        </div>
      </div>
    </main>
  );
}
