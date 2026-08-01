/**
 * German copy for /get-started, the conversion page. Mirrors
 * content/en/get-started.ts: same interfaces, same exported symbols,
 * only string values translated.
 */

export interface OfferCard {
  name: string;
  highlight?: string;
  positioning: string;
  bullets: string[];
  cta: { label: string; href: string; kind: "primary" | "secondary" | "link" };
}

export interface GetStartedContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    lede: string;
    secondary: { label: string; href: string };
  };
  stepsHeading: string;
  steps: { title: string; text: string }[];
  offersHeading: string;
  offersSub: string;
  offers: OfferCard[];
  alsoFrom: {
    heading: string;
    items: { title: string; text: string }[];
    link: { label: string; href: string };
  };
  languagesNote: string;
  faqHeading: string;
  faq: { question: string; answer: string }[];
  contact: {
    heading: string;
    sub: string;
    steps: string[];
    chips: string[];
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    sendingLabel: string;
    sentTitle: string;
    sentBody: string;
    errorBody: string;
    directLine: string;
  };
}

export const getStarted: GetStartedContent = {
  metaTitle: "Pilot starten",
  metaDescription:
    "Cogeto liest einen echten Dokumentenbestand von Ihnen und erstellt den signierten Befundbericht: Sie sehen zuerst, was es fand. Antwort in einem Werktag.",
  hero: {
    eyebrow: "Erste Schritte",
    headline: "Das Erste, was Sie sehen, ist, was es in Ihren Dokumenten gefunden hat",
    lede:
      "Ein Pilotprojekt beginnt mit einem echten Dokumentenbestand von Ihnen. Cogeto liest ihn und erstellt den signierten Befundbericht, vor jeder längeren Bindung. Ihre Dokumente, auf Wunsch Ihre Infrastruktur, und ein Ergebnis, das Sie weiterleiten können.",
    secondary: { label: "Compliance-Onepager herunterladen", href: "/documents/cogeto-compliance-onepager.pdf" },
  },
  stepsHeading: "Wie es weitergeht",
  steps: [
    {
      title: "Wir antworten innerhalb eines Werktags",
      text: "Beschreiben Sie grob Ihren Dokumentenbestand: wie viele Dokumente, welche Formate, welche Sprachen. Mehr braucht eine erste Antwort nicht.",
    },
    {
      title: "Ein 30-minütiges Scoping-Gespräch",
      text: "Mit dem Cogeto-Team, keine Vertriebskaskade. Sie gehen mit der Klarheit, ob ein Pilotprojekt sinnvoll ist und was es abdecken würde.",
    },
    {
      title: "Ein Pilotvorschlag für Ihre Umgebung",
      text: "Ihre Dokumente, gehostet in der EU, in Ihrer Cloud oder vollständig offline. Das Pilotprojekt endet mit dem signierten Befundbericht über Ihr Material.",
    },
  ],
  offersHeading: "Vier Wege, es zu betreiben",
  offersSub:
    "Jede Instanz ist Single-Tenant: ein Deployment, ein Kunde, nichts wird geteilt. Es gibt keine veröffentlichten Preise; jedes Engagement beginnt mit dem Pilotgespräch.",
  offers: [
    {
      name: "Pilot",
      highlight: "Hier starten",
      positioning: "Sehen Sie es auf Ihren eigenen Dokumenten, vor jeder Bindung.",
      bullets: [
        "Ein echter Dokumentenbestand von Ihnen, vollständig gelesen",
        "Gefundene Widersprüche, beide Quellen verknüpft",
        "Am Ende der signierte Befundbericht",
        "Der Bericht bleibt in jedem Fall bei Ihnen",
      ],
      cta: { label: "Pilot starten", href: "#contact", kind: "primary" },
    },
    {
      name: "Gehostet in der EU",
      positioning: "Ihre Instanz, betrieben: installiert, aktualisiert, verantwortet.",
      bullets: [
        "Single-Tenant-Instanz, ganz allein Ihre, EU-Jurisdiktion",
        "Installation, Updates, Backups und Monitoring, für Sie erledigt",
        "Ein unterzeichneter Auftragsverarbeitungsvertrag und eine verantwortliche Person",
        "Sensible Entitäten pseudonymisiert vor jedem externen Aufruf",
      ],
      cta: { label: "Sprechen Sie mit uns", href: "#contact", kind: "secondary" },
    },
    {
      name: "Selbst gehostet",
      positioning: "Betreiben Sie das Open-Source-Release auf eigener Infrastruktur.",
      bullets: [
        "AGPLv3, alles auf dieser Website inklusive",
        "Signierte Release-Images, ein Operator-Skript",
        "Öffentliche Installations- und Konfigurationsdoku",
        "Kommerzielle Lizenz verfügbar, falls Sie eine brauchen",
      ],
      cta: { label: "Doku lesen", href: "/docs", kind: "link" },
    },
    {
      name: "Vollständig offline",
      positioning: "Innerhalb Ihrer Mauern, nichts verlässt das Haus.",
      bullets: [
        "Lokale Modelle auf Ihrer Hardware",
        "Identitätsanbindung an Ihren Identity Provider",
        "Mail-Routing und Konnektoren zu Ihren Systemen",
        "Offline-Image-Bundle für Air-Gap-Installationen",
      ],
      cta: { label: "Sicherheit und Souveränität", href: "/security", kind: "link" },
    },
  ],
  alsoFrom: {
    heading: "Außerdem von uns",
    items: [
      {
        title: "Abgestimmt auf Ihre Branche",
        text: "Extraktion und Verifikation kalibriert für Ihre Dokumentklasse, ein Goldstandard-Set aus Ihren Dokumenttypen und Genauigkeitswerte, veröffentlicht für genau Ihre Konfiguration.",
      },
      {
        title: "Absicherung",
        text: "Support mit Reaktionszeiten, beantwortete Sicherheitsprüfungen, betreute Upgrades und Migrationen, Schulungen und eine kommerzielle Lizenz, wo AGPL nicht zu Ihrer rechtlichen Lage passt.",
      },
    ],
    link: { label: "Warum der Code kostenlos ist und das hier nicht", href: "/open-source" },
  },
  languagesNote:
    "Oberfläche auf Englisch, Kroatisch und Deutsch. Die Qualität der Wissensbasis wird je Sprache gemessen und veröffentlicht, Sie sehen also vor der Entscheidung, wo die Qualität stark ist.",
  faqHeading: "Die Fragen, die Käufer wirklich stellen",
  faq: [
    {
      question: "Verlassen meine Daten meine Instanz?",
      answer:
        "Nur wenn Sie einen externen Modellanbieter konfigurieren, und auch dann erst, nachdem sensible Entitäten lokal durch Pseudonyme ersetzt wurden. Im Offline-Modus verlässt gar nichts die Instanz.",
    },
    {
      question: "Trainieren Sie mit unseren Dokumenten?",
      answer:
        "Niemals. Ihr Wissen bleibt in Ihrer Instanz. Genau das macht Quellenangaben, Korrekturen und belegbare Löschung möglich.",
    },
    {
      question: "Was passiert, wenn wir Cogeto nicht mehr nutzen?",
      answer:
        "Ein Klick exportiert alles, Fakten, Quellen, Historie, Relationen und Quittungen, in einem offenen, dokumentierten Format. Der Code ist Open Source. Nichts an diesem Design hält Sie fest.",
    },
    {
      question: "Wie genau ist es?",
      answer:
        "Gemessen, veröffentlicht je Release, je Sprache und je Modellkonfiguration, einschließlich der Stellen, an denen es seine Ziele verfehlt. Die Genauigkeitsseite ist öffentlich.",
    },
    {
      question: "Läuft es ohne Internet?",
      answer:
        "Ja, vollständig. Sprachmodelle, Embeddings, Seitenerkennung und Suche laufen komplett in der Instanz.",
    },
    {
      question: "Ist das ein Medizinprodukt oder eine regulatorische Bewertung?",
      answer:
        "Nein. Cogeto erzeugt Belege über Ihre Dokumente. Das regulatorische Urteil bleibt bei Ihrer Organisation.",
    },
  ],
  contact: {
    heading: "Pilot starten",
    sub: "Drei Felder. Wir antworten innerhalb eines Werktags.",
    steps: [
      "Wir antworten innerhalb eines Werktags",
      "Ein 30-minütiges Scoping-Gespräch, keine Vertriebskaskade",
      "Ein Pilotvorschlag: Ihre Dokumente, Ihre Infrastruktur",
    ],
    chips: [
      "Nach ISO 9001 und ISO 27001 zertifiziertes Unternehmen",
      "Open Source, AGPLv3",
      "EU-Jurisdiktion",
    ],
    nameLabel: "Name",
    emailLabel: "Geschäftliche E-Mail",
    messageLabel: "Wie sieht Ihr Dokumentenbestand aus?",
    messagePlaceholder:
      "Ungefähr wie viele Dokumente, welche Formate, welche Sprachen, und ob es in Ihrem Netzwerk laufen muss.",
    submitLabel: "Pilot starten",
    sendingLabel: "Wird gesendet",
    sentTitle: "Angekommen.",
    sentBody: "Wir lesen jede Nachricht selbst und antworten innerhalb eines Werktags.",
    errorBody:
      "Das Senden ist gerade fehlgeschlagen. Schreiben Sie uns stattdessen direkt an hi@cogeto.eu; es gilt dieselbe Antwort innerhalb eines Werktags.",
    directLine: "Lieber einfach per E-Mail? hi@cogeto.eu, gleiche Antwort innerhalb eines Werktags.",
  },
};
