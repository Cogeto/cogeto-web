import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCommon, getGetStarted } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import GetStartedMain from "@/components/pages/GetStartedMain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(getGetStarted(locale), "/get-started", locale);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { site } = getCommon(locale);
  return <GetStartedMain c={getGetStarted(locale)} email={site.email} />;
}
