/**
 * Croatian copy for the homepage. Mirrors content/en/home.ts; only string
 * values are translated.
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
    headlineA: "Modeli se iznajmljuju.",
    headlineB: "Znanje se posjeduje.",
    subhead:
      "Cogeto čita vaše dokumente, provjerava svaku činjenicu prema njezinu izvoru prije pohrane, javlja gdje si vaši dokumenti međusobno proturječe i sve to dokazuje. Radi u vašoj infrastrukturi, u Europi ili potpuno offline.",
    ctaPrimary: { label: "Pokrenite pilot", href: "/get-started" },
    ctaSecondary: { label: "Pročitajte bijelu knjigu", href: "/whitepaper" },
    trustStrip: [
      { icon: "Code", label: "Otvoreni kod, AGPLv3", href: "/open-source" },
      {
        icon: "Award",
        label: "Tvrtka s certifikatima ISO 9001 i ISO 27001",
        href: "/security",
      },
      { icon: "WifiOff", label: "Radi potpuno offline", href: "/security" },
    ],
    scene: {
      ariaLabel:
        "Razbacane specifikacije, priručnici, ispitna izvješća, pošta, skenovi, proračunske tablice i bilješke stapaju se u provjerene odgovore s citatima, nalaz proturječnosti s poveznicama na oba izvora, potvrdu unosa i prošlo stanje dohvaćeno putovanjem kroz vrijeme.",
      fragments: [
        { icon: "FileText", label: "specifikacija" },
        { icon: "BookOpen", label: "priručnik" },
        { icon: "FlaskConical", label: "ispitno izvješće" },
        { icon: "Mail", label: "pošta" },
        { icon: "ScanLine", label: "sken" },
        { icon: "Table", label: "proračunska tablica" },
        { icon: "StickyNote", label: "bilješke" },
      ],
      vignettes: [
        {
          kind: "qa",
          label: "Vi pitate",
          question: "Što specifikacija zahtijeva za hladni start?",
          answer: "Minus trideset dva stupnja, od revizije D.",
          citation: "specifikacija, revizija D",
          chip: "provjereno",
          holdMs: 3600,
        },
        {
          kind: "finding",
          label: "Cogeto je pronašao",
          claims: [
            {
              text: "Baterija se može zamijeniti tijekom rada.",
              source: "priručnik za rad",
            },
            {
              text: "Svaki prekid napajanja zahtijeva ponovnu inicijalizaciju.",
              source: "specifikacija, važeća revizija",
            },
          ],
          chip: "proturječnost",
          holdMs: 4400,
        },
        {
          kind: "ingest",
          label: "Stiže obavijest o izmjeni",
          text: "Pročitano i provjereno: dodano dvanaest činjenica.",
          detail: "U sukobu s jednim dokumentom sučelja.",
          chip: "provjereno prema svemu poznatome",
          holdMs: 3600,
        },
        {
          kind: "timetravel",
          label: "Putovanje kroz vrijeme",
          question: "Što je dokumentacija tvrdila na datum narudžbe?",
          answer: "Tada važeće vrijednosti, s njihovim citatima.",
          citation: "povijest memorije, stanje na taj datum",
          chip: "putovanje kroz vrijeme",
          holdMs: 3800,
        },
      ],
    },
  },

  bento: {
    title: "Umjetna inteligencija koja poznaje vaše poslovanje",
    subtitle:
      "Jer je izgrađena na onome što je vaše poslovanje doista zabilježilo: provjereno, citirano, ispitano na proturječnosti i dokazivo.",
    items: [
      {
        kind: "memory",
        title: "Jedna memorija iz svega što imate.",
        text: "Dokumenti, proračunske tablice, skenovi, fotografirane bilješke, pošta i povezani sustavi postaju jedna povezana memorija znanja vaše tvrtke, s citatima.",
        sources: ["specifikacija", "priručnik", "ispitno izvješće", "pošta", "sken", "bilješka"],
        memoryLabel: "provjerena memorija",
      },
      {
        kind: "qa",
        title: "Razgovarajte s onim što vaša tvrtka zna.",
        text: "Pitajte običnim jezikom. Svaka tvrdnja u odgovoru citira točnu rečenicu na kojoj počiva.",
        question: "Koji je raspored pinova važeći za servisno sučelje?",
        answer: "Onaj iz revizije D, a dva se dokumenta ne slažu.",
        source: "specifikacija sučelja, revizija D",
      },
      {
        kind: "changed",
        title: "Proturječnosti isplivaju same.",
        text: "Kad se dva vaša dokumenta ne slažu, obje su strane označene i povezane, s obje rečenice i datumom.",
        oldValue: "Baterija se može zamijeniti tijekom rada",
        newValue: "Prekid napajanja zahtijeva ponovnu inicijalizaciju",
        tag: "sukob označen, obje strane povezane",
      },
      {
        kind: "report",
        title: "Potpisano izvješće koje možete proslijediti.",
        text: "Svaki nalaz s dokazima, potpisan tako da treća strana može provjeriti da nije mijenjan. PDF za auditora, JSON za vaše sustave.",
        header: "Izvješće o nalazima",
        chip: "potpisano",
      },
      {
        kind: "timetravel",
        title: "Pitajte što ste vjerovali u ožujku.",
        text: "Svaka činjenica nosi razdoblje u kojem vrijedi, a zamijenjene tvrdnje čuvaju svoju povijest.",
        question: "Koja je granica hladnog starta vrijedila u ožujku?",
        answer: "Minus dvadeset pet stupnjeva, otad postrožena.",
        source: "povijest specifikacije, stanje iz ožujka",
      },
      {
        kind: "silence",
        title: "Iskreno ondje gdje vaši zapisi šute.",
        text: "Kad vaši dokumenti ne pokrivaju pitanje, Cogeto to jasno kaže prije nego što ponudi bilo što drugo.",
        banner: "Nije pokriveno vašim dokumentima",
        answer: "Slijedi opće znanje, jasno označeno.",
      },
    ],
    cta: {
      title: "Kako se sve to provjerava?",
      text: "Pratite činjenicu od dokumenta do odgovora.",
      href: "/product/verified-memory",
    },
  },

  how: {
    kicker: "Kako radi",
    title: "Od mape dokumenata do dokazive memorije",
    steps: [
      {
        icon: "Inbox",
        title: "Čitanje",
        text: "PDF-ovi, Word datoteke, proračunske tablice, skenovi, pošta. Datoteka koja se ne može pročitati označava se kao nečitljiva, nikad se tiho ne preskače.",
        chips: ["mape", "sandučići", "skenovi", "konektori"],
      },
      {
        icon: "Crosshair",
        title: "Sidrenje",
        text: "Najprije se utvrđuju predmet, klasa i revizija svakog dokumenta, pa svaka činjenica sjedne na pravi proizvod.",
        chips: [],
      },
      {
        icon: "ShieldCheck",
        title: "Provjera",
        text: "Drugi, neovisni prolaz provjerava svaku tvrdnju prema njezinoj izvornoj rečenici prije nego što se išta pohrani.",
        chips: [],
      },
      {
        icon: "GitCompareArrows",
        title: "Usklađivanje",
        text: "Korpus se uspoređuje sam sa sobom: razrješavaju se alijasi, brojevi se provjeravaju aritmetički, sukobi se označavaju i povezuju.",
        chips: [],
      },
      {
        icon: "MessagesSquare",
        title: "Odgovor i dokaz",
        text: "Razgovor s citatima uz svaku tvrdnju, iskrena šutnja gdje zapisi šute i potpisano izvješće o nalazima nad bilo kojim skupom dokumenata.",
        chips: ["citati", "nalazi", "potpisano izvješće"],
      },
    ],
    detailNote: "Cijeli mehanizam, korak po korak, s jamstvima koja stoje iza njega:",
  },

  sovereignty: {
    kicker: "Vaša infrastruktura, vaša jurisdikcija",
    title: "Jedna instanca po korisniku",
    deployPrefix: "Radi",
    deployRotator: ["u EU oblaku", "na vašim poslužiteljima", "potpuno offline"],
    deploySuffix: "s modelima u oblaku ili potpuno lokalnim modelima.",
    items: [
      {
        title: "Ništa se ni s kim ne dijeli",
        text: "Nema zajedničke baze, nema zajedničkog indeksa, tuđi podaci nikad nisu ni blizu vašima. Izolacija je granica implementacije.",
      },
      {
        title: "Offline znači offline",
        text: "U offline načinu rada jezični modeli, vektorski prikazi, prepoznavanje stranica i pretraživanje rade unutar instance. Bez telemetrije.",
      },
      {
        title: "Redigiranje prije svakog vanjskog poziva",
        text: "Imena, organizacije i iznosi lokalno se zamjenjuju pseudonimima prije poziva vanjskom modelu. Ako redigiranje nije moguće, poziv se ne događa.",
      },
      {
        title: "Nikad podaci za treniranje",
        text: "Ništa što pohranite ne koristi se za treniranje ijednog modela, a upravo to omogućuje citiranje, ispravljanje i dokazivo brisanje.",
      },
    ],
    companyLine:
      "Iza svega stoji MVT Solutions Group, tvrtka s certifikatima ISO 9001 i ISO 27001, koja posluje iz Hrvatske u Europskoj uniji.",
    linkLabel: "Sigurnost i suverenost u cijelosti",
    linkHref: "/security",
  },

  proof: {
    kicker: "Provjeri prije nego što zapamtiš",
    title: "Točnost, izmjerena i objavljena za svako izdanje",
    intro:
      "Ovi se brojevi čitaju uživo iz objavljenih podatkovnih datoteka po izdanju, istih nepromjenjivih datoteka koje prikazuje stranica s rezultatima točnosti. Rezultati se objavljuju po jeziku i po konfiguraciji modela, a javni su i pragovi koje moraju zadovoljiti.",
    releaseLabel: "Trenutačno izdanje",
    linkLabel: "Pogledajte svaki broj, uključujući one ispod cilja",
    linkHref: "/trust",
  },

  clients: {
    title: "Klijenti i partneri",
    subtitle:
      "Timovi koji stoje iza Cogeta radili su i isporučivali za organizacije u javnom zdravstvu, industriji, hotelijerstvu, logistici i istraživanju, a s europskim pružateljima infrastrukture surađuju kako bi podaci ostali suvereni.",
    items: [
      {
        name: "OVHcloud",
        image: "/clients-partners/ovh-cloud.png",
        badge: "Cloud partner",
      },
      { name: "Department of Health, UAE", image: "/clients-partners/doh-uae.png" },
      { name: "Hilton", image: "/clients-partners/hilton.png" },
      { name: "DSV", image: "/clients-partners/dsv.png" },
      { name: "Beckhoff Automation", image: "/clients-partners/beckhoff.png" },
      { name: "ESTUN Automation", image: "/clients-partners/estun.png" },
      { name: "BIRD Incubator", image: "/clients-partners/bird-incubator.png" },
      {
        name: "Tehničko veleučilište u Zagrebu",
        image: "/clients-partners/tvz.png",
      },
      {
        name: "Open Source Initiative",
        image: "/clients-partners/open-source-initiative.png",
      },
    ],
    disclaimer:
      "Svi logotipi i zaštitni znakovi vlasništvo su svojih vlasnika. Prikazani su kao reference tvrtki koje stoje iza Cogeta i ne podrazumijevaju preporuku proizvoda Cogeto.",
  },

  askAssistant: {
    kicker: "Drugo mišljenje",
    title: "Pitajte svog asistenta o Cogetu",
    text: "Otvorite asistenta koji već koristite s pripremljenim upitom. Pročitat će ove stranice i javni repozitorij te vam dati vlastiti sažetak onoga što Cogeto jest.",
    prompt:
      "Sažmi što je Cogeto i po čemu se razlikuje od alata za dohvat i pretraživanje poslovnih dokumenata. Kao reference koristi https://cogeto.eu i https://github.com/Cogeto/cogeto.",
    assistants: [
      { name: "Claude", urlPrefix: "https://claude.ai/new?q=" },
      { name: "ChatGPT", urlPrefix: "https://chatgpt.com/?q=" },
      { name: "Perplexity", urlPrefix: "https://www.perplexity.ai/search?q=" },
      { name: "Copilot", urlPrefix: "https://copilot.microsoft.com/?q=" },
    ],
    copyLabel: "Kopirajte upit za bilo kojeg drugog asistenta",
    copiedLabel: "Kopirano",
  },

  gettingStarted: {
    kicker: "Prvi koraci",
    title: "Počnite pilotom na vlastitim dokumentima",
    steps: [
      {
        title: "Pilot na vašim dokumentima",
        text: "Donesite stvaran skup dokumenata. Cogeto ga pročita i izradi izvješće o nalazima. Točno vidite što je pronašao, na vašem materijalu, prije ikakve dulje obveze.",
      },
      {
        title: "Vaša instanca",
        text: "Hostana kod nas u EU, postavljena u vaš oblak ili instalirana unutar vaše mreže, uključujući potpuno offline. Jedna instanca, samo vaša.",
      },
      {
        title: "Nastavlja raditi",
        text: "Svaka nova revizija, obavijest o izmjeni ili poruka provjerava se prema svemu već poznatome, pa sukobi isplivaju na dan nastanka, a ne tijekom sljedećeg audita.",
      },
    ],
    selfHostNote:
      "Koristite Cogeto besplatno zauvijek. Plaćate da bude vaš: instaliran unutar vaših zidova, prilagođen vašim dokumentima, izmjeren na vašem materijalu i s nekim tko za njega odgovara.",
    cta: { label: "Pokrenite pilot", href: "/get-started" },
    docsLink: { label: "Pokrenite ga sami", href: "/docs" },
  },

  closing: {
    heading: "Pogledajte ga na svojim dokumentima.",
    sub: "Pilot pročita vaš stvaran skup dokumenata i završava potpisanim izvješćem o nalazima. Odgovaramo u roku od jednog radnog dana.",
    secondary: { label: "Pokrenite ga sami", href: "/docs" },
  },
};
