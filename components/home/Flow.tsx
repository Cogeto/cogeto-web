import Link from "next/link";
import {
  ArrowRight,
  Crosshair,
  GitCompareArrows,
  Inbox,
  MessagesSquare,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { HomeContent } from "@/content/en/home";
import { Section } from "@/components/ui/Container";
import Reveal from "@/components/Reveal";

const icons: Record<string, LucideIcon> = {
  Inbox,
  Crosshair,
  ShieldCheck,
  GitCompareArrows,
  MessagesSquare,
};

/**
 * Animated picture of the pipeline: read, anchor, verify, reconcile, answer.
 * Stages light up in sequence while a pulse travels the connectors (pure
 * CSS, see globals.css). Static under prefers-reduced-motion.
 */
export default function Flow({ content }: { content: HomeContent["how"] }) {
  return (
    <Section id="how-it-works" tone="surface" className="scroll-mt-24">
      <Reveal>
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-brand-teal-ink">
          {content.kicker}
        </p>
        <h2 className="text-headline mt-3 text-balance text-center text-brand-navy">
          {content.title}
        </h2>
      </Reveal>

      <div className="mt-10 rounded-3xl border border-brand-navy/10 bg-white p-5 sm:p-8">
        <ol className="flex flex-col gap-5 xl:flex-row xl:items-stretch xl:gap-0">
          {content.steps.map((step, i) => {
            const Icon = icons[step.icon];
            return (
              <li key={step.title} className="contents">
                <div
                  className={`flow-stage flow-stage-${i + 1} flex-1 rounded-2xl border border-brand-navy/10 bg-surface/60 p-5`}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex rounded-xl bg-brand-navy p-2.5 text-brand-teal">
                      <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold text-brand-navy">
                      <span className="mr-1.5 text-brand-teal-ink">{i + 1}.</span>
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                    {step.text}
                  </p>
                  {step.chips.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {step.chips.map((chip) => (
                        <li
                          key={chip}
                          className="rounded-full bg-surface-deep px-2.5 py-0.5 text-xs font-medium text-brand-navy/70"
                        >
                          {chip}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {i < content.steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="relative hidden w-8 self-center xl:block"
                  >
                    <div className="h-px w-full bg-brand-navy/15" />
                    <div
                      className={`flow-dot flow-dot-${i + 1} absolute -top-1 size-2.5 rounded-full bg-brand-teal shadow-[0_0_6px_rgba(33,194,154,0.7)]`}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-brand-navy/70">
        {content.detailNote}
        <Link
          href="/product/verified-memory"
          className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
        >
          Verified memory
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      </p>
    </Section>
  );
}
