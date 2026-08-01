import type { Locale } from "./i18n";
import { defaultLocale, localeHref } from "./i18n";
import type { CommonContent } from "@/content/types";
import type { HomeContent } from "@/content/en/home";
import type { TrustContent } from "@/content/en/trust";
import type { GetStartedContent } from "@/content/en/get-started";
import type { SecurityContent } from "@/content/en/security";
import type { CaseStudy } from "@/content/en/case-studies";
import type { ZPageContent } from "@/content/en/product-contradiction-findings";

import { common as enCommon } from "@/content/en/common";
import { home as enHome } from "@/content/en/home";
import { trust as enTrust } from "@/content/en/trust";
import {
  docsIndex as enDocsIndex,
  docsOffline as enDocsOffline,
  docsQuickstart as enDocsQuickstart,
  docsSelfHosted as enDocsSelfHosted,
  docsUi as enDocsUi,
} from "@/content/en/docs";
import { getStarted as enGetStarted } from "@/content/en/get-started";
import { security as enSecurity } from "@/content/en/security";
import { openSource as enOpenSource } from "@/content/en/open-source";
import { whitepaper as enWhitepaper, whitepaperMeta as enWhitepaperMeta } from "@/content/en/whitepaper";
import {
  caseIndex as enCaseIndex,
  caseStudies as enCaseStudies,
  csShared as enCsShared,
} from "@/content/en/case-studies";
import { contradictionFindings as enContradictionFindings } from "@/content/en/product-contradiction-findings";
import { verifiedMemory as enVerifiedMemory } from "@/content/en/product-verified-memory";
import { findingsReport as enFindingsReport } from "@/content/en/product-findings-report";
import type { PrivacyContent } from "@/content/en/privacy";
import { privacy as enPrivacy } from "@/content/en/privacy";
import type { ImprintContent } from "@/content/en/imprint";
import { imprint as enImprint } from "@/content/en/imprint";
import type { ComplianceUi } from "@/content/en/compliance";
import type { ComplianceContent } from "@/lib/compliance";
import {
  complianceContent as enComplianceContent,
  complianceUi as enComplianceUi,
} from "@/content/en/compliance";

import { common as hrCommon } from "@/content/hr/common";
import { home as hrHome } from "@/content/hr/home";
import { trust as hrTrust } from "@/content/hr/trust";
import {
  docsIndex as hrDocsIndex,
  docsOffline as hrDocsOffline,
  docsQuickstart as hrDocsQuickstart,
  docsSelfHosted as hrDocsSelfHosted,
  docsUi as hrDocsUi,
} from "@/content/hr/docs";
import { getStarted as hrGetStarted } from "@/content/hr/get-started";
import { security as hrSecurity } from "@/content/hr/security";
import { openSource as hrOpenSource } from "@/content/hr/open-source";
import { whitepaper as hrWhitepaper, whitepaperMeta as hrWhitepaperMeta } from "@/content/hr/whitepaper";
import {
  caseIndex as hrCaseIndex,
  caseStudies as hrCaseStudies,
  csShared as hrCsShared,
} from "@/content/hr/case-studies";
import { contradictionFindings as hrContradictionFindings } from "@/content/hr/product-contradiction-findings";
import { verifiedMemory as hrVerifiedMemory } from "@/content/hr/product-verified-memory";
import { findingsReport as hrFindingsReport } from "@/content/hr/product-findings-report";
import { privacy as hrPrivacy } from "@/content/hr/privacy";
import { imprint as hrImprint } from "@/content/hr/imprint";
import {
  complianceContent as hrComplianceContent,
  complianceUi as hrComplianceUi,
} from "@/content/hr/compliance";

