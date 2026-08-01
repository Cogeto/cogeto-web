/**
 * against the product repo: docs/running-locally.md for the quickstart,
 * docs/deployment.md for production self hosting, and
 * docs/cogeto-technical-architecture.md section 10 for offline operation.
 * Instructions are re-verified against each release; current line v1.4.0.
 * quickstarts end at a verified first success, air gap is a first class
 * path, troubleshooting is enumerated centrally.
 */

export interface DocStep {
  title: string;
  text: string;
  command?: string;
  /** A "tu devrais voir maintenant" callout: the verified first-success moment. */
  expect?: string;
}

export interface DocsPathCard {
  name: string;
  forWhom: string;
  time: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
}

export const docsIndex = {
  metaTitle: "Documentation",
  metaDescription: "Exécutez Cogeto localement, auto-hébergé ou entièrement hors ligne.",
  eyebrow: "Docs",
  headline: "Exécutez-le de la manière que votre environnement le permet",
  lede:
    "Tout sur ce site fonctionne à partir de la version open source. Choisissez le chemin qui correspond à l'endroit où vos documents sont autorisés à résider. La documentation du référentiel relève de l'autorité de l'opérateur ; ces pages sont vérifiées par rapport à chaque version.",
  paths: [
    {
      name: "Démarrage rapide, sur votre machine",
      forWhom: "Pour l'évaluation : une commande sur un nouveau clone atteint une connexion utilisable.",
      time: "Minutes sur n'importe quelle machine récente",
      bullets: [
        "docker compose, zéro configuration",
        "Fonctionne sans clé de modèle ; les appels de modèles échouent honnêtement au lieu de faire semblant",
        "Un bac à sable de démonstration prédéfini à explorer",
      ],
      href: "/docs/quickstart",
      ctaLabel: "Lancer le démarrage rapide",
    },
    {
      name: "Auto-hébergé, en production",
      forWhom: "Pour exécuter une instance réelle sur votre propre infrastructure.",
      time: "Un script d'opérateur sur un nouveau serveur Ubuntu",
      bullets: [
        "Téléchargement uniquement : trois images de version, chacune signée avec cosign",
        "Le script vérifie lui-même les signatures et se termine par une liste de contrôle",
        "TLS automatique une fois vos enregistrements DNS résolus",
      ],
      href: "/docs/self-hosted",
      ctaLabel: "Installer en production",
    },
    {
      name: "Entièrement hors ligne",
      forWhom: "Pour les réseaux fermés où rien ne peut sortir, y compris les images.",
      time: "Réseau isolé, aucune connectivité sortante",
      bullets: [
        "Modèles, intégrations, reconnaissance de page et recherche exécutées dans l'instance",
        "Un seul point de sortie des modèles, contrôlé en intégration continue",
        "Lot d'images hors ligne pour les installations isolées",
      ],
      href: "/docs/offline",
      ctaLabel: "Planifier une installation hors ligne",
    },
  ] as DocsPathCard[],
  hostedNote:
    "Vous préférez ne pas l'exploiter vous-même ? Une instance hébergée sur une infrastructure de l'UE ne nécessite aucune installation de votre côté : elle commence par le pilote.",
  hostedCta: { label: "Lancer un pilote", href: "/get-started" },
  authorityNote:
    "La documentation du référentiel reste la responsabilité de l'opérateur, y compris le runbook complet pour les instances client.",
  authorityLinks: [
    {
      label: "docs/ dans le dépôt",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs",
    },
    {
      label: "Exécution locale",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/running-locally.md",
    },
    {
      label: "Déploiement",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
    },
  ],
};

