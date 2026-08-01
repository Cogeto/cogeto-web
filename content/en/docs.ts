/**
 * against the product repo: docs/running-locally.md for the quickstart,
 * docs/deployment.md for production self hosting, and
 * docs/cogeto-technical-architecture.md section 10 for offline operation.
 * Instructions are re-verified against each release; current line v1.4.0.
 * quickstarts end at a verified first success, air gap is a first class
 * path, troubleshooting is enumerated centrally.
 */

export interface DocStep {
  title: string;
  text: string;
  command?: string;
  /** A "you should now see" callout: the verified first-success moment. */
  expect?: string;
}

export interface DocsPathCard {
  name: string;
  forWhom: string;
  time: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
}

export const docsIndex = {
  metaTitle: "Documentation",
  metaDescription:
    "Three ways to run Cogeto: a local quickstart with one command, production self hosting with signed images and one operator script, and fully offline inside a closed network. Hosted instances start with a conversation.",
  eyebrow: "Docs",
  headline: "Run it in the way your environment allows",
  lede:
    "Everything on this site runs from the open source release. Pick the path that matches where your documents are allowed to live. The repository documentation is the operator's authority; these pages are verified against it for every release.",
  paths: [
    {
      name: "Quickstart, on your machine",
      forWhom: "For evaluating: one command on a fresh clone reaches a usable login.",
      time: "Minutes on any recent machine",
      bullets: [
        "docker compose up, zero configuration",
        "Runs without a model key; model calls fail honestly instead of pretending",
        "A seeded demo sandbox to explore",
      ],
      href: "/docs/quickstart",
      ctaLabel: "Start the quickstart",
    },
    {
      name: "Self hosted, in production",
      forWhom: "For running a real instance on your own infrastructure.",
      time: "One operator script on a fresh Ubuntu server",
      bullets: [
        "Pull only: three release images, each cosign signed",
        "The script verifies signatures itself and ends with a checklist",
        "Automatic TLS once your DNS records resolve",
      ],
      href: "/docs/self-hosted",
      ctaLabel: "Install in production",
    },
    {
      name: "Fully offline",
      forWhom: "For closed networks where nothing may leave, including image pulls.",
      time: "Air gapped, no outbound connectivity",
      bullets: [
        "Models, embeddings, page recognition, and search run inside the instance",
        "One model egress seam, enforced in continuous integration",
        "Offline image bundle for air gapped installs",
      ],
      href: "/docs/offline",
      ctaLabel: "Plan an offline install",
    },
  ] as DocsPathCard[],
  hostedNote:
    "Prefer not to operate it at all? A hosted instance on EU infrastructure has no install procedure by design: it starts with the pilot conversation.",
  hostedCta: { label: "Start a pilot", href: "/get-started" },
  authorityNote:
    "The repository documentation remains the operator's authority, including the full runbook for customer instances.",
  authorityLinks: [
    {
      label: "docs/ in the repository",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs",
    },
    {
      label: "Running locally",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/running-locally.md",
    },
    {
      label: "Deployment",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
    },
  ],
};

