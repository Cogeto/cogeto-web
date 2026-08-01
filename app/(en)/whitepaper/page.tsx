import { defaultLocale } from "@/lib/i18n";
import { getCommon, getWhitepaper } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import WhitepaperMain from "@/components/pages/WhitepaperMain";

export const metadata = articleMetadata(getWhitepaper(defaultLocale).content, "/whitepaper");

export default function WhitepaperPage() {
  const { site, nav } = getCommon(defaultLocale);
  const { content, meta } = getWhitepaper(defaultLocale);
  return (
    <WhitepaperMain
      content={content}
      meta={meta}
      site={site}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
