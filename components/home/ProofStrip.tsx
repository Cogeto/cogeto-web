import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeContent } from "@/content/en/home";
import type { TrustContent } from "@/content/en/trust";
import { Section } from "@/components/ui/Container";
import { fetchTrustData, formatPct, type MetricKey } from "@/lib/trust";

/** The aggregate metrics shown on the homepage, lowest score included on purpose. */
const STRIP_KEYS: MetricKey[] = [
  "extraction_precision",
  "extraction_recall",
  "verification_agreement",
  "contradiction_recall",
];

/**
 * Live proof strip: numbers read server-side from the same published
 * per-release files as /trust, revalidated hourly. If the data cannot be
 * read at build or revalidation time the section renders nothing rather
 * than a stale hardcoded number; the trust page keeps serving its last
 * good version independently.
 */
export default async function ProofStrip({
  content,
  trustLabels,
}: {
  content: HomeContent["proof"];
  trustLabels: TrustContent;
}) {
  let data;
  try {
    data = await fetchTrustData();
  } catch {
    return null;
  }
  const current = data.releases[0];
  const config = current.release.configurations[0];
  if (!config) return null;

  return (
    <Section id="proof">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal-ink">
          {content.kicker}
        </p>
        <h2 className="text-headline mt-3 text-balance text-brand-navy">
          {content.title}
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-brand-navy/75">
          {content.intro}
        </p>
      </div>

      <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STRIP_KEYS.map((key) => {
          const value = config.metrics.aggregate[key];
          if (value === undefined) return null;
          return (
            <div
              key={key}
              className="rounded-2xl border border-brand-navy/10 bg-surface p-5"
            >
              <dd className="text-3xl font-semibold tabular-nums text-brand-navy">
                {formatPct(value)}
              </dd>
              <dt className="mt-1 text-sm text-brand-navy/70">
                {trustLabels.metrics[key].label}
              </dt>
            </div>
          );
        })}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
        <span className="text-brand-navy/60">
          {content.releaseLabel} {current.version}, {current.date}
        </span>
        <Link
          href={content.linkHref}
          className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
        >
          {content.linkLabel}
          <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
