import type { ComplianceContent } from "@/lib/compliance";
import type { ComplianceUi as EnglishComplianceUi } from "../en/compliance";
import complianceJson from "./compliance.json";

/**
 * English compliance page content. The section content itself comes from
 * lib/compliance-content.json, the single source shared with the PDF
 * generator (scripts/generate-compliance-pdf.mjs), so page and PDF cannot
 * drift. This module adds only the page chrome strings around it.
 * The downloadable PDF exists in English only; localized pages label it.
 */

export const complianceContent = complianceJson as ComplianceContent;

export type ComplianceUi = EnglishComplianceUi;

export const complianceUi: ComplianceUi = {
  metaTitle: "Conformité",
  metaDescription:
    "Comment Cogeto rend démontrable le volet technique de la conformité : hébergement UE isolé, chiffrement, suppression vérifiable et export ouvert.",
  ogDescription:
    "Où résident les données, comment elles sont isolées et protégées, comment fonctionnent suppression et export, et le lien avec la réglementation UE.",
  lastUpdatedLabel: "Dernière mise à jour :",
  downloadLabel: "Télécharger le PDF de synthèse",
  pdfLanguageNote: "PDF en anglais",
  organisationalBadge: "Organisationnel ou contractuel",
  honestLimitationLabel: "Limite explicitement reconnue.",
  schemaLinkLabel: "Lire le schéma publié du Memory Passport",
  trustLinkLabel: "Voir le score de précision en direct",
  whitepaperLabel: "Livre blanc",
  trustScoreLabel: "Score de précision",
  repoLabel: "Code source sur GitHub",
  backLabel: "Retour à cogeto.eu",
};
