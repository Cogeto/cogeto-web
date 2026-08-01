import type { Locale } from "@/lib/i18n";
import { getCommon, getHome, getTrust } from "@/lib/content-loader";
import HomeMain from "@/components/pages/HomeMain";

// The proof strip reads the published trust-score files server-side, so the
// localized homepages revalidate hourly like the English one.
export const revalidate = 3600;

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { site, nav } = getCommon(locale);

  // Structured data: the localized page of the same website. The
  // organization graph lives on the English homepage.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${site.url}/${locale}#webpage`,
    url: `${site.url}/${locale}`,
    name: site.metaTitle,
    description: site.description,
    inLanguage: locale,
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    primaryImageOfPage: `${site.url}/og.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeMain
        home={getHome(locale)}
        trustLabels={getTrust(locale)}
        cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
      />
    </>
  );
}
