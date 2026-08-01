/**
 * English copy for /trust. Metric explainers cover both schema lines: the
 * five 1.0 metrics and the three added by schema 1.1 (contradiction
 * precision, supersedes accuracy with its published denominator, rewrite
 * accuracy). Explainer wording follows the published schema descriptions
 * and docs/eval/gate-model.md in the product repo.
 */

export interface TrustContent {
  eyebrow: string;
  title: string;
  thesis: string;
  currentHeading: string;
  currentIntro: string;
  configLabel: string;
  languageLabel: string;
  languageNames: Record<string, string>;
  aggregateNote: string;
  gatesNote: string;
  trendsHeading: string;
  trendsIntro: string;
  chatHeading: string;
  chatIntro: string;
  provenanceHeading: string;
  provenanceIntro: string;
  gateLabel: string;
  backfilledLabel: string;
  backfilledNote: string;
  metrics: Record<string, { label: string; explainer: string }>;
  pairsLabel: string;
  notAvailable: string;
  checkFileCta: string;
  goldenCorpusCta: string;
  schemaCta: string;
  backHome: string;
  /** Chip prefix before the current release version number. */
  currentReleaseLabel: string;
  complianceLinkLabel: string;
  sourceLinkLabel: string;
  /** Button on the fallback page linking to the published data files. */
  dataCta: string;
  /** Stat-band label for the golden-case count on the product pages. */
  goldenCasesStatLabel: string;
  unavailableTitle: string;
  unavailableBody: string;
}

export const trust: TrustContent = {
  eyebrow: "Trust scores",
  title: "The measured accuracy of Cogeto, per release",
  thesis:
    "Cogeto publishes its own measured accuracy for every release, the same way a service publishes uptime, including the numbers that fall short of their targets. Here are the numbers, and here are the public data files behind them. Do not trust this chart: check the file.",
  currentHeading: "Current scores",
  currentIntro:
    "Extraction and reconciliation quality for the selected model configuration and language, measured against a hand-labeled golden corpus.",
  configLabel: "Model configuration",
  languageLabel: "Language",
  languageNames: {
    en: "English",
    hr: "Croatian",
    aggregate: "Aggregate",
  },
  aggregateNote:
    "Aggregate blends the per-language corpora. It is shown so a weak language can never hide inside an average: switch the selector to read each language on its own.",
  gatesNote:
    "Every gate floor is set at the honest current value of the metric, never at a target the project has not reached, and floors only ratchet upward. Floors apply per language as well as in aggregate, so the gate you see here changes with the language you select.",
  trendsHeading: "Trends",
  trendsIntro:
    "The ten most recent releases from the v1 line on, oldest to newest, on an honest 0 to 100 percent axis. The complete history stays published in the repository. The dashed line is the continuous-integration gate that a release must clear to ship.",
  chatHeading: "Chat suite",
  chatIntro:
    "End-to-end question-and-answer cases. A pass means the answer was grounded in the right facts from the corpus. Failing case ids are published, not hidden.",
  provenanceHeading: "Provenance",
  provenanceIntro:
    "Each release, with the exact commit it was measured at, the harness version, the corpus sizes, and a direct link to its immutable JSON file. Published files are never edited after release. Read the data, not our summary of it.",
  gateLabel: "CI gate",
  backfilledLabel: "Backfilled",
  backfilledNote:
    "Transcribed from recorded runs rather than emitted by the harness at release time.",
  metrics: {
    extraction_precision: {
      label: "Extraction precision",
      explainer:
        "Of the facts Cogeto pulled from a source, the share that were correct. High precision means few invented or wrong facts entering memory, which matters most because a stored falsehood is durable.",
    },
    extraction_recall: {
      label: "Extraction recall",
      explainer:
        "Of the facts a careful human would pull from a source, the share Cogeto found. High recall means few missed facts, the failure a reader notices most.",
    },
    verification_agreement: {
      label: "Verification agreement",
      explainer:
        "How often the independent verification pass agreed with the human label on whether a source actually supports a claim. The admission check must itself be dependable before its verdicts gate what reaches active memory.",
    },
    dedup_accuracy: {
      label: "Deduplication accuracy",
      explainer:
        "How well reconciliation merges duplicate facts without merging two facts that are genuinely different. False merges are penalized more heavily than missed merges, because a false merge destroys a distinct fact.",
    },
    contradiction_precision: {
      label: "Contradiction precision",
      explainer:
        "Of the contradictions Cogeto flagged, the share that were genuine conflicts. Published from schema 1.1 on. Precision and recall are published together because either one alone can be gamed: flag everything and recall is perfect, flag nothing and precision is.",
    },
    contradiction_recall: {
      label: "Contradiction recall",
      explainer:
        "Of the genuine contradictions between facts, the share Cogeto flagged. Detection links both claims with both source sentences and the date, so every flag can be checked against its evidence.",
    },
    supersedes_accuracy: {
      label: "Supersedes accuracy",
      explainer:
        "Correct supersession decisions, verdict and direction both, over the pairs where supersession was at stake. The number of pairs is published next to the rate, because a rate over one case means nothing, whether it passes or fails.",
    },
    rewrite_accuracy: {
      label: "Query-rewrite routing accuracy",
      explainer:
        "The share of query-rewrite routing cases passed: intent routing, pronoun and ellipsis resolution, and temporal classification. This is the step that turns a question into the right search, so its errors surface as wrong or missing answers.",
    },
  },
  pairsLabel: "pairs",
  notAvailable: "not measured",
  checkFileCta: "Open the JSON file",
  goldenCorpusCta: "Browse the golden corpus",
  schemaCta: "Read the data schema",
  backHome: "Back to cogeto.eu",
  currentReleaseLabel: "Current release",
  complianceLinkLabel: "Compliance one-pager",
  sourceLinkLabel: "Source on GitHub",
  dataCta: "Read the data on GitHub",
  goldenCasesStatLabel: "hand-labeled golden cases behind the numbers",
  unavailableTitle: "Trust scores are refreshing",
  unavailableBody:
    "The published data could not be read just now. This page updates itself from the product repository within the hour. Please check back shortly, or read the files directly on GitHub.",
};
