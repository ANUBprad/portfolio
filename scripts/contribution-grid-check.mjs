import assert from "node:assert/strict";
import { buildWeeks } from "../lib/contribution-grid.ts";

function wd(name) {
  return { date: name, count: 1, level: 1 };
}

// Week 1 (starts Sun 2026-01-04): Mon 01-05, Wed 01-07, Sat 01-10.
// Week 2 (starts Sun 2026-01-11): Sun 01-11, Mon 01-12.
const A = wd("2026-01-05"); // Mon
const B = wd("2026-01-07"); // Wed
const E = wd("2026-01-10"); // Sat
const C = wd("2026-01-11"); // Sun
const D = wd("2026-01-12"); // Mon

const weeks = buildWeeks([D, B, A, C, E]); // deliberately unsorted input

assert.equal(weeks.length, 2, "two distinct weeks expected");
assert.equal(weeks[0].length, 7, "each week has exactly 7 slots");
assert.equal(weeks[0][1], A, "Monday lands in slot 1");
assert.equal(weeks[0][3], B, "Wednesday lands in slot 3");
assert.equal(weeks[0][6], E, "Saturday lands in slot 6");
assert.equal(weeks[1][0], C, "Sunday starts its own week in slot 0");
assert.equal(weeks[1][1], D, "next week Monday in slot 1");

const flat = weeks.flat().filter(Boolean);
assert.equal(flat.length, 5, "no contribution lost in bucketing");

assert.deepEqual(buildWeeks([]), [], "empty input yields no weeks");

assert.ok(weeks[0][1].date < weeks[1][1].date, "weeks sorted oldest first");

console.log("contribution grid self-check: OK");