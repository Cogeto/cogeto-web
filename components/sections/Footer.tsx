import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Linkedin } from "lucide-react";
import type { FooterContent, SiteContent } from "@/content/types";

export default function Footer({
  footer,
  site,
}: {
  footer: FooterContent;
  site: SiteContent;
}) {
  return (
    <footer className="border-t border-brand-navy/10 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/brand/cogeto-final-icon.svg"
              alt="Cogeto mark"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-navy/70">
              {footer.description}
            </p>
            <p className="mt-3 text-sm text-brand-navy/70">{footer.openSourceNote}</p>
            <ul className="mt-4 space-y-2">
              {footer.companies.map((company) => (
                <li key={company.name}>
                  <a
                    href={company.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy/70 transition-colors hover:text-brand-teal-ink"
                  >
                    <Linkedin size={14} strokeWidth={1.75} aria-hidden="true" />
                    {company.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-navy">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) =>
                  link.external ? (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy/70 transition-colors hover:text-brand-teal-ink"
                      >
                        {link.label}
                        <ExternalLink size={13} strokeWidth={1.75} aria-hidden="true" />
                      </a>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-brand-navy/70 transition-colors hover:text-brand-teal-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 space-y-1.5 border-t border-brand-navy/10 pt-6">
          {footer.licenseLines.map((line) => (
            <p key={line} className="text-center text-xs leading-relaxed text-brand-navy/70">
              {line}
            </p>
          ))}
          <p className="pt-2 text-center text-sm text-brand-navy/70">
            {site.domain} · © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
