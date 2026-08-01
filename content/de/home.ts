/**
 * German copy for the homepage. Mirrors content/en/home.ts: same types,
 * same exported symbols, only string values translated.
 */

export type HeroVignette =
  | {
      kind: "qa" | "timetravel";
      label: string;
      question: string;
      answer: string;
      citation: string;
      chip: string;
      holdMs: number;
    }
  | {
      kind: "finding";
      label: string;
      claims: { text: string; source: string }[];
      chip: string;
      holdMs: number;
    }
  | {
      kind: "ingest";
      label: string;
      text: string;
      detail: string;
      chip: string;
      holdMs: number;
    };

export type BentoItem =
  | {
      kind: "memory";
      title: string;
      text: string;
      sources: string[];
      memoryLabel: string;
    }
  | {
      kind: "qa" | "timetravel";
      title: string;
      text: string;
      question: string;
      answer: string;
      source: string;
    }
  | {
      kind: "changed";
      title: string;
      text: string;
      oldValue: string;
      newValue: string;
      tag: string;
    }
  | { kind: "report"; title: string; text: string; header: string; chip: string }
  | { kind: "silence"; title: string; text: string; banner: string; answer: string };

export interface HomeContent {
  hero: {
    /** Two halves of the headline; the second carries the gradient accent. */
    headlineA: string;
    headlineB: string;
    subhead: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    /** Three proof badges under the hero; icon keys resolve in Hero.tsx. */
    trustStrip: { icon: string; label: string; href: string }[];
    scene: {
      ariaLabel: string;
      fragments: { icon: string; label: string }[];
      vignettes: HeroVignette[];
    };
  };
  bento: {
    title: string;
    subtitle: string;
    items: BentoItem[];
    cta: { title: string; text: string; href: string };
  };
  how: {
    kicker: string;
    title: string;
    steps: { icon: string; title: string; text: string; chips: string[] }[];
    detailNote: string;
  };
  sovereignty: {
    kicker: string;
    title: string;
    deployPrefix: string;
    deployRotator: string[];
    deploySuffix: string;
    items: { title: string; text: string }[];
    companyLine: string;
    linkLabel: string;
    linkHref: string;
  };
  proof: {
    kicker: string;
    title: string;
    intro: string;
    releaseLabel: string;
    linkLabel: string;
    linkHref: string;
  };
  clients: {
    title: string;
    subtitle: string;
    items: { name: string; image: string; badge?: string }[];
    disclaimer: string;
  };
  askAssistant: {
    kicker: string;
    title: string;
    text: string;
    prompt: string;
    assistants: { name: string; urlPrefix: string }[];
    copyLabel: string;
    copiedLabel: string;
  };
  gettingStarted: {
    kicker: string;
    title: string;
    steps: { title: string; text: string }[];
    selfHostNote: string;
    cta: { label: string; href: string };
    docsLink: { label: string; href: string };
  };
  closing: {
    heading: string;
    sub: string;
    secondary: { label: string; href: string };
  };
}

