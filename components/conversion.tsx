import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  ExternalLink,
  FileSignature,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import Reveal from "@/components/Reveal";
import { formatPct } from "@/lib/trust";

/**
 * band, Z-rhythm media/text bands, stat bands with real numbers, badge and
 * icon grids, and the what-happens-next steps row. Buttons mean convert;
 * arrow links mean go deeper.
 */

export const PRIMARY_CTA = { label: "Start a pilot", href: "/get-started" } as const;

/** Full-width closing band: value-restating heading, primary plus one lower-commitment door. */
export function CtaBand({
  heading,
  sub,
  secondary,
  primaryHref = PRIMARY_CTA.href,
  primaryLabel = PRIMARY_CTA.label,
}: {
  heading: string;
  sub?: string;
  secondary: { label: string; href: string; external?: boolean };
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <div className="bg-brand-navy-deep">
      <Container className="py-16 sm:py-20">
        <h2 className="text-headline max-w-2xl text-balance text-white">{heading}</h2>
        {sub && (
          <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-white/75">{sub}</p>
        )}
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <ButtonLink
            href={primaryHref}
            variant="primary"
            className="bg-brand-teal text-brand-navy-deep hover:bg-brand-teal/90"
          >
            {primaryLabel}
          </ButtonLink>
          {secondary.external ? (
            <a
              href={secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-brand-teal"
            >
              {secondary.label}
              <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
            </a>
          ) : (
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/85 hover:text-brand-teal"
            >
              {secondary.label}
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
}

/**
 * One Z-rhythm band: benefit heading, advantage line, mechanism line, and a
 * product mockup. `flip` mirrors the columns; alternate it down the page.
 */
export function ZBand({
  heading,
  advantage,
  mechanism,
  link,
  mockup,
  flip = false,
  tone = "white",
}: {
  heading: string;
  advantage: string;
  mechanism?: string;
  link?: { label: string; href: string };
  mockup: React.ReactNode;
  flip?: boolean;
  tone?: "white" | "surface";
}) {
  return (
    <Section tone={tone} className="py-14 sm:py-16">
      <div
        className={`grid items-center gap-10 lg:grid-cols-2 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <Reveal>
          <h2 className="text-headline text-balance text-brand-navy">{heading}</h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-brand-navy/80">
            {advantage}
          </p>
          {mechanism && (
            <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-brand-navy/65">
              {mechanism}
            </p>
          )}
          {link && (
            <Link
              href={link.href}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
            >
              {link.label}
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          )}
        </Reveal>
        <Reveal delay={0.08}>{mockup}</Reveal>
      </div>
    </Section>
  );
}

/** Full-width band of 3 or 4 huge real numbers. Never an invented number. */
export function StatBand({
  stats,
  note,
}: {
  stats: { value: string; label: string }[];
  note?: string;
}) {
  return (
    <div className="bg-brand-navy-deep">
      <Container className="py-12 sm:py-14">
        <dl
          className={`grid gap-8 text-center sm:grid-cols-2 ${
            stats.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="text-4xl font-semibold tabular-nums text-white sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="mt-2 text-sm text-white/70">{stat.label}</dt>
            </div>
          ))}
        </dl>
        {note && (
          <p className="mt-6 text-center text-xs leading-relaxed text-white/55">{note}</p>
        )}
      </Container>
    </div>
  );
}

/** Format a live metric for a stat band, or null if absent. */
export function statOf(value: number | undefined, label: string) {
  return value === undefined ? null : { value: formatPct(value), label };
}

/** Grid of small icon cards for secondary capabilities. */
export function IconGrid({
  items,
  columns = 4,
}: {
  items: { icon?: LucideIcon; title: string; text: string }[];
  columns?: 3 | 4;
}) {
  return (
    <div
      className={`grid gap-4 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
    >
      {items.map((item, i) => {
        const Icon = item.icon ?? BadgeCheck;
        return (
          <Reveal key={item.title} delay={0.04 * i} className="h-full">
            <div className="h-full rounded-2xl border border-brand-navy/10 bg-white p-5">
              <Icon
                size={20}
                strokeWidth={1.75}
                aria-hidden="true"
                className="text-brand-teal-ink"
              />
              <h3 className="mt-3 text-sm font-semibold text-brand-navy">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/70">{item.text}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Numbered what-happens-next row: who replies, in what time, what you leave with. */
export function StepsRow({
  steps,
}: {
  steps: { title: string; text: string }[];
}) {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal key={step.title} delay={0.05 * i} className="h-full">
          <li className="h-full rounded-2xl border border-brand-navy/10 bg-white p-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal text-sm font-semibold text-brand-navy-deep">
              {i + 1}
            </span>
            <h3 className="mt-3 font-semibold text-brand-navy">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/70">{step.text}</p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}

const badgeIcons: Record<string, LucideIcon> = {
  award: Award,
  shield: ShieldCheck,
  signature: FileSignature,
  check: BadgeCheck,
};

/** Certification and proof badges as designed cards. Typographic, no fake seals. */
export function BadgeGrid({
  badges,
  evidenceLabel = "View the evidence",
  detailsLabel = "Details",
}: {
  badges: {
    icon: keyof typeof badgeIcons;
    name: string;
    text: string;
    href?: string;
    external?: boolean;
  }[];
  evidenceLabel?: string;
  detailsLabel?: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge, i) => {
        const Icon = badgeIcons[badge.icon];
        const body = (
          <>
            <span className="inline-flex rounded-xl bg-brand-navy p-2.5 text-brand-teal">
              <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="mt-3 font-semibold text-brand-navy">{badge.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/70">{badge.text}</p>
            {badge.href && (
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink">
                {badge.external ? evidenceLabel : detailsLabel}
                {badge.external ? (
                  <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                ) : (
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                )}
              </span>
            )}
          </>
        );
        const cls =
          "flex h-full flex-col items-start rounded-2xl border border-brand-navy/10 bg-white p-6 transition-colors";
        return (
          <Reveal key={badge.name} delay={0.04 * i} className="h-full">
            {badge.href ? (
              badge.external ? (
                <a
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cls} hover:border-brand-teal-ink/40`}
                >
                  {body}
                </a>
              ) : (
                <Link href={badge.href} className={`${cls} hover:border-brand-teal-ink/40`}>
                  {body}
                </Link>
              )
            ) : (
              <div className={cls}>{body}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

/** Proof chips: small inline badges next to a form or claim. */
export function ProofChips({ chips }: { chips: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li
          key={chip}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy/15 bg-white px-3 py-1 text-xs font-medium text-brand-navy/75"
        >
          <BadgeCheck
            size={12}
            strokeWidth={2}
            aria-hidden="true"
            className="text-brand-teal-ink"
          />
          {chip}
        </li>
      ))}
    </ul>
  );
}
