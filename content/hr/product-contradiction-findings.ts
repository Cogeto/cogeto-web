/**
 * Croatian copy for /product/contradiction-findings. Mirrors
 * content/en/product-contradiction-findings.ts; only string values are
 * translated.
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
  metaTitle: "Nalazi proturječnosti",
  metaDescription:
    "Cogeto neprekidno uspoređuje vaše dokumente i javlja gdje se ne slažu: obje tvrdnje, obje izvorne rečenice, oba dokumenta s revizijama i datum otkrivanja.",
  eyebrow: "Proizvod",
  headline: "Pronađite neslaganje prije audita",
  lede:
    "Vaš priručnik, vaša specifikacija, vaša ispitna izvješća i vaša pošta ne slažu se u potpunosti. Cogeto ih sve uspoređuje, neprekidno, i svako neslaganje prijavljuje s priloženim dokazima. Značajka koju nitko drugi ne isporučuje.",
  heroMock: "finding-battery",
  bands: [
    {
      heading: "Svaki nalaz stiže s dokazima",
      advantage:
        "Nikad ne jurite za neodređenim upozorenjem. Nalaz nosi obje tvrdnje, obje doslovne izvorne rečenice, oba dokumenta s revizijama i mjestima, datum otkrivanja i status razrješenja.",
      mechanism:
        "Nalaz je dokaz, a ne obavijest: sve što je potrebno za njegovu prosudbu priloženo mu je.",
      mock: "finding-cold",
    },
    {
      heading: "Brojčani sukobi ne mogu se sakriti",
      advantage:
        "3.2 mm naspram 3.4 mm, pedeset tisuća naspram 50,000, ožujak naspram Q1: uhvaćeno aritmetikom, a ne prepušteno raspoloženju modela.",
      mechanism:
        "Količine, jedinice i datumi uspoređuju se deterministički prije nego što se ijedan model pita. Sudac vidi samo parove koji prežive.",
      mock: "numeric",
    },
    {
      heading: "Jedna tvrtka pod dva imena jedna je tvrtka",
      advantage:
        "Hrvatska poruka može proturječiti engleskoj specifikaciji, jer se predmeti razrješavaju preko alijasa, tipfelera i jezika prije usporedbe.",
      mechanism:
        "Zamjena je odvojena od proturječnosti: novija revizija zatvara staru činjenicu samo kad se vremenska crta slaže, inače vidite sukob.",
      mock: "alias",
    },
    {
      heading: "Isplivaju ondje gdje radite, nikad u redu čekanja",
      advantage:
        "Nalazi se pojavljuju na izvoru koji ih je proizveo, u svakom odgovoru koji citira bilo koju stranu i u potpisanom izvješću. Nema popisa zadataka, jer proizvod koji stvara domaću zadaću ne koristi se.",
      link: { label: "Potpisano izvješće o nalazima", href: "/product/findings-report" },
      mock: "answer-conflict",
    },
  ],
  statNote:
    "Uživo iz objavljenih rezultata točnosti po izdanju, zbirno za engleski i hrvatski. Svaki broj vodi na svoju javnu podatkovnu datoteku na stranici s rezultatima točnosti.",
  gridHeading: "Što nalaze drži pouzdanima",
  grid: [
    {
      title: "Evidencija provjerenih parova",
      text: "Par prosuđen kao usklađen ne pita se ponovno dok se neka činjenica ne promijeni, pa granični parovi ne mogu zbog varijance modela skliznuti u sukobe.",
    },
    {
      title: "Datumi otkrivanja",
      text: "Svaki nalaz nosi datum pojave, pa izvješće može reći kada je sukob ušao u zapis.",
    },
    {
      title: "Jedna radnja po prolazu",
      text: "Po činjenici i prolazu poduzima se najviše jedna radnja, pa se jedan unos ne može kaskadno proširiti korpusom.",
    },
    {
      title: "Preciznost i odziv, oboje objavljeno",
      text: "Svaki se zasebno može izigrati: označite sve i odziv je savršen, ne označite ništa i preciznost jest. Oboje je javno, po izdanju.",
    },
  ],
  objection: {
    heading: "Zašto vaša sadašnja umjetna inteligencija ovo ne hvata",
    paragraphs: [
      "Alati za dohvat pronalaze; oni ne usklađuju. Pitajte asistenta o bateriji i vratit će odlomak koji je odgovarao vašoj formulaciji, samouvjereno, a da ga nikad nije usporedio s ičim drugim.",
      "Ne radi ni lijepljenje svega u velik kontekstni prozor: modeli dugačke ulaze čitaju neravnomjerno, pa dobijete neke sukobe, svaki put drugačije, bez zapisa o tome što je uspoređeno. Svako je neslaganje jeftino ispraviti na dan pojave, a skupo otkriti tijekom audita, opoziva ili spora s kupcem.",
    ],
  },
  cta: {
    heading: "Pogledajte što se u vašim dokumentima ne slaže.",
    sub: "Pilot pročita vaš stvaran skup dokumenata i završava potpisanim izvješćem o nalazima.",
    secondary: { label: "Kako se memorija provjerava", href: "/product/verified-memory" },
  },
};
