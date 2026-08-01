import type { CommonContent } from "../types";

/**
 * Croatian common content: site metadata, navigation, footer.
 * Mirrors content/en/common.ts; only string values are translated.
 */
export const common: CommonContent = {
  site: {
    name: "Cogeto",
    domain: "cogeto.eu",
    url: "https://cogeto.eu",
    metaTitle: "Cogeto: provjerena institucionalna memorija dokumenata",
    description:
      "Cogeto čita vaše dokumente, provjerava svaku činjenicu prema izvoru i javlja gdje si proturječe, uz dokaz. U vašoj infrastrukturi, u EU ili offline.",
    email: "hi@cogeto.eu",
    github: "https://github.com/Cogeto/cogeto",
    companiesLine:
      "Cogeto razvijaju MVT Solutions Group d.o.o. i MCTO Advisory d.o.o., Hrvatska, EU.",
  },

  nav: {
    groups: [
      {
        label: "Proizvod",
        links: [
          { label: "Nalazi proturječnosti", href: "/product/contradiction-findings" },
          { label: "Provjerena memorija", href: "/product/verified-memory" },
          { label: "Izvješće o nalazima", href: "/product/findings-report" },
          { label: "Kako radi", href: "/#how-it-works" },
        ],
      },
      {
        label: "Studije slučaja",
        links: [
          { label: "Sve studije slučaja", href: "/case-studies" },
          { label: "Medicinski proizvodi", href: "/case-studies/medical-devices" },
          { label: "Obrana", href: "/case-studies/defense" },
          { label: "Automobilsko lakiranje", href: "/case-studies/automotive-paint" },
          { label: "Inženjerski timovi", href: "/case-studies/engineering-teams" },
        ],
      },
    ],
    links: [
      { label: "Sigurnost", href: "/security" },
      { label: "Rezultati točnosti", href: "/trust" },
      { label: "Dokumentacija", href: "/docs" },
    ],
    ctaLabel: "Pokrenite pilot",
    ctaHref: "/get-started",
    languageAria: "Jezik",
    homeAria: "Cogeto, natrag na početnu stranicu",
    githubLabel: "GitHub",
    githubAria: "Izvorni kod Cogeta na GitHubu",
    menuLabel: "Izbornik",
    openMenuLabel: "Otvori izbornik",
    closeMenuLabel: "Zatvori izbornik",
    skipToContent: "Preskoči na sadržaj",
  },

  footer: {
    description:
      "Cogeto pretvara vaše dokumente u provjerenu, dokazivu institucionalnu memoriju: dio umjetne inteligencije koji ostaje vaš.",
    openSourceNote: "Otvoreni kod pod licencijom AGPLv3. Razvijeno u Hrvatskoj, EU.",
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
        heading: "Proizvod",
        links: [
          { label: "Nalazi proturječnosti", href: "/product/contradiction-findings" },
          { label: "Provjerena memorija", href: "/product/verified-memory" },
          { label: "Izvješće o nalazima", href: "/product/findings-report" },
          { label: "Studije slučaja", href: "/case-studies" },
          { label: "Pregledni članak", href: "/whitepaper" },
          { label: "Prvi koraci", href: "/get-started" },
        ],
      },
      {
        heading: "Resursi",
        links: [
          { label: "Dokumentacija", href: "/docs" },
          { label: "Rezultati točnosti", href: "/trust" },
          { label: "Sigurnost", href: "/security" },
          { label: "Usklađenost", href: "/compliance" },
          { label: "Otvoreni kod", href: "/open-source" },
          { label: "GitHub", href: "https://github.com/Cogeto/cogeto", external: true },
        ],
      },
      {
        heading: "Pravno",
        links: [
          { label: "Privatnost", href: "/privacy" },
          { label: "Impresum", href: "/imprint" },
        ],
      },
    ],
    licenseLines: [
      "Cogeto je otvoreni kod pod licencijom AGPLv3, uz dostupnu komercijalnu licenciju.",
      "Kod ovih web stranica objavljen je pod licencijom MIT.",
    ],
  },

  notFound: {
    eyebrow: "404",
    title: "Ova stranica nije u korpusu",
    body: "Adresa ne odgovara ničemu na cogeto.eu. Iskrena šutnja bolja je od nagađanja, pa evo stranica koje posjetitelji najčešće traže.",
    homeLabel: "Natrag na početnu stranicu",
    links: [
      { label: "Nalazi proturječnosti", href: "/product/contradiction-findings" },
      { label: "Rezultati točnosti", href: "/trust" },
      { label: "Dokumentacija", href: "/docs" },
      { label: "Pokrenite pilot", href: "/get-started" },
    ],
  },
};
