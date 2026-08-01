import type { Metadata } from "next";
import { poppins } from "../fonts";
import { defaultLocale } from "@/lib/i18n";
import { getCommon } from "@/lib/content-loader";
import { languageAlternates } from "@/lib/article-metadata";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/sections/Footer";
import "../globals.css";

const { site, nav, footer } = getCommon(defaultLocale);

export const metadata: Metadata = {
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
  alternates: { canonical: "/", languages: languageAlternates("/") },
  keywords: [
    "institutional memory",
    "document contradiction detection",
    "verified memory",
    "document verification",
    "findings report",
    "EU-hosted AI",
    "self-hosted AI",
    "air-gapped AI",
    "provable deletion",
    "open source AI",
  ],
  openGraph: {
    title: site.metaTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_US",
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

export const viewport = {
  themeColor: "#1c2150",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={defaultLocale} className={poppins.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-navy focus:px-5 focus:py-2.5 focus:font-medium focus:text-white"
        >
          {nav.skipToContent}
        </a>
        <SiteHeader nav={nav} github={site.github} locale={defaultLocale} />
        {children}
        <Footer footer={footer} site={site} />
      </body>
    </html>
  );
}