export const docsQuickstart = {
  metaTitle: "Démarrage rapide",
  metaDescription: "Démarrage local de Cogeto avec une commande et une connexion vérifiée.",
  eyebrow: "Documents · Démarrage rapide",
  headline: "Une commande pour une connexion utilisable",
  lede:
    "Le contrat permanent du référentiel : docker compose sur un nouveau clone atteint une connexion utilisable sans configuration. Tout ce qui suit est détaillé autour de cette commande.",
  prerequisites: {
    heading: "Avant de commencer",
    items: [
      "Docker Engine avec le plug-in Compose. Docker Desktop convient également. La pile est construite localement au premier lancement ; prévoyez environ 8 Go de RAM disponible.",
      "Facultatif : une clé API Mistral pour les fonctions de modèle. Sans clé, la connexion, l'ingestion, le tableau de bord et la file d'attente restent opérationnels ; les appels au modèle renvoient une erreur typée explicite.",
      "Node.js 22 et npm sont nécessaires uniquement pour le développement, pas pour exécuter la pile.",
    ],
  },
  steps: [
    {
      title: "Cloner et démarrer",
      text: "La première exécution crée les images et initialise l'identité, ce qui prend une minute ou deux.",
      command:
        "git clone https://github.com/Cogeto/cogeto.git\ncd cogeto\ndocker compose up",
    },
    {
      title: "Ouvrez-le et connectez-vous",
      text: "Le dev edge sert un certificat auto-signé par une autorité de certification locale, de sorte que votre navigateur vous avertira une fois. Acceptez-le.",
      expect:
        "Ouvrez https://localhost et connectez-vous comme administrateur d'amorçage de développement : admin@cogeto.localhost, avec le mot de passe DevPassword1! Vous consultez votre propre instance.",
    },
    {
      title: "Ajouter une clé de modèle",
      text: "Copiez .env.example dans .env, définissez votre clé et relancez la pile. Les valeurs par défaut du développement sont sécurisées pour localhost uniquement ; un conteneur de contrôle en amont refuse les secrets de développement connus sur tout domaine non localhost.",
      command: "cp .env.example .env\ndocker compose up -d",
    },
  ] as DocStep[],
  demo: {
    heading: "Le bac à sable Ana",
    text: "Un consultant fictif avec des semaines de mémoire accumulée, semé via la véritable API publique : contradictions à résoudre, faits périmés, reçu de suppression signé. Le mot de passe d'accès est imprimé par la tâche d'amorçage. N'exécutez jamais le profil de démonstration sur une instance contenant des données réelles.",
    command: "COGETO_DEMO_MODE=1 docker compose --profile demo up --build",
    logCommand: "docker compose logs demo-seed",
  },
  troubleshooting: {
    heading: "Si quelque chose ne va pas",
    items: [
      {
        q: "Le port 80 ou 443 est déjà pris",
        a: "Un autre serveur web utilise déjà ce port. Arrêtez-le ou remplacez les ports publiés dans une surcharge Compose.",
      },
      {
        q: "Le chat ou l'extraction renvoie une erreur de passerelle de modèle",
        a: "Aucune clé API de modèle n'est définie. C'est le comportement conçu sans clé, pas un crash.",
      },
      {
        q: "Un conteneur d'initialisation unique indique qu'il est sorti (0)",
        a: "C'est normal. Le contrôle préalable, l'initialisation de la base de données, les migrations, le stockage et l'identité s'exécutent une fois au démarrage, puis se terminent.",
      },
      {
        q: "Recommencer",
        a: "docker compose down -v supprime toutes les données, y compris la clé de signature de l'instance et les reçus. Très bien sur une boîte de développement ; jamais la réponse sur une instance réelle.",
      },
    ],
  },
  warn: "docker compose down -v supprime tout, y compris la clé de signature d'instance et la chaîne de reçus. Dans un cas réel, la réponse est toujours une restauration de sauvegarde répétée, jamais un effacement.",
  next: {
    heading: "Où aller à partir d'ici",
    text: "Lorsque l'évaluation vous convainc, la production est une voie différente et plus sûre : des images signées et un script d'opérateur.",
    links: [
      { label: "Auto-hébergé, en production", href: "/docs/self-hosted" },
      {
        label: "Exécuté localement, la référence complète",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/running-locally.md",
        external: true,
      },
    ],
  },
  cta: {
    heading: "Vous préférez le voir d’abord sur vos documents ?",
    sub: "Le pilote lit un véritable ensemble de documents et se termine par le rapport de constats signé.",
    secondary: { label: "Retour à tous les chemins", href: "/docs" },
  },
};

