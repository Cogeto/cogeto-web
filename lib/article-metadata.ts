import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { defaultLocale, localeHref } from "./i18n";
import { getCommon } from "./content-loader";

/**
 * hreflang alternates for a localized route. `path` is the unprefixed
 * base path ("/security", "/", ...); English is the x-default. Only use
 * for routes that actually exist in all locales.
 */
export function languageAlternates(path: string): Record<string, string> {
  return {
    en: path,
    hr: localeHref("hr", path),
    de: localeHref("de", path),
    fr: localeHref("fr", path),
    "x-default": path,
  };
}

/**
 * Standard metadata for a content page: title, description, canonical,
 * hreflang alternates, OG. `path` is always the unprefixed base path;
 * the locale decides the canonical ("/hr/security" for hr, "/security"
 * for en).
 */
export function articleMetadata(
  content: { metaTitle: string; metaDescription: string },
  path: string,
  locale: Locale = defaultLocale,
): Metadata {
  const { site } = getCommon(locale);
  const canonical = localeHref(locale, path);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title: `${content.metaTitle} | ${site.name}`,
      description: content.metaDescription,
      url: `${site.url}${canonical === "/" ? "" : canonical}`,
      type: "website",
    },
  };
}
