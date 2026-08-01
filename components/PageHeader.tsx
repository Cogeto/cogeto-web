import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  /** Meta row directly under the h1 (version badge, last-updated line). */
  meta?: ReactNode;
  lede?: string;
  /** Extra header content after the lede (download buttons and similar). */
  children?: ReactNode;
};

/** Shared subpage header: consistent eyebrow, h1, meta row, optional lede. */
export default function PageHeader({ eyebrow, title, meta, lede, children }: Props) {
  return (
    <header>
      <p className="text-sm font-medium uppercase tracking-widest text-brand-teal-ink">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-brand-navy sm:text-4xl">
        {title}
      </h1>
      {meta}
      {lede && (
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-brand-navy/70">
          {lede}
        </p>
      )}
      {children}
    </header>
  );
}
