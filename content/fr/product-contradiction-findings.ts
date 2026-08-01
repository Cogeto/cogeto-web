/**
 * English copy for /product/contradiction-findings, rebuilt in the
 */

export type MockKind =
  | "finding-battery"
  | "finding-cold"
  | "numeric"
  | "alias"
  | "answer-conflict"
  | "silence"
  | "log"
  | "report"
  | "status";

export interface ZBandContent {
  heading: string;
  advantage: string;
  mechanism?: string;
  link?: { label: string; href: string };
  mock: MockKind;
}

export interface ZPageContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lede: string;
  heroMock: MockKind;
  bands: ZBandContent[];
  statNote: string;
  gridHeading: string;
  grid: { title: string; text: string }[];
  objection?: { heading: string; paragraphs: string[] };
  cta: {
    heading: string;
    sub: string;
    secondary: { label: string; href: string; external?: boolean };
  };
}

export const contradictionFindings: ZPageContent = {
  metaTitle: "Constats de contradiction",
  metaDescription:
    "Cogeto compare vos documents en continu et signale chaque désaccord avec les deux sources, leurs révisions et la date de détection.",
  eyebrow: "Produit",
  headline: "Trouver le désaccord avant l’audit",
  lede:
    "Votre manuel, vos spécifications, vos rapports de test et votre courrier ne concordent pas entièrement les uns avec les autres. Cogeto les compare tous en permanence et signale tout désaccord avec les preuves jointes. La fonctionnalité que personne d’autre ne propose.",
  heroMock: "finding-battery",
  bands: [
    {
      heading: "Chaque constat arrive avec ses preuves",
      advantage:
        "Vous n'avez jamais à investiguer une alerte vague. Un constat contient les deux affirmations, les deux phrases sources verbatim, les documents, leurs révisions et références, sa date de détection et son statut de résolution.",
      mechanism:
        "Un constat est une preuve, pas une notification : tout ce qui est nécessaire pour en juger y est attaché.",
      mock: "finding-cold",
    },
    {
      heading: "Les conflits numériques ne peuvent pas se cacher",
      advantage:
        "3.2 mm contre 3.4 mm, cinquante mille contre 50,000, mars contre Q1 : détectés par l'arithmétique, pas laissés à l'appréciation d'un modèle.",
      mechanism:
        "Les quantités, les unités et les dates sont comparées de manière déterministe avant de consulter un modèle. Le juge ne voit que les couples qui survivent.",
      mock: "numeric",
    },
    {
      heading: "Une entreprise sous deux noms est une seule entreprise",
      advantage:
        "Un courrier croate peut contredire une spécification anglaise, car les sujets sont résolus en fonction des alias, des fautes de frappe et des langues avant la comparaison.",
      mechanism:
        "Le remplacement est séparé de la contradiction : une révision plus récente ne clôt l'ancien fait que lorsque la chronologie est d'accord, sinon vous voyez le conflit.",
      mock: "alias",
    },
    {
      heading: "Visible là où vous travaillez, jamais mis en attente",
      advantage:
        "Les constats apparaissent dans la source qui les a produits, dans toute réponse citant l'une des deux affirmations et dans le rapport signé. Il n'y a aucune file de tâches à traiter.",
      link: { label: "Le rapport de constats signé", href: "/product/findings-report" },
      mock: "answer-conflict",
    },
  ],
  statNote:
    "Données issues des scores de précision publiés pour chaque version, agrégées sur l'anglais et le croate. Chaque chiffre renvoie à son fichier public sur la page des scores de précision.",
  gridHeading: "Ce qui garantit la fiabilité des résultats",
  grid: [
    {
      title: "Registre des paires vérifié",
      text: "Une paire jugée compatible n'est plus demandée à moins qu'un fait ne change, de sorte que les paires limites ne peuvent pas dériver vers des conflits dus à la variance du modèle.",
    },
    {
      title: "Dates de détection",
      text: "Chaque constat porte sa date de détection, afin qu'un rapport puisse indiquer quand un conflit est apparu dans le dossier.",
    },
    {
      title: "Une action par passe",
      text: "Au plus une action est effectuée par fait par passe, de sorte qu'une seule ingestion ne peut pas se répercuter sur le corpus.",
    },
    {
      title: "Précision et rappel, tous deux publiés",
      text: "Chaque métrique peut être artificiellement optimisée isolément : tout signaler donne un rappel parfait ; ne rien signaler rend la précision sans objet. Les deux sont publiées pour chaque version.",
    },
  ],
  objection: {
    heading: "Pourquoi votre IA actuelle ne détecte pas cela",
    paragraphs: [
      "Les outils de recherche retrouvent des passages, ils ne les rapprochent pas. Interrogez un assistant sur la batterie : il renvoie le passage qui correspond à votre formulation, sans l'avoir comparé aux autres sources.",
      "Tout coller dans une grande fenêtre contextuelle ne fonctionne pas non plus : les modèles sont présents de manière inégale lors de longues entrées, vous obtenez donc des conflits, différents à chaque exécution, sans aucune trace de ce qui a été comparé. Chaque désaccord est peu coûteux à régler le jour où il apparaît et coûteux à découvrir lors d'un audit, d'un rappel ou d'un litige client.",
    ],
  },
  cta: {
    heading: "Voyez ce qui ne va pas dans vos documents.",
    sub: "Le pilote lit un véritable ensemble de documents et se termine par le rapport de constats signé.",
    secondary: { label: "Comment la mémoire est vérifiée", href: "/product/verified-memory" },
  },
};
