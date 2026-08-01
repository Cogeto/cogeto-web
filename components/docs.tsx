import Link from "next/link";
import { ArrowRight, CircleCheck, ExternalLink, TriangleAlert } from "lucide-react";
import type { DocStep, DocsPathCard } from "@/content/en/docs";
import CopyCommandButton from "@/components/CopyCommandButton";
import Reveal from "@/components/Reveal";

/** Command block: navy panel, monospace, copy affordance. */
export function CodeBlock({
  command,
  copyLabel = "Copy command",
  copiedLabel = "Copied",
}: {
  command: string;
  copyLabel?: string;
  copiedLabel?: string;
}) {
  return (
    <div className="relative mt-4 rounded-2xl bg-brand-navy-deep p-5 pr-14">
      <pre className="overflow-x-auto">
        <code className="font-mono text-sm leading-relaxed text-white/90">{command}</code>
      </pre>
      <div className="absolute right-3 top-3">
        <CopyCommandButton
          command={command}
          label={copyLabel}
          copiedLabel={copiedLabel}
        />
      </div>
    </div>
  );
}

/** The verified first-success callout: "you should now see". */
export function ExpectCallout({ text }: { text: string }) {
  return (
    <p className="mt-4 flex gap-2.5 rounded-2xl border border-brand-teal/40 bg-brand-teal/10 p-4 text-sm leading-relaxed text-brand-navy">
      <CircleCheck
        size={17}
        strokeWidth={2}
        aria-hidden="true"
        className="mt-0.5 shrink-0 text-brand-teal-ink"
      />
      <span>{text}</span>
    </p>
  );
}

/** Warning callout for destructive or footgun notes. */
export function WarnCallout({ text }: { text: string }) {
  return (
    <p className="mt-4 flex gap-2.5 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
      <TriangleAlert
        size={17}
        strokeWidth={2}
        aria-hidden="true"
        className="mt-0.5 shrink-0"
      />
      <span>{text}</span>
    </p>
  );
}

/** Numbered install steps with commands and expected outcomes. */
export function DocSteps({
  steps,
  copyLabel,
  copiedLabel,
}: {
  steps: DocStep[];
  copyLabel?: string;
  copiedLabel?: string;
}) {
  return (
    <ol className="mt-8 space-y-8">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
            {i + 1}
          </span>
          <div className="min-w-0 flex-1 pt-1">
            <h3 className="text-title text-brand-navy">{step.title}</h3>
            <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-brand-navy/75">
              {step.text}
            </p>
            {step.command && (
              <CodeBlock
                command={step.command}
                copyLabel={copyLabel}
                copiedLabel={copiedLabel}
              />
            )}
            {step.expect && <ExpectCallout text={step.expect} />}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The three deployment paths on the docs index. */
export function PathCards({ paths }: { paths: DocsPathCard[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {paths.map((path, i) => (
        <Reveal key={path.name} delay={0.05 * i} className="h-full">
          <div className="flex h-full flex-col rounded-3xl border border-brand-navy/10 bg-white p-6">
            <h2 className="text-title text-brand-navy">{path.name}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/70">
              {path.forWhom}
            </p>
            <p className="mt-3 w-fit rounded-full bg-surface-deep px-3 py-1 text-xs font-medium text-brand-navy/70">
              {path.time}
            </p>
            <ul className="mt-4 flex-1 space-y-2">
              {path.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="border-l-2 border-brand-teal/60 pl-3 text-sm leading-relaxed text-brand-navy/80"
                >
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              href={path.href}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal-ink hover:underline"
            >
              {path.ctaLabel}
              <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Inline link row for external references. */
export function DocLinks({
  links,
}: {
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
      {links.map((link) =>
        link.external ? (
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
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
          >
            {link.label}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        ),
      )}
    </div>
  );
}
