/**
 * product: animated scene, bento vignettes, flow diagram, color bands.
 */

export type HeroVignette =
  | {
      kind: "qa" | "timetravel";
      label: string;
      question: string;
      answer: string;
      citation: string;
      chip: string;
      holdMs: number;
    }
  | {
      kind: "finding";
      label: string;
      claims: { text: string; source: string }[];
      chip: string;
      holdMs: number;
    }
  | {
      kind: "ingest";
      label: string;
      text: string;
      detail: string;
      chip: string;
      holdMs: number;
    };

export type BentoItem =
  | {
      kind: "memory";
      title: string;
      text: string;
      sources: string[];
      memoryLabel: string;
    }
  | {
      kind: "qa" | "timetravel";
      title: string;
      text: string;
      question: string;
      answer: string;
      source: string;
    }
  | {
      kind: "changed";
      title: string;
      text: string;
      oldValue: string;
      newValue: string;
      tag: string;
    }
  | { kind: "report"; title: string; text: string; header: string; chip: string }
  | { kind: "silence"; title: string; text: string; banner: string; answer: string };

export interface HomeContent {
  hero: {
    /** Two halves of the headline; the second carries the gradient accent. */
    headlineA: string;
    headlineB: string;
    subhead: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    /** Three proof badges under the hero; icon keys resolve in Hero.tsx. */
    trustStrip: { icon: string; label: string; href: string }[];
    scene: {
      ariaLabel: string;
      fragments: { icon: string; label: string }[];
      vignettes: HeroVignette[];
    };
  };
  bento: {
    title: string;
    subtitle: string;
    items: BentoItem[];
    cta: { title: string; text: string; href: string };
  };
  how: {
    kicker: string;
    title: string;
    steps: { icon: string; title: string; text: string; chips: string[] }[];
    detailNote: string;
  };
  sovereignty: {
    kicker: string;
    title: string;
    deployPrefix: string;
    deployRotator: string[];
    deploySuffix: string;
    items: { title: string; text: string }[];
    companyLine: string;
    linkLabel: string;
    linkHref: string;
  };
  proof: {
    kicker: string;
    title: string;
    intro: string;
    releaseLabel: string;
    linkLabel: string;
    linkHref: string;
  };
  clients: {
    title: string;
    subtitle: string;
    items: { name: string; image: string; badge?: string }[];
    disclaimer: string;
  };
  askAssistant: {
    kicker: string;
    title: string;
    text: string;
    prompt: string;
    assistants: { name: string; urlPrefix: string }[];
    copyLabel: string;
    copiedLabel: string;
  };
  gettingStarted: {
    kicker: string;
    title: string;
    steps: { title: string; text: string }[];
    selfHostNote: string;
    cta: { label: string; href: string };
    docsLink: { label: string; href: string };
  };
  closing: {
    heading: string;
    sub: string;
    secondary: { label: string; href: string };
  };
}

