"use client";

import { useAge } from "@/lib/use-age";

export default function Greeting() {
  const age = useAge();
  return (
    <p className="font-sans min-h-5 text-xs leading-snug font-medium text-neutral-300 sm:text-sm">
      {age} | AI Engineer | Harnessing AI beyond its limits.
    </p>
  );
}