import type { CommonContent } from "../types";

/**
 * German common content: site metadata, navigation, footer.
 * Mirrors content/en/common.ts; only string values are translated.
 */
export const common: CommonContent = {
  site: {
    name: "Cogeto",
    domain: "cogeto.eu",
    url: "https://cogeto.eu",
    metaTitle: "Cogeto: verifiziertes Wissen aus Ihren Dokumenten",
    description:
      "Cogeto liest Ihre Dokumente, prüft jeden Fakt an der Quelle, meldet Widersprüche und belegt alles. EU-gehostet, selbst gehostet oder offline. Open Source.",
    email: "hi@cogeto.eu",
    github: "https://github.com/Cogeto/cogeto",
    companiesLine:
      "Cogeto wird von MVT Solutions Group d.o.o. und MCTO Advisory d.o.o. entwickelt, Kroatien, EU.",
  },

  nav: {
    groups: [
      {
        label: "Produkt",
        links: [
          { label: "Widerspruchsbefunde", href: "/product/contradiction-findings" },
          { label: "Verifiziertes Wissen", href: "/product/verified-memory" },
          { label: "Befundbericht", href: "/product/findings-report" },
          { label: "So funktioniert es", href: "/#how-it-works" },
        ],
      },
      {
        label: "Fallstudien",
        links: [
          { label: "Alle Fallstudien", href: "/case-studies" },
          { label: "Medizinprodukte", href: "/case-studies/medical-devices" },
          { label: "Verteidigung", href: "/case-studies/defense" },
          { label: "Fahrzeuglackierung", href: "/case-studies/automotive-paint" },
          { label: "Entwicklungsteams", href: "/case-studies/engineering-teams" },
        ],
      },
    ],
    links: [
      { label: "Sicherheit", href: "/security" },
      { label: "Genauigkeitswerte", href: "/trust" },
      { label: "Dokumentation", href: "/docs" },
    ],
    ctaLabel: "Pilot starten",
    ctaHref: "/get-started",
    languageAria: "Sprache",
    homeAria: "Cogeto, zurück zur Startseite",
    githubLabel: "GitHub",
    githubAria: "Cogeto-Quellcode auf GitHub",
    menuLabel: "Seitenmenü",
    openMenuLabel: "Menü öffnen",
    closeMenuLabel: "Menü schließen",
    skipToContent: "Zum Inhalt springen",
  },

  footer: {
    description:
      "Cogeto macht aus Ihren Dokumenten verifiziertes, belegbares institutionelles Wissen: der Teil der KI, der bei Ihnen bleibt.",
    openSourceNote: "Open Source unter AGPLv3. Entwickelt in Kroatien, EU.",
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
        heading: "Produkt",
        links: [
          { label: "Widerspruchsbefunde", href: "/product/contradiction-findings" },
          { label: "Verifiziertes Wissen", href: "/product/verified-memory" },
          { label: "Befundbericht", href: "/product/findings-report" },
          { label: "Fallstudien", href: "/case-studies" },
          { label: "Whitepaper", href: "/whitepaper" },
          { label: "Erste Schritte", href: "/get-started" },
        ],
      },
      {
        heading: "Ressourcen",
        links: [
          { label: "Dokumentation", href: "/docs" },
          { label: "Genauigkeitswerte", href: "/trust" },
          { label: "Sicherheit", href: "/security" },
          { label: "Compliance", href: "/compliance" },
          { label: "Open Source", href: "/open-source" },
          { label: "GitHub", href: "https://github.com/Cogeto/cogeto", external: true },
        ],
      },
      {
        heading: "Rechtliches",
        links: [
          { label: "Datenschutz", href: "/privacy" },
          { label: "Impressum", href: "/imprint" },
        ],
      },
    ],
    licenseLines: [
      "Cogeto ist Open Source unter AGPLv3, eine kommerzielle Lizenz ist verfügbar.",
      "Der Code dieser Website steht unter der MIT-Lizenz.",
    ],
  },

  notFound: {
    eyebrow: "404",
    title: "Diese Seite ist nicht im Korpus",
    body: "Die Adresse passt zu nichts auf cogeto.eu. Ehrliches Schweigen ist besser als Raten, deshalb hier die Seiten, die meist gesucht werden.",
    homeLabel: "Zurück zur Startseite",
    links: [
      { label: "Widerspruchsbefunde", href: "/product/contradiction-findings" },
      { label: "Genauigkeitswerte", href: "/trust" },
      { label: "Dokumentation", href: "/docs" },
      { label: "Pilot starten", href: "/get-started" },
    ],
  },
};
