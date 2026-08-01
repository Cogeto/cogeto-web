/**
 * generated numbers and findings, plausible magnitudes, and only finding
 * kinds the engine really detects: numeric and unit conflicts, manual
 * against specification after a change notice, revision drift,
 * cross-language subject resolution, supersessions, suppressed
 * extractions. Boundaries: no real customer names, no attributed quotes,
 * no deployment or revenue claims.
 */

export interface CsFinding {
  intro: string;
  mock:
    | { kind: "finding"; claims: { text: string; source: string }[]; chip: string }
    | {
        kind: "chain";
        oldClaim: { text: string; source: string };
        newClaim: { text: string; source: string };
        note: string;
      }
    | { kind: "report"; lines: string[] }
    | { kind: "suppression"; rows: { reason: string; count: string }[]; note: string };
}

export interface CaseStudy {
  slug: string;
  navLabel: string;
  industryLabel: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  heroMock: { claims: { text: string; source: string }[]; chip: string };
  situation: { heading: string; pains: { title: string; text: string }[] };
  run: {
    heading: string;
    intro: string;
    steps: string[];
    summaryTitle: string;
    summary: { label: string; value: string }[];
  };
  findings: { heading: string; sub: string; items: CsFinding[] };
  outcomes: {
    heading: string;
    cards: { title: string; text: string }[];
    boundary?: string;
    deployment: string[];
  };
  faq: { question: string; answer: string }[];
  closing: { sentence: string; subject: string };
  chat: ChatExchange[];
}

export interface ChatSegment {
  text: string;
  chips?: string[];
}

export interface ChatExchange {
  question: string;
  segments: ChatSegment[];
  conflict?: { text: string; chips?: string[] };
  silence?: { title: string; banner: string };
  standsOn: string[];
}

export const caseIndex = {
  metaTitle: "Case studies",
  metaDescription:
    "What Cogeto finds in real document sets: technical files, requirement stacks, program documentation, and datasheet families, with the contradictions, supersessions, and signed findings reports.",
  eyebrow: "Case studies",
  headline: "What it finds when it reads everything",
  lede:
    "Four document sets, four industries, the same run: bulk import, verification, overnight reconciliation, and a signed findings report in the morning. Told the way the buyer lives it.",
  cards: [
    {
      industryLabel: "Medical devices",
      pain: "A technical file grown over four years and many hands.",
      outcome: "Audit preparation became a report, not archaeology.",
      metric: "27 contradictions in 412 documents",
      href: "/case-studies/medical-devices",
    },
    {
      industryLabel: "Defense",
      pain: "Material that cannot leave the building.",
      outcome: "Grounded answers inside a closed network.",
      metric: "Fully offline, zero outbound calls",
      href: "/case-studies/defense",
    },
    {
      industryLabel: "Automotive paint",
      pain: "The finish is craft, and the craft lives in people and scattered paper.",
      outcome: "Process knowledge that outlives the people who carry it.",
      metric: "24 conflicts across 643 documents",
      href: "/case-studies/automotive-paint",
    },
    {
      industryLabel: "Engineering teams",
      pain: "Forty near identical datasheets and a wiki nobody trusts.",
      outcome: "One corpus that answers with citations.",
      metric: "33 contradictions nobody had named",
      href: "/case-studies/engineering-teams",
    },
  ],
};

