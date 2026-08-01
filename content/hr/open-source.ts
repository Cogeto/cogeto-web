/**
 * Croatian copy for /open-source. Mirrors content/en/open-source.ts; only
 * string values are translated.
 */

export const openSource = {
  metaTitle: "Otvoreni kod",
  metaDescription:
    "Jezgra Cogeta objavljena je pod AGPLv3 jer je provjerljivost proizvod. Kod je besplatan; kupujete vođenje, integraciju, izmjerenu točnost i odgovornost.",
  eyebrow: "Otvoreni kod",
  headline: "Jezgra je otvorena, jer povjerenje koje se ne može provjeriti nije povjerenje",
  lede:
    "Jezgra Cogeta objavljena je pod licencijom AGPLv3. Razlog nije distribucijska strategija, nego vjerodostojnost: svaka tvrdnja na ovim stranicama tvrdnja je o kodu, a objavljen kod pretvara te tvrdnje iz uvjeravanja u izjave koje svatko može provjeriti.",
  whyPay: {
    heading: "Ako je kod besplatan, zašto platiti",
    paragraphs: [
      "To je model na kojem ozbiljne tvrtke otvorenog koda posluju desetljećima: kod je besplatan, a poduzeća svejedno plaćaju, za vođenje, odgovornost, integraciju i stručnost, jer nitko poslovno ključan softver ne vodi sam.",
      "Cogeto radi jednako, uz jednu razliku koja podiže ulog: instanca čuva godine nakupljene, provjerene institucionalne memorije, pa profesionalno vođenje svakim mjesecom rada vrijedi sve više.",
    ],
    openCard: {
      name: "Besplatno zauvijek, u cijelosti",
      bullets: [
        "Jezgra: unos, provjera, usklađivanje, dohvat, razgovor",
        "Izvješće o nalazima i svaki dokazni artefakt",
        "Put instalacije i konfiguracije, potpuno dokumentiran",
        "Mjerni okvir i objavljeni rezultati točnosti",
      ],
    },
  },
  quote:
    "Koristite Cogeto besplatno zauvijek. Plaćate da bude vaš: instaliran unutar vaših zidova, prilagođen vašim dokumentima, izmjeren na vašem materijalu i s nekim tko za njega odgovara.",
  offers: {
    heading: "Što od nas kupujete",
    sub: "Konkretni angažmani, redoslijedom kojim ih kupci uzimaju. Nema cjenika, nema paketa za dešifriranje: svaki počinje razgovorom.",
    items: [
      {
        title: "1. Pilot",
        text: "Pošaljete nam skup dokumenata; isporučujemo potpisano izvješće o nalazima. Fiksan opseg, dani, a ne mjeseci. To je prva kupnja.",
        link: { label: "Pokrenite pilot", href: "/get-started" },
      },
      {
        title: "2. Vaša instanca, vođena",
        text: "Vodimo je u EU ili je postavljamo na vaše poslužitelje: instalacija, ažuriranja, sigurnosne kopije, nadzor, potpisan ugovor o obradi podataka i jedna odgovorna osoba. Četiri godine provjerene memorije nije nešto što želite na neodržavanom kontejneru.",
      },
      {
        title: "3. Unutar vaših zidova",
        text: "Implementacija na vlastitoj infrastrukturi i potpuno offline, integracija s vašim davateljem identiteta, usmjeravanje pošte, konektori prema vašim sustavima i lokalni modeli na vašem hardveru, pa ništa nikad ne izlazi.",
      },
      {
        title: "4. Prilagođeno vašoj industriji",
        text: "Ekstrakcija i provjera kalibrirane za vašu klasu dokumenata, zlatni skup izgrađen iz vaših tipova dokumenata i rezultati točnosti objavljeni za točno vašu konfiguraciju. Prilagođeni i lokalni modeli ondje gdje materijal to traži. Jezgru svatko može klonirati; izmjerenu točnost na vašim dokumentima ne može.",
      },
      {
        title: "5. Podrška i jamstva",
        text: "Podrška s rokovima odgovora, odgovoreni sigurnosni upitnici, vođene nadogradnje i migracije, edukacija te komercijalna licencija ondje gdje AGPL ne odgovara vašem pravnom okviru.",
      },
    ],
  },
  why: {
    heading: "Licencija obavlja posao povjerenja",
    paragraphs: [
      "Objavljen kod čini naše tvrdnje o povjerenju provjerljivima, a provjerljivost je proizvod. Uklanja i rizik ovisnosti o dobavljaču: i kod i vaši podaci nadžive nas. Posao je sve oko koda, a AGPLv3 drži dogovor poštenim: tko god izmijenjenu verziju pokreće kao uslugu, mora objaviti svoje izmjene, pa kod koji možete pročitati ostaje kod koji doista radi.",
    ],
    claims: [
      "Pravila vidljivosti žive u upitima baze, ne u aplikacijskom kodu koji je netko zaboravio pozvati",
      "Nijedna činjenica ne može postojati bez podrijetla; izvorni isječak obavezno je polje",
      "Potvrde o brisanju povezane su hash lancem, pa se nijedna ne može izmijeniti ni ukloniti",
      "Postoji točno jedno mjesto kroz koje poziv modelu može napustiti instancu",
    ],
  },
  cards: [
    {
      title: "Ništa vas ne drži na mjestu",
      text: "Jedan klik izvozi sve, činjenice, izvore, povijest, veze i potvrde, u otvorenom dokumentiranom formatu koji se provjerava i izvan Cogeta. Ako odlazite, odlazite sa svime, dokazivo netaknutim.",
    },
    {
      title: "Ime i logotip su zaštitni znakovi",
      text: "Ime i logotip Cogeto nisu obuhvaćeni licencijom koda. Kod je slobodan za korištenje pod AGPLv3; predstavljanje izmijenjene usluge kao Cogeta nije.",
    },
    {
      title: "Doprinosi su dobrodošli",
      text: "Prijave problema, vodič za doprinose, pravila zlatnog skupa i postupak prijave ranjivosti javni su. Doprinosi traže prihvaćanje ugovora o licenciji doprinositelja jednim komentarom; razlozi su ondje iskreno navedeni.",
    },
  ],
  linksHeading: "Pročitajte sami",
  badgeUi: { evidenceLabel: "Pogledajte dokaz", detailsLabel: "Pojedinosti" },
  links: [
    {
      icon: "check" as const,
      name: "Repozitorij",
      text: "Cijeli izvorni kod, dokumentacija, mjerni okvir i objavljene datoteke rezultata točnosti.",
      href: "https://github.com/Cogeto/cogeto",
      external: true,
    },
    {
      icon: "signature" as const,
      name: "Uvjeti komercijalne licencije",
      text: "Izuzeće od AGPL-a, izneseno jednostavnim jezikom u repozitoriju.",
      href: "https://github.com/Cogeto/cogeto/blob/main/COMMERCIAL-LICENSE.md",
      external: true,
    },
    {
      icon: "shield" as const,
      name: "Politika zaštitnih znakova",
      text: "Što AGPL pokriva, a što brend ne.",
      href: "https://github.com/Cogeto/cogeto/blob/main/TRADEMARK.md",
      external: true,
    },
  ],
  cta: {
    heading: "Jezgra je otvorena. Pilot je mjesto gdje postaje vaša.",
    secondary: { label: "Pokrenite ga sami", href: "/docs" },
  },
};
