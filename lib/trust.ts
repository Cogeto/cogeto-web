/**
 * Trust-score data layer.
 *
 * Everything here runs on the server only (Server Components and ISR). A
 * visitor's browser never talks to GitHub; it only ever receives the finished
 * page from cogeto.eu. Data is pulled from the product repo's published,
 * immutable per-release files and validated against the same shape as
 * docs/trust-scores-schema/trust-scores.schema.json, then cached for one hour.
 *
 * Graceful degradation. If the index fetch fails, or every release file fails
 * to load or validate, we throw. Next then keeps serving the last good,
 * statically generated page (the ISR default), so a visitor never sees a broken
 * page and never sees a half-rendered one. An individual malformed release file
 * is skipped rather than sinking the whole page, as long as one valid release
 * remains. The CI gates are a pure enhancement: if they fail to load, the
 * charts simply omit the target lines.
 */

const RAW_BASE = "https://raw.githubusercontent.com/Cogeto/cogeto/main";
const TRUST_DIR = "eval/trust-scores";
const GATES_PATH = "project/eval/gates.json";

/** One hour, matching the publish cadence of the product repo. */
export const TRUST_REVALIDATE_SECONDS = 3600;

/** Public GitHub browse links: the "do not trust this chart, check the file" invitation. */
export const repoLinks = {
  repo: "https://github.com/Cogeto/cogeto",
  trustDir: `https://github.com/Cogeto/cogeto/tree/main/${TRUST_DIR}`,
  schema: "https://github.com/Cogeto/cogeto/tree/main/docs/trust-scores-schema",
  goldenCorpus: "https://github.com/Cogeto/cogeto/tree/main/project/eval/golden",
  goldenSetDoc: "https://github.com/Cogeto/cogeto/blob/main/docs/eval-golden-set.md",
  gates: `https://github.com/Cogeto/cogeto/blob/main/${GATES_PATH}`,
} as const;

/** Link to the exact per-release JSON file in the repository. */
export function releaseFileUrl(path: string): string {
  return `https://github.com/Cogeto/cogeto/blob/main/${TRUST_DIR}/${path}`;
}

/** Link to the exact commit a release was measured at. */
export function commitUrl(sha: string): string {
  return `https://github.com/Cogeto/cogeto/commit/${sha}`;
}

// --- Types (mirroring the published schema) --------------------------------

/** Metrics every schema 1.0 file carries. */
export const CORE_METRIC_KEYS = [
  "extraction_precision",
  "extraction_recall",
  "verification_agreement",
  "dedup_accuracy",
  "contradiction_recall",
] as const;

/**
 * Metrics added by schema 1.1 (additive; published from the release after
 * v1.4.0 on). The reader accepts both schema lines and renders these only
 * when a file carries them.
 */
export const V11_METRIC_KEYS = [
  "contradiction_precision",
  "supersedes_accuracy",
  "rewrite_accuracy",
] as const;

/** Display order for the explorer: detection quality reads as one block. */
export const METRIC_KEYS = [
  "extraction_precision",
  "extraction_recall",
  "verification_agreement",
  "dedup_accuracy",
  "contradiction_precision",
  "contradiction_recall",
  "supersedes_accuracy",
  "rewrite_accuracy",
] as const;

export type CoreMetricKey = (typeof CORE_METRIC_KEYS)[number];
export type V11MetricKey = (typeof V11_METRIC_KEYS)[number];
export type MetricKey = (typeof METRIC_KEYS)[number];

export type LanguageMetrics = {
  language: string;
  golden_cases: number;
  extraction_precision: number;
  extraction_recall: number;
  verification_agreement: number;
  /** Null when the language had no reconciliation pairs. */
  dedup_accuracy: number | null;
  contradiction_recall: number | null;
  /** Schema 1.1 fields: absent in 1.0 files, null when unmeasurable. */
  contradiction_precision?: number | null;
  supersedes_accuracy?: number | null;
  /** The denominator behind supersedes_accuracy; published because a rate over one case means nothing. */
  supersedes_pairs?: number | null;
  rewrite_accuracy?: number | null;
};

export type AggregateMetrics = Record<CoreMetricKey, number> &
  Partial<Record<V11MetricKey, number>> & { supersedes_pairs?: number };

export type ChatSummary = {
  cases: number;
  passed: number;
  /** Case ids that failed: published, not hidden. */
  failed: string[];
};

