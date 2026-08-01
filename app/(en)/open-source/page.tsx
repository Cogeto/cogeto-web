import { defaultLocale } from "@/lib/i18n";
import { getCommon, getOpenSource } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import OpenSourceMain from "@/components/pages/OpenSourceMain";

export const metadata = articleMetadata(getOpenSource(defaultLocale), "/open-source");

export default function OpenSourcePage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <OpenSourceMain
      c={getOpenSource(defaultLocale)}
      cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
    />
  );
}
