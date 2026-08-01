import { statSync } from "node:fs";
import { join } from "node:path";
import { Download, ExternalLink } from "lucide-react";
import type { WhitepaperContent, WhitepaperMeta } from "@/lib/content-loader";
import type { SiteContent } from "@/content/types";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand, IconGrid } from "@/components/conversion";
import { PaperCoverMock } from "@/components/mockups";
import CopyCommandButton from "@/components/CopyCommandButton";
import Reveal from "@/components/Reveal";

/**
 * The whitepaper page body, shared by every locale. The paper itself is
 * one real English-language artifact; its title, DOI, and citation stay
 * verbatim in every locale. File size is read from disk at build time,
 * so the stated size cannot drift.
 */
function fileSizeLabel(file: string): string {
  const bytes = statSync(join(process.cwd(), "public", file)).size;
  return `${Math.round(bytes / 1024)} KB`;
}

export default function WhitepaperMain({
  content,
  meta,
  site,
  cta,
}: {
  content: WhitepaperContent;
  meta: WhitepaperMeta;
  site: SiteContent;
  cta: { label: string; href: string };
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: meta.paperTitle,
    description: content.metaDescription,
    author: { "@type": "Person", name: meta.authorLine },
    datePublished: "2026-07-29",
    identifier: meta.doiUrl,
    url: `${site.url}${meta.file}`,
    encodingFormat: "application/pdf",
    inLanguage: "en",
    license: "https://creativecommons.org/licenses/by/4.0/",
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main">
        {/* Hero with the paper as the artifact */}
        <div className="border-b border-brand-navy/10 bg-white pb-14 pt-32 sm:pt-36">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-brand-teal-ink">
                  {content.eyebrow}
                </p>
                <h1 className="text-display mt-4 text-balance text-brand-navy">
                  {content.headline}
                </h1>
                <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-brand-navy/75">
                  {content.lede}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={meta.file}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-navy-deep"
                  >
                    <Download size={16} strokeWidth={1.75} aria-hidden="true" />
                    {meta.downloadCta}
                    <span className="text-white/70">PDF, {fileSizeLabel(meta.file)}</span>
                  </a>
                  <a
                    href={meta.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
                  >
                    {meta.recordLabel}
                    <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </div>
              </div>
              <Reveal delay={0.1}>
                <PaperCoverMock
                  title={meta.paperTitle}
                  subtitle={meta.paperSubtitle}
                  author={meta.authorLine}
                  date={meta.dateLine}
                  chip={meta.statusChip}
                />
              </Reveal>
            </div>
          </Container>
        </div>

        {/* The argument */}
        <Section tone="surface">
          <h2 className="text-headline text-balance text-brand-navy">
            {content.argument.heading}
          </h2>
          {content.argument.paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="mt-4 max-w-2xl text-pretty leading-relaxed text-brand-navy/75"
            >
              {p}
            </p>
          ))}
        </Section>

        {/* What it covers */}
        <Section>
          <h2 className="text-headline text-balance text-brand-navy">
            {content.covers.heading}
          </h2>
          <div className="mt-8">
            <IconGrid items={content.covers.items} />
          </div>
        </Section>

        {/* Citation */}
        <Section tone="surface">
          <div className="max-w-3xl rounded-3xl border border-brand-navy/10 bg-white p-7 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-title text-brand-navy">
                {meta.citationHeading}
              </h2>
              <CopyCommandButton
                command={meta.citation}
                label={meta.copyCitationLabel}
                copiedLabel={meta.copiedLabel}
              />
            </div>
            <p className="mt-3 rounded-xl bg-surface p-4 font-mono text-xs leading-relaxed text-brand-navy/80">
              {meta.citation}
            </p>
            <p className="mt-3 text-xs text-brand-navy/60">
              DOI {meta.doi} · {meta.citationLicense}
            </p>
          </div>
        </Section>

        <CtaBand
          heading={meta.closingHeading}
          secondary={{ label: meta.downloadCta, href: meta.file }}
          primaryLabel={cta.label}
          primaryHref={cta.href}
        />
      </main>
    </>
  );
}
