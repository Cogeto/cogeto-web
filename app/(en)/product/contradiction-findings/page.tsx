import { defaultLocale } from "@/lib/i18n";
import { getCommon, getProductPage, getTrust } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import ZPage from "@/components/ZPage";

export const revalidate = 3600;

export const metadata = articleMetadata(
  getProductPage(defaultLocale, "contradiction-findings"),
  "/product/contradiction-findings",
);

export default function ContradictionFindingsPage() {
  const { nav } = getCommon(defaultLocale);
  return (
    <ZPage
      content={getProductPage(defaultLocale, "contradiction-findings")}
      statKeys={["contradiction_recall", "verification_agreement", "extraction_recall"]}
      trustLabels={getTrust(defaultLocale)}
      ctaLabel={nav.ctaLabel}
      ctaHref={nav.ctaHref}
    />
  );
}
