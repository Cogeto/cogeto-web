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
  metaTitle: "Mentions légales",
  metaDescription: "Mentions légales de cogeto.eu.",
  eyebrow: "Informations légales",
  title: "Mentions légales",
  lede: "Cogeto (cogeto.eu) est construit et exploité par :",
  entities: [
    {
      name: "MVT Solutions Group d.o.o.",
      fields: [
        ["Siège social", "Podolje 11A, 10000 Zagreb, Croatia"],
        ["Bureau", "Radnička cesta 34, 10000 Zagreb, Croatia"],
        ["Directeur", "Ivan Golubic"],
        ["Registre du tribunal", "Tribunal de Commerce de Zagreb, MBS 081063617"],
        ["Numéro d'enregistrement (MB)", "04642244"],
        ["OIB", "85300439344"],
        ["Numéro de TVA", "HR85300439344"],
        ["Capital social", "3,000.00 EUR, entièrement libéré"],
        ["Banque", "Erste&Steiermärkische Bank d.d., Jadranski trg 3a, 51000 Rijeka"],
        ["IBAN", "HR2124020061100921423"],
        ["SWIFT", "ESBCHR22"],
      ],
    },
    {
      name: "MCTO Advisory d.o.o.",
      fields: [
        ["Siège social", "Bregana Pisarovinska 37, 10451 Pisarovina, Croatia"],
        ["Bureau", "Radnička cesta 34, 10000 Zagreb, Croatia"],
        ["Directeur", "Ivan Golubic"],
        ["Registre du tribunal", "Tribunal de Commerce de Zagreb, MBS 081690324"],
        ["Numéro d'enregistrement (MB)", "06211399"],
        ["OIB", "74348605691"],
        ["Numéro de TVA", "HR74348605691"],
        ["Capital social", "3,000.00 EUR, entièrement libéré"],
        ["Banque", "Erste&Steiermärkische Bank d.d., Jadranski trg 3a, 51000 Rijeka"],
        ["IBAN", "HR3724020061101320969"],
        ["SWIFT", "ESBCHR22"],
      ],
    },
    {
      name: "Ivan Golubic",
      fields: [
        ["Rôle", "Développeur et responsable du support de Cogeto"],
        ["Localisation", "Croatie, Union européenne"],
      ],
    },
  ],
  contactLabel: "Contact :",
  email: "hi@cogeto.eu",
};
