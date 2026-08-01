import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import { getCommon } from "@/lib/content-loader";
import type { TrustContent } from "@/content/en/trust";
import type { TrustData } from "@/lib/trust";
import { repoLinks } from "@/lib/trust";
import TrustExplorer from "@/components/trust/TrustExplorer";
import Provenance from "@/components/trust/Provenance";
import PageHeader from "@/components/PageHeader";

/**
 * The trust-scores page body, shared by every locale. The route fetches
 * the published data (ISR) and passes it in with the locale's labels.
 */
export default function TrustMain({
  data,
  t,
  locale,
}: {
  data: TrustData;
  t: TrustContent;
  locale: Locale;
}) {
  const { site } = getCommon(locale);
  const current = data.releases[0];

  // Structured data for search and AI crawlers: this is a published,
  // versioned dataset. The description stays in English on every locale;
  // it describes the English-language data files themselves.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Cogeto trust scores",
    description:
      "Per-release measured extraction, verification, deduplication, contradiction, supersession, and query-rewrite accuracy for Cogeto, per language, against a hand-labeled golden corpus.",
    url: `${site.url}${localeHref(locale, "/trust")}`,
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: site.name, url: site.url },
    version: current.version,
    dateModified: current.date,
    distribution: data.releases.map((r) => ({
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: `https://raw.githubusercontent.com/Cogeto/cogeto/main/eval/trust-scores/${r.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main" className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <PageHeader
          eyebrow={t.eyebrow}
          title={t.title}
          lede={t.thesis}
          meta={
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="rounded-full bg-brand-navy px-3 py-1 font-medium text-white">
                {t.currentReleaseLabel} {current.version}
              </span>
              <span className="text-brand-navy/70">{current.date}</span>
            </div>
          }
        />

        {/* Interactive explorer: selectors, current scores, chat, trends. */}
        <section className="mt-14" aria-label={t.currentHeading}>
          <TrustExplorer releases={data.releases} gates={data.gates} t={t} />
        </section>

        {/* Provenance */}
        <section className="mt-16 border-t border-brand-navy/10 pt-12">
          <Provenance releases={data.releases} t={t} />
        </section>

        {/* Cross-links */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-brand-navy/10 pt-8">
          <Link
            href={localeHref(locale, "/")}
            className="inline-flex items-center gap-2 font-medium text-brand-teal-ink hover:underline"
          >
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
            {t.backHome}
          </Link>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link
              href="/compliance"
              className="font-medium text-brand-navy/70 hover:text-brand-teal-ink"
            >
              {t.complianceLinkLabel}
            </Link>
            <a
              href={repoLinks.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-brand-navy/70 hover:text-brand-teal-ink"
            >
              {t.sourceLinkLabel}
              <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
