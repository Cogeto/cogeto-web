import { statSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import type { ComplianceContent } from "@/lib/compliance";
import { compliancePdfFile } from "@/lib/compliance";
import type { ComplianceUi } from "@/content/en/compliance";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import AccordionSection from "@/components/compliance/AccordionSection";

/**
 * The compliance page body, shared by every locale. Section content comes
 * from the per-locale compliance JSON; the downloadable one-pager PDF is
 * generated from the English JSON only, so localized pages add a small
 * language note under the download button.
 */

/** Read the generated PDF's size at build time so the label never drifts. */
function pdfSizeLabel(): string | null {
  try {
    const p = path.join(process.cwd(), "public", compliancePdfFile.replace(/^\//, ""));
    const bytes = statSync(p).size;
    return bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.max(1, Math.round(bytes / 1024))} KB`;
  } catch {
    return null;
  }
}

export default function ComplianceMain({
  c,
  ui,
  locale,
}: {
  c: ComplianceContent;
  ui: ComplianceUi;
  locale: Locale;
}) {
  const size = pdfSizeLabel();
  const receiptJson = JSON.stringify(c.receipt.value, null, 2);

  return (
    <>
      <main id="main" className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <PageHeader
          eyebrow={c.title}
          title={c.subtitle}
          lede={c.intro}
          meta={
            <p className="mt-3 text-sm text-brand-navy/70">
              {ui.lastUpdatedLabel} {c.updated}
            </p>
          }
        >
          <a
            href={compliancePdfFile}
            download
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-medium text-white transition-colors hover:bg-brand-navy-deep"
          >
            <Download size={18} strokeWidth={1.75} aria-hidden="true" />
            {ui.downloadLabel}
            {size && <span className="font-normal opacity-70">({size})</span>}
          </a>
          {ui.pdfLanguageNote && (
            <p className="mt-2 text-sm text-brand-navy/60">{ui.pdfLanguageNote}</p>
          )}
        </PageHeader>

        {/* Sections: heading and excerpt always visible, full content unfolds on click. */}
        <div className="mt-14 space-y-4">
          {c.sections.map((section) => (
            <AccordionSection
              key={section.id}
              id={section.id}
              heading={section.heading}
              excerpt={section.excerpt}
              badge={section.organisational ? ui.organisationalBadge : undefined}
            >
              <div className="space-y-4">
                {section.body.map((p, i) => (
                  <p key={i} className="text-pretty leading-relaxed text-brand-navy/75">
                    {p}
                  </p>
                ))}
              </div>

              {section.points && (
                <ul className="mt-4 space-y-2.5">
                  {section.points.map((pt) => (
                    <li key={pt.label} className="flex gap-3 text-brand-navy/75">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"
                      />
                      <span className="leading-relaxed">
                        <span className="font-semibold text-brand-navy">{pt.label}:</span>{" "}
                        {pt.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <p className="mt-4 rounded-2xl border-l-2 border-brand-teal bg-surface px-5 py-4 text-sm leading-relaxed text-brand-navy/70">
                  <span className="font-semibold text-brand-navy">
                    {ui.honestLimitationLabel}{" "}
                  </span>
                  {section.note}
                </p>
              )}

              {/* The fictional sample receipt sits under the deletion section. */}
              {section.id === "deletion" && (
                <figure className="mt-6">
                  <figcaption className="text-sm font-semibold text-brand-navy">
                    {c.receipt.caption}
                  </figcaption>
                  <pre className="mt-3 overflow-x-auto rounded-2xl bg-brand-navy-deep p-5 text-xs leading-relaxed text-white/90">
                    <code>{receiptJson}</code>
                  </pre>
                  <figcaption className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                    {c.receipt.note}
                  </figcaption>
                </figure>
              )}

              {/* Export section links to the published schema. */}
              {section.id === "export" && (
                <a
                  href={c.links.passportSchema}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
                >
                  {ui.schemaLinkLabel}
                  <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                </a>
              )}

              {/* Regulatory section cross-links to the live trust page. */}
              {section.id === "regulatory" && (
                <Link
                  href={localeHref(locale, "/trust")}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
                >
                  {ui.trustLinkLabel}
                  <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              )}
            </AccordionSection>
          ))}
        </div>

        {/* Closing */}
        <div className="mt-14 rounded-3xl bg-brand-navy-deep p-8 text-white sm:p-10">
          <p className="text-pretty leading-relaxed text-white/80">{c.closing}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a
              href={c.links.whitepaper}
              className="inline-flex items-center gap-1.5 font-medium text-brand-teal hover:underline"
            >
              <FileText size={15} strokeWidth={1.75} aria-hidden="true" />
              {ui.whitepaperLabel}
            </a>
            <Link
              href={localeHref(locale, "/trust")}
              className="font-medium text-brand-teal hover:underline"
            >
              {ui.trustScoreLabel}
            </Link>
            <a
              href={c.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-brand-teal hover:underline"
            >
              {ui.repoLabel}
              <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>

        <Link
          href={localeHref(locale, "/")}
          className="mt-12 inline-flex items-center gap-2 font-medium text-brand-teal-ink hover:underline"
        >
          <ArrowLeft size={18} strokeWidth={1.75} aria-hidden="true" />
          {ui.backLabel}
        </Link>
      </main>
    </>
  );
}
