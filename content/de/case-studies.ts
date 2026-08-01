/**
 * German case studies. Mirrors content/en/case-studies.ts: same
 * interfaces, same exported symbols, only string values translated.
 * Quoted claims keep the language of the document they cite, so the
 * cross-language findings stay demonstrably cross-language.
 */

export interface CsFinding {
  intro: string;
  mock:
    | { kind: "finding"; claims: { text: string; source: string }[]; chip: string }
    | {
        kind: "chain";
        oldClaim: { text: string; source: string };
        newClaim: { text: string; source: string };
        note: string;
      }
    | { kind: "report"; lines: string[] }
    | { kind: "suppression"; rows: { reason: string; count: string }[]; note: string };
}

export interface CaseStudy {
  slug: string;
  navLabel: string;
  industryLabel: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  heroMock: { claims: { text: string; source: string }[]; chip: string };
  situation: { heading: string; pains: { title: string; text: string }[] };
  run: {
    heading: string;
    intro: string;
    steps: string[];
    summaryTitle: string;
    summary: { label: string; value: string }[];
  };
  findings: { heading: string; sub: string; items: CsFinding[] };
  outcomes: {
    heading: string;
    cards: { title: string; text: string }[];
    boundary?: string;
    deployment: string[];
  };
  faq: { question: string; answer: string }[];
  closing: { sentence: string; subject: string };
  chat: ChatExchange[];
}

export interface ChatSegment {
  text: string;
  chips?: string[];
}

export interface ChatExchange {
  question: string;
  segments: ChatSegment[];
  conflict?: { text: string; chips?: string[] };
  silence?: { title: string; banner: string };
  standsOn: string[];
}

export const caseIndex = {
  metaTitle: "Fallstudien",
  metaDescription:
    "Was Cogeto in Dokumentbeständen findet: Technische Dokumentation, Programmakten und Datenblattfamilien, mit Widersprüchen und signierten Befundberichten.",
  eyebrow: "Fallstudien",
  headline: "Was es findet, wenn es alles liest",
  lede:
    "Vier Dokumentenbestände, vier Branchen, derselbe Ablauf: Massenimport, Verifikation, nächtlicher Abgleich und am Morgen ein signierter Befundbericht. Erzählt so, wie der Käufer es erlebt.",
  cards: [
    {
      industryLabel: "Medizinprodukte",
      pain: "Eine Technische Dokumentation, gewachsen über vier Jahre und viele Hände.",
      outcome: "Auditvorbereitung wurde ein Bericht, keine Archäologie.",
      metric: "27 Widersprüche in 412 Dokumenten",
      href: "/case-studies/medical-devices",
    },
    {
      industryLabel: "Verteidigung",
      pain: "Material, das das Gebäude nicht verlassen darf.",
      outcome: "Fundierte Antworten im geschlossenen Netz.",
      metric: "Vollständig offline, null ausgehende Aufrufe",
      href: "/case-studies/defense",
    },
    {
      industryLabel: "Fahrzeuglackierung",
      pain: "Das Finish ist Handwerk, und das Handwerk lebt in Menschen und verstreutem Papier.",
      outcome: "Prozesswissen, das die Menschen überdauert, die es tragen.",
      metric: "24 Konflikte in 643 Dokumenten",
      href: "/case-studies/automotive-paint",
    },
    {
      industryLabel: "Entwicklungsteams",
      pain: "Vierzig fast identische Datenblätter und ein Wiki, dem niemand traut.",
      outcome: "Ein Korpus, das mit Quellenangaben antwortet.",
      metric: "33 Widersprüche, die niemand benannt hatte",
      href: "/case-studies/engineering-teams",
    },
  ],
};

