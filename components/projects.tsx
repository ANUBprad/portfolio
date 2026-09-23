import Image from "next/image";
import Link from "next/link";
import { siGithub } from "simple-icons";

import { BrandIcon } from "./icons";
import SectionCard from "./section-card";
import { HOME_PROJECTS, type Project, type ProjectStatus } from "@/lib/projects";

const PLACEHOLDER = "/project-placeholder.svg";

const STATUS_STYLES: Record<ProjectStatus, string> = {
  COMPLETED: "text-[#B90E0A]",
  "IN-PROGRESS": "text-green-400",
};

export function ProjectGrid({
  projects,
  start = 1,
}: {
  projects: Project[];
  start?: number;
}) {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-2 sm:gap-3.5">
      {projects.map((project, index) => (
        <SectionCard key={project.name} className="flex flex-col !rounded-xl p-2">
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-md border border-[color:var(--frame)] bg-neutral-950 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.75)]">
            <Image
              src={PLACEHOLDER}
              alt={`${project.name} preview`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-80 transition-opacity hover:opacity-100"
            />
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-2 p-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="font-mono shrink-0 text-[10px] font-semibold text-neutral-600">
                  {String(start + index).padStart(2, "0")}
                </span>
                <h3 className="font-sans text-sm font-bold tracking-tight text-heading">
                  {project.name}
                </h3>
              </div>
              {project.status ? (
                <span
                  className={`border-dotted border-neutral-800 font-mono rounded border px-1.5 py-0.5 text-[10px] ${STATUS_STYLES[project.status]}`}
                >
                  {project.status}
                </span>
              ) : null}
            </div>
            {project.description ? (
              <p className="line-clamp-4 text-[11px] leading-relaxed text-neutral-400 text-justify [text-align-last:left]">
                {project.description}
              </p>
            ) : null}
            {project.tags && project.tags.length > 0 ? (
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border-dotted border-neutral-800 font-mono rounded border px-1.5 py-0.5 text-[10px] text-neutral-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            {project.href ? (
              <div className="flex justify-end pt-0.5">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.name} on GitHub (opens in a new tab)`}
                  className="flex size-7 items-center justify-center rounded-lg border border-dotted border-neutral-800 bg-neutral-900/40 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-neutral-100 focus-visible:text-neutral-100"
                >
                  <BrandIcon icon={siGithub} className="size-3.5" />
                </a>
              </div>
            ) : null}
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

export default function Projects() {
  return (
    <div className="flex w-full flex-col items-center gap-3.5">
      <ProjectGrid projects={HOME_PROJECTS} />
      <Link
        href="/projects"
        className="font-mono inline-flex items-center gap-1.5 rounded-xl border border-dotted border-neutral-800 bg-neutral-900/40 px-3.5 py-2 text-[11px] text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-100 focus-visible:text-neutral-100"
      >
        More Projects
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
