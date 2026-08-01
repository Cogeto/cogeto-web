import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCommon, getDocsSelfHosted, getDocsUi } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import { DocsSelfHostedMain } from "@/components/pages/docs-mains";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getDocsSelfHosted(locale), "/docs/self-hosted", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { nav } = getCommon(locale);
  return (
    <DocsSelfHostedMain
      c={getDocsSelfHosted(locale)}
      ui={getDocsUi(locale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
