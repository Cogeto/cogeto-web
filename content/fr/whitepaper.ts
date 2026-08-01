/**
 * English copy for /whitepaper. Paper facts verified against the shipped
 * DOI 10.5281/zenodo.21702858, CC BY 4.0. The download card reads the file
 * size from disk at build time so the stated size cannot drift.
 */

export const whitepaperMeta = {
  paperTitle:
    "Cogeto: A Verifiable, Sovereignty-First Memory Architecture for Large Language Model Assistants",
  paperSubtitle:
    "Conception et mécanismes d'un système privé hébergé dans l'UE pour la mémoire à long terme corrigible, la détection des contradictions au niveau du corpus et la suppression prouvable",
  authorLine: "Ivan Golubic",
  affiliationLine:
    "MVT Solutions Group d.o.o. et MCTO Advisory d.o.o., Croatie, Union européenne",
  dateLine: "Document de travail, 29 juillet 2026",
  statusChip: "Document de travail",
  file: "/documents/cogeto-whitepaper.pdf",
  downloadCta: "Téléchargez le PDF",
  doi: "10.5281/zenodo.21702858",
  doiUrl: "https://doi.org/10.5281/zenodo.21702858",
  recordLabel: "Enregistrement permanent sur Zenodo",
  citationHeading: "Citer le document",
  citation:
    "Golubic, I. (2026). Cogeto: A verifiable, sovereignty-first memory architecture for large language model assistants (v1). Zenodo. https://doi.org/10.5281/zenodo.21702858",
  citationLicense: "Publié sous Creative Commons Attribution 4.0.",
  copyCitationLabel: "Copier la citation",
  copiedLabel: "Copié",
  closingHeading: "Le document l'argumente. Le pilote le démontre.",
} as const;

export const whitepaper = {
  metaTitle: "Livre blanc",
  metaDescription:
    "Architecture Cogeto : vérification avant stockage, contradictions, suppression démontrable et précision publiée. DOI 10.5281/zenodo.21702858.",
  eyebrow: "Livre blanc",
  headline: "L'architecture, argumentée en détail",
  lede:
    "Le livre blanc expose la conception et son raisonnement : pourquoi la confiance dans la mémoire de la machine doit être démontrée plutôt qu'affirmée, et comment chaque revendication de confiance dans Cogeto est étayée par un artefact que vous pouvez inspecter.",
  argument: {
    heading: "L'argumentation",
    paragraphs: [
      "Les couches de mémoire attachées aux assistants IA sont généralement des accumulateurs opaques : ils se souviennent, mais ils ne peuvent pas montrer ce dont ils se souviennent, pourquoi ils le croient, si cela est toujours vrai, si deux de leurs propres sources ne sont pas d'accord ou si quelque chose a réellement été supprimé. Pour les organisations opérant dans le cadre des réglementations de l’Union européenne sur la protection des données et l’intelligence artificielle, cette opacité est disqualifiante.",
      "La réponse du document est une architecture dans laquelle chaque revendication de confiance est soutenue par un artefact inspectable, et son argument final est la position sur laquelle ce produit est construit : la vérifiabilité, et non la capacité, est la propriété qui rend la mémoire machine digne de confiance.",
    ],
  },
  covers: {
    heading: "Ce que couvre le document",
    items: [
      {
        title: "Faits atomiques avec provenance",
        text: "Une mémoire composée de faits distincts liés à leur source : un extrait verbatim, un sujet identifié, un statut explicite et un intervalle de validité.",
      },
      {
        title: "Vérification avant stockage",
        text: "Chaque fait candidat est évalué par une passe indépendante à partir de l'extrait source qu'il cite, avant d'être retenu.",
      },
      {
        title: "Le journal des extractions écartées",
        text: "Les faits candidats non étayés sont écartés automatiquement et consignés dans un journal consultable, sans créer de file de triage.",
      },
      {
        title: "Réconciliation à l'échelle du corpus",
        text: "Les entités sont rapprochées entre alias et langues, les quantités comparées arithmétiquement et les verdicts conservés pour assurer leur stabilité.",
      },
      {
        title: "Récupération honnête",
        text: "Recherche combinée avec la visibilité comme précondition, exploration de chaque interprétation en cas d'ambiguïté et signalement explicite des questions sans réponse.",
      },
      {
        title: "Suppression prouvable",
        text: "Un protocole de transaction compensatoire se terminant par un reçu signé, chaîné par hachage, revérifié chaque nuit.",
      },
      {
        title: "La passerelle souveraine",
        text: "Un prestataire européen par défaut, des modèles entièrement locaux si nécessaire, des entités sensibles pseudonymisées avant tout appel.",
      },
      {
        title: "Précision mesurée",
        text: "La méthodologie d'évaluation derrière les scores de précision publiés par version, y compris les moins flatteurs.",
      },
    ],
  },
};
