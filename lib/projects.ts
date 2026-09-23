export type ProjectStatus = "COMPLETED" | "IN-PROGRESS";

export type Project = {
  name: string;
  href?: string;
  status?: ProjectStatus;
  description?: string;
  tags?: string[];
};

export const PROJECTS: Project[] = [
  {
    name: "Kairos",
    href: "https://github.com/ANUBprad/kairos",
    status: "IN-PROGRESS",
    description:
      "Open-source platform for transparent RAG development, evaluation, experimentation, and explainable AI.",
    tags: ["TypeScript", "RAG", "Explainable AI"],
  },
  {
    name: "RedOps",
    href: "https://github.com/ANUBprad/redops",
    status: "IN-PROGRESS",
    description:
      "Production-grade LLM evaluation and red-teaming platform covering hallucination, jailbreak resistance, latency, cost, and token usage across providers.",
    tags: ["Python", "LLM Evaluation", "Docker"],
  },
  {
    name: "MukhdaX",
    href: "https://github.com/ANUBprad/face-id-verification",
    status: "IN-PROGRESS",
    description:
      "Multi-stage image provenance pipeline combining face detection, ArcFace representations, reverse-image discovery, metadata extraction, and deterministic evidence fingerprinting. Integrated Google Lens discovery through SerpApi and Ethereum Sepolia anchoring to produce independently verifiable provenance records with explicit failure and blocked states.",
    tags: ["FastAPI", "InsightFace", "SerpApi", "Ethereum Sepolia"],
  },
  {
    name: "LocalBench",
    href: "https://github.com/ANUBprad/localbench",
    status: "IN-PROGRESS",
    description:
      "Offline-first LLM benchmarking platform for evaluating local models across quality, performance, and resource constraints through standardized workloads. Built around Ollama with structured validation, reproducible benchmark artifacts, hardware profiling, and model-selection workflows — no cloud LLM dependencies.",
    tags: ["Python", "Ollama", "LLM Benchmarking"],
  },
  {
    name: "APEXiq",
    href: "https://github.com/ANUBprad/apex-iq",
    status: "COMPLETED",
    description:
      "Full-stack F1 race intelligence platform combining Monte Carlo simulation, historical race analysis, live telemetry, ML models, and retrieval-augmented intelligence for strategy decisions. Developed an AI race-engineer workflow with explainable strategy recommendations, contextual memory, telemetry analysis, and simulation-backed pit-wall decision support.",
    tags: ["React", "FastAPI", "RAG", "XGBoost", "Docker"],
  },
];

export const HOME_PROJECTS = PROJECTS.slice(0, 2);
export const MORE_PROJECTS = PROJECTS.slice(2);