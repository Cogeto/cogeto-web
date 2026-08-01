import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCompliance } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import ComplianceMain from "@/components/pages/ComplianceMain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const { ui } = getCompliance(locale);
  const base = articleMetadata(ui, "/compliance", locale);
  return {
    ...base,
    openGraph: { ...base.openGraph, description: ui.ogDescription },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { content, ui } = getCompliance(locale);
  return <ComplianceMain c={content} ui={ui} locale={locale} />;
}