export type Metrics = {
  per_language: LanguageMetrics[];
  aggregate: AggregateMetrics;
  chat?: ChatSummary;
};

export type Corpus = {
  golden_cases: number;
  reconcile_pairs: number;
  chat_cases?: number;
  per_language: { language: string; golden_cases: number }[];
};

export type Models = { pipeline: string; answer: string; embedding: string };

export type Configuration = {
  id: string;
  models: Models;
  redaction: boolean;
  corpus: Corpus;
  metrics: Metrics;
};

export type GeneratedBy = {
  release: string;
  commit: string;
  harness: string;
  generated_at: string;
  /** True when numbers were transcribed from recorded runs, not emitted at release time. */
  backfilled: boolean;
};

export type TrustRelease = {
  schema_version: string;
  generated_by: GeneratedBy;
  configurations: Configuration[];
  notes?: string[];
};

/** A release file paired with the index metadata that pointed at it. */
export type LoadedRelease = {
  release: TrustRelease;
  version: string;
  date: string;
  path: string;
};

export type GateFloors = Partial<Record<MetricKey, number>>;

/**
 * CI gate floors from project/eval/gates.json version 2: aggregate floors
 * plus a per-language layer, so no language hides in an aggregate.
 */
export type Gates = {
  aggregate: GateFloors;
  perLanguage: Record<string, GateFloors>;
};

export type TrustData = {
  /** Newest first, as the index lists them. */
  releases: LoadedRelease[];
  /** CI gate floors, or null if unavailable. */
  gates: Gates | null;
};

// --- Validation ------------------------------------------------------------

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

function isFraction(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 1;
}

function isFractionOrNull(v: unknown): v is number | null {
  return v === null || isFraction(v);
}

function isCount(v: unknown): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= 0;
}

function isCountOrNull(v: unknown): v is number | null {
  return v === null || isCount(v);
}

/** A 1.1 optional field: absent stays undefined, present must be fraction or null. */
function optionalFraction(v: unknown): number | null | undefined | false {
  if (v === undefined) return undefined;
  if (isFractionOrNull(v)) return v;
  return false;
}

function validateLanguageMetrics(v: unknown): LanguageMetrics | null {
  if (!isObj(v)) return null;
  if (!isString(v.language)) return null;
  if (!isCount(v.golden_cases)) return null;
  if (!isFraction(v.extraction_precision)) return null;
  if (!isFraction(v.extraction_recall)) return null;
  if (!isFraction(v.verification_agreement)) return null;
  if (!isFractionOrNull(v.dedup_accuracy)) return null;
  if (!isFractionOrNull(v.contradiction_recall)) return null;
  const contradictionPrecision = optionalFraction(v.contradiction_precision);
  const supersedesAccuracy = optionalFraction(v.supersedes_accuracy);
  const rewriteAccuracy = optionalFraction(v.rewrite_accuracy);
  if (
    contradictionPrecision === false ||
    supersedesAccuracy === false ||
    rewriteAccuracy === false
  ) {
    return null;
  }
  if (v.supersedes_pairs !== undefined && !isCountOrNull(v.supersedes_pairs)) {
    return null;
  }
  return {
    language: v.language,
    golden_cases: v.golden_cases,
    extraction_precision: v.extraction_precision,
    extraction_recall: v.extraction_recall,
    verification_agreement: v.verification_agreement,
    dedup_accuracy: v.dedup_accuracy as number | null,
    contradiction_recall: v.contradiction_recall as number | null,
    contradiction_precision: contradictionPrecision,
    supersedes_accuracy: supersedesAccuracy,
    supersedes_pairs: v.supersedes_pairs as number | null | undefined,
    rewrite_accuracy: rewriteAccuracy,
  };
}

function validateAggregate(v: unknown): AggregateMetrics | null {
  if (!isObj(v)) return null;
  const out = {} as AggregateMetrics;
  for (const k of CORE_METRIC_KEYS) {
    if (!isFraction(v[k])) return null;
    out[k] = v[k] as number;
  }
  for (const k of V11_METRIC_KEYS) {
    if (v[k] === undefined) continue;
    if (!isFraction(v[k])) return null;
    out[k] = v[k] as number;
  }
  if (v.supersedes_pairs !== undefined) {
    if (!isCount(v.supersedes_pairs)) return null;
    out.supersedes_pairs = v.supersedes_pairs;
  }
  return out;
}

