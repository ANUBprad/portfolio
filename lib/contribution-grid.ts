export type ContributionDay = {
  date: string; // YYYY-MM-DD
  count: number;
  level: number; // 0..4
};

// Fixed 7 cells per week; index 0 = Sunday (matches GitHub's calendar rows).
export type GridWeek = (ContributionDay | null)[];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DAY_MS = 86400000;

// Grayscale in dark mode; warm cream tones in light mode (both resolve via
// theme-mapped neutral tokens), used by the GitHub grid.
export const LEVEL_CLASSES = [
  "bg-neutral-800/30",
  "bg-neutral-800",
  "bg-neutral-700",
  "bg-neutral-500",
  "bg-neutral-300",
];

// Rolling window [start, end] covering today plus the previous 364 days.
export function last365Range(): [string, string] {
  const now = new Date();
  const end = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const start = end - 364 * DAY_MS;
  return [
    new Date(start).toISOString().slice(0, 10),
    new Date(end).toISOString().slice(0, 10),
  ];
}

export function formatDate(date: string, long = false) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: long ? "long" : "short",
    day: "numeric",
    year: "numeric",
  });
}

// Month label positions as a percentage of the grid width, placed at the first
// week that contains a day of that month.
export function monthLabels(weeks: GridWeek[]): { label: string; x: number }[] {
  const out: { label: string; x: number }[] = [];
  let currentMonth = -1;
  weeks.forEach((week, wi) => {
    const day = week.find((d) => d !== null);
    if (!day) return;
    const month = Number(day.date.slice(5, 7));
    if (month !== currentMonth) {
      currentMonth = month;
      out.push({ label: MONTHS[month - 1], x: (wi / weeks.length) * 100 });
    }
  });
  return out;
}

// Buckets daily contributions into Sunday-starting weeks, sorted oldest first.
// Input order does not matter; days are re-sorted by date internally.
export function buildWeeks(contribs: ContributionDay[]): GridWeek[] {
  const sorted = [...contribs].sort((a, b) => a.date.localeCompare(b.date));
  const byWeek = new Map<string, GridWeek>();

  for (const day of sorted) {
    const [y, m, d] = day.date.split("-").map(Number);
    const current = new Date(Date.UTC(y, m - 1, d));
    const sunday = new Date(Date.UTC(y, m - 1, d - current.getUTCDay()));
    const key = sunday.toISOString().slice(0, 10);

    let week = byWeek.get(key);
    if (!week) {
      week = Array<ContributionDay | null>(7).fill(null);
      byWeek.set(key, week);
    }
    week[current.getUTCDay()] = day;
  }

  return [...byWeek.keys()].sort().map((key) => byWeek.get(key)!);
}
