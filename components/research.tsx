import SectionCard from "./section-card";

const PAPER = {
  title: "Benchmarking Small Language Models for Domain-Specific Question Answering",
  subtitle: "A Comparative Study of Phi-3-mini, Mistral-7B, and Gemma-2 on SQuAD v2",
  authors: "Manzil Shrestha and Anubhab Pradhan",
  affiliation: "Dept. of AI & Data Science, CMR Institute of Technology, Bengaluru, India",
  pdf: "/ICAC2N_2026_SLM_Benchmarking.pdf",
};

const POINTS = [
  {
    label: "Controlled Evaluation",
    text: "Compared Phi-3-mini-4k-instruct, Mistral-7B-Instruct-v0.2, and Gemma-2-2b-it under identical zero-shot conditions on SQuAD v2.",
  },
  {
    label: "Benchmark Methodology",
    text: "Evaluated 200 validation examples using Exact Match, F1 score, and average per-query inference time with a fixed seed for reproducibility.",
  },
  {
    label: "Efficiency vs. Accuracy",
    text: "The experiments expose a trade-off between QA accuracy and inference latency across the three SLMs, with no single model dominating every measured dimension.",
  },
  {
    label: "Key Finding",
    text: "The study identifies a generative–extractive mismatch: instruction-tuned models can produce semantically correct full-sentence answers that receive poor EM/F1 scores when evaluated against short extractive spans.",
  },
];

export default function Research() {
  return (
    <SectionCard>
      <div className="flex flex-col px-4 py-3.5 sm:px-5">
        <div className="flex flex-col gap-2 border-b border-dotted border-neutral-800/70 pb-3.5">
          <p className="font-mono text-[10px] text-neutral-500">Research Paper</p>
          <h3 className="font-sans text-sm font-bold tracking-tight text-heading sm:text-[15px]">
            {PAPER.title}
          </h3>
          <p className="font-sans text-[11px] text-neutral-400">{PAPER.subtitle}</p>
          <p className="font-sans text-[11px] text-neutral-400">{PAPER.authors}</p>
          <p className="font-mono text-[10px] text-neutral-500">{PAPER.affiliation}</p>
        </div>
        <ul className="flex flex-col">
          {POINTS.map((point, i) => (
            <li
              key={point.label}
              className="flex flex-col gap-1 border-b border-dotted border-neutral-800/70 py-3 last:border-b-0"
            >
              <span className="font-mono text-[10px] tracking-wide text-neutral-500 uppercase">
                {String(i + 1).padStart(2, "0")} · {point.label}
              </span>
              <p className="text-[11px] leading-relaxed text-neutral-400">
                {point.text}
              </p>
            </li>
          ))}
        </ul>
        <a
          href={PAPER.pdf}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Research Paper, opens in a new tab"
          className="font-mono self-start rounded-lg border border-dotted border-neutral-800 bg-neutral-900/40 px-3 py-1.5 text-[11px] text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-100 focus-visible:text-neutral-100"
        >
          View Research Paper
          <span aria-hidden="true"> ↗</span>
        </a>
      </div>
    </SectionCard>
  );
}