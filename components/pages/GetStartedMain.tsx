import Link from "next/link";
import { ArrowRight, Check, Download } from "lucide-react";
import type { GetStartedContent } from "@/content/en/get-started";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StepsRow } from "@/components/conversion";
import ContactPilot from "@/components/ContactPilot";
import Reveal from "@/components/Reveal";

/** The get-started page body, shared by every locale. */

function OfferCards({ c }: { c: GetStartedContent }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {c.offers.map((offer, i) => (
        <Reveal key={offer.name} delay={0.04 * i} className="h-full">
          <div
            className={`flex h-full flex-col rounded-3xl border p-6 ${
              offer.highlight
                ? "border-brand-teal bg-white shadow-lg shadow-brand-teal/10"
                : "border-brand-navy/10 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-title text-brand-navy">{offer.name}</h3>
              {offer.highlight && (
                <span className="rounded-full bg-brand-teal/15 px-2.5 py-0.5 text-xs font-semibold text-brand-teal-ink">
                  {offer.highlight}
                </span>
              )}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/70">
              {offer.positioning}
            </p>
            <ul className="mt-4 flex-1 space-y-2.5">
              {offer.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-sm leading-snug text-brand-navy/80">
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
            <div className="mt-5">
              {offer.cta.kind === "primary" ? (
                <ButtonLink href={offer.cta.href} variant="primary" className="w-full">
                  {offer.cta.label}
                </ButtonLink>
              ) : offer.cta.kind === "secondary" ? (
                <ButtonLink href={offer.cta.href} variant="secondary" className="w-full">
                  {offer.cta.label}
                </ButtonLink>
              ) : (
                <Link
                  href={offer.cta.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
                >
                  {offer.cta.label}
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function GetStartedMain({
  c,
  email,
}: {
  c: GetStartedContent;
  email: string;
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
            <ButtonLink href="#contact" variant="primary">
              {c.contact.submitLabel}
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

      {/* What happens next */}
      <Section tone="surface">
        <h2 className="text-headline text-balance text-brand-navy">{c.stepsHeading}</h2>
        <div className="mt-8">
          <StepsRow steps={c.steps} />
        </div>
      </Section>

      {/* Offer cards */}
      <Section>
        <h2 className="text-headline text-balance text-brand-navy">{c.offersHeading}</h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-brand-navy/75">
          {c.offersSub}
        </p>
        <div className="mt-8">
          <OfferCards c={c} />
        </div>

        {/* Services beyond deployment, argued in full on /open-source. */}
        <div className="mt-8 rounded-3xl border border-brand-navy/10 bg-surface p-6 sm:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-navy/60">
            {c.alsoFrom.heading}
          </h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {c.alsoFrom.items.map((item) => (
              <div key={item.title}>
                <h4 className="font-semibold text-brand-navy">{item.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/75">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <Link
            href={c.alsoFrom.link.href}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
          >
            {c.alsoFrom.link.label}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-brand-navy/65">
          {c.languagesNote}
        </p>
      </Section>

      {/* FAQ */}
      <Section tone="surface">
        <h2 className="text-headline text-balance text-brand-navy">{c.faqHeading}</h2>
        <div className="mt-6 max-w-3xl divide-y divide-brand-navy/10 border-y border-brand-navy/10">
          {c.faq.map((item) => (
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
      </Section>

      {/* Conversion module ends the page */}
      <ContactPilot
        email={email}
        heading={c.contact.heading}
        sub={c.contact.sub}
        steps={c.contact.steps}
        chips={c.contact.chips}
        nameLabel={c.contact.nameLabel}
        emailLabel={c.contact.emailLabel}
        messageLabel={c.contact.messageLabel}
        messagePlaceholder={c.contact.messagePlaceholder}
        submitLabel={c.contact.submitLabel}
        sendingLabel={c.contact.sendingLabel}
        sentTitle={c.contact.sentTitle}
        sentBody={c.contact.sentBody}
        errorBody={c.contact.errorBody}
        directLine={c.contact.directLine}
      />
    </main>
  );
}
