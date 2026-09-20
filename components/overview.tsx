import { siGithub, siLeetcode, siX } from "simple-icons";
import type { ComponentProps, ReactElement } from "react";
import SectionCard from "./section-card";
import { CONTACT } from "@/lib/contact";
import { BrandIcon, EnvelopeIcon, LinkedInIcon } from "./icons";

const META = [
  { label: "Role", value: "AI Engineer" },
  { label: "Location", value: "Bengaluru" },
  { label: "Education", value: "CMR Institute of Technology" },
  {
    label: "Degree",
    value: "B.E. Artificial Intelligence & Data Science",
  },
];

const ICONS: Record<string, (props: ComponentProps<"svg">) => ReactElement> = {
  Email: EnvelopeIcon,
  GitHub: (props) => <BrandIcon icon={siGithub} {...props} />,
  LinkedIn: LinkedInIcon,
  X: (props) => <BrandIcon icon={siX} {...props} />,
  LeetCode: (props) => <BrandIcon icon={siLeetcode} {...props} />,
};

const ORDER = ["GitHub", "X", "LinkedIn", "LeetCode", "Email"];

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
        <div className="flex flex-col">
          {META.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-4 border-b border-dotted border-neutral-800/70 py-2.5 last:border-b-0"
            >
              <span className="font-mono text-[11px] text-neutral-500">
                {row.label}
              </span>
              <span className="font-sans text-right text-xs font-semibold text-neutral-100 sm:text-sm">
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5 border-t border-dotted border-neutral-800/70 pt-4">
          {ORDER.map((label) => (
            <IconAction key={label} label={label} />
          ))}
        </div>
      </div>
    </SectionCard>
  );
}