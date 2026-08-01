import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { getCommon, getGetStarted } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import GetStartedMain from "@/components/pages/GetStartedMain";

export const metadata: Metadata = articleMetadata(getGetStarted(defaultLocale), "/get-started");

export default function GetStartedPage() {
  const { site } = getCommon(defaultLocale);
  return <GetStartedMain c={getGetStarted(defaultLocale)} email={site.email} />;
}
