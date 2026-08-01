import { defaultLocale } from "@/lib/i18n";
import { getDocsIndex } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import { DocsIndexMain } from "@/components/pages/docs-mains";

export const metadata = articleMetadata(getDocsIndex(defaultLocale), "/docs");

export default function DocsPage() {
  return <DocsIndexMain c={getDocsIndex(defaultLocale)} />;
}
