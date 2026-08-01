/**
 * Croatian copy for /whitepaper. Mirrors content/en/whitepaper.ts; only
 * string values are translated. The paper title, subtitle, DOI, and the
 * citation string stay verbatim: they name the real published artifact.
 */

export const whitepaperMeta = {
  paperTitle:
    "Cogeto: A Verifiable, Sovereignty-First Memory Architecture for Large Language Model Assistants",
  paperSubtitle:
    "Design and mechanisms of a private, EU-hosted system for correctable long-term memory, corpus-level contradiction detection, and provable deletion",
  authorLine: "Ivan Golubic",
  affiliationLine:
    "MVT Solutions Group d.o.o. i MCTO Advisory d.o.o., Hrvatska, Europska unija",
  dateLine: "Radni dokument, 29. srpnja 2026.",
  statusChip: "Radni dokument",
  file: "/documents/cogeto-whitepaper.pdf",
  downloadCta: "Preuzmite PDF",
  doi: "10.5281/zenodo.21702858",
  doiUrl: "https://doi.org/10.5281/zenodo.21702858",
  recordLabel: "Trajni zapis na Zenodu",
  citationHeading: "Citirajte ga",
  citation:
    "Golubic, I. (2026). Cogeto: A verifiable, sovereignty-first memory architecture for large language model assistants (v1). Zenodo. https://doi.org/10.5281/zenodo.21702858",
  citationLicense: "Objavljeno pod licencijom Creative Commons Imenovanje 4.0.",
  copyCitationLabel: "Kopirajte citat",
  copiedLabel: "Kopirano",
  closingHeading: "Rad to obrazlaže. Pilot to pokazuje.",
} as const;

export const whitepaper = {
  metaTitle: "Pregledni članak",
  metaDescription:
    "Pregledni članak Cogeta: provjerljiva memorijska arhitektura, provjera prije pohrane, detekcija proturječnosti na razini korpusa i dokazivo brisanje.",
  eyebrow: "Pregledni članak",
  headline: "Arhitektura, obrazložena u cijelosti",
  lede:
    "Pregledni članak iznosi dizajn i njegove razloge: zašto povjerenje u strojnu memoriju mora biti potkrijepljeno dokazima, a ne ustvrđeno, i kako je svaka tvrdnja o povjerenju u Cogetu poduprta artefaktom koji možete pregledati.",
  argument: {
    heading: "Argument",
    paragraphs: [
      "Memorijski slojevi uz AI asistente obično su neprozirni akumulatori: pamte, ali ne mogu pokazati što pamte, zašto u to vjeruju, vrijedi li još, proturječe li si dva njihova izvora ni je li išta ikad doista obrisano. Za organizacije koje posluju pod propisima Europske unije o zaštiti podataka i umjetnoj inteligenciji ta je neprozirnost diskvalificirajuća.",
      "Odgovor rada jest arhitektura u kojoj je svaka tvrdnja o povjerenju poduprta artefaktom koji se može pregledati, a njegov završni argument jest stav na kojem je ovaj proizvod izgrađen: provjerljivost, a ne kapacitet, svojstvo je koje strojnu memoriju čini vrijednom povjerenja.",
    ],
  },
  covers: {
    heading: "Što rad obuhvaća",
    items: [
      {
        title: "Atomarne činjenice s podrijetlom",
        text: "Memorija kao diskretne činjenice povezane s izvorom: doslovan isječak, usidren predmet, izričit status, interval valjanosti.",
      },
      {
        title: "Provjera prije pohrane",
        text: "Svaki se kandidat prosuđuje prema vlastitom citiranom isječku u neovisnom prolazu prije nego što se počne računati.",
      },
      {
        title: "Dnevnik potiskivanja",
        text: "Nepotkrijepljeni kandidati razrješavaju se automatski i bilježe u pregledan dnevnik, a ne stavljaju u red za ručnu obradu.",
      },
      {
        title: "Usklađivanje na razini korpusa",
        text: "Entiteti razriješeni preko alijasa i jezika, količine uspoređene aritmetički, presude pohranjene radi stabilnosti.",
      },
      {
        title: "Iskren dohvat",
        text: "Kombinirano pretraživanje s vidljivošću kao preduvjetom, grananje kod višeznačnosti i pitanja bez odgovora proglašena neodgovorenima.",
      },
      {
        title: "Dokazivo brisanje",
        text: "Protokol kompenzacijskih transakcija koji završava potpisanom potvrdom povezanom hash lancem, ponovno provjeravanom svake noći.",
      },
      {
        title: "Suvereni pristupnik",
        text: "Europski pružatelj kao zadani izbor, potpuno lokalni modeli gdje je potrebno, osjetljivi entiteti pseudonimizirani prije svakog poziva.",
      },
      {
        title: "Izmjerena točnost",
        text: "Metodologija vrednovanja iza objavljenih rezultata točnosti po izdanju, uključujući i one nelaskave.",
      },
    ],
  },
};
