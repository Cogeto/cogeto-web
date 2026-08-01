import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getDocsIndex } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import { DocsIndexMain } from "@/components/pages/docs-mains";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getDocsIndex(locale), "/docs", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  return <DocsIndexMain c={getDocsIndex(locale)} />;
}