export const docsSelfHosted = {
  metaTitle: "Installation auto-hébergée",
  metaDescription: "Déployez Cogeto avec des images signées et un script opérateur.",
  eyebrow: "Documents · Auto-hébergé",
  headline: "Un script, des images signées, pas de surprises",
  lede:
    "Une instance de production ne se construit jamais à partir des sources. Il extrait trois images prédéfinies par version, chacune signée par le pipeline de versions, orchestrée par un script d'opérateur qui vérifie lui-même les signatures.",
  model: {
    heading: "Le modèle de déploiement",
    items: [
      "Une instance est un client. L'isolement est une limite de déploiement ; il n'y a pas de mode multilocataire.",
      "Téléchargement uniquement : l'image de l'application et du worker, l'image edge avec l'interface intégrée et le service de réception des e-mails, chacune signée avec cosign.",
      "Les secrets sont générés par instance et requis par le fichier de composition ; rien n'est engagé.",
      "Tout est orchestré par un seul script opérateur : installation, configuration, mise à niveau, état et mode d'exécution à sec. Il termine chaque exécution avec une liste de contrôle de ce qu'il ne peut pas faire pour vous : enregistrements DNS, paramètres de sauvegarde, étapes de vérification.",
    ],
  },
  prerequisites: {
    heading: "Avant de commencer",
    items: [
      "Une nouvelle instance Ubuntu 22.04 ou 24.04.",
      "Un domaine que vous contrôlez ; TLS est automatique via Let's Encrypt dès que les enregistrements DNS imprimés sont résolus.",
      "Une clé API de modèle, sauf si l'instance exécutera uniquement des modèles locaux.",
    ],
  },
  steps: [
    {
      title: "Récupérer le script de l'opérateur",
      text: "Le script installe ses propres outils, notamment cosign pour la vérification de la signature.",
      command:
        "curl -fsSL https://raw.githubusercontent.com/Cogeto/cogeto/main/scripts/operator/cogeto -o cogeto\nchmod +x cogeto",
    },
    {
      title: "Essai à sec d'abord",
      text: "Le mode de vérification valide l'environnement et imprime ce que l'installation ferait, sans rien changer.",
      command: "sudo ./cogeto install --check --domain <votre.domaine> --acme-email <vous>",
    },
    {
      title: "Installer",
      text: "Le script extrait les images de version, vérifie leurs signatures, génère des secrets et affiche l'instance.",
      command:
        "sudo ./cogeto install --domain <votre.domaine> --acme-email <vous> --mistral-key <key>",
      expect:
        "L'exécution se termine par une liste de contrôle spécifique à l'instance : les enregistrements DNS à créer, les paramètres de sauvegarde à confirmer et les étapes de vérification. TLS s'active dès que les enregistrements DNS sont résolus.",
    },
    {
      title: "Vérifiez vous-même une image de version, à tout moment",
      text: "La signature se fait sans clé via le journal de transparence public, la vérification ne nécessite donc aucune clé de notre part. Chaque version de GitHub contient également la nomenclature logicielle de l'image et la commande de vérification exacte.",
      command:
        "cosign verify cogeto/cogeto:<version> \\\n  --certificate-identity-regexp '^https://github.com/Cogeto/cogeto/\\.github/workflows/release\\.yml@refs/tags/' \\\n  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com'",
    },
  ] as DocStep[],
  upgrades: {
    heading: "Mises à niveau et restauration",
    text: "Téléchargez d'abord de nouveau le script : la copie installée ne peut pas se mettre à jour elle-même, et seul le nouveau script renseigne les identifiants requis par une composition plus récente. Le script refuse les balises non publiées, relance les migrations, vérifie l'état de l'instance et propose une réindexation lorsque le modèle d'embedding a changé. Un retour de version restaure les images ; les migrations restent irréversibles et la restauration complète des données suit la procédure de sauvegarde testée du runbook.",
    command:
      "curl -fsSL https://raw.githubusercontent.com/Cogeto/cogeto/main/scripts/operator/cogeto -o cogeto\nchmod +x cogeto\nsudo ./cogeto upgrade",
  },
  notThis: {
    heading: "Ce que le déploiement n'est pas, délibérément",
    text: "Pas de Terraform, pas d'automatisation des API cloud, pas de provisionnement en libre-service, pas de mises à jour automatiques : un bon script exécuté par un humain, pour une cohorte où chaque instance compte. Les sauvegardes utilisent les propres capacités du fournisseur d'hébergement et la restauration est répétée et non supposée. Le runbook de l'opérateur couvre le provisionnement, le DNS, l'intégration, les sauvegardes avec une restauration répétée, les mises à niveau et le dépannage, liste de contrôle par liste de contrôle.",
    links: [
      {
        label: "Le runbook de l'opérateur",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/operator-runbook.md",
        external: true,
      },
      {
        label: "Référence de déploiement",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
        external: true,
      },
    ],
  },
  cta: {
    heading: "Voulez-vous qu'il soit opéré pour vous à la place ?",
    sub: "Une instance hébergée sur l'infrastructure de l'UE commence par la conversation pilote, et non par un formulaire d'inscription.",
    secondary: { label: "Installation entièrement hors ligne", href: "/docs/offline" },
  },
};