const DEPLOYMENT = [
  "In der EU gehostet: Ihre Single-Tenant-Instanz, für Sie betrieben.",
  "Ihre Cloud: deployt in Ihrer eigenen Infrastruktur.",
  "Vollständig offline: lokale Modelle, keine ausgehende Konnektivität, keine Telemetrie.",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "medical-devices",
    navLabel: "Medizinprodukte",
    industryLabel: "Medizinprodukte",
    metaTitle: "Konsistente Technische Dokumentation",
    metaDescription:
      "Technische Dokumentation eines Medizinprodukts, 412 Dokumente, auf Konsistenz geprüft: 27 Widersprüche gefunden, MDR-Auditvorbereitung in Tagen.",
    headline: "Die Technische Dokumentation stimmte mit sich überein, bevor der Auditor fragte",
    subhead:
      "Ein Medizinproduktehersteller richtete Cogeto auf vier Jahre Technischer Dokumentation. Am nächsten Morgen kannte es jede Stelle, an der die Akte sich selbst widersprach, mit beiden Sätzen im Zitat und beiden Revisionen beim Namen.",
    heroMock: {
      claims: [
        {
          text: "Der Akku darf getauscht werden, während das Gerät in Betrieb bleibt.",
          source: "Gebrauchsanweisung, Revision 4",
        },
        {
          text: "Jede Unterbrechung der Versorgungsspannung erfordert eine vollständige Neuinitialisierung.",
          source: "Systemspezifikation, Revision F",
        },
      ],
      chip: "Widerspruch",
    },
    situation: {
      heading: "Eine Akte, gewachsen über vier Jahre und viele Hände",
      pains: [
        {
          title: "Die Änderungsmitteilung, die niemand nachgezogen hat",
          text: "Eine Designänderung veränderte die Stromversorgungsarchitektur. Die Spezifikation wurde aktualisiert; die Gebrauchsanweisung nicht. Zwei gelenkte Dokumente widersprechen sich nun darin, was ein Bediener tun darf.",
        },
        {
          title: "Auditvorbereitung als Archäologie",
          text: "Wochen, in denen Ingenieure Revisionen nebeneinander lesen, Tabellen dessen bauen, was übereinstimmen müsste, und hoffen, dass die Stichprobe des Auditors eine geprüfte ist.",
        },
        {
          title: "Zwei Sprachen, ein Produkt",
          text: "Das Servicehandbuch ist auf Kroatisch, die Spezifikation auf Englisch. Kein Prüfer liest beides zugleich, sprachübergreifende Abweichungen sind also konstruktionsbedingt unsichtbar.",
        },
      ],
    },
    run: {
      heading: "Der Lauf",
      intro:
        "Ein Massenimport: die Technische Dokumentation im Ist-Zustand, einschließlich gescannter Typprüfberichte und tabellenbasierter Risikotabellen.",
      steps: [
        "412 Dokumente in einem Vorgang importiert, nach Inhalt dedupliziert",
        "Scans gelesen von lokaler Erkennung in der Instanz",
        "Jedes Dokument verankert an Produkt, Klasse und Revision",
        "Jede extrahierte Aussage verifiziert gegen ihren eigenen Quellsatz",
        "Nächtlicher Abgleich über das gesamte Korpus",
      ],
      summaryTitle: "Die Zusammenfassung am Morgen",
      summary: [
        { label: "Dokumente gelesen", value: "412" },
        { label: "Fakten gespeichert", value: "18,347" },
        { label: "Widersprüche gefunden", value: "27" },
        { label: "Aussagen abgelöst", value: "214" },
        { label: "Extraktionen unterdrückt", value: "391" },
        { label: "unlesbare Seiten, namentlich gelistet", value: "9" },
      ],
    },
    findings: {
      heading: "Die Befunde",
      sub: "Vier der siebenundzwanzig, so wie das Produkt sie meldet.",
      items: [
        {
          intro:
            "Der Konflikt aus der Änderungsmitteilung: Das Handbuch erlaubt noch, was die aktuelle Spezifikation verbietet.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Der Akku darf getauscht werden, während das Gerät in Betrieb bleibt.",
                source: "Gebrauchsanweisung, Revision 4",
              },
              {
                text: "Jede Unterbrechung der Versorgungsspannung erfordert eine vollständige Neuinitialisierung.",
                source: "Systemspezifikation, Revision F",
              },
            ],
            chip: "Widerspruch",
          },
        },
        {
          intro:
            "Ein Zahlenkonflikt, durch Arithmetik gefunden: Die Typprüfung deckte nie ab, was die Spezifikation fordert.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Kaltstart nachgewiesen bei minus 25 Grad Celsius.",
                source: "Typprüfbericht TR-118, Revision B",
              },
              {
                text: "Start spezifiziert bis minus 32 Grad Celsius.",
                source: "Systemspezifikation, Revision F",
              },
            ],
            chip: "Zahlenkonflikt",
          },
        },
        {
          intro:
            "Ein sprachübergreifender Befund: Das kroatische Servicehandbuch und das englische Datenblatt beschreiben unterschiedliche Hardware.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Jedinica sadrži jednu antenu.",
                source: "Servisni priručnik, revizija 2",
              },
              {
                text: "The unit contains two antennas.",
                source: "Product datasheet, revision D",
              },
            ],
            chip: "sprachübergreifend aufgelöst",
          },
        },
        {
          intro:
            "Eine Ablösung, als Historie erhalten: Haltbarkeit per Änderungsmitteilung geändert, und die Kette zeigt, wann sich die Annahme änderte.",
          mock: {
            kind: "chain",
            oldClaim: {
              text: "Sterile Haltbarkeit: drei Jahre.",
              source: "Kennzeichnungsspezifikation, Revision C",
            },
            newClaim: {
              text: "Sterile Haltbarkeit: zwei Jahre.",
              source: "Änderungsmitteilung CN-0142, Revision A",
            },
            note: "Abgelöst, Kette erhalten. Fragen Sie, was die Akte zu jedem früheren Datum behauptete.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Was es für Sie bedeutet",
      cards: [
        {
          title: "Auditvorbereitung in Tagen",
          text: "Der Befundbericht über exakt den Aktenumfang, signiert, mit jedem Konflikt und seinen Belegen, geht in die Design-Review-Akte.",
        },
        {
          title: "Konflikte am Entstehungstag gefunden",
          text: "Jede neue Änderungsmitteilung wird am Tag ihres Eintreffens gegen alles bereits Bekannte geprüft, nicht erst beim nächsten Audit.",
        },
        {
          title: "Historie, die Personalwechsel übersteht",
          text: "Abgelöste Aussagen behalten ihre Ketten, was die Akte zu jedem Datum behauptete, bleibt also beantwortbar.",
        },
        {
          title: "Antworten mit Quellenangaben",
          text: "Fragen Sie die Akte alles; jede Aussage in der Antwort nennt Satz, Dokument und Revision, oder sagt, dass die Akte schweigt.",
        },
      ],
      boundary:
        "Cogeto erzeugt Belege über Ihre Dokumente. Das regulatorische Urteil bleibt bei Ihrer Organisation.",
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Ist das eine regulatorische Bewertung?",
        answer:
          "Nein. Cogeto erzeugt Belege über Ihre Dokumente: was sich widerspricht, was was abgelöst hat und was sich nicht verifizieren ließ. Das regulatorische Urteil bleibt bei Ihnen.",
      },
      {
        question: "Unsere Akte ist voller Scans. Funktioniert das?",
        answer:
          "Gescannte Seiten liest lokale Erkennung in der Instanz, nichts verlässt also Ihre Grenze. Seiten, die sich nicht lesen lassen, werden namentlich gelistet, nie stillschweigend übersprungen.",
      },
      {
        question: "Unsere Dokumentation ist zweisprachig.",
        answer:
          "Subjekte werden über Sprachen hinweg aufgelöst, ein kroatisches Handbuch kann also einer englischen Spezifikation widersprechen. Die Genauigkeit wird je Sprache gemessen und veröffentlicht, Sie sehen die Qualität also vor der Entscheidung.",
      },
      {
        question: "Wer löst die Befunde auf?",
        answer:
          "Ihre Ingenieure, mit beiden Sätzen und beiden Revisionen vor sich. Cogeto macht sichtbar und dokumentiert; es entscheidet nicht, welches Dokument recht hat.",
      },
    ],
    closing: {
      sentence:
        "Schicken Sie eine Technische Dokumentation; wir liefern den signierten Befundbericht.",
      subject: "Pilotanfrage, Medizinprodukte",
    },
    chat: [
      {
        question: "Kann der Akku im laufenden Betrieb getauscht werden?",
        segments: [
          { text: "Die Gebrauchsanweisung erlaubt es.", chips: ["GA r4"] },
          {
            text: "Die aktuelle Spezifikation verbietet es: Jede Versorgungsunterbrechung erfordert eine vollständige Neuinitialisierung.",
            chips: ["Spez. rF"],
          },
        ],
        conflict: {
          text: "Konflikt: Eine Änderungsmitteilung änderte die Stromversorgungsarchitektur; das Handbuch wurde nie aktualisiert.",
          chips: ["Änderungsmitteilung"],
        },
        standsOn: ["GA r4", "Spez. rF", "Änderungsmitteilung"],
      },
      {
        question: "Wie lang war die sterile Haltbarkeit, als das März-Los ausgeliefert wurde?",
        segments: [
          {
            text: "Drei Jahre zu jenem Datum, gemäß der damals gültigen Kennzeichnungsspezifikation; seither per Änderungsmitteilung CN-0142 auf zwei Jahre verkürzt.",
            chips: ["Kennzeichnungsspez. rC", "CN-0142", "Stand März"],
          },
        ],
        standsOn: ["Kennzeichnungsspez. rC", "CN-0142"],
      },
    ],
  },

  {
    slug: "defense",
    navLabel: "Verteidigung",
    industryLabel: "Verteidigung",
    metaTitle: "Air-Gap-KI für Verteidigungsdokumentation",
    metaDescription:
      "Ein Verteidigungselektronik-Programm betrieb Cogeto vollständig air-gapped mit lokalen Modellen und erhielt zitierte Antworten aus 730 Dokumenten.",
    headline: "Fundierte Antworten, in einem Netz, das nichts verlässt",
    subhead:
      "Ein Programm der Verteidigungselektronik betreibt Cogeto vollständig offline: lokale Modelle auf Programmhardware, keine ausgehende Konnektivität, keine Telemetrie. Wenn die Dokumente es hergeben, antwortet es daraus, mit Quellenangaben.",
    heroMock: {
      claims: [
        {
          text: "Pin 7 führt die 28-Volt-Versorgung.",
          source: "Schnittstellenkontrolldokument ICD-A, Revision 3",
        },
        {
          text: "Pin 7 ist reserviert und darf nicht beschaltet werden.",
          source: "Hinweis in Kabelbaumzeichnung, Revision 1",
        },
      ],
      chip: "Widerspruch",
    },
    situation: {
      heading: "Material, das das Gebäude nicht verlassen darf",
      pains: [
        {
          title: "Gehostete Assistenten sind keine Option",
          text: "Das Material darf die Grenze nicht verlassen, und ein gehosteter Assistent ist entweder gar nicht einsetzbar oder verweigert Fragen zu Ihren eigenen Systemen.",
        },
        {
          title: "Wissen rotiert mit dem Personal hinaus",
          text: "Verwendungen wechseln, externe Kräfte laufen aus, und die Person, die wusste, warum der Kabelbaum umverdrahtet wurde, geht. Was nie aufgeschrieben wurde, ist weg; was aufgeschrieben wurde, liegt verstreut.",
        },
        {
          title: "Schnittstellendokumente, die sich leise widersprechen",
          text: "Zwei gelenkte Dokumente, zwei Verantwortliche, kein Querverweis. Die Abweichung zeigt sich bei der Integration, im teuersten möglichen Moment.",
        },
      ],
    },
    run: {
      heading: "Der Lauf",
      intro:
        "Installiert aus dem Offline-Image-Bundle. Programmdokumentation importiert innerhalb der abgeschotteten Umgebung: Spezifikationen, Schnittstellenkontrolldokumente, Zeichnungshinweise, Prüfaufzeichnungen, Protokolle.",
      steps: [
        "730 Dokumente importiert im geschlossenen Netz",
        "Lokale Modelle und Seitenerkennung auf Programmhardware",
        "Verankerung an System, Subsystem und Revision",
        "Verifikation gegen Quellsätze vor dem Speichern",
        "Nächtlicher Abgleich, alles innerhalb der Grenze",
      ],
      summaryTitle: "Die Zusammenfassung am Morgen",
      summary: [
        { label: "Dokumente gelesen", value: "730" },
        { label: "Fakten gespeichert", value: "26,412" },
        { label: "Widersprüche gefunden", value: "41" },
        { label: "Aussagen abgelöst", value: "356" },
        { label: "Extraktionen unterdrückt", value: "512" },
        { label: "ausgehende Netzwerkaufrufe", value: "0" },
      ],
    },
    findings: {
      heading: "Die Befunde",
      sub: "Drei der einundvierzig, so wie das Produkt sie meldet.",
      items: [
        {
          intro:
            "Die Integrationsfalle: Zwei Schnittstellendokumente belegen denselben Pin unterschiedlich, keines verweist auf das andere.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Pin 7 führt die 28-Volt-Versorgung.",
                source: "Schnittstellenkontrolldokument ICD-A, Revision 3",
              },
              {
                text: "Pin 7 ist reserviert und darf nicht beschaltet werden.",
                source: "Hinweis in Kabelbaumzeichnung, Revision 1",
              },
            ],
            chip: "Widerspruch",
          },
        },
        {
          intro:
            "Ein Einheitenkonflikt, durch Arithmetik gefunden: Meter gegen Fuß, verglichen, bevor irgendein Modell befragt wurde.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Maximale Einsatzhöhe: 4,600 Meter.",
                source: "Umweltspezifikation, Revision D",
              },
              {
                text: "Maximale Einsatzhöhe: 15,000 Fuß.",
                source: "Bedienerhandbuch, Revision 2",
              },
            ],
            chip: "Einheitenkonflikt",
          },
        },
        {
          intro:
            "Was das System zu speichern verweigerte: Extraktionen, die die Verifikation nicht bestanden, protokolliert statt geglaubt.",
          mock: {
            kind: "suppression",
            rows: [
              { reason: "von der Quelle nicht gestützt", count: "203" },
              { reason: "in der Quelle abgeschwächt formuliert", count: "168" },
              { reason: "nicht beurteilbare Textstelle", count: "141" },
            ],
            note: "Jede unterdrückte Extraktion wird mit Textstelle, Grund und Zeitpunkt protokolliert und im Befundbericht zusammengefasst.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Was es für Sie bedeutet",
      cards: [
        {
          title: "Verankert in Ihrem eigenen Korpus",
          text: "Wenn Ihre Dokumente es hergeben, antwortet es daraus, mit Quellenangaben. Wenn nicht, sagt es das, statt zu raten.",
        },
        {
          title: "Nichts verlässt das Netz, verifizierbar",
          text: "Genau eine Austrittsstelle für Modellaufrufe, in der CI erzwungen, gerichtet auf lokale Modelle. Der Code ist offen, Ihr Sicherheitsteam kann es also bestätigen.",
        },
        {
          title: "Wissen übersteht die Rotation",
          text: "Was aufgeschrieben wurde, bleibt mit Quellenangaben abfragbar, auch wenn der Autor das Programm längst verlassen hat.",
        },
        {
          title: "Belege für das Review",
          text: "Der signierte Befundbericht über einen definierten Dokumentumfang, erzeugt innerhalb der abgeschotteten Umgebung.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Verlässt irgendetwas das Netz?",
        answer:
          "Nein. Sprachmodelle, Embeddings, Seitenerkennung und Suche laufen vollständig in der Instanz. Es gibt keine Telemetrie, und die eine Austrittsstelle für Modellaufrufe wird in der CI erzwungen.",
      },
      {
        question: "Wie gut sind lokale Modelle im Vergleich zu gehosteten?",
        answer:
          "Gemessen, nicht behauptet: Jede Modellkonfiguration trägt ihre eigenen veröffentlichten Genauigkeitswerte, und ungetestete Kombinationen werden als nicht evaluiert markiert.",
      },
      {
        question: "Wer betreibt es?",
        answer:
          "Ihre Leute, innerhalb Ihrer Mauern. Der Installationspfad ist dokumentiert, das Operator-Skript ist öffentlich, und wir schulen Ihre Betreiber als Teil des Engagements.",
      },
    ],
    closing: {
      sentence:
        "Schicken Sie einen Dokumentenbestand oder holen Sie uns hinter Ihre Mauern; wir liefern den signierten Befundbericht.",
      subject: "Pilotanfrage, Verteidigung",
    },
    chat: [
      {
        question: "Wie lang ist die Antenne der ARK-23, Revision C?",
        segments: [
          { text: "1.2 Meter.", chips: ["ICD ARK-23 rC", "Maßzeichnung r2"] },
        ],
        standsOn: ["ICD ARK-23 rC", "Maßzeichnung r2"],
      },
      {
        question: "Wie lautet die Exportklassifizierung der ARK-23?",
        segments: [],
        silence: {
          title: "Ihre Dokumente decken das nicht ab.",
          banner: "Allgemeinwissen folgt, markiert als nicht aus Ihren Quellen.",
        },
        standsOn: [],
      },
    ],
  },

  {
    slug: "automotive-paint",
    navLabel: "Fahrzeuglackierung",
    industryLabel: "Fahrzeuglackierung",
    metaTitle: "Prozesswissen der Lackiererei, bewahrt und verifiziert",
    metaDescription:
      "Lackdokumentation, verifiziert: Konflikte bei Einbrennfenster und Mischungsverhältnis, Schichtdicken-Drift und Erfahrungswissen mit Quellenangaben.",
    headline: "Das Wissen hinter dem perfekten Finish überdauert jetzt die Menschen, die es tragen",
    subhead:
      "Ein Premium-Finish ist Handwerk in Schichten: Vorbehandlung, KTL, Füller, Basislack, Klarlack, jede mit ihrem eigenen Fenster. Ein Lackierbetrieb gab dem Prozess hinter der Oberfläche dieselbe Strenge wie der Oberfläche, und die Prozesslenkung der Lackiererei wurde prüfbar.",
    heroMock: {
      claims: [
        {
          text: "20 Minuten bei 140 Grad Celsius Objekttemperatur einbrennen.",
          source: "Technisches Datenblatt Klarlack CC-2, Revision 9",
        },
        {
          text: "18 Minuten bei 150 Grad Celsius Objekttemperatur einbrennen.",
          source: "Prozesskarte PC-31, Revision D",
        },
      ],
      chip: "Widerspruch",
    },
    situation: {
      heading: "Das Handwerk lebt in Menschen und verstreutem Papier",
      pains: [
        {
          title: "Der Meister ging in Rente",
          text: "Mit ihm ging, was kein Dokument enthält: die Winteranpassung, wenn die Luftfeuchte fällt, welcher Fehler Silikonverunreinigung bedeutet und welcher ein zu kurzes Ablüften, die Chargenreihenfolge, die Spülverluste gering hielt.",
        },
        {
          title: "Niemand weiß, welche Kopie aktuell ist",
          text: "Lieferantendatenblätter, Prozesskarten, Produktionslenkungspläne, Arbeitsanweisungen, Mischraumblätter, das Notizbuch eines Bedieners, vier Jahre alte Schulungsfoliensätze, laminierte Karten an der Station, fotografierte Whiteboards, Reihenfolgeregeln in der Tabelle eines Planers. Manches davon widerspricht dem Rest.",
        },
        {
          title: "Ein Jahr, bis die Kabine dir vertraut",
          text: "Neue Leute lernen durch Herumfragen, und Prozessingenieure erben Schritte, die niemand mehr erklären kann. Die Nacharbeitsschleife lehrt teuer, was das Papier hätte sagen sollen.",
        },
      ],
    },
    run: {
      heading: "Der Lauf",
      intro:
        "Ein Nachmittag, in dem Cogeto auf das Papier des Betriebs gerichtet wurde: Datenblätter, Prozesskarten über ihre Revisionen, Produktionslenkungspläne, Arbeitsanweisungen, Mischraumblätter, Änderungsmitteilungen und Mails der Lieferanten, Schulungsfoliensätze, Wartungsprotokolle und die Notizbuchseiten und laminierten Karten als Fotos.",
      steps: [
        "643 Dokumente importiert, darunter 151 fotografierte Seiten und Karten",
        "Fotos gelesen von lokaler Erkennung in der Instanz",
        "Fakten verankert an Lacksystem, Schicht und Revision, damit zwei Klarlacksysteme mit fast identischen Datenblättern getrennt bleiben",
        "Jede Aussage verifiziert gegen ihren eigenen Quellsatz",
        "Nächtlicher Abgleich: Datenblatt gegen Karte, Plan gegen Anweisung, Foliensatz gegen gelebte Praxis",
      ],
      summaryTitle: "Die Zusammenfassung am Morgen",
      summary: [
        { label: "Dokumente gelesen", value: "643" },
        { label: "Fakten gespeichert", value: "16,480" },
        { label: "Widersprüche gefunden", value: "24" },
        { label: "Aussagen abgelöst", value: "168" },
        { label: "Extraktionen unterdrückt", value: "297" },
        { label: "unlesbare Seiten, namentlich gelistet", value: "11" },
      ],
    },
    findings: {
      heading: "Die Befunde",
      sub: "Vier der vierundzwanzig, dazu das Abgelehnte und das Abgelöste, so wie das Produkt sie meldet.",
      items: [
        {
          intro:
            "Der Einbrennfenster-Konflikt: Eine Änderungsmitteilung zur Reformulierung verschob das Fenster und erreichte die Prozesskarte nie.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "20 Minuten bei 140 Grad Celsius Objekttemperatur einbrennen.",
                source: "Technisches Datenblatt Klarlack CC-2, Revision 9",
              },
              {
                text: "18 Minuten bei 150 Grad Celsius Objekttemperatur einbrennen.",
                source: "Prozesskarte PC-31, Revision D",
              },
            ],
            chip: "Widerspruch, erkannt am 12. Juni",
          },
        },
        {
          intro:
            "Das Mischungsverhältnis, das driftete: Das Mischraumblatt lehrt noch das alte Verhältnis; das Datenblatt ist seit zwei Revisionen weiter.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Mischung 100 : 30 : 10 nach Volumen mit Härter H-40.",
                source: "Mischraumblatt, Station 3",
              },
              {
                text: "Mischung 100 : 35 : 10 nach Volumen mit Härter H-40.",
                source: "Technisches Datenblatt Basislack B-7, Revision 11",
              },
            ],
            chip: "Konflikt, eine Seite abgelöst, erkannt am 13. Juni",
          },
        },
        {
          intro:
            "Schichtdicke, die zweierlei bedeutet, je nachdem, welchem Dokument man traut, beide noch im Umlauf.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Klarlack-Schichtdicke: 45 bis 55 Mikrometer.",
                source: "Produktionslenkungsplan, Revision F",
              },
              {
                text: "Klarlack-Schichtdicke: 40 bis 50 Mikrometer.",
                source: "Arbeitsanweisung WI-208, Revision C",
              },
            ],
            chip: "Revisionsdrift, erkannt am 12. Juni",
          },
        },
        {
          intro:
            "Die eine Zeile des Altmeisters, fotografiert, extrahiert, verifiziert, und jetzt ein zitierter Fakt mit Herkunftsnachweis statt einer Erinnerung.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Über 70 Prozent relativer Luftfeuchte 5 Prozent langsamere Verdünnung zugeben.",
                source: "Fotografierte Notizbuchseite, Mischraum",
              },
            ],
            chip: "verifiziert, Herkunft zitiert",
          },
        },
        {
          intro:
            "Die Körnungsfolge, als Ablösung aufgelöst: der alte Schulungsfoliensatz, geschlossen durch die aktuelle Anweisung, Kette intakt.",
          mock: {
            kind: "chain",
            oldClaim: {
              text: "Vor der Basislack-Reparatur mit P400 schleifen.",
              source: "Schulungsfoliensatz, 2022",
            },
            newClaim: {
              text: "Vor der Basislack-Reparatur mit P500, dann P800 schleifen.",
              source: "Arbeitsanweisung WI-214, Revision B",
            },
            note: "Abgelöst, Kette erhalten. Der Foliensatz bleibt als Historie abfragbar, nie als aktuelle Praxis.",
          },
        },
        {
          intro:
            "Was das System zu speichern verweigerte: Extraktionen, die die Verifikation nicht bestanden, protokolliert statt geglaubt.",
          mock: {
            kind: "suppression",
            rows: [
              { reason: "von der Quelle nicht gestützt", count: "118" },
              { reason: "in der Quelle abgeschwächt formuliert", count: "97" },
              { reason: "nicht beurteilbare Textstelle", count: "82" },
            ],
            note: "Jede unterdrückte Extraktion wird mit Textstelle, Grund und Zeitpunkt protokolliert und im Befundbericht zusammengefasst.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Was es für Sie bedeutet",
      cards: [
        {
          title: "Der neue Bediener fragt das Korpus",
          text: "Und bekommt die Antwort mit exakt zitiertem Datenblatt und Revision, oder ehrliches Schweigen statt einer Vermutung. Die Reihenfolgeregeln verlassen die Tabelle des Planers und werden abfragbare Fakten.",
        },
        {
          title: "Reformulierungen zeigen sich am selben Tag",
          text: "Eine Änderungsmitteilung des Lieferanten wird am Tag ihres Eintreffens gegen jede Karte und Anweisung geprüft, nicht erst nach einem Nacharbeitsanstieg im Lichttunnel.",
        },
        {
          title: "Auditvorbereitung wird ein Bericht",
          text: "Kundenbesuche und Audits beginnen mit einem signierten Befundbericht über die Lackdokumentation statt mit einer Woche Archäologie.",
        },
        {
          title: "Den nächsten Meister rechtzeitig erfassen",
          text: "Was die nächste Person weiß, die in Rente geht, lässt sich Notiz für Notiz fotografieren, verifizieren und mit Herkunftsnachweis bewahren.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Die Hälfte unseres Prozesswissens sind handschriftliche Notizen und laminierte Karten.",
        answer:
          "Fotos liest lokale Erkennung in der Instanz. Seiten, die sich nicht lesen lassen, werden ehrlich gekennzeichnet und namentlich gelistet, nie stillschweigend übersprungen.",
      },
      {
        question: "Unsere Dokumentation ist zweisprachig, in einem Betrieb.",
        answer:
          "Subjekte werden über Sprachen hinweg aufgelöst, ein Datenblatt in der einen Sprache kann also einer Karte in der anderen widersprechen. Die Qualität wird je Sprache gemessen und veröffentlicht, Sie sehen sie also vor der Entscheidung.",
      },
      {
        question: "Nichts darf das Werksnetz verlassen.",
        answer:
          "Cogeto läuft vollständig offline mit lokalen Modellen. Es gibt genau eine Austrittsstelle im Code, in der CI erzwungen, und der Code ist offen, Ihr Team kann es also verifizieren.",
      },
      {
        question: "Unsere Bediener werden keine Dokumentation tippen.",
        answer:
          "Müssen sie nicht. Ein Foto oder eine weitergeleitete Mail genügt, und eine Zeile im Chat wird ein verifizierter Fakt mit Herkunftsnachweis.",
      },
    ],
    closing: {
      sentence:
        "Schicken Sie die Prozesskarten, Datenblätter und Anweisungen für eine Linie oder ein Lacksystem; wir liefern den signierten Befundbericht, der zeigt, wo sie sich widersprechen.",
      subject: "Pilotprojekt Lackiererei",
    },
    chat: [
      {
        question: "Wie lautet das Einbrennfenster für den Klarlack CC-240?",
        segments: [
          {
            text: "20 Minuten bei 140 Grad Celsius Objekttemperatur.",
            chips: ["TDS CC-240 r7"],
          },
        ],
        conflict: {
          text: "Konflikt: Prozesskarte PC-31 r3 zeigt noch 18 Minuten bei 150 Grad, das Fenster vor der Reformulierung.",
          chips: ["Prozesskarte r3", "Änderungsmitteilung CN-58"],
        },
        standsOn: ["TDS CC-240 r7", "Prozesskarte r3", "Änderungsmitteilung CN-58"],
      },
      {
        question: "Wann wechseln wir auf die langsamere Verdünnung?",
        segments: [
          {
            text: "Über 70 Prozent relativer Luftfeuchte 5 Prozent langsamere Verdünnung zugeben.",
            chips: ["Fotografierte Notiz, Mischraum"],
          },
        ],
        standsOn: ["Fotografierte Notiz, Mischraum"],
      },
    ],
  },
  {
    slug: "engineering-teams",
    navLabel: "Entwicklungsteams",
    industryLabel: "Entwicklungsteams",
    metaTitle: "Eine Wissensbasis, die sich selbst belegt",
    metaDescription:
      "Dokumentationsdrift, gemessen: Ein Industrieelektronik-Team ließ 486 Dokumente samt vierzig Datenblättern durch Cogeto laufen und fand 33 Widersprüche.",
    headline: "Das Wiki, die Datenblätter und die Wahrheit",
    subhead:
      "Ein Team der Industrieelektronik richtete Cogeto auf alles: das Wiki, dem niemand traut, eine Familie von vierzig fast identischen Datenblättern und die Entscheidungsthreads. Jetzt antwortet das Korpus mit Quellenangaben, und die Drift hat Namen.",
    heroMock: {
      claims: [
        {
          text: "Das Gehäuse ist in Schutzart IP54 ausgeführt.",
          source: "Internes Wiki, Hardware-Seite",
        },
        {
          text: "Schutzart: IP65.",
          source: "Produktdatenblatt, Revision 7",
        },
      ],
      chip: "Widerspruch",
    },
    situation: {
      heading: "Dokumentationsdrift, ungemessen",
      pains: [
        {
          title: "Das Wiki, dem niemand traut",
          text: "Drei Leute haben es seit 2022 bearbeitet. Alle vermuten, dass es irgendwo falsch ist; niemand weiß, wo, also fragt jeder lieber wieder einen Kollegen.",
        },
        {
          title: "Vierzig Datenblätter, gemeinsame Textbausteine",
          text: "Fast identische Varianten, die sich in Zahlen unterscheiden, die niemand auswendig nennen kann. Copy-and-paste hält die Textbausteine konsistent und die Unterschiede unsichtbar.",
        },
        {
          title: "Einarbeitung durch Herumfragen",
          text: "Entscheidungen leben in Threads und Köpfen. Der erste Monat eines neuen Ingenieurs vergeht damit herauszufinden, welchem Dokument zu misstrauen ist.",
        },
      ],
    },
    run: {
      heading: "Der Lauf",
      intro:
        "Ein Massenimport: der Wiki-Export, die Datenblattfamilie, Designnotizen und die archivierten Entscheidungsthreads.",
      steps: [
        "486 Dokumente in einem Vorgang importiert",
        "Datenblätter je Variante verankert, gemeinsame Textbausteine bleiben getrennt",
        "Wiki-Seiten und Threads als Quellen mit Datum gelesen",
        "Verifikation gegen Quellsätze vor dem Speichern",
        "Nächtlicher Abgleich, Variante gegen Variante, Wiki gegen Datenblatt",
      ],
      summaryTitle: "Die Zusammenfassung am Morgen",
      summary: [
        { label: "Dokumente gelesen", value: "486" },
        { label: "Fakten gespeichert", value: "12,905" },
        { label: "Widersprüche gefunden", value: "33" },
        { label: "Aussagen abgelöst", value: "189" },
        { label: "Extraktionen unterdrückt", value: "264" },
        { label: "unlesbare Seiten, namentlich gelistet", value: "5" },
      ],
    },
    findings: {
      heading: "Die Befunde",
      sub: "Drei der dreiunddreißig, so wie das Produkt sie meldet.",
      items: [
        {
          intro: "Das Wiki gegen das Datenblatt: die Drift, die alle vermuteten, beim Namen genannt.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Das Gehäuse ist in Schutzart IP54 ausgeführt.",
                source: "Internes Wiki, Hardware-Seite",
              },
              {
                text: "Schutzart: IP65.",
                source: "Produktdatenblatt, Revision 7",
              },
            ],
            chip: "Widerspruch",
          },
        },
        {
          intro:
            "Variante gegen Variante: Die Verankerung hält vierzig Datenblätter getrennt, ein echter Unterschied ist also ein Befund, kein Rauschen.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Maximale Umgebungstemperatur: 70 Grad Celsius.",
                source: "Datenblatt, Modell K-240, Revision 3",
              },
              {
                text: "Maximale Umgebungstemperatur: 60 Grad Celsius.",
                source: "Datenblatt, Modell K-240, Revision 4",
              },
            ],
            chip: "Revisionsdrift",
          },
        },
        {
          intro: "Der signierte Bericht, den das Team mit dem Quartalsreview ablegt.",
          mock: {
            kind: "report",
            lines: [
              "Korpusumfang: 486 Dokumente, ausdrücklich ausgewählt",
              "33 Widersprüche, jeder mit beiden Sätzen und Revisionen",
              "189 Ablösungen mit ihren Ketten, 264 Unterdrückungen zusammengefasst",
            ],
          },
        },
      ],
    },
    outcomes: {
      heading: "Was es für Sie bedeutet",
      cards: [
        {
          title: "Eine Wissensbasis, die sich selbst belegt",
          text: "Jede Antwort zitiert Satz und Dokument, oder sagt, dass das Korpus schweigt. Vertrauen hört auf, ein Gefühl zu sein.",
        },
        {
          title: "Drift am Tag ihres Entstehens gefunden",
          text: "Eine Wiki-Änderung, die einem Datenblatt widerspricht, ist ein Befund am selben Tag, keine Legende, die sich ein Jahr lang verbreitet.",
        },
        {
          title: "Einarbeitung aus dem Korpus",
          text: "Neue Ingenieure fragen das Korpus und bekommen Quellenangaben, statt einen Monat zu lernen, welchen Dokumenten zu misstrauen ist.",
        },
        {
          title: "Varianten bleiben ehrlich",
          text: "Vierzig fast identische Datenblätter bleiben je Variante getrennt, der Vertriebsingenieur, der ein Modell anbietet, bekommt also nie die Zahlen eines anderen.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Unsere Dokumentation ist ehrlich gesagt ein Durcheinander. Ist das ein Problem?",
        answer:
          "Es ist der Punkt. Je unordentlicher das Korpus, desto wichtiger sind Verifikationsschranke und Unterdrückungsprotokoll: Was sich nicht verifizieren lässt, wird protokolliert, nicht geglaubt.",
      },
      {
        question: "Wer behebt die Befunde?",
        answer:
          "Sie, mit beiden Sätzen vor sich. Befunde erscheinen an der Quelle, in Antworten und im Bericht; es gibt keine Warteschlange zu hüten.",
      },
      {
        question: "Steht das Wiki über dem Datenblatt oder umgekehrt?",
        answer:
          "Keins von beiden. Ein Konflikt zeigt beide Seiten mit Datum und Revision. Ein Mensch entscheidet; Ihre Bestätigung steht danach über dem Urteil der Maschine.",
      },
    ],
    closing: {
      sentence:
        "Schicken Sie uns den Wiki-Export und den Datenblattordner; wir liefern den signierten Befundbericht.",
      subject: "Pilotanfrage, Entwicklung",
    },
    chat: [
      {
        question: "Welche Datenblätter zeigen noch den alten Ruhestrom?",
        segments: [
          {
            text: "Zwei Varianten führen noch 120 Mikroampere: K-241 r2 und K-244 r1. Der aktuelle Wert ist 85 Mikroampere seit r3.",
            chips: ["K-241 r2", "K-244 r1", "K-240 r3, löst ab"],
          },
        ],
        standsOn: ["K-241 r2", "K-244 r1", "K-240 r3"],
      },
      {
        question: "Ist das Gehäuse IP54 oder IP65?",
        segments: [{ text: "IP65.", chips: ["Datenblatt r7"] }],
        conflict: {
          text: "Konflikt: Die Wiki-Hardware-Seite sagt noch IP54, markiert und verknüpft.",
          chips: ["Wiki-Seite"],
        },
        standsOn: ["Datenblatt r7", "Wiki-Seite"],
      },
    ],
  },
];

