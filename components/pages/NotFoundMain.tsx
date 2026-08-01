import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NotFoundContent } from "@/content/types";
import { ButtonLink } from "@/components/ui/ButtonLink";

/** The branded 404 body. Content arrives as props from the route. */
export default function NotFoundMain({
  content,
  homeHref = "/",
}: {
  content: NotFoundContent;
  homeHref?: string;
}) {
  return (
    <main id="main" className="mx-auto flex min-h-[70svh] max-w-2xl flex-col justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-brand-teal-ink">
        {content.eyebrow}
      </p>
      <h1 className="text-headline mt-4 text-balance text-brand-navy">
        {content.title}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-brand-navy/70">
        {content.body}
      </p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href={homeHref} variant="primary">
          {content.homeLabel}
        </ButtonLink>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        {content.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1.5 font-medium text-brand-teal-ink hover:underline"
          >
            {link.label}
            <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </main>
  );
}
