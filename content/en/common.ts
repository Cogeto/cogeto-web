import type { CommonContent } from "../types";

/**
 * English common content: site metadata, navigation, footer.
 */
export const common: CommonContent = {
  site: {
    name: "Cogeto",
    domain: "cogeto.eu",
    url: "https://cogeto.eu",
    metaTitle: "Cogeto: verified institutional memory for your documents",
    description:
      "Cogeto reads your documents, verifies every fact against its source, reports where your documents contradict each other, and proves it. Self hosted or EU hosted, works fully offline, open source.",
    email: "hi@cogeto.eu",
    github: "https://github.com/Cogeto/cogeto",
    companiesLine:
      "Cogeto is built by MVT Solutions Group d.o.o. and MCTO Advisory d.o.o., Croatia, EU.",
  },

  nav: {
    groups: [
      {
        label: "Product",
        links: [
          { label: "Contradiction findings", href: "/product/contradiction-findings" },
          { label: "Verified memory", href: "/product/verified-memory" },
          { label: "Findings report", href: "/product/findings-report" },
          { label: "How it works", href: "/#how-it-works" },
        ],
      },
      {
        label: "Case Studies",
        links: [
          { label: "All case studies", href: "/case-studies" },
          { label: "Medical devices", href: "/case-studies/medical-devices" },
          { label: "Defense", href: "/case-studies/defense" },
          { label: "Automotive paint", href: "/case-studies/automotive-paint" },
          { label: "Engineering teams", href: "/case-studies/engineering-teams" },
        ],
      },
    ],
    links: [
      { label: "Security", href: "/security" },
      { label: "Trust scores", href: "/trust" },
      { label: "Docs", href: "/docs" },
    ],
    ctaLabel: "Start a pilot",
    ctaHref: "/get-started",
    languageAria: "Language",
    homeAria: "Cogeto, back to the homepage",
    githubLabel: "GitHub",
    githubAria: "Cogeto source code on GitHub",
    menuLabel: "Site menu",
    openMenuLabel: "Open menu",
    closeMenuLabel: "Close menu",
    skipToContent: "Skip to content",
  },

  footer: {
    description:
      "Cogeto turns your documents into verified, provable institutional memory: the part of AI that stays yours.",
    openSourceNote: "Open source under AGPLv3. Built in Croatia, EU.",
    companies: [
      {
        name: "MVT Solutions Group d.o.o.",
        linkedin: "https://www.linkedin.com/company/mvt-solutions-group",
      },
      {
        name: "MCTO Advisory d.o.o.",
        linkedin: "https://www.linkedin.com/company/mcto-advisory-the-mr-cto",
      },
    ],
    columns: [
      {
        heading: "Product",
        links: [
          { label: "Contradiction findings", href: "/product/contradiction-findings" },
          { label: "Verified memory", href: "/product/verified-memory" },
          { label: "Findings report", href: "/product/findings-report" },
          { label: "Case studies", href: "/case-studies" },
          { label: "Whitepaper", href: "/whitepaper" },
          { label: "Get started", href: "/get-started" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Docs", href: "/docs" },
          { label: "Trust scores", href: "/trust" },
          { label: "Security", href: "/security" },
          { label: "Compliance", href: "/compliance" },
          { label: "Open source", href: "/open-source" },
          { label: "GitHub", href: "https://github.com/Cogeto/cogeto", external: true },
        ],
      },
      {
        heading: "Legal",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Imprint", href: "/imprint" },
        ],
      },
    ],
    licenseLines: [
      "Cogeto is open source under AGPLv3, with a commercial license available.",
      "This website's code is released under the MIT License.",
    ],
  },

  notFound: {
    eyebrow: "404",
    title: "This page is not in the corpus",
    body: "The address does not match anything on cogeto.eu. Honest silence beats a guess, so here are the pages people usually want.",
    homeLabel: "Back to the homepage",
    links: [
      { label: "Contradiction findings", href: "/product/contradiction-findings" },
      { label: "Trust scores", href: "/trust" },
      { label: "Docs", href: "/docs" },
      { label: "Start a pilot", href: "/get-started" },
    ],
  },
};
