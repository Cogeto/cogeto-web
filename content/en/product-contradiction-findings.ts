/**
 * English copy for /product/contradiction-findings, rebuilt in the
 */

export type MockKind =
  | "finding-battery"
  | "finding-cold"
  | "numeric"
  | "alias"
  | "answer-conflict"
  | "silence"
  | "log"
  | "report"
  | "status";

export interface ZBandContent {
  heading: string;
  advantage: string;
  mechanism?: string;
  link?: { label: string; href: string };
  mock: MockKind;
}

export interface ZPageContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lede: string;
  heroMock: MockKind;
  bands: ZBandContent[];
  statNote: string;
  gridHeading: string;
  grid: { title: string; text: string }[];
  objection?: { heading: string; paragraphs: string[] };
  cta: {
    heading: string;
    sub: string;
    secondary: { label: string; href: string; external?: boolean };
  };
}

export const contradictionFindings: ZPageContent = {
  metaTitle: "Contradiction findings",
  metaDescription:
    "Cogeto compares your documents against each other continuously and reports where they disagree: both claims, both source sentences, both documents with revisions, and the date each conflict was detected.",
  eyebrow: "Product",
  headline: "Find the disagreement before the audit does",
  lede:
    "Your manual, your specification, your test reports, and your mail do not fully agree with each other. Cogeto compares all of them, continuously, and reports every disagreement with the evidence attached. The feature nobody else ships.",
  heroMock: "finding-battery",
  bands: [
    {
      heading: "Every finding arrives with its evidence",
      advantage:
        "You never chase a vague alert. A finding carries both claims, both verbatim source sentences, both documents with revisions and locations, the date it was detected, and its resolution status.",
      mechanism:
        "A finding is evidence, not a notification: everything needed to judge it is attached to it.",
      mock: "finding-cold",
    },
    {
      heading: "Numeric conflicts cannot hide",
      advantage:
        "3.2 mm against 3.4 mm, fifty thousand against 50,000, March against Q1: caught by arithmetic, not left to a model's mood.",
      mechanism:
        "Quantities, units, and dates are compared deterministically before any model is consulted. The judge only sees pairs that survive.",
      mock: "numeric",
    },
    {
      heading: "One company under two names is one company",
      advantage:
        "A Croatian mail can contradict an English specification, because subjects are resolved across aliases, typos, and languages before comparison.",
      mechanism:
        "Supersession is separated from contradiction: a newer revision closes the old fact only when the timeline agrees, otherwise you see the conflict.",
      mock: "alias",
    },
    {
      heading: "Surfaced where you work, never queued",
      advantage:
        "Findings appear on the source that produced them, in any answer that cites either side, and in the signed report. There is no chore list, because a product that generates homework does not get used.",
      link: { label: "The signed findings report", href: "/product/findings-report" },
      mock: "answer-conflict",
    },
  ],
  statNote:
    "Live from the published per-release trust scores, aggregate over English and Croatian. Every number links to its public data file on the trust page.",
  gridHeading: "What keeps findings trustworthy",
  grid: [
    {
      title: "Checked pair ledger",
      text: "A pair judged compatible is not asked again unless a fact changes, so borderline pairs cannot drift into conflicts from model variance.",
    },
    {
      title: "Detection dates",
      text: "Every finding carries the date it appeared, so a report can state when a conflict entered the record.",
    },
    {
      title: "One action per pass",
      text: "At most one action is taken per fact per pass, so a single ingestion cannot cascade through the corpus.",
    },
    {
      title: "Precision and recall, both published",
      text: "Either alone can be gamed: flag everything and recall is perfect, flag nothing and precision is. Both are public, per release.",
    },
  ],
  objection: {
    heading: "Why your current AI does not catch this",
    paragraphs: [
      "Retrieval tools find; they do not reconcile. Ask an assistant about the battery and it returns whichever passage matched your phrasing, with confidence, having never compared it to anything else.",
      "Pasting everything into a large context window does not work either: models attend unevenly across long inputs, so you get some conflicts, different ones each run, with no record of what was compared. Each disagreement is cheap to fix the day it appears and expensive to discover during an audit, a recall, or a customer dispute.",
    ],
  },
  cta: {
    heading: "See what disagrees in your documents.",
    sub: "The pilot reads a real document set of yours and ends with the signed findings report.",
    secondary: { label: "How memory is verified", href: "/product/verified-memory" },
  },
};
