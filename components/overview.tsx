import Link from "next/link";
import { siGithub, siLeetcode, siX } from "simple-icons";
import type { ComponentProps, ReactElement } from "react";
import SectionCard from "./section-card";
import { CONTACT } from "@/lib/contact";
import { BrandIcon, LinkedInIcon } from "./icons";

const ICONS: Record<string, (props: ComponentProps<"svg">) => ReactElement> = {
  GitHub: (props) => <BrandIcon icon={siGithub} {...props} />,
  LinkedIn: LinkedInIcon,
  X: (props) => <BrandIcon icon={siX} {...props} />,
  LeetCode: (props) => <BrandIcon icon={siLeetcode} {...props} />,
};

const ORDER = ["GitHub", "X", "LinkedIn", "LeetCode"];

function IconAction({ label }: { label: string }) {
  const row = CONTACT.find((c) => c.label === label);
  if (!row) return null;
  const Icon = ICONS[label];
  const external = row.href.startsWith("http");
  return (
    <a
      href={row.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${label}${external ? " (opens in a new tab)" : ""}`}
      className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-dotted border-neutral-800 bg-neutral-900/40 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-neutral-100 focus-visible:text-neutral-100"
    >
      <Icon className="size-4" />
    </a>
  );
}

export default function Overview() {
  return (
    <SectionCard>
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5">
        <p className="font-sans text-xs leading-relaxed text-neutral-400 sm:text-sm text-justify [text-align-last:left]">
          AI Engineer focused on building reliable intelligent systems across LLM
          applications, RAG, evaluation, production ML, cloud platforms, and
          developer tooling. I work at the intersection of AI systems and software
          engineering, turning experimental ideas into measurable, maintainable,
          and production-ready software. Outside the terminal, chess,
          binge-watching, and travelling are my favourite ways to disappear —
          always curious about new ideas, unfamiliar places, and things I
          haven&apos;t figured out yet.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 border-t border-dotted border-neutral-800/70 pt-4">
          {ORDER.map((label) => (
            <IconAction key={label} label={label} />
          ))}
        </div>
        <Link
          href="/me"
          className="font-mono inline-flex items-center justify-center gap-1.5 self-center rounded-lg border border-dotted border-neutral-950/40 bg-[#B90E0A] px-5 py-2.5 text-xs text-neutral-100 transition-colors hover:bg-[#a60c09] hover:border-neutral-100/60 sm:text-sm"
        >
          More about me
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </SectionCard>
  );
}
