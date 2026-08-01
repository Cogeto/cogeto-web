/**
 * Croatian copy for the /docs section. Mirrors content/en/docs.ts; only
 * string values are translated. Commands, paths, and URLs stay verbatim.
 */

export interface DocStep {
  title: string;
  text: string;
  command?: string;
  /** A "you should now see" callout: the verified first-success moment. */
  expect?: string;
}

export interface DocsPathCard {
  name: string;
  forWhom: string;
  time: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
}

export const docsIndex = {
  metaTitle: "Dokumentacija",
  metaDescription:
    "Tri načina pokretanja Cogeta: brzi početak jednom naredbom, produkcija s potpisanim slikama i jednom skriptom te potpuno offline rad u zatvorenoj mreži.",
  eyebrow: "Dokumentacija",
  headline: "Pokrenite ga onako kako vaše okruženje dopušta",
  lede:
    "Sve na ovim stranicama radi iz izdanja otvorenog koda. Odaberite put koji odgovara tome gdje vaši dokumenti smiju živjeti. Dokumentacija u repozitoriju mjerodavna je za operatere; ove se stranice provjeravaju prema njoj za svako izdanje.",
  paths: [
    {
      name: "Brzi početak, na vašem računalu",
      forWhom: "Za procjenu: jedna naredba na svježem klonu dovodi do upotrebljive prijave.",
      time: "Nekoliko minuta na svakom novijem računalu",
      bullets: [
        "docker compose up, bez ikakve konfiguracije",
        "Radi bez ključa modela; pozivi modelima padaju iskreno umjesto da se pretvaraju",
        "Popunjeni demo sandbox za istraživanje",
      ],
      href: "/docs/quickstart",
      ctaLabel: "Krenite s brzim početkom",
    },
    {
      name: "Na vlastitoj infrastrukturi, u produkciji",
      forWhom: "Za vođenje stvarne instance na vlastitoj infrastrukturi.",
      time: "Jedna operaterska skripta na svježem Ubuntu poslužitelju",
      bullets: [
        "Samo povlačenje: tri slike izdanja, svaka potpisana cosignom",
        "Skripta sama provjerava potpise i završava kontrolnim popisom",
        "Automatski TLS čim se DNS zapisi razriješe",
      ],
      href: "/docs/self-hosted",
      ctaLabel: "Instalirajte u produkciji",
    },
    {
      name: "Potpuno offline",
      forWhom: "Za zatvorene mreže iz kojih ništa ne smije izaći, uključujući povlačenje slika.",
      time: "Fizički izolirano, bez izlazne povezivosti",
      bullets: [
        "Modeli, vektorski prikazi, prepoznavanje stranica i pretraživanje rade unutar instance",
        "Jedna izlazna točka za modele, provjeravana u kontinuiranoj integraciji",
        "Offline paket slika za fizički izolirane instalacije",
      ],
      href: "/docs/offline",
      ctaLabel: "Isplanirajte offline instalaciju",
    },
  ] as DocsPathCard[],
  hostedNote:
    "Ne želite ga uopće voditi sami? Hostana instanca na EU infrastrukturi namjerno nema postupak instalacije: počinje razgovorom o pilotu.",
  hostedCta: { label: "Pokrenite pilot", href: "/get-started" },
  authorityNote:
    "Dokumentacija u repozitoriju ostaje mjerodavna za operatere, uključujući potpuni runbook za korisničke instance.",
  authorityLinks: [
    {
      label: "docs/ u repozitoriju",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs",
    },
    {
      label: "Lokalno pokretanje",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/running-locally.md",
    },
    {
      label: "Implementacija",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
    },
  ],
};

