"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { TrustContent } from "@/content/en/trust";
import {
  METRIC_KEYS,
  V11_METRIC_KEYS,
  configCoverage,
  configurationIds,
  fillTemplate,
  firstV11Version,
  formatPct,
  gateFloor,
  languageOptions,
  metricCell,
  metricPresent,
  metricValue,
  releaseFileUrl,
  type Configuration,
  type Gates,
  type LoadedRelease,
  type MetricCell,
  type MetricKey,
} from "@/lib/trust";

type Props = {
  releases: LoadedRelease[];
  gates: Gates | null;
  t: TrustContent;
};

type CompareBy = "none" | "releases" | "models" | "languages";

/**
 * Fixed series palette for side-by-side comparison, starting from the brand
 * teal ink. All three pass the contrast, chroma, and color-vision-deficiency
 * checks against the white chart surface, and a selected entity keeps its
 * color for as long as it stays selected (slots are assigned on selection
 * and freed on deselection, never reshuffled).
 */
const SERIES_COLORS = ["#0d7d61", "#4263eb", "#c2255c"] as const;
const MAX_COMPARE = 3;

/** One column of the comparison: a release, configuration, language triple. */
type Entity = {
  id: string;
  label: string;
  loaded: LoadedRelease;
  config: Configuration | undefined;
  language: string;
  color: string;
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

/**
 * The compare-dimension selector: native checkboxes styled as chips, capped
 * at MAX_COMPARE. A selected chip wears its series color so the chips, table
 * columns, and chart lines read as one system.
 */
function MultiSelectControl({
  legend,
  name,
  options,
  values,
  onToggle,
  hint,
  swatches,
}: {
  legend: string;
  name: string;
  options: { value: string; label: string }[];
  values: string[];
  onToggle: (v: string) => void;
  hint: string;
  swatches: Record<string, string> | null;
}) {
  const atMax = values.length >= MAX_COMPARE;
  return (
    <fieldset className="min-w-0">
      <legend className="text-xs font-semibold uppercase tracking-widest text-brand-navy/70">
        {legend}
      </legend>
      <div className="mt-2 inline-flex flex-wrap gap-1 rounded-2xl border border-brand-navy/10 bg-surface p-1">
        {options.map((opt) => {
          const checked = values.includes(opt.value);
          const disabled = !checked && atMax;
          return (
            <label
              key={opt.value}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors has-[:checked]:bg-white has-[:checked]:text-brand-navy has-[:checked]:shadow-sm has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-teal-ink ${
                disabled
                  ? "cursor-not-allowed text-brand-navy/35"
                  : "cursor-pointer text-brand-navy/70 hover:text-brand-navy"
              }`}
            >
              <input
                type="checkbox"
                name={name}
                value={opt.value}
                checked={checked}
                disabled={disabled}
                onChange={() => onToggle(opt.value)}
                className="sr-only"
              />
              <span className="inline-flex items-center gap-2">
                {swatches && checked && swatches[opt.value] && (
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: swatches[opt.value] }}
                    aria-hidden="true"
                  />
                )}
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-brand-navy/60">{hint}</p>
    </fieldset>
  );
}

/** Native release dropdown: ten entries at most, newest flagged. */
function ReleaseSelect({
  legend,
  value,
  onChange,
  releases,
  latestBadge,
}: {
  legend: string;
  value: string;
  onChange: (v: string) => void;
  releases: LoadedRelease[];
  latestBadge: string;
}) {
  const id = useId();
  return (
    <div className="min-w-0">
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-widest text-brand-navy/70"
      >
        {legend}
      </label>
      <div className="relative mt-2 inline-block">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-2xl border border-brand-navy/10 bg-surface py-2.5 pl-4 pr-10 text-sm font-medium text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-ink"
        >
          {releases.map((r, i) => (
            <option key={r.version} value={r.version}>
              {r.version}
              {i === 0 ? ` (${latestBadge})` : ""}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          strokeWidth={2}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-navy/50"
        />
      </div>
    </div>
  );
}

/** The small pass/fail marker against a gate floor. */
function PassDot({ passes, t }: { passes: boolean; t: TrustContent }) {
  return (
    <>
      <span
        className={`ml-2 inline-block h-2 w-2 rounded-full ${
          passes ? "bg-brand-teal" : "bg-amber-500"
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">
        {" "}
        {t.gateLabel}: {passes ? "pass" : "below"}
      </span>
    </>
  );
}

/** One value cell of the scores table, covering all three kinds of missing. */
function CellValue({
  cell,
  pairs,
  gate,
  showDot,
  highlighted,
  t,
}: {
  cell: MetricCell;
  pairs: number | null;
  gate: number | undefined;
  showDot: boolean;
  highlighted: boolean;
  t: TrustContent;
}) {
  if (cell.kind === "value") {
    return (
      <>
        <span
          className={`text-lg font-semibold ${
            highlighted ? "text-brand-teal-ink" : "text-brand-navy"
          }`}
        >
          {formatPct(cell.value)}
        </span>
        {highlighted && <span className="sr-only"> ({t.highestLabel})</span>}
        {pairs !== null && (
          <span className="ml-1.5 text-xs text-brand-navy/60">
            {pairs} {t.pairsLabel}
          </span>
        )}
        {showDot && gate !== undefined && <PassDot passes={cell.value >= gate} t={t} />}
      </>
    );
  }
  return (
    <span className="text-sm text-brand-navy/60">
      {cell.kind === "unmeasured" ? t.noCasesLabel : t.notAvailable}
    </span>
  );
}

/** Format a difference of two fractions as signed percentage points. */
function formatDeltaPp(d: number): { text: string; tone: "up" | "down" | "flat" } {
  const pp = Math.round(d * 1000) / 10;
  if (pp === 0) return { text: "0.0", tone: "flat" };
  return { text: `${pp > 0 ? "+" : ""}${pp.toFixed(1)}`, tone: pp > 0 ? "up" : "down" };
}

/** One row of the scores table, with an expandable plain-language explainer. */
function MetricRow({
  metricKey,
  cells,
  delta,
  gateCol,
  showCellDots,
  highlightIdx,
  t,
}: {
  metricKey: MetricKey;
  cells: { cell: MetricCell; pairs: number | null; gate: number | undefined }[];
  /** undefined: no delta column. null: column exists, not computable this row. */
  delta: number | null | undefined;
  /** false: no gate column. Otherwise the floor (or undefined for none published). */
  gateCol: number | undefined | false;
  showCellDots: boolean;
  highlightIdx: number | null;
  t: TrustContent;
}) {
  const [open, setOpen] = useState(false);
  const meta = t.metrics[metricKey];
  const panelId = useId();
  const colCount =
    1 + cells.length + (delta !== undefined ? 1 : 0) + (gateCol !== false ? 1 : 0);
  const single = cells.length === 1 ? cells[0] : null;
  const singlePasses =
    single && single.cell.kind === "value" && gateCol !== false && gateCol !== undefined
      ? single.cell.value >= gateCol
      : null;
  const deltaTone = delta !== undefined && delta !== null ? formatDeltaPp(delta) : null;

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
        {cells.map((c, i) => (
          <td key={i} className="py-3 pl-4 text-right align-top tabular-nums">
            <CellValue
              cell={c.cell}
              pairs={c.pairs}
              gate={c.gate}
              showDot={showCellDots}
              highlighted={highlightIdx === i}
              t={t}
            />
          </td>
        ))}
        {delta !== undefined && (
          <td className="py-3 pl-4 text-right align-top text-sm tabular-nums">
            {deltaTone === null ? (
              <>
                <span aria-hidden="true" className="text-brand-navy/40">
                  ·
                </span>
                <span className="sr-only">{t.notAvailable}</span>
              </>
            ) : (
              <span
                className={
                  deltaTone.tone === "up"
                    ? "font-semibold text-brand-teal-ink"
                    : deltaTone.tone === "down"
                      ? "font-semibold text-amber-700"
                      : "text-brand-navy/60"
                }
              >
                {deltaTone.text} {t.pointsUnit}
              </span>
            )}
          </td>
        )}
        {gateCol !== false && (
          <td className="hidden py-3 pl-4 text-right align-top text-sm tabular-nums text-brand-navy/70 sm:table-cell">
            {gateCol === undefined ? (
              <span aria-hidden="true">·</span>
            ) : (
              <>
                <span className="sr-only">{t.gateLabel} </span>≥ {formatPct(gateCol)}
                {singlePasses !== null && <PassDot passes={singlePasses} t={t} />}
              </>
            )}
          </td>
        )}
      </tr>
      {open && (
        <tr>
          <td colSpan={colCount} className="pb-4">
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

type SeriesPoint = { version: string; value: number | null; backfilled: boolean };
export type ChartSeries = {
  id: string;
  label: string;
  color: string;
  points: SeriesPoint[];
};

type DrawnPoint = { version: string; value: number; backfilled: boolean; i: number };

/**
 * Split a series into solid segments of consecutive releases plus dotted
 * connectors across releases where the selection was not measured, so the
 * line never asserts a value that was never published.
 */
function buildSeriesPath(points: SeriesPoint[], n: number) {
  const drawn: DrawnPoint[] = [];
  points.forEach((p, i) => {
    if (p.value !== null) {
      drawn.push({ version: p.version, value: p.value, backfilled: p.backfilled, i });
    }
  });
  const segments: string[] = [];
  const gapLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  let seg: DrawnPoint[] = [];
  const flush = () => {
    if (seg.length > 1) {
      segments.push(
        seg
          .map(
            (p, k) =>
              `${k === 0 ? "M" : "L"} ${xAt(p.i, n).toFixed(1)} ${yAt(p.value).toFixed(1)}`,
          )
          .join(" "),
      );
    }
    seg = [];
  };
  for (const p of drawn) {
    if (seg.length > 0 && p.i > seg[seg.length - 1].i + 1) {
      const prev = seg[seg.length - 1];
      gapLines.push({
        x1: xAt(prev.i, n),
        y1: yAt(prev.value),
        x2: xAt(p.i, n),
        y2: yAt(p.value),
      });
      flush();
    }
    seg.push(p);
  }
  flush();
  return { drawn, segments, gapLines };
}

/**
 * A 0..1 metric chart across releases, one line per compared entity.
 * Decorative: the visually hidden data tables below the chart grid are the
 * source of truth for assistive tech. Hovering (or tapping) snaps to the
 * nearest release and reads every line's value at that release.
 */
function MetricChart({
  label,
  gateLabel,
  notAvailableLabel,
  series,
  gate,
  emphasized,
}: {
  label: string;
  gateLabel: string;
  notAvailableLabel: string;
  series: ChartSeries[];
  gate: number | undefined;
  emphasized: ReadonlySet<string>;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const n = series[0]?.points.length ?? 0;
  const axis = series[0]?.points ?? [];
  const built = series.map((s) => ({ s, ...buildSeriesPath(s.points, n) }));

  const latest =
    series.length === 1
      ? [...built[0].drawn].reverse().find(() => true) ?? null
      : null;

  const showLabel = (i: number, version: string) =>
    n <= 6 || (n - 1 - i) % 2 === 0 || emphasized.has(version);

  function moveTo(clientX: number, el: SVGSVGElement) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || n === 0) return;
    const vx = ((clientX - rect.left) / rect.width) * VB_W;
    const i = Math.round(((vx - PAD_L) / PLOT_W) * (n - 1));
    setHover(Math.min(n - 1, Math.max(0, i)));
  }

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
      <div className="relative">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="mt-2 h-auto w-full touch-none"
          aria-hidden="true"
          role="presentation"
          onPointerMove={(e) => moveTo(e.clientX, e.currentTarget)}
          onPointerDown={(e) => moveTo(e.clientX, e.currentTarget)}
          onPointerLeave={() => setHover(null)}
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

          {/* Hover crosshair snapped to the nearest release. */}
          {hover !== null && n > 0 && (
            <line
              x1={xAt(hover, n)}
              x2={xAt(hover, n)}
              y1={PAD_T}
              y2={PAD_T + PLOT_H}
              stroke="currentColor"
              className="text-brand-navy/25"
              strokeWidth={1}
            />
          )}

          {/* One line per entity: solid within measured stretches, dotted across gaps. */}
          {built.map(({ s, segments, gapLines }) => (
            <g key={s.id}>
              {gapLines.map((g, k) => (
                <line
                  key={k}
                  {...g}
                  stroke={s.color}
                  strokeOpacity={0.35}
                  strokeWidth={1.25}
                  strokeDasharray="2 3"
                />
              ))}
              {segments.map((d, k) => (
                <path
                  key={k}
                  d={d}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}
            </g>
          ))}

          {/* Points: hollow when the release was backfilled, ringed when compared. */}
          {built.map(({ s, drawn }) => (
            <g key={s.id}>
              {drawn.map((p) => (
                <g key={p.version}>
                  {emphasized.has(p.version) && (
                    <circle
                      cx={xAt(p.i, n)}
                      cy={yAt(p.value)}
                      r={6}
                      fill="none"
                      stroke={s.color}
                      strokeOpacity={0.4}
                      strokeWidth={1.5}
                    />
                  )}
                  <circle
                    cx={xAt(p.i, n)}
                    cy={yAt(p.value)}
                    r={emphasized.has(p.version) ? 3.5 : 3}
                    fill={p.backfilled ? "#ffffff" : s.color}
                    stroke={s.color}
                    strokeWidth={p.backfilled ? 1.5 : 0}
                  />
                </g>
              ))}
            </g>
          ))}

          {/* X-axis release labels, thinned when ten releases would collide. */}
          {axis.map(
            (p, i) =>
              showLabel(i, p.version) && (
                <text
                  key={p.version}
                  x={xAt(i, n)}
                  y={VB_H - 8}
                  textAnchor="middle"
                  className={
                    emphasized.has(p.version)
                      ? "fill-brand-navy font-semibold"
                      : "fill-brand-navy/70"
                  }
                  fontSize={7.5}
                >
                  {shortVersion(p.version)}
                </text>
              ),
          )}
        </svg>

        {/* Hover readout: every line's value at the snapped release. */}
        {hover !== null && n > 0 && (
          <div
            className="pointer-events-none absolute top-1 z-10"
            style={{
              left: `${(xAt(hover, n) / VB_W) * 100}%`,
              transform:
                hover > (n - 1) / 2
                  ? "translateX(calc(-100% - 8px))"
                  : "translateX(8px)",
            }}
            aria-hidden="true"
          >
            <div className="rounded-lg border border-brand-navy/15 bg-white px-2.5 py-1.5 shadow-md">
              <p className="whitespace-nowrap text-[0.7rem] font-semibold text-brand-navy">
                {axis[hover].version}
              </p>
              {series.map((s) => {
                const v = s.points[hover].value;
                return (
                  <p
                    key={s.id}
                    className="flex items-center gap-1.5 whitespace-nowrap text-[0.7rem] tabular-nums text-brand-navy/80"
                  >
                    {series.length > 1 && (
                      <span
                        className="inline-block h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                    )}
                    <span>
                      {series.length > 1 ? `${s.label}: ` : ""}
                      {v === null ? notAvailableLabel : formatPct(v)}
                    </span>
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}

/** The supersedes denominator for a configuration and language, if published. */
function supersedesPairs(config: Configuration, language: string): number | null {
  if (language === "aggregate") {
    return config.metrics.aggregate.supersedes_pairs ?? null;
  }
  const row = config.metrics.per_language.find((l) => l.language === language);
  return row?.supersedes_pairs ?? null;
}

export default function TrustExplorer({ releases, gates, t }: Props) {
  const configIds = useMemo(() => configurationIds(releases), [releases]);
  const versions = useMemo(() => releases.map((r) => r.version), [releases]);

  const [compareBy, setCompareBy] = useState<CompareBy>("none");
  const [releaseVersion, setReleaseVersion] = useState(versions[0]);
  const [configId, setConfigId] = useState(configIds[0]);
  const [language, setLanguage] = useState("aggregate");
  /** Selection for the active compare dimension, in canonical option order. */
  const [sel, setSel] = useState<string[]>([]);
  /** Stable series-color slot per selected entity. */
  const [colorOf, setColorOf] = useState<Record<string, number>>({});

  const languageName = (code: string): string =>
    t.languageNames[code] ?? code.toUpperCase();

  const langOpts = useMemo(
    () => languageOptions(releases, configId),
    [releases, configId],
  );

  const selectedRelease =
    releases.find((r) => r.version === releaseVersion) ?? releases[0];
  const oldestFirst = useMemo(() => [...releases].reverse(), [releases]);
  const v11First = useMemo(() => firstV11Version(releases), [releases]);

  /** Canonical option order for a compare dimension (releases oldest first). */
  function dimensionOrder(mode: CompareBy, cfg: string): string[] {
    if (mode === "releases") return [...versions].reverse();
    if (mode === "models") return configIds;
    if (mode === "languages") return languageOptions(releases, cfg);
    return [];
  }

  /** Switch compare mode, seeding or revalidating the selection. */
  function applyCompare(mode: CompareBy, opts?: { config?: string; sel?: string[] }) {
    const cfg = opts?.config ?? configId;
    setCompareBy(mode);
    if (mode === "none") {
      setSel([]);
      setColorOf({});
      return;
    }
    const order = dimensionOrder(mode, cfg);
    let chosen = [...new Set((opts?.sel ?? []).filter((v) => order.includes(v)))].slice(
      0,
      MAX_COMPARE,
    );
    if (chosen.length === 0) {
      if (mode === "releases") chosen = versions.slice(0, 2);
      else if (mode === "models") chosen = configIds.slice(0, MAX_COMPARE);
      else {
        const real = order.filter((l) => l !== "aggregate");
        chosen = (real.length >= 2 ? real : order).slice(0, MAX_COMPARE);
      }
    }
    const ordered = order.filter((v) => chosen.includes(v));
    setSel(ordered);
    setColorOf(Object.fromEntries(ordered.map((v, i) => [v, i])));
  }

  /** Toggle one chip, keeping at least one selected and color slots stable. */
  function toggleSelection(value: string) {
    if (sel.includes(value)) {
      if (sel.length === 1) return;
      const next = { ...colorOf };
      delete next[value];
      setSel(sel.filter((v) => v !== value));
      setColorOf(next);
    } else {
      if (sel.length >= MAX_COMPARE) return;
      const used = new Set(sel.map((v) => colorOf[v]));
      const free = [0, 1, 2].find((i) => !used.has(i)) ?? 0;
      const order = dimensionOrder(compareBy, configId);
      setSel(order.filter((v) => sel.includes(v) || v === value));
      setColorOf({ ...colorOf, [value]: free });
    }
  }

  function changeConfig(id: string) {
    setConfigId(id);
    const lopts = languageOptions(releases, id);
    if (!lopts.includes(language)) setLanguage("aggregate");
    if (compareBy === "languages") applyCompare("languages", { config: id, sel });
  }

  // Restore a shared view from the URL once, on mount.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const qConfig = p.get("config");
    const cfg = qConfig && configIds.includes(qConfig) ? qConfig : configIds[0];
    if (qConfig && configIds.includes(qConfig)) setConfigId(qConfig);
    const qLang = p.get("lang");
    if (qLang && languageOptions(releases, cfg).includes(qLang)) setLanguage(qLang);
    const qRelease = p.get("release");
    if (qRelease && versions.includes(qRelease)) setReleaseVersion(qRelease);
    const qCompare = p.get("compare");
    if (qCompare === "releases" || qCompare === "models" || qCompare === "languages") {
      applyCompare(qCompare, {
        config: cfg,
        sel: (p.get("sel") ?? "").split(",").filter(Boolean),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mirror the current view into the URL so it can be shared or bookmarked.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const setOrDel = (k: string, v: string | null) => {
      if (v) p.set(k, v);
      else p.delete(k);
    };
    setOrDel("release", releaseVersion !== versions[0] ? releaseVersion : null);
    setOrDel("config", configId !== configIds[0] ? configId : null);
    setOrDel("lang", language !== "aggregate" ? language : null);
    setOrDel("compare", compareBy !== "none" ? compareBy : null);
    setOrDel("sel", compareBy !== "none" && sel.length > 0 ? sel.join(",") : null);
    const qs = p.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`,
    );
  }, [compareBy, releaseVersion, configId, language, sel, versions, configIds]);

  // The columns of the current view, in canonical order.
  const entities: Entity[] = useMemo(() => {
    const colorAt = (id: string) => SERIES_COLORS[colorOf[id] ?? 0];
    if (compareBy === "releases") {
      return oldestFirst
        .filter((r) => sel.includes(r.version))
        .map((r) => ({
          id: r.version,
          label: r.version,
          loaded: r,
          config: r.release.configurations.find((c) => c.id === configId),
          language,
          color: colorAt(r.version),
        }));
    }
    if (compareBy === "models") {
      return configIds
        .filter((id) => sel.includes(id))
        .map((id) => ({
          id,
          label: id,
          loaded: selectedRelease,
          config: selectedRelease.release.configurations.find((c) => c.id === id),
          language,
          color: colorAt(id),
        }));
    }
    if (compareBy === "languages") {
      return langOpts
        .filter((l) => sel.includes(l))
        .map((l) => ({
          id: l,
          label: languageName(l),
          loaded: selectedRelease,
          config: selectedRelease.release.configurations.find((c) => c.id === configId),
          language: l,
          color: colorAt(l),
        }));
    }
    return [
      {
        id: "single",
        label: languageName(language),
        loaded: selectedRelease,
        config: selectedRelease.release.configurations.find((c) => c.id === configId),
        language,
        color: SERIES_COLORS[0],
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareBy, sel, colorOf, configId, language, selectedRelease, oldestFirst, configIds, langOpts]);

  // Metrics that exist anywhere in the loaded data for the configs in view.
  const activeConfigIds = compareBy === "models" ? sel : [configId];
  const visibleKeys = useMemo(
    () =>
      METRIC_KEYS.filter((key) =>
        activeConfigIds.some((id) => metricPresent(releases, id, key)),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [releases, activeConfigIds.join(",")],
  );

  const configOptions = configIds.map((id) => ({ value: id, label: id }));
  const languageChoices = langOpts.map((code) => ({
    value: code,
    label: languageName(code),
  }));
  const releaseChipOptions = releases.map((r, i) => ({
    value: r.version,
    label: i === 0 ? `${r.version} (${t.latestBadge})` : r.version,
  }));
  const compareOptions = [
    { value: "none", label: t.compareNone },
    { value: "releases", label: t.compareReleases },
    { value: "models", label: t.compareModels },
    { value: "languages", label: t.compareLanguages },
  ];
  const swatches = Object.fromEntries(
    sel.map((v) => [v, SERIES_COLORS[colorOf[v] ?? 0]]),
  );

  const showDelta = compareBy !== "none" && entities.length === 2;
  const showGateCol = compareBy !== "languages";
  const showCellDots = compareBy !== "none";

  // Chart series: one line per entity for model and language comparison,
  // otherwise the single selected line (release comparison highlights its
  // picks on that line instead of splitting it).
  const seriesDefs = useMemo(() => {
    if (compareBy === "models" || compareBy === "languages") {
      return entities.map((e) => ({
        id: e.id,
        label: e.label,
        color: e.color,
        configId: compareBy === "models" ? e.id : configId,
        language: e.language,
      }));
    }
    return [
      {
        id: "single",
        label: languageName(language),
        color: SERIES_COLORS[0],
        configId,
        language,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareBy, entities, configId, language]);

  const charts = useMemo(
    () =>
      visibleKeys.map((key) => ({
        key,
        series: seriesDefs.map((def) => ({
          id: def.id,
          label: def.label,
          color: def.color,
          points: oldestFirst.map((r) => {
            const config = r.release.configurations.find((c) => c.id === def.configId);
            return {
              version: r.version,
              value: config ? metricValue(config, def.language, key) : null,
              backfilled: r.release.generated_by.backfilled,
            };
          }),
        })),
        gate:
          compareBy === "languages" ? undefined : gateFloor(gates, language, key),
      })),
    [visibleKeys, seriesDefs, oldestFirst, compareBy, gates, language],
  );

  const emphasized = useMemo(
    () => new Set(compareBy === "releases" ? sel : []),
    [compareBy, sel],
  );

  // Sparsity disclosures: partial coverage of any configuration in view, and
  // entities whose configuration is absent from the release they point at.
  const coverageNotes = activeConfigIds
    .map((id) => ({ id, cov: configCoverage(releases, id) }))
    .filter((x) => x.cov.measured < x.cov.total)
    .map((x) =>
      fillTemplate(t.configCoverageNote, {
        config: x.id,
        n: x.cov.measured,
        m: x.cov.total,
        version: x.cov.first ?? "",
      }),
    );

  const missingEntities = entities.filter((e) => !e.config);
  const allMissing = entities.length > 0 && missingEntities.length === entities.length;

  const showV11Note =
    v11First !== null &&
    entities.some(
      (e) =>
        e.config &&
        visibleKeys.some(
          (k) =>
            (V11_METRIC_KEYS as readonly MetricKey[]).includes(k) &&
            metricCell(e.config, e.language, k).kind === "absent",
        ),
    );

  // Chat suites in view, deduplicated: language columns share one suite.
  const chatCards = useMemo(() => {
    const seen = new Set<string>();
    const cards: { key: string; label: string; chat: NonNullable<Configuration["metrics"]["chat"]> }[] = [];
    for (const e of entities) {
      const chat = e.config?.metrics.chat;
      if (!chat) continue;
      const key = `${e.loaded.version}:${e.config!.id}`;
      if (seen.has(key)) continue;
      seen.add(key);
      cards.push({ key, label: e.label, chat });
    }
    return cards;
  }, [entities]);

  const tableMinW =
    entities.length >= 3
      ? "min-w-[42rem]"
      : entities.length === 2
        ? "min-w-[30rem]"
        : "min-w-[22rem]";

  return (
    <div>
      {/* Selectors */}
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-10 sm:gap-y-6">
        {compareBy === "releases" ? (
          <MultiSelectControl
            legend={t.releaseLabel}
            name="trust-release"
            options={releaseChipOptions}
            values={sel}
            onToggle={toggleSelection}
            hint={t.compareHint}
            swatches={null}
          />
        ) : (
          <ReleaseSelect
            legend={t.releaseLabel}
            value={releaseVersion}
            onChange={setReleaseVersion}
            releases={releases}
            latestBadge={t.latestBadge}
          />
        )}
        {compareBy === "models" ? (
          <MultiSelectControl
            legend={t.configLabel}
            name="trust-config"
            options={configOptions}
            values={sel}
            onToggle={toggleSelection}
            hint={t.compareHint}
            swatches={swatches}
          />
        ) : (
          <SegmentedControl
            legend={t.configLabel}
            name="trust-config"
            options={configOptions}
            value={configId}
            onChange={changeConfig}
          />
        )}
        {compareBy === "languages" ? (
          <MultiSelectControl
            legend={t.languageLabel}
            name="trust-language"
            options={languageChoices}
            values={sel}
            onToggle={toggleSelection}
            hint={t.compareHint}
            swatches={swatches}
          />
        ) : (
          <SegmentedControl
            legend={t.languageLabel}
            name="trust-language"
            options={languageChoices}
            value={language}
            onChange={setLanguage}
          />
        )}
        <SegmentedControl
          legend={t.compareLabel}
          name="trust-compare"
          options={compareOptions}
          value={compareBy}
          onChange={(v) => applyCompare(v as CompareBy)}
        />
      </div>

      {((compareBy !== "languages" && language === "aggregate") ||
        (compareBy === "languages" && sel.includes("aggregate"))) && (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
          {t.aggregateNote}
        </p>
      )}
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
        {t.gatesNote}
      </p>
      {coverageNotes.map((note) => (
        <p key={note} className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
          {note}
        </p>
      ))}

      {/* Scores for the selected release, or side by side when comparing. */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-brand-navy">{t.currentHeading}</h2>
        <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-brand-navy/70">
          {t.currentIntro}
        </p>

        {allMissing ? (
          <div className="mt-6 text-brand-navy/70">
            <p>
              {activeConfigIds[0]}:{" "}
              {fillTemplate(t.notMeasuredInLabel, { version: selectedRelease.version })}
            </p>
            {compareBy !== "releases" &&
              (() => {
                const cov = configCoverage(releases, activeConfigIds[0]);
                return cov.latest ? (
                  <button
                    type="button"
                    onClick={() => setReleaseVersion(cov.latest!)}
                    className="mt-2 font-medium text-brand-teal-ink hover:underline"
                  >
                    {fillTemplate(t.viewReleaseCta, { version: cov.latest })}
                  </button>
                ) : null;
              })()}
          </div>
        ) : (
          <>
            <div className="mt-6 overflow-x-auto">
              <table className={`w-full ${tableMinW} border-collapse text-left`}>
                <caption className="sr-only">
                  Scores for configuration {activeConfigIds.join(", ")},{" "}
                  {compareBy === "languages"
                    ? sel.map(languageName).join(", ")
                    : languageName(language)}
                  ,{" "}
                  {compareBy === "releases"
                    ? sel.join(", ")
                    : selectedRelease.version}
                </caption>
                <thead>
                  <tr className="text-xs font-semibold uppercase tracking-widest text-brand-navy/70">
                    <th scope="col" className="pb-2 pr-4 font-semibold">
                      {t.metricColLabel}
                    </th>
                    {entities.map((e) => (
                      <th
                        key={e.id}
                        scope="col"
                        className="pb-2 pl-4 text-right font-semibold"
                      >
                        <span className="inline-flex items-center gap-2">
                          {compareBy === "models" || compareBy === "languages" ? (
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: e.color }}
                              aria-hidden="true"
                            />
                          ) : null}
                          {e.label}
                        </span>
                      </th>
                    ))}
                    {showDelta && (
                      <th scope="col" className="pb-2 pl-4 text-right font-semibold">
                        {t.deltaHeading}
                      </th>
                    )}
                    {showGateCol && (
                      <th
                        scope="col"
                        className="hidden pb-2 pl-4 text-right font-semibold sm:table-cell"
                      >
                        {t.gateLabel}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {visibleKeys.map((key) => {
                    const cells = entities.map((e) => ({
                      cell: metricCell(e.config, e.language, key),
                      pairs:
                        key === "supersedes_accuracy" && e.config
                          ? supersedesPairs(e.config, e.language)
                          : null,
                      gate: gateFloor(gates, e.language, key),
                    }));
                    let delta: number | null | undefined = undefined;
                    if (showDelta) {
                      const [a, b] = cells;
                      delta =
                        a.cell.kind === "value" && b.cell.kind === "value"
                          ? b.cell.value - a.cell.value
                          : null;
                    }
                    let highlightIdx: number | null = null;
                    if (
                      (compareBy === "models" || compareBy === "languages") &&
                      entities.length >= 2
                    ) {
                      const values = cells.map((c) =>
                        c.cell.kind === "value" ? c.cell.value : null,
                      );
                      const present = values.filter((v): v is number => v !== null);
                      if (present.length >= 2) {
                        const max = Math.max(...present);
                        const min = Math.min(...present);
                        if (max > min) highlightIdx = values.indexOf(max);
                      }
                    }
                    return (
                      <MetricRow
                        key={key}
                        metricKey={key}
                        cells={cells}
                        delta={delta}
                        gateCol={
                          showGateCol ? gateFloor(gates, language, key) : false
                        }
                        showCellDots={showCellDots}
                        highlightIdx={highlightIdx}
                        t={t}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>

            {showV11Note && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
                {fillTemplate(t.v11Note, { version: v11First! })}
              </p>
            )}

            {missingEntities.length > 0 && (
              <div className="mt-4 space-y-1.5">
                {missingEntities.map((e) => {
                  const cfgId = compareBy === "models" ? e.id : configId;
                  const cov = configCoverage(releases, cfgId);
                  return (
                    <p key={e.id} className="text-sm text-brand-navy/70">
                      {cfgId}:{" "}
                      {fillTemplate(t.notMeasuredInLabel, {
                        version: e.loaded.version,
                      })}
                      {compareBy === "models" && cov.latest && (
                        <>
                          {" "}
                          <button
                            type="button"
                            onClick={() => setReleaseVersion(cov.latest!)}
                            className="font-medium text-brand-teal-ink hover:underline"
                          >
                            {fillTemplate(t.viewReleaseCta, { version: cov.latest })}
                          </button>
                        </>
                      )}
                    </p>
                  );
                })}
              </div>
            )}

            {/* Chat suite summary, one card per compared release and model. */}
            {chatCards.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-navy/70">
                  {t.chatHeading}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
                  {t.chatIntro}
                </p>
                <div
                  className={`mt-4 grid gap-4 ${
                    chatCards.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""
                  }`}
                >
                  {chatCards.map((card) => (
                    <div
                      key={card.key}
                      className="rounded-2xl border border-brand-navy/10 bg-surface p-5"
                    >
                      {compareBy !== "none" && (
                        <p className="text-sm font-semibold text-brand-navy">
                          {card.label}
                        </p>
                      )}
                      <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                        <span className="text-2xl font-semibold tabular-nums text-brand-navy">
                          {card.chat.passed}/{card.chat.cases}
                        </span>
                        <span className="text-sm text-brand-navy/70">
                          {t.casesPassLabel}
                        </span>
                      </p>
                      {card.chat.failed.length > 0 && (
                        <p className="mt-3 text-sm text-brand-navy/70">
                          {t.failingCasesLabel}{" "}
                          {card.chat.failed.map((id, i) => (
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
                  ))}
                </div>
              </div>
            )}
          </>
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
          {seriesDefs.length > 1 &&
            seriesDefs.map((s) => (
              <span key={s.id} className="inline-flex items-center gap-2">
                <span
                  className="inline-block h-0.5 w-5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </span>
            ))}
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-teal-ink" />
            {t.measuredAtLabel}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-brand-teal-ink bg-white" />
            {t.backfilledLabel}: {t.backfilledNote.toLowerCase()}
          </span>
          {gates && compareBy !== "languages" && (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-0 w-5 border-t border-dashed border-brand-navy/50" />
              {t.gateLabel}
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {charts.map(({ key, series, gate }) => (
            <MetricChart
              key={key}
              label={t.metrics[key].label}
              gateLabel={t.gateLabel}
              notAvailableLabel={t.notAvailable}
              series={series}
              gate={gate}
              emphasized={emphasized}
            />
          ))}
        </div>

        {/* Full trend data as real tables, visually hidden: the assistive-tech
            source of truth, one table per compared line. The sr-only clipping
            lives on a wrapper div because a table element itself never shrinks
            below its content's min width, which would widen the page on
            phones. */}
        <div className="sr-only">
          {seriesDefs.map((def) => (
            <table key={def.id}>
              <caption>
                Trend data for configuration {def.configId},{" "}
                {languageName(def.language)}, all releases
              </caption>
              <thead>
                <tr>
                  <th scope="col">{t.releaseLabel}</th>
                  {visibleKeys.map((key) => (
                    <th key={key} scope="col">
                      {t.metrics[key].label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {oldestFirst.map((r) => {
                  const config = r.release.configurations.find(
                    (c) => c.id === def.configId,
                  );
                  return (
                    <tr key={r.version}>
                      <th scope="row">
                        {r.version}
                        {r.release.generated_by.backfilled
                          ? ` (${t.backfilledLabel})`
                          : ""}
                      </th>
                      {visibleKeys.map((key) => {
                        const v = config
                          ? metricValue(config, def.language, key)
                          : null;
                        return (
                          <td key={key}>{v === null ? t.notAvailable : formatPct(v)}</td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ))}
        </div>

        {/* Notes from the data, rendered verbatim as annotations. */}
        {oldestFirst.some((r) => r.release.notes && r.release.notes.length > 0) && (
          <div className="mt-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-navy/70">
              {t.releaseNotesHeading}
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
