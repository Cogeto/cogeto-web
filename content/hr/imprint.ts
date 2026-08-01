import type { ImprintContent } from "../en/imprint";

/**
 * Croatian imprint. Only labels, headings, and descriptive prose are
 * translated; every identifier, number, company name, address, IBAN,
 * SWIFT, and bank line stays verbatim from the English register data.
 * The court name renders in its official Croatian form.
 */
export const imprint: ImprintContent = {
  metaTitle: "Impresum",
  metaDescription: "Pravne informacije za cogeto.eu.",
  eyebrow: "Pravno",
  title: "Impresum",
  lede: "Cogeto (cogeto.eu) razvijaju i vode:",
  entities: [
    {
      name: "MVT Solutions Group d.o.o.",
      fields: [
        ["Sjedište", "Podolje 11A, 10000 Zagreb, Croatia"],
        ["Ured", "Radnička cesta 34, 10000 Zagreb, Croatia"],
        ["Direktor", "Ivan Golubic"],
        ["Sudski registar", "Trgovački sud u Zagrebu, MBS 081063617"],
        ["Matični broj (MB)", "04642244"],
        ["OIB", "85300439344"],
        ["PDV ID", "HR85300439344"],
        ["Temeljni kapital", "3,000.00 EUR, uplaćen u cijelosti"],
        ["Banka", "Erste&Steiermärkische Bank d.d., Jadranski trg 3a, 51000 Rijeka"],
        ["IBAN", "HR2124020061100921423"],
        ["SWIFT", "ESBCHR22"],
      ],
    },
    {
      name: "MCTO Advisory d.o.o.",
      fields: [
        ["Sjedište", "Bregana Pisarovinska 37, 10451 Pisarovina, Croatia"],
        ["Ured", "Radnička cesta 34, 10000 Zagreb, Croatia"],
        ["Direktor", "Ivan Golubic"],
        ["Sudski registar", "Trgovački sud u Zagrebu, MBS 081690324"],
        ["Matični broj (MB)", "06211399"],
        ["OIB", "74348605691"],
        ["PDV ID", "HR74348605691"],
        ["Temeljni kapital", "3,000.00 EUR, uplaćen u cijelosti"],
        ["Banka", "Erste&Steiermärkische Bank d.d., Jadranski trg 3a, 51000 Rijeka"],
        ["IBAN", "HR3724020061101320969"],
        ["SWIFT", "ESBCHR22"],
      ],
    },
    {
      name: "Ivan Golubic",
      fields: [
        ["Uloga", "Razvija i podržava Cogeto"],
        ["Lokacija", "Hrvatska, Europska unija"],
      ],
    },
  ],
  contactLabel: "Kontakt:",
  email: "hi@cogeto.eu",
};
