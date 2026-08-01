/**
 * English copy for /trust. Metric explainers cover both schema lines: the
 * five 1.0 metrics and the three added by schema 1.1 (contradiction
 * precision, supersedes accuracy with its published denominator, rewrite
 * accuracy). Explainer wording follows the published schema descriptions
 * and docs/eval/gate-model.md in the product repo.
 */

export interface TrustContent {
  eyebrow: string;
  title: string;
  thesis: string;
  currentHeading: string;
  currentIntro: string;
  configLabel: string;
  languageLabel: string;
  languageNames: Record<string, string>;
  aggregateNote: string;
  gatesNote: string;
  trendsHeading: string;
  trendsIntro: string;
  chatHeading: string;
  chatIntro: string;
  provenanceHeading: string;
  provenanceIntro: string;
  gateLabel: string;
  backfilledLabel: string;
  backfilledNote: string;
  metrics: Record<string, { label: string; explainer: string }>;
  pairsLabel: string;
  notAvailable: string;
  checkFileCta: string;
  goldenCorpusCta: string;
  schemaCta: string;
  backHome: string;
  /** Chip prefix before the current release version number. */
  currentReleaseLabel: string;
  complianceLinkLabel: string;
  sourceLinkLabel: string;
  /** Button on the fallback page linking to the published data files. */
  dataCta: string;
  /** Stat-band label for the golden-case count on the product pages. */
  goldenCasesStatLabel: string;
  unavailableTitle: string;
  unavailableBody: string;
}

export const trust: TrustContent = {
  eyebrow: "Scores de précision",
  title: "La précision mesurée de Cogeto, par version",
  thesis:
    "Cogeto publie sa propre précision mesurée pour chaque version, de la même manière qu'un service publie la disponibilité, y compris les chiffres qui ne répondent pas à ses objectifs. Voici les chiffres, et voici les fichiers de données publics qui les sous-tendent. Ne vous fiez pas à ce tableau : vérifiez le fichier.",
  currentHeading: "Scores actuels",
  currentIntro:
    "Qualité de l'extraction et du rapprochement pour la configuration du modèle et le langage sélectionnés, mesurée par rapport à un corpus doré étiqueté à la main.",
  configLabel: "Configuration du modèle",
  languageLabel: "Langue",
  languageNames: {
    en: "Anglais",
    hr: "Croate",
    aggregate: "Agrégat",
  },
  aggregateNote:
    "L'agrégat combine les corpus de chaque langue. Il est présenté sans masquer une langue moins performante dans une moyenne : utilisez le sélecteur pour consulter chaque langue séparément.",
  gatesNote:
    "Chaque seuil minimal correspond à la valeur réellement atteinte par la métrique, jamais à un objectif encore hors d'atteinte, et ne peut qu'augmenter. Les seuils s'appliquent à chaque langue et à l'agrégat ; celui affiché dépend donc de la langue sélectionnée.",
  trendsHeading: "Évolution",
  trendsIntro:
    "Les dix versions les plus récentes depuis la série v1, de la plus ancienne à la plus récente, sur un axe de 0 à 100 %. L'historique complet reste publié dans le dépôt. La ligne pointillée représente le seuil d'intégration continue qu'une version doit franchir avant publication.",
  chatHeading: "Suite de discussion",
  chatIntro:
    "Cas de questions et réponses de bout en bout. Une réussite signifie que la réponse était fondée sur les bons faits du corpus. Les identifiants de cas défaillants sont publiés et non masqués.",
  provenanceHeading: "Provenance",
  provenanceIntro:
    "Chaque version, avec le commit exact auquel elle a été mesurée, la version du harnais, les tailles du corpus et un lien direct vers son fichier JSON immuable. Les fichiers publiés ne sont jamais modifiés après leur publication. Lisez les données, pas notre résumé.",
  gateLabel: "Seuil CI",
  backfilledLabel: "Reconstitué",
  backfilledNote:
    "Transcrit à partir d'exécutions enregistrées, plutôt que produit par le banc d'évaluation lors de la publication.",
  metrics: {
    extraction_precision: {
      label: "Précision d'extraction",
      explainer:
        "Parmi les faits que Cogeto a tirés d'une source, ceux qui étaient exacts. Une haute précision signifie que peu de faits inventés ou erronés entrent en mémoire, ce qui compte le plus car un mensonge stocké est durable.",
    },
    extraction_recall: {
      label: "Rappel d'extraction",
      explainer:
        "Parmi les faits qu'un humain attentif extrairait d'une source, la part retrouvée par Cogeto. Un rappel élevé signifie peu de faits omis, l'erreur qu'un lecteur remarque le plus souvent.",
    },
    verification_agreement: {
      label: "Accord de vérification",
      explainer:
        "À quelle fréquence la passe de vérification indépendante correspondait à l'étiquette humaine quant à savoir si une source soutient réellement une affirmation. Le contrôle d'admission doit lui-même être fiable avant que ses verdicts ne déterminent ce qui atteint la mémoire active.",
    },
    dedup_accuracy: {
      label: "Précision de la déduplication",
      explainer:
        "Dans quelle mesure la réconciliation fusionne-t-elle les faits en double sans fusionner deux faits véritablement différents. Les fausses fusions sont pénalisées plus lourdement que les fusions manquées, car une fausse fusion détruit un fait distinct.",
    },
    contradiction_precision: {
      label: "Précision des contradictions",
      explainer:
        "Parmi les contradictions signalées par Cogeto, la part qui correspond à de véritables conflits. Publiée depuis le schéma 1.1. Précision et rappel sont publiés ensemble, car chacun peut être artificiellement optimisé : tout signaler donne un rappel parfait ; ne rien signaler rend la précision sans objet.",
    },
    contradiction_recall: {
      label: "Rappel de contradiction",
      explainer:
        "Parmi les contradictions réelles entre les faits, la part détectée par Cogeto. Chaque détection relie les deux affirmations, leurs phrases sources et la date, afin que le constat puisse être vérifié à partir des preuves.",
    },
    supersedes_accuracy: {
      label: "Précision des remplacements",
      explainer:
        "Part des décisions de remplacement correctes, verdict et sens compris, parmi les paires pour lesquelles un remplacement était en jeu. Le nombre de paires est publié avec le taux, car un taux calculé sur un seul cas n'est pas significatif.",
    },
    rewrite_accuracy: {
      label: "Précision du routage de réécriture des requêtes",
      explainer:
        "La part des cas de routage de requêtes-réécriture réussis : routage d'intention, résolution de pronoms et de points de suspension et classification temporelle. C'est l'étape qui transforme une question en une bonne recherche, de sorte que ses erreurs apparaissent comme des réponses fausses ou manquantes.",
    },
  },
  pairsLabel: "paires",
  notAvailable: "non mesuré",
  checkFileCta: "Ouvrez le fichier JSON",
  goldenCorpusCta: "Parcourez le corpus doré",
  schemaCta: "Lire le schéma de données",
  backHome: "Retour à cogeto.eu",
  currentReleaseLabel: "Version actuelle",
  complianceLinkLabel: "Document d'une page sur la conformité",
  sourceLinkLabel: "Source sur GitHub",
  dataCta: "Lire les données sur GitHub",
  goldenCasesStatLabel: "cas de référence annotés manuellement derrière ces chiffres",
  unavailableTitle: "Actualisation des scores de précision",
  unavailableBody:
    "Les données publiées n'ont pas pu être lues pour l'instant. Cette page se met à jour à partir du référentiel de produits dans l'heure. Veuillez revenir sous peu ou lire les fichiers directement sur GitHub.",
};
