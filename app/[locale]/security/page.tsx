import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCommon, getSecurity } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import SecurityMain from "@/components/pages/SecurityMain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getSecurity(locale), "/security", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { nav } = getCommon(locale);
  return (
    <SecurityMain
      c={getSecurity(locale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