export const home: HomeContent = {
  hero: {
    headlineA: "Modelle mietet man.",
    headlineB: "Wissen besitzt man.",
    subhead:
      "Cogeto liest Ihre Dokumente, verifiziert jeden Fakt vor dem Speichern gegen seine eigene Quelle, zeigt Ihnen, wo Ihre Dokumente einander widersprechen, und belegt all das. Läuft in Ihrer Infrastruktur, in Europa oder vollständig offline.",
    ctaPrimary: { label: "Pilot starten", href: "/get-started" },
    ctaSecondary: { label: "Whitepaper lesen", href: "/whitepaper" },
    trustStrip: [
      { icon: "Code", label: "Open Source, AGPLv3", href: "/open-source" },
      {
        icon: "Award",
        label: "Nach ISO 9001 und ISO 27001 zertifiziertes Unternehmen",
        href: "/security",
      },
      { icon: "WifiOff", label: "Läuft vollständig offline", href: "/security" },
    ],
    scene: {
      ariaLabel:
        "Verstreute Spezifikationen, Handbücher, Prüfberichte, Mails, Scans, Tabellen und Notizen laufen zusammen zu verifizierten Antworten mit Quellenangaben, einem Widerspruchsbefund mit beiden verknüpften Quellen, einer Einlesebestätigung und einem per Zeitreise abgerufenen früheren Stand.",
      fragments: [
        { icon: "FileText", label: "Spezifikation" },
        { icon: "BookOpen", label: "Handbuch" },
        { icon: "FlaskConical", label: "Prüfbericht" },
        { icon: "Mail", label: "Mail" },
        { icon: "ScanLine", label: "Scan" },
        { icon: "Table", label: "Tabelle" },
        { icon: "StickyNote", label: "Notizen" },
      ],
      vignettes: [
        {
          kind: "qa",
          label: "Sie fragen",
          question: "Was fordert die Spezifikation für den Kaltstart?",
          answer: "Minus zweiunddreißig Grad, seit Revision D.",
          citation: "Spezifikation, Revision D",
          chip: "verifiziert",
          holdMs: 3600,
        },
        {
          kind: "finding",
          label: "Cogeto hat gefunden",
          claims: [
            {
              text: "Der Akku kann im laufenden Betrieb getauscht werden.",
              source: "Betriebshandbuch",
            },
            {
              text: "Jede Unterbrechung der Versorgung erfordert eine Neuinitialisierung.",
              source: "Spezifikation, aktuelle Revision",
            },
          ],
          chip: "Widerspruch",
          holdMs: 4400,
        },
        {
          kind: "ingest",
          label: "Eine Änderungsmitteilung trifft ein",
          text: "Gelesen und verifiziert: zwölf Fakten aufgenommen.",
          detail: "Konflikt mit einem Schnittstellendokument.",
          chip: "gegen alles Bekannte geprüft",
          holdMs: 3600,
        },
        {
          kind: "timetravel",
          label: "Zeitreise",
          question: "Was sagte die Dokumentation zum Bestelldatum?",
          answer: "Die damals gültigen Werte, mit ihren Quellenangaben.",
          citation: "Wissenshistorie, Stand jenes Datums",
          chip: "Zeitreise",
          holdMs: 3800,
        },
      ],
    },
  },

  bento: {
    title: "KI, die Ihr Unternehmen kennt",
    subtitle:
      "Weil sie auf dem aufbaut, was Ihr Unternehmen tatsächlich dokumentiert hat: verifiziert, mit Quellenangaben, auf Widersprüche geprüft und belegbar.",
    items: [
      {
        kind: "memory",
        title: "Eine Wissensbasis aus allem, was Sie haben.",
        text: "Dokumente, Tabellen, Scans, fotografierte Notizen, Mails und angebundene Systeme werden zu einer verknüpften, zitierfähigen Wissensbasis dessen, was Ihr Unternehmen weiß.",
        sources: ["Spezifikation", "Handbuch", "Prüfbericht", "Mail", "Scan", "Notiz"],
        memoryLabel: "verifiziertes Wissen",
      },
      {
        kind: "qa",
        title: "Sprechen Sie mit dem Wissen Ihres Unternehmens.",
        text: "Fragen Sie in normaler Sprache. Jede Aussage in der Antwort zitiert den exakten Satz, auf dem sie beruht.",
        question: "Welche Pinbelegung gilt aktuell für die Serviceschnittstelle?",
        answer: "Die aus Revision D, und zwei Dokumente widersprechen sich.",
        source: "Schnittstellenspezifikation, Revision D",
      },
      {
        kind: "changed",
        title: "Widersprüche zeigen sich von selbst.",
        text: "Wenn zwei Ihrer Dokumente einander widersprechen, werden beide Seiten markiert und verknüpft, mit beiden Sätzen und dem Datum.",
        oldValue: "Akku kann im laufenden Betrieb getauscht werden",
        newValue: "Unterbrechung der Versorgung erfordert Neuinitialisierung",
        tag: "Konflikt markiert, beide Seiten verknüpft",
      },
      {
        kind: "report",
        title: "Ein signierter Bericht zum Weiterleiten.",
        text: "Jeder Befund mit seinen Belegen, signiert, sodass Dritte prüfen können, dass nichts verändert wurde. PDF für den Auditor, JSON für Ihre Systeme.",
        header: "Befundbericht",
        chip: "signiert",
      },
      {
        kind: "timetravel",
        title: "Fragen Sie, was Sie im März glaubten.",
        text: "Jeder Fakt trägt den Zeitraum, in dem er gilt, und abgelöste Aussagen behalten ihre Historie.",
        question: "Wo lag die Kaltstartgrenze im März?",
        answer: "Bei minus fünfundzwanzig Grad, seitdem verschärft.",
        source: "Spezifikationshistorie, Stand März",
      },
      {
        kind: "silence",
        title: "Ehrlich, wo Ihre Unterlagen schweigen.",
        text: "Wenn Ihre Dokumente eine Frage nicht abdecken, sagt Cogeto das klar, bevor es irgendetwas anderes anbietet.",
        banner: "Von Ihren Dokumenten nicht abgedeckt",
        answer: "Allgemeinwissen folgt, deutlich gekennzeichnet.",
      },
    ],
    cta: {
      title: "Wie wird all das verifiziert?",
      text: "Verfolgen Sie einen Fakt vom Dokument bis zur Antwort.",
      href: "/product/verified-memory",
    },
  },

  how: {
    kicker: "So funktioniert es",
    title: "Vom Dokumentenordner zum belegbaren Wissen",
    steps: [
      {
        icon: "Inbox",
        title: "Lesen",
        text: "PDFs, Word-Dateien, Tabellen, Scans, Mails. Eine Datei, die sich nicht lesen lässt, wird als unlesbar gekennzeichnet, nie stillschweigend übersprungen.",
        chips: ["Ordner", "Postfächer", "Scans", "Konnektoren"],
      },
      {
        icon: "Crosshair",
        title: "Verankern",
        text: "Thema, Klasse und Revision jedes Dokuments werden zuerst bestimmt, damit jeder Fakt beim richtigen Produkt landet.",
        chips: [],
      },
      {
        icon: "ShieldCheck",
        title: "Verifizieren",
        text: "Ein zweiter, unabhängiger Durchgang prüft jede Aussage gegen ihren eigenen Quellsatz, bevor irgendetwas gespeichert wird.",
        chips: [],
      },
      {
        icon: "GitCompareArrows",
        title: "Abgleichen",
        text: "Das Korpus wird mit sich selbst verglichen: Aliasse aufgelöst, Zahlen arithmetisch geprüft, Konflikte markiert und verknüpft.",
        chips: [],
      },
      {
        icon: "MessagesSquare",
        title: "Antworten und belegen",
        text: "Chat mit Quellenangabe je Aussage, ehrliches Schweigen, wo die Unterlagen schweigen, und ein signierter Befundbericht über jede Dokumentauswahl.",
        chips: ["Quellenangaben", "Befunde", "signierter Bericht"],
      },
    ],
    detailNote: "Der vollständige Mechanismus, Schritt für Schritt, mit den Garantien dahinter:",
  },

  sovereignty: {
    kicker: "Ihre Infrastruktur, Ihre Jurisdiktion",
    title: "Eine Instanz pro Kunde",
    deployPrefix: "Läuft",
    deployRotator: ["in der EU gehostet", "auf Ihren eigenen Servern", "vollständig offline"],
    deploySuffix: "mit gehosteten oder vollständig lokalen Modellen.",
    items: [
      {
        title: "Nichts wird mit irgendwem geteilt",
        text: "Keine gemeinsame Datenbank, kein gemeinsamer Index, keine Daten anderer Mandanten auch nur in der Nähe Ihrer. Isolation ist eine Deployment-Grenze.",
      },
      {
        title: "Offline heißt offline",
        text: "Im Offline-Modus laufen Sprachmodelle, Embeddings, Seitenerkennung und Suche vollständig in der Instanz. Keine Telemetrie.",
      },
      {
        title: "Pseudonymisierung vor jedem externen Aufruf",
        text: "Namen, Organisationen und Beträge werden lokal durch Pseudonyme ersetzt, bevor ein externes Modell aufgerufen wird. Kann die Pseudonymisierung nicht laufen, findet der Aufruf nicht statt.",
      },
      {
        title: "Niemals Trainingsdaten",
        text: "Nichts, was Sie speichern, wird zum Training irgendeines Modells verwendet. Genau das macht Quellenangaben, Korrekturen und belegbare Löschung möglich.",
      },
    ],
    companyLine:
      "Dahinter steht MVT Solutions Group, ein nach ISO 9001 und ISO 27001 zertifiziertes Unternehmen mit Sitz in Kroatien, in der Europäischen Union.",
    linkLabel: "Sicherheit und Souveränität im Detail",
    linkHref: "/security",
  },

  proof: {
    kicker: "Erst verifizieren, dann speichern",
    title: "Genauigkeit, gemessen und mit jedem Release veröffentlicht",
    intro:
      "Diese Zahlen werden live aus den veröffentlichten Datendateien je Release gelesen, denselben unveränderlichen Dateien, die auch die Genauigkeitsseite darstellt. Die Werte werden je Sprache und je Modellkonfiguration veröffentlicht, und auch die Gates, die sie bestehen müssen, sind öffentlich.",
    releaseLabel: "Aktuelles Release",
    linkLabel: "Alle Zahlen ansehen, auch die unter dem Zielwert",
    linkHref: "/trust",
  },

  clients: {
    title: "Kunden und Partner",
    subtitle:
      "Die Teams hinter Cogeto haben für Organisationen aus öffentlichem Gesundheitswesen, Industrie, Hotellerie, Logistik und Forschung gearbeitet und geliefert und arbeiten mit EU-Infrastrukturanbietern zusammen, damit Daten souverän bleiben.",
    items: [
      {
        name: "OVHcloud",
        image: "/clients-partners/ovh-cloud.png",
        badge: "Cloud-Partner",
      },
      { name: "Department of Health, UAE", image: "/clients-partners/doh-uae.png" },
      { name: "Hilton", image: "/clients-partners/hilton.png" },
      { name: "DSV", image: "/clients-partners/dsv.png" },
      { name: "Beckhoff Automation", image: "/clients-partners/beckhoff.png" },
      { name: "ESTUN Automation", image: "/clients-partners/estun.png" },
      { name: "BIRD Incubator", image: "/clients-partners/bird-incubator.png" },
      {
        name: "Zagreb University of Applied Sciences",
        image: "/clients-partners/tvz.png",
      },
      {
        name: "Open Source Initiative",
        image: "/clients-partners/open-source-initiative.png",
      },
    ],
    disclaimer:
      "Alle Logos und Marken sind Eigentum ihrer jeweiligen Inhaber. Sie werden als Referenzen der Unternehmen hinter Cogeto gezeigt und bedeuten keine Empfehlung des Produkts Cogeto.",
  },

  askAssistant: {
    kicker: "Zweite Meinung",
    title: "Fragen Sie Ihren Assistenten nach Cogeto",
    text: "Öffnen Sie den Assistenten, den Sie ohnehin nutzen, mit einem vorbereiteten Prompt. Er liest diese Website und das öffentliche Repository und gibt Ihnen seine eigene Zusammenfassung dessen, was Cogeto ist.",
    prompt:
      "Fasse zusammen, was Cogeto ist und was es von Retrieval- und Enterprise-Search-Werkzeugen unterscheidet. Nutze https://cogeto.eu und https://github.com/Cogeto/cogeto als Referenzen.",
    assistants: [
      { name: "Claude", urlPrefix: "https://claude.ai/new?q=" },
      { name: "ChatGPT", urlPrefix: "https://chatgpt.com/?q=" },
      { name: "Perplexity", urlPrefix: "https://www.perplexity.ai/search?q=" },
      { name: "Copilot", urlPrefix: "https://copilot.microsoft.com/?q=" },
    ],
    copyLabel: "Prompt für jeden anderen Assistenten kopieren",
    copiedLabel: "Kopiert",
  },

  gettingStarted: {
    kicker: "Erste Schritte",
    title: "Starten Sie mit einem Pilotprojekt auf Ihren eigenen Dokumenten",
    steps: [
      {
        title: "Ein Pilotprojekt auf Ihren eigenen Dokumenten",
        text: "Bringen Sie einen echten Dokumentenbestand mit. Cogeto liest ihn und erstellt den Befundbericht. Sie sehen genau, was es gefunden hat, auf Ihrem Material, vor jeder längeren Bindung.",
      },
      {
        title: "Ihre Instanz",
        text: "Von uns in der EU gehostet, in Ihrer Cloud deployt oder in Ihrem Netzwerk installiert, auch vollständig offline. Eine Instanz, ganz allein Ihre.",
      },
      {
        title: "Es arbeitet weiter",
        text: "Jede neue Revision, Änderungsmitteilung oder Mail wird gegen alles bereits Bekannte geprüft, sodass Konflikte am Tag ihrer Entstehung sichtbar werden, nicht erst beim nächsten Audit.",
      },
    ],
    selfHostNote:
      "Nutzen Sie Cogeto für immer kostenlos. Bezahlen Sie dafür, dass es Ihres wird: installiert innerhalb Ihrer Mauern, abgestimmt auf Ihre Dokumente, gemessen auf Ihrem Material und mit jemandem, der dafür geradesteht.",
    cta: { label: "Pilot starten", href: "/get-started" },
    docsLink: { label: "Selbst betreiben", href: "/docs" },
  },

  closing: {
    heading: "Sehen Sie es auf Ihren Dokumenten.",
    sub: "Das Pilotprojekt liest einen echten Dokumentenbestand von Ihnen und endet mit dem signierten Befundbericht. Wir antworten innerhalb eines Werktags.",
    secondary: { label: "Selbst betreiben", href: "/docs" },
  },
};
