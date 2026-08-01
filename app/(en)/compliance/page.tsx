import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { getCompliance } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import ComplianceMain from "@/components/pages/ComplianceMain";

const { content, ui } = getCompliance(defaultLocale);

const base = articleMetadata(ui, "/compliance");

export const metadata: Metadata = {
  ...base,
  openGraph: { ...base.openGraph, description: ui.ogDescription },
};

export default function CompliancePage() {
  return <ComplianceMain c={content} ui={ui} locale={defaultLocale} />;
}
