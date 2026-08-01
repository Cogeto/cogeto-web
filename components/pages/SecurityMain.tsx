import Link from "next/link";
import { ArrowRight, Download, ExternalLink } from "lucide-react";
import type { SecurityContent } from "@/content/en/security";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BadgeGrid, CtaBand, IconGrid } from "@/components/conversion";
import Reveal from "@/components/Reveal";

/** The security page body, shared by every locale. */
export default function SecurityMain({
  c,
  cta,
}: {
  c: SecurityContent;
  cta: { label: string; href: string };
}) {
  return (
    <main id="main">
      {/* Hero */}
      <div className="border-b border-brand-navy/10 bg-white pb-12 pt-32 sm:pt-36">
        <Container>
          <p className="text-sm font-medium uppercase tracking-widest text-brand-teal-ink">
            {c.hero.eyebrow}
          </p>
          <h1 className="text-display mt-4 max-w-3xl text-balance text-brand-navy">
            {c.hero.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-brand-navy/75">
            {c.hero.lede}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href={cta.href} variant="primary">
              {cta.label}
            </ButtonLink>
            <a
              href={c.hero.secondary.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
            >
              <Download size={15} strokeWidth={1.75} aria-hidden="true" />
              {c.hero.secondary.label}
            </a>
          </div>
        </Container>
      </div>

      {/* Badge grid */}
      <Section tone="surface">
        <h2 className="text-headline text-balance text-brand-navy">{c.badgesHeading}</h2>
        <div className="mt-8">
          <BadgeGrid
            badges={c.badges}
            evidenceLabel={c.badgeUi.evidenceLabel}
            detailsLabel={c.badgeUi.detailsLabel}
          />
        </div>
      </Section>

      {/* Six mechanisms */}
      <Section>
        <h2 className="text-headline text-balance text-brand-navy">
          {c.highlightsHeading}
        </h2>
        <div className="mt-8">
          <IconGrid columns={3} items={c.highlights} />
        </div>
      </Section>

      {/* Control clusters */}
      <Section tone="surface">
        <h2 className="text-headline text-balance text-brand-navy">{c.clustersHeading}</h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-brand-navy/75">
          {c.clustersSub}
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {c.clusters.map((cluster, i) => (
            <Reveal key={cluster.title} delay={0.05 * i} className="h-full">
              <div className="h-full rounded-2xl border border-brand-navy/10 bg-white p-6">
                <h3 className="text-title text-brand-navy">{cluster.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {cluster.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="border-l-2 border-brand-teal/60 pl-3 text-sm leading-relaxed text-brand-navy/80"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Named audit block + company block */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-brand-navy/10 bg-white p-8">
            <h2 className="text-title text-brand-navy">{c.audit.heading}</h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-navy/75">
              {c.audit.text}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {c.audit.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
                >
                  {link.label}
                  <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-brand-navy-deep p-8 text-white">
            <h2 className="text-title text-white">{c.company.heading}</h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-white/80">
              {c.company.text}
            </p>
          </div>
        </div>

        {/* Artifacts row */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-navy/60">
            {c.artifactsHeading}
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {c.artifacts.map((artifact) =>
              artifact.external ? (
                <a
                  key={artifact.href}
                  href={artifact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
                >
                  {artifact.label}
                  <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                </a>
              ) : (
                <Link
                  key={artifact.href}
                  href={artifact.href}
                  className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
                >
                  {artifact.label}
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </Link>
              ),
            )}
          </div>
        </div>
      </Section>

      <CtaBand
        heading={c.cta.heading}
        sub={c.cta.sub}
        secondary={c.cta.secondary}
        primaryLabel={cta.label}
        primaryHref={cta.href}
      />
    </main>
  );
}
