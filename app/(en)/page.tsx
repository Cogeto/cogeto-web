import { defaultLocale } from "@/lib/i18n";
import { getCommon, getHome, getTrust } from "@/lib/content-loader";
import HomeMain from "@/components/pages/HomeMain";

// The proof strip reads the published trust-score files server-side, so the
// homepage revalidates hourly like /trust. Everything else is static copy.
export const revalidate = 3600;

const { site, nav } = getCommon(defaultLocale);

// Structured data for search engines and AI crawlers (schema.org JSON-LD).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/brand/cogeto-final-icon.svg`,
      image: `${site.url}/og.png`,
      email: site.email,
      description: site.description,
      foundingLocation: { "@type": "Place", name: "Zagreb, Croatia, EU" },
      sameAs: [site.github],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: site.metaTitle,
      description: site.description,
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
      primaryImageOfPage: `${site.url}/og.png`,
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${site.url}/#sourcecode`,
      name: site.name,
      description: site.description,
      codeRepository: site.github,
      license: "https://www.gnu.org/licenses/agpl-3.0.html",
      author: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeMain
        home={getHome(defaultLocale)}
        trustLabels={getTrust(defaultLocale)}
        cta={{ label: nav.ctaLabel, href: nav.ctaHref }}
      />
    </>
  );
}
