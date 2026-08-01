import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeContent } from "@/content/en/home";
import { Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import RotatingWords from "@/components/RotatingWords";
import Reveal from "@/components/Reveal";

/** Shared section heading: kicker plus headline, one geometry everywhere. */
function Heading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal-ink">
        {kicker}
      </p>
      <h2 className="text-headline mt-3 text-balance text-brand-navy">{title}</h2>
    </div>
  );
}

export function Sovereignty({
  content,
}: {
  content: HomeContent["sovereignty"];
}) {
  return (
    <Section tone="navy" id="sovereignty">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal">
          {content.kicker}
        </p>
        <h2 className="text-headline mt-3 text-balance text-white">{content.title}</h2>
        <p className="mt-4 text-lg text-white/85">
          {content.deployPrefix}{" "}
          <RotatingWords
            words={content.deployRotator}
            className="font-semibold text-brand-teal"
          />{" "}
          {content.deploySuffix}
        </p>
      </Reveal>
      <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((item, i) => (
          <Reveal key={item.title} delay={0.05 * i}>
            <h3 className="text-title text-white">{item.title}</h3>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-white/75">
              {item.text}
            </p>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6">
        <p className="max-w-2xl text-sm leading-relaxed text-white/80">
          {content.companyLine}
        </p>
        <Link
          href={content.linkHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:underline"
        >
          {content.linkLabel}
          <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}

export function GettingStarted({
  content,
}: {
  content: HomeContent["gettingStarted"];
}) {
  return (
    <Section id="getting-started" tone="surface">
      <Heading kicker={content.kicker} title={content.title} />
      <ol className="mt-10 grid gap-4 md:grid-cols-3">
        {content.steps.map((step, i) => (
          <Reveal key={step.title} delay={0.05 * i} className="h-full">
            <li className="h-full rounded-2xl border border-brand-navy/10 bg-white p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-teal/15 text-sm font-semibold text-brand-teal-ink">
                {i + 1}
              </span>
              <h3 className="text-title mt-3 text-brand-navy">{step.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-brand-navy/75">
                {step.text}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <ButtonLink href={content.cta.href} variant="primary">
          {content.cta.label}
        </ButtonLink>
        <Link
          href={content.docsLink.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
        >
          {content.docsLink.label}
          <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-brand-navy/70">
        {content.selfHostNote}
      </p>
    </Section>
  );
}
