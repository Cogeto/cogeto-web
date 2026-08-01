/**
 * product: animated scene, bento vignettes, flow diagram, color bands.
 */

export type HeroVignette =
  | {
      kind: "qa" | "timetravel";
      label: string;
      question: string;
      answer: string;
      citation: string;
      chip: string;
      holdMs: number;
    }
  | {
      kind: "finding";
      label: string;
      claims: { text: string; source: string }[];
      chip: string;
      holdMs: number;
    }
  | {
      kind: "ingest";
      label: string;
      text: string;
      detail: string;
      chip: string;
      holdMs: number;
    };

export type BentoItem =
  | {
      kind: "memory";
      title: string;
      text: string;
      sources: string[];
      memoryLabel: string;
    }
  | {
      kind: "qa" | "timetravel";
      title: string;
      text: string;
      question: string;
      answer: string;
      source: string;
    }
  | {
      kind: "changed";
      title: string;
      text: string;
      oldValue: string;
      newValue: string;
      tag: string;
    }
  | { kind: "report"; title: string; text: string; header: string; chip: string }
  | { kind: "silence"; title: string; text: string; banner: string; answer: string };

export interface HomeContent {
  hero: {
    /** Two halves of the headline; the second carries the gradient accent. */
    headlineA: string;
    headlineB: string;
    subhead: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    /** Three proof badges under the hero; icon keys resolve in Hero.tsx. */
    trustStrip: { icon: string; label: string; href: string }[];
    scene: {
      ariaLabel: string;
      fragments: { icon: string; label: string }[];
      vignettes: HeroVignette[];
    };
  };
  bento: {
    title: string;
    subtitle: string;
    items: BentoItem[];
    cta: { title: string; text: string; href: string };
  };
  how: {
    kicker: string;
    title: string;
    steps: { icon: string; title: string; text: string; chips: string[] }[];
    detailNote: string;
  };
  sovereignty: {
    kicker: string;
    title: string;
    deployPrefix: string;
    deployRotator: string[];
    deploySuffix: string;
    items: { title: string; text: string }[];
    companyLine: string;
    linkLabel: string;
    linkHref: string;
  };
  proof: {
    kicker: string;
    title: string;
    intro: string;
    releaseLabel: string;
    linkLabel: string;
    linkHref: string;
  };
  clients: {
    title: string;
    subtitle: string;
    items: { name: string; image: string; badge?: string }[];
    disclaimer: string;
  };
  askAssistant: {
    kicker: string;
    title: string;
    text: string;
    prompt: string;
    assistants: { name: string; urlPrefix: string }[];
    copyLabel: string;
    copiedLabel: string;
  };
  gettingStarted: {
    kicker: string;
    title: string;
    steps: { title: string; text: string }[];
    selfHostNote: string;
    cta: { label: string; href: string };
    docsLink: { label: string; href: string };
  };
  closing: {
    heading: string;
    sub: string;
    secondary: { label: string; href: string };
  };
}