export const docsQuickstart = {
  metaTitle: "Brzi početak",
  metaDescription:
    "Jedna naredba na svježem klonu dovodi do upotrebljive prijave: git clone, docker compose up, otvorite https://localhost. Radi i bez ključa modela.",
  eyebrow: "Dokumentacija · Brzi početak",
  headline: "Jedna naredba do upotrebljive prijave",
  lede:
    "Trajno obećanje repozitorija: docker compose up na svježem klonu dovodi do upotrebljive prijave bez ikakve konfiguracije. Sve u nastavku detalj je oko te jedne naredbe.",
  prerequisites: {
    heading: "Prije početka",
    items: [
      "Docker Engine s dodatkom compose. Docker Desktop je u redu. Stog se pri prvom pokretanju gradi lokalno; svako novije računalo s oko 8 GB slobodnog RAM-a sasvim je dovoljno.",
      "Po želji: Mistral API ključ za funkcije modela. Bez njega stog i dalje radi: prijava, prihvat, nadzorna ploča i red čekanja rade, a pozivi modelima padaju s tipiziranom greškom umjesto da se pretvaraju.",
      "Node 22 i npm samo ako razvijate. Za pokretanje stoga nisu potrebni.",
    ],
  },
  steps: [
    {
      title: "Klonirajte i pokrenite",
      text: "Prvo pokretanje gradi slike i inicijalizira identitet, što traje minutu ili dvije.",
      command:
        "git clone https://github.com/Cogeto/cogeto.git\ncd cogeto\ndocker compose up",
    },
    {
      title: "Otvorite i prijavite se",
      text: "Razvojni rub poslužuje samopotpisani certifikat lokalnog certifikacijskog tijela, pa će preglednik jednom upozoriti. Prihvatite ga.",
      expect:
        "Otvorite https://localhost i prijavite se kao razvojni administrator: admin@cogeto.localhost s lozinkom DevPassword1! Gledate vlastitu instancu.",
    },
    {
      title: "Dodajte ključ modela",
      text: "Kopirajte .env.example u .env, postavite svoj ključ i ponovno podignite stog. Razvojne zadane vrijednosti sigurne su samo za localhost; predprovjera odbija poznate razvojne tajne na svakoj domeni koja nije localhost.",
      command: "cp .env.example .env\ndocker compose up -d",
    },
  ] as DocStep[],
  demo: {
    heading: "Sandbox Ana",
    text: "Izmišljena konzultantica s tjednima nakupljene memorije, popunjeno kroz stvarni javni API: proturječnosti za razrješavanje, istekle činjenice, potpisana potvrda o brisanju. Pristupnu lozinku ispisuje posao za popunjavanje. Demo profil nikad ne pokrećite na instanci sa stvarnim podacima.",
    command: "COGETO_DEMO_MODE=1 docker compose --profile demo up --build",
    logCommand: "docker compose logs demo-seed",
  },
  troubleshooting: {
    heading: "Ako nešto izgleda pogrešno",
    items: [
      {
        q: "Port 80 ili 443 već je zauzet",
        a: "Radi neki drugi web poslužitelj. Zaustavite ga ili promijenite objavljene portove u compose nadjačanju.",
      },
      {
        q: "Razgovor ili ekstrakcija vraćaju grešku pristupnika modela",
        a: "Nije postavljen API ključ modela. To je predviđeno ponašanje bez ključa, a ne pad.",
      },
      {
        q: "Jednokratni init kontejner prikazuje exited (0)",
        a: "Normalno. Predprovjera, inicijalizacija baze, migracije, inicijalizacija spremišta i inicijalizacija identiteta izvode se jednom po pokretanju i završavaju.",
      },
      {
        q: "Početak ispočetka",
        a: "docker compose down -v briše sve podatke, uključujući ključ za potpisivanje instance i potvrde. U redu na razvojnom računalu; nikad odgovor na stvarnoj instanci.",
      },
    ],
  },
  warn: "docker compose down -v briše sve, uključujući ključ za potpisivanje instance i lanac potvrda. Na stvarnoj instanci odgovor je uvijek uvježbana obnova iz sigurnosne kopije, nikad brisanje.",
  next: {
    heading: "Kamo dalje",
    text: "Kad vas procjena uvjeri, produkcija je drugačiji, sigurniji put: potpisane slike i jedna operaterska skripta.",
    links: [
      { label: "Na vlastitoj infrastrukturi, u produkciji", href: "/docs/self-hosted" },
      {
        label: "Lokalno pokretanje, potpuna referenca",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/running-locally.md",
        external: true,
      },
    ],
  },
  cta: {
    heading: "Radije biste ga prvo vidjeli na svojim dokumentima?",
    sub: "Pilot pročita vaš stvaran skup dokumenata i završava potpisanim izvješćem o nalazima.",
    secondary: { label: "Natrag na sve putove", href: "/docs" },
  },
};

