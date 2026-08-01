import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { getImprint } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import ImprintMain from "@/components/pages/ImprintMain";

export const metadata: Metadata = articleMetadata(getImprint(defaultLocale), "/imprint");

export default function ImprintPage() {
  return <ImprintMain c={getImprint(defaultLocale)} />;
}
