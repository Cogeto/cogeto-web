import { defaultLocale } from "@/lib/i18n";
import { getCommon, getProductPage, getTrust } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import ZPage from "@/components/ZPage";

export const revalidate = 3600;

export const metadata = articleMetadata(
  getProductPage(defaultLocale, "verified-memory"),
  "/product/verified-memory",
);

export default function VerifiedMemoryPage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <ZPage
      content={getProductPage(defaultLocale, "verified-memory")}
      statKeys={["verification_agreement", "extraction_precision", "extraction_recall"]}
      trustLabels={getTrust(defaultLocale)}
      ctaLabel={nav.ctaLabel}
      ctaHref={nav.ctaHref}
    />
  );
}
