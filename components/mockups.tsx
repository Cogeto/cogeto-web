import {
  BadgeCheck,
  Calculator,
  FileSignature,
  GitCompareArrows,
  Languages,
  ShieldAlert,
} from "lucide-react";

/**
 * product presents them, drawn in code so they stay crisp at any width.
 * All examples come from the content doc; nothing here is a claim, so the
 * frames are decorative and aria-hidden with adjacent text carrying meaning.
 */

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className="select-none">
      <div className="rounded-3xl border border-brand-navy/10 bg-surface p-1.5 shadow-lg shadow-brand-navy/5">
        <div className="rounded-[1.25rem] bg-white p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
}

/** A contradiction finding: both claims, both sources, linked and dated. */
export function FindingMock({
  claims,
  chip = "contradicted, both sides linked",
}: {
  claims: { text: string; source: string }[];
  chip?: string;
}) {
  return (
    <Frame>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
          <GitCompareArrows
            size={14}
            strokeWidth={2}
            className="text-brand-teal-ink"
          />
          Contradiction finding
        </span>
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
          {chip}
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {claims.map((claim) => (
          <li key={claim.text} className="rounded-xl border border-brand-navy/10 p-3.5">
            <p className="text-sm font-medium leading-relaxed text-brand-navy">
              {claim.text}
            </p>
            <p className="mt-1 text-xs text-brand-navy/60">{claim.source}</p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/** A numeric conflict caught by arithmetic before any model is consulted. */
export function NumericMock() {
  return (
    <Frame>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
        <Calculator size={14} strokeWidth={2} className="text-brand-teal-ink" />
        Numeric comparison
      </span>
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/10 p-3.5">
          <div>
            <p className="text-sm font-medium text-brand-navy">3.2 mm</p>
            <p className="text-xs text-brand-navy/60">drawing, revision C</p>
          </div>
          <span className="text-brand-navy/30">against</span>
          <div className="text-right">
            <p className="text-sm font-medium text-brand-navy">3.4 mm</p>
            <p className="text-xs text-brand-navy/60">datasheet</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/10 p-3.5">
          <div>
            <p className="text-sm font-medium text-brand-navy">fifty thousand</p>
            <p className="text-xs text-brand-navy/60">contract text</p>
          </div>
          <span className="text-brand-navy/30">against</span>
          <div className="text-right">
            <p className="text-sm font-medium text-brand-navy">50,000</p>
            <p className="text-xs text-brand-navy/60">annex table</p>
          </div>
        </div>
        <p className="text-xs text-brand-navy/60">
          Compared arithmetically, before any model is consulted.
        </p>
      </div>
    </Frame>
  );
}

/** Cross-language alias resolution: one subject under two names. */
export function AliasMock() {
  return (
    <Frame>
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
        <Languages size={14} strokeWidth={2} className="text-brand-teal-ink" />
        Subject resolution
      </span>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-lg border border-brand-navy/10 px-3 py-1.5 text-sm text-brand-navy">
          Adriatic Foods
        </span>
        <span className="rounded-lg border border-brand-navy/10 px-3 py-1.5 text-sm text-brand-navy">
          Jadranske hrane
        </span>
        <span className="text-brand-navy/30">=</span>
        <span className="rounded-lg bg-brand-navy px-3 py-1.5 text-sm font-medium text-white">
          one subject
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-brand-navy/60">
        Aliases, typos, and cross-language names resolve before comparison, so a
        Croatian document can contradict an English one.
      </p>
    </Frame>
  );
}

/** A cited chat answer with a conflict warning and an honest silence banner. */
export function AnswerMock({
  question,
  answer,
  citation,
  warning,
}: {
  question: string;
  answer: string;
  citation: string;
  warning?: string;
}) {
  return (
    <Frame>
      <div className="space-y-3">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-brand-navy px-4 py-2.5 text-sm leading-relaxed text-white">
          {question}
        </p>
        <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm border border-brand-navy/10 bg-surface px-4 py-3">
          <p className="text-sm font-medium leading-relaxed text-brand-navy">{answer}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-teal-ink">
            <BadgeCheck size={13} strokeWidth={1.75} />
            {citation}
          </p>
          {warning && (
            <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs text-amber-800">
              <ShieldAlert size={13} strokeWidth={1.75} />
              {warning}
            </p>
          )}
        </div>
      </div>
    </Frame>
  );
}

/** The honest-silence banner: the corpus does not cover the question. */
export function SilenceMock() {
  return (
    <Frame>
      <div className="space-y-3">
        <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-brand-navy px-4 py-2.5 text-sm leading-relaxed text-white">
          What is our policy on loaner devices?
        </p>
        <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm border border-brand-navy/10 bg-surface px-4 py-3">
          <p className="w-fit rounded-lg border border-brand-navy/15 bg-brand-navy/5 px-2.5 py-1 text-xs font-semibold text-brand-navy/70">
            Not covered by your documents
          </p>
          <p className="mt-2 text-xs leading-relaxed text-brand-navy/55">
            General knowledge follows, clearly marked as not from your sources.
          </p>
        </div>
      </div>
    </Frame>
  );
}

/** The suppressed fact log: what verification rejected, kept inspectable. */
export function LogMock() {
  return (
    <Frame>
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
        Suppressed fact log
      </span>
      <ul className="mt-3 space-y-2">
        {[
          { reason: "unsupported", note: "excluded from confident answers" },
          { reason: "hedged in source", note: "stored as uncertain" },
          { reason: "unjudgeable", note: "span not found in source" },
        ].map((row) => (
          <li
            key={row.reason}
            className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/10 px-3.5 py-2.5"
          >
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              {row.reason}
            </span>
            <span className="text-xs text-brand-navy/60">{row.note}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-brand-navy/60">
        Every demotion is recorded with its span, reason, and time. Rejections
        are as inspectable as admissions.
      </p>
    </Frame>
  );
}

/** The findings report anatomy: header, one finding, signature line. */
export function ReportMock() {
  return (
    <Frame>
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
          <FileSignature size={14} strokeWidth={2} className="text-brand-teal-ink" />
          Findings report
        </span>
        <span className="rounded-full bg-brand-teal/15 px-2.5 py-0.5 text-xs font-medium text-brand-teal-ink">
          signed
        </span>
      </div>
      <div className="mt-4 space-y-1.5 border-b border-brand-navy/10 pb-3 text-xs text-brand-navy/70">
        <p>Corpus scope: 4 document sets, selected explicitly</p>
        <p>Model configuration, with its measured trust scores</p>
        <p>Date range and detection dates per finding</p>
      </div>
      <div className="mt-3 rounded-xl border border-brand-navy/10 p-3.5">
        <p className="text-xs font-semibold text-brand-navy">
          Finding 1: manual against specification
        </p>
        <p className="mt-1 text-xs leading-relaxed text-brand-navy/60">
          Both claims, both verbatim sentences, both documents with revisions.
        </p>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-brand-navy/60">
        <span>PDF for people · JSON for machines</span>
        <span className="font-mono">ed25519 signature</span>
      </div>
    </Frame>
  );
}

/** The paper cover, rendered as a designed document card. */
export function PaperCoverMock({
  title,
  subtitle,
  author,
  date,
  chip,
}: {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  chip: string;
}) {
  return (
    <div aria-hidden="true" className="select-none">
      <div className="mx-auto max-w-sm rounded-2xl border border-brand-navy/10 bg-white p-8 shadow-xl shadow-brand-navy/10">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-16 rounded-full bg-brand-teal" />
          <span className="rounded-full bg-surface-deep px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-brand-navy/60">
            {chip}
          </span>
        </div>
        <p className="mt-8 text-lg font-semibold leading-snug text-brand-navy">{title}</p>
        <p className="mt-3 text-xs italic leading-relaxed text-brand-navy/60">{subtitle}</p>
        <div className="mt-8 border-t border-brand-navy/10 pt-4">
          <p className="text-sm font-medium text-brand-navy">{author}</p>
          <p className="mt-0.5 text-xs text-brand-navy/60">{date}</p>
        </div>
      </div>
    </div>
  );
}

/** The license, rendered as a card: what AGPLv3 obliges, in one glance. */
export function LicenseMock() {
  return (
    <div aria-hidden="true" className="select-none">
      <div className="rounded-3xl border border-brand-navy/10 bg-surface p-1.5 shadow-lg shadow-brand-navy/5">
        <div className="rounded-[1.25rem] bg-white p-6">
          <p className="text-3xl font-semibold tracking-tight text-brand-navy">AGPL-3.0</p>
          <p className="mt-1 text-sm text-brand-navy/60">GNU Affero General Public License</p>
          <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-brand-navy/80">
            <li className="border-l-2 border-brand-teal/60 pl-3">
              Use it, read it, modify it, run it in production
            </li>
            <li className="border-l-2 border-brand-teal/60 pl-3">
              Run a modified version as a service, publish your changes
            </li>
            <li className="border-l-2 border-brand-teal/60 pl-3">
              Commercial license available as an AGPL exemption
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/** A supersession chain: the old claim closed, the new one active. */
export function ChainMock({
  oldClaim,
  newClaim,
  note,
}: {
  oldClaim: { text: string; source: string };
  newClaim: { text: string; source: string };
  note: string;
}) {
  return (
    <Frame>
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
        Supersession chain
      </span>
      <div className="mt-4 rounded-xl border border-brand-navy/10 p-3.5 opacity-70">
        <p className="text-sm font-medium leading-relaxed text-brand-navy line-through decoration-brand-navy/50">
          {oldClaim.text}
        </p>
        <p className="mt-1 text-xs text-brand-navy/60">{oldClaim.source}</p>
      </div>
      <p className="my-2 text-center text-brand-navy/40" aria-hidden="true">
        superseded by
      </p>
      <div className="rounded-xl border border-brand-teal/50 bg-brand-teal/5 p-3.5">
        <p className="text-sm font-medium leading-relaxed text-brand-navy">
          {newClaim.text}
        </p>
        <p className="mt-1 text-xs text-brand-navy/60">{newClaim.source}</p>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-brand-navy/60">{note}</p>
    </Frame>
  );
}

/** The suppression summary: counts by reason, rejected but inspectable. */
export function SuppressionMock({
  rows,
  note,
}: {
  rows: { reason: string; count: string }[];
  note: string;
}) {
  return (
    <Frame>
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
        Suppression summary
      </span>
      <ul className="mt-3 space-y-2">
        {rows.map((row) => (
          <li
            key={row.reason}
            className="flex items-center justify-between gap-3 rounded-xl border border-brand-navy/10 px-3.5 py-2.5"
          >
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
              {row.reason}
            </span>
            <span className="text-sm font-semibold tabular-nums text-brand-navy">
              {row.count}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-brand-navy/60">{note}</p>
    </Frame>
  );
}

/** The signed report header with study-specific scope lines. */
export function ReportLinesMock({ lines }: { lines: string[] }) {
  return (
    <Frame>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
          Findings report
        </span>
        <span className="rounded-full bg-brand-teal/15 px-2.5 py-0.5 text-xs font-medium text-brand-teal-ink">
          signed
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {lines.map((line) => (
          <li
            key={line}
            className="rounded-xl border border-brand-navy/10 px-3.5 py-2.5 text-xs leading-relaxed text-brand-navy/75"
          >
            {line}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between text-xs text-brand-navy/60">
        <span>PDF for people · JSON for machines</span>
        <span className="font-mono">ed25519 signature</span>
      </div>
    </Frame>
  );
}

/** The morning summary panel: the counts as the ingest reports them. */
export function SummaryMock({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <Frame>
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-navy/60">
        {title}
      </span>
      <dl className="mt-3 grid grid-cols-2 gap-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-xl border border-brand-navy/10 px-3.5 py-2.5"
          >
            <dd className="text-lg font-semibold tabular-nums text-brand-navy">
              {row.value}
            </dd>
            <dt className="mt-0.5 text-[0.65rem] leading-snug text-brand-navy/60">
              {row.label}
            </dt>
          </div>
        ))}
      </dl>
    </Frame>
  );
}
