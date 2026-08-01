/**
 * Typed view over the single compliance content source. Both this page and the
 * PDF generator (scripts/generate-compliance-pdf.mjs) read the same JSON file,
 * so the page and the downloadable PDF cannot drift apart.
 */
import content from "./compliance-content.json";

export type CompliancePoint = { label: string; text: string };

export type ComplianceSection = {
  id: string;
  heading: string;
  excerpt: string;
  body: string[];
  points?: CompliancePoint[];
  note?: string;
  organisational?: boolean;
};

export type ComplianceReceipt = {
  caption: string;
  note: string;
  value: Record<string, unknown>;
};

export type ComplianceContent = {
  title: string;
  subtitle: string;
  updated: string;
  intro: string;
  sections: ComplianceSection[];
  receipt: ComplianceReceipt;
  links: Record<string, string>;
  closing: string;
};

export const compliance = content as ComplianceContent;

/** Public path of the generated one-pager PDF. */
export const compliancePdfFile = "/documents/cogeto-compliance-onepager.pdf";
