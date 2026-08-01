"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Github, Menu, X } from "lucide-react";
import type { NavContent } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { localeHref, locales } from "@/lib/i18n";

/**
 * discover). Disclosure dropdowns render from nav.groups, so adding a group
 * is a content change. Content arrives as props from the layout so the
 * component itself is locale-agnostic.
 */

/** Native language names shown in the switcher; never translated. */
const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  hr: "Hrvatski",
  de: "Deutsch",
};

/** Target for locale `l`: the current path with only the prefix swapped. */
function switchTarget(l: Locale, pathname: string): string {
  const basePath = pathname.replace(/^\/(hr|de)(?=\/|$)/, "") || "/";
  return localeHref(l, basePath);
}

/**
 * Compact language dropdown for the desktop header: same disclosure
 * pattern as the nav groups. The button shows the current locale code;
 * the menu lists every language by its native name.
 */
function LanguageDropdown({
  locale,
  ariaLabel,
  pathname,
}: {
  locale: Locale;
  ariaLabel: string;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Close on Escape, outside click, or focus leaving.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onAway = (e: Event) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onAway);
    document.addEventListener("focusin", onAway);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onAway);
      document.removeEventListener("focusin", onAway);
    };
  }, [open]);

  return (
    <nav aria-label={ariaLabel}>
      <div ref={rootRef} className="relative">
        <button
          type="button"
          aria-expanded={open}
          aria-label={ariaLabel}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-xs font-semibold tracking-wider text-brand-navy/75 transition-colors hover:text-brand-teal-ink"
        >
          <span lang={locale}>{locale.toUpperCase()}</span>
          <ChevronDown
            size={14}
            strokeWidth={2}
            aria-hidden="true"
            className={`transition-transform motion-reduce:transition-none ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-2 w-36 rounded-2xl border border-brand-navy/10 bg-white p-2 shadow-lg shadow-brand-navy/10">
            <ul>
              {locales.map((l) => (
                <li key={l}>
                  <Link
                    href={switchTarget(l, pathname)}
                    aria-current={l === locale ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    lang={l}
                    className={`block rounded-xl px-3.5 py-2 text-sm font-medium transition-colors hover:bg-surface hover:text-brand-teal-ink ${
                      l === locale ? "text-brand-teal-ink" : "text-brand-navy/80"
                    }`}
                  >
                    {LOCALE_NAMES[l]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

/** Compact row of native language names for the mobile menu. */
function LanguageRow({
  locale,
  ariaLabel,
  pathname,
  onNavigate,
}: {
  locale: Locale;
  ariaLabel: string;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap items-center gap-1">
      {locales.map((l) => (
        <Link
          key={l}
          href={switchTarget(l, pathname)}
          aria-current={l === locale ? "true" : undefined}
          onClick={onNavigate}
          lang={l}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:text-brand-teal-ink ${
            l === locale
              ? "bg-brand-teal/10 text-brand-teal-ink"
              : "text-brand-navy/70"
          }`}
        >
          {LOCALE_NAMES[l]}
        </Link>
      ))}
    </nav>
  );
}

