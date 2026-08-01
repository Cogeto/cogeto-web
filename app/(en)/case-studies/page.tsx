import { defaultLocale } from "@/lib/i18n";
import { getCaseIndex, getCommon, getCsShared } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import CaseStudiesIndexMain from "@/components/pages/CaseStudiesIndexMain";

export const metadata = articleMetadata(getCaseIndex(defaultLocale), "/case-studies");

export default function CaseStudiesPage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <CaseStudiesIndexMain
      index={getCaseIndex(defaultLocale)}
      shared={getCsShared(defaultLocale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
