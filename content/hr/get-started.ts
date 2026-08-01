/**
 * Croatian copy for /get-started. Mirrors content/en/get-started.ts; only
 * string values are translated.
 */

export interface OfferCard {
  name: string;
  highlight?: string;
  positioning: string;
  bullets: string[];
  cta: { label: string; href: string; kind: "primary" | "secondary" | "link" };
}

export interface GetStartedContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    lede: string;
    secondary: { label: string; href: string };
  };
  stepsHeading: string;
  steps: { title: string; text: string }[];
  offersHeading: string;
  offersSub: string;
  offers: OfferCard[];
  alsoFrom: {
    heading: string;
    items: { title: string; text: string }[];
    link: { label: string; href: string };
  };
  languagesNote: string;
  faqHeading: string;
  faq: { question: string; answer: string }[];
  contact: {
    heading: string;
    sub: string;
    steps: string[];
    chips: string[];
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    sendingLabel: string;
    sentTitle: string;
    sentBody: string;
    errorBody: string;
    directLine: string;
  };
}

export const getStarted: GetStartedContent = {
  metaTitle: "Pokrenite pilot",
  metaDescription:
    "Donesite stvaran skup dokumenata. Cogeto ga pročita i izradi potpisano izvješće o nalazima na vašem materijalu. Odgovaramo u roku od jednog radnog dana.",
  hero: {
    eyebrow: "Prvi koraci",
    headline: "Prvo što vidite jest što je pronašao u vašim dokumentima",
    lede:
      "Pilot počinje vašim stvarnim skupom dokumenata. Cogeto ga pročita i izradi potpisano izvješće o nalazima, prije ikakve dulje obveze. Vaši dokumenti, vaša infrastruktura ako želite i rezultat koji možete proslijediti.",
    secondary: { label: "Preuzmite jednostranični sažetak usklađenosti", href: "/documents/cogeto-compliance-onepager.pdf" },
  },
  stepsHeading: "Što slijedi",
  steps: [
    {
      title: "Odgovaramo u roku od jednog radnog dana",
      text: "Recite nam otprilike kako izgleda vaš skup dokumenata: koliko dokumenata, koji formati, koji jezici. To je sve što prvi odgovor treba.",
    },
    {
      title: "Razgovor o opsegu od 30 minuta",
      text: "S Cogeto timom, ne s prodajnim slijedom. Izlazite znajući ima li pilot smisla i što bi obuhvatio.",
    },
    {
      title: "Prijedlog pilota za vaše okruženje",
      text: "Vaši dokumenti, hostano u EU, u vašem oblaku ili potpuno offline. Pilot završava potpisanim izvješćem o nalazima na vašem materijalu.",
    },
  ],
  offersHeading: "Četiri načina rada",
  offersSub:
    "Svaka instanca služi jednom korisniku: jedna implementacija, jedan kupac, ništa zajedničko. Nema objavljenih cijena; svaki angažman počinje razgovorom o pilotu.",
  offers: [
    {
      name: "Pilot",
      highlight: "Počnite ovdje",
      positioning: "Pogledajte ga na vlastitim dokumentima prije ikakve obveze.",
      bullets: [
        "Vaš stvaran skup dokumenata, pročitan u cijelosti",
        "Pronađene proturječnosti, s poveznicama na oba izvora",
        "Na kraju potpisano izvješće o nalazima",
        "Izvješće zadržavate u svakom slučaju",
      ],
      cta: { label: "Pokrenite pilot", href: "#contact", kind: "primary" },
    },
    {
      name: "Hostano u EU",
      positioning: "Vaša instanca, vođena za vas: instalirana, ažurirana, s odgovornom osobom.",
      bullets: [
        "Instanca za jednog korisnika, samo vaša, jurisdikcija EU",
        "Instalacija, ažuriranja, sigurnosne kopije i nadzor, odrađeni za vas",
        "Potpisan ugovor o obradi podataka i jedna odgovorna osoba",
        "Osjetljivi entiteti redigirani prije svakog vanjskog poziva",
      ],
      cta: { label: "Razgovarajte s nama", href: "#contact", kind: "secondary" },
    },
    {
      name: "Na vlastitoj infrastrukturi",
      positioning: "Pokrenite izdanje otvorenog koda na vlastitoj infrastrukturi.",
      bullets: [
        "AGPLv3, uključeno sve s ovih stranica",
        "Potpisane slike izdanja, jedna operaterska skripta",
        "Javna dokumentacija za instalaciju i konfiguraciju",
        "Komercijalna licencija dostupna ako vam zatreba",
      ],
      cta: { label: "Pročitajte dokumentaciju", href: "/docs", kind: "link" },
    },
    {
      name: "Potpuno offline",
      positioning: "Unutar vaših zidova, ništa uopće ne izlazi.",
      bullets: [
        "Lokalni modeli posluženi na vašem hardveru",
        "Integracija s vašim davateljem identiteta",
        "Usmjeravanje pošte i konektori prema vašim sustavima",
        "Offline paket slika za fizički izolirane instalacije",
      ],
      cta: { label: "Sigurnost i suverenost", href: "/security", kind: "link" },
    },
  ],
  alsoFrom: {
    heading: "Također od nas",
    items: [
      {
        title: "Prilagođeno vašoj industriji",
        text: "Ekstrakcija i provjera kalibrirane za vašu klasu dokumenata, zlatni skup izgrađen iz vaših tipova dokumenata i rezultati točnosti objavljeni za točno vašu konfiguraciju.",
      },
      {
        title: "Podrška i jamstva",
        text: "Podrška s rokovima odgovora, odgovoreni sigurnosni upitnici, vođene nadogradnje i migracije, edukacija te komercijalna licencija ondje gdje AGPL ne odgovara vašem pravnom okviru.",
      },
    ],
    link: { label: "Zašto je kod besplatan, a ovo nije", href: "/open-source" },
  },
  languagesNote:
    "Sučelje na engleskom, hrvatskom i njemačkom. Kvaliteta memorije mjeri se po jeziku i objavljuje, pa prije obveze vidite gdje je kvaliteta jaka.",
  faqHeading: "Pitanja koja kupci doista postavljaju",
  faq: [
    {
      question: "Napuštaju li moji podaci moju instancu?",
      answer:
        "Samo ako konfigurirate vanjskog pružatelja modela, i tada tek nakon što su osjetljivi entiteti lokalno zamijenjeni pseudonimima. U offline načinu rada ništa uopće ne izlazi.",
    },
    {
      question: "Trenirate li na našim dokumentima?",
      answer:
        "Nikad. Vaše znanje ostaje u vašoj instanci. Upravo to omogućuje citiranje, ispravljanje i dokazivo brisanje.",
    },
    {
      question: "Što ako prestanemo koristiti Cogeto?",
      answer:
        "Jedan klik izvozi sve, činjenice, izvore, povijest, veze i potvrde, u otvorenom dokumentiranom formatu. Kod je otvoren. Ništa u dizajnu ne drži vas na mjestu.",
    },
    {
      question: "Koliko je točan?",
      answer:
        "Izmjereno i objavljeno po izdanju, po jeziku i po konfiguraciji modela, uključujući i mjesta gdje ne doseže ciljeve. Stranica s rezultatima točnosti javna je.",
    },
    {
      question: "Može li raditi bez interneta?",
      answer:
        "Da, potpuno. Jezični modeli, vektorski prikazi, prepoznavanje stranica i pretraživanje rade unutar instance.",
    },
    {
      question: "Je li ovo medicinski proizvod ili regulatorna procjena?",
      answer:
        "Ne. Cogeto proizvodi dokaze o vašim dokumentima. Regulatorna prosudba ostaje na vašoj organizaciji.",
    },
  ],
  contact: {
    heading: "Pokrenite pilot",
    sub: "Tri polja. Odgovaramo u roku od jednog radnog dana.",
    steps: [
      "Odgovaramo u roku od jednog radnog dana",
      "Razgovor o opsegu od 30 minuta, bez prodajnog slijeda",
      "Prijedlog pilota: vaši dokumenti, vaša infrastruktura",
    ],
    chips: [
      "Tvrtka s certifikatima ISO 9001 i ISO 27001",
      "Otvoreni kod, AGPLv3",
      "Jurisdikcija EU",
    ],
    nameLabel: "Ime",
    emailLabel: "Poslovna e-adresa",
    messageLabel: "Kako izgleda vaš skup dokumenata?",
    messagePlaceholder:
      "Otprilike koliko dokumenata, koji formati, koji jezici i mora li raditi unutar vaše mreže.",
    submitLabel: "Pokrenite pilot",
    sendingLabel: "Slanje",
    sentTitle: "Zaprimljeno.",
    sentBody: "Svaku poruku čitamo sami i odgovaramo u roku od jednog radnog dana.",
    errorBody:
      "Slanje trenutačno nije uspjelo. Pišite nam izravno na hi@cogeto.eu; vrijedi isti odgovor u roku od jednog radnog dana.",
    directLine: "Draža vam je obična e-pošta? hi@cogeto.eu, isti odgovor u roku od jednog radnog dana.",
  },
};