export default function SiteHeader({
  nav,
  github,
  locale,
}: {
  nav: NavContent;
  github: string;
  locale: Locale;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

  // Hairline shadow only once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation.
  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Dropdowns: close on Escape, outside click, or focus leaving.
  useEffect(() => {
    if (!openGroup) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenGroup(null);
    };
    const onAway = (e: Event) => {
      if (!groupsRef.current?.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onAway);
    document.addEventListener("focusin", onAway);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onAway);
      document.removeEventListener("focusin", onAway);
    };
  }, [openGroup]);

  // Open mobile menu: move focus in, trap Tab, lock body scroll, close on
  // Escape; focus returns to the trigger button on close.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel
      ?.querySelector<HTMLElement>("a[href], button:not([disabled])")
      ?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(
        panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      menuButtonRef.current?.focus();
    };
  }, [open]);

  const isActive = (href: string) => href === pathname;
  const groupActive = (group: (typeof nav.groups)[number]) =>
    group.links.some(
      (l) => !l.href.includes("#") && pathname.startsWith(l.href.split("#")[0]),
    );

  const flatLinkClass = (active: boolean) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:text-brand-teal-ink ${
      active ? "bg-brand-teal/10 text-brand-teal-ink" : "text-brand-navy/75"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-brand-navy/10 bg-white/85 backdrop-blur-md transition-shadow duration-200 motion-reduce:transition-none ${
          scrolled ? "shadow-sm shadow-brand-navy/5" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <Link
            href={localeHref(locale, "/")}
            aria-label={nav.homeAria}
            className="shrink-0"
          >
            <Image
              src="/brand/cogeto-final-logo-horizontal.svg"
              alt=""
              width={366}
              height={120}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            <div ref={groupsRef} className="flex items-center gap-1">
              {nav.groups.map((group) => (
                <div key={group.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={openGroup === group.label}
                    onClick={() =>
                      setOpenGroup((g) => (g === group.label ? null : group.label))
                    }
                    className={`inline-flex items-center gap-1 ${flatLinkClass(groupActive(group))}`}
                  >
                    {group.label}
                    <ChevronDown
                      size={15}
                      strokeWidth={2}
                      aria-hidden="true"
                      className={`transition-transform motion-reduce:transition-none ${
                        openGroup === group.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openGroup === group.label && (
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-brand-navy/10 bg-white p-2 shadow-lg shadow-brand-navy/10">
                      <ul>
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              aria-current={isActive(link.href) ? "page" : undefined}
                              className={`block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-surface hover:text-brand-teal-ink ${
                                isActive(link.href)
                                  ? "text-brand-teal-ink"
                                  : "text-brand-navy/80"
                              }`}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={flatLinkClass(isActive(link.href))}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageDropdown
              locale={locale}
              ariaLabel={nav.languageAria}
              pathname={pathname}
            />
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={nav.githubAria}
              className="rounded-full p-2 text-brand-navy/75 transition-colors hover:text-brand-teal-ink"
            >
              <Github size={19} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <Link
              href={nav.ctaHref}
              className="rounded-full bg-brand-navy px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-navy-deep"
            >
              {nav.ctaLabel}
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-label={open ? nav.closeMenuLabel : nav.openMenuLabel}
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-brand-navy md:hidden"
          >
            <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-brand-navy/25 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={nav.menuLabel}
            className="absolute inset-x-0 top-0 max-h-dvh overflow-y-auto rounded-b-3xl border-b border-brand-navy/10 bg-white p-6 shadow-xl shadow-brand-navy/10"
          >
            <div className="flex h-10 items-center justify-between">
              <Image
                src="/brand/cogeto-final-logo-horizontal.svg"
                alt=""
                width={366}
                height={120}
                className="h-9 w-auto"
              />
              <button
                type="button"
                aria-label={nav.closeMenuLabel}
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-brand-navy"
              >
                <X size={22} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Main" className="mt-4">
              {nav.groups.map((group) => (
                <div key={group.label}>
                  <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-brand-navy/70">
                    {group.label}
                  </p>
                  <ul className="flex flex-col">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className={`block rounded-2xl px-4 py-2.5 text-base font-medium ${
                            isActive(link.href)
                              ? "bg-brand-teal/10 text-brand-teal-ink"
                              : "text-brand-navy"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <ul className="mt-3 flex flex-col border-t border-brand-navy/10 pt-3">
                {nav.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`block rounded-2xl px-4 py-2.5 text-base font-medium ${
                        isActive(link.href)
                          ? "bg-brand-teal/10 text-brand-teal-ink"
                          : "text-brand-navy"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-base font-medium text-brand-navy"
                  >
                    <Github size={20} strokeWidth={1.75} aria-hidden="true" />
                    {nav.githubLabel}
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-3 border-t border-brand-navy/10 px-4 pt-4">
              <LanguageRow
                locale={locale}
                ariaLabel={nav.languageAria}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            </div>
            <Link
              href={nav.ctaHref}
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-full bg-brand-navy px-5 py-3.5 text-center font-medium text-white"
            >
              {nav.ctaLabel}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
