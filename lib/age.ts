const DAY_MS = 86400000;

// Date of birth: 25 May 2005, as a UTC-epoch day number.
const DOB_DAY = Date.UTC(2005, 4, 25) / DAY_MS;

// Age on an arbitrary UTC-epoch day number, using calendar birthday logic (the
// new age starts on the DOB month/day), never plain year subtraction.
export function getAgeForDay(day: number): number {
  const today = new Date(day * DAY_MS);
  const dob = new Date(DOB_DAY * DAY_MS);
  const age = today.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday =
    today.getUTCMonth() < dob.getUTCMonth() ||
    (today.getUTCMonth() === dob.getUTCMonth() &&
      today.getUTCDate() < dob.getUTCDate());
  return beforeBirthday ? age - 1 : age;
}

// Timezone-independent day used while SSR renders and during hydration.
export function utcDayNumber(): number {
  const now = new Date();
  return Math.floor(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / DAY_MS,
  );
}

// Visitor's local calendar day as a UTC-epoch day number.
export function localDayNumber(): number {
  const now = new Date();
  return Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / DAY_MS,
  );
}