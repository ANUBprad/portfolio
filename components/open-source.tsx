import SectionCard from "./section-card";

const CONTRIBUTIONS = [
  {
    project: "LangChain",
    pr: 36480,
    url: "https://github.com/langchain-ai/langchain/pull/36480",
    description:
      "Contributed a post-generation verification component that validates LLM outputs through a Runnable-based fact-checking workflow.",
  },
  {
    project: "Metaflow",
    pr: 3061,
    url: "https://github.com/Netflix/metaflow/pull/3061",
    description:
      "Improved error handling around artifact serialization failures, making failure paths more explicit and robust.",
  },
  {
    project: "OpenVerifiableLLM",
    pr: 80,
    url: "https://github.com/AOSSIE-Org/OpenVerifiableLLM/pull/80",
    description:
      "Fixed duplicate output during resume flows in XML text extraction, addressing an issue in the extraction/resume pipeline.",
  },
];

export default function OpenSource() {
  return (
    <SectionCard>
      <div className="flex flex-col px-4 sm:px-5">
        {CONTRIBUTIONS.map((c) => (
          <div
            key={c.url}
            className="flex flex-col gap-2 border-b border-dotted border-neutral-800/70 py-3.5 last:border-b-0"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-sans text-sm font-bold tracking-tight text-heading">
                {c.project}
              </span>
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
            <p className="text-[11px] leading-relaxed text-neutral-400">
              {c.description}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}