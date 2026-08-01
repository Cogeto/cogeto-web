/**
 * Croatian copy for /security. Mirrors content/en/security.ts; only string
 * values are translated.
 */

export interface SecurityContent {
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    headline: string;
    lede: string;
    secondary: { label: string; href: string };
  };
  badgesHeading: string;
  /** Link labels on badge cards: external evidence and internal detail. */
  badgeUi: { evidenceLabel: string; detailsLabel: string };
  badges: {
    icon: "award" | "shield" | "signature" | "check";
    name: string;
    text: string;
    href?: string;
    external?: boolean;
  }[];
  highlightsHeading: string;
  highlights: { title: string; text: string }[];
  clustersHeading: string;
  clustersSub: string;
  clusters: { title: string; bullets: string[] }[];
  audit: {
    heading: string;
    text: string;
    links: { label: string; href: string; external?: boolean }[];
  };
  company: { heading: string; text: string };
  artifactsHeading: string;
  artifacts: { label: string; href: string; external?: boolean }[];
  cta: { heading: string; sub: string; secondary: { label: string; href: string; external?: boolean } };
}

export const security: SecurityContent = {
  metaTitle: "Sigurnost i suverenost",
  metaDescription:
    "Izolacija po korisniku, EU ili potpuno offline, potpisane potvrde o brisanju, objavljen sigurnosni audit i tvrtka s certifikatima ISO 9001 i ISO 27001.",
  hero: {
    eyebrow: "Sigurnost i suverenost",
    headline: "Ništa na povjerenje. Sve provjerljivo.",
    lede:
      "Svaka tvrdnja na ovoj stranici mehanizam je u izdanju otvorenog koda ili certifikat tvrtke koja stoji iza njega. Arhitektura je javna, audit je objavljen, a kod se može pročitati prije nego što ijedan dokument ikamo pošaljete.",
    secondary: {
      label: "Preuzmite jednostranični sažetak usklađenosti",
      href: "/documents/cogeto-compliance-onepager.pdf",
    },
  },
  badgesHeading: "Certifikati i dokazi",
  badgeUi: { evidenceLabel: "Pogledajte dokaz", detailsLabel: "Pojedinosti" },
  badges: [
    {
      icon: "award",
      name: "ISO 9001",
      text: "Certifikat tvrtke MVT Solutions Group, tvrtke koja razvija i vodi Cogeto. Upravljanje kvalitetom, pod auditom.",
    },
    {
      icon: "award",
      name: "ISO 27001",
      text: "Certifikat tvrtke MVT Solutions Group. Upravljanje informacijskom sigurnošću, pod auditom.",
    },
    {
      icon: "check",
      name: "Otvoreni kod, AGPLv3",
      text: "Jezgra je javna. Vaš sigurnosni tim može redak po redak pročitati put unosa, kontrole pristupa i sagu brisanja.",
      href: "/open-source",
    },
    {
      icon: "shield",
      name: "Objavljen sigurnosni audit",
      text: "Audit verzije 2.0, zatvoren kroz pet valova otklanjanja nalaza, s neovisnom potvrdom, objavljen u cijelosti u repozitoriju.",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
      external: true,
    },
    {
      icon: "signature",
      name: "Potpisana izdanja",
      text: "Produkcijske instance povlače unaprijed izgrađene slike koje potpisuje cjevovod izdanja. Operaterska skripta sama provjerava potpise, a svako izdanje nosi svoj popis softverskih komponenti.",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
      external: true,
    },
    {
      icon: "check",
      name: "Mapiranje GDPR-a i Akta o umjetnoj inteligenciji",
      text: "Brisanje s potpisanim potvrdama, zaštita ugrađena u samu arhitekturu i transparentnost koja pokazuje kako radi. Mapirano tvrdnju po tvrdnju na stranici usklađenosti.",
      href: "/compliance",
    },
  ],
  highlightsHeading: "Sigurnosni dizajn u šest mehanizama",
  highlights: [
    {
      title: "Jedna instanca po korisniku",
      text: "Nema zajedničke baze, nema stupca s oznakom klijenta, nema putanje upita između klijenata. Izolacija je granica implementacije, a ne filtar.",
    },
    {
      title: "Offline znači offline",
      text: "Modeli, vektorski prikazi, prepoznavanje stranica i pretraživanje rade unutar instance. Jedna izlazna točka, provjeravana u CI-ju. Bez telemetrije.",
    },
    {
      title: "Bez redigiranja nema poziva",
      text: "Osjetljivi entiteti lokalno se pseudonimiziraju prije svakog poziva vanjskom modelu. Ako redigiranje nije moguće, poziv se ne događa.",
    },
    {
      title: "Brisanje koje možete dokazati",
      text: "Brisanje se izvodi kao saga kroz sva tri spremišta i završava potpisanom potvrdom povezanom hash lancem, koja se svake noći ponovno provjerava.",
    },
    {
      title: "Revizijski zapis koji se ne može uređivati",
      text: "Samo dopisivanje, provedeno okidačem u bazi, upisano u istoj transakciji kao i radnja, obuhvaća i čitanja i upise.",
    },
    {
      title: "Odlazak je podržan",
      text: "Memory Passport izvozi sve, potpisano, u otvorenom dokumentiranom formatu koji se provjerava i izvan Cogeta.",
    },
  ],
  clustersHeading: "Kontrole, u obliku upitnika",
  clustersSub:
    "Počinju glagolom, pa ih vaš recenzent može zalijepiti ravno u obrazac za dobavljače.",
  clusters: [
    {
      title: "Izolacija i pristup",
      bullets: [
        "Radi kao jedna implementacija po kupcu; višekorisnički način rada ne postoji",
        "Provodi pristup unutar samog upita, u oba spremišta, nikad na dohvaćenim rezultatima",
        "Dodjeljuje opseg deterministički; nikad ne izvodi dozvole iz sadržaja",
        "Šifrira izvornike u mirovanju ključevima vezanima uz klijenta; poslužuje ih samo kroz kratkotrajne potpisane URL-ove",
      ],
    },
    {
      title: "Promet prema modelima i suverenost",
      bullets: [
        "Usmjerava svaki poziv modelu kroz jednu jedinu izlaznu točku, provjeravanu u CI-ju",
        "Zadano koristi europskog pružatelja; podržava potpuno lokalne modele",
        "Pseudonimizira imena, organizacije i iznose prije svakog vanjskog poziva, uključujući vektorske prikaze",
        "Nikad ne koristi sadržaj kupaca za treniranje",
      ],
    },
    {
      title: "Dokaz i cjelovitost",
      bullets: [
        "Potpisuje potvrde o brisanju i povezuje ih hash lancem s prethodnicima",
        "Svake noći traži siročad i neovlaštene izmjene; prijavljuje i nikad sam ne popravlja",
        "Bilježi svaku promjenu stanja u revizijski zapis koji se može samo dopisivati",
        "Objavljuje izmjerenu točnost po izdanju, po jeziku i po konfiguraciji modela",
      ],
    },
  ],
  audit: {
    heading: "Pod auditom, i audit je javan",
    text: "Sigurnosni audit verzije 2.0 zatvoren je kroz pet valova otklanjanja: svaki nalaz ispravljen ili svjesno prihvaćen uz pisano obrazloženje. I audit i njegova neovisna potvrda objavljeni su u repozitoriju i mogu se pročitati u cijelosti. To je standard kojeg se drži i ova stranica: nema tvrdnje bez artefakta.",
    links: [
      {
        label: "Pročitajte audit",
        href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
        external: true,
      },
      {
        label: "Sigurnosna dokumentacija",
        href: "https://github.com/Cogeto/cogeto/tree/main/docs/security",
        external: true,
      },
      {
        label: "Prijavite ranjivost",
        href: "https://github.com/Cogeto/cogeto/blob/main/SECURITY.md",
        external: true,
      },
    ],
  },
  company: {
    heading: "Tvrtka koja stoji iza svega",
    text: "Cogeto razvijaju MVT Solutions Group d.o.o. i MCTO Advisory d.o.o., dvije tvrtke koje posluju iz Hrvatske u Europskoj uniji, a osnovao ih je i vodi Ivan Golubic. MVT Solutions Group nosi certifikate ISO 9001 i ISO 27001, pa upravljanje kvalitetom i informacijskom sigurnošću proizvoda počiva na auditiranim procesima tvrtke, ne samo na kodu.",
  },
  artifactsHeading: "Ponesite artefakte sa sobom",
  artifacts: [
    {
      label: "Jednostranični sažetak usklađenosti (PDF)",
      href: "/documents/cogeto-compliance-onepager.pdf",
    },
    { label: "Potpuno mapiranje usklađenosti", href: "/compliance" },
    { label: "Objavljeni rezultati točnosti", href: "/trust" },
    {
      label: "Shema Memory Passporta",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/passport-schema",
      external: true,
    },
  ],
  cta: {
    heading: "Povedite svoj sigurnosni tim na pilot.",
    sub: "Zahtjevi za rezidentnost podataka, fizički izolirane mreže i sigurnosne provjere ovdje su uobičajen razgovor, a ne iznimka.",
    secondary: {
      label: "Pročitajte audit",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
      external: true,
    },
  },
};
