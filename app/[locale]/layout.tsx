import type { Metadata } from "next";
import { poppins } from "../fonts";
import type { Locale } from "@/lib/i18n";
import { prefixedLocales } from "@/lib/i18n";
import { getCommon } from "@/lib/content-loader";
import { languageAlternates } from "@/lib/article-metadata";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/sections/Footer";
import "../globals.css";

/**
 * Second root layout: Croatian and German serve under /hr and /de with
 * their own <html lang> and localized chrome. English keeps the root
 * URLs via the (en) route group. Only the generated locales exist;
 * anything else 404s.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return prefixedLocales.map((locale) => ({ locale }));
}

const OG_LOCALES: Record<string, string> = { hr: "hr_HR", de: "de_DE" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const { site } = getCommon(locale);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: site.metaTitle,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: "MVT Solutions Group", url: site.url }],
    creator: "MVT Solutions Group",
    publisher: "MVT Solutions Group",
    category: "technology",
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates("/"),
    },
    openGraph: {
      title: site.metaTitle,
      description: site.description,
      url: `${site.url}/${locale}`,
      siteName: site.name,
      locale: OG_LOCALES[locale],
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Cogeto logo" }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.metaTitle,
      description: site.description,
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport = {
  themeColor: "#1c2150",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale as Locale;
  const { site, nav, footer } = getCommon(locale);
  return (
    <html lang={locale} className={poppins.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-navy focus:px-5 focus:py-2.5 focus:font-medium focus:text-white"
        >
          {nav.skipToContent}
        </a>
        <SiteHeader nav={nav} github={site.github} locale={locale} />
        {children}
        <Footer footer={footer} site={site} />
      </body>
    </html>
  );
}
