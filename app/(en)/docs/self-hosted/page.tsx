import { defaultLocale } from "@/lib/i18n";
import { getCommon, getDocsSelfHosted, getDocsUi } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import { DocsSelfHostedMain } from "@/components/pages/docs-mains";

export const metadata = articleMetadata(getDocsSelfHosted(defaultLocale), "/docs/self-hosted");

export default function SelfHostedPage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <DocsSelfHostedMain
      c={getDocsSelfHosted(defaultLocale)}
      ui={getDocsUi(defaultLocale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
