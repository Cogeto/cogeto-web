import type { ZPageContent } from "./product-contradiction-findings";

/**
 * Croatian copy for /product/verified-memory. Mirrors
 * content/en/product-verified-memory.ts; only string values are translated.
 */
export const verifiedMemory: ZPageContent = {
  metaTitle: "Provjerena memorija",
  metaDescription:
    "Svaka činjenica koju Cogeto pohrani nosi točnu izvornu rečenicu, prolazi neovisnu provjeru prije pohrane i čuva životni ciklus, uključujući odbijeno.",
  eyebrow: "Proizvod",
  headline: "Nikad ne branite činjenicu za koju ne možete pokazati rečenicu",
  lede:
    "Cogeto pohranjuje atomarne tvrdnje, a ne fragmente dokumenata. Svaka tvrdnja nosi doslovnu rečenicu iz koje je nastala, presudu provjere i razdoblje u kojem vrijedi, pa se svaki odgovor u dva koraka može pratiti do izvora.",
  heroMock: "answer-conflict",
  bands: [
    {
      heading: "Ništa ne ulazi u memoriju neprovjereno",
      advantage:
        "Uobičajena greška asistenata za dokumente, jednom pohranjeno pogrešno čitanje koje se zauvijek samouvjereno ponavlja, ovdje se ne može dogoditi.",
      mechanism:
        "Nakon ekstrakcije drugi, neovisni prolaz ponovno čita samo izvornu rečenicu tvrdnje i prosuđuje podupiru li je dokazi. Aktivne postaju samo potkrijepljene tvrdnje bez ograđivanja. Neuspjeh nikad ne završava prihvaćanjem.",
      mock: "log",
    },
    {
      heading: "Odbijeno ostaje dostupno za uvid",
      advantage:
        "Možete pregledati što je sustav odbio, a ne samo što je zadržao. Svako se odbijanje bilježi s isječkom, razlogom i vremenom te sažima u izvješću o nalazima.",
      mechanism:
        "Nema reda za pregled i nema domaće zadaće: Cogeto ishode provjere razrješava sam. Vaša vlastita potvrda činjenice od tada nadglasava strojnu prosudbu.",
      mock: "status",
    },
    {
      heading: "Iskreno ondje gdje vaši zapisi šute",
      advantage:
        "Kad vaši dokumenti ne pokrivaju pitanje, odgovor to jasno kaže, a sve iz vlastitog znanja modela jasno je označeno kao izvan vaših izvora.",
      mechanism:
        "Ne postoji način rada u kojem se znanje modela predstavlja kao da dolazi iz vaših dokumenata. Višeznačna pitanja granaju se po predmetima koje korpus sadrži i pitaju na koji ste mislili.",
      mock: "silence",
    },
    {
      heading: "Pitajte što ste vjerovali u ožujku",
      advantage:
        "Zamijenjene činjenice nikad se ne uništavaju, samo zatvaraju, pa možete pitati što je dokumentacija tvrdila na bilo koji datum, što se promijenilo od nekog pregleda i koja je revizija zamijenila tvrdnju.",
      mechanism:
        "Svaka činjenica nosi razdoblje valjanosti. Tri vremenska čitanja uvijek su dostupna: stanje u odabranom trenutku, promjene od tada i prethodna verzija.",
      link: { label: "Izvješće o nalazima", href: "/product/findings-report" },
      mock: "finding-battery",
    },
  ],
  statNote:
    "Uživo iz objavljenih rezultata točnosti po izdanju, zbirno za engleski i hrvatski. Sam provjerni prolaz mjeri se prema ljudskim oznakama i taj je broj javan.",
  gridHeading: "Gdje jamstva prestaju, rečeno otvoreno",
  grid: [
    {
      title: "Provjera je prosudba",
      text: "Provjeru radi neovisan model čije se slaganje s ljudskim oznakama objavljuje. Može odbiti i istinitu tvrdnju; dnevnik potisnutih to čini vidljivim.",
    },
    {
      title: "Kvaliteta ovisi o jeziku",
      text: "Ekstrakcija i usklađivanje mjere se odvojeno po jeziku, a brojevi se objavljuju umjesto da se izgube u prosjeku.",
    },
    {
      title: "Samo ono što je zabilježeno",
      text: "Cogeto ne hvata nedokumentiranu prosudbu. Radije kaže da je pitanje bez odgovora nego da popuni prazninu.",
    },
    {
      title: "Informiran, a ne domišljat",
      text: "Cogeto zaključuje nad dohvaćenim činjenicama. Za otvoreno razmišljanje pravi je alat vrhunski asistent, i dokumentacija to kaže.",
    },
  ],
  cta: {
    heading: "Svaki odgovor, provjerljiv do rečenice.",
    sub: "Sve na ovoj stranici radi iz izdanja otvorenog koda, pa se sve može provjeriti umjesto da se u to vjeruje.",
    secondary: { label: "Izmjerena točnost, po izdanju", href: "/trust" },
  },
};
