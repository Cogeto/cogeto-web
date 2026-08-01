/**
 * German copy for the /docs section. Mirrors content/en/docs.ts: same
 * interfaces, same exported symbols, only string values translated.
 * Commands, URLs, credentials, and config names stay verbatim.
 */

export interface DocStep {
  title: string;
  text: string;
  command?: string;
  /** A "you should now see" callout: the verified first-success moment. */
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
  metaTitle: "Dokumentation",
  metaDescription:
    "Drei Wege, Cogeto zu betreiben: lokaler Quickstart mit einem Befehl, Produktion mit signierten Images und einem Operator-Skript oder vollständig offline.",
  eyebrow: "Doku",
  headline: "Betreiben Sie es so, wie Ihre Umgebung es erlaubt",
  lede:
    "Alles auf dieser Website läuft mit dem Open-Source-Release. Wählen Sie den Weg, der dazu passt, wo Ihre Dokumente liegen dürfen. Die Repository-Dokumentation ist die Autorität für Betreiber; diese Seiten werden für jedes Release gegen sie geprüft.",
  paths: [
    {
      name: "Quickstart, auf Ihrem Rechner",
      forWhom: "Zum Evaluieren: Ein Befehl auf einem frischen Clone führt zu einem nutzbaren Login.",
      time: "Minuten auf jedem aktuellen Rechner",
      bullets: [
        "docker compose up, null Konfiguration",
        "Läuft ohne Modellschlüssel; Modellaufrufe schlagen ehrlich fehl, statt etwas vorzutäuschen",
        "Eine vorbefüllte Demo-Sandbox zum Erkunden",
      ],
      href: "/docs/quickstart",
      ctaLabel: "Quickstart starten",
    },
    {
      name: "Selbst gehostet, in Produktion",
      forWhom: "Für den Betrieb einer echten Instanz auf eigener Infrastruktur.",
      time: "Ein Operator-Skript auf einem frischen Ubuntu-Server",
      bullets: [
        "Pull-only: drei Release-Images, jedes mit cosign signiert",
        "Das Skript prüft Signaturen selbst und endet mit einer Checkliste",
        "Automatisches TLS, sobald Ihre DNS-Einträge auflösen",
      ],
      href: "/docs/self-hosted",
      ctaLabel: "In Produktion installieren",
    },
    {
      name: "Vollständig offline",
      forWhom: "Für geschlossene Netze, aus denen nichts hinausdarf, auch keine Image-Pulls.",
      time: "Air-gapped, keine ausgehende Konnektivität",
      bullets: [
        "Modelle, Embeddings, Seitenerkennung und Suche laufen in der Instanz",
        "Genau eine Austrittsstelle für Modellaufrufe, in der CI erzwungen",
        "Offline-Image-Bundle für Air-Gap-Installationen",
      ],
      href: "/docs/offline",
      ctaLabel: "Offline-Installation planen",
    },
  ] as DocsPathCard[],
  hostedNote:
    "Lieber gar nicht selbst betreiben? Eine gehostete Instanz auf EU-Infrastruktur hat bewusst keine Installationsprozedur: Sie beginnt mit dem Pilotgespräch.",
  hostedCta: { label: "Pilot starten", href: "/get-started" },
  authorityNote:
    "Die Repository-Dokumentation bleibt die Autorität für Betreiber, einschließlich des vollständigen Runbooks für Kundeninstanzen.",
  authorityLinks: [
    {
      label: "docs/ im Repository",
      href: "https://github.com/Cogeto/cogeto/tree/main/docs",
    },
    {
      label: "Lokal ausführen",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/running-locally.md",
    },
    {
      label: "Deployment",
      href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
    },
  ],
};

