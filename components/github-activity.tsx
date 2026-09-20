"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  buildWeeks,
  formatDate,
  last365Range,
  LEVEL_CLASSES,
  monthLabels,
  type ContributionDay,
  type GridWeek,
} from "@/lib/contribution-grid";
import SectionCard from "./section-card";

const API = "https://github-contributions-api.jogruber.de/v4/ANUBprad";
const PROFILE = "https://github.com/ANUBprad";
const FETCH_TIMEOUT_MS = 15000;

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; total: number; weeks: GridWeek[] };

type Tooltip = { count: number; date: string; x: number; y: number; width: number };

const SKELETON: GridWeek[] = Array.from({ length: 53 }, () =>
  Array(7).fill(null),
);

export default function GitHubActivity() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    fetch(API, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`GitHub contributions API ${r.status}`);
        return r.json();
      })
      .then((data: { contributions?: ContributionDay[] }) => {
        if (cancelled) return;
        const [startKey, endKey] = last365Range();
        const days = (data.contributions ?? []).filter(
          (day) => day.date >= startKey && day.date <= endKey,
        );
        const total = days.reduce((sum, day) => sum + day.count, 0);
        setState({ status: "ready", total, weeks: buildWeeks(days) });
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

  const ready = state.status === "ready";
  const weeks = ready ? state.weeks : SKELETON;
  const labels = ready ? monthLabels(state.weeks) : [];

  return (
    <SectionCard>
      <div className="flex flex-col gap-2.5 px-4 py-3.5 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-neutral-500">
            {state.status === "loading"
              ? "loading…"
              : state.status === "error"
                ? "activity unavailable right now"
                : `${state.total} contributions in the last year`}
          </span>
          <a
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile (opens in a new tab)"
            className="font-mono shrink-0 text-[10px] text-neutral-500 transition-colors hover:text-neutral-300"
          >
            GitHub profile
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>

        {state.status !== "error" ? (
          <div ref={gridRef} className="relative">
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
            <div
              role="img"
              aria-label={
                ready
                  ? `${state.total} GitHub contributions in the last year`
                  : "Loading GitHub contributions"
              }
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
                  const current = ready ? day : null;
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
                          ? `${current.count} contribution${current.count === 1 ? "" : "s"} on ${formatDate(current.date, true)}`
                          : "No data"
                      }
                      className={`aspect-square rounded-[2px] ${
                        current
                          ? LEVEL_CLASSES[current.level] ?? "bg-neutral-800/30"
                          : ready
                            ? "bg-transparent"
                            : "bg-neutral-800/20"
                      }`}
                    />
                  );
                }),
              )}
            </div>
            <div className="mt-1.5 flex items-center justify-end gap-1">
              <span className="font-mono text-[9px] text-neutral-500">
                Less
              </span>
              {LEVEL_CLASSES.map((bg) => (
                <span
                  key={bg}
                  aria-hidden="true"
                  className={`size-2 rounded-[2px] ${bg}`}
                />
              ))}
              <span className="font-mono text-[9px] text-neutral-500">
                More
              </span>
            </div>
          </div>
        ) : (
          <p className="font-mono py-1 text-[11px] text-neutral-500">
            GitHub activity could not be loaded right now — the rest of the
            site is unaffected.
          </p>
        )}

        {tooltip ? (
          <div
            role="status"
            className="font-mono pointer-events-none absolute z-10 rounded border border-neutral-700 bg-neutral-900 px-2 py-1 text-[10px] text-neutral-100 shadow-lg shadow-black/40"
            style={{
              left: Math.max(
                4,
                Math.min(tooltip.x, tooltip.width - 180),
              ),
              top: tooltip.y < 48 ? tooltip.y + 16 : tooltip.y - 36,
            }}
          >
            {tooltip.count} contribution{tooltip.count === 1 ? "" : "s"} on{" "}
            {formatDate(tooltip.date)}
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}