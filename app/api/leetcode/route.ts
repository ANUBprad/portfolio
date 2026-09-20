import { NextResponse } from "next/server";

import {
  fetchLeetCodeCalendar,
  fetchLeetCodeStats,
  type LeetCodeCalendar,
  type LeetCodeStats,
} from "@/lib/leetcode";

const USERNAME = "Anubhab25";
const TTL_MS = 60 * 60 * 1000;

export type LeetCodeResponse = {
  stats: LeetCodeStats;
  calendar: LeetCodeCalendar;
};

// ponytail: per-process TTL cache; swap for a shared cache if this ever runs multi-instance.
let cache: { at: number; data: LeetCodeResponse } | null = null;

export async function GET() {
  const headers = {
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=600",
  };

  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json(cache.data, { headers });
  }

  try {
    const [stats, calendar] = await Promise.all([
      fetchLeetCodeStats(USERNAME),
      fetchLeetCodeCalendar(USERNAME),
    ]);
    const data = { stats, calendar };
    cache = { at: Date.now(), data };
    return NextResponse.json(data, { headers });
  } catch {
    return NextResponse.json(
      { error: "LeetCode statistics are unavailable." },
      { status: 502 },
    );
  }
}
