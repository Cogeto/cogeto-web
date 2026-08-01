"use client";

import { useId, useMemo, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { TrustContent } from "@/content/en/trust";
import {
  METRIC_KEYS,
  configurationIds,
  formatPct,
  gateFloor,
  languageOptions,
  metricPresent,
  metricValue,
  releaseFileUrl,
  type Configuration,
  type Gates,
  type LoadedRelease,
  type MetricKey,
} from "@/lib/trust";

type Props = {
  releases: LoadedRelease[];
  gates: Gates | null;
  t: TrustContent;
};

/** Accessible segmented control built on native radios (arrow-key nav, real labels). */
function SegmentedControl({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="text-xs font-semibold uppercase tracking-widest text-brand-navy/70">
        {legend}
      </legend>
      <div className="mt-2 inline-flex flex-wrap gap-1 rounded-2xl border border-brand-navy/10 bg-surface p-1">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="cursor-pointer rounded-xl px-4 py-2 text-sm font-medium text-brand-navy/70 transition-colors has-[:checked]:bg-white has-[:checked]:text-brand-navy has-[:checked]:shadow-sm hover:text-brand-navy has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-teal-ink"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** One row of the current-scores table, with an expandable plain-language explainer. */
function MetricRow({
  metricKey,
  value,
  gate,
  detail,
  t,
}: {
  metricKey: MetricKey;
  value: number | null;
  gate: number | undefined;
  /** Extra context printed after the value, e.g. the supersedes denominator. */
  detail?: string;
  t: TrustContent;
}) {
  const [open, setOpen] = useState(false);
  const meta = t.metrics[metricKey];
  const panelId = useId();
  const passes = value !== null && gate !== undefined ? value >= gate : null;

  return (
    <>
      <tr className="border-t border-brand-navy/10">
        <th scope="row" className="py-3 pr-4 text-left align-top font-normal">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="group inline-flex items-center gap-1.5 text-left font-medium text-brand-navy hover:text-brand-teal-ink"
          >
            {meta.label}
            <ChevronDown
              size={15}
              strokeWidth={2}
              aria-hidden="true"
              className={`text-brand-navy/40 transition-transform group-hover:text-brand-teal-ink ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </th>
        <td className="py-3 pl-4 text-right align-top tabular-nums">
          <span className="text-lg font-semibold text-brand-navy">
            {value === null ? (
              <span className="text-base font-normal text-brand-navy/70">
                {t.notAvailable}
              </span>
            ) : (
              formatPct(value)
            )}
          </span>
          {detail && value !== null && (
            <span className="ml-1.5 text-xs text-brand-navy/60">{detail}</span>
          )}
        </td>
        <td className="hidden py-3 pl-4 text-right align-top text-sm tabular-nums text-brand-navy/70 sm:table-cell">
          {gate === undefined ? (
            <span aria-hidden="true">·</span>
          ) : (
            <>
              <span className="sr-only">{t.gateLabel} </span>≥ {formatPct(gate)}
              {passes !== null && (
                <span
                  className={`ml-2 inline-block h-2 w-2 rounded-full ${
                    passes ? "bg-brand-teal" : "bg-amber-500"
                  }`}
                  aria-hidden="true"
                />
              )}
              {passes !== null && (
                <span className="sr-only">
                  {passes ? " (clears the gate)" : " (below the gate)"}
                </span>
              )}
            </>
          )}
        </td>
      </tr>
      {open && (
        <tr>
          <td colSpan={3} className="pb-4">
            <p
              id={panelId}
              className="max-w-2xl text-pretty text-sm leading-relaxed text-brand-navy/70"
            >
              {meta.explainer}
            </p>
          </td>
        </tr>
      )}
    </>
  );
}

// --- Trend chart geometry ---------------------------------------------------

const VB_W = 320;
const VB_H = 150;
const PAD_L = 8;
const PAD_R = 12;
const PAD_T = 16;
const PAD_B = 24;
const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;

function xAt(i: number, n: number): number {
  if (n <= 1) return PAD_L + PLOT_W / 2;
  return PAD_L + (i / (n - 1)) * PLOT_W;
}
function yAt(v: number): number {
  return PAD_T + (1 - v) * PLOT_H;
}

function shortVersion(v: string): string {
  return v.replace(/^v/, "");
}

/** A single 0..1 metric chart across releases. Decorative: the data table below is the source of truth for assistive tech. */
function MetricChart({
  label,
  gateLabel,
  points,
  gate,
}: {
  label: string;
  gateLabel: string;
  points: { version: string; value: number | null; backfilled: boolean }[];
  gate: number | undefined;
}) {
  const n = points.length;
  const drawn = points
    .map((p, i) => ({ ...p, i }))
    .filter((p): p is typeof p & { value: number } => p.value !== null);

  const linePath = drawn
    .map((p, k) => `${k === 0 ? "M" : "L"} ${xAt(p.i, n).toFixed(1)} ${yAt(p.value).toFixed(1)}`)
    .join(" ");

  const latest = drawn.length ? drawn[drawn.length - 1] : null;

  return (
    <figure className="rounded-2xl border border-brand-navy/10 bg-white p-4">
      <figcaption className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-semibold text-brand-navy">{label}</span>
        {latest && (
          <span className="text-sm font-semibold tabular-nums text-brand-teal-ink">
            {formatPct(latest.value)}
          </span>
        )}
      </figcaption>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="mt-2 h-auto w-full"
        aria-hidden="true"
        role="presentation"
      >
        {/* Horizontal guide lines at 0, 25, 50, 75, 100 percent. */}
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <line
            key={g}
            x1={PAD_L}
            x2={PAD_L + PLOT_W}
            y1={yAt(g)}
            y2={yAt(g)}
            stroke="currentColor"
            className="text-brand-navy/10"
            strokeWidth={g === 0 ? 1 : 0.5}
          />
        ))}
        {/* 0 and 100 percent labels: honest full-range axis. */}
        <text x={PAD_L} y={yAt(1) - 3} className="fill-brand-navy/55" fontSize={7}>
          100%
        </text>
        <text x={PAD_L} y={yAt(0) + 8} className="fill-brand-navy/55" fontSize={7}>
          0%
        </text>

        {/* CI gate target line. */}
        {gate !== undefined && (
          <>
            <line
              x1={PAD_L}
              x2={PAD_L + PLOT_W}
              y1={yAt(gate)}
              y2={yAt(gate)}
              stroke="currentColor"
              className="text-brand-navy/35"
              strokeWidth={1}
              strokeDasharray="4 3"
            />
            <text
              x={PAD_L + PLOT_W}
              y={yAt(gate) - 3}
              textAnchor="end"
              className="fill-brand-navy/60"
              fontSize={7}
            >
              {gateLabel} {formatPct(gate)}
            </text>
          </>
        )}

        {/* Trend line. */}
        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            className="text-brand-teal-ink"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Points: hollow when the release was backfilled. */}
        {drawn.map((p) => (
          <circle
            key={p.version}
            cx={xAt(p.i, n)}
            cy={yAt(p.value)}
            r={3}
            className={p.backfilled ? "fill-white text-brand-teal-ink" : "fill-brand-teal-ink"}
            stroke="currentColor"
            strokeWidth={p.backfilled ? 1.5 : 0}
          />
        ))}

        {/* X-axis release labels. */}
        {points.map((p, i) => (
          <text
            key={p.version}
            x={xAt(i, n)}
            y={VB_H - 8}
            textAnchor="middle"
            className="fill-brand-navy/70"
            fontSize={7.5}
          >
            {shortVersion(p.version)}
          </text>
        ))}
      </svg>
    </figure>
  );
}

/** The supersedes denominator for the current selection, if published. */
function supersedesPairs(config: Configuration, language: string): number | null {
  if (language === "aggregate") {
    return config.metrics.aggregate.supersedes_pairs ?? null;
  }
  const row = config.metrics.per_language.find((l) => l.language === language);
  return row?.supersedes_pairs ?? null;
}

export default function TrustExplorer({ releases, gates, t }: Props) {
  const configIds = useMemo(() => configurationIds(releases), [releases]);
  const [configId, setConfigId] = useState(configIds[0]);
  const [language, setLanguage] = useState("aggregate");

  const languageName = (code: string): string =>
    t.languageNames[code] ?? code.toUpperCase();

  const langOpts = useMemo(
    () => languageOptions(releases, configId),
    [releases, configId],
  );

  // Metrics that exist anywhere in the loaded data for this configuration.
  // Schema 1.0 files carry five; 1.1 fields appear here automatically the
  // release they are first published.
  const visibleKeys = useMemo(
    () => METRIC_KEYS.filter((key) => metricPresent(releases, configId, key)),
    [releases, configId],
  );

  // Newest release first in `releases`; oldest-first for the trend x-axis.
  const current = releases[0];
  const currentConfig = current.release.configurations.find((c) => c.id === configId);
  const oldestFirst = useMemo(() => [...releases].reverse(), [releases]);

  const configOptions = configIds.map((id) => ({ value: id, label: id }));
  const languageChoices = langOpts.map((code) => ({
    value: code,
    label: languageName(code),
  }));

  // Per-metric series across releases, for the selected config + language.
  const series = useMemo(
    () =>
      visibleKeys.map((key) => ({
        key,
        points: oldestFirst.map((r) => {
          const config = r.release.configurations.find((c) => c.id === configId);
          return {
            version: r.version,
            value: config ? metricValue(config, language, key) : null,
            backfilled: r.release.generated_by.backfilled,
          };
        }),
      })),
    [visibleKeys, oldestFirst, configId, language],
  );

  return (
    <div>
      {/* Selectors */}
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-end sm:gap-10">
        <SegmentedControl
          legend={t.configLabel}
          name="trust-config"
          options={configOptions}
          value={configId}
          onChange={setConfigId}
        />
        <SegmentedControl
          legend={t.languageLabel}
          name="trust-language"
          options={languageChoices}
          value={language}
          onChange={setLanguage}
        />
      </div>

      {language === "aggregate" && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
          {t.aggregateNote}
        </p>
      )}
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
        {t.gatesNote}
      </p>

      {/* Current scores */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-brand-navy">{t.currentHeading}</h2>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-brand-navy/70">
          {t.currentIntro}
        </p>

        {currentConfig ? (
          <>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[22rem] border-collapse text-left">
                <caption className="sr-only">
                  Current scores for configuration {configId}, {languageName(language)}, release{" "}
                  {current.version}
                </caption>
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-widest text-brand-navy/70">
                    <th scope="col" className="pb-2 pr-4 font-semibold">
                      Metric
                    </th>
                    <th scope="col" className="pb-2 pl-4 text-right font-semibold">
                      {languageName(language)}
                    </th>
                    <th
                      scope="col"
                      className="hidden pb-2 pl-4 text-right font-semibold sm:table-cell"
                    >
                      {t.gateLabel}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleKeys.map((key) => {
                    const pairs =
                      key === "supersedes_accuracy"
                        ? supersedesPairs(currentConfig, language)
                        : null;
                    return (
                      <MetricRow
                        key={key}
                        metricKey={key}
                        value={metricValue(currentConfig, language, key)}
                        gate={gateFloor(gates, language, key)}
                        detail={pairs !== null ? `${pairs} ${t.pairsLabel}` : undefined}
                        t={t}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Chat suite summary (per configuration). */}
            {currentConfig.metrics.chat && (
              <div className="mt-8 rounded-2xl border border-brand-navy/10 bg-surface p-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-navy/70">
                  {t.chatHeading}
                </h3>
                <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-2xl font-semibold tabular-nums text-brand-navy">
                    {currentConfig.metrics.chat.passed}/{currentConfig.metrics.chat.cases}
                  </span>
                  <span className="text-sm text-brand-navy/70">cases pass</span>
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
                  {t.chatIntro}
                </p>
                {currentConfig.metrics.chat.failed.length > 0 && (
                  <p className="mt-3 text-sm text-brand-navy/70">
                    Failing case ids:{" "}
                    {currentConfig.metrics.chat.failed.map((id, i) => (
                      <span key={id}>
                        {i > 0 && ", "}
                        <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.8em] text-brand-navy">
                          {id}
                        </code>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="mt-6 text-brand-navy/70">
            This configuration was not measured in the current release.
          </p>
        )}
      </div>

      {/* Trends */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold text-brand-navy">{t.trendsHeading}</h2>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-brand-navy/70">
          {t.trendsIntro}
        </p>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-brand-navy/70">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-teal-ink" />
            Measured at release
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-brand-teal-ink bg-white" />
            {t.backfilledLabel}: {t.backfilledNote.toLowerCase()}
          </span>
          {gates && (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-0 w-5 border-t border-dashed border-brand-navy/50" />
              {t.gateLabel}: minimum to ship
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {series.map(({ key, points }) => (
            <MetricChart
              key={key}
              label={t.metrics[key].label}
              gateLabel={t.gateLabel}
              points={points}
              gate={gateFloor(gates, language, key)}
            />
          ))}
        </div>

        {/* Full trend data as a real table, visually hidden: the assistive-tech
            source of truth. The sr-only clipping lives on a wrapper div because
            a table element itself never shrinks below its content's min width,
            which would widen the page on phones. */}
        <div className="sr-only">
          <table>
          <caption>
            Trend data for configuration {configId}, {languageName(language)}, all releases
          </caption>
          <thead>
            <tr>
              <th scope="col">Release</th>
              {visibleKeys.map((key) => (
                <th key={key} scope="col">
                  {t.metrics[key].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {oldestFirst.map((r) => {
              const config = r.release.configurations.find((c) => c.id === configId);
              return (
                <tr key={r.version}>
                  <th scope="row">
                    {r.version}
                    {r.release.generated_by.backfilled ? ` (${t.backfilledLabel})` : ""}
                  </th>
                  {visibleKeys.map((key) => {
                    const v = config ? metricValue(config, language, key) : null;
                    return <td key={key}>{v === null ? t.notAvailable : formatPct(v)}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>

        {/* Notes from the data, rendered verbatim as annotations. */}
        {oldestFirst.some((r) => r.release.notes && r.release.notes.length > 0) && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-navy/70">
              Notes from the releases
            </h3>
            <ul className="mt-4 space-y-4">
              {[...oldestFirst]
                .reverse()
                .filter((r) => r.release.notes && r.release.notes.length > 0)
                .map((r) => (
                  <li key={r.version} className="flex flex-col gap-1.5">
                    <span className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
                      {r.version}
                      {r.release.generated_by.backfilled && (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-amber-800">
                          {t.backfilledLabel}
                        </span>
                      )}
                      <a
                        href={releaseFileUrl(r.path)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-normal text-brand-teal-ink hover:underline"
                      >
                        {t.checkFileCta}
                        <ExternalLink size={12} strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </span>
                    <ul className="space-y-1.5">
                      {r.release.notes!.map((note, i) => (
                        <li
                          key={i}
                          className="text-pretty text-sm leading-relaxed text-brand-navy/70"
                        >
                          {note}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
