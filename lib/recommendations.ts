export type Recommendation = {
  category: string;
  title: string;
  creator: string;
  url: string;
  videoId: string;
  summary: string;
  reason: string;
};

export const RECOMMENDATIONS: Recommendation[] = [
  {
    category: "AI · AGENTS",
    title: "Harness Engineering: Building the Production Cage for Powerful Domain Agents",
    creator: "Mike Chambers · AWS",
    url: "https://youtu.be/gxVZ_1tuuq4",
    videoId: "gxVZ_1tuuq4",
    summary:
      "What it takes to build the harness that keeps powerful domain agents safe and dependable in production.",
    reason:
      "The most grounded look I've found at how real agent systems are engineered beyond the demo — constraints, evaluation, and runtime thinking.",
  },
  {
    category: "IDEAS · HUMAN PERFORMANCE",
    title: "Become Mentally Dangerous With These Daily Habits",
    creator: "Andrew Huberman / Raj Shamani",
    url: "https://youtu.be/Y566_T-YlNQ",
    videoId: "Y566_T-YlNQ",
    summary:
      "A practical conversation about focus, discipline, habits, and attention — science-ready ideas for day-to-day mental performance.",
    reason:
      "These habits are concrete enough that I can actually apply them the next morning.",
  },
  {
    category: "CHESS",
    title: "Mikhail Tal Sacrifices EVERYTHING",
    creator: "GothamChess",
    url: "https://youtu.be/X2BvaP_RDpo",
    videoId: "X2BvaP_RDpo",
    summary:
      "A Tal masterpiece where every piece is flung at the king — risk, calculation, and pure imagination.",
    reason:
      "Tal's fearlessness sold me on how unconventional thinking and calculated risk can produce solutions nobody expected — at and beyond the chessboard.",
  },
];