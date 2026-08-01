import type { ZPageContent } from "./product-contradiction-findings";

/**
 * English copy for /product/findings-report, rebuilt in the Z-rhythm
 */
export const findingsReport: ZPageContent = {
  metaTitle: "Le rapport de constats",
  metaDescription:
    "Un clic produit un rapport de constats signé : contradictions, chaînes des faits remplacés et extractions écartées. PDF et JSON.",
  eyebrow: "Produit",
  headline: "Des preuves que vous pouvez transmettre, pas des minutes que vous retapez",
  lede:
    "Un clic produit un rapport de constats sur les documents que vous sélectionnez : chaque contradiction et ses preuves, chaque déclaration remplacée et sa chaîne, ainsi qu'un résumé des extractions écartées. Il est signé afin qu'un tiers puisse vérifier son intégrité.",
  heroMock: "report",
  bands: [
    {
      heading: "L'auditeur obtient des preuves, pas des résumés",
      advantage:
        "Chaque contradiction apparaît avec les deux affirmations, les deux phrases sources textuelles, le document avec révision et emplacement pour chaque côté, la date de détection et son statut de résolution.",
      mechanism:
        "Les faits remplacés apparaissent avec leur chaîne, et le résumé des extractions écartées intègre au dossier ce que la vérification a rejeté.",
      mock: "finding-cold",
    },
    {
      heading: "La signature couvre un périmètre défini",
      advantage:
        "Un rapport est toujours produit sur un ensemble de sources explicitement sélectionné : le périmètre audité fait donc partie du dossier, ce n'est pas une hypothèse.",
      mechanism:
        "Les constats qui renvoient à un document hors du périmètre sélectionné apparaissent dans une section clairement identifiée plutôt que d'être inclus ou écartés silencieusement.",
      mock: "log",
    },
    {
      heading: "Le rapport affirme sa propre exactitude",
      advantage:
        "L'artefact que vous transmettez indique les scores de précision mesurés pour la configuration exacte du modèle qui l'a produit. Aucun autre outil documentaire n'indique à votre auditeur son niveau de précision.",
      mechanism:
        "Les mêmes chiffres sont publiés sur la page des scores de précision pour chaque version, langue et configuration.",
      link: { label: "Les scores de précision publiés", href: "/trust" },
      mock: "answer-conflict",
    },
  ],
  statNote:
    "Données en direct des scores de précision publiés pour chaque version. Le rapport porte les scores de sa propre configuration de modèle ; voici les agrégats actuels.",
  gridHeading: "Conçu pour le dossier auquel il sera versé",
  grid: [
    {
      title: "PDF et JSON",
      text: "PDF pour l'auditeur et le dossier de revue de conception, JSON pour votre système qualité, tous deux signés par le même mécanisme que les reçus de suppression.",
    },
    {
      title: "Avant un audit",
      text: "Quatre ans de documentation, plusieurs centaines de fichiers, deux langues et quelques numérisations. Le lendemain matin : les constats. Six semaines plus tard, le rapport signé rejoint le dossier de revue de conception.",
    },
    {
      title: "Le jour d'une modification",
      text: "Un avis de modification arrive par e-mail et contredit un document d'interface. Le constat apparaît le jour même, pas lors d'un audit deux ans plus tard.",
    },
    {
      title: "Pas une évaluation réglementaire",
      text: "Cogeto produit des preuves de vos documents. Le jugement réglementaire appartient à votre organisation, et les documents le disent clairement.",
    },
  ],
  cta: {
    heading: "Votre premier rapport sort du pilote.",
    sub: "Apportez un véritable ensemble de documents. Le projet pilote se termine par le rapport de constats signé sur votre matériel, et vous le conservez dans tous les cas.",
    secondary: { label: "Comment les constats sont détectés", href: "/product/contradiction-findings" },
  },
};
