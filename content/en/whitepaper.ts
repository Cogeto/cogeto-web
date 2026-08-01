/**
 * English copy for /whitepaper. Paper facts verified against the shipped
 * DOI 10.5281/zenodo.21702858, CC BY 4.0. The download card reads the file
 * size from disk at build time so the stated size cannot drift.
 */

export const whitepaperMeta = {
  paperTitle:
    "Cogeto: A Verifiable, Sovereignty-First Memory Architecture for Large Language Model Assistants",
  paperSubtitle:
    "Design and mechanisms of a private, EU-hosted system for correctable long-term memory, corpus-level contradiction detection, and provable deletion",
  authorLine: "Ivan Golubic",
  affiliationLine:
    "MVT Solutions Group d.o.o. and MCTO Advisory d.o.o., Croatia, European Union",
  dateLine: "Working paper, 29 July 2026",
  statusChip: "Working paper",
  file: "/documents/cogeto-whitepaper.pdf",
  downloadCta: "Download the PDF",
  doi: "10.5281/zenodo.21702858",
  doiUrl: "https://doi.org/10.5281/zenodo.21702858",
  recordLabel: "Permanent record on Zenodo",
  citationHeading: "Cite it",
  citation:
    "Golubic, I. (2026). Cogeto: A verifiable, sovereignty-first memory architecture for large language model assistants (v1). Zenodo. https://doi.org/10.5281/zenodo.21702858",
  citationLicense: "Published under Creative Commons Attribution 4.0.",
  copyCitationLabel: "Copy citation",
  copiedLabel: "Copied",
  closingHeading: "The paper argues it. The pilot shows it.",
} as const;

export const whitepaper = {
  metaTitle: "Whitepaper",
  metaDescription:
    "The Cogeto whitepaper: a verifiable, sovereignty-first memory architecture with verification before storage, corpus-level contradiction detection, provable deletion, and published accuracy. DOI 10.5281/zenodo.21702858.",
  eyebrow: "Whitepaper",
  headline: "The architecture, argued in full",
  lede:
    "The whitepaper states the design and its reasoning: why trust in machine memory must be evidenced rather than asserted, and how every trust claim in Cogeto is backed by an artifact you can inspect.",
  argument: {
    heading: "The argument",
    paragraphs: [
      "The memory layers attached to AI assistants are typically opaque accumulators: they remember, but they cannot show what they remember, why they believe it, whether it is still true, whether two of their own sources disagree, or whether anything was ever really deleted. For organizations operating under the European Union's data protection and artificial intelligence regulations, that opacity is disqualifying.",
      "The paper's answer is an architecture in which every trust claim is backed by an inspectable artifact, and its closing argument is the position this product is built on: verifiability, not capacity, is the property that makes machine memory trustworthy.",
    ],
  },
  covers: {
    heading: "What the paper covers",
    items: [
      {
        title: "Atomic facts with provenance",
        text: "Memory as discrete, source-linked facts: a verbatim span, an anchored subject, an explicit status, a validity interval.",
      },
      {
        title: "Verification before storage",
        text: "Every candidate is judged against its own cited span by an independent pass before it counts.",
      },
      {
        title: "The suppression log",
        text: "Unsupported candidates are resolved automatically and recorded in an inspectable log, not queued for triage.",
      },
      {
        title: "Corpus-wide reconciliation",
        text: "Entities resolved across aliases and languages, quantities compared arithmetically, verdicts persisted for stability.",
      },
      {
        title: "Honest retrieval",
        text: "Fused search with visibility as a precondition, fan out on ambiguity, and unanswerable questions declared unanswered.",
      },
      {
        title: "Provable deletion",
        text: "A compensating transaction protocol ending in a signed, hash-chained receipt, re-verified nightly.",
      },
      {
        title: "The sovereign gateway",
        text: "A European provider by default, fully local models where required, sensitive entities pseudonymized before any call.",
      },
      {
        title: "Measured accuracy",
        text: "The evaluation methodology behind the published per-release trust scores, including the unflattering ones.",
      },
    ],
  },
};
