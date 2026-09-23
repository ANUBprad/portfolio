import SectionCard from "./section-card";

const BUILDS = [
  {
    label: "01",
    title: "LLM Applications & RAG Systems",
    text: "Designing retrieval-augmented generation pipelines and intelligent language-model applications that handle real-world input, context, and failure modes.",
  },
  {
    label: "02",
    title: "Evaluation Pipelines & ML Infrastructure",
    text: "Building structured evaluation frameworks that measure model behaviour, retrieval quality, and system reliability across repeatable test scenarios.",
  },
  {
    label: "03",
    title: "Production AI Workflows & Cloud",
    text: "Taking AI prototypes to production — event-driven pipelines, failure handling, monitoring, and cloud deployment on AWS and similar platforms.",
  },
  {
    label: "04",
    title: "Developer Tools & Platforms",
    text: "Creating tools, dashboards, and platforms that help other engineers build, evaluate, and ship AI systems with confidence.",
  },
];

export default function WhatIDo() {
  return (
    <SectionCard className="group/build">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5">
        <div className="flex flex-col gap-0 border-t border-dotted border-neutral-800/70 pt-4">
          {BUILDS.map((item) => (
            <div
              key={item.label}
              className="flex gap-3 border-b border-dotted border-neutral-800/50 py-3 transition-colors last:border-b-0 hover:bg-neutral-900/20"
            >
              <span className="font-mono text-[10px] font-semibold text-neutral-600">
                {item.label}
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-sans text-xs font-bold tracking-tight text-heading sm:text-sm">
                  {item.title}
                </h3>
                <p className="text-[11px] leading-relaxed text-neutral-400 text-justify [text-align-last:left]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
