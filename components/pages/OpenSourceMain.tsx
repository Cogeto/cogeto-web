import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { OpenSourceContent } from "@/lib/content-loader";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BadgeGrid, CtaBand } from "@/components/conversion";
import { LicenseMock } from "@/components/mockups";
import Reveal from "@/components/Reveal";

/** The open-source page body, shared by every locale. */
export default function OpenSourceMain({
  c,
  cta,
}: {
  c: OpenSourceContent;
  cta: { label: string; href: string };
}) {
  return (
    <main id="main">
      {/* Hero with the license as the artifact */}
      <div className="border-b border-brand-navy/10 bg-white pb-14 pt-32 sm:pt-36">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-brand-teal-ink">
                {c.eyebrow}
              </p>
              <h1 className="text-display mt-4 text-balance text-brand-navy">
                {c.headline}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-brand-navy/75">
                {c.lede}
              </p>
              <div className="mt-8">
                <ButtonLink href={cta.href} variant="primary">
                  {cta.label}
                </ButtonLink>
              </div>
            </div>
            <Reveal delay={0.1}>
              <LicenseMock />
            </Reveal>
          </div>
        </Container>
      </div>

      {/* If the code is free, why pay */}
      <Section tone="surface">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-headline text-balance text-brand-navy">
              {c.whyPay.heading}
            </h2>
            {c.whyPay.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mt-4 max-w-xl text-pretty leading-relaxed text-brand-navy/80"
              >
                {p}
              </p>
            ))}
          </div>
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-brand-navy/10 bg-white p-7">
              <h3 className="text-title text-brand-navy">{c.whyPay.openCard.name}</h3>
              <ul className="mt-4 space-y-2.5">
                {c.whyPay.openCard.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-brand-navy/80"
                  >
                    <Check
                      size={15}
                      strokeWidth={2.25}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-brand-teal-ink"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The verbatim pull quote */}
      <div className="bg-brand-navy-deep">
        <Container className="py-14 sm:py-16">
          <p className="mx-auto max-w-4xl text-balance text-center text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {c.quote}
          </p>
        </Container>
      </div>

      {/* The five offers */}
      <Section>
        <h2 className="text-headline text-balance text-brand-navy">
          {c.offers.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-brand-navy/75">
          {c.offers.sub}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.offers.items.map((offer, i) => (
            <Reveal key={offer.title} delay={0.04 * i} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-brand-navy/10 bg-surface/60 p-6">
                <h3 className="text-title text-brand-navy">{offer.title}</h3>
                <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-brand-navy/75">
                  {offer.text}
                </p>
                {offer.link && (
                  <Link
                    href={offer.link.href}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
                  >
                    {offer.link.label}
                    <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The license does the trust work */}
      <Section tone="surface">
        <h2 className="text-headline max-w-2xl text-balance text-brand-navy">
          {c.why.heading}
        </h2>
        {c.why.paragraphs.map((p) => (
          <p
            key={p.slice(0, 40)}
            className="mt-4 max-w-2xl text-pretty leading-relaxed text-brand-navy/75"
          >
            {p}
          </p>
        ))}
        <ul className="mt-6 grid max-w-4xl gap-3 sm:grid-cols-2">
          {c.why.claims.map((claim) => (
            <li
              key={claim.slice(0, 40)}
              className="rounded-xl border border-brand-navy/10 bg-white p-4 text-sm leading-relaxed text-brand-navy/80"
            >
              {claim}
            </li>
          ))}
        </ul>
      </Section>

      {/* Lock-in, trademark, contributing */}
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {c.cards.map((card, i) => (
            <Reveal key={card.title} delay={0.05 * i} className="h-full">
              <div className="h-full rounded-2xl border border-brand-navy/10 bg-white p-6">
                <h3 className="text-title text-brand-navy">{card.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-brand-navy/75">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Read it yourself */}
      <Section tone="surface">
        <h2 className="text-headline text-balance text-brand-navy">{c.linksHeading}</h2>
        <div className="mt-8">
          <BadgeGrid
            badges={c.links}
            evidenceLabel={c.badgeUi.evidenceLabel}
            detailsLabel={c.badgeUi.detailsLabel}
          />
        </div>
      </Section>

      <CtaBand
        heading={c.cta.heading}
        secondary={c.cta.secondary}
        primaryLabel={cta.label}
        primaryHref={cta.href}
      />
    </main>
  );
}
