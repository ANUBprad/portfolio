import assert from "node:assert/strict";
import { getAgeForDay } from "../lib/age.ts";

const day = (y, m, d) => Date.UTC(y, m, d) / 86400000;

// DOB 25 May 2005. New age starts on 25 May, not on New Year.
assert.equal(getAgeForDay(day(2026, 8, 19)), 21, "2026-09-19 -> 21");
assert.equal(getAgeForDay(day(2027, 4, 24)), 21, "2027-05-24 still 21");
assert.equal(getAgeForDay(day(2027, 4, 25)), 22, "2027-05-25 -> 22");
assert.equal(getAgeForDay(day(2028, 4, 25)), 23, "2028-05-25 -> 23");
assert.equal(getAgeForDay(day(2024, 1, 29)), 18, "2024-02-29 -> 18");
assert.equal(getAgeForDay(day(2024, 4, 25)), 19, "2024-05-25 -> 19");
assert.equal(getAgeForDay(day(2005, 4, 25)), 0, "born 2005-05-25 -> 0");
assert.equal(getAgeForDay(day(2006, 4, 24)), 0, "2006-05-24 still 0");
assert.equal(getAgeForDay(day(2006, 4, 25)), 1, "2006-05-25 -> 1");

console.log("age self-check: OK");