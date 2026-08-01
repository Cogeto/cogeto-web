import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale, type Locale } from "@/lib/i18n";
import { getCaseIndex, getCaseStudies, getCsShared } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import CaseStudyPage from "@/components/CaseStudyPage";

export const dynamicParams = false;

export function generateStaticParams() {
  // Slugs are shared across locales; the locale segment comes from the layout.
  return getCaseStudies(defaultLocale).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const study = getCaseStudies(locale).find((s) => s.slug === slug);
  if (!study) return {};
  const meta = articleMetadata(study, `/case-studies/${slug}`, locale);
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [{ url: `/og/case-${slug}.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const studies = getCaseStudies(locale);
  const study = studies.find((s) => s.slug === slug);
  if (!study) notFound();
  return (
    <CaseStudyPage
      study={study}
      studies={studies}
      shared={getCsShared(locale)}
      breadcrumbLabel={getCaseIndex(locale).metaTitle}
      locale={locale}
    />
  );
}
