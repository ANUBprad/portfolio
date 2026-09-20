"use client";

import { useSyncExternalStore } from "react";

import { getAgeForDay, localDayNumber, utcDayNumber } from "./age";

function noopSubscribe() {
  return () => {};
}

// SSR/hydration-safe age: the UTC day serves SSR and the first client render so
// markup agrees, then hydration snaps to the visitor's local day. Age only
// changes on a birthday, so a noop subscription is enough (mirrors DailyQuote).
export function useAge(): number {
  const day = useSyncExternalStore(noopSubscribe, localDayNumber, utcDayNumber);
  return getAgeForDay(day);
}