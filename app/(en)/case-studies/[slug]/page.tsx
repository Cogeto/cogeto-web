import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";
import { getCaseIndex, getCaseStudies, getCsShared } from "@/lib/content-loader";
import { articleMetadata } from "@/lib/article-metadata";
import CaseStudyPage from "@/components/CaseStudyPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies(defaultLocale).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudies(defaultLocale).find((s) => s.slug === slug);
  if (!study) return {};
  const meta = articleMetadata(study, `/case-studies/${slug}`);
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const studies = getCaseStudies(defaultLocale);
  const study = studies.find((s) => s.slug === slug);
  if (!study) notFound();
  return (
    <CaseStudyPage
      study={study}
      studies={studies}
      shared={getCsShared(defaultLocale)}
      breadcrumbLabel={getCaseIndex(defaultLocale).metaTitle}
      locale={defaultLocale}
    />
  );
}
