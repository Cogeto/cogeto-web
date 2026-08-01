import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCommon, getDocsOffline } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import { DocsOfflineMain } from "@/components/pages/docs-mains";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getDocsOffline(locale), "/docs/offline", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { nav } = getCommon(locale);
  return (
    <DocsOfflineMain
      c={getDocsOffline(locale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