export const csShared = {
  situationKicker: "Die Ausgangslage",
  runKicker: "Der Lauf",
  findingsKicker: "Die Befunde",
  outcomesKicker: "Was es für Sie bedeutet",
  faqKicker: "Erste Fragen",
  chatKicker: "Dann fragen Sie.",
  readCta: "Fallstudie lesen",
  indexCtaSub: "Schicken Sie einen Dokumentenbestand; wir liefern den signierten Befundbericht.",
  deploymentHeading: "Betreiben Sie es dort, wo Ihr Material liegt",
  closingHeading: "Starten Sie ein Pilotprojekt auf Ihren Dokumenten.",
  closingCta: "Pilot starten",
  siblingsHeading: "Weitere Fallstudien",
  proofLinks: [
    { label: "Die veröffentlichte Genauigkeit", href: "/trust" },
    { label: "Sicherheit und Souveränität", href: "/security" },
    { label: "Das Whitepaper", href: "/whitepaper" },
  ],
  contactEmail: "ivan@cogeto.eu",
  chatUi: {
    header: "CHAT",
    you: "SIE",
    remember: "MERKEN",
    fromMemory: "COGETO · AUS IHREM GEDÄCHTNIS",
    thinking: "Antwort aus Ihrem Gedächtnis...",
    standsOn: "GESTÜTZT AUF",
    placeholder: "Fragen Sie Ihr Gedächtnis...",
    hint: "Enter zum Senden · Shift+Enter für eine neue Zeile · jede Aussage zeigt, worauf sie sich stützt",
  },
};