export const docsSelfHosted = {
  metaTitle: "Instalacija na vlastitoj infrastrukturi",
  metaDescription:
    "Produkcijski Cogeto samo povlači: tri slike izdanja potpisane cosignom i jedna operaterska skripta koja sama provjerava potpise, instalira i nadograđuje.",
  eyebrow: "Dokumentacija · Vlastita infrastruktura",
  headline: "Jedna skripta, potpisane slike, bez iznenađenja",
  lede:
    "Produkcijska instanca nikad se ne gradi iz izvornog koda. Povlači tri unaprijed izgrađene slike po izdanju, svaku potpisanu u cjevovodu izdanja, a sve orkestrira jedna operaterska skripta koja potpise provjerava sama.",
  model: {
    heading: "Model implementacije",
    items: [
      "Jedna instanca jest jedan kupac. Izolacija je granica implementacije; višekorisnički način rada ne postoji.",
      "Samo povlačenje: slika aplikacije i workera, slika ruba s izgrađenim sučeljem i servis za isključivo primanje ulazne pošte, svaka potpisana cosignom.",
      "Tajne se generiraju po instanci i compose datoteka ih zahtijeva; ništa se ne commita.",
      "Sve orkestrira jedna operaterska skripta: instalacija, konfiguracija, nadogradnja, status i probni način rada. Svako izvođenje završava popisom onoga što ne može učiniti umjesto vas: DNS zapisi, postavke sigurnosnih kopija, koraci provjere.",
    ],
  },
  prerequisites: {
    heading: "Prije početka",
    items: [
      "Svježa Ubuntu 22.04 ili 24.04 instanca.",
      "Domena pod vašom kontrolom; TLS je automatski kroz Let's Encrypt čim se ispisani DNS zapisi razriješe.",
      "API ključ modela, osim ako će instanca raditi samo s lokalnim modelima.",
    ],
  },
  steps: [
    {
      title: "Dohvatite operatersku skriptu",
      text: "Skripta instalira vlastite alate, uključujući cosign za provjeru potpisa.",
      command:
        "curl -fsSL https://raw.githubusercontent.com/Cogeto/cogeto/main/scripts/operator/cogeto -o cogeto\nchmod +x cogeto",
    },
    {
      title: "Najprije probno izvođenje",
      text: "Način provjere validira okruženje i ispisuje što bi instalacija napravila, bez ikakvih promjena.",
      command: "sudo ./cogeto install --check --domain <your.domain> --acme-email <you>",
    },
    {
      title: "Instalirajte",
      text: "Skripta povlači slike izdanja, provjerava njihove potpise, generira tajne i podiže instancu.",
      command:
        "sudo ./cogeto install --domain <your.domain> --acme-email <you> --mistral-key <key>",
      expect:
        "Izvođenje završava kontrolnim popisom za tu instancu: DNS zapisi koje treba stvoriti, postavke sigurnosnih kopija koje treba potvrditi i koraci provjere. TLS se aktivira čim se DNS zapisi razriješe.",
    },
    {
      title: "Sami provjerite sliku izdanja, bilo kada",
      text: "Potpisivanje je bez ključa, kroz javni dnevnik transparentnosti, pa provjera ne treba nikakav ključ od nas. Svako GitHub izdanje nosi i popis softverskih komponenti slike i točnu naredbu za provjeru.",
      command:
        "cosign verify cogeto/cogeto:<version> \\\n  --certificate-identity-regexp '^https://github.com/Cogeto/cogeto/\\.github/workflows/release\\.yml@refs/tags/' \\\n  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com'",
    },
  ] as DocStep[],
  upgrades: {
    heading: "Nadogradnje i povratak",
    text: "Najprije ponovno preuzmite skriptu: instalirana kopija ne može ažurirati samu sebe, a samo nova skripta dopunjuje vjerodajnice koje noviji compose zahtijeva. Skripta odbija neobjavljene oznake, ponovno izvodi migracije, provjerava zdravlje instance i prepoznaje kad je izdanje promijenilo model vektorskih prikaza te nudi ponovno indeksiranje. Povratak vraća slike; migracije idu samo naprijed, a potpuni povratak podataka jest uvježbana obnova iz sigurnosne kopije prema runbooku.",
    command:
      "curl -fsSL https://raw.githubusercontent.com/Cogeto/cogeto/main/scripts/operator/cogeto -o cogeto\nchmod +x cogeto\nsudo ./cogeto upgrade",
  },
  notThis: {
    heading: "Što implementacija namjerno nije",
    text: "Bez Terraforma, bez automatizacije cloud API-ja, bez samoposlužnog provizioniranja, bez automatskih ažuriranja: jedna dobra skripta koju pokreće čovjek, za skupinu korisnika u kojoj je svaka instanca važna. Sigurnosne kopije koriste mogućnosti samog pružatelja hostinga, a obnova se uvježbava, a ne pretpostavlja. Operaterski runbook pokriva provizioniranje, DNS, uvođenje, sigurnosne kopije s uvježbanom obnovom, nadogradnje i rješavanje problema, popis po popis.",
    links: [
      {
        label: "Operaterski runbook",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/operator-runbook.md",
        external: true,
      },
      {
        label: "Referenca za implementaciju",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
        external: true,
      },
    ],
  },
  cta: {
    heading: "Želite da ga umjesto toga vodimo mi?",
    sub: "Hostana instanca na EU infrastrukturi počinje razgovorom o pilotu, a ne obrascem za registraciju.",
    secondary: { label: "Potpuno offline instalacija", href: "/docs/offline" },
  },
};

