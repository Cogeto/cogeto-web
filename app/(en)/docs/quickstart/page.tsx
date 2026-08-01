import { defaultLocale } from "@/lib/i18n";
import { getCommon, getDocsQuickstart, getDocsUi } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import { DocsQuickstartMain } from "@/components/pages/docs-mains";

export const metadata = articleMetadata(getDocsQuickstart(defaultLocale), "/docs/quickstart");

export default function QuickstartPage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <DocsQuickstartMain
      c={getDocsQuickstart(defaultLocale)}
      ui={getDocsUi(defaultLocale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
