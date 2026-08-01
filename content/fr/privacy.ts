/**
 * English privacy policy content. Copy moved verbatim from the former
 * Company names, addresses, and email addresses stay identical across
 * locales; only the surrounding legal text is translated.
 */

export type PrivacySection = {
  heading: string;
  paragraphs: readonly string[];
};

export type PrivacyContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  /** Full rendered line, e.g. "Dernière mise à jour : 1 août 2026". */
  lastUpdated: string;
  sections: readonly PrivacySection[];
};

export const privacy: PrivacyContent = {
  metaTitle: "Politique de confidentialité",
  metaDescription:
    "Politique de confidentialité de cogeto.eu : pas de cookies, pas de suivi, pas de collecte de données.",
  eyebrow: "Informations légales",
  title: "Politique de confidentialité",
  lastUpdated: "Dernière mise à jour : 1 août 2026",
  sections: [
    {
      heading: "1. Qui nous sommes",
      paragraphs: [
        'La présente politique décrit comment MVT Solutions Group d.o.o. (« nous »), en qualité de responsable du traitement, collecte et traite les données personnelles. MVT Solutions Group d.o.o., dont le siège est situé Podolje 11A, 10000 Zagreb, Croatie, est responsable de la protection de vos données personnelles. Société établie dans l\'UE, nous appliquons le règlement général sur la protection des données (RGPD).',
        "Cette politique s’applique au site cogeto.eu.",
      ],
    },
    {
      heading: "2. Pas de cookies, pas de suivi",
      paragraphs: [
        "Ce site Web n'utilise pas de cookies. Il n'exécute pas d'analyses, n'intègre pas de trackers tiers, ne charge pas de ressources à partir de services externes et ne nécessite pas de compte.",
        "La simple visite de cogeto.eu n’entraîne pas la collecte ou le stockage de données personnelles par nos soins. La lecture du site et le téléchargement du livre blanc sont anonymes : pas d'identifiant, pas de profilage. Les données personnelles ne nous parviennent que si vous choisissez de les envoyer via le formulaire de contact ou par email, comme décrit dans la section suivante.",
      ],
    },
    {
      heading: "3. Lorsque vous nous contactez",
      paragraphs: [
        "Si vous utilisez le formulaire de contact de ce site ou nous écrivez à hi@cogeto.eu, MVT Solutions Group d.o.o. et MCTO Advisory d.o.o. traitent les données personnelles que vous transmettez : votre adresse e-mail, votre nom si vous le communiquez et le contenu de votre message.",
        "Le formulaire de contact envoie votre message depuis notre propre serveur via Mailgun, un service de courrier électronique transactionnel, en utilisant sa région Union européenne, de sorte que les données sont traitées sur l'infrastructure de l'UE. Votre navigateur ne communique jamais directement avec Mailgun. Mailgun agit en tant que sous-traitant en notre nom dans le seul but de transmettre votre message à notre boîte aux lettres.",
        "Nous traitons ces données uniquement pour lire et répondre à votre demande et pour gérer tout suivi que vous demandez. La base juridique est l'article 6, paragraphe 1, point f) du RGPD, notre intérêt légitime à répondre aux messages qui nous sont envoyés et, si votre demande vise à nouer une relation commerciale, l'article 6, paragraphe 1, point b) du RGPD.",
        "Nous conservons la correspondance uniquement le temps nécessaire au traitement de votre demande et de toute relation qui en résulte, et la supprimons ensuite, sauf obligation légale de conservation.",
      ],
    },
    {
      heading: "4. Partage de données",
      paragraphs: [
        "Nous ne vendons aucune donnée personnelle et ne la partageons pas avec des tiers à des fins commerciales. La correspondance est traitée par MVT Solutions Group d.o.o. et MCTO Advisory d.o.o., par la région UE de Mailgun en tant que sous-traitant chargé de transmettre les messages du formulaire, et par notre hébergeur de messagerie en tant que sous-traitant.",
        "Les données ne sont pas transférées en dehors de l’Espace économique européen.",
      ],
    },
    {
      heading: "5. Vos droits",
      paragraphs: [
        "En vertu du RGPD, vous avez le droit d'accéder aux données personnelles que nous détenons à votre sujet, de les faire rectifier ou effacer, de restreindre ou de vous opposer à leur traitement et de les recevoir dans un format portable.",
        "Pour exercer l'un de ces droits, écrivez-nous à hi@cogeto.eu. Vous avez également le droit d'introduire une réclamation auprès d'une autorité de contrôle, en Croatie auprès de l'Agence de protection des données personnelles, AZOP, www.azop.hr, ou auprès de l'autorité de votre État membre de l'UE.",
      ],
    },
    {
      heading: "6. Modifications de cette politique",
      paragraphs: [
        "Si jamais ce site Web change d'une manière qui affecte les données personnelles, par exemple en ajoutant une newsletter ou un bac à sable de produit, nous mettrons à jour cette politique avant que la modification ne soit mise en œuvre. La date ci-dessous reflète toujours la version actuelle.",
      ],
    },
    {
      heading: "7. Contact",
      paragraphs: [
        "MVT Solutions Group d.o.o., Podolje 11A, 10000 Zagreb, Croatie. E-mail : hi@cogeto.eu.",
      ],
    },
  ],
};
