"use client";

import { useState } from "react";

/** Clipboard copy with a 2s "copied" confirmation state. */
export function useCopy(text: string) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — callers always render a non-JS fallback
      // (a mailto link, a selectable text snippet)
    }
  }

  return { copied, copy };
}
