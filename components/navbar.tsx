import Link from "next/link";

import DottedSection from "./dotted-section";

type NavbarProps = {
  activePage?: "home" | "me";
};

export default function Navbar({ activePage = "home" }: NavbarProps) {
  return (
    <DottedSection
      className="px-4 py-2.5 select-none sm:px-6"
      id="navbar"
    >
      <nav className="font-sans flex w-full items-center justify-end gap-4 sm:gap-5" aria-label="Main navigation">
        <Link
          href="/"
          className={
            activePage === "home"
              ? "font-semibold text-neutral-100 underline decoration-neutral-100 underline-offset-4 decoration-2"
              : "text-neutral-400 transition-colors hover:text-neutral-200"
          }
        >
          HOME
        </Link>
      </nav>
    </DottedSection>
  );
}
