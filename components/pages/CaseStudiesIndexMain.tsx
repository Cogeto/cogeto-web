import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseIndexContent, CsSharedContent } from "@/lib/content-loader";
import { Container, Section } from "@/components/ui/Container";
import { CtaBand } from "@/components/conversion";
import Reveal from "@/components/Reveal";

/** The case-studies index body, shared by every locale. */
export default function CaseStudiesIndexMain({
  index,
  shared,
  cta,
}: {
  index: CaseIndexContent;
  shared: CsSharedContent;
  cta: { label: string; href: string };
}) {
  const c = index;
  return (
    <main id="main">
      <div className="border-b border-brand-navy/10 bg-white pb-12 pt-32 sm:pt-36">
        <Container>
          <p className="text-sm font-medium uppercase tracking-widest text-brand-teal-ink">
            {c.eyebrow}
          </p>
          <h1 className="text-display mt-4 max-w-3xl text-balance text-brand-navy">
            {c.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-brand-navy/75">
            {c.lede}
          </p>
        </Container>
      </div>

      <Section tone="surface">
        <div className="grid gap-4 md:grid-cols-2">
          {c.cards.map((card, i) => (
            <Reveal key={card.href} delay={0.04 * i} className="h-full">
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-3xl border border-brand-navy/10 bg-white p-7 transition-colors hover:border-brand-teal-ink/40"
              >
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal-ink">
                  {card.industryLabel}
                </p>
                <h2 className="text-title mt-3 text-brand-navy">{card.pain}</h2>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-brand-navy/75">
                  {card.outcome}
                </p>
                <p className="mt-4 w-fit rounded-full bg-surface-deep px-3 py-1 text-xs font-medium tabular-nums text-brand-navy/70">
                  {card.metric}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink">
                  {shared.readCta}
                  <ArrowRight
                    size={15}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        heading={shared.closingHeading}
        sub={shared.indexCtaSub}
        secondary={shared.proofLinks[0]}
        primaryLabel={cta.label}
        primaryHref={cta.href}
      />
    </main>
  );
}
