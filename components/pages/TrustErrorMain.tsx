import Link from "next/link";
import type { TrustContent } from "@/content/en/trust";
import { repoLinks } from "@/lib/trust";

/**
 * Body of the trust-page error boundary, shared by every locale. In
 * normal operation ISR serves the last good page and this never appears;
 * it exists so a visitor never meets a raw error. Rendered inside client
 * error components, so it must stay free of server-only APIs.
 */
export default function TrustErrorMain({
  t,
  homeHref,
}: {
  t: TrustContent;
  homeHref: string;
}) {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-2xl flex-col justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-brand-teal-ink">
        {t.eyebrow}
      </p>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-brand-navy sm:text-3xl">
        {t.unavailableTitle}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-brand-navy/70">
        {t.unavailableBody}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <a
          href={repoLinks.trustDir}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-medium text-white transition-colors hover:bg-brand-navy-deep"
        >
          {t.dataCta}
        </a>
        <Link
          href={homeHref}
          className="font-medium text-brand-teal-ink hover:underline"
        >
          {t.backHome}
        </Link>
      </div>
    </main>
  );
}