export const home: HomeContent = {
  hero: {
    headlineA: "Models are rented.",
    headlineB: "Knowledge is owned.",
    subhead:
      "Cogeto reads your documents, verifies every fact against its own source before storing it, tells you where your documents contradict each other, and proves all of it. Runs in your infrastructure, in Europe, or fully offline.",
    ctaPrimary: { label: "Start a pilot", href: "/get-started" },
    ctaSecondary: { label: "Read the whitepaper", href: "/whitepaper" },
    trustStrip: [
      { icon: "Code", label: "Open source, AGPLv3", href: "/open-source" },
      {
        icon: "Award",
        label: "ISO 9001 and ISO 27001 certified company",
        href: "/security",
      },
      { icon: "WifiOff", label: "Works fully offline", href: "/security" },
    ],
    scene: {
      ariaLabel:
        "Scattered specifications, manuals, test reports, mail, scans, spreadsheets, and notes converge into verified answers with citations, a contradiction finding with both sources linked, an ingestion confirmation, and a past state recalled through time travel.",
      fragments: [
        { icon: "FileText", label: "specification" },
        { icon: "BookOpen", label: "manual" },
        { icon: "FlaskConical", label: "test report" },
        { icon: "Mail", label: "mail" },
        { icon: "ScanLine", label: "scan" },
        { icon: "Table", label: "spreadsheet" },
        { icon: "StickyNote", label: "notes" },
      ],
      vignettes: [
        {
          kind: "qa",
          label: "You ask",
          question: "What does the spec require for cold start?",
          answer: "Minus thirty two degrees, since revision D.",
          citation: "specification, revision D",
          chip: "verified",
          holdMs: 3600,
        },
        {
          kind: "finding",
          label: "Cogeto found",
          claims: [
            {
              text: "The battery can be swapped during operation.",
              source: "operating manual",
            },
            {
              text: "Any power interruption requires re-initialization.",
              source: "specification, current revision",
            },
          ],
          chip: "contradiction",
          holdMs: 4400,
        },
        {
          kind: "ingest",
          label: "A change notice arrives",
          text: "Read and verified: twelve facts added.",
          detail: "Conflicts with one interface document.",
          chip: "checked against everything known",
          holdMs: 3600,
        },
        {
          kind: "timetravel",
          label: "Time travel",
          question: "What did the documentation say at the order date?",
          answer: "The values current then, with their citations.",
          citation: "memory history, as of that date",
          chip: "time travel",
          holdMs: 3800,
        },
      ],
    },
  },

  bento: {
    title: "AI that knows your business",
    subtitle:
      "Because it is built on what your business actually recorded: verified, cited, contradiction checked, and provable.",
    items: [
      {
        kind: "memory",
        title: "One memory from everything you hold.",
        text: "Documents, spreadsheets, scans, photographed notes, mail, and connected systems become one connected, citable memory of what your company knows.",
        sources: ["specification", "manual", "test report", "mail", "scan", "note"],
        memoryLabel: "verified memory",
      },
      {
        kind: "qa",
        title: "Discuss what your company knows.",
        text: "Ask in plain language. Every claim in the answer cites the exact sentence it rests on.",
        question: "Which pinout is current for the service interface?",
        answer: "Revision D's, and two documents disagree.",
        source: "interface specification, revision D",
      },
      {
        kind: "changed",
        title: "Contradictions surface on their own.",
        text: "When two of your documents disagree, both sides are flagged and linked, with both sentences and the date.",
        oldValue: "Battery can be swapped during operation",
        newValue: "Power interruption requires re-initialization",
        tag: "conflict flagged, both sides linked",
      },
      {
        kind: "report",
        title: "A signed report you can forward.",
        text: "Every finding with its evidence, signed so a third party can verify it was not altered. PDF for the auditor, JSON for your systems.",
        header: "Findings report",
        chip: "signed",
      },
      {
        kind: "timetravel",
        title: "Ask what you believed in March.",
        text: "Every fact carries the period over which it holds, and superseded statements keep their history.",
        question: "What was the cold start limit in March?",
        answer: "Minus twenty five degrees, tightened since.",
        source: "specification history, as of March",
      },
      {
        kind: "silence",
        title: "Honest where your records are silent.",
        text: "When your documents do not cover a question, Cogeto says so plainly before offering anything else.",
        banner: "Not covered by your documents",
        answer: "General knowledge follows, clearly marked.",
      },
    ],
    cta: {
      title: "How is all of that verified?",
      text: "Follow a fact from document to answer.",
      href: "/product/verified-memory",
    },
  },

  how: {
    kicker: "How it works",
    title: "From a folder of documents to provable memory",
    steps: [
      {
        icon: "Inbox",
        title: "Read",
        text: "PDFs, Word files, spreadsheets, scans, mail. A file that cannot be read is labelled unreadable, never quietly skipped.",
        chips: ["folders", "mailboxes", "scans", "connectors"],
      },
      {
        icon: "Crosshair",
        title: "Anchor",
        text: "Each document's subject, class, and revision are learned first, so every fact lands on the right product.",
        chips: [],
      },
      {
        icon: "ShieldCheck",
        title: "Verify",
        text: "A second, independent pass checks every claim against its own source sentence before anything is stored.",
        chips: [],
      },
      {
        icon: "GitCompareArrows",
        title: "Reconcile",
        text: "The corpus is compared against itself: aliases resolved, numbers checked arithmetically, conflicts flagged and linked.",
        chips: [],
      },
      {
        icon: "MessagesSquare",
        title: "Answer and prove",
        text: "Chat with per claim citations, honest silence where records are silent, and a signed findings report over any document set.",
        chips: ["citations", "findings", "signed report"],
      },
    ],
    detailNote: "The full mechanism, step by step, with the guarantees behind it:",
  },

  sovereignty: {
    kicker: "Your infrastructure, your jurisdiction",
    title: "One instance per customer",
    deployPrefix: "Runs",
    deployRotator: ["hosted in the EU", "on your own servers", "fully offline"],
    deploySuffix: "with hosted or fully local models.",
    items: [
      {
        title: "Nothing shared with anyone",
        text: "No shared database, no shared index, no other tenant's data anywhere near yours. Isolation is a deployment boundary.",
      },
      {
        title: "Offline means offline",
        text: "In offline mode the language models, embeddings, page recognition, and search all run inside the instance. No telemetry.",
      },
      {
        title: "Redaction before any external call",
        text: "Names, organizations, and amounts are replaced locally with pseudonyms before an external model is called. If redaction cannot run, the call does not happen.",
      },
      {
        title: "Never training data",
        text: "Nothing you store is used to train any model, which is exactly what makes citation, correction, and provable deletion possible.",
      },
    ],
    companyLine:
      "Behind it: MVT Solutions Group, an ISO 9001 and ISO 27001 certified company, operating from Croatia in the European Union.",
    linkLabel: "Security and sovereignty in full",
    linkHref: "/security",
  },

  proof: {
    kicker: "Verify before you remember",
    title: "Accuracy, measured and published every release",
    intro:
      "These numbers are read live from the published per-release data files, the same immutable files the trust page charts. Scores are published per language and per model configuration, and the gates they must clear are public too.",
    releaseLabel: "Current release",
    linkLabel: "See every number, including the ones below target",
    linkHref: "/trust",
  },

  clients: {
    title: "Clients and partners",
    subtitle:
      "The teams behind Cogeto have worked with and delivered for organizations across public health, industry, hospitality, logistics, and research, and partner with EU infrastructure providers to keep data sovereign.",
    items: [
      {
        name: "OVHcloud",
        image: "/clients-partners/ovh-cloud.png",
        badge: "Cloud partner",
      },
      { name: "Department of Health, UAE", image: "/clients-partners/doh-uae.png" },
      { name: "Hilton", image: "/clients-partners/hilton.png" },
      { name: "DSV", image: "/clients-partners/dsv.png" },
      { name: "Beckhoff Automation", image: "/clients-partners/beckhoff.png" },
      { name: "ESTUN Automation", image: "/clients-partners/estun.png" },
      { name: "BIRD Incubator", image: "/clients-partners/bird-incubator.png" },
      {
        name: "Zagreb University of Applied Sciences",
        image: "/clients-partners/tvz.png",
      },
      {
        name: "Open Source Initiative",
        image: "/clients-partners/open-source-initiative.png",
      },
    ],
    disclaimer:
      "All logos and trademarks are the property of their respective owners. They are shown as references of the companies behind Cogeto and do not imply endorsement of the Cogeto product.",
  },

  askAssistant: {
    kicker: "Second opinion",
    title: "Ask your assistant about Cogeto",
    text: "Open the assistant you already use with a prepared prompt. It will read this site and the public repository and give you its own summary of what Cogeto is.",
    prompt:
      "Summarize what Cogeto is and what makes it different from retrieval and enterprise search tools. Use https://cogeto.eu and https://github.com/Cogeto/cogeto as your references.",
    assistants: [
      { name: "Claude", urlPrefix: "https://claude.ai/new?q=" },
      { name: "ChatGPT", urlPrefix: "https://chatgpt.com/?q=" },
      { name: "Perplexity", urlPrefix: "https://www.perplexity.ai/search?q=" },
      { name: "Copilot", urlPrefix: "https://copilot.microsoft.com/?q=" },
    ],
    copyLabel: "Copy the prompt for any other assistant",
    copiedLabel: "Copied",
  },

  gettingStarted: {
    kicker: "Getting started",
    title: "Start with a pilot on your own documents",
    steps: [
      {
        title: "A pilot on your own documents",
        text: "Bring a real document set. Cogeto reads it and produces the findings report. You see exactly what it found, on your material, before any longer commitment.",
      },
      {
        title: "Your instance",
        text: "Hosted by us in the EU, deployed to your cloud, or installed inside your network, including fully offline. One instance, yours alone.",
      },
      {
        title: "It keeps working",
        text: "Every new revision, change notice, or mail is checked against everything already known, so conflicts surface on the day they are created rather than during the next audit.",
      },
    ],
    selfHostNote:
      "Run Cogeto free forever. Pay for it to be yours: installed inside your walls, tuned to your documents, measured on your material, and answered for by someone.",
    cta: { label: "Start a pilot", href: "/get-started" },
    docsLink: { label: "Run it yourself", href: "/docs" },
  },

  closing: {
    heading: "See it on your documents.",
    sub: "The pilot reads a real document set of yours and ends with the signed findings report. We reply within one business day.",
    secondary: { label: "Run it yourself", href: "/docs" },
  },
};
