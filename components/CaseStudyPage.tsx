import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy, CsFinding } from "@/content/en/case-studies";
import type { Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import type { CsSharedContent } from "@/lib/content-loader";
import { getCommon } from "@/lib/content-loader";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  ChainMock,
  FindingMock,
  ReportLinesMock,
  SummaryMock,
  SuppressionMock,
} from "@/components/mockups";
import Reveal from "@/components/Reveal";
import ChatDemo from "@/components/ChatDemo";

function Mock({ item }: { item: CsFinding }) {
  const m = item.mock;
  switch (m.kind) {
    case "finding":
      return <FindingMock claims={m.claims} chip={m.chip} />;
    case "chain":
      return <ChainMock oldClaim={m.oldClaim} newClaim={m.newClaim} note={m.note} />;
    case "report":
      return <ReportLinesMock lines={m.lines} />;
    case "suppression":
      return <SuppressionMock rows={m.rows} note={m.note} />;
  }
}

function Kicker({ text }: { text: string }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal-ink">
      {text}
    </p>
  );
}

/**
 * One case study in the approved anatomy: Z-pattern, one primary action.
 * Content arrives as props so the component is locale-agnostic; `locale`
 * shapes sibling links and the JSON-LD URLs.
 */
export default function CaseStudyPage({
  study,
  studies,
  shared,
  breadcrumbLabel,
  locale,
}: {
  study: CaseStudy;
  studies: CaseStudy[];
  shared: CsSharedContent;
  breadcrumbLabel: string;
  locale: Locale;
}) {
  const { site } = getCommon(locale);
  const mailto = `mailto:${shared.contactEmail}?subject=${encodeURIComponent(study.closing.subject)}`;
  const siblings = studies.filter((s) => s.slug !== study.slug);
  const pageUrl = `${site.url}${localeHref(locale, `/case-studies/${study.slug}`)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: breadcrumbLabel,
            item: `${site.url}${localeHref(locale, "/case-studies")}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: study.industryLabel,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Article",
        headline: study.metaTitle,
        description: study.metaDescription,
        author: { "@type": "Organization", name: site.name, url: site.url },
        publisher: { "@type": "Organization", name: site.name, url: site.url },
        mainEntityOfPage: pageUrl,
        image: `${site.url}/og/case-${study.slug}.png`,
      },
      {
        "@type": "FAQPage",
        mainEntity: study.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <div className="border-b border-brand-navy/10 bg-white pb-14 pt-32 sm:pt-36">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <Kicker text={study.industryLabel} />
              <h1 className="text-display mt-4 text-balance text-brand-navy">
                {study.headline}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-brand-navy/75">
                {study.subhead}
              </p>
              <div className="mt-8">
                <ButtonLink href={mailto} variant="primary" external>
                  {shared.closingCta}
                </ButtonLink>
              </div>
            </div>
            <Reveal delay={0.1}>
              <FindingMock claims={study.heroMock.claims} chip={study.heroMock.chip} />
            </Reveal>
          </div>
        </Container>
      </div>

      {/* 2. The situation */}
      <Section tone="surface">
        <Kicker text={shared.situationKicker} />
        <h2 className="text-headline mt-3 text-balance text-brand-navy">
          {study.situation.heading}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {study.situation.pains.map((pain, i) => (
            <Reveal key={pain.title} delay={0.04 * i} className="h-full">
              <div className="h-full rounded-2xl border border-brand-navy/10 bg-white p-6">
                <h3 className="text-title text-brand-navy">{pain.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-brand-navy/75">
                  {pain.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. The run */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Kicker text={shared.runKicker} />
            <h2 className="text-headline mt-3 text-balance text-brand-navy">
              {study.run.heading}
            </h2>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-brand-navy/75">
              {study.run.intro}
            </p>
            <ol className="mt-6 space-y-3">
              {study.run.steps.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-brand-navy/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-semibold text-white">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <Reveal delay={0.08}>
            <SummaryMock title={study.run.summaryTitle} rows={study.run.summary} />
          </Reveal>
        </div>
      </Section>

      {/* 4. The findings */}
      <div className="bg-brand-navy-deep">
        <Container className="py-14 sm:py-16">
          <Kicker text={shared.findingsKicker} />
          <h2 className="text-headline mt-3 text-balance text-white">
            {study.findings.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-white/75">
            {study.findings.sub}
          </p>
          <div className="mt-10 space-y-12">
            {study.findings.items.map((item, i) => (
              <div
                key={item.intro}
                className={`grid items-center gap-8 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/85">
                  {item.intro}
                </p>
                <Reveal delay={0.06}>
                  <Mock item={item} />
                </Reveal>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Then you ask: the scripted chat replay */}
      <Section tone="surface">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-brand-teal-ink">
          {shared.chatKicker}
        </p>
        <div className="mt-8">
          <ChatDemo exchanges={study.chat} ui={shared.chatUi} />
        </div>
      </Section>

      {/* 5. What it means for you */}
      <Section>
        <Kicker text={shared.outcomesKicker} />
        <h2 className="text-headline mt-3 text-balance text-brand-navy">
          {study.outcomes.heading}
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {study.outcomes.cards.map((card, i) => (
            <Reveal key={card.title} delay={0.04 * i} className="h-full">
              <div className="h-full rounded-2xl border border-brand-navy/10 bg-surface/60 p-6">
                <h3 className="text-title text-brand-navy">{card.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-brand-navy/75">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        {study.outcomes.boundary && (
          <p className="mt-6 max-w-2xl rounded-2xl border border-brand-navy/15 bg-surface p-4 text-sm leading-relaxed text-brand-navy/80">
            {study.outcomes.boundary}
          </p>
        )}
        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-navy/60">
            {shared.deploymentHeading}
          </h3>
          <ul className="mt-3 grid gap-3 md:grid-cols-3">
            {study.outcomes.deployment.map((line) => (
              <li
                key={line}
                className="border-l-2 border-brand-teal/60 pl-3 text-sm leading-relaxed text-brand-navy/80"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {shared.proofLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
            >
              {link.label}
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </Section>

      {/* 6. FAQ */}
      <Section tone="surface">
        <Kicker text={shared.faqKicker} />
        <div className="mt-4 max-w-3xl divide-y divide-brand-navy/10 border-y border-brand-navy/10">
          {study.faq.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-brand-navy [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-brand-navy/40 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-navy/75">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-10">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-navy/60">
            {shared.siblingsHeading}
          </h3>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={localeHref(locale, `/case-studies/${s.slug}`)}
                className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
              >
                {s.navLabel}
                <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. Closing CTA */}
      <div className="bg-brand-navy-deep">
        <Container className="py-16 sm:py-20">
          <h2 className="text-headline max-w-2xl text-balance text-white">
            {shared.closingHeading}
          </h2>
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-white/75">
            {study.closing.sentence}
          </p>
          <div className="mt-7">
            <ButtonLink
              href={mailto}
              variant="primary"
              external
              className="bg-brand-teal text-brand-navy-deep hover:bg-brand-teal/90"
            >
              {shared.closingCta}
            </ButtonLink>
          </div>
        </Container>
      </div>
    </main>
  );
}
