"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

import SectionCard from "./section-card";
import {
  buildWeeks,
  formatDate,
  fullYearDays,
  intensityLevels,
  LEVEL_CLASSES,
  monthLabels,
  type ContributionDay,
  type GridWeek,
} from "@/lib/contribution-grid";
import type { LeetCodeCalendar, LeetCodeStats } from "@/lib/leetcode";

const PROFILE_URL = "https://leetcode.com/u/Anubhab25/";

const FETCH_TIMEOUT_MS = 15000;

const DIFFICULTIES = [
  { key: "easy", label: "Easy" },
  { key: "medium", label: "Medium" },
  { key: "hard", label: "Hard" },
] as const;

type Difficulty = (typeof DIFFICULTIES)[number]["key"];

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; stats: LeetCodeStats; calendar: LeetCodeCalendar };

function formatPercent(value: number | null): string {
  return value === null ? "N/A" : `${value.toFixed(2)}%`;
}

type Tooltip = { count: number; date: string; x: number; y: number; width: number };

const SKELETON: GridWeek[] = Array.from({ length: 53 }, () =>
  Array(7).fill(null),
);

function CalendarSkeletonCells() {
  return (
    <div
      className="grid gap-[1px] sm:gap-[2px]"
      style={{
        gridTemplateRows: "repeat(7, 1fr)",
        gridAutoFlow: "column",
        gridAutoColumns: "minmax(0, 1fr)",
      }}
    >
      {SKELETON.map((week, wi) =>
        week.map((_, di) => (
          <div
            key={`${wi}-${di}`}
            className="bg-neutral-800/20 aspect-square rounded-[2px]"
          />
        )),
      )}
    </div>
  );
}

function SummaryItem({
  label,
  difficulty,
  stats,
}: {
  label: string;
  difficulty: Difficulty | null;
  stats: LeetCodeStats;
}) {
  if (difficulty === null) {
    return (
      <div className="flex items-baseline gap-1.5 text-[11px] text-neutral-400">
        <span>Total Solved</span>
        <span className="font-mono text-xs font-semibold text-neutral-300">
          {stats.solved.total}
        </span>
      </div>
    );
  }

  const solved = stats.solved[difficulty];
  const total = stats.totals[difficulty];
  const beating = stats.beating[difficulty];

  return (
    <div
      tabIndex={0}
      role="group"
      aria-label={`${label}: ${solved} of ${total} solved, beating ${formatPercent(
        beating,
      )}`}
      className="group flex items-baseline gap-1.5 text-[11px] text-neutral-400"
    >
      <span>{label}</span>
      <span className="relative inline-flex min-w-[3.75rem] justify-end">
        <span className="font-mono whitespace-nowrap text-neutral-300 transition-opacity group-hover:opacity-0 group-focus-within:opacity-0">
          {solved} / {total}
        </span>
        <span className="font-mono absolute top-0 right-0 whitespace-nowrap text-neutral-100 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          Beating: {formatPercent(beating)}
        </span>
      </span>
    </div>
  );
}

export default function LeetCodeActivity() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    fetch("/api/leetcode", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`LeetCode ${res.status}`);
        return res.json();
      })
      .then((data: { stats: LeetCodeStats; calendar: LeetCodeCalendar }) => {
        if (!cancelled) {
          setState({ status: "ready", stats: data.stats, calendar: data.calendar });
        }
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  const ready = state.status === "ready";
  const loading = state.status === "loading";
  const error = state.status === "error";

  const days = ready ? fullYearDays(state.calendar.days) : [];
  const levels = intensityLevels(days);
  const graded = days.map((day) => ({
    ...day,
    level: levels.get(day.count) ?? 0,
  }));
  const weeks = buildWeeks(graded);
  const total = graded.reduce((sum, day) => sum + day.count, 0);
  const labels = ready ? monthLabels(weeks) : [];

  function showTooltip(day: ContributionDay, e: PointerEvent) {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      count: day.count,
      date: day.date,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: rect.width,
    });
  }

  const headline = error
    ? "unavailable right now"
    : loading
      ? "loading…"
      : `${total} submissions in the past one year`;

  return (
    <SectionCard>
      <div ref={gridRef} className="flex flex-col gap-2.5 px-4 py-3.5 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[10px] text-neutral-500">{headline}</p>
          <a
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-neutral-500 transition-colors hover:text-neutral-300"
          >
            LeetCode profile
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>

        {error ? (
          <p className="font-mono py-1 text-[11px] text-neutral-500">
            LeetCode data could not be loaded right now — the rest of the site
            is unaffected.
          </p>
        ) : (
          <>
            <div className="relative mb-1 h-3">
              {labels.map((l) => (
                <span
                  key={`${l.label}-${l.x}`}
                  className="font-mono absolute top-0 text-[9px] text-neutral-500"
                  style={{ left: `${l.x}%` }}
                >
                  {l.label}
                </span>
              ))}
            </div>
            {loading ? (
              <CalendarSkeletonCells />
            ) : (
              <div
                role="img"
                aria-label={`${total} submissions in the past one year`}
                onPointerLeave={() => setTooltip(null)}
                className="grid gap-[1px] sm:gap-[2px]"
                style={{
                  gridTemplateRows: "repeat(7, 1fr)",
                  gridAutoFlow: "column",
                  gridAutoColumns: "minmax(0, 1fr)",
                }}
              >
                {weeks.map((week, wi) =>
                  week.map((day, di) => {
                    const current = day;
                    return (
                      <div
                        key={`${wi}-${di}`}
                        onPointerEnter={
                          current
                            ? (e) => showTooltip(current, e)
                            : undefined
                        }
                        onPointerLeave={() => setTooltip(null)}
                        aria-label={
                          current
                            ? `${current.count} submission${current.count === 1 ? "" : "s"} on ${formatDate(current.date, true)}`
                            : "No data"
                        }
                        className={`aspect-square rounded-[2px] ${
                          current
                            ? LEVEL_CLASSES[current.level] ?? "bg-neutral-800/30"
                            : "bg-transparent"
                        }`}
                      />
                    );
                  }),
                )}
              </div>
            )}
          </>
        )}

        {ready ? (
          <div className="mt-0.5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-dotted border-neutral-800/70 pt-3">
            <SummaryItem label="Total Solved" difficulty={null} stats={state.stats} />
            {DIFFICULTIES.map(({ key, label }) => (
              <SummaryItem
                key={key}
                label={label}
                difficulty={key}
                stats={state.stats}
              />
            ))}
          </div>
        ) : null}

        {tooltip ? (
          <div
            role="status"
            className="font-mono pointer-events-none absolute z-10 rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-[10px] text-neutral-100 shadow-lg shadow-black/40"
            style={{
              left: Math.max(4, Math.min(tooltip.x, tooltip.width - 180)),
              top: tooltip.y < 48 ? tooltip.y + 16 : tooltip.y - 36,
            }}
          >
            {tooltip.count} submission{tooltip.count === 1 ? "" : "s"} on{" "}
            {formatDate(tooltip.date)}
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}