export const home: HomeContent = {
  hero: {
    headlineA: "Les modèles se louent.",
    headlineB: "Le savoir se possède.",
    subhead:
      "Cogeto lit vos documents, vérifie chaque fait par rapport à sa propre source avant de le stocker, vous indique où vos documents se contredisent et prouve le tout. Fonctionne dans votre infrastructure, en Europe ou entièrement hors ligne.",
    ctaPrimary: { label: "Lancer un pilote", href: "/get-started" },
    ctaSecondary: { label: "Lire le livre blanc", href: "/whitepaper" },
    trustStrip: [
      { icon: "Code", label: "Open source, AGPLv3", href: "/open-source" },
      {
        icon: "Award",
        label: "Entreprise certifiée ISO 9001 et ISO 27001",
        href: "/security",
      },
      { icon: "WifiOff", label: "Fonctionne entièrement hors ligne", href: "/security" },
    ],
    scene: {
      ariaLabel:
        "Des spécifications, manuels, rapports d'essai, e-mails, numérisations, feuilles de calcul et notes convergent vers des réponses vérifiées et sourcées, un constat de contradiction lié aux deux sources, une confirmation d'ingestion et la restitution d'un état antérieur.",
      fragments: [
        { icon: "FileText", label: "spécification" },
        { icon: "BookOpen", label: "manuel" },
        { icon: "FlaskConical", label: "rapport d'essai" },
        { icon: "Mail", label: "mail" },
        { icon: "ScanLine", label: "scan" },
        { icon: "Table", label: "feuille de calcul" },
        { icon: "StickyNote", label: "notes" },
      ],
      vignettes: [
        {
          kind: "qa",
          label: "Vous demandez",
          question: "Qu'exige la spécification pour un démarrage à froid ?",
          answer: "Moins trente-deux degrés, depuis la révision D.",
          citation: "spécification, révision D",
          chip: "vérifié",
          holdMs: 3600,
        },
        {
          kind: "finding",
          label: "Cogeto a trouvé",
          claims: [
            {
              text: "La batterie peut être remplacée pendant le fonctionnement.",
              source: "manuel d'utilisation",
            },
            {
              text: "Toute coupure de courant nécessite une réinitialisation.",
              source: "spécification, révision actuelle",
            },
          ],
          chip: "contradiction",
          holdMs: 4400,
        },
        {
          kind: "ingest",
          label: "Un avis de changement arrive",
          text: "Lu et vérifié : douze faits ajoutés.",
          detail: "Conflits avec un document d'interface.",
          chip: "vérifié par rapport à tout ce qui est connu",
          holdMs: 3600,
        },
        {
          kind: "timetravel",
          label: "Voyage dans le temps",
          question: "Que disait la documentation à la date de commande ?",
          answer: "Les valeurs en vigueur à cette date, avec leurs sources.",
          citation: "historique de la mémoire, à cette date",
          chip: "voyage dans le temps",
          holdMs: 3800,
        },
      ],
    },
  },

  bento: {
    title: "Une IA qui connaît votre entreprise",
    subtitle:
      "Parce qu'elle repose sur ce que votre entreprise a réellement consigné : des informations vérifiées, sourcées, rapprochées et démontrables.",
    items: [
      {
        kind: "memory",
        title: "Une mémoire unique pour tout ce que vous détenez.",
        text: "Les documents, feuilles de calcul, numérisations, notes photographiées, courrier et systèmes connectés deviennent une mémoire connectée et citable de ce que votre entreprise sait.",
        sources: ["spécification", "manuel", "rapport d'essai", "e-mail", "numérisation", "note"],
        memoryLabel: "mémoire vérifiée",
      },
      {
        kind: "qa",
        title: "Discutez de ce que votre entreprise sait.",
        text: "Demandez dans un langage simple. Chaque affirmation dans la réponse cite la phrase exacte sur laquelle elle repose.",
        question: "Quel brochage est actuel pour l'interface de service ?",
        answer: "Le brochage de la révision D, avec un désaccord entre deux documents.",
        source: "spécification d'interface, révision D",
      },
      {
        kind: "changed",
        title: "Les contradictions surgissent d’elles-mêmes.",
        text: "Lorsque deux de vos documents ne sont pas d’accord, les deux côtés sont signalés et liés, avec les deux phrases et la date.",
        oldValue: "La batterie peut être remplacée pendant le fonctionnement",
        newValue: "Une coupure de courant nécessite une réinitialisation",
        tag: "conflit signalé, les deux parties liées",
      },
      {
        kind: "report",
        title: "Un rapport signé que vous pouvez transmettre.",
        text: "Chaque constat et ses preuves, signés afin qu'un tiers puisse en vérifier l'intégrité. PDF pour l'auditeur, JSON pour vos systèmes.",
        header: "Rapport de constats",
        chip: "signé",
      },
      {
        kind: "timetravel",
        title: "Demandez ce que vous croyiez en mars.",
        text: "Chaque fait porte la période sur laquelle il dure, et les déclarations remplacées gardent leur histoire.",
        question: "Quelle était la limite de démarrage à froid en mars ?",
        answer: "Moins vingt-cinq degrés, limite abaissée depuis.",
        source: "historique des spécifications, en mars",
      },
      {
        kind: "silence",
        title: "Honnête là où vos dossiers sont silencieux.",
        text: "Lorsque vos documents ne couvrent pas une question, Cogeto le dit clairement avant de proposer autre chose.",
        banner: "Non couvert par vos documents",
        answer: "Les connaissances générales sont ensuite clairement signalées.",
      },
    ],
    cta: {
      title: "Comment tout cela est-il vérifié ?",
      text: "Suivez un fait du document à la réponse.",
      href: "/product/verified-memory",
    },
  },

  how: {
    kicker: "Comment ça marche",
    title: "D'un dossier de documents à une mémoire prouvable",
    steps: [
      {
        icon: "Inbox",
        title: "Lire",
        text: "PDF, fichiers Word, feuilles de calcul, numérisations, courrier. Un fichier qui ne peut pas être lu est étiqueté illisible et n'est jamais ignoré.",
        chips: ["dossiers", "boîtes mail", "numérisations", "connecteurs"],
      },
      {
        icon: "Crosshair",
        title: "Rattacher",
        text: "Le sujet, la classe et la révision de chaque document sont appris en premier, de sorte que chaque fait atterrit sur le bon produit.",
        chips: [],
      },
      {
        icon: "ShieldCheck",
        title: "Vérifier",
        text: "Une deuxième passe indépendante vérifie chaque affirmation par rapport à sa propre phrase source avant que quoi que ce soit ne soit stocké.",
        chips: [],
      },
      {
        icon: "GitCompareArrows",
        title: "Rapprocher",
        text: "Le corpus est comparé à lui-même : alias résolus, nombres vérifiés arithmétiquement, conflits signalés et liés.",
        chips: [],
      },
      {
        icon: "MessagesSquare",
        title: "Répondre et prouver",
        text: "Discutez avec des citations par affirmation, un silence honnête là où les enregistrements sont silencieux et un rapport de constats signé sur n'importe quel ensemble de documents.",
        chips: ["sources", "constats", "rapport signé"],
      },
    ],
    detailNote: "Le mécanisme complet, étape par étape, avec les garanties derrière :",
  },

  sovereignty: {
    kicker: "Votre infrastructure, votre juridiction",
    title: "Une instance par client",
    deployPrefix: "S'exécute",
    deployRotator: ["hébergé dans l'UE", "sur vos propres serveurs", "entièrement hors ligne"],
    deploySuffix: "avec des modèles hébergés ou entièrement locaux.",
    items: [
      {
        title: "Rien de partagé avec qui que ce soit",
        text: "Pas de base de données partagée, pas d'index partagé, pas de données d'autres locataires à proximité des vôtres. L'isolement est une limite de déploiement.",
      },
      {
        title: "Hors ligne signifie hors ligne",
        text: "En mode hors ligne, les modèles de langage, les intégrations, la reconnaissance de page et la recherche s'exécutent tous dans l'instance. Pas de télémétrie.",
      },
      {
        title: "Caviardage avant tout appel externe",
        text: "Les noms, organisations et montants sont remplacés localement par des pseudonymes avant tout appel à un modèle externe. Si le caviardage ne peut pas s'exécuter, l'appel n'a pas lieu.",
      },
      {
        title: "Jamais utilisées pour l'entraînement",
        text: "Rien de ce que vous stockez n'est utilisé pour entraîner un modèle, ce qui est exactement ce qui rend possible la citation, la correction et la suppression prouvable.",
      },
    ],
    companyLine:
      "Derrière cela : MVT Solutions Group, une entreprise certifiée ISO 9001 et ISO 27001, opérant depuis la Croatie dans l'Union européenne.",
    linkLabel: "Tout sur la sécurité et la souveraineté",
    linkHref: "/security",
  },

  proof: {
    kicker: "Vérifiez avant de vous en souvenir",
    title: "Précision, mesurée et publiée à chaque version",
    intro:
      "Ces chiffres proviennent directement des fichiers publiés pour chaque version, les mêmes fichiers immuables que ceux utilisés par la page des scores de précision. Les scores sont publiés par langue et par configuration de modèle, tout comme les seuils à respecter.",
    releaseLabel: "Version actuelle",
    linkLabel: "Voir tous les chiffres, y compris ceux sous l'objectif",
    linkHref: "/trust",
  },

  clients: {
    title: "Clients et partenaires",
    subtitle:
      "Les équipes derrière Cogeto ont travaillé et réalisé des prestations pour des organisations des secteurs de la santé publique, de l'industrie, de l'hôtellerie, de la logistique et de la recherche, et s'associent à des fournisseurs d'infrastructures de l'UE pour maintenir la souveraineté des données.",
    items: [
      {
        name: "OVHcloud",
        image: "/clients-partners/ovh-cloud.png",
        badge: "Partenaire cloud",
      },
      { name: "Ministère de la Santé, Émirats Arabes Unis", image: "/clients-partners/doh-uae.png" },
      { name: "Hilton", image: "/clients-partners/hilton.png" },
      { name: "DSV", image: "/clients-partners/dsv.png" },
      { name: "Beckhoff Automation", image: "/clients-partners/beckhoff.png" },
      { name: "ESTUN Automation", image: "/clients-partners/estun.png" },
      { name: "BIRD Incubator", image: "/clients-partners/bird-incubator.png" },
      {
        name: "Université des Sciences Appliquées de Zagreb",
        image: "/clients-partners/tvz.png",
      },
      {
        name: "Initiative Open Source",
        image: "/clients-partners/open-source-initiative.png",
      },
    ],
    disclaimer:
      "Tous les logos et marques sont la propriété de leurs propriétaires respectifs. Ils sont présentés comme références des sociétés derrière Cogeto et n'impliquent pas l'approbation du produit Cogeto.",
  },

  askAssistant: {
    kicker: "Deuxième avis",
    title: "Informez-vous auprès de votre assistant sur Cogeto",
    text: "Ouvrez l'assistant que vous utilisez déjà avec une invite préparée. Il lira ce site et le référentiel public et vous donnera son propre résumé de ce qu'est Cogeto.",
    prompt:
      "Résumez ce qu'est Cogeto et ce qui le distingue des outils de recherche documentaire et de recherche d'entreprise. Utilisez https://cogeto.eu et https://github.com/Cogeto/cogeto comme références.",
    assistants: [
      { name: "Claude", urlPrefix: "https://claude.ai/new?q=" },
      { name: "ChatGPT", urlPrefix: "https://chatgpt.com/?q=" },
      { name: "Perplexity", urlPrefix: "https://www.perplexity.ai/search?q=" },
      { name: "Copilot", urlPrefix: "https://copilot.microsoft.com/?q=" },
    ],
    copyLabel: "Copiez l'invite pour n'importe quel autre assistant",
    copiedLabel: "Copié",
  },

  gettingStarted: {
    kicker: "Commencer",
    title: "Commencez par un projet pilote sur vos propres documents",
    steps: [
      {
        title: "Un pilote sur vos propres documents",
        text: "Apportez un véritable ensemble de documents. Cogeto le lit et réalise le rapport de constats. Vous voyez exactement ce qu'il a trouvé, sur votre matériel, avant tout engagement plus long.",
      },
      {
        title: "Votre instance",
        text: "Hébergée par nos soins dans l'UE, déployée dans votre cloud ou installée dans votre réseau, y compris entièrement hors ligne. Une instance qui vous est exclusivement dédiée.",
      },
      {
        title: "Ça continue de fonctionner",
        text: "Chaque nouvelle révision, avis de modification ou courrier est vérifié par rapport à tout ce qui est déjà connu, de sorte que les conflits apparaissent le jour de leur création plutôt que lors de l'audit suivant.",
      },
    ],
    selfHostNote:
      "Exécutez Cogeto gratuitement et pour toujours. Payez pour qu'il soit le vôtre : installé à l'intérieur de vos murs, adapté à vos documents, mesuré sur vos documents et pris en charge par quelqu'un.",
    cta: { label: "Lancer un pilote", href: "/get-started" },
    docsLink: { label: "Exécutez-le vous-même", href: "/docs" },
  },

  closing: {
    heading: "Voyez-le sur vos documents.",
    sub: "Le pilote lit un véritable ensemble de documents et se termine par le rapport de constats signé. Nous répondons dans un délai d'un jour ouvrable.",
    secondary: { label: "Exécutez-le vous-même", href: "/docs" },
  },
};