function validateChat(v: unknown): ChatSummary | undefined {
  if (!isObj(v)) return undefined;
  if (!isCount(v.cases) || !isCount(v.passed)) return undefined;
  const failed = Array.isArray(v.failed) ? v.failed.filter(isString) : [];
  return { cases: v.cases, passed: v.passed, failed };
}

function validateConfiguration(v: unknown): Configuration | null {
  if (!isObj(v)) return null;
  if (!isString(v.id) || !/^[a-z0-9][a-z0-9-]*$/.test(v.id)) return null;
  if (!isObj(v.models)) return null;
  const { pipeline, answer, embedding } = v.models;
  if (!isString(pipeline) || !isString(answer) || !isString(embedding)) return null;
  if (typeof v.redaction !== "boolean") return null;

  if (!isObj(v.corpus)) return null;
  const c = v.corpus;
  if (!isCount(c.golden_cases) || !isCount(c.reconcile_pairs)) return null;
  const corpusPerLang = Array.isArray(c.per_language)
    ? c.per_language.filter(
        (e): e is { language: string; golden_cases: number } =>
          isObj(e) && isString(e.language) && isCount(e.golden_cases),
      )
    : [];

  if (!isObj(v.metrics)) return null;
  const perLangRaw = v.metrics.per_language;
  if (!Array.isArray(perLangRaw) || perLangRaw.length < 1) return null;
  const perLanguage: LanguageMetrics[] = [];
  for (const entry of perLangRaw) {
    const parsed = validateLanguageMetrics(entry);
    if (!parsed) return null;
    perLanguage.push(parsed);
  }
  const aggregate = validateAggregate(v.metrics.aggregate);
  if (!aggregate) return null;

  return {
    id: v.id,
    models: { pipeline, answer, embedding },
    redaction: v.redaction,
    corpus: {
      golden_cases: c.golden_cases,
      reconcile_pairs: c.reconcile_pairs,
      chat_cases: isCount(c.chat_cases) ? c.chat_cases : undefined,
      per_language: corpusPerLang,
    },
    metrics: {
      per_language: perLanguage,
      aggregate,
      chat: validateChat(v.metrics.chat),
    },
  };
}

/**
 * Validate one release file. Returns null on any structural problem so the
 * caller can skip it. We accept any schema_version in the 1.x line (additive
 * minor bumps stay readable) and reject a different major, matching the
 * product repo's stated versioning contract.
 */
export function validateRelease(data: unknown): TrustRelease | null {
  try {
    if (!isObj(data)) return null;
    if (!isString(data.schema_version) || !data.schema_version.startsWith("1.")) {
      return null;
    }
    const gb = data.generated_by;
    if (!isObj(gb)) return null;
    if (!isString(gb.release) || !/^v\d+\.\d+\.\d+$/.test(gb.release)) return null;
    if (!isString(gb.commit) || !/^[0-9a-f]{7,40}$/.test(gb.commit)) return null;
    if (!isString(gb.harness)) return null;
    if (!isString(gb.generated_at)) return null;
    if (typeof gb.backfilled !== "boolean") return null;

    if (!Array.isArray(data.configurations) || data.configurations.length < 1) {
      return null;
    }
    const configurations: Configuration[] = [];
    for (const raw of data.configurations) {
      const parsed = validateConfiguration(raw);
      if (!parsed) return null;
      configurations.push(parsed);
    }

    const notes = Array.isArray(data.notes) ? data.notes.filter(isString) : undefined;

    return {
      schema_version: data.schema_version,
      generated_by: {
        release: gb.release,
        commit: gb.commit,
        harness: gb.harness,
        generated_at: gb.generated_at,
        backfilled: gb.backfilled,
      },
      configurations,
      notes,
    };
  } catch {
    return null;
  }
}

// --- Fetching --------------------------------------------------------------

type IndexEntry = { version: string; date: string; path: string };

function isIndexEntry(v: unknown): v is IndexEntry {
  return (
    isObj(v) &&
    isString(v.version) &&
    isString(v.date) &&
    isString(v.path) &&
    // Guard against path traversal: only a plain file name in the trust dir.
    /^[\w.-]+\.json$/.test(v.path)
  );
}

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, {
    next: { revalidate: TRUST_REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`GET ${url} responded ${res.status}`);
  }
  return res.json();
}

