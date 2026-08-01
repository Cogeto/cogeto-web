import type { ImprintContent } from "../en/imprint";

/**
 * German imprint. Only labels, headings, and descriptive prose are
 * translated; every identifier, number, company name, address, IBAN,
 * SWIFT, and bank line stays verbatim from the English register data.
 */
export const imprint: ImprintContent = {
  metaTitle: "Impressum",
  metaDescription: "Rechtliche Informationen zu cogeto.eu.",
  eyebrow: "Rechtliches",
  title: "Impressum",
  lede: "Cogeto (cogeto.eu) wird entwickelt und betrieben von:",
  entities: [
    {
      name: "MVT Solutions Group d.o.o.",
      fields: [
        ["Eingetragener Sitz", "Podolje 11A, 10000 Zagreb, Croatia"],
        ["Büro", "Radnička cesta 34, 10000 Zagreb, Croatia"],
        ["Geschäftsführer", "Ivan Golubic"],
        ["Handelsregister", "Handelsgericht Zagreb, MBS 081063617"],
        ["Registernummer (MB)", "04642244"],
        ["OIB", "85300439344"],
        ["USt-IdNr.", "HR85300439344"],
        ["Stammkapital", "3,000.00 EUR, voll eingezahlt"],
        ["Bank", "Erste&Steiermärkische Bank d.d., Jadranski trg 3a, 51000 Rijeka"],
        ["IBAN", "HR2124020061100921423"],
        ["SWIFT", "ESBCHR22"],
      ],
    },
    {
      name: "MCTO Advisory d.o.o.",
      fields: [
        ["Eingetragener Sitz", "Bregana Pisarovinska 37, 10451 Pisarovina, Croatia"],
        ["Büro", "Radnička cesta 34, 10000 Zagreb, Croatia"],
        ["Geschäftsführer", "Ivan Golubic"],
        ["Handelsregister", "Handelsgericht Zagreb, MBS 081690324"],
        ["Registernummer (MB)", "06211399"],
        ["OIB", "74348605691"],
        ["USt-IdNr.", "HR74348605691"],
        ["Stammkapital", "3,000.00 EUR, voll eingezahlt"],
        ["Bank", "Erste&Steiermärkische Bank d.d., Jadranski trg 3a, 51000 Rijeka"],
        ["IBAN", "HR3724020061101320969"],
        ["SWIFT", "ESBCHR22"],
      ],
    },
    {
      name: "Ivan Golubic",
      fields: [
        ["Rolle", "Entwickler und Betreuer von Cogeto"],
        ["Standort", "Kroatien, Europäische Union"],
      ],
    },
  ],
  contactLabel: "Kontakt:",
  email: "hi@cogeto.eu",
};