import { common as deCommon } from "@/content/de/common";
import { home as deHome } from "@/content/de/home";
import { trust as deTrust } from "@/content/de/trust";
import {
  docsIndex as deDocsIndex,
  docsOffline as deDocsOffline,
  docsQuickstart as deDocsQuickstart,
  docsSelfHosted as deDocsSelfHosted,
  docsUi as deDocsUi,
} from "@/content/de/docs";
import { getStarted as deGetStarted } from "@/content/de/get-started";
import { security as deSecurity } from "@/content/de/security";
import { openSource as deOpenSource } from "@/content/de/open-source";
import { whitepaper as deWhitepaper, whitepaperMeta as deWhitepaperMeta } from "@/content/de/whitepaper";
import {
  caseIndex as deCaseIndex,
  caseStudies as deCaseStudies,
  csShared as deCsShared,
} from "@/content/de/case-studies";
import { contradictionFindings as deContradictionFindings } from "@/content/de/product-contradiction-findings";
import { verifiedMemory as deVerifiedMemory } from "@/content/de/product-verified-memory";
import { findingsReport as deFindingsReport } from "@/content/de/product-findings-report";
import { privacy as dePrivacy } from "@/content/de/privacy";
import { imprint as deImprint } from "@/content/de/imprint";
import {
  complianceContent as deComplianceContent,
  complianceUi as deComplianceUi,
} from "@/content/de/compliance";

import { common as frCommon } from "@/content/fr/common";
import { home as frHome } from "@/content/fr/home";
import { trust as frTrust } from "@/content/fr/trust";
import {
  docsIndex as frDocsIndex,
  docsOffline as frDocsOffline,
  docsQuickstart as frDocsQuickstart,
  docsSelfHosted as frDocsSelfHosted,
  docsUi as frDocsUi,
} from "@/content/fr/docs";
import { getStarted as frGetStarted } from "@/content/fr/get-started";
import { security as frSecurity } from "@/content/fr/security";
import { openSource as frOpenSource } from "@/content/fr/open-source";
import { whitepaper as frWhitepaper, whitepaperMeta as frWhitepaperMeta } from "@/content/fr/whitepaper";
import {
  caseIndex as frCaseIndex,
  caseStudies as frCaseStudies,
  csShared as frCsShared,
} from "@/content/fr/case-studies";
import { contradictionFindings as frContradictionFindings } from "@/content/fr/product-contradiction-findings";
import { verifiedMemory as frVerifiedMemory } from "@/content/fr/product-verified-memory";
import { findingsReport as frFindingsReport } from "@/content/fr/product-findings-report";
import { privacy as frPrivacy } from "@/content/fr/privacy";
import { imprint as frImprint } from "@/content/fr/imprint";
import {
  complianceContent as frComplianceContent,
  complianceUi as frComplianceUi,
} from "@/content/fr/compliance";

/**
 * Static registry of per-locale content. Imports are static so the
 * bundler sees every locale at build time; a missing translation is a
 * compile error, never a silently English page.
 *
 * Getters for non-English locales return a deep clone whose internal
 * `href` values are prefixed with the locale segment ("/security"
 * becomes "/hr/security"), so translated content files keep the same
 * canonical unprefixed paths as the English ones. Asset paths
 * (documents, og, brand, api) are never prefixed; neither are external,
 * mailto, or in-page anchor targets.
 */

export type CaseIndexContent = typeof enCaseIndex;
export type CsSharedContent = typeof enCsShared;
export type DocsIndexContent = typeof enDocsIndex;
export type DocsQuickstartContent = typeof enDocsQuickstart;
export type DocsSelfHostedContent = typeof enDocsSelfHosted;
export type DocsOfflineContent = typeof enDocsOffline;
export type DocsUiContent = typeof enDocsUi;
export type OpenSourceContent = typeof enOpenSource;
export type WhitepaperContent = typeof enWhitepaper;
export type WhitepaperMeta = { [K in keyof typeof enWhitepaperMeta]: string };
export type ProductPageKey =
  | "contradiction-findings"
  | "verified-memory"
  | "findings-report";

const UNPREFIXED_PATHS = ["/documents", "/og", "/brand", "/api"] as const;

function localizePath(path: string, locale: Locale): string {
  if (UNPREFIXED_PATHS.some((p) => path.startsWith(p))) return path;
  return localeHref(locale, path);
}

