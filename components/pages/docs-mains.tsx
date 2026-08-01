import type {
  DocsIndexContent,
  DocsOfflineContent,
  DocsQuickstartContent,
  DocsSelfHostedContent,
  DocsUiContent,
} from "@/lib/content-loader";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CodeBlock, DocLinks, DocSteps, PathCards, WarnCallout } from "@/components/docs";
import { CtaBand } from "@/components/conversion";

/**
 * The four docs page bodies, shared by every locale. Content and the
 * small interface chrome (copy-button labels) arrive as props; commands
 * themselves are verbatim in every language.
 */

function DocsHero({ c }: { c: { eyebrow: string; headline: string; lede: string } }) {
  return (
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
  );
}

export function DocsIndexMain({ c }: { c: DocsIndexContent }) {
  return (
    <main id="main">
      <DocsHero c={c} />

      <Section tone="surface">
        <PathCards paths={c.paths} />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-brand-navy-deep p-6 sm:p-8">
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-white/85">
            {c.hostedNote}
          </p>
          <ButtonLink
            href={c.hostedCta.href}
            variant="primary"
            className="bg-brand-teal text-brand-navy-deep hover:bg-brand-teal/90"
          >
            {c.hostedCta.label}
          </ButtonLink>
        </div>
      </Section>

      <Section>
        <p className="max-w-2xl text-pretty text-sm leading-relaxed text-brand-navy/70">
          {c.authorityNote}
        </p>
        <DocLinks links={c.authorityLinks.map((l) => ({ ...l, external: true }))} />
      </Section>
    </main>
  );
}

export function DocsQuickstartMain({
  c,
  ui,
  cta,
}: {
  c: DocsQuickstartContent;
  ui: DocsUiContent;
  cta: { label: string; href: string };
}) {
  return (
    <main id="main">
      <DocsHero c={c} />

      <Section tone="surface">
        <h2 className="text-headline text-brand-navy">{c.prerequisites.heading}</h2>
        <ul className="mt-5 max-w-2xl space-y-3">
          {c.prerequisites.items.map((item) => (
            <li
              key={item.slice(0, 40)}
              className="rounded-xl border border-brand-navy/10 bg-white p-4 text-sm leading-relaxed text-brand-navy/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <DocSteps steps={c.steps} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
      </Section>

      <Section tone="surface">
        <h2 className="text-headline text-brand-navy">{c.demo.heading}</h2>
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-brand-navy/75">
          {c.demo.text}
        </p>
        <CodeBlock command={c.demo.command} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
        <CodeBlock command={c.demo.logCommand} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
      </Section>

      <Section>
        <h2 className="text-headline text-brand-navy">{c.troubleshooting.heading}</h2>
        <div className="mt-5 max-w-3xl divide-y divide-brand-navy/10 border-y border-brand-navy/10">
          {c.troubleshooting.items.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-brand-navy [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="text-brand-navy/40 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-navy/75">
                {item.a}
              </p>
            </details>
          ))}
        </div>
        <WarnCallout text={c.warn} />
      </Section>

      <Section tone="surface">
        <h2 className="text-headline text-brand-navy">{c.next.heading}</h2>
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-brand-navy/75">
          {c.next.text}
        </p>
        <DocLinks links={c.next.links} />
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

export function DocsSelfHostedMain({
  c,
  ui,
  cta,
}: {
  c: DocsSelfHostedContent;
  ui: DocsUiContent;
  cta: { label: string; href: string };
}) {
  return (
    <main id="main">
      <DocsHero c={c} />

      <Section tone="surface">
        <h2 className="text-headline text-brand-navy">{c.model.heading}</h2>
        <ul className="mt-5 grid max-w-4xl gap-3 sm:grid-cols-2">
          {c.model.items.map((item) => (
            <li
              key={item.slice(0, 40)}
              className="rounded-xl border border-brand-navy/10 bg-white p-4 text-sm leading-relaxed text-brand-navy/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-headline text-brand-navy">{c.prerequisites.heading}</h2>
        <ul className="mt-5 max-w-2xl space-y-3">
          {c.prerequisites.items.map((item) => (
            <li
              key={item.slice(0, 40)}
              className="rounded-xl border border-brand-navy/10 bg-surface p-4 text-sm leading-relaxed text-brand-navy/80"
            >
              {item}
            </li>
          ))}
        </ul>
        <DocSteps steps={c.steps} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
      </Section>

      <Section tone="surface">
        <h2 className="text-headline text-brand-navy">{c.upgrades.heading}</h2>
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-brand-navy/75">
          {c.upgrades.text}
        </p>
        <CodeBlock command={c.upgrades.command} copyLabel={ui.copyLabel} copiedLabel={ui.copiedLabel} />
      </Section>

      <Section>
        <h2 className="text-headline text-brand-navy">{c.notThis.heading}</h2>
        <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-brand-navy/75">
          {c.notThis.text}
        </p>
        <DocLinks links={c.notThis.links} />
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

export function DocsOfflineMain({
  c,
  cta,
}: {
  c: DocsOfflineContent;
  cta: { label: string; href: string };
}) {
  return (
    <main id="main">
      <DocsHero c={c} />

      <Section tone="surface">
        <h2 className="text-headline text-brand-navy">{c.what.heading}</h2>
        <ul className="mt-5 grid max-w-4xl gap-3 sm:grid-cols-2">
          {c.what.items.map((item) => (
            <li
              key={item.slice(0, 40)}
              className="rounded-xl border border-brand-navy/10 bg-white p-4 text-sm leading-relaxed text-brand-navy/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-headline text-brand-navy">{c.seam.heading}</h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-brand-navy/75">
          {c.seam.text}
        </p>
        <DocLinks links={c.seam.links} />
      </Section>

      <Section tone="surface">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-brand-navy/10 bg-white p-7">
            <h2 className="text-title text-brand-navy">{c.bundle.heading}</h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-navy/75">
              {c.bundle.text}
            </p>
          </div>
          <div className="rounded-3xl border border-brand-navy/10 bg-white p-7">
            <h2 className="text-title text-brand-navy">{c.quality.heading}</h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-brand-navy/75">
              {c.quality.text}
            </p>
            <DocLinks links={c.quality.links} />
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
