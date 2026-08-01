
export interface OfferCard {
  name: string;
  highlight?: string;
  positioning: string;
  bullets: string[];
  cta: { label: string; href: string; kind: "primary" | "secondary" | "link" };
}

export interface GetStartedContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    lede: string;
    secondary: { label: string; href: string };
  };
  stepsHeading: string;
  steps: { title: string; text: string }[];
  offersHeading: string;
  offersSub: string;
  offers: OfferCard[];
  alsoFrom: {
    heading: string;
    items: { title: string; text: string }[];
    link: { label: string; href: string };
  };
  languagesNote: string;
  faqHeading: string;
  faq: { question: string; answer: string }[];
  contact: {
    heading: string;
    sub: string;
    steps: string[];
    chips: string[];
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    sendingLabel: string;
    sentTitle: string;
    sentBody: string;
    errorBody: string;
    directLine: string;
  };
}

export const getStarted: GetStartedContent = {
  metaTitle: "Start a pilot",
  metaDescription:
    "Bring a real document set. Cogeto reads it and produces the signed findings report, so the first thing you see is what it found in your own documents. We reply within one business day.",
  hero: {
    eyebrow: "Get started",
    headline: "The first thing you see is what it found in your documents",
    lede:
      "A pilot starts with a real document set of yours. Cogeto reads it and produces the signed findings report, before any longer commitment. Your documents, your infrastructure if you want, and a result you can forward.",
    secondary: { label: "Download the compliance one-pager", href: "/documents/cogeto-compliance-onepager.pdf" },
  },
  stepsHeading: "What happens next",
  steps: [
    {
      title: "We reply within one business day",
      text: "Tell us roughly what your document set looks like: how many documents, which formats, which languages. That is all a first reply needs.",
    },
    {
      title: "A 30 minute scoping call",
      text: "With the Cogeto team, not a sales sequence. You leave knowing whether a pilot makes sense and what it would cover.",
    },
    {
      title: "A pilot proposal for your environment",
      text: "Your documents, hosted in the EU, in your cloud, or fully offline. The pilot ends with the signed findings report on your material.",
    },
  ],
  offersHeading: "Four ways to run it",
  offersSub:
    "Every instance is single tenant: one deployment, one customer, no shared anything. There are no published prices; every engagement starts with the pilot conversation.",
  offers: [
    {
      name: "Pilot",
      highlight: "Start here",
      positioning: "See it on your own documents before any commitment.",
      bullets: [
        "A real document set of yours, read in full",
        "Contradictions found, with both sources linked",
        "The signed findings report at the end",
        "You keep the report either way",
      ],
      cta: { label: "Start a pilot", href: "#contact", kind: "primary" },
    },
    {
      name: "Hosted EU",
      positioning: "Your instance, operated: installed, updated, answered for.",
      bullets: [
        "Single tenant instance, yours alone, EU jurisdiction",
        "Installation, updates, backups, and monitoring, done for you",
        "A signed DPA and one person accountable",
        "Sensitive entities redacted before any external call",
      ],
      cta: { label: "Talk to us", href: "#contact", kind: "secondary" },
    },
    {
      name: "Self hosted",
      positioning: "Run the open source release on your own infrastructure.",
      bullets: [
        "AGPLv3, everything on this site included",
        "Signed release images, one operator script",
        "Public installation and configuration docs",
        "Commercial license available if you need one",
      ],
      cta: { label: "Read the docs", href: "/docs", kind: "link" },
    },
    {
      name: "Fully offline",
      positioning: "Inside your walls, nothing leaves at all.",
      bullets: [
        "Local models served on your hardware",
        "Identity integration with your identity provider",
        "Mail routing and connectors to your systems",
        "Offline image bundle for air gapped installs",
      ],
      cta: { label: "Security and sovereignty", href: "/security", kind: "link" },
    },
  ],
  alsoFrom: {
    heading: "Also from us",
    items: [
      {
        title: "Tuned to your industry",
        text: "Extraction and verification calibrated for your document class, with a golden set built from your document types and trust scores published for your exact configuration.",
      },
      {
        title: "Assurance",
        text: "Support with response times, answered security reviews, managed upgrades and migrations, training, and a commercial license where AGPL does not fit your legal posture.",
      },
    ],
    link: { label: "Why the code is free and this is not", href: "/open-source" },
  },
  languagesNote:
    "Interface in English, Croatian, and German. Memory quality is measured per language and published, so you can see where quality is strong before you commit.",
  faqHeading: "The questions buyers actually ask",
  faq: [
    {
      question: "Does my data leave my instance?",
      answer:
        "Only if you configure an external model provider, and then only after sensitive entities have been replaced locally with pseudonyms. In offline mode nothing leaves at all.",
    },
    {
      question: "Do you train on our documents?",
      answer:
        "Never. Your knowledge stays in your instance. That is what makes citation, correction, and provable deletion possible.",
    },
    {
      question: "What happens if we stop using Cogeto?",
      answer:
        "One click exports everything, facts, sources, history, relations, and receipts, in an open documented format. The code is open source. Nothing about the design holds you in place.",
    },
    {
      question: "How accurate is it?",
      answer:
        "Measured, published per release, per language, and per model configuration, including where it falls short of its targets. The accuracy page is public.",
    },
    {
      question: "Can it run without internet?",
      answer:
        "Yes, fully. Language models, embeddings, page recognition, and search all run inside the instance.",
    },
    {
      question: "Is it a medical device or a regulatory assessment?",
      answer:
        "No. Cogeto produces evidence about your documents. Regulatory judgment stays with your organization.",
    },
  ],
  contact: {
    heading: "Start a pilot",
    sub: "Three fields. We reply within one business day.",
    steps: [
      "We reply within one business day",
      "A 30 minute scoping call, no sales sequence",
      "A pilot proposal: your documents, your infrastructure",
    ],
    chips: [
      "ISO 9001 and ISO 27001 certified company",
      "Open source, AGPLv3",
      "EU jurisdiction",
    ],
    nameLabel: "Name",
    emailLabel: "Work email",
    messageLabel: "What does your document set look like?",
    messagePlaceholder:
      "Roughly how many documents, which formats, which languages, and whether it needs to run inside your network.",
    submitLabel: "Start a pilot",
    sendingLabel: "Sending",
    sentTitle: "Received.",
    sentBody: "We read every message ourselves and reply within one business day.",
    errorBody:
      "Sending failed just now. Write to us directly at hi@cogeto.eu instead; the same one business day reply applies.",
    directLine: "Prefer plain email? hi@cogeto.eu, same one business day reply.",
  },
};