export const docsQuickstart = {
  metaTitle: "Quickstart",
  metaDescription:
    "Ein Befehl auf einem frischen Clone führt zu einem nutzbaren Login: git clone, docker compose up, https://localhost öffnen. Läuft ohne Modellschlüssel.",
  eyebrow: "Doku · Quickstart",
  headline: "Ein Befehl bis zum nutzbaren Login",
  lede:
    "Der stehende Vertrag des Repositorys: docker compose up auf einem frischen Clone führt ohne jede Konfiguration zu einem nutzbaren Login. Alles Weitere ist Detail rund um diesen einen Befehl.",
  prerequisites: {
    heading: "Bevor Sie starten",
    items: [
      "Docker Engine mit Compose-Plugin. Docker Desktop ist in Ordnung. Der Stack baut beim ersten Start lokal; jeder aktuelle Rechner mit rund 8 GB freiem RAM reicht bequem.",
      "Optional: ein Mistral-API-Schlüssel für Modellfunktionen. Auch ohne läuft der Stack: Login, Erfassung, Dashboard und Queue funktionieren, und Modellaufrufe schlagen mit einem typisierten Fehler fehl, statt etwas vorzutäuschen.",
      "Node 22 und npm nur, wenn Sie entwickeln. Zum Betrieb des Stacks nicht nötig.",
    ],
  },
  steps: [
    {
      title: "Klonen und starten",
      text: "Der erste Start baut die Images und initialisiert die Identität, das dauert ein bis zwei Minuten.",
      command:
        "git clone https://github.com/Cogeto/cogeto.git\ncd cogeto\ndocker compose up",
    },
    {
      title: "Öffnen und anmelden",
      text: "Der Dev-Edge liefert ein selbstsigniertes Zertifikat einer lokalen Zertifizierungsstelle aus, Ihr Browser warnt deshalb einmal. Akzeptieren Sie es.",
      expect:
        "Öffnen Sie https://localhost und melden Sie sich als Dev-Bootstrap-Admin an: admin@cogeto.localhost mit dem Passwort DevPassword1! Sie sehen Ihre eigene Instanz.",
    },
    {
      title: "Modellschlüssel hinzufügen",
      text: "Kopieren Sie .env.example nach .env, setzen Sie Ihren Schlüssel und starten Sie den Stack erneut. Dev-Standardwerte sind nur für localhost sicher; ein Preflight-Container verweigert bekannte Dev-Secrets auf jeder Nicht-localhost-Domain.",
      command: "cp .env.example .env\ndocker compose up -d",
    },
  ] as DocStep[],
  demo: {
    heading: "Die Ana-Sandbox",
    text: "Eine fiktive Beraterin mit Wochen an angesammeltem Wissen, eingespielt über die echte öffentliche API: Widersprüche zum Auflösen, abgelaufene Fakten, eine signierte Löschquittung. Das Zugangspasswort gibt der Seed-Job aus. Führen Sie das Demo-Profil nie auf einer Instanz mit echten Daten aus.",
    command: "COGETO_DEMO_MODE=1 docker compose --profile demo up --build",
    logCommand: "docker compose logs demo-seed",
  },
  troubleshooting: {
    heading: "Wenn etwas nicht stimmt",
    items: [
      {
        q: "Port 80 oder 443 ist schon belegt",
        a: "Ein anderer Webserver läuft. Stoppen Sie ihn oder ändern Sie die veröffentlichten Ports in einem Compose-Override.",
      },
      {
        q: "Chat oder Extraktion liefert einen Model-Gateway-Fehler",
        a: "Es ist kein Modell-API-Schlüssel gesetzt. Das ist ohne Schlüssel das vorgesehene Verhalten, kein Absturz.",
      },
      {
        q: "Ein einmaliger Init-Container zeigt exited (0)",
        a: "Normal. Preflight, Datenbank-Init, Migrationen, Storage-Init und Identity-Init laufen einmal pro Start und beenden sich.",
      },
      {
        q: "Von vorn beginnen",
        a: "docker compose down -v löscht alle Daten, einschließlich Signaturschlüssel der Instanz und Quittungen. Auf einer Dev-Maschine in Ordnung; auf einer echten Instanz nie die Antwort.",
      },
    ],
  },
  warn: "docker compose down -v löscht alles, einschließlich des Signaturschlüssels der Instanz und der Quittungskette. Auf einer echten Instanz ist die Antwort immer die geprobte Wiederherstellung aus dem Backup, nie das Löschen.",
  next: {
    heading: "Wie es weitergeht",
    text: "Wenn die Evaluation Sie überzeugt, ist Produktion ein anderer, sichererer Weg: signierte Images und ein Operator-Skript.",
    links: [
      { label: "Selbst gehostet, in Produktion", href: "/docs/self-hosted" },
      {
        label: "Lokal ausführen, die vollständige Referenz",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/running-locally.md",
        external: true,
      },
    ],
  },
  cta: {
    heading: "Lieber zuerst auf Ihren Dokumenten sehen?",
    sub: "Das Pilotprojekt liest einen echten Dokumentenbestand von Ihnen und endet mit dem signierten Befundbericht.",
    secondary: { label: "Zurück zu allen Wegen", href: "/docs" },
  },
};