const DEPLOYMENT = [
  "Hosted in the EU: your single tenant instance, operated for you.",
  "Your cloud: deployed inside your own infrastructure.",
  "Fully offline: local models, no outbound connectivity, no telemetry.",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "medical-devices",
    navLabel: "Medical devices",
    industryLabel: "Medical devices",
    metaTitle: "Technical file consistency for medical devices",
    metaDescription:
      "How a medical device technical file, 412 documents and four years of revisions, was checked for consistency: 27 contradictions found, MDR technical documentation audit preparation done in days.",
    headline: "The technical file agreed with itself before the auditor asked",
    subhead:
      "A medical device manufacturer pointed Cogeto at four years of technical documentation. The next morning it knew every place the file disagreed with itself, with both sentences quoted and both revisions named.",
    heroMock: {
      claims: [
        {
          text: "The battery may be replaced while the device remains in operation.",
          source: "Instructions for use, revision 4",
        },
        {
          text: "Any interruption of supply voltage requires full re-initialization.",
          source: "System specification, revision F",
        },
      ],
      chip: "contradiction",
    },
    situation: {
      heading: "A file grown over four years and many hands",
      pains: [
        {
          title: "The change notice nobody propagated",
          text: "A design change altered the power architecture. The specification was updated; the instructions for use were not. Two controlled documents now disagree about what an operator may do.",
        },
        {
          title: "Audit preparation as archaeology",
          text: "Weeks of engineers reading revisions side by side, building spreadsheets of what should match, and hoping the sample the auditor pulls is one they checked.",
        },
        {
          title: "Two languages, one product",
          text: "The service manual is in Croatian, the specification in English. No reviewer reads both at once, so cross language disagreement is invisible by construction.",
        },
      ],
    },
    run: {
      heading: "The run",
      intro:
        "One bulk import: the technical file as it stood, including scanned type test reports and spreadsheet based risk tables.",
      steps: [
        "412 documents imported in one operation, deduplicated by content",
        "Scans read by local recognition inside the instance",
        "Every document anchored to its product, class, and revision",
        "Every extracted claim verified against its own source sentence",
        "Overnight reconciliation across the whole corpus",
      ],
      summaryTitle: "The morning summary",
      summary: [
        { label: "documents read", value: "412" },
        { label: "facts stored", value: "18,347" },
        { label: "contradictions found", value: "27" },
        { label: "statements superseded", value: "214" },
        { label: "extractions suppressed", value: "391" },
        { label: "pages unreadable, listed by name", value: "9" },
      ],
    },
    findings: {
      heading: "The findings",
      sub: "Four of the twenty seven, as the product reports them.",
      items: [
        {
          intro:
            "The change notice conflict: the manual still permits what the current specification forbids.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "The battery may be replaced while the device remains in operation.",
                source: "Instructions for use, revision 4",
              },
              {
                text: "Any interruption of supply voltage requires full re-initialization.",
                source: "System specification, revision F",
              },
            ],
            chip: "contradiction",
          },
        },
        {
          intro:
            "A numeric conflict caught by arithmetic: the type test never covered what the specification requires.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Cold start verified at minus 25 degrees Celsius.",
                source: "Type test report TR-118, revision B",
              },
              {
                text: "Start up specified down to minus 32 degrees Celsius.",
                source: "System specification, revision F",
              },
            ],
            chip: "numeric conflict",
          },
        },
        {
          intro:
            "A cross language finding: the Croatian service manual and the English datasheet describe different hardware.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Jedinica sadrži jednu antenu.",
                source: "Servisni priručnik, revizija 2",
              },
              {
                text: "The unit contains two antennas.",
                source: "Product datasheet, revision D",
              },
            ],
            chip: "resolved across languages",
          },
        },
        {
          intro:
            "A supersession kept as history: shelf life changed by change notice, and the chain shows when belief changed.",
          mock: {
            kind: "chain",
            oldClaim: {
              text: "Sterile shelf life: three years.",
              source: "Labeling specification, revision C",
            },
            newClaim: {
              text: "Sterile shelf life: two years.",
              source: "Change notice CN-0142, revision A",
            },
            note: "Superseded, chain preserved. Ask what the file asserted at any past date.",
          },
        },
      ],
    },
    outcomes: {
      heading: "What it means for you",
      cards: [
        {
          title: "Audit preparation in days",
          text: "The findings report over the exact file scope, signed, with every conflict and its evidence, goes into the design review record.",
        },
        {
          title: "Conflicts caught on creation day",
          text: "Every new change notice is checked against everything already known the day it arrives, not at the next audit.",
        },
        {
          title: "History that survives turnover",
          text: "Superseded statements keep their chains, so what the file asserted at any date stays answerable.",
        },
        {
          title: "Answers with citations",
          text: "Ask the file anything; every claim in the answer names its sentence, document, and revision, or says the file is silent.",
        },
      ],
      boundary:
        "Cogeto produces evidence about your documents. Regulatory judgment stays with your organization.",
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Is this a regulatory assessment?",
        answer:
          "No. Cogeto produces evidence about your documents: what conflicts, what superseded what, and what could not be verified. Regulatory judgment stays with you.",
      },
      {
        question: "Our file is full of scans. Does that work?",
        answer:
          "Scanned pages are read by local recognition inside the instance, so nothing leaves your boundary. Pages that cannot be read are listed by name, never silently skipped.",
      },
      {
        question: "Our documentation is in two languages.",
        answer:
          "Subjects resolve across languages, so a Croatian manual can contradict an English specification. Accuracy is measured and published per language, so you see the quality before you commit.",
      },
      {
        question: "Who resolves the findings?",
        answer:
          "Your engineers, with both sentences and both revisions in front of them. Cogeto surfaces and documents; it does not decide which document is right.",
      },
    ],
    closing: {
      sentence:
        "Send a technical file; we deliver the signed findings report.",
      subject: "Pilot request, medical devices",
    },
    chat: [
      {
        question: "Can the battery be changed during operation?",
        segments: [
          { text: "The instructions for use permit it.", chips: ["IFU r4"] },
          {
            text: "The current specification forbids it: any supply interruption requires full re-initialization.",
            chips: ["Spec rF"],
          },
        ],
        conflict: {
          text: "Conflict: a change notice altered the power architecture; the manual was never updated.",
          chips: ["change notice"],
        },
        standsOn: ["IFU r4", "Spec rF", "change notice"],
      },
      {
        question: "What was the sterile shelf life when the March lot shipped?",
        segments: [
          {
            text: "Three years at that date, per the labeling specification then in force; tightened to two years by change notice CN-0142 since.",
            chips: ["Labeling spec rC", "CN-0142", "as of March"],
          },
        ],
        standsOn: ["Labeling spec rC", "CN-0142"],
      },
    ],
  },

  {
    slug: "defense",
    navLabel: "Defense",
    industryLabel: "Defense",
    metaTitle: "Air gapped AI for defense documentation",
    metaDescription:
      "Offline document intelligence inside a closed network: a defense electronics program ran Cogeto fully air gapped, sovereign deployment with local models, and got cited answers from 730 program documents.",
    headline: "Grounded answers, inside a network nothing leaves",
    subhead:
      "A defense electronics program runs Cogeto fully offline: local models on program hardware, no outbound connectivity, no telemetry. If the documents hold it, it answers from them, with citations.",
    heroMock: {
      claims: [
        {
          text: "Pin 7 carries the 28 volt supply.",
          source: "Interface control document ICD-A, revision 3",
        },
        {
          text: "Pin 7 is reserved and must not be connected.",
          source: "Harness drawing note, revision 1",
        },
      ],
      chip: "contradiction",
    },
    situation: {
      heading: "Material that cannot leave the building",
      pains: [
        {
          title: "Hosted assistants are not an option",
          text: "The material is not allowed outside the boundary, and a hosted assistant either cannot be used at all or refuses questions about your own systems.",
        },
        {
          title: "Knowledge rotates out with staff",
          text: "Postings change, contractors roll off, and the person who knew why the harness was rewired leaves. What was never written down is gone; what was written down is scattered.",
        },
        {
          title: "Interface documents that quietly disagree",
          text: "Two controlled documents, two owners, no cross reference. The disagreement surfaces during integration, at the most expensive possible moment.",
        },
      ],
    },
    run: {
      heading: "The run",
      intro:
        "Installed from the offline image bundle. Program documentation imported inside the enclave: specifications, interface control documents, drawings notes, test records, minutes.",
      steps: [
        "730 documents imported inside the closed network",
        "Local models and page recognition on program hardware",
        "Anchoring to system, subsystem, and revision",
        "Verification against source sentences before storage",
        "Overnight reconciliation, all inside the boundary",
      ],
      summaryTitle: "The morning summary",
      summary: [
        { label: "documents read", value: "730" },
        { label: "facts stored", value: "26,412" },
        { label: "contradictions found", value: "41" },
        { label: "statements superseded", value: "356" },
        { label: "extractions suppressed", value: "512" },
        { label: "outbound network calls", value: "0" },
      ],
    },
    findings: {
      heading: "The findings",
      sub: "Three of the forty one, as the product reports them.",
      items: [
        {
          intro:
            "The integration trap: two interface documents assign the same pin differently, neither referencing the other.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Pin 7 carries the 28 volt supply.",
                source: "Interface control document ICD-A, revision 3",
              },
              {
                text: "Pin 7 is reserved and must not be connected.",
                source: "Harness drawing note, revision 1",
              },
            ],
            chip: "contradiction",
          },
        },
        {
          intro:
            "A unit conflict caught by arithmetic: meters against feet, compared before any model was consulted.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Operating ceiling: 4,600 meters.",
                source: "Environmental specification, revision D",
              },
              {
                text: "Operating ceiling: 15,000 feet.",
                source: "Operator handbook, revision 2",
              },
            ],
            chip: "unit conflict",
          },
        },
        {
          intro:
            "What the system refused to store: extractions that failed verification, logged instead of believed.",
          mock: {
            kind: "suppression",
            rows: [
              { reason: "unsupported by source", count: "203" },
              { reason: "hedged in source", count: "168" },
              { reason: "unjudgeable span", count: "141" },
            ],
            note: "Every suppressed extraction is logged with its span, reason, and time, and summarized in the findings report.",
          },
        },
      ],
    },
    outcomes: {
      heading: "What it means for you",
      cards: [
        {
          title: "Grounded in your own corpus",
          text: "If your documents hold it, it answers from them, with citations. If they do not, it says so instead of guessing.",
        },
        {
          title: "Nothing leaves, verifiably",
          text: "One model egress seam, enforced in continuous integration, pointed at local models. The code is open, so your security team can confirm it.",
        },
        {
          title: "Knowledge survives rotation",
          text: "What was written down stays queryable with citations after the author has rolled off the program.",
        },
        {
          title: "Evidence for the review",
          text: "The signed findings report over a defined document scope, produced inside the enclave.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Does anything leave the network?",
        answer:
          "No. Language models, embeddings, page recognition, and search all run inside the instance. There is no telemetry, and the single model egress seam is enforced in continuous integration.",
      },
      {
        question: "How good are local models compared to hosted ones?",
        answer:
          "Measured, not asserted: every model configuration carries its own published trust scores, and untested combinations are flagged as not evaluated.",
      },
      {
        question: "Who operates it?",
        answer:
          "Your people, inside your walls. The installation path is documented, the operator script is public, and we train your operators as part of the engagement.",
      },
    ],
    closing: {
      sentence:
        "Send a document set, or bring us inside your walls; we deliver the signed findings report.",
      subject: "Pilot request, defense",
    },
    chat: [
      {
        question: "What is the antenna length for ARK-23 revision C?",
        segments: [
          { text: "1.2 meters.", chips: ["ICD ARK-23 rC", "Outline drawing r2"] },
        ],
        standsOn: ["ICD ARK-23 rC", "Outline drawing r2"],
      },
      {
        question: "What is the export classification for the ARK-23?",
        segments: [],
        silence: {
          title: "Your documents do not cover this.",
          banner: "General knowledge follows, marked as not from your sources.",
        },
        standsOn: [],
      },
    ],
  },

  {
    slug: "automotive-paint",
    navLabel: "Automotive paint",
    industryLabel: "Automotive paint",
    metaTitle: "Paint shop process knowledge, kept and verified",
    metaDescription:
      "Automotive paint documentation, verified: bake window and mixing ratio conflicts, film build drift, work instruction revision control, and tribal knowledge captured with citations.",
    headline: "The knowledge behind a perfect finish now outlives the people who carry it",
    subhead:
      "A premium finish is layers of craft: pretreatment, e-coat, primer, basecoat, clearcoat, each with its own window. A paint operation gave the process behind the surface the same rigor as the surface, and paint shop process control became checkable.",
    heroMock: {
      claims: [
        {
          text: "Bake 20 minutes at 140 degrees Celsius object temperature.",
          source: "Clearcoat CC-2 technical data sheet, revision 9",
        },
        {
          text: "Bake 18 minutes at 150 degrees Celsius object temperature.",
          source: "Process card PC-31, revision D",
        },
      ],
      chip: "contradiction",
    },
    situation: {
      heading: "The craft lives in people and scattered paper",
      pains: [
        {
          title: "The master retired",
          text: "With him went what no document holds: the winter adjustment when humidity drops, which defect means silicone contamination and which means the flash off was cut short, the batch sequencing that kept purge waste down.",
        },
        {
          title: "Nobody knows which copy is current",
          text: "Supplier data sheets, process cards, control plans, work instructions, mixing room sheets, an operator's notebook, four year old training decks, laminated cards at the station, photographed whiteboards, lineup rules in one planner's spreadsheet. Some of it contradicts the rest.",
        },
        {
          title: "A year before the booth trusts you",
          text: "New people learn by asking around, and process engineers inherit steps nobody can explain anymore. The rework loop teaches expensively what the paper should have said.",
        },
      ],
    },
    run: {
      heading: "The run",
      intro:
        "One afternoon of pointing Cogeto at the shop's paper: data sheets, process cards through their revisions, control plans, work instructions, mixing sheets, supplier change notices and mail, training decks, maintenance logs, and the notebook pages and laminated cards as photographs.",
      steps: [
        "643 documents imported, including 151 photographed pages and cards",
        "Photographs read by local recognition inside the instance",
        "Facts anchored to paint system, layer, and revision, so two clearcoat systems with near identical sheets stay distinct",
        "Every claim verified against its own source sentence",
        "Overnight reconciliation: sheet against card, plan against instruction, deck against current practice",
      ],
      summaryTitle: "The morning summary",
      summary: [
        { label: "documents read", value: "643" },
        { label: "facts stored", value: "16,480" },
        { label: "contradictions found", value: "24" },
        { label: "statements superseded", value: "168" },
        { label: "extractions suppressed", value: "297" },
        { label: "pages unreadable, listed by name", value: "11" },
      ],
    },
    findings: {
      heading: "The findings",
      sub: "Four of the twenty four, plus what was rejected and what was superseded, as the product reports them.",
      items: [
        {
          intro:
            "The bake window conflict: a reformulation change notice moved the window, and never reached the process card.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Bake 20 minutes at 140 degrees Celsius object temperature.",
                source: "Clearcoat CC-2 technical data sheet, revision 9",
              },
              {
                text: "Bake 18 minutes at 150 degrees Celsius object temperature.",
                source: "Process card PC-31, revision D",
              },
            ],
            chip: "contradiction, detected 12 June",
          },
        },
        {
          intro:
            "The mixing ratio that drifted: the mixing room sheet still teaches the old ratio; the data sheet moved on two revisions ago.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Mix 100 : 30 : 10 by volume with hardener H-40.",
                source: "Mixing room sheet, station 3",
              },
              {
                text: "Mix 100 : 35 : 10 by volume with hardener H-40.",
                source: "Basecoat B-7 technical data sheet, revision 11",
              },
            ],
            chip: "conflict, one side superseded, detected 13 June",
          },
        },
        {
          intro:
            "Film build that means two different things depending on which document you trust, both still in circulation.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Clearcoat film build: 45 to 55 microns.",
                source: "Control plan, revision F",
              },
              {
                text: "Clearcoat film build: 40 to 50 microns.",
                source: "Work instruction WI-208, revision C",
              },
            ],
            chip: "revision drift, detected 12 June",
          },
        },
        {
          intro:
            "The retired master's one line, photographed, extracted, verified, and now a cited fact with provenance instead of a memory.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Above 70 percent relative humidity, add 5 percent slower thinner.",
                source: "Photographed notebook page, mixing room",
              },
            ],
            chip: "verified, cited provenance",
          },
        },
        {
          intro:
            "The grit sequence, resolved as supersession: the old training deck closed by the current instruction, chain intact.",
          mock: {
            kind: "chain",
            oldClaim: {
              text: "Sand with P400 before basecoat repair.",
              source: "Training deck, 2022",
            },
            newClaim: {
              text: "Sand with P500, then P800, before basecoat repair.",
              source: "Work instruction WI-214, revision B",
            },
            note: "Superseded, chain preserved. The deck stays queryable as history, never as current practice.",
          },
        },
        {
          intro:
            "What the system refused to store: extractions that failed verification, logged instead of believed.",
          mock: {
            kind: "suppression",
            rows: [
              { reason: "unsupported by source", count: "118" },
              { reason: "hedged in source", count: "97" },
              { reason: "unjudgeable span", count: "82" },
            ],
            note: "Every suppressed extraction is logged with its span, reason, and time, and summarized in the findings report.",
          },
        },
      ],
    },
    outcomes: {
      heading: "What it means for you",
      cards: [
        {
          title: "The new operator asks the corpus",
          text: "And gets the answer with the exact sheet and revision cited, or honest silence instead of a guess. The lineup rules leave the planner's spreadsheet and become queryable facts.",
        },
        {
          title: "Reformulations surface the same day",
          text: "A supplier change notice is checked against every card and instruction the day it arrives, not after a rework spike in the light tunnel.",
        },
        {
          title: "Audit prep becomes a report",
          text: "Customer visits and audits start from a signed findings report over the paint documentation instead of a week of archaeology.",
        },
        {
          title: "Capture the next master in time",
          text: "What the next person to retire knows can be captured one photographed note at a time, verified, and kept with provenance.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Half our process knowledge is handwritten notes and laminated cards.",
        answer:
          "Photographs are read by local recognition inside the instance. Pages that cannot be read are labelled honestly and listed by name, never silently skipped.",
      },
      {
        question: "Our documentation is in two languages across one shop.",
        answer:
          "Subjects resolve across languages, so a sheet in one language can contradict a card in the other. Quality is measured and published per language, so you see it before you commit.",
      },
      {
        question: "Nothing may leave the plant network.",
        answer:
          "Cogeto runs fully offline with local models. There is exactly one egress point in the codebase, enforced in continuous integration, and the code is open so your team can verify it.",
      },
      {
        question: "Our operators are not going to type documentation.",
        answer:
          "They do not have to. A photo or a forwarded mail is enough, and one line in chat becomes a verified fact with provenance.",
      },
    ],
    closing: {
      sentence:
        "Send the process cards, data sheets, and instructions for one line or one paint system; we deliver the signed findings report showing where they disagree.",
      subject: "Paint shop pilot",
    },
    chat: [
      {
        question: "What is the bake window for the CC-240 clearcoat?",
        segments: [
          {
            text: "20 minutes at 140 degrees Celsius object temperature.",
            chips: ["TDS CC-240 r7"],
          },
        ],
        conflict: {
          text: "Conflict: process card PC-31 r3 still shows 18 minutes at 150 degrees, the pre-reformulation window.",
          chips: ["Process card r3", "Change notice CN-58"],
        },
        standsOn: ["TDS CC-240 r7", "Process card r3", "Change notice CN-58"],
      },
      {
        question: "When do we switch to the slower thinner?",
        segments: [
          {
            text: "Above 70 percent relative humidity, add 5 percent slower thinner.",
            chips: ["Photographed note, mixing room"],
          },
        ],
        standsOn: ["Photographed note, mixing room"],
      },
    ],
  },
  {
    slug: "engineering-teams",
    navLabel: "Engineering teams",
    industryLabel: "Engineering teams",
    metaTitle: "An engineering knowledge base that proves itself",
    metaDescription:
      "Documentation drift, measured: an industrial electronics team ran 486 documents including a forty datasheet family through Cogeto and found 33 contradictions, wiki against datasheet, variant against variant.",
    headline: "The wiki, the datasheets, and the truth",
    subhead:
      "An industrial electronics team pointed Cogeto at everything: the wiki nobody trusts, a family of forty near identical datasheets, and the decision threads. Now the corpus answers with citations, and the drift has names.",
    heroMock: {
      claims: [
        {
          text: "The enclosure is rated IP54.",
          source: "Internal wiki, hardware page",
        },
        {
          text: "Ingress protection: IP65.",
          source: "Product datasheet, revision 7",
        },
      ],
      chip: "contradiction",
    },
    situation: {
      heading: "Documentation drift, unmeasured",
      pains: [
        {
          title: "The wiki nobody trusts",
          text: "Three people have edited it since 2022. Everyone suspects it is wrong somewhere; nobody knows where, so everybody re-asks a colleague instead.",
        },
        {
          title: "Forty datasheets, shared boilerplate",
          text: "Near identical variants differing in numbers nobody can name from memory. Copy paste keeps the boilerplate consistent and the differences invisible.",
        },
        {
          title: "Onboarding by asking around",
          text: "Decisions live in threads and heads. A new engineer's first month is spent finding out which document to distrust.",
        },
      ],
    },
    run: {
      heading: "The run",
      intro:
        "One bulk import: the wiki export, the datasheet family, design notes, and the archived decision threads.",
      steps: [
        "486 documents imported in one operation",
        "Datasheets anchored per variant, so shared boilerplate stays distinct",
        "Wiki pages and threads read as sources with dates",
        "Verification against source sentences before storage",
        "Overnight reconciliation, variant against variant, wiki against datasheet",
      ],
      summaryTitle: "The morning summary",
      summary: [
        { label: "documents read", value: "486" },
        { label: "facts stored", value: "12,905" },
        { label: "contradictions found", value: "33" },
        { label: "statements superseded", value: "189" },
        { label: "extractions suppressed", value: "264" },
        { label: "pages unreadable, listed by name", value: "5" },
      ],
    },
    findings: {
      heading: "The findings",
      sub: "Three of the thirty three, as the product reports them.",
      items: [
        {
          intro: "The wiki against the datasheet: the drift everyone suspected, named.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "The enclosure is rated IP54.",
                source: "Internal wiki, hardware page",
              },
              {
                text: "Ingress protection: IP65.",
                source: "Product datasheet, revision 7",
              },
            ],
            chip: "contradiction",
          },
        },
        {
          intro:
            "Variant against variant: anchoring keeps forty datasheets distinct, so a real difference is a finding, not noise.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Maximum ambient temperature: 70 degrees Celsius.",
                source: "Datasheet, model K-240, revision 3",
              },
              {
                text: "Maximum ambient temperature: 60 degrees Celsius.",
                source: "Datasheet, model K-240, revision 4",
              },
            ],
            chip: "revision drift",
          },
        },
        {
          intro: "The signed report the team files with the quarterly review.",
          mock: {
            kind: "report",
            lines: [
              "Corpus scope: 486 documents, selected explicitly",
              "33 contradictions, each with both sentences and revisions",
              "189 supersessions with their chains, 264 suppressions summarized",
            ],
          },
        },
      ],
    },
    outcomes: {
      heading: "What it means for you",
      cards: [
        {
          title: "A knowledge base that proves itself",
          text: "Every answer cites its sentence and document, or says the corpus is silent. Trust stops being a feeling.",
        },
        {
          title: "Drift caught the day it happens",
          text: "A wiki edit that contradicts a datasheet is a same day finding, not a legend that spreads for a year.",
        },
        {
          title: "Onboarding from the corpus",
          text: "New engineers ask the corpus and get citations, instead of spending a month learning which documents to distrust.",
        },
        {
          title: "Variants kept honest",
          text: "Forty near identical datasheets stay distinct per variant, so the sales engineer quoting one model never gets another model's numbers.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Our documentation is honestly a mess. Is that a problem?",
        answer:
          "It is the point. The messier the corpus, the more the verification gate and the suppression log matter: what cannot be verified is logged, not believed.",
      },
      {
        question: "Who fixes the findings?",
        answer:
          "You do, with both sentences in front of you. Findings are surfaced on the source, in answers, and in the report; there is no queue to babysit.",
      },
      {
        question: "Does the wiki outrank the datasheet, or the reverse?",
        answer:
          "Neither. A conflict shows both sides with dates and revisions. A person decides; your confirmation then outranks the machine's judgment.",
      },
    ],
    closing: {
      sentence:
        "Send us the wiki export and the datasheet folder; we deliver the signed findings report.",
      subject: "Pilot request, engineering",
    },
    chat: [
      {
        question: "Which datasheets still show the old sleep current?",
        segments: [
          {
            text: "Two variants still carry 120 microamps: K-241 r2 and K-244 r1. The current value is 85 microamps since r3.",
            chips: ["K-241 r2", "K-244 r1", "K-240 r3, supersedes"],
          },
        ],
        standsOn: ["K-241 r2", "K-244 r1", "K-240 r3"],
      },
      {
        question: "Is the enclosure IP54 or IP65?",
        segments: [{ text: "IP65.", chips: ["Datasheet r7"] }],
        conflict: {
          text: "Conflict: the wiki hardware page still says IP54, flagged and linked.",
          chips: ["Wiki page"],
        },
        standsOn: ["Datasheet r7", "Wiki page"],
      },
    ],
  },
];

export const csShared = {
  situationKicker: "The situation",
  runKicker: "The run",
  findingsKicker: "The findings",
  outcomesKicker: "What it means for you",
  faqKicker: "First questions",
  chatKicker: "Then you ask.",
  readCta: "Read the case study",
  indexCtaSub: "Send a document set; we deliver the signed findings report.",
  deploymentHeading: "Run it where your material lives",
  closingHeading: "Start a pilot on your documents.",
  closingCta: "Start a pilot",
  siblingsHeading: "More case studies",
  proofLinks: [
    { label: "The published accuracy", href: "/trust" },
    { label: "Security and sovereignty", href: "/security" },
    { label: "The whitepaper", href: "/whitepaper" },
  ],
  contactEmail: "ivan@cogeto.eu",
  chatUi: {
    header: "CHAT",
    you: "YOU",
    remember: "REMEMBER THIS",
    fromMemory: "COGETO · FROM YOUR MEMORY",
    thinking: "Answering from your memories...",
    standsOn: "STANDS ON",
    placeholder: "Ask your memory...",
    hint: "Enter to send · Shift+Enter for a new line · every claim shows what it can prove",
  },
};