export const docsQuickstart = {
  metaTitle: "Quickstart",
  metaDescription:
    "One command on a fresh clone reaches a usable login: git clone, docker compose up, open https://localhost. Runs without a model key; model features fail with a typed error instead of pretending.",
  eyebrow: "Docs · Quickstart",
  headline: "One command to a usable login",
  lede:
    "The standing contract of the repository: docker compose up on a fresh clone reaches a usable login with zero configuration. Everything below is detail around that one command.",
  prerequisites: {
    heading: "Before you start",
    items: [
      "Docker Engine with the compose plugin. Docker Desktop is fine. The stack builds locally on first run; any recent machine with about 8 GB of free RAM is comfortable.",
      "Optional: a Mistral API key for model features. Without it the stack still runs: login, capture, dashboard, and queue all work, and model calls fail with a typed error instead of pretending.",
      "Node 22 and npm only if you develop. Not needed to run the stack.",
    ],
  },
  steps: [
    {
      title: "Clone and start",
      text: "First run builds the images and initializes identity, which takes a minute or two.",
      command:
        "git clone https://github.com/Cogeto/cogeto.git\ncd cogeto\ndocker compose up",
    },
    {
      title: "Open it and sign in",
      text: "The dev edge serves a self signed certificate from a local certificate authority, so your browser will warn once. Accept it.",
      expect:
        "Open https://localhost and sign in as the dev bootstrap admin: admin@cogeto.localhost with password DevPassword1! You are looking at your own instance.",
    },
    {
      title: "Add a model key",
      text: "Copy .env.example to .env, set your key, and bring the stack up again. Dev defaults are safe for localhost only; a preflight container refuses known dev secrets on any non localhost domain.",
      command: "cp .env.example .env\ndocker compose up -d",
    },
  ] as DocStep[],
  demo: {
    heading: "The Ana sandbox",
    text: "A fictional consultant with weeks of accrued memory, seeded through the real public API: contradictions to resolve, lapsed facts, a signed deletion receipt. The access password is printed by the seed job. Never run the demo profile on an instance holding real data.",
    command: "COGETO_DEMO_MODE=1 docker compose --profile demo up --build",
    logCommand: "docker compose logs demo-seed",
  },
  troubleshooting: {
    heading: "If something looks wrong",
    items: [
      {
        q: "Port 80 or 443 is already taken",
        a: "Another web server is running. Stop it, or change the published ports in a compose override.",
      },
      {
        q: "Chat or extraction returns a model gateway error",
        a: "No model API key is set. That is the designed behavior without a key, not a crash.",
      },
      {
        q: "A one shot init container shows exited (0)",
        a: "Normal. Preflight, database init, migrations, storage init, and identity init run once per up and exit.",
      },
      {
        q: "Starting over",
        a: "docker compose down -v deletes all data, including the instance signing key and receipts. Fine on a dev box; never the answer on a real instance.",
      },
    ],
  },
  warn: "docker compose down -v deletes everything, including the instance signing key and the receipt chain. On a real instance the answer is always the rehearsed backup restore, never a wipe.",
  next: {
    heading: "Where to go from here",
    text: "When the evaluation convinces you, production is a different, safer path: signed images and one operator script.",
    links: [
      { label: "Self hosted, in production", href: "/docs/self-hosted" },
      {
        label: "Running locally, the full reference",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/running-locally.md",
        external: true,
      },
    ],
  },
  cta: {
    heading: "Rather see it on your documents first?",
    sub: "The pilot reads a real document set of yours and ends with the signed findings report.",
    secondary: { label: "Back to all paths", href: "/docs" },
  },
};

export const docsSelfHosted = {
  metaTitle: "Self hosted installation",
  metaDescription:
    "Production Cogeto is pull only: three cosign signed release images and one operator script that verifies signatures itself, installs, upgrades, and ends every run with an instance specific checklist.",
  eyebrow: "Docs · Self hosted",
  headline: "One script, signed images, no surprises",
  lede:
    "A production instance never builds from source. It pulls three prebuilt images per release, each signed by the release pipeline, orchestrated by one operator script that verifies the signatures itself.",
  model: {
    heading: "The deployment model",
    items: [
      "One instance is one customer. Isolation is a deployment boundary; there is no multi tenant mode.",
      "Pull only: the app and worker image, the edge image with the built interface, and the receive only inbound mail service, each cosign signed.",
      "Secrets are generated per instance and required by the compose file; nothing is committed.",
      "Everything is orchestrated by one operator script: install, configure, upgrade, status, and a dry run mode. It ends every run with a checklist of what it cannot do for you: DNS records, backup settings, verification steps.",
    ],
  },
  prerequisites: {
    heading: "Before you start",
    items: [
      "A fresh Ubuntu 22.04 or 24.04 instance.",
      "A domain you control; TLS is automatic through Let's Encrypt as soon as the printed DNS records resolve.",
      "A model API key, unless the instance will run local models only.",
    ],
  },
  steps: [
    {
      title: "Fetch the operator script",
      text: "The script installs its own tooling, including cosign for signature verification.",
      command:
        "curl -fsSL https://raw.githubusercontent.com/Cogeto/cogeto/main/scripts/operator/cogeto -o cogeto\nchmod +x cogeto",
    },
    {
      title: "Dry run first",
      text: "The check mode validates the environment and prints what install would do, without changing anything.",
      command: "sudo ./cogeto install --check --domain <your.domain> --acme-email <you>",
    },
    {
      title: "Install",
      text: "The script pulls the release images, verifies their signatures, generates secrets, and brings the instance up.",
      command:
        "sudo ./cogeto install --domain <your.domain> --acme-email <you> --mistral-key <key>",
      expect:
        "The run ends with an instance specific checklist: the DNS records to create, backup settings to confirm, and the verification steps. TLS activates as soon as the DNS records resolve.",
    },
    {
      title: "Verify a release image yourself, any time",
      text: "Signing is keyless through the public transparency log, so verification needs no key from us. Each GitHub release also carries the image's software bill of materials and the exact verify command.",
      command:
        "cosign verify cogeto/cogeto:<version> \\\n  --certificate-identity-regexp '^https://github.com/Cogeto/cogeto/\\.github/workflows/release\\.yml@refs/tags/' \\\n  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com'",
    },
  ] as DocStep[],
  upgrades: {
    heading: "Upgrades and rollback",
    text: "Re-download the script first: the installed copy cannot update itself, and only the new script backfills any credential a newer compose requires. The script refuses unpublished tags, re-runs migrations, health checks the instance, and detects when a release changed the embedding model, offering the reindex. Rollback rolls images back; migrations are forward only, and full data rollback is the runbook's rehearsed backup restore.",
    command:
      "curl -fsSL https://raw.githubusercontent.com/Cogeto/cogeto/main/scripts/operator/cogeto -o cogeto\nchmod +x cogeto\nsudo ./cogeto upgrade",
  },
  notThis: {
    heading: "What deployment is not, deliberately",
    text: "No Terraform, no cloud API automation, no self serve provisioning, no automatic updates: one good script run by a human, for a cohort where every instance matters. Backups use the hosting provider's own capability, and restore is rehearsed, not assumed. The operator runbook covers provisioning, DNS, onboarding, backups with a rehearsed restore, upgrades, and troubleshooting, checklist by checklist.",
    links: [
      {
        label: "The operator runbook",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/operator-runbook.md",
        external: true,
      },
      {
        label: "Deployment reference",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
        external: true,
      },
    ],
  },
  cta: {
    heading: "Want it operated for you instead?",
    sub: "A hosted instance on EU infrastructure starts with the pilot conversation, not a signup form.",
    secondary: { label: "Fully offline installation", href: "/docs/offline" },
  },
};

