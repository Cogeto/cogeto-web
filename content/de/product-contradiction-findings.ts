/**
 * German copy for /product/contradiction-findings. Mirrors
 * content/en/product-contradiction-findings.ts: same types, same
 * exported symbols, only string values translated.
 */

export type MockKind =
  | "finding-battery"
  | "finding-cold"
  | "numeric"
  | "alias"
  | "answer-conflict"
  | "silence"
  | "log"
  | "report"
  | "status";

export interface ZBandContent {
  heading: string;
  advantage: string;
  mechanism?: string;
  link?: { label: string; href: string };
  mock: MockKind;
}

export interface ZPageContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lede: string;
  heroMock: MockKind;
  bands: ZBandContent[];
  statNote: string;
  gridHeading: string;
  grid: { title: string; text: string }[];
  objection?: { heading: string; paragraphs: string[] };
  cta: {
    heading: string;
    sub: string;
    secondary: { label: string; href: string; external?: boolean };
  };
}

export const contradictionFindings: ZPageContent = {
  metaTitle: "Widerspruchsbefunde",
  metaDescription:
    "Cogeto vergleicht Ihre Dokumente laufend und meldet Widersprüche: beide Aussagen, beide Quellsätze, beide Dokumente mit Revision und Erkennungsdatum.",
  eyebrow: "Produkt",
  headline: "Finden Sie den Widerspruch, bevor das Audit ihn findet",
  lede:
    "Ihr Handbuch, Ihre Spezifikation, Ihre Prüfberichte und Ihre Mails stimmen nicht vollständig überein. Cogeto vergleicht sie alle, laufend, und meldet jede Abweichung mit den Belegen im Anhang. Das Feature, das sonst niemand liefert.",
  heroMock: "finding-battery",
  bands: [
    {
      heading: "Jeder Befund kommt mit seinen Belegen",
      advantage:
        "Sie jagen nie einer vagen Meldung hinterher. Ein Befund trägt beide Aussagen, beide wörtlichen Quellsätze, beide Dokumente mit Revision und Fundstelle, das Erkennungsdatum und seinen Bearbeitungsstatus.",
      mechanism:
        "Ein Befund ist Beleg, keine Benachrichtigung: Alles, was zur Beurteilung nötig ist, hängt an ihm.",
      mock: "finding-cold",
    },
    {
      heading: "Zahlenkonflikte können sich nicht verstecken",
      advantage:
        "3.2 mm gegen 3.4 mm, fünfzigtausend gegen 50,000, März gegen Q1: gefunden durch Arithmetik, nicht der Tagesform eines Modells überlassen.",
      mechanism:
        "Mengen, Einheiten und Daten werden deterministisch verglichen, bevor irgendein Modell befragt wird. Der Beurteiler sieht nur Paare, die das überstehen.",
      mock: "numeric",
    },
    {
      heading: "Eine Firma unter zwei Namen ist eine Firma",
      advantage:
        "Eine kroatische Mail kann einer englischen Spezifikation widersprechen, denn Subjekte werden vor dem Vergleich über Aliasse, Tippfehler und Sprachen hinweg aufgelöst.",
      mechanism:
        "Ablösung ist vom Widerspruch getrennt: Eine neuere Revision schließt den alten Fakt nur, wenn die Zeitachse zustimmt, andernfalls sehen Sie den Konflikt.",
      mock: "alias",
    },
    {
      heading: "Sichtbar dort, wo Sie arbeiten, nie in einer Warteschlange",
      advantage:
        "Befunde erscheinen an der Quelle, die sie erzeugt hat, in jeder Antwort, die eine der beiden Seiten zitiert, und im signierten Bericht. Es gibt keine Aufgabenliste, denn ein Produkt, das Hausaufgaben erzeugt, wird nicht genutzt.",
      link: { label: "Der signierte Befundbericht", href: "/product/findings-report" },
      mock: "answer-conflict",
    },
  ],
  statNote:
    "Live aus den je Release veröffentlichten Genauigkeitswerten, Gesamtwert über Englisch und Kroatisch. Jede Zahl verlinkt auf ihre öffentliche Datendatei auf der Genauigkeitsseite.",
  gridHeading: "Was Befunde vertrauenswürdig hält",
  grid: [
    {
      title: "Register geprüfter Paare",
      text: "Ein als vereinbar beurteiltes Paar wird nicht erneut befragt, solange sich kein Fakt ändert. Grenzfälle können so nicht durch Modellvarianz in Konflikte driften.",
    },
    {
      title: "Erkennungsdaten",
      text: "Jeder Befund trägt das Datum seines Auftauchens, ein Bericht kann also festhalten, wann ein Konflikt in die Akte gelangte.",
    },
    {
      title: "Eine Aktion pro Durchgang",
      text: "Je Fakt und Durchgang wird höchstens eine Aktion ausgeführt, ein einzelner Import kann also nicht durch das Korpus kaskadieren.",
    },
    {
      title: "Precision und Recall, beide veröffentlicht",
      text: "Jede Größe allein lässt sich austricksen: Wer alles markiert, hat perfekten Recall, wer nichts markiert, perfekte Precision. Beide sind öffentlich, je Release.",
    },
  ],
  objection: {
    heading: "Warum Ihre aktuelle KI das nicht findet",
    paragraphs: [
      "Retrieval-Werkzeuge finden; sie gleichen nicht ab. Fragen Sie einen Assistenten nach dem Akku, liefert er die Passage, die zu Ihrer Formulierung passte, mit voller Überzeugung, ohne sie je mit irgendetwas verglichen zu haben.",
      "Alles in ein großes Kontextfenster zu kopieren funktioniert auch nicht: Modelle lesen lange Eingaben ungleichmäßig, Sie bekommen also einige Konflikte, bei jedem Lauf andere, ohne Protokoll dessen, was verglichen wurde. Jede Abweichung ist am Tag ihres Entstehens billig zu beheben und teuer zu entdecken, wenn ein Audit, ein Rückruf oder ein Kundenstreit sie findet.",
    ],
  },
  cta: {
    heading: "Sehen Sie, was sich in Ihren Dokumenten widerspricht.",
    sub: "Das Pilotprojekt liest einen echten Dokumentenbestand von Ihnen und endet mit dem signierten Befundbericht.",
    secondary: { label: "Wie Wissen verifiziert wird", href: "/product/verified-memory" },
  },
};
