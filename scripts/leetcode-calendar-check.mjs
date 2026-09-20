import assert from "node:assert/strict";
import {
  fullYearDays,
  intensityLevels,
  last365Range,
  monthLabels,
} from "../lib/contribution-grid.ts";

// fullYearDays: exactly 365 consecutive days, oldest first, missing days = 0.
const [startKey, endKey] = last365Range();
const days = fullYearDays([
  { date: startKey, count: 3 },
  { date: endKey, count: 7 },
]);

assert.equal(days.length, 365, "exactly one year of cells");
assert.equal(days[0].date, startKey, "window starts at startKey");
assert.equal(days[364].date, endKey, "window ends on endKey");
assert.equal(days[0].count, 3, "active day keeps its count");
assert.equal(days[364].count, 7, "active day keeps its count");
assert.equal(days[1].count, 0, "missing day becomes zero");
assert.equal(days[181].count, 0, "missing middle day becomes zero");
for (let i = 1; i < days.length; i++) {
  const prev = new Date(`${days[i - 1].date}T00:00:00Z`);
  const cur = new Date(`${days[i].date}T00:00:00Z`);
  assert.equal((cur - prev) / 86400000, 1, "days are consecutive");
}
assert.equal(
  days.reduce((sum, d) => sum + d.count, 0),
  10,
  "total = sum of submitted days",
);

// intensityLevels: monotone, bounded 0..4, zero stays 0.
const levels = intensityLevels(days);
assert.equal(levels.get(0), 0, "zero maps to level 0");
assert.equal(levels.get(3), 1, "min positive count maps to level 1");
assert.equal(levels.get(7), 4, "max positive count maps to level 4");

const rich = fullYearDays(
  Array.from({ length: 20 }, (_, i) => ({
    date: new Date(Date.UTC(2026, 0, i + 1)).toISOString().slice(0, 10),
    count: i + 1,
  })),
);
const richLevels = intensityLevels(rich);
const sortedCounts = [...richLevels.keys()].sort((a, b) => a - b);
for (let i = 1; i < sortedCounts.length; i++) {
  const a = richLevels.get(sortedCounts[i - 1]);
  const b = richLevels.get(sortedCounts[i]);
  assert.ok(b >= a, "levels are monotone with count");
  assert.ok(b >= 0 && b <= 4, "levels stay within 0..4");
}

// monthLabels: positions stay inside the grid and never go backwards.
const weeks = days.reduce(
  (acc, d) => {
    acc.push([d]);
    return acc;
  },
  [],
);
const labels = monthLabels(weeks);
assert.ok(labels.length > 0, "labels exist");
let lastX = -1;
for (const l of labels) {
  assert.ok(l.x >= 0 && l.x <= 100, "label within grid width");
  assert.ok(l.x >= lastX, "labels ordered left to right");
  lastX = l.x;
}

console.log("leetcode calendar self-check: OK");