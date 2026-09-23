import { siLangchain, siNetflix, siGithub } from "simple-icons";
import SectionCard from "./section-card";
import { BrandIcon } from "./icons";

const CONTRIBUTIONS = [
  {
    project: "LangChain",
    org: "langchain-ai",
    pr: 36480,
    url: "https://github.com/langchain-ai/langchain/pull/36480",
    icon: siLangchain,
    area: "Post-Generation Verification",
    impact: "Validates LLM outputs through a Runnable-based fact-checking workflow",
    tags: ["Python", "LLM Validation", "Runnable"],
  },
  {
    project: "Metaflow",
    org: "Netflix",
    pr: 3061,
    url: "https://github.com/Netflix/metaflow/pull/3061",
    icon: siNetflix,
    area: "Artifact Serialization",
    impact: "Improved error handling around artifact serialization failures",
    tags: ["Python", "ML Pipelines", "Error Handling"],
  },
  {
    project: "OpenVerifiableLLM",
    org: "AOSSIE-Org",
    pr: 80,
    url: "https://github.com/AOSSIE-Org/OpenVerifiableLLM/pull/80",
    icon: siGithub,
    area: "XML Extraction Pipeline",
    impact: "Fixed duplicate output during resume flows in XML text extraction",
    tags: ["Python", "LLM Verification", "Pipeline Fix"],
  },
];

export default function OpenSource() {
  return (
    <SectionCard className="group/os">
      <div className="flex flex-col px-4 py-4 sm:px-5">
        <div className="flex items-center gap-2 border-b border-dotted border-neutral-800/70 pb-3 mb-3">
          <span className="font-mono text-[10px] tracking-widest text-neutral-500">
            CONTRIBUTIONS
          </span>
          <span className="rule-x h-px flex-1" />
          <span className="font-mono text-[10px] text-neutral-600">
            {CONTRIBUTIONS.length} PRs
          </span>
        </div>
        {CONTRIBUTIONS.map((c) => (
          <div
            key={c.url}
            className="group/entry relative flex flex-col gap-2 border-b border-dotted border-neutral-800/50 py-3.5 last:border-b-0 transition-colors hover:bg-neutral-900/20"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <BrandIcon icon={c.icon} className="size-4 shrink-0 text-neutral-500" />
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-bold tracking-tight text-heading">
                    {c.project}
                  </span>
                  <span className="font-mono text-[9px] text-neutral-600">
                    {c.org}
                  </span>
                </div>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`PR #${c.pr} in ${c.project} (opens in a new tab)`}
                className="font-mono shrink-0 text-[11px] text-neutral-300 underline decoration-neutral-600 underline-offset-4 transition-colors hover:text-neutral-100 hover:decoration-neutral-100"
              >
                PR #{c.pr}
                <span aria-hidden="true"> ↗</span>
              </a>
            </div>
            <div className="flex flex-col gap-1 pl-[26px]">
              <span className="font-mono text-[10px] font-medium text-neutral-500">
                {c.area}
              </span>
              <p className="text-[11px] leading-relaxed text-neutral-400 text-justify [text-align-last:left]">
                {c.impact}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-dotted border-neutral-800/60 bg-neutral-900/30 px-1.5 py-0.5 font-mono text-[8px] tracking-wide text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
