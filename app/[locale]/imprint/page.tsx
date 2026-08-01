import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getImprint } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import ImprintMain from "@/components/pages/ImprintMain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getImprint(locale), "/imprint", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  return <ImprintMain c={getImprint(locale)} />;
}