/** Recursively clone `value`, prefixing every internal `href` string. */
function deepLocalize<T>(value: T, locale: Locale): T {
  if (Array.isArray(value)) {
    return value.map((v) => deepLocalize(v, locale)) as unknown as T;
  }
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value)) {
      out[key] =
        key === "href" && typeof v === "string" && v.startsWith("/")
          ? localizePath(v, locale)
          : deepLocalize(v, locale);
    }
    return out as T;
  }
  return value;
}

const localizedCache = new Map<string, unknown>();

function pick<T>(key: string, locale: Locale, byLocale: Record<Locale, T>): T {
  const value = byLocale[locale] ?? byLocale[defaultLocale];
  if (locale === defaultLocale) return value;
  const cacheKey = `${locale}:${key}`;
  if (!localizedCache.has(cacheKey)) {
    localizedCache.set(cacheKey, deepLocalize(value, locale));
  }
  return localizedCache.get(cacheKey) as T;
}

const commonByLocale: Record<Locale, CommonContent> = {
  en: enCommon,
  hr: hrCommon,
  de: deCommon,
  fr: frCommon,
};

const homeByLocale: Record<Locale, HomeContent> = {
  en: enHome,
  hr: hrHome,
  de: deHome,
  fr: frHome,
};

const trustByLocale: Record<Locale, TrustContent> = {
  en: enTrust,
  hr: hrTrust,
  de: deTrust,
  fr: frTrust,
};

const docsIndexByLocale: Record<Locale, DocsIndexContent> = {
  en: enDocsIndex,
  hr: hrDocsIndex,
  de: deDocsIndex,
  fr: frDocsIndex,
};

const docsQuickstartByLocale: Record<Locale, DocsQuickstartContent> = {
  en: enDocsQuickstart,
  hr: hrDocsQuickstart,
  de: deDocsQuickstart,
  fr: frDocsQuickstart,
};

const docsSelfHostedByLocale: Record<Locale, DocsSelfHostedContent> = {
  en: enDocsSelfHosted,
  hr: hrDocsSelfHosted,
  de: deDocsSelfHosted,
  fr: frDocsSelfHosted,
};

const docsOfflineByLocale: Record<Locale, DocsOfflineContent> = {
  en: enDocsOffline,
  hr: hrDocsOffline,
  de: deDocsOffline,
  fr: frDocsOffline,
};

const docsUiByLocale: Record<Locale, DocsUiContent> = {
  en: enDocsUi,
  hr: hrDocsUi,
  de: deDocsUi,
  fr: frDocsUi,
};

const getStartedByLocale: Record<Locale, GetStartedContent> = {
  en: enGetStarted,
  hr: hrGetStarted,
  de: deGetStarted,
  fr: frGetStarted,
};

const securityByLocale: Record<Locale, SecurityContent> = {
  en: enSecurity,
  hr: hrSecurity,
  de: deSecurity,
  fr: frSecurity,
};

const openSourceByLocale: Record<Locale, OpenSourceContent> = {
  en: enOpenSource,
  hr: hrOpenSource,
  de: deOpenSource,
  fr: frOpenSource,
};

const whitepaperByLocale: Record<Locale, WhitepaperContent> = {
  en: enWhitepaper,
  hr: hrWhitepaper,
  de: deWhitepaper,
  fr: frWhitepaper,
};

const whitepaperMetaByLocale: Record<Locale, WhitepaperMeta> = {
  en: enWhitepaperMeta,
  hr: hrWhitepaperMeta,
  de: deWhitepaperMeta,
  fr: frWhitepaperMeta,
};

const caseIndexByLocale: Record<Locale, CaseIndexContent> = {
  en: enCaseIndex,
  hr: hrCaseIndex,
  de: deCaseIndex,
  fr: frCaseIndex,
};

const caseStudiesByLocale: Record<Locale, CaseStudy[]> = {
  en: enCaseStudies,
  hr: hrCaseStudies,
  de: deCaseStudies,
  fr: frCaseStudies,
};

const csSharedByLocale: Record<Locale, CsSharedContent> = {
  en: enCsShared,
  hr: hrCsShared,
  de: deCsShared,
  fr: frCsShared,
};

