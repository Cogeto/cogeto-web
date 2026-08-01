/**
 * generated numbers and findings, plausible magnitudes, and only finding
 * kinds the engine really detects: numeric and unit conflicts, manual
 * against specification after a change notice, revision drift,
 * cross-language subject resolution, supersessions, suppressed
 * extractions. Boundaries: no real customer names, no attributed quotes,
 * no deployment or revenue claims.
 */

export interface CsFinding {
  intro: string;
  mock:
    | { kind: "finding"; claims: { text: string; source: string }[]; chip: string }
    | {
        kind: "chain";
        oldClaim: { text: string; source: string };
        newClaim: { text: string; source: string };
        note: string;
      }
    | { kind: "report"; lines: string[] }
    | { kind: "suppression"; rows: { reason: string; count: string }[]; note: string };
}

export interface CaseStudy {
  slug: string;
  navLabel: string;
  industryLabel: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subhead: string;
  heroMock: { claims: { text: string; source: string }[]; chip: string };
  situation: { heading: string; pains: { title: string; text: string }[] };
  run: {
    heading: string;
    intro: string;
    steps: string[];
    summaryTitle: string;
    summary: { label: string; value: string }[];
  };
  findings: { heading: string; sub: string; items: CsFinding[] };
  outcomes: {
    heading: string;
    cards: { title: string; text: string }[];
    boundary?: string;
    deployment: string[];
  };
  faq: { question: string; answer: string }[];
  closing: { sentence: string; subject: string };
  chat: ChatExchange[];
}

export interface ChatSegment {
  text: string;
  chips?: string[];
}

export interface ChatExchange {
  question: string;
  segments: ChatSegment[];
  conflict?: { text: string; chips?: string[] };
  silence?: { title: string; banner: string };
  standsOn: string[];
}

export const caseIndex = {
  metaTitle: "Études de cas",
  metaDescription: "Cas d'usage Cogeto : constats vérifiés dans les dossiers techniques, exigences et fiches techniques.",
  eyebrow: "Études de cas",
  headline: "Ce qu'il trouve quand il lit tout",
  lede:
    "Quatre corpus, quatre secteurs, un même traitement : importation groupée, vérification, rapprochement pendant la nuit et rapport de constats signé le matin. Chaque cas est raconté du point de vue du client.",
  cards: [
    {
      industryLabel: "Dispositifs médicaux",
      pain: "Un dossier technique élaboré sur quatre ans et de nombreuses mains.",
      outcome: "La préparation de l'audit est devenue un rapport, pas une archéologie.",
      metric: "27 contradictions dans 412 documents",
      href: "/case-studies/medical-devices",
    },
    {
      industryLabel: "Défense",
      pain: "Des informations qui ne peuvent pas quitter le bâtiment.",
      outcome: "Des réponses fondées au sein d’un réseau fermé.",
      metric: "Entièrement hors ligne, aucun appel sortant",
      href: "/case-studies/defense",
    },
    {
      industryLabel: "Peinture automobile",
      pain: "La finition est artisanale, et l’artisanat vit dans les gens et les papiers dispersés.",
      outcome: "Une connaissance des processus qui survit aux personnes qui la détiennent.",
      metric: "24 conflits sur 643 documents",
      href: "/case-studies/automotive-paint",
    },
    {
      industryLabel: "Équipes d'ingénierie",
      pain: "Quarante fiches techniques presque identiques et un wiki auquel personne ne fait confiance.",
      outcome: "Un corpus qui répond par des citations.",
      metric: "33 contradictions que personne n'avait nommées",
      href: "/case-studies/engineering-teams",
    },
  ],
};

