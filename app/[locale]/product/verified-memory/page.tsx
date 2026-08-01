import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { getCommon, getProductPage, getTrust } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import ZPage from "@/components/ZPage";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return articleMetadata(
    getProductPage(locale, "verified-memory"),
    "/product/verified-memory",
    locale,
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale as Locale;
  const { nav } = getCommon(locale);
  return (
    <ZPage
      content={getProductPage(locale, "verified-memory")}
      statKeys={["verification_agreement","extraction_precision","extraction_recall"]}
      trustLabels={getTrust(locale)}
      ctaLabel={nav.ctaLabel}
      ctaHref={nav.ctaHref}
    />
  );
}
