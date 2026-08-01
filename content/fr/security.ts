/**
 * English copy for /security, rebuilt on the trust-page skeleton (audit
 * 10, cogeto-verified-memory.md 8, docs/deployment.md, the published
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
  metaTitle: "Sécurité et souveraineté",
  metaDescription:
    "Isolation dédiée, hébergement UE ou hors ligne, effacement vérifiable, audit public et certification ISO 9001 et ISO 27001.",
  hero: {
    eyebrow: "Sécurité et souveraineté",
    headline: "Rien à quoi faire confiance. Tout à vérifier.",
    lede:
      "Chaque affirmation sur cette page est un mécanisme dans la version open source ou une certification de l'entreprise derrière elle. L'architecture est publique, l'audit est publié et le code peut être lu avant qu'un seul document ne soit envoyé quelque part.",
    secondary: {
      label: "Téléchargez le document d'une page sur la conformité",
      href: "/documents/cogeto-compliance-onepager.pdf",
    },
  },
  badgesHeading: "Certifications et preuves",
  badgeUi: { evidenceLabel: "Voir les preuves", detailsLabel: "Détails" },
  badges: [
    {
      icon: "award",
      name: "ISO 9001",
      text: "Certification d'entreprise de MVT Solutions Group, l'entreprise qui construit et exploite Cogeto. Gestion de la qualité, auditée.",
    },
    {
      icon: "award",
      name: "ISO 27001",
      text: "Certification d'entreprise du Groupe MVT Solutions. Gestion de la sécurité de l'information, auditée.",
    },
    {
      icon: "check",
      name: "Open source, AGPLv3",
      text: "Le moteur est public. Votre équipe de sécurité peut lire le chemin d'ingestion, les portes d'accès et la saga de suppression ligne par ligne.",
      href: "/open-source",
    },
    {
      icon: "shield",
      name: "Audit de sécurité publié",
      text: "L'audit 2.0, clôturé en cinq vagues de remédiation, avec sa vérification indépendante, publié dans son intégralité dans le référentiel.",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
      external: true,
    },
    {
      icon: "signature",
      name: "Versions signées",
      text: "Les instances de production extraient des images prédéfinies signées par le pipeline de versions. Le script de l'opérateur vérifie lui-même les signatures et chaque version comporte sa nomenclature logicielle.",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
      external: true,
    },
    {
      icon: "check",
      name: "Correspondance avec le RGPD et l'AI Act",
      text: "Effacement avec reçus signés, protection par la conception comme par l'architecture et une posture de transparence construite pour montrer son travail. Revendication mappée par revendication sur la page de conformité.",
      href: "/compliance",
    },
  ],
  highlightsHeading: "La conception de la sécurité en six mécanismes",
  highlights: [
    {
      title: "Une instance par client",
      text: "Aucune base de données partagée, aucune colonne de tenant, aucun chemin de requête entre clients. L'isolement est une frontière de déploiement, pas un filtre.",
    },
    {
      title: "Hors ligne signifie hors ligne",
      text: "Les modèles, les embeddings, la reconnaissance de pages et la recherche s'exécutent dans l'instance. Un seul point de sortie, contrôlé en CI. Aucune télémétrie.",
    },
    {
      title: "Le caviardage échoue en mode fermé",
      text: "Les entités sensibles sont pseudonymisées localement avant tout appel à un modèle externe. Si le caviardage ne peut pas s'exécuter, l'appel n'a pas lieu.",
    },
    {
      title: "Suppression que vous pouvez prouver",
      text: "La suppression se déroule comme une saga dans les trois stockages et se termine par un reçu signé et chaîné, revérifié tous les soirs.",
    },
    {
      title: "Un journal d'audit qui ne peut pas être modifié",
      text: "Ajout uniquement, appliqué par un déclencheur de base de données, écrit dans la même transaction que l'action, couvrant les lectures et les écritures.",
    },
    {
      title: "Le départ est pris en charge",
      text: "Le Passeport Mémoire exporte le tout, signé, dans un format ouvert et documenté qui vérifie en dehors de Cogeto.",
    },
  ],
  clustersHeading: "Contrôles, sous forme de questionnaire",
  clustersSub:
    "Formulés avec des verbes d'action afin que votre évaluateur puisse les reprendre directement dans le questionnaire fournisseur.",
  clusters: [
    {
      title: "Isolement et accès",
      bullets: [
        "Exécute un déploiement par client ; aucun mode multilocataire n'existe",
        "Applique les droits d'accès dans la requête, dans les deux stockages, jamais après récupération des résultats",
        "Attribue la portée de manière déterministe ; ne déduit jamais les autorisations du contenu",
        "Chiffre les originaux au repos avec des clés propres au client ; les sert uniquement via des URL signées à courte durée de vie",
      ],
    },
    {
      title: "Trafic des modèles et souveraineté",
      bullets: [
        "Achemine chaque appel de modèle via une seule passerelle, appliquée dans CI",
        "Par défaut, il s'agit d'un fournisseur européen ; prend en charge les modèles entièrement locaux",
        "Pseudonymise les noms, les organisations et les montants avant tout appel externe, embeddings compris",
        "N'utilise jamais de contenu client pour la formation",
      ],
    },
    {
      title: "Preuve et intégrité",
      bullets: [
        "Signe les reçus de suppression et les chaîne de hachage à leurs prédécesseurs",
        "Recherche chaque nuit les données orphelines et les altérations ; les signale sans les réparer",
        "Enregistre chaque changement d'état dans un journal d'audit en ajout uniquement",
        "Publie la précision mesurée par version, par langue et par configuration de modèle",
      ],
    },
  ],
  audit: {
    heading: "Audité, et l'audit est public",
    text: "L'audit de sécurité 2.0 est clôturé en cinq vagues de remédiation : chaque résultat est corrigé ou consciemment accepté avec une justification écrite. L'audit et sa vérification indépendante sont publiés dans le référentiel, lisibles dans leur intégralité. C'est la norme à laquelle se conforme cette page : aucune réclamation sans artefact.",
    links: [
      {
        label: "Lire l'audit",
        href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
        external: true,
      },
      {
        label: "Documents de sécurité",
        href: "https://github.com/Cogeto/cogeto/tree/main/docs/security",
        external: true,
      },
      {
        label: "Signaler une vulnérabilité",
        href: "https://github.com/Cogeto/cogeto/blob/main/SECURITY.md",
        external: true,
      },
    ],
  },
  company: {
    heading: "L'entreprise derrière",
    text: "Cogeto est construit par MVT Solutions Group d.o.o. et MCTO Advisory d.o.o., deux sociétés opérant depuis la Croatie dans l'Union européenne, fondées et dirigées par Ivan Golubic. MVT Solutions Group est certifié ISO 9001 et ISO 27001, de sorte que la gestion de la qualité et de la sécurité des informations du produit repose sur des processus d'entreprise audités, et pas seulement sur le code.",
  },
  artifactsHeading: "Emportez les artefacts avec vous",
  artifacts: [
    {
      label: "Document d'une page sur la conformité (PDF)",
      href: "/documents/cogeto-compliance-onepager.pdf",
    },
    { label: "La cartographie complète de la conformité", href: "/compliance" },
    { label: "Scores de précision publiés", href: "/trust" },
    {
      label: "Schéma du passeport mémoire",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/passport-schema",
      external: true,
    },
  ],
  cta: {
    heading: "Amenez votre équipe de sécurité au pilote.",
    sub: "Les exigences de résidence des données, les environnements isolés et les revues de sécurité font partie des échanges habituels.",
    secondary: {
      label: "Lire l'audit",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs/audits",
      external: true,
    },
  },
};
