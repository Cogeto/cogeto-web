/**
 * Croatian, German, and French serve under /hr, /de, and /fr. Adding a locale means:
 * add it to `locales`, provide content/<locale>/, and register it in
 * lib/content-loader.ts.
 */

export const locales = ["en", "hr", "de", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Locales whose content exists and is routable today. */
export const activeLocales: readonly Locale[] = ["en", "hr", "de", "fr"] as const;

/** The prefixed locales, i.e. everything served under /<locale>. */
export const prefixedLocales: readonly Locale[] = ["hr", "de", "fr"] as const;

/** Prefix a site-internal path with the locale segment. */
export function localeHref(locale: Locale, path: string): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** BCP 47 tag for the html lang attribute and hreflang alternates. */
export function bcp47(locale: Locale): string {
  return locale;
}
