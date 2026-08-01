/**
 * English copy for /security, rebuilt on the trust-page skeleton (audit
 * 10, cogeto-verified-memory.md 8, docs/deployment.md, the published
 */

export interface SecurityContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    lede: string;
    secondary: { label: string; href: string };
  };
  badgesHeading: string;
  /** Link labels on badge cards: external evidence and internal detail. */
  badgeUi: { evidenceLabel: string; detailsLabel: string };
  badges: {
    icon: "award" | "shield" | "signature" | "check";
    name: string;
    text: string;
    href?: string;
    external?: boolean;
  }[];
  highlightsHeading: string;
  highlights: { title: string; text: string }[];
  clustersHeading: string;
  clustersSub: string;
  clusters: { title: string; bullets: string[] }[];
  audit: {
    heading: string;
    text: string;
    links: { label: string; href: string; external?: boolean }[];
  };
  company: { heading: string; text: string };
  artifactsHeading: string;
  artifacts: { label: string; href: string; external?: boolean }[];
  cta: { heading: string; sub: string; secondary: { label: string; href: string; external?: boolean } };
}

export const security: SecurityContent = {
  metaTitle: "Security and sovereignty",
  metaDescription:
    "Single tenant isolation, EU hosting or fully offline operation, redaction that fails closed, signed deletion receipts, a published security audit, and an ISO 9001 and ISO 27001 certified company behind it. Nothing gated behind a sales call.",
  hero: {
    eyebrow: "Security and sovereignty",
    headline: "Nothing to trust. Everything to check.",
    lede:
      "Every claim on this page is a mechanism in the open source release or a certification of the company behind it. The architecture is public, the audit is published, and the code can be read before a single document is sent anywhere.",
    secondary: {
      label: "Download the compliance one-pager",
      href: "/documents/cogeto-compliance-onepager.pdf",
    },
  },
  badgesHeading: "Certifications and proof",
  badgeUi: { evidenceLabel: "View the evidence", detailsLabel: "Details" },
  badges: [
    {
      icon: "award",
      name: "ISO 9001",
      text: "Company certification of MVT Solutions Group, the company that builds and operates Cogeto. Quality management, audited.",
    },
    {
      icon: "award",
      name: "ISO 27001",
      text: "Company certification of MVT Solutions Group. Information security management, audited.",
    },
    {
      icon: "check",
      name: "Open source, AGPLv3",
      text: "The engine is public. Your security team can read the ingestion path, the access gates, and the deletion saga line by line.",
      href: "/open-source",
    },
    {
      icon: "shield",
      name: "Published security audit",
      text: "The 2.0 audit, closed across five remediation waves, with its independent verification, published in full in the repository.",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
      external: true,
    },
    {
      icon: "signature",
      name: "Signed releases",
      text: "Production instances pull prebuilt images signed by the release pipeline. The operator script verifies signatures itself, and every release carries its software bill of materials.",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
      external: true,
    },
    {
      icon: "check",
      name: "GDPR and AI Act mapping",
      text: "Erasure with signed receipts, protection by design as architecture, and a transparency posture built to show its work. Mapped claim by claim on the compliance page.",
      href: "/compliance",
    },
  ],
  highlightsHeading: "The security design in six mechanisms",
  highlights: [
    {
      title: "One instance per customer",
      text: "No shared database, no tenant column, no cross tenant query path. Isolation is a deployment boundary, not a filter.",
    },
    {
      title: "Offline means offline",
      text: "Models, embeddings, page recognition, and search run inside the instance. One egress seam, enforced in CI. No telemetry.",
    },
    {
      title: "Redaction fails closed",
      text: "Sensitive entities are pseudonymized locally before any external model call. If redaction cannot run, the call does not happen.",
    },
    {
      title: "Deletion you can prove",
      text: "Deletion runs as a saga across all three stores and ends in a signed, hash chained receipt, re-verified nightly.",
    },
    {
      title: "An audit log that cannot be edited",
      text: "Append only, enforced by a database trigger, written in the same transaction as the action, covering reads as well as writes.",
    },
    {
      title: "Leaving is supported",
      text: "The Memory Passport exports everything, signed, in an open documented format that verifies outside Cogeto.",
    },
  ],
  clustersHeading: "Controls, in questionnaire form",
  clustersSub:
    "Verb led, so your reviewer can paste them straight into the vendor form.",
  clusters: [
    {
      title: "Isolation and access",
      bullets: [
        "Runs one deployment per customer; no multi tenant mode exists",
        "Enforces access inside the query, in both stores, never on fetched results",
        "Assigns scope deterministically; never infers permissions from content",
        "Encrypts originals at rest under tenant scoped keys; serves them only through short lived signed URLs",
      ],
    },
    {
      title: "Model traffic and sovereignty",
      bullets: [
        "Routes every model call through a single gateway seam, enforced in CI",
        "Defaults to a European provider; supports fully local models",
        "Pseudonymizes names, organizations, and amounts before any external call, embeddings included",
        "Uses no customer content for training, ever",
      ],
    },
    {
      title: "Proof and integrity",
      bullets: [
        "Signs deletion receipts and hash chains them to their predecessors",
        "Sweeps nightly for orphans and tampering; reports and never repairs",
        "Records every state change in an append only audit log",
        "Publishes measured accuracy per release, per language, per model configuration",
      ],
    },
  ],
  audit: {
    heading: "Audited, and the audit is public",
    text: "The 2.0 security audit is closed out across five remediation waves: every finding fixed or consciously accepted with a written rationale. Both the audit and its independent verification are published in the repository, readable in full. That is the standard this page holds itself to: no claim without an artifact.",
    links: [
      {
        label: "Read the audit",
        href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
        external: true,
      },
      {
        label: "Security documentation",
        href: "https://github.com/Cogeto/cogeto/tree/main/docs/security",
        external: true,
      },
      {
        label: "Report a vulnerability",
        href: "https://github.com/Cogeto/cogeto/blob/main/SECURITY.md",
        external: true,
      },
    ],
  },
  company: {
    heading: "The company behind it",
    text: "Cogeto is built by MVT Solutions Group d.o.o. and MCTO Advisory d.o.o., two companies operating from Croatia in the European Union, founded and led by Ivan Golubic. MVT Solutions Group is ISO 9001 and ISO 27001 certified, so the product's quality and information security management stand on audited company processes, not only on code.",
  },
  artifactsHeading: "Take the artifacts with you",
  artifacts: [
    {
      label: "Compliance one-pager (PDF)",
      href: "/documents/cogeto-compliance-onepager.pdf",
    },
    { label: "The full compliance mapping", href: "/compliance" },
    { label: "Published trust scores", href: "/trust" },
    {
      label: "Memory Passport schema",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/passport-schema",
      external: true,
    },
  ],
  cta: {
    heading: "Bring your security team to the pilot.",
    sub: "Data residency requirements, air gaps, and security reviews are normal conversations here, not exceptions.",
    secondary: {
      label: "Read the audit",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
      external: true,
    },
  },
};
