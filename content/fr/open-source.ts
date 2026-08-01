/**
 * English copy for /open-source: the license, the commercial case, and the
 * models are services we perform, never prebuilt modules.
 */

export const openSource = {
  metaTitle: "Open source",
  metaDescription:
    "Le noyau Cogeto est sous AGPLv3. Vous achetez l'exploitation, l'intégration et une précision mesurée sur vos documents.",
  eyebrow: "Open source",
  headline: "Le moteur est ouvert, car une confiance qui ne peut pas être vérifiée n'est pas une confiance",
  lede:
    "Le noyau de Cogeto est publié sous AGPLv3. La raison n'est pas la stratégie de distribution, c'est la crédibilité : chaque affirmation sur ce site est une affirmation concernant le code, et le code publié transforme ces affirmations en déclarations que tout le monde peut vérifier.",
  whyPay: {
    heading: "Si le code est gratuit, pourquoi payer",
    paragraphs: [
      "C’est le modèle sur lequel les entreprises open source sérieuses fonctionnent depuis des décennies : le code est gratuit, et les entreprises paient de toute façon, pour le fonctionnement, la responsabilité, l’intégration et l’expertise, car personne n’exécute seul des logiciels critiques.",
      "Cogeto fonctionne de la même manière, avec une différence qui fait monter les enjeux : une instance détient des années de mémoire institutionnelle accumulée et vérifiée, donc le fonctionnement professionnel compte davantage à chaque mois de son exécution.",
    ],
    openCard: {
      name: "Gratuit pour toujours, dans son intégralité",
      bullets: [
        "Le moteur : ingestion, vérification, réconciliation, récupération, chat",
        "Le rapport de constats et chaque artefact de preuve",
        "Le chemin d’installation et de configuration, entièrement documenté",
        "Le banc d'évaluation et les scores de précision publiés",
      ],
    },
  },
  quote:
    "Exécutez Cogeto gratuitement et pour toujours. Payez pour qu'il soit le vôtre : installé à l'intérieur de vos murs, adapté à vos documents, mesuré sur vos documents et pris en charge par quelqu'un.",
  offers: {
    heading: "Ce que vous achetez chez nous",
    sub: "Des engagements concrets, dans l’ordre où les clients les prennent. Pas de pages de tarification, pas de niveaux à décoder : tout commence par une conversation.",
    items: [
      {
        title: "1. Le pilote",
        text: "Envoyez-nous un ensemble de documents ; nous délivrons le rapport de constats signé. Portée fixe, jours et non mois. C'est le premier achat.",
        link: { label: "Lancer un pilote", href: "/get-started" },
      },
      {
        title: "2. Votre instance, exploitée",
        text: "Nous l'exécutons dans l'UE ou le déployons sur vos serveurs : installation, mises à jour, sauvegardes, surveillance, un DPA signé et une personne responsable. Quatre ans de mémoire vérifiée ne sont pas quelque chose que vous souhaitez sur un conteneur non maintenu.",
      },
      {
        title: "3. À l’intérieur de vos murs",
        text: "Déploiement auto-hébergé et entièrement hors ligne, intégration d'identité avec votre fournisseur d'identité, routage du courrier, connecteurs vers vos systèmes et modèles locaux exécutés sur votre infrastructure pour que rien ne quitte jamais.",
      },
      {
        title: "4. Adapté à votre secteur",
        text: "Extraction et vérification calibrées pour votre classe de document, un ensemble d'or construit à partir de vos types de documents et des scores de précision publiés pour votre configuration exacte. Modèles personnalisés et locaux là où le matériel l'exige. N’importe qui peut cloner le moteur ; la précision mesurée sur vos documents ne peut pas être clonée.",
      },
      {
        title: "5. Assurances",
        text: "Assistance avec délais de réponse, réponses aux examens de sécurité, mises à niveau et migrations gérées, formation et licence commerciale là où AGPL ne correspond pas à votre situation juridique.",
      },
    ],
  },
  why: {
    heading: "La licence fait le travail de confiance",
    paragraphs: [
      "La publication du code rend nos affirmations vérifiables, et cette vérifiabilité fait partie du produit. Elle réduit aussi le risque fournisseur : le code et vos données peuvent nous survivre. L'activité commerciale couvre tout ce qui entoure le code. L'AGPLv3 garantit que quiconque exploite une version modifiée comme service publie ses modifications, afin que le code consultable reste celui qui s'exécute.",
    ],
    claims: [
      "Les règles de visibilité résident dans les requêtes de la base de données, et non dans le code de l'application que quelqu'un a oublié d'appeler.",
      "Aucun fait ne peut exister sans provenance ; la durée est un champ obligatoire",
      "Les reçus de suppression sont chaînés par hachage, donc aucun ne peut être modifié ou supprimé",
      "Il existe un seul point de sortie par lequel un appel de modèle peut quitter l'instance.",
    ],
  },
  cards: [
    {
      title: "Rien ne vous retient",
      text: "Un clic exporte tout, faits, sources, historique, relations et reçus, dans un format documenté ouvert qui vérifie en dehors de Cogeto. Si vous partez, vous repartez avec tout, visiblement intact.",
    },
    {
      title: "Le nom et le logo sont des marques",
      text: "Le nom et le logo Cogeto ne sont pas couverts par la licence du code. Le code peut être utilisé sous AGPLv3 ; un service modifié ne peut pas se présenter comme Cogeto.",
    },
    {
      title: "Les contributions sont les bienvenues",
      text: "Les enjeux, le guide de contribution, les règles d'or et le processus de divulgation sont publics. Les contributions nécessitent l'acceptation du contrat de licence du contributeur avec un seul commentaire ; le raisonnement y est exposé honnêtement.",
    },
  ],
  linksHeading: "Lisez-le vous-même",
  badgeUi: { evidenceLabel: "Voir les preuves", detailsLabel: "Détails" },
  links: [
    {
      icon: "check" as const,
      name: "Le dépôt",
      text: "L'intégralité du code source, la documentation, le banc d'évaluation et les fichiers publiés des scores de précision.",
      href: "https://github.com/Cogeto/cogeto",
      external: true,
    },
    {
      icon: "signature" as const,
      name: "Conditions de licence commerciale",
      text: "L'exemption AGPL, indiquée en langage clair dans le référentiel.",
      href: "https://github.com/Cogeto/cogeto/blob/main/COMMERCIAL-LICENSE.md",
      external: true,
    },
    {
      icon: "shield" as const,
      name: "Politique de marque",
      text: "Ce que l'AGPL couvre et ce que la marque ne couvre pas.",
      href: "https://github.com/Cogeto/cogeto/blob/main/TRADEMARK.md",
      external: true,
    },
  ],
  cta: {
    heading: "Le moteur est ouvert. Le pilote est là où il devient le vôtre.",
    secondary: { label: "Exécutez-le vous-même", href: "/docs" },
  },
};
