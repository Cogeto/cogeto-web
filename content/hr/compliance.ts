import type { ComplianceContent } from "@/lib/compliance";
import type { ComplianceUi } from "../en/compliance";
import complianceJson from "./compliance.json";

/**
 * Croatian compliance page. content/hr/compliance.json is a full
 * translation of lib/compliance-content.json with identical structure;
 * ids, links, and the sample receipt values stay verbatim. The
 * downloadable one-pager PDF stays English, so the download button
 * carries a language note.
 */

export const complianceContent = complianceJson as ComplianceContent;

export const complianceUi: ComplianceUi = {
  metaTitle: "Usklađenost",
  metaDescription:
    "Kako Cogeto tehničku stranu usklađenosti čini dokazivom: jednokorisnički hosting u EU, izolacija, enkripcija, dokazivo brisanje, otvoreni izvoz podataka te mapiranje GDPR-a i Akta o umjetnoj inteligenciji.",
  ogDescription:
    "Gdje podaci žive, kako su izolirani i zaštićeni, kako rade brisanje i izvoz te kako se dizajn preslikava na propise EU.",
  lastUpdatedLabel: "Posljednje ažuriranje:",
  downloadLabel: "Preuzmite PDF sažetak",
  pdfLanguageNote: "PDF na engleskom",
  organisationalBadge: "Organizacijski ili ugovorno",
  honestLimitationLabel: "Iskreno ograničenje.",
  schemaLinkLabel: "Pročitajte objavljenu shemu Memory Passporta",
  trustLinkLabel: "Pogledajte aktualne rezultate točnosti",
  whitepaperLabel: "Pregledni članak",
  trustScoreLabel: "Rezultati točnosti",
  repoLabel: "Izvorni kod na GitHubu",
  backLabel: "Natrag na cogeto.eu",
};