export const docsSelfHosted = {
  metaTitle: "Selbst gehostete Installation",
  metaDescription:
    "Cogeto in Produktion ist Pull-only: drei cosign-signierte Images und ein Operator-Skript, das Signaturen selbst prüft und mit einer Checkliste endet.",
  eyebrow: "Doku · Selbst gehostet",
  headline: "Ein Skript, signierte Images, keine Überraschungen",
  lede:
    "Eine Produktionsinstanz baut nie aus dem Quellcode. Sie bezieht pro Release drei vorgebaute Images, jedes von der Release-Pipeline signiert, orchestriert von einem Operator-Skript, das die Signaturen selbst prüft.",
  model: {
    heading: "Das Deployment-Modell",
    items: [
      "Eine Instanz ist ein Kunde. Isolation ist eine Deployment-Grenze; einen Multi-Tenant-Modus gibt es nicht.",
      "Pull-only: das App- und Worker-Image, das Edge-Image mit der gebauten Oberfläche und der nur empfangende Inbound-Mail-Dienst, jedes mit cosign signiert.",
      "Secrets werden pro Instanz generiert und vom Compose-File verlangt; nichts wird eingecheckt.",
      "Alles orchestriert ein Operator-Skript: install, configure, upgrade, status und ein Dry-Run-Modus. Jeder Lauf endet mit einer Checkliste dessen, was es nicht für Sie tun kann: DNS-Einträge, Backup-Einstellungen, Prüfschritte.",
    ],
  },
  prerequisites: {
    heading: "Bevor Sie starten",
    items: [
      "Eine frische Ubuntu-22.04- oder 24.04-Instanz.",
      "Eine Domain unter Ihrer Kontrolle; TLS kommt automatisch über Let's Encrypt, sobald die ausgegebenen DNS-Einträge auflösen.",
      "Ein Modell-API-Schlüssel, außer die Instanz soll ausschließlich lokale Modelle nutzen.",
    ],
  },
  steps: [
    {
      title: "Operator-Skript laden",
      text: "Das Skript installiert sein eigenes Werkzeug, einschließlich cosign für die Signaturprüfung.",
      command:
        "curl -fsSL https://raw.githubusercontent.com/Cogeto/cogeto/main/scripts/operator/cogeto -o cogeto\nchmod +x cogeto",
    },
    {
      title: "Erst der Dry Run",
      text: "Der Check-Modus validiert die Umgebung und zeigt, was install tun würde, ohne etwas zu ändern.",
      command: "sudo ./cogeto install --check --domain <your.domain> --acme-email <you>",
    },
    {
      title: "Installieren",
      text: "Das Skript zieht die Release-Images, prüft ihre Signaturen, generiert Secrets und startet die Instanz.",
      command:
        "sudo ./cogeto install --domain <your.domain> --acme-email <you> --mistral-key <key>",
      expect:
        "Der Lauf endet mit einer instanzspezifischen Checkliste: die anzulegenden DNS-Einträge, zu bestätigende Backup-Einstellungen und die Prüfschritte. TLS aktiviert sich, sobald die DNS-Einträge auflösen.",
    },
    {
      title: "Ein Release-Image jederzeit selbst prüfen",
      text: "Signiert wird schlüssellos über das öffentliche Transparenz-Log, die Prüfung braucht also keinen Schlüssel von uns. Jedes GitHub-Release trägt zudem die Software-Stückliste des Images und den exakten Prüfbefehl.",
      command:
        "cosign verify cogeto/cogeto:<version> \\\n  --certificate-identity-regexp '^https://github.com/Cogeto/cogeto/\\.github/workflows/release\\.yml@refs/tags/' \\\n  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com'",
    },
  ] as DocStep[],
  upgrades: {
    heading: "Upgrades und Rollback",
    text: "Laden Sie zuerst das Skript neu: Die installierte Kopie kann sich nicht selbst aktualisieren, und nur das neue Skript ergänzt Zugangsdaten, die ein neueres Compose verlangt. Das Skript verweigert unveröffentlichte Tags, führt Migrationen erneut aus, prüft die Gesundheit der Instanz und erkennt, wenn ein Release das Embedding-Modell geändert hat, samt Angebot der Neuindizierung. Rollback setzt Images zurück; Migrationen laufen nur vorwärts, und die vollständige Datenrücksetzung ist die geprobte Backup-Wiederherstellung aus dem Runbook.",
    command:
      "curl -fsSL https://raw.githubusercontent.com/Cogeto/cogeto/main/scripts/operator/cogeto -o cogeto\nchmod +x cogeto\nsudo ./cogeto upgrade",
  },
  notThis: {
    heading: "Was Deployment bewusst nicht ist",
    text: "Kein Terraform, keine Cloud-API-Automatisierung, kein Self-Service-Provisioning, keine automatischen Updates: ein gutes Skript, von einem Menschen ausgeführt, für eine Kohorte, in der jede Instanz zählt. Backups nutzen die Bordmittel des Hosting-Anbieters, und die Wiederherstellung wird geprobt, nicht angenommen. Das Operator-Runbook deckt Provisionierung, DNS, Onboarding, Backups mit geprobter Wiederherstellung, Upgrades und Fehlersuche ab, Checkliste für Checkliste.",
    links: [
      {
        label: "Das Operator-Runbook",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/operator-runbook.md",
        external: true,
      },
      {
        label: "Deployment-Referenz",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/deployment.md",
        external: true,
      },
    ],
  },
  cta: {
    heading: "Lieber betreiben lassen?",
    sub: "Eine gehostete Instanz auf EU-Infrastruktur beginnt mit dem Pilotgespräch, nicht mit einem Anmeldeformular.",
    secondary: { label: "Vollständig offline installieren", href: "/docs/offline" },
  },
};

