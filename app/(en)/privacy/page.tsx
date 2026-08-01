import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { getPrivacy } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import PrivacyMain from "@/components/pages/PrivacyMain";

export const metadata: Metadata = articleMetadata(getPrivacy(defaultLocale), "/privacy");

export default function PrivacyPage() {
  return <PrivacyMain c={getPrivacy(defaultLocale)} />;
}
