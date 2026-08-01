import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { getCommon, getSecurity } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import SecurityMain from "@/components/pages/SecurityMain";

export const metadata: Metadata = articleMetadata(getSecurity(defaultLocale), "/security");

export default function SecurityPage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <SecurityMain
      c={getSecurity(defaultLocale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