const DEPLOYMENT = [
  "Hébergé dans l'UE : votre instance dédiée, exploitée pour vous.",
  "Votre cloud : déployé au sein de votre propre infrastructure.",
  "Entièrement hors ligne : modèles locaux, pas de connectivité sortante, pas de télémétrie.",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "medical-devices",
    navLabel: "Dispositifs médicaux",
    industryLabel: "Dispositifs médicaux",
    metaTitle: "Dossiers techniques de dispositifs médicaux",
    metaDescription: "Cohérence d un dossier technique de dispositifs médicaux.",
    headline: "Le dossier technique était cohérent avant même la demande de l'auditeur",
    subhead:
      "Un fabricant de dispositifs médicaux a confié à Cogeto quatre années de documentation technique. Le lendemain matin, il connaissait chaque incohérence du dossier, avec les deux phrases sources et les deux révisions citées.",
    heroMock: {
      claims: [
        {
          text: "La batterie peut être remplacée pendant que l'appareil reste en fonctionnement.",
          source: "Mode d'emploi, révision 4",
        },
        {
          text: "Toute interruption de la tension d'alimentation nécessite une réinitialisation complète.",
          source: "Spécification du système, révision F",
        },
      ],
      chip: "contradiction",
    },
    situation: {
      heading: "Un dossier étoffé sur quatre ans et entre plusieurs mains",
      pains: [
        {
          title: "L'avis de changement que personne n'a propagé",
          text: "Un changement de conception a modifié l’architecture électrique. La spécification a été mise à jour ; les instructions d'utilisation ne l'étaient pas. Deux documents contrôlés sont désormais en désaccord sur ce qu'un opérateur peut faire.",
        },
        {
          title: "Préparation à l'audit en archéologie",
          text: "Des semaines pendant lesquelles les ingénieurs lisaient les révisions côte à côte, construisaient des feuilles de calcul de ce qui devait correspondre et espéraient que l'échantillon extrait par l'auditeur était celui qu'ils avaient vérifié.",
        },
        {
          title: "Deux langues, un produit",
          text: "Le manuel d'entretien est en croate, les spécifications en anglais. Aucun critique ne lit les deux à la fois, donc les désaccords entre langues sont invisibles par construction.",
        },
      ],
    },
    run: {
      heading: "Le traitement",
      intro:
        "Une importation groupée : le dossier technique tel quel, y compris les rapports d'essais de type numérisés et les tableaux de risques basés sur une feuille de calcul.",
      steps: [
        "412 documents importés en une seule opération, dédoublonnés par contenu",
        "Scans lus par reconnaissance locale à l'intérieur de l'instance",
        "Chaque document ancré à son produit, sa classe et sa révision",
        "Chaque affirmation extraite est vérifiée par rapport à sa propre phrase source",
        "Réconciliation du jour au lendemain sur l’ensemble du corpus",
      ],
      summaryTitle: "Le résumé du matin",
      summary: [
        { label: "documents lus", value: "412" },
        { label: "faits stockés", value: "18,347" },
        { label: "contradictions trouvées", value: "27" },
        { label: "déclarations remplacées", value: "214" },
        { label: "extractions écartées", value: "391" },
        { label: "pages illisibles, classées par nom", value: "9" },
      ],
    },
    findings: {
      heading: "Les constats",
      sub: "Quatre sur vingt-sept, comme le signale le produit.",
      items: [
        {
          intro:
            "Le conflit d'avis de modification : le manuel autorise toujours ce que la spécification actuelle interdit.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "La batterie peut être remplacée pendant que l'appareil reste en fonctionnement.",
                source: "Mode d'emploi, révision 4",
              },
              {
                text: "Toute interruption de la tension d'alimentation nécessite une réinitialisation complète.",
                source: "Spécification du système, révision F",
              },
            ],
            chip: "contradiction",
          },
        },
        {
          intro:
            "Un conflit numérique détecté par l'arithmétique : le test de type n'a jamais couvert ce que la spécification exige.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Démarrage à froid vérifié à moins 25 degrés Celsius.",
                source: "Rapport d'essai de type TR-118, révision B",
              },
              {
                text: "Démarrage spécifié jusqu'à moins 32 degrés Celsius.",
                source: "Spécification du système, révision F",
              },
            ],
            chip: "conflit numérique",
          },
        },
        {
          intro:
            "Un constat multilingue : le manuel d'entretien croate et la fiche technique en anglais décrivent différents matériels.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Jedinica sadrži jednu antenu.",
                source: "Servisni priručnik, révision 2",
              },
              {
                text: "The unit contains two antennas.",
                source: "Fiche technique du produit, révision D",
              },
            ],
            chip: "résolu dans toutes les langues",
          },
        },
        {
          intro:
            "Un remplacement conservé dans l'historique : la durée de conservation a été modifiée par un avis de changement, et la chaîne indique à quelle date la référence a changé.",
          mock: {
            kind: "chain",
            oldClaim: {
              text: "Durée de conservation stérile : trois ans.",
              source: "Spécification d'étiquetage, révision C",
            },
            newClaim: {
              text: "Durée de conservation stérile : deux ans.",
              source: "Avis de modification CN-0142, révision A",
            },
            note: "Remplacé, chaîne conservée. Demandez ce que le dossier affirmait à une date passée.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Ce que cela signifie pour vous",
      cards: [
        {
          title: "Préparation de l'audit en jours",
          text: "Le rapport de constats sur la portée exacte du dossier, signé, avec chaque conflit et ses preuves, est versé au dossier de revue de conception.",
        },
        {
          title: "Conflits détectés le jour de la création",
          text: "Chaque nouvel avis de modification est vérifié par rapport à tout ce qui est déjà connu le jour de son arrivée, et non lors de l'audit suivant.",
        },
        {
          title: "Un historique qui survit au renouvellement des équipes",
          text: "Les déclarations remplacées conservent leur chaîne, afin que le contenu du dossier à toute date reste vérifiable.",
        },
        {
          title: "Réponses avec citations",
          text: "Demandez n'importe quoi au dossier ; chaque affirmation dans la réponse nomme sa phrase, son document et sa révision, ou indique que le fichier est silencieux.",
        },
      ],
      boundary:
        "Cogeto produit des preuves de vos documents. Le jugement réglementaire appartient à votre organisation.",
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Est-ce une évaluation réglementaire ?",
        answer:
          "Non. Cogeto produit des preuves sur vos documents : quels sont les conflits, ce qui a remplacé quoi et ce qui n'a pas pu être vérifié. Le jugement réglementaire reste avec vous.",
      },
      {
        question: "Notre dossier est rempli de scans. Est-ce que ça marche ?",
        answer:
          "Les pages numérisées sont lues par reconnaissance locale à l'intérieur de l'instance, donc rien ne quitte vos limites. Les pages qui ne peuvent pas être lues sont répertoriées par nom, jamais ignorées silencieusement.",
      },
      {
        question: "Notre documentation est en deux langues.",
        answer:
          "Les sujets sont résolus dans plusieurs langues, de sorte qu'un manuel en croate peut contredire une spécification en anglais. La précision est mesurée et publiée par langue, vous voyez donc la qualité avant de vous engager.",
      },
      {
        question: "Qui résout les constats ?",
        answer:
          "Vos ingénieurs, avec les deux phrases et les deux révisions sous les yeux. Cogeto présente le constat et les documents ; il ne décide pas lequel fait autorité.",
      },
    ],
    closing: {
      sentence:
        "Envoyer un dossier technique ; nous délivrons le rapport de constats signé.",
      subject: "Demande pilote, dispositifs médicaux",
    },
    chat: [
      {
        question: "La batterie peut-elle être changée pendant le fonctionnement ?",
        segments: [
          { text: "La notice d'utilisation le permet.", chips: ["Mode d'emploi r4"] },
          {
            text: "La spécification actuelle l'interdit : toute interruption d'alimentation nécessite une réinitialisation complète.",
            chips: ["Spécification RF"],
          },
        ],
        conflict: {
          text: "Conflit : un avis de changement a modifié l'architecture d'alimentation ; la notice n'a jamais été mise à jour.",
          chips: ["avis de changement"],
        },
        standsOn: ["Mode d'emploi r4", "Spécification RF", "avis de changement"],
      },
      {
        question: "Quelle était la durée de conservation stérile lors de l’expédition du lot de mars ?",
        segments: [
          {
            text: "Trois ans à cette date, selon les spécifications d'étiquetage alors en vigueur ; resserré à deux ans par l'avis de changement CN-0142 depuis.",
            chips: ["Spécification d'étiquetage RC", "CN-0142", "dès mars"],
          },
        ],
        standsOn: ["Spécification d'étiquetage RC", "CN-0142"],
      },
    ],
  },

  {
    slug: "defense",
    navLabel: "Défense",
    industryLabel: "Défense",
    metaTitle: "IA hors ligne pour la documentation de défense",
    metaDescription: "Documentation de défense hors ligne et souveraine.",
    headline: "Des réponses étayées, dans un réseau dont rien ne sort",
    subhead:
      "Un programme d'électronique de défense exécute Cogeto entièrement hors ligne : modèles locaux sur le matériel du programme, pas de connectivité sortante, pas de télémétrie. Si les documents le contiennent, il en répond, avec des citations.",
    heroMock: {
      claims: [
        {
          text: "La broche 7 transporte l'alimentation 28 volts.",
          source: "Document de contrôle d'interface ICD-A, révision 3",
        },
        {
          text: "La broche 7 est réservée et ne doit pas être connectée.",
          source: "Note de dessin du harnais, révision 1",
        },
      ],
      chip: "contradiction",
    },
    situation: {
      heading: "Des informations qui ne peuvent pas quitter le bâtiment",
      pains: [
        {
          title: "Les assistants hébergés ne sont pas une option",
          text: "Les informations ne sont pas autorisées à franchir le périmètre. Un assistant hébergé est donc inutilisable ou refuse les questions portant sur vos propres systèmes.",
        },
        {
          title: "Le savoir disparaît avec les équipes",
          text: "Les affichages changent, les entrepreneurs partent et la personne qui savait pourquoi le faisceau avait été recâblé s'en va. Ce qui n’a jamais été écrit a disparu ; ce qui a été écrit est dispersé.",
        },
        {
          title: "Documents d'interface qui sont discrètement en désaccord",
          text: "Deux documents contrôlés, deux propriétaires, aucune référence croisée. Le désaccord fait surface lors de l’intégration, au moment le plus coûteux possible.",
        },
      ],
    },
    run: {
      heading: "Le traitement",
      intro:
        "Installé à partir du groupe d'images hors ligne. Documentation du programme importée à l'intérieur de l'enclave : spécifications, documents de contrôle d'interface, notes de dessins, enregistrements de tests, procès-verbaux.",
      steps: [
        "730 documents importés au sein du réseau fermé",
        "Modèles locaux et reconnaissance de pages sur le matériel du programme",
        "Ancrage au système, au sous-système et à la révision",
        "Vérification par rapport aux phrases sources avant stockage",
        "Réconciliation du jour au lendemain, tous à l'intérieur des frontières",
      ],
      summaryTitle: "Le résumé du matin",
      summary: [
        { label: "documents lus", value: "730" },
        { label: "faits stockés", value: "26,412" },
        { label: "contradictions trouvées", value: "41" },
        { label: "déclarations remplacées", value: "356" },
        { label: "extractions écartées", value: "512" },
        { label: "appels réseau sortants", value: "0" },
      ],
    },
    findings: {
      heading: "Les constats",
      sub: "Trois sur quarante et un, comme le rapporte le produit.",
      items: [
        {
          intro:
            "Le piège de l'intégration : deux documents d'interface attribuent différemment la même broche, aucun ne faisant référence à l'autre.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "La broche 7 transporte l'alimentation 28 volts.",
                source: "Document de contrôle d'interface ICD-A, révision 3",
              },
              {
                text: "La broche 7 est réservée et ne doit pas être connectée.",
                source: "Note de dessin du harnais, révision 1",
              },
            ],
            chip: "contradiction",
          },
        },
        {
          intro:
            "Un conflit d'unités saisi par l'arithmétique : mètres contre pieds, comparés avant toute consultation de modèle.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Plafond de fonctionnement : 4 600 mètres.",
                source: "Spécification environnementale, révision D",
              },
              {
                text: "Plafond de fonctionnement : 15 000 pieds.",
                source: "Manuel de l'opérateur, révision 2",
              },
            ],
            chip: "conflit d'unités",
          },
        },
        {
          intro:
            "Ce que le système a refusé de stocker : des extractions dont la vérification a échoué, enregistrées au lieu d'être crues.",
          mock: {
            kind: "suppression",
            rows: [
              { reason: "non pris en charge par la source", count: "203" },
              { reason: "formulation prudente dans la source", count: "168" },
              { reason: "portée impossible à déterminer", count: "141" },
            ],
            note: "Chaque extraction écartée est enregistrée avec son extrait source, sa raison et son horodatage, puis résumée dans le rapport de constats.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Ce que cela signifie pour vous",
      cards: [
        {
          title: "Ancré dans votre propre corpus",
          text: "Si vos documents le contiennent, il y répond, avec des citations. Si ce n’est pas le cas, il le dit au lieu de deviner.",
        },
        {
          title: "Rien ne part, de manière vérifiable",
          text: "Un point de sortie unique, contrôlé en intégration continue, dirigeait tous les appels vers les modèles locaux. Le code est public afin que votre équipe de sécurité puisse le vérifier.",
        },
        {
          title: "La connaissance survit à la rotation",
          text: "Ce qui a été écrit reste consultable avec des citations une fois que l'auteur a quitté le programme.",
        },
        {
          title: "Preuve pour l'examen",
          text: "Les rapports de constats signés font état d'une portée de document définie, produite à l'intérieur de l'enclave.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Est-ce que quelque chose quitte le réseau ?",
        answer:
          "Les modèles de langage, les embeddings, la reconnaissance de pages et la recherche s'exécutent dans l'instance. Il n'y a aucune télémétrie et le point de sortie unique des modèles est contrôlé en intégration continue.",
      },
      {
        question: "Quelle est la qualité des modèles locaux par rapport aux modèles hébergés ?",
        answer:
          "Mesuré, non affirmé : chaque configuration de modèle comporte ses propres scores de précision publiés, et les combinaisons non testées sont signalées comme non évaluées.",
      },
      {
        question: "Qui l'exploite ?",
        answer:
          "Vos équipes, dans votre environnement. La procédure d'installation est documentée, le script opérateur est public et nous formons vos opérateurs dans le cadre de la prestation.",
      },
    ],
    closing: {
      sentence:
        "Envoyez un ensemble de documents, ou ramenez-nous dans vos murs ; nous délivrons le rapport de constats signé.",
      subject: "Demande de pilote, défense",
    },
    chat: [
      {
        question: "Quelle est la longueur de l'antenne pour l'ARK-23 révision C ?",
        segments: [
          { text: "1,2 mètres.", chips: ["CIM ARK-23 rC", "Dessin d'encombrement r2"] },
        ],
        standsOn: ["CIM ARK-23 rC", "Dessin d'encombrement r2"],
      },
      {
        question: "Quelle est la classification d'exportation de l'ARK-23 ?",
        segments: [],
        silence: {
          title: "Vos documents ne couvrent pas cela.",
          banner: "Les connaissances générales suivent, marquées comme ne provenant pas de vos sources.",
        },
        standsOn: [],
      },
    ],
  },

  {
    slug: "automotive-paint",
    navLabel: "Peinture automobile",
    industryLabel: "Peinture automobile",
    metaTitle: "Processus de peinture vérifiés",
    metaDescription: "Documentation de peinture automobile vérifiée.",
    headline: "Le savoir-faire derrière une finition parfaite survit désormais aux personnes qui le portent",
    subhead:
      "Une finition haut de gamme est constituée de couches de savoir-faire : prétraitement, e-coat, apprêt, couche de base, vernis, chacun avec sa propre fenêtre. Une opération de peinture a donné au processus derrière la surface la même rigueur que la surface, et le contrôle du processus en atelier de peinture est devenu vérifiable.",
    heroMock: {
      claims: [
        {
          text: "Cuire au four 20 minutes à une température d'objet de 140 degrés Celsius.",
          source: "Fiche technique Clearcoat CC-2, révision 9",
        },
        {
          text: "Cuire au four 18 minutes à une température d'objet de 150 degrés Celsius.",
          source: "Carte de processus PC-31, révision D",
        },
      ],
      chip: "contradiction",
    },
    situation: {
      heading: "L'artisanat vit dans les gens et le papier dispersé",
      pains: [
        {
          title: "Le maître a pris sa retraite",
          text: "Avec lui est arrivé ce qu'aucun document ne contient : l'ajustement hivernal lorsque l'humidité baisse, ce qui signifie un défaut qui signifie une contamination au silicone et qui signifie que le désolvatation a été interrompu, le séquençage des lots qui a réduit les déchets de purge.",
        },
        {
          title: "Personne ne sait quelle copie est actuelle",
          text: "Fiches techniques des fournisseurs, fiches de processus, plans de contrôle, instructions de travail, fiches de la salle de mélange, carnet de notes de l'opérateur, supports de formation vieux de quatre ans, cartes plastifiées à la station, tableaux blancs photographiés, règles d'alignement dans une feuille de calcul d'un planificateur. Une partie contredit le reste.",
        },
        {
          title: "Un an avant que le stand ne vous fasse confiance",
          text: "Les nouvelles personnes apprennent en interrogeant autour d'elles, et les ingénieurs de procédés héritent d'étapes que personne ne peut plus expliquer. La boucle de retouche enseigne coûteusement ce que le document aurait dû dire.",
        },
      ],
    },
    run: {
      heading: "Le traitement",
      intro:
        "Un après-midi passé à montrer à Cogeto le papier de l'atelier : fiches techniques, cartes de processus à travers leurs révisions, plans de contrôle, instructions de travail, feuilles de mélange, avis et courriers de changement de fournisseur, documents de formation, journaux de maintenance, ainsi que les pages de cahier et les cartes plastifiées comme photographies.",
      steps: [
        "643 documents importés, dont 151 pages et cartes photographiées",
        "Photographies lues par reconnaissance locale à l'intérieur de l'instance",
        "Faits ancrés dans le système de peinture, la couche et la révision, de sorte que deux systèmes de vernis avec des feuilles presque identiques restent distincts.",
        "Chaque affirmation vérifiée par rapport à sa propre phrase source",
        "Réconciliation du jour au lendemain : feuille contre carte, plan contre instruction, jeu de cartes contre pratique actuelle",
      ],
      summaryTitle: "Le résumé du matin",
      summary: [
        { label: "documents lus", value: "643" },
        { label: "faits stockés", value: "16,480" },
        { label: "contradictions trouvées", value: "24" },
        { label: "déclarations remplacées", value: "168" },
        { label: "extractions écartées", value: "297" },
        { label: "pages illisibles, classées par nom", value: "11" },
      ],
    },
    findings: {
      heading: "Les constats",
      sub: "Quatre des vingt-quatre, plus ce qui a été rejeté et ce qui a été remplacé, comme le signale le produit.",
      items: [
        {
          intro:
            "Le conflit de fenêtre de cuisson : un avis de changement de reformulation a déplacé la fenêtre et n'a jamais atteint la carte de processus.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Cuire au four 20 minutes à une température d'objet de 140 degrés Celsius.",
                source: "Fiche technique Clearcoat CC-2, révision 9",
              },
              {
                text: "Cuire au four 18 minutes à une température d'objet de 150 degrés Celsius.",
                source: "Carte de processus PC-31, révision D",
              },
            ],
            chip: "contradiction, détectée le 12 juin",
          },
        },
        {
          intro:
            "Le rapport de mélange qui a dérivé : la fiche de la salle de mélange indique toujours l'ancien rapport ; la fiche technique a été modifiée il y a deux révisions.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Mélanger 100 : 30 : 10 en volume avec le durcisseur H-40.",
                source: "Feuille de salle de mélange, poste 3",
              },
              {
                text: "Mélanger 100 : 35 : 10 en volume avec le durcisseur H-40.",
                source: "Fiche technique Basecoat B-7, révision 11",
              },
            ],
            chip: "conflit, un camp remplacé, détecté le 13 juin",
          },
        },
        {
          intro:
            "Une construction de film qui signifie deux choses différentes selon le document auquel vous faites confiance, tous deux toujours en circulation.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Épaisseur du film de vernis : 45 à 55 microns.",
                source: "Plan de contrôle, révision F",
              },
              {
                text: "Épaisseur du film de vernis : 40 à 50 microns.",
                source: "Instruction de travail WI-208, révision C",
              },
            ],
            chip: "dérive de révision, détectée le 12 juin",
          },
        },
        {
          intro:
            "La seule ligne du maître à la retraite, photographiée, extraite, vérifiée, et maintenant un fait cité avec provenance au lieu d'un souvenir.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Au-dessus de 70 pour cent d’humidité relative, ajoutez 5 pour cent de diluant plus lentement.",
                source: "Page de carnet photographiée, salle de mixage",
              },
            ],
            chip: "provenance vérifiée et citée",
          },
        },
        {
          intro:
            "La séquence de grains, traitée comme un remplacement : l'ancien support de formation est clôturé par l'instruction actuelle, chaîne conservée.",
          mock: {
            kind: "chain",
            oldClaim: {
              text: "Poncer avec du P400 avant la réparation de la couche de base.",
              source: "Plateforme d'entraînement, 2022",
            },
            newClaim: {
              text: "Poncer au P500, puis au P800, avant réparation de la couche de base.",
              source: "Instruction de travail WI-214, révision B",
            },
            note: "Remplacé, chaîne conservée. L'ancien support reste consultable dans l'historique, jamais comme pratique actuelle.",
          },
        },
        {
          intro:
            "Ce que le système a refusé de stocker : des extractions dont la vérification a échoué, enregistrées au lieu d'être crues.",
          mock: {
            kind: "suppression",
            rows: [
              { reason: "non pris en charge par la source", count: "118" },
              { reason: "couvert en source", count: "97" },
              { reason: "durée inestimable", count: "82" },
            ],
            note: "Chaque extraction écartée est enregistrée avec son extrait source, sa raison et son horodatage, puis résumée dans le rapport de constats.",
          },
        },
      ],
    },
    outcomes: {
      heading: "Ce que cela signifie pour vous",
      cards: [
        {
          title: "Le nouvel opérateur demande au corpus",
          text: "Et obtient la réponse avec la feuille exacte et la révision citée, ou un silence honnête au lieu d'une supposition. Les règles d'alignement quittent la feuille de calcul du planificateur et deviennent des faits interrogeables.",
        },
        {
          title: "Des reformulations font surface le même jour",
          text: "Un avis de changement de fournisseur est vérifié par rapport à chaque carte et instruction le jour même de son arrivée, et non après un pic de retouche dans le tunnel lumineux.",
        },
        {
          title: "La préparation d'un audit devient un rapport",
          text: "Les visites et audits des clients commencent par un rapport de constats signé sur la documentation de la peinture au lieu d'une semaine d'archéologie.",
        },
        {
          title: "Capturez le prochain maître à temps",
          text: "Ce que sait la prochaine personne à prendre sa retraite peut être capturé une note photographiée à la fois, vérifiée et conservée avec sa provenance.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "La moitié de nos connaissances en matière de processus sont constituées de notes manuscrites et de cartes plastifiées.",
        answer:
          "Les photographies sont lues par reconnaissance locale à l'intérieur de l'instance. Les pages qui ne peuvent pas être lues sont étiquetées honnêtement et répertoriées par leur nom, jamais ignorées en silence.",
      },
      {
        question: "Notre atelier utilise une documentation dans deux langues.",
        answer:
          "Les sujets sont résolus dans plusieurs langues, de sorte qu'une feuille dans une langue peut contredire une carte dans l'autre. La qualité est mesurée et publiée par langue, vous la voyez donc avant de vous engager.",
      },
      {
        question: "Rien ne peut quitter le réseau du site industriel.",
        answer:
          "Cogeto fonctionne entièrement hors ligne avec des modèles locaux. Il y a exactement un point de sortie dans la base de code, appliqué en intégration continue, et le code est ouvert afin que votre équipe puisse le vérifier.",
      },
      {
        question: "Nos opérateurs ne vont pas taper de documentation.",
        answer:
          "Ils ne sont pas obligés de le faire. Une photo ou un courrier transféré suffit, et une ligne dans le chat devient un fait vérifié avec provenance.",
      },
    ],
    closing: {
      sentence:
        "Envoyer les fiches de processus, les fiches techniques et les instructions pour une ligne ou un système de peinture ; nous livrons le rapport de constats signé indiquant les points en désaccord.",
      subject: "Pilote d'atelier de peinture",
    },
    chat: [
      {
        question: "Quelle est la fenêtre de cuisson du vernis CC-240 ?",
        segments: [
          {
            text: "20 minutes à une température d'objet de 140 degrés Celsius.",
            chips: ["TDS CC-240 r7"],
          },
        ],
        conflict: {
          text: "Conflit : la carte de processus PC-31 r3 affiche toujours 18 minutes à 150 degrés, la fenêtre de pré-reformulation.",
          chips: ["Carte de processus r3", "Avis de changement CN-58"],
        },
        standsOn: ["TDS CC-240 r7", "Carte de processus r3", "Avis de changement CN-58"],
      },
      {
        question: "Quand passe-t-on au plus lent ?",
        segments: [
          {
            text: "Au-dessus de 70 pour cent d’humidité relative, ajoutez 5 pour cent de diluant plus lentement.",
            chips: ["Note photographiée, salle de mixage"],
          },
        ],
        standsOn: ["Note photographiée, salle de mixage"],
      },
    ],
  },
  {
    slug: "engineering-teams",
    navLabel: "Équipes d'ingénierie",
    industryLabel: "Équipes d'ingénierie",
    metaTitle: "Une base de connaissances en ingénierie qui fait ses preuves",
    metaDescription: "Une base de connaissances d'ingénierie vérifiée, avec citations et détection des contradictions.",
    headline: "Le wiki, les fiches techniques et la vérité",
    subhead:
      "Une équipe d'électronique industrielle a tout pointé vers Cogeto : le wiki auquel personne ne fait confiance, une famille de quarante fiches techniques presque identiques et les fils de décision. Désormais, le corpus répond par des citations, et la dérive a des noms.",
    heroMock: {
      claims: [
        {
          text: "Le boîtier est classé IP54.",
          source: "Wiki interne, page matériel",
        },
        {
          text: "Indice de protection : IP65.",
          source: "Fiche technique du produit, révision 7",
        },
      ],
      chip: "contradiction",
    },
    situation: {
      heading: "Dérive de la documentation, non mesurée",
      pains: [
        {
          title: "Le wiki auquel personne ne fait confiance",
          text: "Trois personnes l’ont édité depuis 2022. Tout le monde soupçonne qu’il ne va pas quelque part ; personne ne sait où, alors tout le monde redemande à un collègue.",
        },
        {
          title: "Quarante fiches techniques, passe-partout partagé",
          text: "Des variantes presque identiques, différant par des nombres que personne ne peut nommer de mémoire. Le copier-coller maintient le passe-partout cohérent et les différences invisibles.",
        },
        {
          title: "Intégration en interrogeant autour de vous",
          text: "Les décisions vivent dans les fils et les têtes. Le premier mois d'un nouvel ingénieur est consacré à déterminer de quel document il faut se méfier.",
        },
      ],
    },
    run: {
      heading: "Le traitement",
      intro:
        "Une importation groupée : l'exportation wiki, la famille de feuilles de données, les notes de conception et les fils de décision archivés.",
      steps: [
        "486 documents importés en une seule opération",
        "Fiches techniques ancrées par variante, de sorte que le modèle partagé reste distinct",
        "Pages wiki et fils de discussion lus comme sources avec dates",
        "Vérification par rapport aux phrases sources avant stockage",
        "Réconciliation du jour au lendemain, variante contre variante, wiki contre fiche technique",
      ],
      summaryTitle: "Le résumé du matin",
      summary: [
        { label: "documents lus", value: "486" },
        { label: "faits stockés", value: "12,905" },
        { label: "contradictions trouvées", value: "33" },
        { label: "déclarations remplacées", value: "189" },
        { label: "extractions écartées", value: "264" },
        { label: "pages illisibles, classées par nom", value: "5" },
      ],
    },
    findings: {
      heading: "Les constats",
      sub: "Trois sur trente-trois, comme le signale le produit.",
      items: [
        {
          intro: "Le wiki contre la fiche technique : la dérive que tout le monde soupçonnait, nommée.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Le boîtier est classé IP54.",
                source: "Wiki interne, page matériel",
              },
              {
                text: "Indice de protection : IP65.",
                source: "Fiche technique du produit, révision 7",
              },
            ],
            chip: "contradiction",
          },
        },
        {
          intro:
            "Variante contre variante : l'ancrage maintient les quarante fiches techniques distinctes. Une différence réelle devient donc un constat, pas du bruit.",
          mock: {
            kind: "finding",
            claims: [
              {
                text: "Température ambiante maximale : 70 degrés Celsius.",
                source: "Fiche technique, modèle K-240, révision 3",
              },
              {
                text: "Température ambiante maximale : 60 degrés Celsius.",
                source: "Fiche technique, modèle K-240, révision 4",
              },
            ],
            chip: "dérive de révision",
          },
        },
        {
          intro: "Le rapport signé que l'équipe dépose avec l'examen trimestriel.",
          mock: {
            kind: "report",
            lines: [
              "Périmètre du corpus : 486 documents, sélectionnés explicitement",
              "33 contradictions, chacune avec des phrases et des révisions",
              "189 remplacements avec leurs chaînes, 264 suppressions résumées",
            ],
          },
        },
      ],
    },
    outcomes: {
      heading: "Ce que cela signifie pour vous",
      cards: [
        {
          title: "Une base de connaissances qui fait ses preuves",
          text: "Chaque réponse cite sa phrase et son document, ou indique que le corpus est silencieux. La confiance cesse d'être un sentiment.",
        },
        {
          title: "La dérive a été attrapée le jour où cela arrive",
          text: "Une modification du wiki qui contredit une fiche technique devient un constat le jour même, pas une information erronée qui se propage pendant un an.",
        },
        {
          title: "Intégration à partir du corpus",
          text: "Les nouveaux ingénieurs interrogent le corpus et obtiennent des citations, au lieu de passer un mois à apprendre à quels documents se méfier.",
        },
        {
          title: "Les variantes restent honnêtes",
          text: "Quarante fiches techniques presque identiques restent distinctes par variante, de sorte que l'ingénieur commercial citant un modèle n'obtient jamais les numéros d'un autre modèle.",
        },
      ],
      deployment: DEPLOYMENT,
    },
    faq: [
      {
        question: "Honnêtement, notre documentation est en désordre. Est-ce un problème ?",
        answer:
          "C'est précisément l'intérêt. Plus le corpus est complexe, plus la vérification et le journal des extractions écartées sont importants : ce qui ne peut pas être vérifié est consigné, pas tenu pour vrai.",
      },
      {
        question: "Qui corrige les résultats ?",
        answer:
          "Vous le faites, avec les deux phrases devant vous. Les résultats apparaissent dans la source, dans les réponses et dans le rapport ; il n'y a pas de file d attente à traiter.",
      },
      {
        question: "Le wiki surpasse-t-il la fiche technique, ou l'inverse ?",
        answer:
          "Ni l’un ni l’autre. Un conflit montre les deux côtés avec des dates et des révisions. Une personne décide ; votre confirmation surpasse alors le jugement de la machine.",
      },
    ],
    closing: {
      sentence:
        "Envoyez-nous l'export wiki et le dossier de la fiche technique ; nous délivrons le rapport de constats signé.",
      subject: "Demande pilote, ingénierie",
    },
    chat: [
      {
        question: "Quelles fiches techniques affichent encore l'ancien courant de sommeil ?",
        segments: [
          {
            text: "Deux variantes transportent toujours 120 microampères : K-241 r2 et K-244 r1. La valeur actuelle est de 85 microampères depuis r3.",
            chips: ["K-241 r2", "K-244 r1", "K-240 r3, remplace"],
          },
        ],
        standsOn: ["K-241 r2", "K-244 r1", "K-240 r3"],
      },
      {
        question: "Le boîtier est-il IP54 ou IP65 ?",
        segments: [{ text: "IP65.", chips: ["Fiche technique r7"] }],
        conflict: {
          text: "Conflit : la page du matériel wiki indique toujours IP54, signalé et lié.",
          chips: ["Page wiki"],
        },
        standsOn: ["Fiche technique r7", "Page wiki"],
      },
    ],
  },
];

