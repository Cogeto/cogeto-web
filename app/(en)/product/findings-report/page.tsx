import { defaultLocale } from "@/lib/i18n";
import { getCommon, getProductPage, getTrust } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import ZPage from "@/components/ZPage";

export const revalidate = 3600;

export const metadata = articleMetadata(
  getProductPage(defaultLocale, "findings-report"),
  "/product/findings-report",
);

export default function FindingsReportPage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <ZPage
      content={getProductPage(defaultLocale, "findings-report")}
      statKeys={["contradiction_recall", "verification_agreement", "dedup_accuracy"]}
      trustLabels={getTrust(defaultLocale)}
      ctaLabel={nav.ctaLabel}
      ctaHref={nav.ctaHref}
    />
  );
}
