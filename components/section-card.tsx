import type { ReactNode } from "react";

export default function SectionCard({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={`border-dotted border-neutral-800/80 bg-neutral-900/10 relative overflow-hidden rounded-2xl border ${className}`}
    >
      {children}
    </section>
  );
}