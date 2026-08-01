import type { ZPageContent } from "./product-contradiction-findings";

/**
 * German copy for /product/findings-report. Mirrors
 * content/en/product-findings-report.ts: same import, same exported
 * symbol, only string values translated.
 */
export const findingsReport: ZPageContent = {
  metaTitle: "Der Befundbericht",
  metaDescription:
    "Ein Klick erzeugt einen signierten Befundbericht: jeder Widerspruch mit Belegen, jede abgelöste Aussage mit Kette. PDF für Menschen, JSON für Maschinen.",
  eyebrow: "Produkt",
  headline: "Belege zum Weiterleiten, keine Protokolle zum Abtippen",
  lede:
    "Ein Klick erzeugt einen Befundbericht über die Dokumente, die Sie auswählen: jeder Widerspruch mit seinen Belegen, jede abgelöste Aussage mit ihrer Kette und eine Zusammenfassung dessen, was die Verifikation abgelehnt hat. Signiert, sodass Dritte prüfen können, dass nichts verändert wurde.",
  heroMock: "report",
  bands: [
    {
      heading: "Der Auditor bekommt Belege, keine Zusammenfassungen",
      advantage:
        "Jeder Widerspruch erscheint mit beiden Aussagen, beiden wörtlichen Quellsätzen, dem Dokument mit Revision und Fundstelle je Seite, dem Erkennungsdatum und dem Bearbeitungsstatus.",
      mechanism:
        "Abgelöste Fakten erscheinen mit ihren Ketten, und die Zusammenfassung unterdrückter Fakten macht das Abgelehnte zum Teil der Akte.",
      mock: "finding-cold",
    },
    {
      heading: "Die Signatur deckt einen definierten Umfang",
      advantage:
        "Ein Bericht entsteht immer über eine ausdrücklich ausgewählte Menge von Quellen. Was geprüft wurde, ist Teil der Akte, keine Annahme.",
      mechanism:
        "Befunde, die auf ein Dokument außerhalb des gewählten Umfangs verweisen, erscheinen in einem klar gekennzeichneten Randabschnitt, statt stillschweigend aufgenommen oder verworfen zu werden.",
      mock: "log",
    },
    {
      heading: "Der Bericht nennt seine eigene Genauigkeit",
      advantage:
        "Das Artefakt, das Sie weiterleiten, deklariert die gemessenen Genauigkeitswerte genau der Modellkonfiguration, die es erzeugt hat. Kein anderes Dokumentwerkzeug sagt Ihrem Auditor, wie genau es ist.",
      mechanism:
        "Dieselben Zahlen sind für jedes Release öffentlich auf der Genauigkeitsseite, je Sprache und je Konfiguration.",
      link: { label: "Die veröffentlichten Genauigkeitswerte", href: "/trust" },
      mock: "answer-conflict",
    },
  ],
  statNote:
    "Live aus den je Release veröffentlichten Genauigkeitswerten. Der Bericht trägt die Werte seiner eigenen Modellkonfiguration; dies sind die aktuellen Gesamtwerte.",
  gridHeading: "Gebaut für die Akte, in der er landet",
  grid: [
    {
      title: "PDF und JSON",
      text: "PDF für den Auditor und die Design-Review-Akte, JSON für Ihr QM-System, beide signiert über denselben Pfad wie Löschquittungen.",
    },
    {
      title: "Vor einem Audit",
      text: "Vier Jahre Dokumentation, mehrere hundert Dateien, zwei Sprachen, einige Scans. Am nächsten Morgen: die Befunde. Sechs Wochen später geht der signierte Bericht in die Design-Review-Akte.",
    },
    {
      title: "Am Tag einer Änderung",
      text: "Eine Änderungsmitteilung kommt per Mail und kollidiert mit einem Schnittstellendokument. Dieser Befund erscheint noch am selben Tag, nicht bei einem Audit zwei Jahre später.",
    },
    {
      title: "Keine regulatorische Bewertung",
      text: "Cogeto erzeugt Belege über Ihre Dokumente. Das regulatorische Urteil bleibt bei Ihrer Organisation, und die Doku sagt das ausdrücklich.",
    },
  ],
  cta: {
    heading: "Ihr erster Bericht entsteht im Pilotprojekt.",
    sub: "Bringen Sie einen echten Dokumentenbestand mit. Das Pilotprojekt endet mit dem signierten Befundbericht über Ihr Material, und der bleibt in jedem Fall bei Ihnen.",
    secondary: { label: "Wie Befunde erkannt werden", href: "/product/contradiction-findings" },
  },
};
