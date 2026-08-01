/**
 * Across locales only the surrounding labels and headings are translated;
 * every identifier, number, name, and address stays verbatim.
 */

export type ImprintEntity = {
  name: string;
  fields: readonly (readonly [string, string])[];
};

export type ImprintContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  entities: readonly ImprintEntity[];
  /** Label before the mailto link, e.g. "Contact:". */
  contactLabel: string;
  email: string;
};

export const imprint: ImprintContent = {
  metaTitle: "Imprint",
  metaDescription: "Legal information for cogeto.eu.",
  eyebrow: "Legal",
  title: "Imprint",
  lede: "Cogeto (cogeto.eu) is built and operated by:",
  entities: [
    {
      name: "MVT Solutions Group d.o.o.",
      fields: [
        ["Registered seat", "Podolje 11A, 10000 Zagreb, Croatia"],
        ["Office", "Radnička cesta 34, 10000 Zagreb, Croatia"],
        ["Director", "Ivan Golubic"],
        ["Court register", "Commercial Court in Zagreb, MBS 081063617"],
        ["Registration number (MB)", "04642244"],
        ["OIB", "85300439344"],
        ["VAT ID", "HR85300439344"],
        ["Share capital", "3,000.00 EUR, paid in full"],
        ["Bank", "Erste&Steiermärkische Bank d.d., Jadranski trg 3a, 51000 Rijeka"],
        ["IBAN", "HR2124020061100921423"],
        ["SWIFT", "ESBCHR22"],
      ],
    },
    {
      name: "MCTO Advisory d.o.o.",
      fields: [
        ["Registered seat", "Bregana Pisarovinska 37, 10451 Pisarovina, Croatia"],
        ["Office", "Radnička cesta 34, 10000 Zagreb, Croatia"],
        ["Director", "Ivan Golubic"],
        ["Court register", "Commercial Court in Zagreb, MBS 081690324"],
        ["Registration number (MB)", "06211399"],
        ["OIB", "74348605691"],
        ["VAT ID", "HR74348605691"],
        ["Share capital", "3,000.00 EUR, paid in full"],
        ["Bank", "Erste&Steiermärkische Bank d.d., Jadranski trg 3a, 51000 Rijeka"],
        ["IBAN", "HR3724020061101320969"],
        ["SWIFT", "ESBCHR22"],
      ],
    },
    {
      name: "Ivan Golubic",
      fields: [
        ["Role", "Developer and supporter of Cogeto"],
        ["Location", "Croatia, European Union"],
      ],
    },
  ],
  contactLabel: "Contact:",
  email: "hi@cogeto.eu",
};
