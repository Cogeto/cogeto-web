import type { ZPageContent } from "./product-contradiction-findings";

/**
 * English copy for /product/verified-memory, rebuilt in the Z-rhythm
 */
export const verifiedMemory: ZPageContent = {
  metaTitle: "Verified memory",
  metaDescription:
    "Every fact Cogeto stores carries the exact source sentence that produced it, passes an independent verification pass before storage, and keeps its whole lifecycle inspectable, including what was rejected.",
  eyebrow: "Product",
  headline: "Never defend a fact you cannot show the sentence for",
  lede:
    "Cogeto stores atomic claims, not document fragments. Every claim carries the verbatim sentence that produced it, a verification verdict, and the period over which it holds, so every answer can be followed back to its source in two steps.",
  heroMock: "answer-conflict",
  bands: [
    {
      heading: "Nothing enters memory unverified",
      advantage:
        "The common failure of document assistants, a misreading stored once and repeated back with confidence forever, cannot happen here.",
      mechanism:
        "After extraction, a second, independent pass re-reads only the claim's own source sentence and judges whether the evidence supports it. Only supported, unhedged claims become active. Failure never defaults to acceptance.",
      mock: "log",
    },
    {
      heading: "What was rejected stays inspectable",
      advantage:
        "You can audit what the system refused, not just what it kept. Every demotion is logged with its span, reason, and time, and summarized in the findings report.",
      mechanism:
        "There is no review queue and no homework: Cogeto resolves verification outcomes itself. Your own confirmation of a fact outranks the machine's judgment from then on.",
      mock: "status",
    },
    {
      heading: "Honest where your records are silent",
      advantage:
        "When your documents do not cover a question, the answer says so plainly, and anything from the model's own knowledge is clearly marked as not from your sources.",
      mechanism:
        "There is no mode in which model knowledge is presented as if it came from your documents. Ambiguous questions fan out across the subjects the corpus holds and ask which was meant.",
      mock: "silence",
    },
    {
      heading: "Ask what you believed in March",
      advantage:
        "Superseded facts are never destroyed, only closed, so you can ask what the documentation asserted at any date, what changed since a review, and which revision replaced a statement.",
      mechanism:
        "Every fact carries a validity period. Three temporal reads are always available: at a point in time, changed since, and previous version.",
      link: { label: "The findings report", href: "/product/findings-report" },
      mock: "finding-battery",
    },
  ],
  statNote:
    "Live from the published per-release trust scores, aggregate over English and Croatian. The verification pass itself is measured against human labels, and the number is public.",
  gridHeading: "Where the guarantees end, stated plainly",
  grid: [
    {
      title: "Verification is a judgement",
      text: "The verifier is an independent model whose agreement with human labels is published. It can demote a true claim; the suppressed log makes that visible.",
    },
    {
      title: "Quality varies by language",
      text: "Extraction and reconciliation are measured separately per language, and the numbers are published rather than averaged away.",
    },
    {
      title: "Only what was recorded",
      text: "Cogeto does not capture undocumented judgement. It says a question is unanswered rather than filling the gap.",
    },
    {
      title: "Briefed, not clever",
      text: "Cogeto reasons over retrieved facts. For open ended thinking, a frontier assistant is the right tool, and the docs say so.",
    },
  ],
  cta: {
    heading: "Every answer, checkable to the sentence.",
    sub: "Everything on this page runs from the open source release, so all of it can be checked rather than believed.",
    secondary: { label: "The measured accuracy, per release", href: "/trust" },
  },
};