function readFloors(v: unknown): GateFloors {
  const floors: GateFloors = {};
  if (!isObj(v)) return floors;
  for (const k of METRIC_KEYS) {
    if (isFraction(v[k])) floors[k] = v[k] as number;
  }
  return floors;
}

async function fetchGates(): Promise<Gates | null> {
  try {
    const raw = await fetchJson(`${RAW_BASE}/${GATES_PATH}`);
    if (!isObj(raw)) return null;
    const aggregate = readFloors(raw.gates);
    const perLanguage: Record<string, GateFloors> = {};
    if (isObj(raw.per_language)) {
      for (const [lang, floors] of Object.entries(raw.per_language)) {
        const parsed = readFloors(floors);
        if (Object.keys(parsed).length > 0) perLanguage[lang] = parsed;
      }
    }
    if (Object.keys(aggregate).length === 0 && Object.keys(perLanguage).length === 0) {
      return null;
    }
    return { aggregate, perLanguage };
  } catch (err) {
    console.error("[trust] gates unavailable, omitting target lines:", err);
    return null;
  }
}

/**
 * Load the published trust data. Throws only when there is nothing valid to
 * render, which lets ISR serve the last good page.
 */
export async function fetchTrustData(): Promise<TrustData> {
  const index = await fetchJson(`${RAW_BASE}/${TRUST_DIR}/index.json`);
  if (!Array.isArray(index)) {
    throw new Error("trust index is not an array");
  }
  // Only the v1 line is shown, and at most the ten most recent releases
  // buyer, and ten points is the most the trend charts carry legibly. The
  // full immutable history stays linked via repoLinks.trustDir.
  const entries = index
    .filter(isIndexEntry)
    .filter((e) => !/^v0\./.test(e.version))
    .slice(0, 10);
  if (entries.length === 0) {
    throw new Error("trust index has no valid entries");
  }

  const [loadedMaybe, gates] = await Promise.all([
    Promise.all(
      entries.map(async (entry): Promise<LoadedRelease | null> => {
        try {
          const raw = await fetchJson(`${RAW_BASE}/${TRUST_DIR}/${entry.path}`);
          const release = validateRelease(raw);
          if (!release) {
            console.error(`[trust] release file failed validation: ${entry.path}`);
            return null;
          }
          return {
            release,
            version: entry.version,
            date: entry.date,
            path: entry.path,
          };
        } catch (err) {
          console.error(`[trust] failed to load ${entry.path}:`, err);
          return null;
        }
      }),
    ),
    fetchGates(),
  ]);

  const releases = loadedMaybe.filter((r): r is LoadedRelease => r !== null);
  if (releases.length === 0) {
    throw new Error("no valid trust releases could be loaded");
  }

  return { releases, gates };
}

// --- Small helpers used by the page ----------------------------------------

/**
 * Apply the site's house style (no em or en dashes) to text transcribed from
 * the published data files, e.g. release notes. Meaning is preserved: a spaced
 * em or en dash joining clauses becomes a comma, and an en dash inside a numeric
 * range becomes a hyphen. The exact, unedited text is always one click away via
 * each release's linked JSON file. Written with unicode escapes (U+2014 em dash,
 * U+2013 en dash) so no literal dash appears in this source or any bundle.
 */
export function houseStyleText(text: string): string {
  return text
    .replace(/\s+[\u2014\u2013]\s+/g, ", ")
    .replace(/\u2014/g, ", ")
    .replace(/\u2013/g, "-");
}

/** Normalize a loaded release's notes to house style, leaving all else untouched. */
export function withHouseStyleNotes(release: TrustRelease): TrustRelease {
  if (!release.notes) return release;
  return { ...release, notes: release.notes.map(houseStyleText) };
}

/** Format a 0..1 fraction as a percentage string, one decimal, trailing .0 dropped. */
export function formatPct(v: number, digits = 1): string {
  const pct = v * 100;
  const rounded = Number(pct.toFixed(digits));
  return `${Number.isInteger(rounded) ? rounded : rounded.toFixed(digits)}%`;
}

/**
 * The metric value for a given configuration and language selection. Returns
 * null when the metric is absent (a 1.0 file asked for a 1.1 metric) or was
 * unmeasurable for that language.
 */
