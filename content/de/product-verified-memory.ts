import type { ZPageContent } from "./product-contradiction-findings";

/**
 * German copy for /product/verified-memory. Mirrors
 * content/en/product-verified-memory.ts: same import, same exported
 * symbol, only string values translated.
 */
export const verifiedMemory: ZPageContent = {
  metaTitle: "Verifiziertes Wissen",
  metaDescription:
    "Jeder gespeicherte Fakt trägt seinen exakten Quellsatz, besteht vor dem Speichern eine unabhängige Verifikation und bleibt einsehbar, samt Abgelehntem.",
  eyebrow: "Produkt",
  headline: "Verteidigen Sie nie einen Fakt, dessen Satz Sie nicht zeigen können",
  lede:
    "Cogeto speichert atomare Aussagen, keine Dokumentfragmente. Jede Aussage trägt den wörtlichen Satz, aus dem sie stammt, ein Verifikationsurteil und den Zeitraum, in dem sie gilt. Jede Antwort lässt sich so in zwei Schritten bis zur Quelle zurückverfolgen.",
  heroMock: "answer-conflict",
  bands: [
    {
      heading: "Nichts gelangt unverifiziert in die Wissensbasis",
      advantage:
        "Der übliche Fehler von Dokumentassistenten, eine einmal gespeicherte Fehllesung, die für immer mit Überzeugung wiederholt wird, kann hier nicht passieren.",
      mechanism:
        "Nach der Extraktion liest ein zweiter, unabhängiger Durchgang nur den eigenen Quellsatz der Aussage und beurteilt, ob der Beleg sie stützt. Nur gestützte, uneingeschränkte Aussagen werden aktiv. Ein Fehlschlag führt nie standardmäßig zur Annahme.",
      mock: "log",
    },
    {
      heading: "Abgelehntes bleibt einsehbar",
      advantage:
        "Sie können prüfen, was das System verweigert hat, nicht nur, was es behalten hat. Jede Zurückstufung wird mit Textstelle, Grund und Zeitpunkt protokolliert und im Befundbericht zusammengefasst.",
      mechanism:
        "Es gibt keine Prüf-Warteschlange und keine Hausaufgaben: Cogeto löst Verifikationsergebnisse selbst auf. Ihre eigene Bestätigung eines Fakts steht von da an über dem Urteil der Maschine.",
      mock: "status",
    },
    {
      heading: "Ehrlich, wo Ihre Unterlagen schweigen",
      advantage:
        "Wenn Ihre Dokumente eine Frage nicht abdecken, sagt die Antwort das klar, und alles aus dem eigenen Wissen des Modells ist deutlich als nicht aus Ihren Quellen markiert.",
      mechanism:
        "Es gibt keinen Modus, in dem Modellwissen so präsentiert wird, als stamme es aus Ihren Dokumenten. Mehrdeutige Fragen fächern über die Subjekte des Korpus auf und fragen, welches gemeint war.",
      mock: "silence",
    },
    {
      heading: "Fragen Sie, was Sie im März glaubten",
      advantage:
        "Abgelöste Fakten werden nie zerstört, nur geschlossen. Sie können also fragen, was die Dokumentation zu jedem Datum behauptete, was sich seit einem Review geändert hat und welche Revision eine Aussage ersetzt hat.",
      mechanism:
        "Jeder Fakt trägt einen Gültigkeitszeitraum. Drei zeitliche Lesarten stehen immer bereit: Stand zu einem Zeitpunkt, geändert seit, und Vorversion.",
      link: { label: "Der Befundbericht", href: "/product/findings-report" },
      mock: "finding-battery",
    },
  ],
  statNote:
    "Live aus den je Release veröffentlichten Genauigkeitswerten, Gesamtwert über Englisch und Kroatisch. Der Verifikationsdurchgang selbst wird an menschlichen Urteilen gemessen, und die Zahl ist öffentlich.",
  gridHeading: "Wo die Garantien enden, klar gesagt",
  grid: [
    {
      title: "Verifikation ist ein Urteil",
      text: "Der Verifizierer ist ein unabhängiges Modell, dessen Übereinstimmung mit menschlichen Urteilen veröffentlicht wird. Er kann eine wahre Aussage zurückstufen; das Unterdrückungsprotokoll macht das sichtbar.",
    },
    {
      title: "Qualität variiert je Sprache",
      text: "Extraktion und Abgleich werden je Sprache getrennt gemessen, und die Zahlen werden veröffentlicht statt weggemittelt.",
    },
    {
      title: "Nur, was dokumentiert wurde",
      text: "Cogeto erfasst kein undokumentiertes Urteilsvermögen. Es erklärt eine Frage für unbeantwortet, statt die Lücke zu füllen.",
    },
    {
      title: "Informiert, nicht originell",
      text: "Cogeto argumentiert über abgerufene Fakten. Für offenes Denken ist ein Frontier-Assistent das richtige Werkzeug, und die Doku sagt das auch.",
    },
  ],
  cta: {
    heading: "Jede Antwort, prüfbar bis zum Satz.",
    sub: "Alles auf dieser Seite läuft mit dem Open-Source-Release, alles lässt sich also prüfen, statt geglaubt werden zu müssen.",
    secondary: { label: "Die gemessene Genauigkeit, je Release", href: "/trust" },
  },
};
