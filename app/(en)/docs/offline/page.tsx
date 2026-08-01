import { defaultLocale } from "@/lib/i18n";
import { getCommon, getDocsOffline } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import { DocsOfflineMain } from "@/components/pages/docs-mains";

export const metadata = articleMetadata(getDocsOffline(defaultLocale), "/docs/offline");

export default function OfflinePage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <DocsOfflineMain
      c={getDocsOffline(defaultLocale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
