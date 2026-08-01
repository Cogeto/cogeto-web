/**
 * Croatian case studies. Mirrors content/en/case-studies.ts; only string
 * values are translated. Quoted document sentences keep the language of the
 * fictional source document where the point is cross-language resolution.
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
  metaTitle: "Studije slučaja",
  metaDescription:
    "Što Cogeto pronalazi u stvarnim skupovima dokumenata: tehnička dokumentacija, zahtjevi, programska dokumentacija i obitelji tehničkih listova, s nalazima.",
  eyebrow: "Studije slučaja",
  headline: "Što pronađe kad pročita sve",
  lede:
    "Četiri skupa dokumenata, četiri industrije, isti tijek: skupni uvoz, provjera, noćno usklađivanje i ujutro potpisano izvješće o nalazima. Ispričano onako kako to kupac proživljava.",
  cards: [
    {
      industryLabel: "Medicinski proizvodi",
      pain: "Tehnička dokumentacija koja je rasla četiri godine kroz mnogo ruku.",
      outcome: "Priprema audita postala je izvješće, a ne arheologija.",
      metric: "27 proturječnosti u 412 dokumenata",
      href: "/case-studies/medical-devices",
    },
    {
      industryLabel: "Obrana",
      pain: "Materijal koji ne smije napustiti zgradu.",
      outcome: "Utemeljeni odgovori unutar zatvorene mreže.",
      metric: "Potpuno offline, nula izlaznih poziva",
      href: "/case-studies/defense",
    },
    {
      industryLabel: "Automobilsko lakiranje",
      pain: "Završna obrada je zanat, a zanat živi u ljudima i razbacanim papirima.",
      outcome: "Znanje o procesu koje nadživi ljude koji ga nose.",
      metric: "24 sukoba u 643 dokumenta",
      href: "/case-studies/automotive-paint",
    },
    {
      industryLabel: "Inženjerski timovi",
      pain: "Četrdeset gotovo istovjetnih tehničkih listova i wiki kojem nitko ne vjeruje.",
      outcome: "Jedan korpus koji odgovara s citatima.",
      metric: "33 proturječnosti koje nitko nije imenovao",
      href: "/case-studies/engineering-teams",
    },
  ],
};

const DEPLOYMENT = [
  "Hostano u EU: vaša instanca za jednog korisnika, vođena za vas.",
  "Vaš oblak: implementirano unutar vaše vlastite infrastrukture.",
  "Potpuno offline: lokalni modeli, bez izlazne povezivosti, bez telemetrije.",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "medical-devices",
    navLabel: "Medicinski proizvodi",
    industryLabel: "Medicinski proizvodi",
    metaTitle: "Dosljedna tehnička dokumentacija medicinskih proizvoda",
    metaDescription:
      "Tehnička dokumentacija medicinskog proizvoda, 412 dokumenata, provjerena na dosljednost: 27 pronađenih proturječnosti, priprema MDR audita u danima.",
    headline: "Tehnička dokumentacija slagala se sama sa sobom prije nego što je auditor pitao",
    subhead:
      "Proizvođač medicinskih proizvoda usmjerio je Cogeto na četiri godine tehničke dokumentacije. Sljedeće je jutro znao svako mjesto na kojem se dokumentacija ne slaže sama sa sobom, s citiranim objema rečenicama i imenovanim objema revizijama.",
    heroMock: {
      claims: [
        {
          text: "Baterija se smije zamijeniti dok uređaj ostaje u radu.",
          source: "Upute za uporabu, revizija 4",
        },
        {
          text: "Svaki prekid opskrbnog napona zahtijeva potpunu ponovnu inicijalizaciju.",
          source: "Specifikacija sustava, revizija F",
        },
      ],
      chip: "proturječnost",
    },
    situation: {
      heading: "Dokumentacija koja je rasla četiri godine kroz mnogo ruku",
      pains: [
        {
          title: "Obavijest o izmjeni koju nitko nije proveo",
          text: "Izmjena dizajna promijenila je arhitekturu napajanja. Specifikacija je ažurirana; upute za uporabu nisu. Dva kontrolirana dokumenta sada se ne slažu oko toga što operater smije.",
        },
        {
          title: "Priprema audita kao arheologija",
          text: "Tjedni u kojima inženjeri čitaju revizije jednu uz drugu, grade tablice onoga što bi se trebalo podudarati i nadaju se da je uzorak koji auditor izvuče jedan od provjerenih.",
        },
        {
          title: "Dva jezika, jedan proizvod",
          text: "Servisni priručnik je na hrvatskom, specifikacija na engleskom. Nitko ne čita oba istodobno, pa je međujezično neslaganje nevidljivo po samoj konstrukciji.",
        },
      ],
    },
    run: {
      heading: "Izvođenje",
      intro:
        "Jedan skupni uvoz: tehnička dokumentacija kakva jest, uključujući skenirana izvješća o tipskim ispitivanjima i tablice rizika u proračunskim tablicama.",
      steps: [
        "412 dokumenata uvezeno u jednoj operaciji, deduplicirano po sadržaju",
        "Skenovi pročitani lokalnim prepoznavanjem unutar instance",
        "Svaki dokument usidren na svoj proizvod, klasu i reviziju",
        "Svaka izvučena tvrdnja provjerena prema vlastitoj izvornoj rečenici",
        "Noćno usklađivanje cijelog korpusa",
      ],
      summaryTitle: "Jutarnji sažetak",
      summary: [
        { label: "pročitanih dokumenata", value: "412" },
        { label: "pohranjenih činjenica", value: "18,347" },
        { label: "pronađenih proturječnosti", value: "27" },
        { label: "zamijenjenih tvrdnji", value: "214" },
        { label: "potisnutih ekstrakcija", value: "391" },
        { label: "nečitljivih stranica, poimence navedenih", value: "9" },
      ],
    },
    findings: {
      heading: "Nalazi",
      sub: "Četiri od dvadeset sedam, onako kako ih proizvod prijavljuje.",
      items: [
        {
          intro:
            "Sukob iz obavijesti o izmjeni: priručnik i dalje dopušta ono što važeća specifikacija zabranjuje.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Baterija se smije zamijeniti dok uređaj ostaje u radu.",
                source: "Upute za uporabu, revizija 4",
              },
              {
                text: "Svaki prekid opskrbnog napona zahtijeva potpunu ponovnu inicijalizaciju.",
                source: "Specifikacija sustava, revizija F",
              },
            ],
            chip: "proturječnost",
          },
        },
        {
          intro:
            "Brojčani sukob uhvaćen aritmetikom: tipsko ispitivanje nikad nije pokrilo ono što specifikacija zahtijeva.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Hladni start potvrđen na minus 25 stupnjeva Celzija.",
                source: "Izvješće o tipskom ispitivanju TR-118, revizija B",
              },
              {
                text: "Pokretanje specificirano do minus 32 stupnja Celzija.",
                source: "Specifikacija sustava, revizija F",
              },
            ],
            chip: "brojčani sukob",
          },
        },
        {
          intro:
            "Međujezični nalaz: hrvatski servisni priručnik i engleski tehnički list opisuju različit hardver.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Jedinica sadrži jednu antenu.",
                source: "Servisni priručnik, revizija 2",
              },
              {
                text: "The unit contains two antennas.",
                source: "Tehnički list proizvoda, revizija D",
              },
            ],
            chip: "razriješeno preko jezika",
          },
        },
        {
          intro:
            "Zamjena sačuvana kao povijest: rok trajanja sterilnosti promijenjen obaviješću o izmjeni, a lanac pokazuje kada se uvjerenje promijenilo.",
          mock: {
            kind: "chain",
            oldClaim: {
              text: "Rok trajanja sterilnosti: tri godine.",
              source: "Specifikacija označavanja, revizija C",
            },
            newClaim: {
              text: "Rok trajanja sterilnosti: dvije godine.",
              source: "Obavijest o izmjeni CN-0142, revizija A",
            },
            note: "Zamijenjeno, lanac očuvan. Pitajte što je dokumentacija tvrdila na bilo koji prošli datum.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Što to znači za vas",
      cards: [
        {
          title: "Priprema audita u danima",
          text: "Izvješće o nalazima nad točnim opsegom dokumentacije, potpisano, sa svakim sukobom i njegovim dokazima, ulazi u zapis o preispitivanju razvoja.",
        },
        {
          title: "Sukobi uhvaćeni na dan nastanka",
          text: "Svaka nova obavijest o izmjeni provjerava se prema svemu već poznatome na dan dolaska, a ne na sljedećem auditu.",
        },
        {
          title: "Povijest koja preživi odlaske",
          text: "Zamijenjene tvrdnje čuvaju svoje lance, pa na pitanje što je dokumentacija tvrdila na bilo koji datum uvijek postoji odgovor.",
        },
        {
          title: "Odgovori s citatima",
          text: "Pitajte dokumentaciju bilo što; svaka tvrdnja u odgovoru imenuje svoju rečenicu, dokument i reviziju, ili kaže da dokumentacija šuti.",
        },
      ],
      boundary:
        "Cogeto proizvodi dokaze o vašim dokumentima. Regulatorna prosudba ostaje na vašoj organizaciji.",
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Je li ovo regulatorna procjena?",
        answer:
          "Ne. Cogeto proizvodi dokaze o vašim dokumentima: što je u sukobu, što je što zamijenilo i što nije bilo moguće provjeriti. Regulatorna prosudba ostaje na vama.",
      },
      {
        question: "Naša dokumentacija puna je skenova. Radi li to?",
        answer:
          "Skenirane stranice čita lokalno prepoznavanje unutar instance, pa ništa ne napušta vašu granicu. Stranice koje se ne mogu pročitati navode se poimence, nikad se tiho ne preskaču.",
      },
      {
        question: "Naša dokumentacija je na dva jezika.",
        answer:
          "Predmeti se razrješavaju preko jezika, pa hrvatski priručnik može proturječiti engleskoj specifikaciji. Točnost se mjeri i objavljuje po jeziku, pa kvalitetu vidite prije obveze.",
      },
      {
        question: "Tko razrješava nalaze?",
        answer:
          "Vaši inženjeri, s objema rečenicama i objema revizijama pred sobom. Cogeto iznosi na vidjelo i dokumentira; ne odlučuje koji je dokument u pravu.",
      },
    ],
    closing: {
      sentence:
        "Pošaljite tehničku dokumentaciju; isporučujemo potpisano izvješće o nalazima.",
      subject: "Zahtjev za pilot, medicinski proizvodi",
    },
    chat: [
      {
        question: "Smije li se baterija mijenjati tijekom rada?",
        segments: [
          { text: "Upute za uporabu to dopuštaju.", chips: ["IFU r4"] },
          {
            text: "Važeća specifikacija to zabranjuje: svaki prekid napajanja zahtijeva potpunu ponovnu inicijalizaciju.",
            chips: ["Spec rF"],
          },
        ],
        conflict: {
          text: "Sukob: obavijest o izmjeni promijenila je arhitekturu napajanja; priručnik nikad nije ažuriran.",
          chips: ["obavijest o izmjeni"],
        },
        standsOn: ["IFU r4", "Spec rF", "obavijest o izmjeni"],
      },
      {
        question: "Koliki je bio rok trajanja sterilnosti kad je ožujska serija isporučena?",
        segments: [
          {
            text: "Tri godine na taj datum, prema tada važećoj specifikaciji označavanja; otad postroženo na dvije godine obaviješću o izmjeni CN-0142.",
            chips: ["Spec označavanja rC", "CN-0142", "stanje: ožujak"],
          },
        ],
        standsOn: ["Spec označavanja rC", "CN-0142"],
      },
    ],
  },

  {
    slug: "defense",
    navLabel: "Obrana",
    industryLabel: "Obrana",
    metaTitle: "AI u fizički izoliranoj mreži za obrambenu dokumentaciju",
    metaDescription:
      "Obrambeni elektronički program pokrenuo je Cogeto potpuno odvojeno od vanjske mreže, s lokalnim modelima, i dobio citirane odgovore iz 730 dokumenata.",
    headline: "Utemeljeni odgovori, unutar mreže iz koje ništa ne izlazi",
    subhead:
      "Obrambeni elektronički program pokreće Cogeto potpuno offline: lokalni modeli na programskom hardveru, bez izlazne povezivosti, bez telemetrije. Ako dokumenti to sadrže, odgovara iz njih, s citatima.",
    heroMock: {
      claims: [
        {
          text: "Pin 7 nosi napajanje od 28 volti.",
          source: "Dokument kontrole sučelja ICD-A, revizija 3",
        },
        {
          text: "Pin 7 je rezerviran i ne smije se spajati.",
          source: "Napomena na nacrtu kabelskog snopa, revizija 1",
        },
      ],
      chip: "proturječnost",
    },
    situation: {
      heading: "Materijal koji ne smije napustiti zgradu",
      pains: [
        {
          title: "Hostani asistenti nisu opcija",
          text: "Materijal ne smije izvan granice, a hostani asistent ili se uopće ne smije koristiti ili odbija pitanja o vašim vlastitim sustavima.",
        },
        {
          title: "Znanje odlazi s rotacijom osoblja",
          text: "Raspoređivanja se mijenjaju, vanjski suradnici odlaze, a s njima i osoba koja je znala zašto je kabelski snop prespojen. Što nikad nije zapisano, nestalo je; što je zapisano, razbacano je.",
        },
        {
          title: "Dokumenti sučelja koji se tiho ne slažu",
          text: "Dva kontrolirana dokumenta, dva vlasnika, bez međusobnog upućivanja. Neslaganje ispliva tijekom integracije, u najskupljem mogućem trenutku.",
        },
      ],
    },
    run: {
      heading: "Izvođenje",
      intro:
        "Instalirano iz offline paketa slika. Programska dokumentacija uvezena unutar enklave: specifikacije, dokumenti kontrole sučelja, napomene na nacrtima, ispitni zapisi, zapisnici.",
      steps: [
        "730 dokumenata uvezeno unutar zatvorene mreže",
        "Lokalni modeli i prepoznavanje stranica na programskom hardveru",
        "Sidrenje na sustav, podsustav i reviziju",
        "Provjera prema izvornim rečenicama prije pohrane",
        "Noćno usklađivanje, sve unutar granice",
      ],
      summaryTitle: "Jutarnji sažetak",
      summary: [
        { label: "pročitanih dokumenata", value: "730" },
        { label: "pohranjenih činjenica", value: "26,412" },
        { label: "pronađenih proturječnosti", value: "41" },
        { label: "zamijenjenih tvrdnji", value: "356" },
        { label: "potisnutih ekstrakcija", value: "512" },
        { label: "izlaznih mrežnih poziva", value: "0" },
      ],
    },
    findings: {
      heading: "Nalazi",
      sub: "Tri od četrdeset jednog, onako kako ih proizvod prijavljuje.",
      items: [
        {
          intro:
            "Integracijska zamka: dva dokumenta sučelja različito dodjeljuju isti pin, a nijedan ne upućuje na drugi.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Pin 7 nosi napajanje od 28 volti.",
                source: "Dokument kontrole sučelja ICD-A, revizija 3",
              },
              {
                text: "Pin 7 je rezerviran i ne smije se spajati.",
                source: "Napomena na nacrtu kabelskog snopa, revizija 1",
              },
            ],
            chip: "proturječnost",
          },
        },
        {
          intro:
            "Sukob mjernih jedinica uhvaćen aritmetikom: metri naspram stopa, uspoređeno prije nego što je ijedan model pitan.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Najveća radna visina: 4,600 metara.",
                source: "Specifikacija okolišnih uvjeta, revizija D",
              },
              {
                text: "Najveća radna visina: 15,000 stopa.",
                source: "Priručnik za operatere, revizija 2",
              },
            ],
            chip: "sukob mjernih jedinica",
          },
        },
        {
          intro:
            "Što je sustav odbio pohraniti: ekstrakcije koje nisu prošle provjeru, zabilježene umjesto povjerovane.",
          mock: {
            kind: "suppression",
            rows: [
              { reason: "nepotkrijepljeno izvorom", count: "203" },
              { reason: "ograđeno u izvoru", count: "168" },
              { reason: "neprosudiv isječak", count: "141" },
            ],
            note: "Svaka potisnuta ekstrakcija bilježi se s isječkom, razlogom i vremenom te sažima u izvješću o nalazima.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Što to znači za vas",
      cards: [
        {
          title: "Utemeljeno u vašem korpusu",
          text: "Ako vaši dokumenti to sadrže, odgovara iz njih, s citatima. Ako ne sadrže, kaže to umjesto da nagađa.",
        },
        {
          title: "Ništa ne izlazi, provjerljivo",
          text: "Jedna izlazna točka za modele, provjeravana u kontinuiranoj integraciji, usmjerena na lokalne modele. Kod je otvoren, pa vaš sigurnosni tim to može potvrditi.",
        },
        {
          title: "Znanje preživi rotaciju",
          text: "Što je zapisano, ostaje pretraživo s citatima i nakon što je autor napustio program.",
        },
        {
          title: "Dokazi za pregled",
          text: "Potpisano izvješće o nalazima nad definiranim opsegom dokumenata, izrađeno unutar enklave.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Izlazi li išta iz mreže?",
        answer:
          "Ne. Jezični modeli, vektorski prikazi, prepoznavanje stranica i pretraživanje rade unutar instance. Telemetrije nema, a jedina izlazna točka za modele provjerava se u kontinuiranoj integraciji.",
      },
      {
        question: "Koliko su lokalni modeli dobri u odnosu na hostane?",
        answer:
          "Izmjereno, a ne ustvrđeno: svaka konfiguracija modela nosi vlastite objavljene rezultate točnosti, a neispitane kombinacije označene su kao nevrednovane.",
      },
      {
        question: "Tko njime upravlja?",
        answer:
          "Vaši ljudi, unutar vaših zidova. Put instalacije je dokumentiran, operaterska skripta je javna, a vaše operatere obučavamo u sklopu angažmana.",
      },
    ],
    closing: {
      sentence:
        "Pošaljite skup dokumenata ili nas dovedite unutar svojih zidova; isporučujemo potpisano izvješće o nalazima.",
      subject: "Zahtjev za pilot, obrana",
    },
    chat: [
      {
        question: "Koja je duljina antene za ARK-23 reviziju C?",
        segments: [
          { text: "1.2 metra.", chips: ["ICD ARK-23 rC", "Gabaritni crtež r2"] },
        ],
        standsOn: ["ICD ARK-23 rC", "Gabaritni crtež r2"],
      },
      {
        question: "Koja je izvozna klasifikacija za ARK-23?",
        segments: [],
        silence: {
          title: "Vaši dokumenti ovo ne pokrivaju.",
          banner: "Slijedi opće znanje, označeno kao izvan vaših izvora.",
        },
        standsOn: [],
      },
    ],
  },

  {
    slug: "automotive-paint",
    navLabel: "Automobilsko lakiranje",
    industryLabel: "Automobilsko lakiranje",
    metaTitle: "Znanje lakirnice, sačuvano i provjereno",
    metaDescription:
      "Dokumentacija lakirnice, provjerena: sukobi prozora pečenja i omjera miješanja, odstupanja debljine sloja i zanatsko znanje uhvaćeno s citatima.",
    headline: "Znanje iza savršene završne obrade sada nadživi ljude koji ga nose",
    subhead:
      "Vrhunska završna obrada slojevi su zanata: predobrada, kataforeza, temeljni sloj, bazni lak, bezbojni lak, svaki sa svojim prozorom. Jedna je lakirnica procesu iza površine dala istu strogost kao površini, pa je kontrola procesa lakiranja postala provjerljiva.",
    heroMock: {
      claims: [
        {
          text: "Pečenje 20 minuta na 140 stupnjeva Celzija temperature objekta.",
          source: "Tehnički list bezbojnog laka CC-2, revizija 9",
        },
        {
          text: "Pečenje 18 minuta na 150 stupnjeva Celzija temperature objekta.",
          source: "Procesna karta PC-31, revizija D",
        },
      ],
      chip: "proturječnost",
    },
    situation: {
      heading: "Zanat živi u ljudima i razbacanim papirima",
      pains: [
        {
          title: "Majstor je otišao u mirovinu",
          text: "S njim je otišlo ono što nijedan dokument ne sadrži: zimska prilagodba kad vlaga padne, koja greška znači onečišćenje silikonom, a koja da je otparavanje skraćeno, redoslijed šarži koji je otpad pri ispiranju držao niskim.",
        },
        {
          title: "Nitko ne zna koja je kopija važeća",
          text: "Tehnički listovi dobavljača, procesne karte, planovi kontrole, radne upute, listovi iz miješaone, operaterova bilježnica, četiri godine stari edukacijski materijali, plastificirane kartice na stanici, fotografirane ploče, pravila redoslijeda u tablici jednog planera. Dio toga proturječi ostatku.",
        },
        {
          title: "Godina dana dok vam kabina ne povjeruje",
          text: "Novi ljudi uče raspitivanjem, a procesni inženjeri nasljeđuju korake koje više nitko ne zna objasniti. Petlja dorade skupo podučava ono što je papir trebao reći.",
        },
      ],
    },
    run: {
      heading: "Izvođenje",
      intro:
        "Jedno poslijepodne usmjeravanja Cogeta na papire pogona: tehnički listovi, procesne karte kroz revizije, planovi kontrole, radne upute, listovi za miješanje, obavijesti o izmjenama i pošta dobavljača, edukacijski materijali, dnevnici održavanja te stranice bilježnice i plastificirane kartice kao fotografije.",
      steps: [
        "643 dokumenta uvezena, uključujući 151 fotografiranu stranicu i karticu",
        "Fotografije pročitane lokalnim prepoznavanjem unutar instance",
        "Činjenice usidrene na sustav laka, sloj i reviziju, pa dva sustava bezbojnog laka s gotovo istovjetnim listovima ostaju odvojena",
        "Svaka tvrdnja provjerena prema vlastitoj izvornoj rečenici",
        "Noćno usklađivanje: list naspram karte, plan naspram upute, materijali naspram sadašnje prakse",
      ],
      summaryTitle: "Jutarnji sažetak",
      summary: [
        { label: "pročitanih dokumenata", value: "643" },
        { label: "pohranjenih činjenica", value: "16,480" },
        { label: "pronađenih proturječnosti", value: "24" },
        { label: "zamijenjenih tvrdnji", value: "168" },
        { label: "potisnutih ekstrakcija", value: "297" },
        { label: "nečitljivih stranica, poimence navedenih", value: "11" },
      ],
    },
    findings: {
      heading: "Nalazi",
      sub: "Četiri od dvadeset četiri, plus što je odbijeno i što je zamijenjeno, onako kako ih proizvod prijavljuje.",
      items: [
        {
          intro:
            "Sukob prozora pečenja: obavijest o izmjeni zbog reformulacije pomaknula je prozor i nikad nije stigla do procesne karte.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Pečenje 20 minuta na 140 stupnjeva Celzija temperature objekta.",
                source: "Tehnički list bezbojnog laka CC-2, revizija 9",
              },
              {
                text: "Pečenje 18 minuta na 150 stupnjeva Celzija temperature objekta.",
                source: "Procesna karta PC-31, revizija D",
              },
            ],
            chip: "proturječnost, otkriveno 12. lipnja",
          },
        },
        {
          intro:
            "Omjer miješanja koji je odlutao: list iz miješaone i dalje uči stari omjer; tehnički list otišao je dalje prije dvije revizije.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Miješati 100 : 30 : 10 volumno s otvrdnjivačem H-40.",
                source: "List iz miješaone, stanica 3",
              },
              {
                text: "Miješati 100 : 35 : 10 volumno s otvrdnjivačem H-40.",
                source: "Tehnički list baznog laka B-7, revizija 11",
              },
            ],
            chip: "sukob, jedna strana zamijenjena, otkriveno 13. lipnja",
          },
        },
        {
          intro:
            "Debljina sloja koja znači dvije različite stvari, ovisno o tome kojem dokumentu vjerujete, a oba su još u optjecaju.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Debljina sloja bezbojnog laka: 45 do 55 mikrona.",
                source: "Plan kontrole, revizija F",
              },
              {
                text: "Debljina sloja bezbojnog laka: 40 do 50 mikrona.",
                source: "Radna uputa WI-208, revizija C",
              },
            ],
            chip: "odstupanje revizija, otkriveno 12. lipnja",
          },
        },
        {
          intro:
            "Jedna rečenica umirovljenog majstora, fotografirana, izvučena, provjerena i sada citirana činjenica s podrijetlom umjesto sjećanja.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Iznad 70 posto relativne vlažnosti dodati 5 posto sporijeg razrjeđivača.",
                source: "Fotografirana stranica bilježnice, miješaona",
              },
            ],
            chip: "provjereno, citirano podrijetlo",
          },
        },
        {
          intro:
            "Redoslijed granulacija, razriješen kao zamjena: stari edukacijski materijal zatvoren važećom uputom, lanac netaknut.",
          mock: {
            kind: "chain",
            oldClaim: {
              text: "Brusiti granulacijom P400 prije popravka baznog laka.",
              source: "Edukacijska prezentacija, 2022.",
            },
            newClaim: {
              text: "Brusiti granulacijom P500, zatim P800, prije popravka baznog laka.",
              source: "Radna uputa WI-214, revizija B",
            },
            note: "Zamijenjeno, lanac očuvan. Prezentacija ostaje pretraživa kao povijest, nikad kao važeća praksa.",
          },
        },
        {
          intro:
            "Što je sustav odbio pohraniti: ekstrakcije koje nisu prošle provjeru, zabilježene umjesto povjerovane.",
          mock: {
            kind: "suppression",
            rows: [
              { reason: "nepotkrijepljeno izvorom", count: "118" },
              { reason: "ograđeno u izvoru", count: "97" },
              { reason: "neprosudiv isječak", count: "82" },
            ],
            note: "Svaka potisnuta ekstrakcija bilježi se s isječkom, razlogom i vremenom te sažima u izvješću o nalazima.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Što to znači za vas",
      cards: [
        {
          title: "Novi operater pita korpus",
          text: "I dobije odgovor s točno citiranim listom i revizijom, ili iskrenu šutnju umjesto nagađanja. Pravila redoslijeda izlaze iz planerove tablice i postaju pretražive činjenice.",
        },
        {
          title: "Reformulacije isplivaju isti dan",
          text: "Obavijest o izmjeni dobavljača provjerava se prema svakoj karti i uputi na dan dolaska, a ne nakon skoka dorade u svjetlosnom tunelu.",
        },
        {
          title: "Priprema audita postaje izvješće",
          text: "Posjeti kupaca i auditi počinju od potpisanog izvješća o nalazima nad dokumentacijom lakirnice umjesto od tjedna arheologije.",
        },
        {
          title: "Uhvatite sljedećeg majstora na vrijeme",
          text: "Ono što zna sljedeća osoba pred mirovinom može se hvatati fotografiranu bilješku po bilješku, provjeriti i sačuvati s podrijetlom.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Pola našeg znanja o procesu rukom su pisane bilješke i plastificirane kartice.",
        answer:
          "Fotografije čita lokalno prepoznavanje unutar instance. Stranice koje se ne mogu pročitati pošteno se označavaju i navode poimence, nikad se tiho ne preskaču.",
      },
      {
        question: "Naša je dokumentacija na dva jezika u jednom pogonu.",
        answer:
          "Predmeti se razrješavaju preko jezika, pa list na jednom jeziku može proturječiti kartici na drugome. Kvaliteta se mjeri i objavljuje po jeziku, pa je vidite prije obveze.",
      },
      {
        question: "Ništa ne smije napustiti mrežu tvornice.",
        answer:
          "Cogeto radi potpuno offline s lokalnim modelima. U kodu postoji točno jedna izlazna točka, provjeravana u kontinuiranoj integraciji, a kod je otvoren pa to vaš tim može provjeriti.",
      },
      {
        question: "Naši operateri neće tipkati dokumentaciju.",
        answer:
          "I ne moraju. Dovoljna je fotografija ili proslijeđena poruka, a jedna rečenica u razgovoru postaje provjerena činjenica s podrijetlom.",
      },
    ],
    closing: {
      sentence:
        "Pošaljite procesne karte, tehničke listove i upute za jednu liniju ili jedan sustav laka; isporučujemo potpisano izvješće o nalazima koje pokazuje gdje se ne slažu.",
      subject: "Pilot za lakirnicu",
    },
    chat: [
      {
        question: "Koji je prozor pečenja za bezbojni lak CC-240?",
        segments: [
          {
            text: "20 minuta na 140 stupnjeva Celzija temperature objekta.",
            chips: ["TDS CC-240 r7"],
          },
        ],
        conflict: {
          text: "Sukob: procesna karta PC-31 r3 još prikazuje 18 minuta na 150 stupnjeva, prozor prije reformulacije.",
          chips: ["Procesna karta r3", "Obavijest o izmjeni CN-58"],
        },
        standsOn: ["TDS CC-240 r7", "Procesna karta r3", "Obavijest o izmjeni CN-58"],
      },
      {
        question: "Kada prelazimo na sporiji razrjeđivač?",
        segments: [
          {
            text: "Iznad 70 posto relativne vlažnosti dodati 5 posto sporijeg razrjeđivača.",
            chips: ["Fotografirana bilješka, miješaona"],
          },
        ],
        standsOn: ["Fotografirana bilješka, miješaona"],
      },
    ],
  },
  {
    slug: "engineering-teams",
    navLabel: "Inženjerski timovi",
    industryLabel: "Inženjerski timovi",
    metaTitle: "Inženjerska baza znanja koja se sama dokazuje",
    metaDescription:
      "Izmjereno odstupanje dokumentacije: 486 dokumenata kroz Cogeto, 33 pronađene proturječnosti, wiki naspram tehničkog lista, varijanta naspram varijante.",
    headline: "Wiki, tehnički listovi i istina",
    subhead:
      "Tim industrijske elektronike usmjerio je Cogeto na sve: wiki kojem nitko ne vjeruje, obitelj od četrdeset gotovo istovjetnih tehničkih listova i rasprave s odlukama. Sada korpus odgovara s citatima, a odstupanja imaju imena.",
    heroMock: {
      claims: [
        {
          text: "Kućište ima stupanj zaštite IP54.",
          source: "Interni wiki, stranica o hardveru",
        },
        {
          text: "Stupanj zaštite: IP65.",
          source: "Tehnički list proizvoda, revizija 7",
        },
      ],
      chip: "proturječnost",
    },
    situation: {
      heading: "Odstupanje dokumentacije, neizmjereno",
      pains: [
        {
          title: "Wiki kojem nitko ne vjeruje",
          text: "Od 2022. uređivalo ga je troje ljudi. Svi sumnjaju da je negdje pogrešan; nitko ne zna gdje, pa svatko radije ponovno pita kolegu.",
        },
        {
          title: "Četrdeset tehničkih listova, zajednički predložak",
          text: "Gotovo istovjetne varijante razlikuju se u brojevima koje nitko ne zna napamet. Copy paste drži predložak dosljednim, a razlike nevidljivima.",
        },
        {
          title: "Uvođenje novih ljudi raspitivanjem",
          text: "Odluke žive u raspravama i glavama. Prvi mjesec novog inženjera prolazi u otkrivanju kojem dokumentu ne vjerovati.",
        },
      ],
    },
    run: {
      heading: "Izvođenje",
      intro:
        "Jedan skupni uvoz: izvoz wikija, obitelj tehničkih listova, projektne bilješke i arhivirane rasprave s odlukama.",
      steps: [
        "486 dokumenata uvezeno u jednoj operaciji",
        "Tehnički listovi usidreni po varijanti, pa zajednički predložak ostaje razdvojen",
        "Wiki stranice i rasprave pročitane kao izvori s datumima",
        "Provjera prema izvornim rečenicama prije pohrane",
        "Noćno usklađivanje, varijanta naspram varijante, wiki naspram tehničkog lista",
      ],
      summaryTitle: "Jutarnji sažetak",
      summary: [
        { label: "pročitanih dokumenata", value: "486" },
        { label: "pohranjenih činjenica", value: "12,905" },
        { label: "pronađenih proturječnosti", value: "33" },
        { label: "zamijenjenih tvrdnji", value: "189" },
        { label: "potisnutih ekstrakcija", value: "264" },
        { label: "nečitljivih stranica, poimence navedenih", value: "5" },
      ],
    },
    findings: {
      heading: "Nalazi",
      sub: "Tri od trideset tri, onako kako ih proizvod prijavljuje.",
      items: [
        {
          intro: "Wiki naspram tehničkog lista: odstupanje koje su svi slutili, imenovano.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Kućište ima stupanj zaštite IP54.",
                source: "Interni wiki, stranica o hardveru",
              },
              {
                text: "Stupanj zaštite: IP65.",
                source: "Tehnički list proizvoda, revizija 7",
              },
            ],
            chip: "proturječnost",
          },
        },
        {
          intro:
            "Varijanta naspram varijante: sidrenje drži četrdeset tehničkih listova razdvojenima, pa je stvarna razlika nalaz, a ne šum.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Najviša temperatura okoline: 70 stupnjeva Celzija.",
                source: "Tehnički list, model K-240, revizija 3",
              },
              {
                text: "Najviša temperatura okoline: 60 stupnjeva Celzija.",
                source: "Tehnički list, model K-240, revizija 4",
              },
            ],
            chip: "odstupanje revizija",
          },
        },
        {
          intro: "Potpisano izvješće koje tim prilaže kvartalnom pregledu.",
          mock: {
            kind: "report",
            lines: [
              "Opseg korpusa: 486 dokumenata, izričito odabranih",
              "33 proturječnosti, svaka s objema rečenicama i revizijama",
              "189 zamjena s lancima, 264 potiskivanja sažeta",
            ],
          },
        },
      ],
    },
    outcomes: {
      heading: "Što to znači za vas",
      cards: [
        {
          title: "Baza znanja koja se sama dokazuje",
          text: "Svaki odgovor citira svoju rečenicu i dokument, ili kaže da korpus šuti. Povjerenje prestaje biti osjećaj.",
        },
        {
          title: "Odstupanje uhvaćeno na dan nastanka",
          text: "Uređivanje wikija koje proturječi tehničkom listu nalaz je istog dana, a ne legenda koja se širi godinu dana.",
        },
        {
          title: "Uvođenje novih ljudi iz korpusa",
          text: "Novi inženjeri pitaju korpus i dobivaju citate, umjesto da mjesec dana uče kojim dokumentima ne vjerovati.",
        },
        {
          title: "Varijante ostaju poštene",
          text: "Četrdeset gotovo istovjetnih tehničkih listova ostaje razdvojeno po varijanti, pa prodajni inženjer koji nudi jedan model nikad ne dobije brojeve drugoga.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Naša je dokumentacija, iskreno, nered. Je li to problem?",
        answer:
          "U tome i jest smisao. Što je korpus neuredniji, to su ulazna provjera i dnevnik potiskivanja važniji: što se ne može provjeriti, bilježi se, a ne vjeruje.",
      },
      {
        question: "Tko ispravlja nalaze?",
        answer:
          "Vi, s objema rečenicama pred sobom. Nalazi se pojavljuju na izvoru, u odgovorima i u izvješću; nema reda čekanja koji treba čuvati.",
      },
      {
        question: "Nadglasava li wiki tehnički list, ili obrnuto?",
        answer:
          "Nijedno. Sukob prikazuje obje strane s datumima i revizijama. Odlučuje čovjek; vaša potvrda tada nadglasava strojnu prosudbu.",
      },
    ],
    closing: {
      sentence:
        "Pošaljite nam izvoz wikija i mapu tehničkih listova; isporučujemo potpisano izvješće o nalazima.",
      subject: "Zahtjev za pilot, inženjerstvo",
    },
    chat: [
      {
        question: "Koji tehnički listovi još prikazuju staru struju mirovanja?",
        segments: [
          {
            text: "Dvije varijante još nose 120 mikroampera: K-241 r2 i K-244 r1. Važeća vrijednost je 85 mikroampera od r3.",
            chips: ["K-241 r2", "K-244 r1", "K-240 r3, zamjenjuje"],
          },
        ],
        standsOn: ["K-241 r2", "K-244 r1", "K-240 r3"],
      },
      {
        question: "Je li kućište IP54 ili IP65?",
        segments: [{ text: "IP65.", chips: ["Tehnički list r7"] }],
        conflict: {
          text: "Sukob: wiki stranica o hardveru još kaže IP54, označeno i povezano.",
          chips: ["Wiki stranica"],
        },
        standsOn: ["Tehnički list r7", "Wiki stranica"],
      },
    ],
  },
];

export const csShared = {
  situationKicker: "Situacija",
  runKicker: "Izvođenje",
  findingsKicker: "Nalazi",
  outcomesKicker: "Što to znači za vas",
  faqKicker: "Prva pitanja",
  chatKicker: "Zatim pitate.",
  readCta: "Pročitajte studiju slučaja",
  indexCtaSub: "Pošaljite skup dokumenata; isporučujemo potpisano izvješće o nalazima.",
  deploymentHeading: "Pokrenite ga ondje gdje vaš materijal živi",
  closingHeading: "Pokrenite pilot na svojim dokumentima.",
  closingCta: "Pokrenite pilot",
  siblingsHeading: "Više studija slučaja",
  proofLinks: [
    { label: "Objavljena točnost", href: "/trust" },
    { label: "Sigurnost i suverenost", href: "/security" },
    { label: "Pregledni članak", href: "/whitepaper" },
  ],
  contactEmail: "ivan@cogeto.eu",
  chatUi: {
    header: "CHAT",
    you: "VI",
    remember: "ZAPAMTI OVO",
    fromMemory: "COGETO · IZ VAŠE MEMORIJE",
    thinking: "Odgovaram iz vaše memorije...",
    standsOn: "TEMELJI SE NA",
    placeholder: "Pitajte svoju memoriju...",
    hint: "Enter za slanje · Shift+Enter za novi red · svaka tvrdnja pokazuje čime je dokazana",
  },
};
