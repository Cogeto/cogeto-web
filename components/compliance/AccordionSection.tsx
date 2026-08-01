"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  /** Section anchor, e.g. "deletion"; kept in the DOM so deep links scroll natively. */
  id: string;
  heading: string;
  excerpt: string;
  badge?: string;
  /** Full server-rendered panel content. */
  children: ReactNode;
};

/**
 * Expandable compliance section: heading and one-line excerpt stay visible,
 * the full content unfolds on click. Content stays mounted (crawlers and
 * printing see everything); collapsed panels are inert so hidden links leave
 * the tab order. Expansion is a CSS grid-rows transition, instant under
 * reduced motion.
 */
export default function AccordionSection({ id, heading, excerpt, badge, children }: Props) {
  const [open, setOpen] = useState(false);
  const uid = useId();
  const panelId = `${uid}-panel`;
  const buttonId = `${uid}-button`;

  // Deep links: auto-expand when the URL hash targets this section, both on
  // initial load and on later in-page hash navigation.
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [id]);

  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-brand-navy/10 bg-white">
      <h2>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-start justify-between gap-4 rounded-2xl px-5 py-4 text-left sm:px-6"
        >
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-3 text-lg font-semibold text-brand-navy transition-colors group-hover:text-brand-teal-ink">
              {heading}
              {badge && (
                <span className="rounded-full border border-brand-navy/15 bg-surface px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-brand-navy/70">
                  {badge}
                </span>
              )}
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-brand-navy/60">
              {excerpt}
            </span>
          </span>
          <ChevronDown
            size={18}
            strokeWidth={2}
            aria-hidden="true"
            className={`mt-1.5 shrink-0 text-brand-navy/40 transition-transform group-hover:text-brand-teal-ink motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none print:grid-rows-[1fr] ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden print:overflow-visible">
          <div inert={!open || undefined} className="px-5 pb-6 pt-1 sm:px-6">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
