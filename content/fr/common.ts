import type { CommonContent } from "../types";

/**
 * English common content: site metadata, navigation, footer.
 */
export const common: CommonContent = {
  site: {
    name: "Cogeto",
    domain: "cogeto.eu",
    url: "https://cogeto.eu",
    metaTitle: "Cogeto : mémoire vérifiée pour vos documents",
    description:
      "Cogeto lit vos documents, vérifie chaque fait par rapport à sa source, signale les contradictions entre vos documents et le prouve. Auto-hébergé ou hébergé dans l’UE, fonctionne entièrement hors ligne, open source.",
    email: "hi@cogeto.eu",
    github: "https://github.com/Cogeto/cogeto",
    companiesLine:
      "Cogeto est construit par MVT Solutions Group d.o.o. et MCTO Advisory d.o.o., Croatie, UE.",
  },

  nav: {
    groups: [
      {
        label: "Produit",
        links: [
          { label: "Constats de contradiction", href: "/product/contradiction-findings" },
          { label: "Mémoire vérifiée", href: "/product/verified-memory" },
          { label: "Rapport de constats", href: "/product/findings-report" },
          { label: "Comment ça marche", href: "/#how-it-works" },
        ],
      },
      {
        label: "Études de cas",
        links: [
          { label: "Toutes les études de cas", href: "/case-studies" },
          { label: "Dispositifs médicaux", href: "/case-studies/medical-devices" },
          { label: "Défense", href: "/case-studies/defense" },
          { label: "Peinture automobile", href: "/case-studies/automotive-paint" },
          { label: "Équipes d'ingénierie", href: "/case-studies/engineering-teams" },
        ],
      },
    ],
    links: [
      { label: "Sécurité", href: "/security" },
      { label: "Scores de précision", href: "/trust" },
      { label: "Docs", href: "/docs" },
    ],
    ctaLabel: "Lancer un pilote",
    ctaHref: "/get-started",
    languageAria: "Langue",
    homeAria: "Cogeto, retour à la page d'accueil",
    githubLabel: "GitHub",
    githubAria: "Code source de Cogeto sur GitHub",
    menuLabel: "Menu du site",
    openMenuLabel: "Ouvrir le menu",
    closeMenuLabel: "Fermer le menu",
    skipToContent: "Passer au contenu",
  },

  footer: {
    description:
      "Cogeto transforme vos documents en mémoire institutionnelle vérifiée et prouvable : la partie de l'IA qui reste la vôtre.",
    openSourceNote: "Open source sous AGPLv3. Construit en Croatie, UE.",
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
        heading: "Produit",
        links: [
          { label: "Constats de contradiction", href: "/product/contradiction-findings" },
          { label: "Mémoire vérifiée", href: "/product/verified-memory" },
          { label: "Rapport de constats", href: "/product/findings-report" },
          { label: "Études de cas", href: "/case-studies" },
          { label: "Livre blanc", href: "/whitepaper" },
          { label: "Lancer un pilote", href: "/get-started" },
        ],
      },
      {
        heading: "Ressources",
        links: [
          { label: "Docs", href: "/docs" },
          { label: "Scores de précision", href: "/trust" },
          { label: "Sécurité", href: "/security" },
          { label: "Conformité", href: "/compliance" },
          { label: "Open source", href: "/open-source" },
          { label: "GitHub", href: "https://github.com/Cogeto/cogeto", external: true },
        ],
      },
      {
        heading: "Informations légales",
        links: [
          { label: "Confidentialité", href: "/privacy" },
          { label: "Mentions légales", href: "/imprint" },
        ],
      },
    ],
    licenseLines: [
      "Cogeto est open source sous AGPLv3, avec une licence commerciale disponible.",
      "Le code de ce site Web est publié sous la licence MIT.",
    ],
  },

  notFound: {
    eyebrow: "404",
    title: "Cette page n'est pas dans le corpus",
    body: "L'adresse ne correspond à rien sur cogeto.eu. Un silence honnête vaut mieux qu'une supposition, voici donc les pages que les gens recherchent habituellement.",
    homeLabel: "Retour à la page d'accueil",
    links: [
      { label: "Constats de contradiction", href: "/product/contradiction-findings" },
      { label: "Scores de précision", href: "/trust" },
      { label: "Docs", href: "/docs" },
      { label: "Lancer un pilote", href: "/get-started" },
    ],
  },
};
