"use client";

import { useSyncExternalStore } from "react";
import SectionCard from "./section-card";
import { QUOTES } from "@/lib/quotes";

const DAY_MS = 86400000;

// Visitor's local calendar day as a UTC-epoch day number. Deterministic per
// local date: the same local date always maps to the same quote, flipped at
// local midnight.
function localDayNumber() {
  const now = new Date();
  return Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / DAY_MS,
  );
}

// Timezone-independent day used while SSR renders and during hydration, so the
// server markup always agrees with the first client render. Once hydrated, the
// store above takes over and snaps the quote to the visitor's local day.
function utcDayNumber() {
  const now = new Date();
  return Math.floor(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / DAY_MS,
  );
}

function noopSubscribe() {
  return () => {};
}

export default function DailyQuote() {
  const day = useSyncExternalStore(noopSubscribe, localDayNumber, utcDayNumber);
  const { quote, author } = QUOTES[day % QUOTES.length];

  return (
    <SectionCard>
      <figure className="flex flex-col gap-3 px-5 py-5 sm:px-7">
        <blockquote className="font-sans text-center text-sm leading-relaxed font-medium text-neutral-200 sm:text-base">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="font-mono self-end text-right text-[11px] text-neutral-500">
          — {author}
        </figcaption>
      </figure>
    </SectionCard>
  );
}