import type { ReactNode } from "react";

type Props = {
  id?: string;
  title?: string;
  className?: string;
  children?: ReactNode;
};

export default function DottedSection({
  id,
  title,
  className = "",
  children,
}: Props) {
  return (
    <div id={id} className={`relative w-full ${className}`}>
      <div className="pointer-events-none absolute top-0 left-[-2000px] right-[-2000px] z-10 h-[1px] rule-x" />
      <div className="pointer-events-none absolute right-[-2000px] bottom-0 left-[-2000px] z-10 h-[1px] rule-x" />
      <div className="pointer-events-none absolute top-[-12px] bottom-[-12px] left-0 z-10 w-[1px] rule-y" />
      <div className="pointer-events-none absolute top-[-12px] right-0 bottom-[-12px] z-10 w-[1px] rule-y" />
      <div className="pointer-events-none absolute -top-[1.5px] -left-[1.5px] z-20 h-1 w-1 rounded-[0.5px] bg-neutral-400/60" />
      <div className="pointer-events-none absolute -top-[1.5px] -right-[1.5px] z-20 h-1 w-1 rounded-[0.5px] bg-neutral-400/60" />
      <div className="pointer-events-none absolute -bottom-[1.5px] -left-[1.5px] z-20 h-1 w-1 rounded-[0.5px] bg-neutral-400/60" />
      <div className="pointer-events-none absolute -right-[1.5px] -bottom-[1.5px] z-20 h-1 w-1 rounded-[0.5px] bg-neutral-400/60" />
      {title ? (
        <h2 className="font-sans text-lg font-bold tracking-tight text-heading sm:text-xl">
          {title}
        </h2>
      ) : null}
      {children}
    </div>
  );
}