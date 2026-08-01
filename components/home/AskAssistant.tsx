"use client";

import { Check, Copy } from "lucide-react";
import type { HomeContent } from "@/content/en/home";
import { useCopy } from "@/components/useCopy";

/**
 * Each button is a plain link that opens the assistant with a prepared
 * prompt, so the zero external request rule holds: nothing loads from
 * third parties, navigation happens only on click. Assistant names are
 * used nominatively; no third-party logos are redrawn or embedded.
 */
export default function AskAssistant({
  content,
}: {
  content: HomeContent["askAssistant"];
}) {
  const { copied, copy } = useCopy(content.prompt);
  const encoded = encodeURIComponent(content.prompt);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border border-brand-navy/10 bg-surface p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-teal-ink">
          {content.kicker}
        </p>
        <h2 className="text-headline mt-3 max-w-2xl text-balance text-brand-navy">
          {content.title}
        </h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-brand-navy/75">
          {content.text}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {content.assistants.map((assistant) => (
            <a
              key={assistant.name}
              href={`${assistant.urlPrefix}${encoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-brand-navy/20 bg-white px-5 py-2.5 text-sm font-medium text-brand-navy transition-colors hover:border-brand-teal-ink hover:text-brand-teal-ink"
            >
              {assistant.name}
            </a>
          ))}
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-brand-navy/70 transition-colors hover:text-brand-teal-ink"
          >
            {copied ? (
              <>
                <Check size={15} strokeWidth={2} aria-hidden="true" className="text-brand-teal-ink" />
                {content.copiedLabel}
              </>
            ) : (
              <>
                <Copy size={15} strokeWidth={1.75} aria-hidden="true" />
                {content.copyLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
