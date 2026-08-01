/**
 * German copy for /whitepaper. Mirrors content/en/whitepaper.ts: same
 * exported symbols, only string values translated. The paper title,
 * subtitle, DOI, and citation stay verbatim: they name the real,
 * English-language artifact on Zenodo and must remain verifiable.
 */

export const whitepaperMeta = {
  paperTitle:
    "Cogeto: A Verifiable, Sovereignty-First Memory Architecture for Large Language Model Assistants",
  paperSubtitle:
    "Design and mechanisms of a private, EU-hosted system for correctable long-term memory, corpus-level contradiction detection, and provable deletion",
  authorLine: "Ivan Golubic",
  affiliationLine:
    "MVT Solutions Group d.o.o. und MCTO Advisory d.o.o., Kroatien, Europäische Union",
  dateLine: "Arbeitspapier, 29. Juli 2026",
  statusChip: "Arbeitspapier",
  file: "/documents/cogeto-whitepaper.pdf",
  downloadCta: "PDF herunterladen",
  doi: "10.5281/zenodo.21702858",
  doiUrl: "https://doi.org/10.5281/zenodo.21702858",
  recordLabel: "Permanenter Eintrag auf Zenodo",
  citationHeading: "Zitieren",
  citation:
    "Golubic, I. (2026). Cogeto: A verifiable, sovereignty-first memory architecture for large language model assistants (v1). Zenodo. https://doi.org/10.5281/zenodo.21702858",
  citationLicense: "Veröffentlicht unter Creative Commons Attribution 4.0.",
  copyCitationLabel: "Zitat kopieren",
  copiedLabel: "Kopiert",
  closingHeading: "Das Papier begründet es. Das Pilotprojekt zeigt es.",
} as const;

export const whitepaper = {
  metaTitle: "Whitepaper",
  metaDescription:
    "Das Cogeto-Whitepaper: Verifikation vor dem Speichern, Widerspruchserkennung, belegbare Löschung, gemessene Genauigkeit. DOI 10.5281/zenodo.21702858.",
  eyebrow: "Whitepaper",
  headline: "Die Architektur, vollständig begründet",
  lede:
    "Das Whitepaper legt das Design und seine Begründung dar: warum Vertrauen in maschinelles Gedächtnis belegt statt behauptet werden muss und wie jede Vertrauensaussage in Cogeto durch ein Artefakt gedeckt ist, das Sie einsehen können.",
  argument: {
    heading: "Das Argument",
    paragraphs: [
      "Die Gedächtnisschichten heutiger KI-Assistenten sind typischerweise undurchsichtige Sammelbecken: Sie erinnern sich, aber sie können nicht zeigen, was sie erinnern, warum sie es glauben, ob es noch stimmt, ob zwei ihrer eigenen Quellen einander widersprechen oder ob je wirklich etwas gelöscht wurde. Für Organisationen unter den Datenschutz- und KI-Regeln der Europäischen Union ist diese Undurchsichtigkeit disqualifizierend.",
      "Die Antwort des Papiers ist eine Architektur, in der jede Vertrauensaussage durch ein einsehbares Artefakt gedeckt ist, und sein Schlussargument ist die Position, auf der dieses Produkt aufbaut: Verifizierbarkeit, nicht Kapazität, macht maschinelles Gedächtnis vertrauenswürdig.",
    ],
  },
  covers: {
    heading: "Was das Papier behandelt",
    items: [
      {
        title: "Atomare Fakten mit Herkunftsnachweis",
        text: "Gedächtnis als diskrete, quellenverknüpfte Fakten: eine wörtliche Textstelle, ein verankertes Subjekt, ein expliziter Status, ein Gültigkeitszeitraum.",
      },
      {
        title: "Verifikation vor dem Speichern",
        text: "Jeder Kandidat wird von einem unabhängigen Durchgang gegen seine eigene zitierte Textstelle geprüft, bevor er zählt.",
      },
      {
        title: "Das Unterdrückungsprotokoll",
        text: "Nicht gestützte Kandidaten werden automatisch aufgelöst und in einem einsehbaren Protokoll erfasst, nicht zur Sichtung aufgestaut.",
      },
      {
        title: "Korpusweiter Abgleich",
        text: "Entitäten über Aliasse und Sprachen hinweg aufgelöst, Mengen arithmetisch verglichen, Urteile für Stabilität persistiert.",
      },
      {
        title: "Ehrliches Retrieval",
        text: "Fusionierte Suche mit Sichtbarkeit als Vorbedingung, Auffächerung bei Mehrdeutigkeit, und unbeantwortbare Fragen werden als unbeantwortet erklärt.",
      },
      {
        title: "Belegbare Löschung",
        text: "Ein Protokoll kompensierender Transaktionen, das in einer signierten, hash-verketteten Quittung endet, jede Nacht neu geprüft.",
      },
      {
        title: "Das souveräne Gateway",
        text: "Standardmäßig ein europäischer Anbieter, vollständig lokale Modelle wo nötig, sensible Entitäten vor jedem Aufruf pseudonymisiert.",
      },
      {
        title: "Gemessene Genauigkeit",
        text: "Die Evaluationsmethodik hinter den je Release veröffentlichten Genauigkeitswerten, einschließlich der wenig schmeichelhaften.",
      },
    ],
  },
};
