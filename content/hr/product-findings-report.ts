import type { ZPageContent } from "./product-contradiction-findings";

/**
 * Croatian copy for /product/findings-report. Mirrors
 * content/en/product-findings-report.ts; only string values are translated.
 */
export const findingsReport: ZPageContent = {
  metaTitle: "Izvješće o nalazima",
  metaDescription:
    "Jedan klik izrađuje potpisano izvješće o nalazima nad odabranim izvorima: svaka proturječnost s dokazima, svaka zamijenjena tvrdnja s lancem. PDF i JSON.",
  eyebrow: "Proizvod",
  headline: "Dokazi koje možete proslijediti, a ne zapisnici koje prepisujete",
  lede:
    "Jedan klik izrađuje izvješće o nalazima nad dokumentima koje odaberete: svaka proturječnost s dokazima, svaka zamijenjena tvrdnja s lancem i sažetak onoga što je provjera odbila. Potpisano, pa treća strana može provjeriti da nije mijenjano.",
  heroMock: "report",
  bands: [
    {
      heading: "Auditor dobiva dokaze, a ne sažetke",
      advantage:
        "Svaka proturječnost dolazi s objema tvrdnjama, objema doslovnim izvornim rečenicama, dokumentom s revizijom i mjestom za svaku stranu, datumom otkrivanja i statusom razrješenja.",
      mechanism:
        "Zamijenjene činjenice dolaze sa svojim lancima, a sažetak potisnutih činjenica čini odbijeno dijelom zapisa.",
      mock: "finding-cold",
    },
    {
      heading: "Potpis pokriva definiran opseg",
      advantage:
        "Izvješće se uvijek izrađuje nad izričito odabranim skupom izvora, pa je ono što je pregledano dio zapisa, a ne pretpostavka.",
      mechanism:
        "Nalazi koji upućuju na dokument izvan odabranog opsega pojavljuju se u jasno označenom rubnom odjeljku, umjesto da se tiho uključe ili ispuste.",
      mock: "log",
    },
    {
      heading: "Izvješće samo iskazuje vlastitu točnost",
      advantage:
        "Artefakt koji prosljeđujete deklarira izmjerene rezultate točnosti upravo one konfiguracije modela koja ga je izradila. Nijedan drugi alat za dokumente ne govori vašem auditoru koliko je točan.",
      mechanism:
        "Isti su brojevi javni na stranici s rezultatima točnosti za svako izdanje, po jeziku i po konfiguraciji.",
      link: { label: "Objavljeni rezultati točnosti", href: "/trust" },
      mock: "answer-conflict",
    },
  ],
  statNote:
    "Uživo iz objavljenih rezultata točnosti po izdanju. Izvješće nosi rezultate vlastite konfiguracije modela; ovo su trenutačne zbirne vrijednosti.",
  gridHeading: "Građeno za dosje u kojem završava",
  grid: [
    {
      title: "PDF i JSON",
      text: "PDF za auditora i zapis o preispitivanju razvoja, JSON za vaš sustav kvalitete, oboje potpisano istim putem kao potvrde o brisanju.",
    },
    {
      title: "Prije audita",
      text: "Četiri godine dokumentacije, nekoliko stotina datoteka, dva jezika, nešto skenova. Sljedeće jutro: nalazi. Šest tjedana poslije potpisano izvješće ulazi u zapis o preispitivanju razvoja.",
    },
    {
      title: "Na dan izmjene",
      text: "Obavijest o izmjeni stiže poštom i u sukobu je s jednim dokumentom sučelja. Taj nalaz ispliva isti dan, a ne na auditu dvije godine kasnije.",
    },
    {
      title: "Nije regulatorna procjena",
      text: "Cogeto proizvodi dokaze o vašim dokumentima. Regulatorna prosudba ostaje na vašoj organizaciji, i dokumentacija to otvoreno kaže.",
    },
  ],
  cta: {
    heading: "Vaše prvo izvješće izlazi iz pilota.",
    sub: "Donesite stvaran skup dokumenata. Pilot završava potpisanim izvješćem o nalazima na vašem materijalu, a izvješće zadržavate u svakom slučaju.",
    secondary: { label: "Kako se nalazi otkrivaju", href: "/product/contradiction-findings" },
  },
};
