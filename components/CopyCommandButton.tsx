"use client";

import { Check, Copy } from "lucide-react";
import { useCopy } from "@/components/useCopy";

type Props = {
  command: string;
  label: string;
  copiedLabel: string;
};

/** Small copy affordance for command snippets on dark surfaces. */
export default function CopyCommandButton({ command, label, copiedLabel }: Props) {
  const { copied, copy } = useCopy(command);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? copiedLabel : label}
      className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1.5 text-xs font-medium text-white/80 transition-colors hover:border-brand-teal/60 hover:text-brand-teal"
    >
      {copied ? (
        <>
          <Check size={14} strokeWidth={2} aria-hidden="true" className="text-brand-teal" />
          {copiedLabel}
        </>
      ) : (
        <>
          <Copy size={14} strokeWidth={1.75} aria-hidden="true" />
          {label}
        </>
      )}
    </button>
  );
}
