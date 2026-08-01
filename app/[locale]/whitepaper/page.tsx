import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCommon, getWhitepaper } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import WhitepaperMain from "@/components/pages/WhitepaperMain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getWhitepaper(locale).content, "/whitepaper", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { site, nav } = getCommon(locale);
  const { content, meta } = getWhitepaper(locale);
  return (
    <WhitepaperMain
      content={content}
      meta={meta}
      site={site}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