export const docsOffline = {
  metaTitle: "Installation entièrement hors ligne",
  metaDescription: "Exécutez Cogeto hors ligne avec modèles et recherche locaux.",
  eyebrow: "Documents · Hors ligne",
  headline: "Hors ligne, vérifiable, non affirmé",
  lede:
    "Cogeto fonctionne entièrement au sein d'un réseau client, sans aucune connectivité sortante. Il s'agit d'un déploiement de première classe pris en charge, et non d'un mode dégradé, et l'architecture le rend vérifiable.",
  what: {
    heading: "Ce qui passe à l'intérieur de la limite",
    items: [
      "Les modèles de langage et les embeddings s'exécutent dans un environnement local sur votre infrastructure ; un modèle de vision local traite les numérisations que la reconnaissance optique de caractères ne peut pas lire.",
      "La reconnaissance de page s'exécute sur le processeur à l'intérieur de l'instance, avec des packs de langues anglais et croate.",
      "La recherche de style Web pour le chemin de recherche est auto-hébergée dans l'instance.",
      "Le stockage, l'identité et la file d'attente constituent la même pile que tout autre déploiement. Il n'y a pas de télémétrie.",
    ],
  },
  seam: {
    heading: "Pourquoi vous pouvez le vérifier",
    text: "Chaque appel de modèle passe par un point de sortie unique, contrôlé en intégration continue : un seul emplacement du code permet à un appel de quitter l'instance. En configuration hors ligne, ce point cible l'environnement local. Le code étant open source, votre équipe de sécurité peut le vérifier directement.",
    links: [
      {
        label: "L'architecture, rubrique sur le fonctionnement hors ligne",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/cogeto-technical-architecture.md",
        external: true,
      },
      { label: "Sécurité et souveraineté", href: "/security" },
    ],
  },
  bundle: {
    heading: "Installations en réseau isolé",
    text: "Pour les environnements dans lesquels même les extractions d'images ne sont pas disponibles, l'instance est livrée sous forme d'ensemble d'images hors ligne, de sorte que l'installation s'effectue à partir du support que vous transportez au-delà des limites. Les déploiements hors ligne sont planifiés ensemble dans la conversation pilote : dimensionnement pour l'exécution du modèle local, transfert du bundle et procédure de mise à jour de votre environnement.",
  },
  quality: {
    heading: "Connaître la qualité mesurée avant de vous engager",
    text: "Les configurations de modèles locaux et hébergés sont mesurées séparément et les scores de chaque configuration sont publiés par version. La page d'administration affiche la qualité mesurée de la configuration que vous exécutez et signale les combinaisons non testées.",
    links: [{ label: "Les scores de précision publiés", href: "/trust" }],
  },
  cta: {
    heading: "Planifiez l'installation hors ligne avec nous.",
    sub: "Les réseaux isolés font partie des déploiements habituels. Le pilote peut s'exécuter entièrement dans votre réseau.",
    secondary: { label: "Auto-hébergé, en production", href: "/docs/self-hosted" },
  },
};

/** Small interface chrome shared by the docs pages. */
export const docsUi = {
  copyLabel: "Copier la commande",
  copiedLabel: "Copié",
};
