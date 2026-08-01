/**
 * English copy for /open-source: the license, the commercial case, and the
 * models are services we perform, never prebuilt modules.
 */

export const openSource = {
  metaTitle: "Open source",
  metaDescription:
    "Cogeto's core is published under AGPLv3 because checkability is the product. The code is free; what you buy is operation, integration, accuracy measured on your documents, and someone accountable.",
  eyebrow: "Open source",
  headline: "The engine is open, because trust that cannot be checked is not trust",
  lede:
    "Cogeto's core is published under AGPLv3. The reason is not distribution strategy, it is credibility: every claim on this site is a claim about code, and published code turns those claims from assertions into statements anyone can check.",
  whyPay: {
    heading: "If the code is free, why pay",
    paragraphs: [
      "This is the model serious open source businesses have run on for decades: the code is free, and enterprises pay anyway, for operation, accountability, integration, and expertise, because nobody runs mission critical software alone.",
      "Cogeto works the same way, with one difference that raises the stakes: an instance holds years of accumulated, verified institutional memory, so professional operation matters more every month it runs.",
    ],
    openCard: {
      name: "Free forever, in full",
      bullets: [
        "The engine: ingestion, verification, reconciliation, retrieval, chat",
        "The findings report and every proof artifact",
        "The installation and configuration path, fully documented",
        "The evaluation harness and the published trust scores",
      ],
    },
  },
  quote:
    "Run Cogeto free forever. Pay for it to be yours: installed inside your walls, tuned to your documents, measured on your material, and answered for by someone.",
  offers: {
    heading: "What you buy from us",
    sub: "Concrete engagements, in the order customers take them. No pricing pages, no tiers to decode: every one starts with a conversation.",
    items: [
      {
        title: "1. The pilot",
        text: "Send us a document set; we deliver the signed findings report. Fixed scope, days not months. This is the first purchase.",
        link: { label: "Start a pilot", href: "/get-started" },
      },
      {
        title: "2. Your instance, operated",
        text: "We run it in the EU or deploy it on your servers: installation, updates, backups, monitoring, a signed DPA, and one person accountable. Four years of verified memory is not something you want on an unmaintained container.",
      },
      {
        title: "3. Inside your walls",
        text: "Self hosted and fully offline deployment, identity integration with your identity provider, mail routing, connectors to your systems, and local models served on your hardware so nothing ever leaves.",
      },
      {
        title: "4. Tuned to your industry",
        text: "Extraction and verification calibrated for your document class, a golden set built from your document types, and trust scores published for your exact configuration. Custom and local models where the material demands them. Anyone can clone the engine; measured accuracy on your documents cannot be cloned.",
      },
      {
        title: "5. Assurance",
        text: "Support with response times, answered security reviews, managed upgrades and migrations, training, and a commercial license where AGPL does not fit your legal posture.",
      },
    ],
  },
  why: {
    heading: "The license does the trust work",
    paragraphs: [
      "Published code is what makes our trust claims checkable, and checkability is the product. It also removes vendor risk: the code and your data both outlive us. The business is everything around the code, and AGPLv3 keeps the deal honest: anyone who runs a modified version as a service must publish their changes, so the code you can read stays the code that runs.",
    ],
    claims: [
      "Visibility rules live inside the database queries, not in application code someone forgot to call",
      "No fact can exist without provenance; the span is a required field",
      "Deletion receipts are hash chained, so none can be altered or excised",
      "There is exactly one seam through which a model call can leave the instance",
    ],
  },
  cards: [
    {
      title: "Nothing holds you in place",
      text: "One click exports everything, facts, sources, history, relations, and receipts, in an open documented format that verifies outside Cogeto. If you leave, you leave with everything, provably intact.",
    },
    {
      title: "The name and logo are trademarks",
      text: "The Cogeto name and logo are not covered by the code license. The code is free to use under AGPLv3; passing a modified service off as Cogeto is not.",
    },
    {
      title: "Contributions are welcome",
      text: "Issues, the contribution guide, the golden set rules, and the disclosure process are public. Contributions require accepting the contributor license agreement with a single comment; the reasoning is stated there honestly.",
    },
  ],
  linksHeading: "Read it yourself",
  badgeUi: { evidenceLabel: "View the evidence", detailsLabel: "Details" },
  links: [
    {
      icon: "check" as const,
      name: "The repository",
      text: "The full source, the docs, the eval harness, and the published trust score files.",
      href: "https://github.com/Cogeto/cogeto",
      external: true,
    },
    {
      icon: "signature" as const,
      name: "Commercial license terms",
      text: "The AGPL exemption, stated in plain language in the repository.",
      href: "https://github.com/Cogeto/cogeto/blob/main/COMMERCIAL-LICENSE.md",
      external: true,
    },
    {
      icon: "shield" as const,
      name: "Trademark policy",
      text: "What the AGPL covers and what the brand does not.",
      href: "https://github.com/Cogeto/cogeto/blob/main/TRADEMARK.md",
      external: true,
    },
  ],
  cta: {
    heading: "The engine is open. The pilot is where it becomes yours.",
    secondary: { label: "Run it yourself", href: "/docs" },
  },
};
