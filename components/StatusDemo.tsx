"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link2 } from "lucide-react";
import { statusDemo } from "@/content/en/status-demo";

const chipTones: Record<string, string> = {
  teal: "bg-brand-teal/15 text-brand-teal-ink border-brand-teal/30",
  amber: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  red: "bg-red-500/10 text-red-700 border-red-500/25",
  muted: "bg-brand-muted/10 text-brand-navy/70 border-brand-muted/30",
};

/**
 * A live memory card cycling through the six lifecycle statuses, showing for
 * each one an example fact, its source link, and what the status means.
 * Under reduced motion it renders the full list statically.
 */
export default function StatusDemo() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const items = statusDemo.items;
  const current = items[index];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 3200);
    return () => clearInterval(id);
  }, [reduce, items.length]);

  if (reduce) {
    return (
      <div className="mt-12 rounded-2xl border border-brand-navy/10 bg-surface p-6">
        <p className="text-sm font-medium text-brand-navy/70">{statusDemo.intro}</p>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li key={item.status} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span
                className={`rounded-full border px-3 py-1 text-sm font-medium ${chipTones[item.tone]}`}
              >
                {item.status}
              </span>
              <span className="text-sm text-brand-navy/70">{item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-12 rounded-2xl border border-brand-navy/10 bg-surface p-6 sm:p-8">
      <p className="text-sm font-medium text-brand-navy/70">{statusDemo.intro}</p>

      <div className="mt-5 min-h-40 rounded-xl border border-brand-navy/10 bg-white p-5 shadow-sm">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium text-brand-navy">{current.fact}</p>
              <span
                className={`rounded-full border px-3 py-1 text-sm font-medium ${chipTones[current.tone]}`}
              >
                {current.status}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-brand-navy/70">
              <Link2 size={14} strokeWidth={1.75} aria-hidden="true" />
              {current.source}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">{current.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* All six statuses; the live one is highlighted. Clickable to explore. */}
      <ul className="mt-5 flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li key={item.status}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                chipTones[item.tone]
              } ${i === index ? "scale-105 ring-2 ring-brand-navy/15" : "opacity-55 hover:opacity-100"}`}
            >
              {item.status}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
