/**
 * Croatian copy for /trust. Mirrors content/en/trust.ts; only string values
 * are translated.
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
  /** Release picker label and the badge on the newest entry. */
  releaseLabel: string;
  latestBadge: string;
  /** The compare-by control and its four modes. */
  compareLabel: string;
  compareNone: string;
  compareReleases: string;
  compareModels: string;
  compareLanguages: string;
  compareHint: string;
  /** Two-way comparison delta column heading and percentage-point unit. */
  deltaHeading: string;
  pointsUnit: string;
  /** Screen-reader tag on the best value in a side-by-side row. */
  highestLabel: string;
  /** A metric published as null: the run had no cases to measure. */
  noCasesLabel: string;
  /** Cell and hint templates around data a release does not carry. */
  notMeasuredInLabel: string;
  configCoverageNote: string;
  v11Note: string;
  viewReleaseCta: string;
  /** Table and chat labels that previously lived hardcoded in markup. */
  metricColLabel: string;
  casesPassLabel: string;
  failingCasesLabel: string;
  releaseNotesHeading: string;
  measuredAtLabel: string;
}

export const trust: TrustContent = {
  eyebrow: "Rezultati točnosti",
  title: "Izmjerena točnost Cogeta, po izdanju",
  thesis:
    "Cogeto za svako izdanje objavljuje vlastitu izmjerenu točnost, jednako kao što servis objavljuje dostupnost, uključujući brojeve koji ne dosežu ciljeve. Ovdje su brojevi, a ovdje su i javne podatkovne datoteke iza njih. Ne vjerujte ovom grafikonu: provjerite datoteku.",
  currentHeading: "Trenutačni rezultati",
  currentIntro:
    "Kvaliteta ekstrakcije i usklađivanja za odabranu konfiguraciju modela i jezik, izmjerena na ručno označenom zlatnom korpusu.",
  configLabel: "Konfiguracija modela",
  languageLabel: "Jezik",
  languageNames: {
    en: "Engleski",
    hr: "Hrvatski",
    aggregate: "Zbirno",
  },
  aggregateNote:
    "Zbirni prikaz spaja korpuse po jezicima. Prikazan je zato da se slabiji jezik nikad ne može sakriti u prosjeku: prebacite odabir i pročitajte svaki jezik zasebno.",
  gatesNote:
    "Svaki prag postavljen je na iskrenu trenutačnu vrijednost metrike, nikad na cilj koji projekt nije dosegnuo, i pragovi se pomiču samo naviše. Vrijede po jeziku kao i zbirno, pa se prag koji ovdje vidite mijenja s jezikom koji odaberete.",
  trendsHeading: "Trendovi",
  trendsIntro:
    "Deset najnovijih izdanja od linije v1 nadalje, od najstarijeg do najnovijeg, na iskrenoj osi od 0 do 100 posto. Cjelovita povijest ostaje objavljena u repozitoriju. Isprekidana linija prag je kontinuirane integracije koji izdanje mora prijeći da bi izašlo.",
  chatHeading: "Razgovorni skup",
  chatIntro:
    "Cjeloviti slučajevi pitanja i odgovora. Prolaz znači da je odgovor bio utemeljen na pravim činjenicama iz korpusa. Identifikatori palih slučajeva objavljuju se, ne skrivaju.",
  provenanceHeading: "Podrijetlo",
  provenanceIntro:
    "Svako izdanje, s točnim commitom na kojem je mjereno, verzijom mjernog okvira, veličinama korpusa i izravnom poveznicom na njegovu nepromjenjivu JSON datoteku. Objavljene datoteke nikad se ne uređuju nakon izdanja. Čitajte podatke, ne naš sažetak podataka.",
  gateLabel: "CI prag",
  backfilledLabel: "Naknadno uneseno",
  backfilledNote:
    "Prepisano iz zabilježenih mjerenja, a ne izdano iz mjernog okvira u trenutku izdanja.",
  metrics: {
    extraction_precision: {
      label: "Preciznost ekstrakcije",
      explainer:
        "Od činjenica koje je Cogeto izvukao iz izvora, udio točnih. Visoka preciznost znači malo izmišljenih ili pogrešnih činjenica u memoriji, a to je najvažnije jer je pohranjena neistina trajna.",
    },
    extraction_recall: {
      label: "Odziv ekstrakcije",
      explainer:
        "Od činjenica koje bi pažljiv čovjek izvukao iz izvora, udio koji je Cogeto pronašao. Visok odziv znači malo propuštenih činjenica, a to je propust koji čitatelj najprije primijeti.",
    },
    verification_agreement: {
      label: "Slaganje provjere",
      explainer:
        "Koliko se često neovisni provjerni prolaz slagao s ljudskom oznakom o tome podupire li izvor doista tvrdnju. Ulazna kontrola mora i sama biti pouzdana prije nego što njezine presude odlučuju što ulazi u aktivnu memoriju.",
    },
    dedup_accuracy: {
      label: "Točnost uklanjanja duplikata",
      explainer:
        "Koliko dobro usklađivanje spaja duplicirane činjenice, a da ne spoji dvije doista različite. Pogrešna spajanja kažnjavaju se strože od propuštenih, jer pogrešno spajanje uništava zasebnu činjenicu.",
    },
    contradiction_precision: {
      label: "Preciznost proturječnosti",
      explainer:
        "Od proturječnosti koje je Cogeto označio, udio stvarnih sukoba. Objavljuje se od sheme 1.1. Preciznost i odziv objavljuju se zajedno jer se svaki od njih zasebno može izigrati: označite sve i odziv je savršen, ne označite ništa i preciznost jest.",
    },
    contradiction_recall: {
      label: "Odziv proturječnosti",
      explainer:
        "Od stvarnih proturječnosti među činjenicama, udio koji je Cogeto označio. Detekcija povezuje obje tvrdnje s objema izvornim rečenicama i datumom, pa se svaka oznaka može provjeriti prema dokazima.",
    },
    supersedes_accuracy: {
      label: "Točnost zamjena",
      explainer:
        "Ispravne odluke o zamjeni, i presuda i smjer, nad parovima u kojima je zamjena bila u pitanju. Broj parova objavljuje se uz stopu, jer stopa izračunata nad jednim slučajem ne znači ništa, prošla ili pala.",
    },
    rewrite_accuracy: {
      label: "Točnost usmjeravanja preoblikovanih upita",
      explainer:
        "Udio prolaznih slučajeva usmjeravanja preoblikovanih upita: usmjeravanje namjere, razrješavanje zamjenica i elipsa te vremenska klasifikacija. To je korak koji pitanje pretvara u pravu pretragu, pa se njegove pogreške vide kao pogrešni ili izostali odgovori.",
    },
  },
  pairsLabel: "parova",
  notAvailable: "nije mjereno",
  checkFileCta: "Otvorite JSON datoteku",
  goldenCorpusCta: "Pregledajte zlatni korpus",
  schemaCta: "Pročitajte shemu podataka",
  backHome: "Natrag na cogeto.eu",
  currentReleaseLabel: "Trenutačno izdanje",
  complianceLinkLabel: "Jednostranični sažetak usklađenosti",
  sourceLinkLabel: "Izvorni kod na GitHubu",
  dataCta: "Pročitajte podatke na GitHubu",
  goldenCasesStatLabel: "ručno označenih zlatnih slučajeva iza brojeva",
  unavailableTitle: "Rezultati točnosti upravo se osvježavaju",
  unavailableBody:
    "Objavljene podatke trenutačno nije moguće pročitati. Ova se stranica sama ažurira iz repozitorija proizvoda unutar sat vremena. Vratite se uskoro ili pročitajte datoteke izravno na GitHubu.",
  releaseLabel: "Izdanje",
  latestBadge: "najnovije",
  compareLabel: "Usporedba",
  compareNone: "Pojedinačni prikaz",
  compareReleases: "Izdanja",
  compareModels: "Modeli",
  compareLanguages: "Jezici",
  compareHint: "Odaberite do tri za čitanje jedno uz drugo.",
  deltaHeading: "Promjena",
  pointsUnit: "p. b.",
  highestLabel: "najviše",
  noCasesLabel: "nema slučajeva u ovom mjerenju",
  notMeasuredInLabel: "Nije mjereno u {version}",
  configCoverageNote:
    "{config} je mjerena u {n} od {m} učitanih izdanja, prvi put u {version}.",
  v11Note:
    "Preciznost proturječnosti, točnost zamjena i točnost usmjeravanja preoblikovanih upita objavljuju se od sheme 1.1, prvi put mjerene u {version}.",
  viewReleaseCta: "Prikaži {version}",
  metricColLabel: "Metrika",
  casesPassLabel: "slučajeva prolazi",
  failingCasesLabel: "Identifikatori palih slučajeva:",
  releaseNotesHeading: "Bilješke iz izdanja",
  measuredAtLabel: "Mjereno pri izdanju",
};
