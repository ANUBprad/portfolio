import SectionCard from "./section-card";

const PAPER = {
  title: "Benchmarking Small Language Models for Domain-Specific Question Answering",
  subtitle: "A Comparative Study of Phi-3-mini, Mistral-7B, and Gemma-2 on SQuAD v2",
  pdf: "/ICAC2N_2026_SLM_Benchmarking.pdf",
};

const TAGS = [
  "SLM",
  "QUESTION ANSWERING",
  "SQuAD v2",
  "PHI-3-MINI",
  "MISTRAL-7B",
  "GEMMA-2",
];

const POINTS = [
  {
    text: "Compared Phi-3-mini-4k-instruct, Mistral-7B-Instruct-v0.2, and Gemma-2-2b-it under identical zero-shot conditions on SQuAD v2.",
  },
  {
    text: "Evaluated 200 validation examples using Exact Match, F1 score, and average per-query inference time with a fixed seed for reproducibility.",
  },
  {
    text: "The experiments expose a trade-off between QA accuracy and inference latency across the three SLMs, with no single model dominating every measured dimension.",
  },
  {
    text: "The study identifies a generative–extractive mismatch: instruction-tuned models can produce semantically correct full-sentence answers that receive poor EM/F1 scores when evaluated against short extractive spans.",
  },
];

export default function Research() {
  return (
    <SectionCard className="group/research">
      <div className="research-scan relative flex flex-col px-4 py-4 sm:px-5">
        {/* Subtle dotted grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Eyebrow */}
        <div className="relative mb-3 flex items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-neutral-500">
            RESEARCH / 2026
          </span>
          <span className="rule-x h-px flex-1" />
        </div>

        {/* Title block */}
        <div className="relative mb-4 border-b border-dotted border-neutral-800/70 pb-4">
          <h3 className="font-sans text-sm font-bold leading-snug tracking-tight text-heading sm:text-[15px]">
            {PAPER.title}
          </h3>
          <p className="mt-1 font-sans text-[11px] text-neutral-400">
            {PAPER.subtitle}
          </p>
        </div>

        {/* Technical tag strip */}
        <div className="relative mb-4 flex flex-wrap gap-1.5">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded border border-dotted border-neutral-800/60 bg-neutral-900/30 px-2 py-0.5 font-mono text-[9px] tracking-wide text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Research summary */}
        <div className="relative mb-4 border-l border-dotted border-neutral-800/70 pl-3">
          <p className="font-sans text-[11px] leading-relaxed text-neutral-400 sm:text-xs text-justify [text-align-last:left]">
            Benchmarks small language models for domain-specific question
            answering. Compares Phi-3-mini, Mistral-7B, and Gemma-2 on SQuAD v2
            using Exact Match and F1 evaluation, while examining inference time
            and the generative–extractive mismatch in instruction-tuned models.
          </p>
        </div>

        {/* Key research points */}
        <div className="relative mb-4 flex flex-col gap-0">
          {POINTS.map((point, i) => (
            <div
              key={i}
              className="research-point group/point flex gap-3 border-b border-dotted border-neutral-800/50 py-3 transition-colors last:border-b-0 hover:bg-neutral-900/20"
            >
              <span className="font-mono text-[10px] font-semibold text-neutral-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[11px] leading-relaxed text-neutral-400 text-justify [text-align-last:left] group-hover/point:text-neutral-300">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* Paper link */}
        <a
          href={PAPER.pdf}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Research Paper, opens in a new tab"
          className="research-link group/link font-mono relative z-10 self-start rounded-lg border border-dotted border-neutral-800 bg-neutral-900/40 px-3 py-1.5 text-[11px] text-neutral-300 transition-all hover:border-neutral-600 hover:text-neutral-100 focus-visible:text-neutral-100"
        >
          View Research Paper
          <span aria-hidden="true"> ↗</span>
        </a>
      </div>
    </SectionCard>
  );
}
