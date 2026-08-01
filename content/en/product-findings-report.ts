import type { ZPageContent } from "./product-contradiction-findings";

/**
 * English copy for /product/findings-report, rebuilt in the Z-rhythm
 */
export const findingsReport: ZPageContent = {
  metaTitle: "The findings report",
  metaDescription:
    "One click produces a signed findings report over the documents you select: every contradiction with its evidence, every superseded statement with its chain, and what verification rejected. PDF for people, JSON for machines.",
  eyebrow: "Product",
  headline: "Evidence you can forward, not minutes you retype",
  lede:
    "One click produces a findings report over the documents you select: every contradiction with its evidence, every superseded statement with its chain, and a summary of what verification rejected. Signed, so a third party can verify it was not altered.",
  heroMock: "report",
  bands: [
    {
      heading: "The auditor gets evidence, not summaries",
      advantage:
        "Each contradiction appears with both claims, both verbatim source sentences, the document with revision and location for each side, the detection date, and its resolution status.",
      mechanism:
        "Superseded facts appear with their chains, and the suppressed fact summary makes what was rejected part of the record.",
      mock: "finding-cold",
    },
    {
      heading: "The signature covers a defined scope",
      advantage:
        "A report is always produced over an explicitly selected set of sources, so what was audited is part of the record, not an assumption.",
      mechanism:
        "Findings that reference a document outside the selected scope appear in a clearly labelled boundary section rather than being silently included or dropped.",
      mock: "log",
    },
    {
      heading: "The report states its own accuracy",
      advantage:
        "The artifact you forward declares the measured trust scores of the exact model configuration that produced it. No other document tool tells your auditor how accurate it is.",
      mechanism:
        "The same numbers are public on the trust page for every release, per language and per configuration.",
      link: { label: "The published trust scores", href: "/trust" },
      mock: "answer-conflict",
    },
  ],
  statNote:
    "Live from the published per-release trust scores. The report carries the scores of its own model configuration; these are the current aggregates.",
  gridHeading: "Built for the file it ends up in",
  grid: [
    {
      title: "PDF and JSON",
      text: "PDF for the auditor and the design review record, JSON for your quality system, both signed through the same path as deletion receipts.",
    },
    {
      title: "Before an audit",
      text: "Four years of documentation, several hundred files, two languages, some scans. Next morning: the findings. Six weeks later the signed report goes into the design review record.",
    },
    {
      title: "On the day of a change",
      text: "A change notice arrives by mail and conflicts with one interface document. That finding surfaces the same day, not during an audit two years later.",
    },
    {
      title: "Not a regulatory assessment",
      text: "Cogeto produces evidence about your documents. Regulatory judgment stays with your organization, and the docs say so plainly.",
    },
  ],
  cta: {
    heading: "Your first report comes out of the pilot.",
    sub: "Bring a real document set. The pilot ends with the signed findings report on your material, and you keep it either way.",
    secondary: { label: "How findings are detected", href: "/product/contradiction-findings" },
  },
};