export const docsOffline = {
  metaTitle: "Potpuno offline instalacija",
  metaDescription:
    "Cogeto radi u zatvorenoj mreži bez izlazne povezivosti: lokalni modeli, prepoznavanje stranica na CPU-u, bez telemetrije, offline paket slika.",
  eyebrow: "Dokumentacija · Offline",
  headline: "Offline koji je provjerljiv, a ne ustvrđen",
  lede:
    "Cogeto radi u cijelosti unutar mreže kupca, bez ikakve izlazne povezivosti. To je podržan, ravnopravan način implementacije, a ne degradirani način rada, i arhitektura ga čini provjerljivim.",
  what: {
    heading: "Što radi unutar granice",
    items: [
      "Jezični modeli i vektorski prikazi rade u lokalnom okruženju na vašem hardveru; vizijski model u istom okruženju čita skenove koje prepoznavanje znakova ne može obraditi.",
      "Prepoznavanje stranica radi na CPU-u unutar instance, s jezičnim paketima za engleski i hrvatski.",
      "Pretraživanje web stila za istraživački put hostano je unutar instance.",
      "Spremište, identitet i red čekanja isti su stog kao u svakoj drugoj implementaciji. Telemetrije nema.",
    ],
  },
  seam: {
    heading: "Zašto to možete provjeriti",
    text: "Svaki poziv modelu prolazi kroz jednu jedinu izlaznu točku, provjeravanu u kontinuiranoj integraciji: postoji točno jedno mjesto u kodu s kojeg bi poziv mogao napustiti instancu, a u offline konfiguraciji ono pokazuje na lokalno okruženje. Kod je otvoren, pa vaš sigurnosni tim to može potvrditi umjesto da vjeruje.",
    links: [
      {
        label: "Arhitektura, odjeljak o offline radu",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/cogeto-technical-architecture.md",
        external: true,
      },
      { label: "Sigurnost i suverenost", href: "/security" },
    ],
  },
  bundle: {
    heading: "Fizički izolirane instalacije",
    text: "Za okruženja u kojima ni povlačenje slika nije dostupno, instanca se isporučuje kao offline paket slika, pa se instalacija obavlja s medija koji sami prenesete preko granice. Offline implementacije planiraju se zajednički u razgovoru o pilotu: dimenzioniranje lokalnog okruženja za modele, primopredaja paketa i postupak ažuriranja za vaše okruženje.",
  },
  quality: {
    heading: "Upoznajte izmjerenu kvalitetu prije obveze",
    text: "Lokalne i hostane konfiguracije modela mjere se odvojeno, a rezultati svake konfiguracije objavljuju se po izdanju. Administracijska stranica prikazuje izmjerenu kvalitetu konfiguracije koju pokrećete i označava neispitane kombinacije.",
    links: [{ label: "Objavljeni rezultati točnosti", href: "/trust" }],
  },
  cta: {
    heading: "Isplanirajte offline instalaciju s nama.",
    sub: "Fizički izolirane mreže ovdje su uobičajen razgovor. Pilot se može u cijelosti izvesti unutar vaše mreže.",
    secondary: { label: "Na vlastitoj infrastrukturi, u produkciji", href: "/docs/self-hosted" },
  },
};

/** Small interface chrome shared by the docs pages. */
export const docsUi = {
  copyLabel: "Kopirajte naredbu",
  copiedLabel: "Kopirano",
};
