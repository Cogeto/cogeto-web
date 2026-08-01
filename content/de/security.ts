/**
 * German copy for /security. Mirrors content/en/security.ts: same
 * interface, same exported symbols, only string values translated.
 */

export interface SecurityContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    lede: string;
    secondary: { label: string; href: string };
  };
  badgesHeading: string;
  /** Link labels on badge cards: external evidence and internal detail. */
  badgeUi: { evidenceLabel: string; detailsLabel: string };
  badges: {
    icon: "award" | "shield" | "signature" | "check";
    name: string;
    text: string;
    href?: string;
    external?: boolean;
  }[];
  highlightsHeading: string;
  highlights: { title: string; text: string }[];
  clustersHeading: string;
  clustersSub: string;
  clusters: { title: string; bullets: string[] }[];
  audit: {
    heading: string;
    text: string;
    links: { label: string; href: string; external?: boolean }[];
  };
  company: { heading: string; text: string };
  artifactsHeading: string;
  artifacts: { label: string; href: string; external?: boolean }[];
  cta: { heading: string; sub: string; secondary: { label: string; href: string; external?: boolean } };
}

export const security: SecurityContent = {
  metaTitle: "Sicherheit und Souveränität",
  metaDescription:
    "Single-Tenant-Isolation, EU-Hosting oder voll offline, signierte Löschquittungen, veröffentlichtes Sicherheitsaudit, ISO 9001 und ISO 27001 zertifiziert.",
  hero: {
    eyebrow: "Sicherheit und Souveränität",
    headline: "Nichts zu glauben. Alles zu prüfen.",
    lede:
      "Jede Aussage auf dieser Seite ist ein Mechanismus im Open-Source-Release oder eine Zertifizierung des Unternehmens dahinter. Die Architektur ist öffentlich, das Audit ist veröffentlicht, und der Code lässt sich lesen, bevor auch nur ein Dokument irgendwohin geschickt wird.",
    secondary: {
      label: "Compliance-Onepager herunterladen",
      href: "/documents/cogeto-compliance-onepager.pdf",
    },
  },
  badgesHeading: "Zertifizierungen und Nachweise",
  badgeUi: { evidenceLabel: "Nachweis ansehen", detailsLabel: "Details" },
  badges: [
    {
      icon: "award",
      name: "ISO 9001",
      text: "Unternehmenszertifizierung der MVT Solutions Group, des Unternehmens, das Cogeto entwickelt und betreibt. Qualitätsmanagement, auditiert.",
    },
    {
      icon: "award",
      name: "ISO 27001",
      text: "Unternehmenszertifizierung der MVT Solutions Group. Informationssicherheits-Management, auditiert.",
    },
    {
      icon: "check",
      name: "Open Source, AGPLv3",
      text: "Die Engine ist öffentlich. Ihr Sicherheitsteam kann den Aufnahmepfad, die Zugriffsprüfungen und die Lösch-Saga Zeile für Zeile lesen.",
      href: "/open-source",
    },
    {
      icon: "shield",
      name: "Veröffentlichtes Sicherheitsaudit",
      text: "Das 2.0-Audit, abgeschlossen über fünf Behebungswellen, samt unabhängiger Verifikation, vollständig im Repository veröffentlicht.",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
      external: true,
    },
    {
      icon: "signature",
      name: "Signierte Releases",
      text: "Produktionsinstanzen beziehen vorgebaute Images, signiert von der Release-Pipeline. Das Operator-Skript prüft die Signaturen selbst, und jedes Release trägt seine Software-Stückliste.",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
      external: true,
    },
    {
      icon: "check",
      name: "DSGVO- und AI-Act-Zuordnung",
      text: "Löschung mit signierten Quittungen, eingebauter Datenschutz als Architektur und eine Transparenzhaltung, die ihre Arbeit offenlegt. Aussage für Aussage zugeordnet auf der Compliance-Seite.",
      href: "/compliance",
    },
  ],
  highlightsHeading: "Das Sicherheitsdesign in sechs Mechanismen",
  highlights: [
    {
      title: "Eine Instanz pro Kunde",
      text: "Keine gemeinsame Datenbank, keine Mandantenspalte, kein mandantenübergreifender Abfragepfad. Isolation ist eine Deployment-Grenze, kein Filter.",
    },
    {
      title: "Offline heißt offline",
      text: "Modelle, Embeddings, Seitenerkennung und Suche laufen in der Instanz. Genau eine Austrittsstelle, in der CI erzwungen. Keine Telemetrie.",
    },
    {
      title: "Pseudonymisierung nach dem Fail-closed-Prinzip",
      text: "Sensible Entitäten werden lokal pseudonymisiert, bevor ein externes Modell aufgerufen wird. Kann die Pseudonymisierung nicht laufen, findet der Aufruf nicht statt.",
    },
    {
      title: "Löschung, die Sie belegen können",
      text: "Die Löschung läuft als Saga über alle drei Speicher und endet in einer signierten, hash-verketteten Quittung, jede Nacht neu geprüft.",
    },
    {
      title: "Ein Audit-Log, das sich nicht bearbeiten lässt",
      text: "Append-only, erzwungen durch einen Datenbank-Trigger, geschrieben in derselben Transaktion wie die Aktion, für Lese- wie Schreibzugriffe.",
    },
    {
      title: "Der Ausstieg wird unterstützt",
      text: "Der Memory Passport exportiert alles, signiert, in einem offenen, dokumentierten Format, das sich außerhalb von Cogeto verifizieren lässt.",
    },
  ],
  clustersHeading: "Kontrollen, in Fragebogenform",
  clustersSub:
    "Mit dem Verb voran, damit Ihr Prüfer sie direkt in den Lieferantenfragebogen übernehmen kann.",
  clusters: [
    {
      title: "Isolation und Zugriff",
      bullets: [
        "Betreibt ein Deployment pro Kunde; ein Multi-Tenant-Modus existiert nicht",
        "Erzwingt Zugriff innerhalb der Abfrage, in beiden Speichern, nie auf bereits geladenen Ergebnissen",
        "Vergibt Berechtigungsbereiche deterministisch; leitet Berechtigungen nie aus Inhalten ab",
        "Verschlüsselt Originale im Ruhezustand unter mandantengebundenen Schlüsseln; liefert sie nur über kurzlebige signierte URLs aus",
      ],
    },
    {
      title: "Modellverkehr und Souveränität",
      bullets: [
        "Führt jeden Modellaufruf durch eine einzige Gateway-Stelle, in der CI erzwungen",
        "Nutzt standardmäßig einen europäischen Anbieter; unterstützt vollständig lokale Modelle",
        "Pseudonymisiert Namen, Organisationen und Beträge vor jedem externen Aufruf, Embeddings eingeschlossen",
        "Verwendet niemals Kundeninhalte für Training",
      ],
    },
    {
      title: "Nachweis und Integrität",
      bullets: [
        "Signiert Löschquittungen und verkettet sie per Hash mit ihren Vorgängern",
        "Prüft jede Nacht auf verwaiste Einträge und Manipulation; meldet und repariert nie",
        "Protokolliert jede Zustandsänderung in einem Append-only-Audit-Log",
        "Veröffentlicht die gemessene Genauigkeit je Release, je Sprache, je Modellkonfiguration",
      ],
    },
  ],
  audit: {
    heading: "Auditiert, und das Audit ist öffentlich",
    text: "Das 2.0-Sicherheitsaudit ist über fünf Behebungswellen abgeschlossen: jeder Befund behoben oder bewusst akzeptiert, mit schriftlicher Begründung. Audit und unabhängige Verifikation sind beide im Repository veröffentlicht und vollständig lesbar. Das ist der Maßstab, an dem sich diese Seite selbst misst: keine Aussage ohne Artefakt.",
    links: [
      {
        label: "Audit lesen",
        href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
        external: true,
      },
      {
        label: "Sicherheitsdokumentation",
        href: "https://github.com/Cogeto/cogeto/tree/main/docs/security",
        external: true,
      },
      {
        label: "Schwachstelle melden",
        href: "https://github.com/Cogeto/cogeto/blob/main/SECURITY.md",
        external: true,
      },
    ],
  },
  company: {
    heading: "Das Unternehmen dahinter",
    text: "Cogeto wird von MVT Solutions Group d.o.o. und MCTO Advisory d.o.o. entwickelt, zwei Unternehmen mit Sitz in Kroatien in der Europäischen Union, gegründet und geführt von Ivan Golubic. MVT Solutions Group ist nach ISO 9001 und ISO 27001 zertifiziert; Qualitäts- und Informationssicherheits-Management des Produkts stehen damit auf auditierten Unternehmensprozessen, nicht nur auf Code.",
  },
  artifactsHeading: "Nehmen Sie die Artefakte mit",
  artifacts: [
    {
      label: "Compliance-Onepager (PDF)",
      href: "/documents/cogeto-compliance-onepager.pdf",
    },
    { label: "Die vollständige Compliance-Zuordnung", href: "/compliance" },
    { label: "Veröffentlichte Genauigkeitswerte", href: "/trust" },
    {
      label: "Memory-Passport-Schema",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/passport-schema",
      external: true,
    },
  ],
  cta: {
    heading: "Bringen Sie Ihr Sicherheitsteam mit ins Pilotprojekt.",
    sub: "Anforderungen an Datenresidenz, Air Gaps und Sicherheitsprüfungen sind hier normale Gespräche, keine Ausnahmen.",
    secondary: {
      label: "Audit lesen",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
      external: true,
    },
  },
};
