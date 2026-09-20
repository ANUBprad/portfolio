import type { CSSProperties } from "react";
import Link from "next/link";

import DottedSection from "./dotted-section";
import { makeField } from "./stars";
import ThemeToggle from "./theme-toggle";

// Same deterministic star field as the margin starfield — sparse nav specks only.
const NAV_SPECKS = makeField(88102422, 4);

export default function Navbar() {
  return (
    <DottedSection className="px-4 py-2.5 select-none sm:px-6" id="navbar">
      <nav className="font-sans flex w-full items-center justify-end">
        <div className="nav-sky-bar relative flex items-center gap-3 text-xs font-medium text-neutral-300 sm:gap-4 sm:text-sm">
          <div
            aria-hidden="true"
            className="nav-sky-specks pointer-events-none absolute inset-0"
          >
            {NAV_SPECKS.map((star, i) => (
              <span
                key={i}
                className="absolute rounded-full"
                style={
                  {
                    left: star.left,
                    top: star.top,
                    width: star.size,
                    height: star.size,
                    background: "#fff3e0",
                    "--star-peak": star.peak,
                    animation: `star-twinkle ${star.duration} ease-in-out ${star.delay} infinite both`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
          <Link
            href="/"
            className="nav-sky-tab nav-sky-tab--active font-semibold text-neutral-100 underline decoration-neutral-100 underline-offset-4 decoration-2"
          >
            Home
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </DottedSection>
  );
}