const privacyByLocale: Record<Locale, PrivacyContent> = {
  en: enPrivacy,
  hr: hrPrivacy,
  de: dePrivacy,
  fr: frPrivacy,
};

const imprintByLocale: Record<Locale, ImprintContent> = {
  en: enImprint,
  hr: hrImprint,
  de: deImprint,
  fr: frImprint,
};

export type CompliancePage = { content: ComplianceContent; ui: ComplianceUi };

const complianceByLocale: Record<Locale, CompliancePage> = {
  en: { content: enComplianceContent, ui: enComplianceUi },
  hr: { content: hrComplianceContent, ui: hrComplianceUi },
  de: { content: deComplianceContent, ui: deComplianceUi },
  fr: { content: frComplianceContent, ui: frComplianceUi },
};

const productByLocale: Record<Locale, Record<ProductPageKey, ZPageContent>> = {
  en: {
    "contradiction-findings": enContradictionFindings,
    "verified-memory": enVerifiedMemory,
    "findings-report": enFindingsReport,
  },
  hr: {
    "contradiction-findings": hrContradictionFindings,
    "verified-memory": hrVerifiedMemory,
    "findings-report": hrFindingsReport,
  },
  de: {
    "contradiction-findings": deContradictionFindings,
    "verified-memory": deVerifiedMemory,
    "findings-report": deFindingsReport,
  },
  fr: {
    "contradiction-findings": frContradictionFindings,
    "verified-memory": frVerifiedMemory,
    "findings-report": frFindingsReport,
  },
};

export function getCommon(locale: Locale): CommonContent {
  return pick("common", locale, commonByLocale);
}

export function getHome(locale: Locale): HomeContent {
  return pick("home", locale, homeByLocale);
}

export function getTrust(locale: Locale): TrustContent {
  return pick("trust", locale, trustByLocale);
}

export function getDocsIndex(locale: Locale): DocsIndexContent {
  return pick("docsIndex", locale, docsIndexByLocale);
}

export function getDocsQuickstart(locale: Locale): DocsQuickstartContent {
  return pick("docsQuickstart", locale, docsQuickstartByLocale);
}

export function getDocsSelfHosted(locale: Locale): DocsSelfHostedContent {
  return pick("docsSelfHosted", locale, docsSelfHostedByLocale);
}

export function getDocsOffline(locale: Locale): DocsOfflineContent {
  return pick("docsOffline", locale, docsOfflineByLocale);
}

export function getDocsUi(locale: Locale): DocsUiContent {
  return pick("docsUi", locale, docsUiByLocale);
}

export function getGetStarted(locale: Locale): GetStartedContent {
  return pick("getStarted", locale, getStartedByLocale);
}

export function getSecurity(locale: Locale): SecurityContent {
  return pick("security", locale, securityByLocale);
}

export function getOpenSource(locale: Locale): OpenSourceContent {
  return pick("openSource", locale, openSourceByLocale);
}

export function getWhitepaper(locale: Locale): {
  content: WhitepaperContent;
  meta: WhitepaperMeta;
} {
  return {
    content: pick("whitepaper", locale, whitepaperByLocale),
    meta: pick("whitepaperMeta", locale, whitepaperMetaByLocale),
  };
}

export function getCaseIndex(locale: Locale): CaseIndexContent {
  return pick("caseIndex", locale, caseIndexByLocale);
}

export function getCaseStudies(locale: Locale): CaseStudy[] {
  return pick("caseStudies", locale, caseStudiesByLocale);
}

export function getCsShared(locale: Locale): CsSharedContent {
  return pick("csShared", locale, csSharedByLocale);
}

export function getProductPage(locale: Locale, which: ProductPageKey): ZPageContent {
  return pick("product", locale, productByLocale)[which];
}

export function getPrivacy(locale: Locale): PrivacyContent {
  return pick("privacy", locale, privacyByLocale);
}

export function getImprint(locale: Locale): ImprintContent {
  return pick("imprint", locale, imprintByLocale);
}

export function getCompliance(locale: Locale): CompliancePage {
  return pick("compliance", locale, complianceByLocale);
}
