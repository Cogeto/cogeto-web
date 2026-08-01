import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCaseIndex, getCommon, getCsShared } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import CaseStudiesIndexMain from "@/components/pages/CaseStudiesIndexMain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getCaseIndex(locale), "/case-studies", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { nav } = getCommon(locale);
  return (
    <CaseStudiesIndexMain
      index={getCaseIndex(locale)}
      shared={getCsShared(locale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