export const docsOffline = {
  metaTitle: "Vollständig offline installieren",
  metaDescription:
    "Cogeto läuft im geschlossenen Netz ohne ausgehende Konnektivität: lokale Modelle, Seitenerkennung auf CPU, selbst gehostete Suche, keine Telemetrie.",
  eyebrow: "Doku · Offline",
  headline: "Offline, das verifizierbar ist, nicht behauptet",
  lede:
    "Cogeto läuft vollständig innerhalb eines Kundennetzes ohne jede ausgehende Konnektivität. Das ist ein unterstützter, vollwertiger Betriebsmodus, kein reduzierter, und die Architektur macht ihn prüfbar.",
  what: {
    heading: "Was innerhalb der Grenze läuft",
    items: [
      "Sprachmodelle und Embeddings laufen in einer lokalen Laufzeitumgebung auf Ihrer Hardware; ein Vision-Modell in derselben Laufzeitumgebung liest Scans, an denen Zeichenerkennung scheitert.",
      "Die Seitenerkennung läuft auf CPU in der Instanz, mit Sprachpaketen für Englisch und Kroatisch.",
      "Die websuchartige Suche für den Recherchepfad ist in der Instanz selbst gehostet.",
      "Storage, Identität und Queue sind derselbe Stack wie in jedem anderen Deployment. Es gibt keine Telemetrie.",
    ],
  },
  seam: {
    heading: "Warum Sie es verifizieren können",
    text: "Jeder Modellaufruf läuft durch genau eine Austrittsstelle, in der CI erzwungen: Es gibt exakt eine Stelle im Code, an der ein Aufruf die Instanz verlassen könnte, und in der Offline-Konfiguration zeigt sie auf die lokale Laufzeitumgebung. Der Code ist Open Source, Ihr Sicherheitsteam kann das also bestätigen, statt es glauben zu müssen.",
    links: [
      {
        label: "Die Architektur, Abschnitt zum Offline-Betrieb",
        href: "https://github.com/Cogeto/cogeto/blob/main/docs/cogeto-technical-architecture.md",
        external: true,
      },
      { label: "Sicherheit und Souveränität", href: "/security" },
    ],
  },
  bundle: {
    heading: "Air-Gap-Installationen",
    text: "Für Umgebungen, in denen selbst Image-Pulls nicht möglich sind, wird die Instanz als Offline-Image-Bundle ausgeliefert, die Installation erfolgt also von Datenträgern, die Sie über die Grenze tragen. Offline-Deployments werden gemeinsam im Pilotgespräch geplant: Dimensionierung der lokalen Modell-Laufzeitumgebung, Übergabe des Bundles und die Update-Prozedur für Ihre Umgebung.",
  },
  quality: {
    heading: "Kennen Sie die gemessene Qualität vor der Entscheidung",
    text: "Lokale und gehostete Modellkonfigurationen werden getrennt gemessen, und die Werte jeder Konfiguration werden je Release veröffentlicht. Die Administrationsseite zeigt die gemessene Qualität der Konfiguration, die Sie betreiben, und markiert ungetestete Kombinationen.",
    links: [{ label: "Die veröffentlichten Genauigkeitswerte", href: "/trust" }],
  },
  cta: {
    heading: "Planen Sie die Offline-Installation mit uns.",
    sub: "Air Gaps sind hier ein normales Gespräch. Das Pilotprojekt kann vollständig in Ihrem Netz laufen.",
    secondary: { label: "Selbst gehostet, in Produktion", href: "/docs/self-hosted" },
  },
};

/** Small interface chrome shared by the docs pages. */
export const docsUi = {
  copyLabel: "Befehl kopieren",
  copiedLabel: "Kopiert",
};