export function metricValue(
  config: Configuration,
  language: string,
  key: MetricKey,
): number | null {
  if (language === "aggregate") return config.metrics.aggregate[key] ?? null;
  const row = config.metrics.per_language.find((l) => l.language === language);
  if (!row) return null;
  return row[key] ?? null;
}

/**
 * A table cell in the explorer, keeping the three kinds of "no number"
 * distinct so the page can say why a number is missing instead of a generic
 * dash of ignorance:
 * - "absent": never published for this selection (the configuration or
 *   language is not in the release, or the file predates the metric's schema).
 * - "unmeasured": published as null, meaning the run had no cases to measure.
 * - "value": a real measured number.
 */
export type MetricCell =
  | { kind: "value"; value: number }
  | { kind: "unmeasured" }
  | { kind: "absent" };

export function metricCell(
  config: Configuration | undefined,
  language: string,
  key: MetricKey,
): MetricCell {
  if (!config) return { kind: "absent" };
  if (language === "aggregate") {
    const v = config.metrics.aggregate[key];
    return v === undefined ? { kind: "absent" } : { kind: "value", value: v };
  }
  const row = config.metrics.per_language.find((l) => l.language === language);
  if (!row) return { kind: "absent" };
  const v = row[key];
  if (v === undefined) return { kind: "absent" };
  if (v === null) return { kind: "unmeasured" };
  return { kind: "value", value: v };
}

/**
 * How widely a configuration is covered by the loaded releases: the count it
 * appears in, the total loaded, and the versions of its oldest and newest
 * appearances (releases arrive newest first). Used to disclose sparsity up
 * front, e.g. a configuration first measured in the latest release.
 */
export function configCoverage(
  releases: LoadedRelease[],
  configId: string,
): { measured: number; total: number; first: string | null; latest: string | null } {
  let measured = 0;
  let first: string | null = null;
  let latest: string | null = null;
  for (const r of releases) {
    if (r.release.configurations.some((c) => c.id === configId)) {
      measured += 1;
      if (latest === null) latest = r.version;
      first = r.version;
    }
  }
  return { measured, total: releases.length, first, latest };
}

/**
 * The oldest loaded release published under schema 1.1 or later, i.e. the
 * release the additive metrics first appear in. Null when every loaded file
 * is still on 1.0.
 */
export function firstV11Version(releases: LoadedRelease[]): string | null {
  let first: string | null = null;
  for (const r of releases) {
    const minor = Number(r.release.schema_version.split(".")[1]);
    if (Number.isFinite(minor) && minor >= 1) first = r.version;
  }
  return first;
}

/** Fill a content-module template like "measured in {n} of {m}" with values. */
export function fillTemplate(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, name) =>
    name in vars ? String(vars[name]) : match,
  );
}

/** The gate floor for the current language selection, if one is published. */
export function gateFloor(
  gates: Gates | null,
  language: string,
  key: MetricKey,
): number | undefined {
  if (!gates) return undefined;
  if (language === "aggregate") return gates.aggregate[key];
  return gates.perLanguage[language]?.[key];
}

/** True when any loaded release carries this metric for this configuration. */
export function metricPresent(
  releases: LoadedRelease[],
  configId: string,
  key: MetricKey,
): boolean {
  for (const { release } of releases) {
    const config = release.configurations.find((c) => c.id === configId);
    if (!config) continue;
    if (config.metrics.aggregate[key] !== undefined) return true;
    for (const row of config.metrics.per_language) {
      if (row[key] !== undefined && row[key] !== null) return true;
    }
  }
  return false;
}

/** Configuration ids that appear anywhere in the loaded releases, first-seen order. */
export function configurationIds(releases: LoadedRelease[]): string[] {
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const { release } of releases) {
    for (const config of release.configurations) {
      if (!seen.has(config.id)) {
        seen.add(config.id);
        ids.push(config.id);
      }
    }
  }
  return ids;
}

/** Languages present for a configuration across releases, plus the aggregate pseudo-language. */
export function languageOptions(
  releases: LoadedRelease[],
  configId: string,
): string[] {
  const seen = new Set<string>();
  for (const { release } of releases) {
    const config = release.configurations.find((c) => c.id === configId);
    if (!config) continue;
    for (const l of config.metrics.per_language) seen.add(l.language);
  }
  return [...seen, "aggregate"];
}
