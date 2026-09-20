export type Project = {
  name: string;
  href?: string;
  status?: string;
  description?: string;
  tags?: string[];
};

export const PROJECTS: Project[] = [
  {
    name: "RedOps",
    href: "https://github.com/ANUBprad/redops",
    description:
      "Production-grade LLM evaluation and red-teaming platform covering hallucination, jailbreak resistance, latency, cost, and token usage across providers.",
    tags: ["Python", "LLM Evaluation", "Docker"],
  },
  {
    name: "Kairos",
    href: "https://github.com/ANUBprad/kairos",
    description:
      "Open-source platform for transparent RAG development, evaluation, experimentation, and explainable AI.",
    tags: ["TypeScript", "RAG", "Explainable AI"],
  },
  {
    name: "LocalBench",
    href: "https://github.com/ANUBprad/localbench",
    description:
      "Offline-first, privacy-first local LLM benchmarking and model-selection platform.",
    tags: ["Python", "Ollama", "LLM Benchmarking"],
  },
  { name: "MukhdaX" },
];

export const HOME_PROJECTS = PROJECTS.slice(0, 2);
export const MORE_PROJECTS = PROJECTS.slice(2);
