
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
  metaTitle: "Lancer un pilote",
  metaDescription:
    "Apportez vos documents : Cogeto produit un rapport de constats signé. Réponse sous un jour ouvrable.",
  hero: {
    eyebrow: "Démarrer",
    headline: "La première chose que vous voyez est ce qu'il a trouvé dans vos documents",
    lede:
      "Un projet pilote commence par un véritable ensemble de documents. Cogeto le lit et produit le rapport de constats signé, avant tout engagement plus long. Vos documents, votre infrastructure si vous le souhaitez, et un résultat que vous pouvez transmettre.",
    secondary: { label: "Téléchargez le document d'une page sur la conformité", href: "/documents/cogeto-compliance-onepager.pdf" },
  },
  stepsHeading: "Que se passe-t-il ensuite",
  steps: [
    {
      title: "Nous répondons dans un délai d'un jour ouvrable",
      text: "Indiquez-nous simplement la taille approximative de votre corpus, ses formats et ses langues. Cela suffit pour une première réponse.",
    },
    {
      title: "Un appel de cadrage de 30 minutes",
      text: "Avec l'équipe Cogeto, pas une séquence commerciale. Vous partez en sachant si un projet pilote a du sens et ce qu'il couvrirait.",
    },
    {
      title: "Une proposition pilote pour votre environnement",
      text: "Vos documents, hébergés dans l'UE, dans votre cloud ou entièrement hors ligne. Le projet pilote se termine par le rapport de constats signé sur votre matériel.",
    },
  ],
  offersHeading: "Quatre façons de l'exécuter",
  offersSub:
    "Chaque instance est dédiée : un déploiement, un client, rien de partagé. Il n'y a pas de prix publiés ; chaque engagement commence par la conversation pilote.",
  offers: [
    {
      name: "Pilote",
      highlight: "Commencez ici",
      positioning: "Consultez-le sur vos propres documents avant tout engagement.",
      bullets: [
        "Un véritable ensemble de documents à vous, lu dans son intégralité",
        "Contradictions trouvées, les deux sources étant liées",
        "Le rapport de constats signé à la fin",
        "Vous conservez le rapport de toute façon",
      ],
      cta: { label: "Lancer un pilote", href: "#contact", kind: "primary" },
    },
    {
      name: "Hébergé dans l'UE",
      positioning: "Votre instance, exploitée pour vous : installation, mises à jour et responsabilité opérationnelle.",
      bullets: [
        "Instance dédiée, la vôtre seule, juridiction de l'UE",
        "Installation, mises à jour, sauvegardes et surveillance, effectués pour vous",
        "Un DPA signé et une personne responsable",
        "Entités sensibles expurgées avant tout appel externe",
      ],
      cta: { label: "Parlez-nous", href: "#contact", kind: "secondary" },
    },
    {
      name: "Auto-hébergé",
      positioning: "Exécutez la version open source sur votre propre infrastructure.",
      bullets: [
        "AGPLv3, tout sur ce site inclus",
        "Images de version signées, un script d'opérateur",
        "Documents publics d'installation et de configuration",
        "Licence commerciale disponible si vous en avez besoin",
      ],
      cta: { label: "Lire la documentation", href: "/docs", kind: "link" },
    },
    {
      name: "Entièrement hors ligne",
      positioning: "À l’intérieur de vos murs, rien ne sort.",
      bullets: [
        "Modèles locaux exécutés sur votre infrastructure",
        "Intégration d'identité avec votre fournisseur d'identité",
        "Routage du courrier et connecteurs vers vos systèmes",
        "Lot d'images hors ligne pour les installations isolées",
      ],
      cta: { label: "Sécurité et souveraineté", href: "/security", kind: "link" },
    },
  ],
  alsoFrom: {
    heading: "Autres prestations",
    items: [
      {
        title: "Adapté à votre secteur",
        text: "Extraction et vérification calibrées pour votre classe de document, avec un ensemble d'or construit à partir de vos types de documents et des scores de précision publiés pour votre configuration exacte.",
      },
      {
        title: "Assurance",
        text: "Assistance avec délais de réponse, réponses aux examens de sécurité, mises à niveau et migrations gérées, formation et licence commerciale là où AGPL ne correspond pas à votre situation juridique.",
      },
    ],
    link: { label: "Pourquoi le code est gratuit et celui-ci ne l'est pas", href: "/open-source" },
  },
  languagesNote:
    "Interface en anglais, croate et allemand. La qualité de la mémoire est mesurée par langue et publiée, afin que vous puissiez voir où la qualité est forte avant de vous engager.",
  faqHeading: "Les questions que se posent réellement les acheteurs",
  faq: [
    {
      question: "Mes données quittent-elles mon instance ?",
      answer:
        "Uniquement si vous configurez un fournisseur de modèles externe, et seulement après que les entités sensibles ont été remplacées localement par des pseudonymes. En mode hors ligne, rien ne sort du tout.",
    },
    {
      question: "Utilisez-vous nos documents pour entraîner des modèles ?",
      answer:
        "Jamais. Vos connaissances restent dans votre instance. C’est ce qui rend possible la citation, la correction et la suppression prouvable.",
    },
    {
      question: "Que se passe-t-il si nous arrêtons d'utiliser Cogeto ?",
      answer:
        "Un clic exporte les faits, les sources, l'historique, les relations et les reçus dans un format ouvert et documenté. Le code est open source. Rien dans la conception ne vous enferme dans Cogeto.",
    },
    {
      question: "Quelle est sa précision ?",
      answer:
        "La précision est mesurée et publiée pour chaque version, langue et configuration de modèle, y compris lorsque les résultats restent sous les objectifs. La page des scores de précision est publique.",
    },
    {
      question: "Peut-il fonctionner sans Internet ?",
      answer:
        "Oui, pleinement. Les modèles de langage, les intégrations, la reconnaissance de pages et la recherche s'exécutent tous dans l'instance.",
    },
    {
      question: "S'agit-il d'un dispositif médical ou d'une évaluation réglementaire ?",
      answer:
        "Non. Cogeto produit des preuves de vos documents. Le jugement réglementaire appartient à votre organisation.",
    },
  ],
  contact: {
    heading: "Lancer un pilote",
    sub: "Trois champs. Nous répondons dans un délai d'un jour ouvrable.",
    steps: [
      "Nous répondons dans un délai d'un jour ouvrable",
      "Un appel de cadrage de 30 minutes, pas de séquence de vente",
      "Une proposition pilote : vos documents, votre infrastructure",
    ],
    chips: [
      "Entreprise certifiée ISO 9001 et ISO 27001",
      "Open source, AGPLv3",
      "Juridiction de l'UE",
    ],
    nameLabel: "Nom",
    emailLabel: "E-mail professionnel",
    messageLabel: "À quoi ressemble votre ensemble de documents ?",
    messagePlaceholder:
      "Environ combien de documents, quels formats, dans quelles langues et s'ils doivent être exécutés au sein de votre réseau.",
    submitLabel: "Lancer un pilote",
    sendingLabel: "Envoi en cours",
    sentTitle: "Message reçu.",
    sentBody: "Nous lisons nous-mêmes chaque message et répondons dans un délai d'un jour ouvrable.",
    errorBody:
      "L'envoi vient d'échouer. Écrivez-nous directement à hi@cogeto.eu ; nous vous répondrons également dans un délai d'un jour ouvrable.",
    directLine: "Vous préférez l'e-mail ? Écrivez à hi@cogeto.eu ; nous répondons également sous un jour ouvrable.",
  },
};