export const csShared = {
  situationKicker: "La situation",
  runKicker: "Le traitement",
  findingsKicker: "Les constats",
  outcomesKicker: "Ce que cela signifie pour vous",
  faqKicker: "Premières questions",
  chatKicker: "Ensuite, vous demandez.",
  readCta: "Lire l'étude de cas",
  indexCtaSub: "Envoyer un ensemble de documents ; nous délivrons le rapport de constats signé.",
  deploymentHeading: "Exécutez-le là où résident vos données",
  closingHeading: "Démarrez un pilote sur vos documents.",
  closingCta: "Lancer un pilote",
  siblingsHeading: "Plus d'études de cas",
  proofLinks: [
    { label: "La précision publiée", href: "/trust" },
    { label: "Sécurité et souveraineté", href: "/security" },
    { label: "Le livre blanc", href: "/whitepaper" },
  ],
  contactEmail: "ivan@cogeto.eu",
  chatUi: {
    header: "CHAT",
    you: "VOUS",
    remember: "MÉMORISER CECI",
    fromMemory: "COGETO · DEPUIS VOTRE MÉMOIRE",
    thinking: "Réponse à partir de votre mémoire...",
    standsOn: "S'APPUIE SUR",
    placeholder: "Demandez à votre mémoire...",
    hint: "Entrée pour envoyer · Maj+Entrée pour une nouvelle ligne · chaque affirmation indique ce qu'elle peut prouver",
  },
};
