/**
 * German copy for /trust. Mirrors content/en/trust.ts: same interface,
 * same exported symbols, only string values translated.
 */

export interface TrustContent {
  eyebrow: string;
  title: string;
  thesis: string;
  currentHeading: string;
  currentIntro: string;
  configLabel: string;
  languageLabel: string;
  languageNames: Record<string, string>;
  aggregateNote: string;
  gatesNote: string;
  trendsHeading: string;
  trendsIntro: string;
  chatHeading: string;
  chatIntro: string;
  provenanceHeading: string;
  provenanceIntro: string;
  gateLabel: string;
  backfilledLabel: string;
  backfilledNote: string;
  metrics: Record<string, { label: string; explainer: string }>;
  pairsLabel: string;
  notAvailable: string;
  checkFileCta: string;
  goldenCorpusCta: string;
  schemaCta: string;
  backHome: string;
  /** Chip prefix before the current release version number. */
  currentReleaseLabel: string;
  complianceLinkLabel: string;
  sourceLinkLabel: string;
  /** Button on the fallback page linking to the published data files. */
  dataCta: string;
  /** Stat-band label for the golden-case count on the product pages. */
  goldenCasesStatLabel: string;
  unavailableTitle: string;
  unavailableBody: string;
}

export const trust: TrustContent = {
  eyebrow: "Genauigkeitswerte",
  title: "Die gemessene Genauigkeit von Cogeto, je Release",
  thesis:
    "Cogeto veröffentlicht für jedes Release die eigene gemessene Genauigkeit, so wie ein Dienst seine Verfügbarkeit veröffentlicht, einschließlich der Zahlen, die ihre Zielwerte verfehlen. Hier sind die Zahlen, und hier sind die öffentlichen Datendateien dahinter. Vertrauen Sie nicht diesem Diagramm: Prüfen Sie die Datei.",
  currentHeading: "Aktuelle Werte",
  currentIntro:
    "Extraktions- und Abgleichqualität für die gewählte Modellkonfiguration und Sprache, gemessen an einem von Hand annotierten Goldstandard-Korpus.",
  configLabel: "Modellkonfiguration",
  languageLabel: "Sprache",
  languageNames: {
    en: "Englisch",
    hr: "Kroatisch",
    aggregate: "Gesamt",
  },
  aggregateNote:
    "Gesamt mischt die Korpora der einzelnen Sprachen. Es wird gezeigt, damit sich eine schwache Sprache nie in einem Durchschnitt verstecken kann: Stellen Sie den Wahlschalter um, um jede Sprache einzeln zu lesen.",
  gatesNote:
    "Jede Gate-Untergrenze liegt beim ehrlichen aktuellen Wert der Metrik, nie bei einem Ziel, das das Projekt noch nicht erreicht hat, und Untergrenzen werden nur angehoben, nie gesenkt. Sie gelten je Sprache wie auch im Gesamtwert, das hier gezeigte Gate ändert sich deshalb mit der gewählten Sprache.",
  trendsHeading: "Verläufe",
  trendsIntro:
    "Die zehn neuesten Releases ab der v1-Linie, vom ältesten zum neuesten, auf einer ehrlichen Achse von 0 bis 100 Prozent. Die vollständige Historie bleibt im Repository veröffentlicht. Die gestrichelte Linie ist das CI-Gate, das ein Release zum Ausliefern bestehen muss.",
  chatHeading: "Chat-Testsuite",
  chatIntro:
    "Frage-Antwort-Fälle von Ende zu Ende. Bestanden heißt: Die Antwort war in den richtigen Fakten aus dem Korpus verankert. Die IDs durchgefallener Fälle werden veröffentlicht, nicht versteckt.",
  provenanceHeading: "Provenienz",
  provenanceIntro:
    "Jedes Release mit dem exakten Commit, an dem gemessen wurde, der Version des Evaluations-Harness, den Korpusgrößen und einem direkten Link zu seiner unveränderlichen JSON-Datei. Veröffentlichte Dateien werden nach dem Release nie bearbeitet. Lesen Sie die Daten, nicht unsere Zusammenfassung.",
  gateLabel: "CI-Gate",
  backfilledLabel: "Nachgetragen",
  backfilledNote:
    "Aus aufgezeichneten Läufen übertragen statt zum Release-Zeitpunkt vom Harness erzeugt.",
  metrics: {
    extraction_precision: {
      label: "Extraktions-Precision",
      explainer:
        "Der Anteil der von Cogeto aus einer Quelle gezogenen Fakten, die korrekt waren. Hohe Precision heißt: Wenige erfundene oder falsche Fakten gelangen in die Wissensbasis. Das wiegt am schwersten, denn eine gespeicherte Unwahrheit ist von Dauer.",
    },
    extraction_recall: {
      label: "Extraktions-Recall",
      explainer:
        "Der Anteil der Fakten, die ein sorgfältiger Mensch aus einer Quelle ziehen würde und die Cogeto gefunden hat. Hoher Recall heißt: wenige übersehene Fakten, der Fehler, der Lesern am ehesten auffällt.",
    },
    verification_agreement: {
      label: "Verifikationsübereinstimmung",
      explainer:
        "Wie oft der unabhängige Verifikationsdurchgang mit dem menschlichen Urteil übereinstimmte, ob eine Quelle eine Aussage tatsächlich stützt. Die Zulassungsprüfung muss selbst verlässlich sein, bevor ihre Urteile darüber entscheiden, was in die aktive Wissensbasis gelangt.",
    },
    dedup_accuracy: {
      label: "Deduplizierungsgenauigkeit",
      explainer:
        "Wie gut der Abgleich doppelte Fakten zusammenführt, ohne zwei wirklich verschiedene Fakten zu verschmelzen. Falsche Zusammenführungen werden härter gewichtet als verpasste, denn eine falsche Zusammenführung zerstört einen eigenständigen Fakt.",
    },
    contradiction_precision: {
      label: "Widerspruchs-Precision",
      explainer:
        "Der Anteil der von Cogeto markierten Widersprüche, die echte Konflikte waren. Veröffentlicht ab Schema 1.1. Precision und Recall werden gemeinsam veröffentlicht, weil sich jede Größe allein austricksen lässt: Wer alles markiert, hat perfekten Recall, wer nichts markiert, perfekte Precision.",
    },
    contradiction_recall: {
      label: "Widerspruchs-Recall",
      explainer:
        "Der Anteil der echten Widersprüche zwischen Fakten, die Cogeto markiert hat. Die Erkennung verknüpft beide Aussagen mit beiden Quellsätzen und dem Datum, jede Markierung lässt sich also gegen ihre Belege prüfen.",
    },
    supersedes_accuracy: {
      label: "Ablösungsgenauigkeit",
      explainer:
        "Korrekte Ablösungsentscheidungen, Urteil wie Richtung, über die Paare, bei denen eine Ablösung zur Entscheidung stand. Die Zahl der Paare wird neben der Quote veröffentlicht, denn eine Quote über einen einzigen Fall sagt nichts, ob bestanden oder nicht.",
    },
    rewrite_accuracy: {
      label: "Genauigkeit des Query-Rewrite-Routings",
      explainer:
        "Der Anteil bestandener Fälle im Query-Rewrite-Routing: Intent-Routing, Auflösung von Pronomen und Ellipsen sowie zeitliche Einordnung. Dieser Schritt macht aus einer Frage die richtige Suche, seine Fehler zeigen sich als falsche oder fehlende Antworten.",
    },
  },
  pairsLabel: "Paare",
  notAvailable: "nicht gemessen",
  checkFileCta: "JSON-Datei öffnen",
  goldenCorpusCta: "Goldstandard-Korpus ansehen",
  schemaCta: "Datenschema lesen",
  backHome: "Zurück zu cogeto.eu",
  currentReleaseLabel: "Aktuelles Release",
  complianceLinkLabel: "Compliance-Onepager",
  sourceLinkLabel: "Quellcode auf GitHub",
  dataCta: "Lesen Sie die Daten auf GitHub",
  goldenCasesStatLabel: "von Hand annotierte Goldstandard-Fälle hinter den Zahlen",
  unavailableTitle: "Genauigkeitswerte werden aktualisiert",
  unavailableBody:
    "Die veröffentlichten Daten konnten gerade nicht gelesen werden. Diese Seite aktualisiert sich innerhalb einer Stunde aus dem Produkt-Repository. Schauen Sie in Kürze wieder vorbei oder lesen Sie die Dateien direkt auf GitHub.",
};
