import type { ComplianceContent } from "@/lib/compliance";
import type { ComplianceUi } from "../en/compliance";
import complianceJson from "./compliance.json";

/**
 * German compliance page. content/de/compliance.json is a full
 * translation of lib/compliance-content.json with identical structure;
 * ids, links, and the sample receipt values stay verbatim. The
 * downloadable one-pager PDF stays English, so the download button
 * carries a language note.
 */

export const complianceContent = complianceJson as ComplianceContent;

export const complianceUi: ComplianceUi = {
  metaTitle: "Compliance",
  metaDescription:
    "Wie Cogeto die technische Seite der Compliance belegbar macht: Single-Tenant-Hosting in der EU, Isolation, Verschlüsselung, belegbare Löschung, offener Datenexport sowie DSGVO- und AI-Act-Zuordnung.",
  ogDescription:
    "Wo Daten liegen, wie sie isoliert und geschützt sind, wie Löschung und Export funktionieren und wie sich das Design der EU-Regulierung zuordnen lässt.",
  lastUpdatedLabel: "Zuletzt aktualisiert:",
  downloadLabel: "Einseiter als PDF herunterladen",
  pdfLanguageNote: "PDF auf Englisch",
  organisationalBadge: "Organisatorisch oder vertraglich",
  honestLimitationLabel: "Ehrliche Einschränkung.",
  schemaLinkLabel: "Das veröffentlichte Memory-Passport-Schema lesen",
  trustLinkLabel: "Die aktuellen Genauigkeitswerte ansehen",
  whitepaperLabel: "Whitepaper",
  trustScoreLabel: "Genauigkeitswerte",
  repoLabel: "Quellcode auf GitHub",
  backLabel: "Zurück zu cogeto.eu",
};
