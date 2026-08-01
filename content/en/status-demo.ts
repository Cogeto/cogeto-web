/**
 * The status lifecycle demo examples (verified-memory pages). English
 * only for now, matching the product UI chrome decision.
 */
export const statusDemo = {
  intro: "Every memory carries a status. Watch one live:",
  items: [
    {
      status: "active",
      tone: "teal",
      fact: "Contract review moved to Friday.",
      source: "from an email, 2 June",
      note: "Verified against its source and ready to use.",
    },
    {
      status: "user-approved",
      tone: "teal",
      fact: "Ana prefers calls before 10:00.",
      source: "you confirmed this in chat",
      note: "Approved by you. Only you can set this status.",
    },
    {
      status: "uncertain",
      tone: "amber",
      fact: "The budget cap is 40k.",
      source: "from a meeting note, 14 May",
      note: "The source does not fully support it, so it waits for your review.",
    },
    {
      status: "contradicted",
      tone: "red",
      fact: "Launch is planned for October.",
      source: "a newer email says November",
      note: "Two sources disagree. Cogeto shows both and you decide.",
    },
    {
      status: "outdated",
      tone: "muted",
      fact: "The office moves in Q1.",
      source: "its validity window has passed",
      note: "Kept for history. Time travel queries can still find it.",
    },
    {
      status: "replaced",
      tone: "muted",
      fact: "Old pricing: 90 EUR per seat.",
      source: "superseded on 20 June",
      note: "A newer fact took its place. Nothing is silently lost.",
    },
  ],
} as const;

