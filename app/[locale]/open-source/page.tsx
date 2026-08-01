import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCommon, getOpenSource } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import OpenSourceMain from "@/components/pages/OpenSourceMain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getOpenSource(locale), "/open-source", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { nav } = getCommon(locale);
  return (
    <OpenSourceMain
      c={getOpenSource(locale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
