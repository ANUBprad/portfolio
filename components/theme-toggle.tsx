"use client";

import { MoonIcon, SunIcon } from "./icons";

export default function ThemeToggle() {
  function onToggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (e.g. privacy mode) — theme still applies.
    }
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className="flex size-9 items-center justify-center rounded-lg border border-dotted border-neutral-800 bg-neutral-900/40 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-neutral-100 focus-visible:text-neutral-100"
    >
      <SunIcon className="theme-sun size-4" />
      <MoonIcon className="theme-moon size-4" />
    </button>
  );
}
