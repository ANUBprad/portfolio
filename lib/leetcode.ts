export type LeetCodeStats = {
  username: string;
  solved: { total: number; easy: number; medium: number; hard: number };
  totals: { total: number; easy: number; medium: number; hard: number };
  beating: { easy: number | null; medium: number | null; hard: number | null };
};

export type LeetCodeCalendarDay = {
  date: string; // YYYY-MM-DD
  count: number;
};

export type LeetCodeCalendar = {
  days: LeetCodeCalendarDay[];
};

const ENDPOINT = "https://leetcode.com/graphql";

const QUERY = `query userStats($username: String!) {
  matchedUser(username: $username) {
    submitStatsGlobal {
      acSubmissionNum { difficulty count submissions }
      totalSubmissionNum { difficulty count submissions }
    }
    problemsSolvedBeatsStats { difficulty percentage }
  }
  allQuestionsCount { difficulty count }
}`;

type Bucket = {
  difficulty: string;
  count?: number;
  submissions?: number;
};

function pick(buckets: Bucket[], difficulty: string): Bucket | undefined {
  return buckets.find((bucket) => bucket.difficulty === difficulty);
}

function count(bucket: Bucket | undefined): number {
  return typeof bucket?.count === "number" ? bucket.count : 0;
}

function percentage(value: number | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export async function fetchLeetCodeStats(
  username: string,
): Promise<LeetCodeStats> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
      "User-Agent": "Mozilla/5.0 (compatible; portfolio/1.0)",
    },
    body: JSON.stringify({ query: QUERY, variables: { username } }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);

  const json = (await res.json()) as {
    data?: {
      matchedUser?: {
        submitStatsGlobal?: {
          acSubmissionNum?: Bucket[];
          totalSubmissionNum?: Bucket[];
        };
        problemsSolvedBeatsStats?: { difficulty: string; percentage: number }[];
      };
      allQuestionsCount?: Bucket[];
    };
  };

  const user = json.data?.matchedUser;
  const all = json.data?.allQuestionsCount;
  if (!user || !all) throw new Error("LeetCode returned an unexpected payload");

  const accepted = user.submitStatsGlobal?.acSubmissionNum ?? [];
  const beats = user.problemsSolvedBeatsStats ?? [];

  const solvedAll = pick(accepted, "All");

  const solveCount = (difficulty: string) => count(pick(accepted, difficulty));
  const totalCount = (difficulty: string) => count(pick(all, difficulty));
  const beating = (difficulty: string) =>
    percentage(beats.find((b) => b.difficulty === difficulty)?.percentage);

  return {
    username,
    solved: {
      total: count(solvedAll),
      easy: solveCount("Easy"),
      medium: solveCount("Medium"),
      hard: solveCount("Hard"),
    },
    totals: {
      total: totalCount("All"),
      easy: totalCount("Easy"),
      medium: totalCount("Medium"),
      hard: totalCount("Hard"),
    },
    beating: {
      easy: beating("Easy"),
      medium: beating("Medium"),
      hard: beating("Hard"),
    },
  };
}

const CALENDAR_QUERY = `query userProfileCalendar($username: String!) {
  matchedUser(username: $username) {
    userCalendar {
      submissionCalendar
    }
  }
}`;

// Daily submission counts from LeetCode's own profile calendar. The API only
// returns active days, payload format: a JSON string mapping Unix-timestamp
// (seconds) to submission count. One request covers the whole history; the
// caller narrows to a rolling window.
export async function fetchLeetCodeCalendar(
  username: string,
): Promise<LeetCodeCalendar> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: `https://leetcode.com/u/${username}/`,
      "User-Agent": "Mozilla/5.0 (compatible; portfolio/1.0)",
    },
    body: JSON.stringify({ query: CALENDAR_QUERY, variables: { username } }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);

  const json = (await res.json()) as {
    data?: {
      matchedUser?: {
        userCalendar?: { submissionCalendar?: unknown };
      };
    };
  };

  const raw = json.data?.matchedUser?.userCalendar?.submissionCalendar;
  if (typeof raw !== "string") {
    throw new Error("LeetCode returned an unexpected payload");
  }

  const byTimestamp = JSON.parse(raw) as Record<string, number>;
  const days: LeetCodeCalendarDay[] = [];
  for (const [ts, count] of Object.entries(byTimestamp)) {
    const num = Number(ts);
    if (!Number.isFinite(num) || !Number.isFinite(count) || count <= 0) continue;
    const date = new Date(num * 1000).toISOString().slice(0, 10);
    days.push({ date, count });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  return { days };
}
