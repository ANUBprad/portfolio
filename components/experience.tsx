import Image from "next/image";

import SectionCard from "./section-card";

const EXPERIENCE = [
  {
    company: "Lamatic.ai",
    role: "Applied AI Intern",
    period: "Jan 2026 – May 2026",
    href: "https://lamatic.ai",
    logo: { src: "/lamatic.png", alt: "Lamatic.ai logo" },
    points: [
      "Engineered AI/ML product workflows and evaluation pipelines for LLM applications, structuring repeatable evaluation paths to assess model behavior and reliability.",
      "Built event-driven integrations between AI workflows and application systems, automating multi-step execution paths and reducing manual intervention across workflows.",
      "Developed production-oriented components for AI applications with an emphasis on reliable execution, failure handling, and maintainable integration boundaries.",
      "Contributed fixes and feature improvements to LangChain and Metaflow, extending practical experience from production AI systems into open-source infrastructure.",
    ],
  },
  {
    company: "Harprana",
    role: "AI Engineer",
    period: "Jul 2026 – Present",
    href: "https://www.haspranahealth.com/",
    logo: { src: "/hasprana.png", alt: "Harprana logo" },
    points: [
      "Engineer AI systems spanning RAG retrieval, model evaluation, and production ML components, taking features from implementation through production-ready integration.",
      "Design evaluation workflows for LLM applications that assess retrieval quality, model behavior, and system reliability across repeatable evaluation scenarios.",
      "Build and refine AI service components with attention to reliability, maintainability, failure handling, and practical production constraints.",
      "Audit and review AI-service code for correctness, maintainability, and production readiness, identifying implementation issues before they propagate into downstream workflows.",
    ],
  },
];

export default function Experience() {
  return (
    <SectionCard>
      <div className="flex flex-col px-4 sm:px-5">
        {EXPERIENCE.map((job) => (
          <article
            key={job.company}
            className="border-b border-dotted border-neutral-800/70 py-3.5 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="flex min-w-0 items-center gap-2.5 font-sans text-sm font-bold tracking-tight text-heading sm:text-[15px]">
                <Image
                  src={job.logo.src}
                  alt={job.logo.alt}
                  width={24}
                  height={24}
                  className="size-5 shrink-0 object-contain sm:size-6"
                />
                <span className="min-w-0">
                  {job.href ? (
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors underline decoration-neutral-600 underline-offset-4 hover:text-neutral-100 hover:decoration-neutral-100"
                    >
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}{" "}
                  | {job.role}
                </span>
              </h3>
              <span className="font-mono shrink-0 text-[10px] text-neutral-500">
                {job.period}
              </span>
            </div>
            <ul className="mt-2.5 flex flex-col gap-2 pl-[30px] sm:pl-[34px]">
              {job.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 text-[11px] leading-relaxed text-neutral-400"
                >
                  <span aria-hidden="true" className="shrink-0 select-none">
                    -
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}