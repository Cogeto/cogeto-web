import type { ComplianceContent } from "@/lib/compliance";
import { compliance as complianceJson } from "@/lib/compliance";

/**
 * English compliance page content. The section content itself comes from
 * lib/compliance-content.json, the single source shared with the PDF
 * generator (scripts/generate-compliance-pdf.mjs), so page and PDF cannot
 * drift. This module adds only the page chrome strings around it.
 * The downloadable PDF exists in English only; localized pages label it.
 */

export type ComplianceUi = {
  metaTitle: string;
  metaDescription: string;
  /** Open Graph description, kept distinct from the meta description. */
  ogDescription: string;
  /** Prefix before the updated date, e.g. "Last updated:". */
  lastUpdatedLabel: string;
  downloadLabel: string;
  /** Note that the PDF is in English; omitted on the English page. */
  pdfLanguageNote?: string;
  organisationalBadge: string;
  honestLimitationLabel: string;
  schemaLinkLabel: string;
  trustLinkLabel: string;
  whitepaperLabel: string;
  trustScoreLabel: string;
  repoLabel: string;
  backLabel: string;
};

export const complianceContent: ComplianceContent = complianceJson;

export const complianceUi: ComplianceUi = {
  metaTitle: "Compliance",
  metaDescription:
    "How Cogeto makes the technical side of compliance demonstrable: EU single-tenant hosting, isolation, encryption, verifiable deletion, open data export, and GDPR and AI Act mapping.",
  ogDescription:
    "Where data lives, how it is isolated and protected, how deletion and export work, and how the design maps to EU regulation.",
  lastUpdatedLabel: "Last updated:",
  downloadLabel: "Download the one-pager PDF",
  organisationalBadge: "Organisational or contractual",
  honestLimitationLabel: "Honest limitation.",
  schemaLinkLabel: "Read the published Memory Passport schema",
  trustLinkLabel: "See the live trust score",
  whitepaperLabel: "Whitepaper",
  trustScoreLabel: "Trust score",
  repoLabel: "Source on GitHub",
  backLabel: "Back to cogeto.eu",
};
