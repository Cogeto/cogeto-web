import { ExternalLink, GitCommitHorizontal } from "lucide-react";
import type { TrustContent } from "@/content/en/trust";
import {
  commitUrl,
  releaseFileUrl,
  repoLinks,
  type LoadedRelease,
} from "@/lib/trust";

function corpusLine(
  config: LoadedRelease["release"]["configurations"][number],
  t: TrustContent,
): string {
  const languageName = (code: string) =>
    t.languageNames[code] ?? code.toUpperCase();
  const perLang = config.corpus.per_language
    .map((l) => `${l.golden_cases} ${languageName(l.language).toLowerCase()}`)
    .join(", ");
  const parts = [
    `${config.corpus.golden_cases} golden cases${perLang ? ` (${perLang})` : ""}`,
    `${config.corpus.reconcile_pairs} reconciliation pairs`,
  ];
  if (config.corpus.chat_cases !== undefined) {
    parts.push(`${config.corpus.chat_cases} chat cases`);
  }
  return parts.join(" · ");
}

/** Server-rendered provenance for every published release: commit, harness, corpus, and the file link. */
export default function Provenance({
  releases,
  t,
}: {
  releases: LoadedRelease[];
  t: TrustContent;
}) {
  const trust = t;
  return (
    <div>
      <h2 className="text-xl font-semibold text-brand-navy">{trust.provenanceHeading}</h2>
      <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-brand-navy/70">
        {trust.provenanceIntro}
      </p>

      <ul className="mt-6 space-y-4">
        {releases.map((r) => (
          <li
            key={r.version}
            className="rounded-2xl border border-brand-navy/10 bg-white p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-lg font-semibold text-brand-navy">{r.version}</span>
              <span className="text-sm text-brand-navy/70">{r.date}</span>
              {r.release.generated_by.backfilled && (
                <span
                  className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-amber-800"
                  title={trust.backfilledNote}
                >
                  {trust.backfilledLabel}
                </span>
              )}
              <span className="ml-auto flex flex-wrap items-center gap-x-4 gap-y-1">
                <a
                  href={releaseFileUrl(r.path)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-teal-ink hover:underline"
                >
                  {trust.checkFileCta}
                  <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                </a>
                <a
                  href={commitUrl(r.release.generated_by.commit)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-brand-navy/70 hover:text-brand-teal-ink hover:underline"
                >
                  <GitCommitHorizontal size={14} strokeWidth={1.75} aria-hidden="true" />
                  {r.release.generated_by.commit.slice(0, 10)}
                </a>
              </span>
            </div>

            {r.release.generated_by.backfilled && (
              <p className="mt-2 text-sm text-brand-navy/70">{trust.backfilledNote}</p>
            )}

            <dl className="mt-4 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="font-medium text-brand-navy/70">Harness</dt>
                <dd className="mt-0.5 break-words font-mono text-xs leading-relaxed text-brand-navy/70">
                  {r.release.generated_by.harness}
                </dd>
              </div>
              {r.release.configurations.map((config) => (
                <div key={config.id} className="sm:col-span-2">
                  <dt className="font-medium text-brand-navy/70">
                    Configuration{" "}
                    <code className="font-mono text-xs text-brand-navy/80">{config.id}</code>
                    {config.redaction && (
                      <span className="ml-2 rounded bg-brand-teal/10 px-1.5 py-0.5 text-[0.7rem] font-medium text-brand-teal-ink">
                        redacted
                      </span>
                    )}
                  </dt>
                  <dd className="mt-1 space-y-1 text-brand-navy/70">
                    <p>
                      Models: pipeline{" "}
                      <code className="font-mono text-xs text-brand-navy/80">
                        {config.models.pipeline}
                      </code>
                      , answer{" "}
                      <code className="font-mono text-xs text-brand-navy/80">
                        {config.models.answer}
                      </code>
                      , embedding{" "}
                      <code className="font-mono text-xs text-brand-navy/80">
                        {config.models.embedding}
                      </code>
                    </p>
                    <p>Corpus: {corpusLine(config, t)}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {/* The public sources: check the data, do not trust the page. */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <a
          href={repoLinks.goldenCorpus}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-brand-teal-ink hover:underline"
        >
          {trust.goldenCorpusCta}
          <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
        </a>
        <a
          href={repoLinks.schema}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-brand-teal-ink hover:underline"
        >
          {trust.schemaCta}
          <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
        </a>
        <a
          href={repoLinks.trustDir}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-brand-teal-ink hover:underline"
        >
          All published releases
          <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
