import type { ZPageContent } from "./product-contradiction-findings";

/**
 * English copy for /product/verified-memory, rebuilt in the Z-rhythm
 */
export const verifiedMemory: ZPageContent = {
  metaTitle: "Mémoire vérifiée",
  metaDescription:
    "Chaque fait est lié à sa phrase source, vérifié avant stockage et conserve un cycle de vie inspectable, y compris les extractions écartées.",
  eyebrow: "Produit",
  headline: "Ne défendez jamais un fait sans pouvoir montrer sa phrase source",
  lede:
    "Cogeto stocke des faits atomiques, pas des fragments de documents. Chaque fait conserve la phrase verbatim dont il provient, un verdict de vérification et sa période de validité. Toute réponse remonte ainsi à sa source en deux étapes.",
  heroMock: "answer-conflict",
  bands: [
    {
      heading: "Rien n'entre en mémoire sans vérification",
      advantage:
        "L’échec courant des assistants documentaires, une erreur de lecture stockée une fois et répétée avec confiance pour toujours, ne peut pas se produire ici.",
      mechanism:
        "Après l'extraction, une deuxième passe indépendante relit uniquement la phrase source du fait candidat et détermine si elle l'étaye. Seuls les faits étayés et sans réserve deviennent actifs. En cas d'échec, l'acceptation n'est jamais le choix par défaut.",
      mock: "log",
    },
    {
      heading: "Ce qui a été rejeté reste inspectable",
      advantage:
        "Vous pouvez auditer ce que le système a refusé, pas seulement ce qu'il a conservé. Chaque extraction écartée est enregistrée avec son extrait source, sa raison et son horodatage, puis résumée dans le rapport de constats.",
      mechanism:
        "Il n'y a ni file de révision ni tâche supplémentaire : Cogeto traite lui-même les résultats de vérification. Une confirmation humaine de votre organisation prévaut ensuite sur le jugement du modèle.",
      mock: "status",
    },
    {
      heading: "Honnête où vos dossiers sont silencieux",
      advantage:
        "Lorsque vos documents ne couvrent pas une question, la réponse le dit clairement, et tout ce qui provient des propres connaissances du modèle est clairement marqué comme ne provenant pas de vos sources.",
      mechanism:
        "Les connaissances du modèle ne sont jamais présentées comme provenant de vos documents. En cas de question ambiguë, Cogeto recherche les différents sujets concernés puis vous demande lequel vous visiez.",
      mock: "silence",
    },
    {
      heading: "Demandez ce que vous croyiez en mars",
      advantage:
        "Les faits remplacés ne sont jamais détruits, seulement fermés, vous pouvez donc demander ce que la documentation affirmait à n'importe quelle date, ce qui a changé depuis une révision et quelle révision a remplacé une déclaration.",
      mechanism:
        "Chaque fait comporte une période de validité. Trois lectures temporelles sont toujours disponibles : à un moment donné, modifiée depuis et version précédente.",
      link: { label: "Le rapport de constats", href: "/product/findings-report" },
      mock: "finding-battery",
    },
  ],
  statNote:
    "En direct des scores de précision publiés par version, regroupés en anglais et en croate. Le code de vérification lui-même est mesuré par rapport à des annotations humaines et le numéro est public.",
  gridHeading: "Là où s’arrêtent les garanties, c’est clairement indiqué",
  grid: [
    {
      title: "La vérification est un jugement",
      text: "Le vérificateur est un modèle indépendant dont l'accord avec les annotations humaines est publié. Il peut écarter un fait exact ; le journal des extractions écartées rend cette erreur visible.",
    },
    {
      title: "La qualité varie selon la langue",
      text: "L'extraction et la réconciliation sont mesurées séparément par langue, et les chiffres sont publiés plutôt que moyennés.",
    },
    {
      title: "Seulement ce qui a été enregistré",
      text: "Cogeto ne capture pas les jugements non documentés. Il dit qu’une question reste sans réponse plutôt que de combler une lacune.",
    },
    {
      title: "Documenté, pas omniscient",
      text: "Cogeto raisonne à partir des faits retrouvés. Pour une réflexion ouverte, un assistant généraliste est l'outil adapté, comme l'indique la documentation.",
    },
  ],
  cta: {
    heading: "Chaque réponse, vérifiable par rapport à la phrase.",
    sub: "Tout sur cette page provient de la version open source, donc tout peut être vérifié plutôt que cru.",
    secondary: { label: "La précision mesurée, par version", href: "/trust" },
  },
};