export const docsOffline = {
  metaTitle: "Fully offline installation",
  metaDescription:
    "Cogeto runs inside a closed network with no outbound connectivity: local models, local embeddings, page recognition on CPU, self hosted search, no telemetry, and an offline image bundle for air gapped installs.",
  eyebrow: "Docs · Offline",
  headline: "Offline that is verifiable, not asserted",
  lede:
    "Cogeto runs fully inside a customer network with no outbound connectivity at all. This is a supported first class deployment, not a degraded mode, and the architecture makes it checkable.",
  what: {
    heading: "What runs inside the boundary",
    items: [
      "Language models and embeddings run in a local runtime on your hardware; a vision model in the same runtime reads scans that character recognition cannot handle.",
      "Page recognition runs on CPU inside the instance, with English and Croatian language packs.",
      "Web style search for the research path is self hosted inside the instance.",
      "Storage, identity, and the queue are the same stack as every other deployment. There is no telemetry.",
    ],
  },
  seam: {
    heading: "Why you can verify it",
    text: "Every model call passes through a single egress seam, enforced in continuous integration: there is exactly one place in the codebase where a call could leave the instance, and in the offline configuration it points at the local runtime. The code is open source, so your security team can confirm this rather than trust it.",
    links: [
      {
        label: "The architecture, section on offline operation",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/cogeto-technical-architecture.md",
        external: true,
      },
      { label: "Security and sovereignty", href: "/security" },
    ],
  },
  bundle: {
    heading: "Air gapped installs",
    text: "For environments where even image pulls are unavailable, the instance ships as an offline image bundle, so installation happens from media you carry across the boundary. Offline deployments are planned together in the pilot conversation: sizing for the local model runtime, the bundle handover, and the update procedure for your environment.",
  },
  quality: {
    heading: "Know the measured quality before you commit",
    text: "Local and hosted model configurations are measured separately, and every configuration's scores are published per release. The administration page shows the measured quality of the configuration you run and flags untested combinations.",
    links: [{ label: "The published trust scores", href: "/trust" }],
  },
  cta: {
    heading: "Plan the offline install with us.",
    sub: "Air gaps are a normal conversation here. The pilot can run entirely inside your network.",
    secondary: { label: "Self hosted, in production", href: "/docs/self-hosted" },
  },
};

/** Small interface chrome shared by the docs pages. */
export const docsUi = {
  copyLabel: "Copy command",
  copiedLabel: "Copied",
};
