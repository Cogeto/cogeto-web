import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCommon, getTrust } from "@/lib/content-loader";
import { languageAlternates } from "@/lib/article-metadata";
import { fetchTrustData, withHouseStyleNotes } from "@/lib/trust";
import TrustMain from "@/components/pages/TrustMain";

// Incremental Static Regeneration, like the English page: served
// statically and refreshed from the product repository at most hourly.
// A failed refresh throws, so the last good page keeps serving.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const { site } = getCommon(locale);
  const t = getTrust(locale);
  return {
    title: t.eyebrow,
    description: t.thesis,
    alternates: {
      canonical: `/${locale}/trust`,
      languages: languageAlternates("/trust"),
    },
    openGraph: {
      title: `${t.eyebrow} | ${site.name}`,
      description: t.thesis,
      url: `${site.url}/${locale}/trust`,
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const raw = await fetchTrustData();
  // Normalize transcribed release notes to the site's no-dash house style
  // at the server boundary, exactly like the English page.
  const data = {
    ...raw,
    releases: raw.releases.map((r) => ({ ...r, release: withHouseStyleNotes(r.release) })),
  };
  return <TrustMain data={data} t={getTrust(locale)} locale={locale} />;
}
