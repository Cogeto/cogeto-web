import type { Metadata } from "next";
import { defaultLocale } from "@/lib/i18n";
import { getCommon, getTrust } from "@/lib/content-loader";
import { languageAlternates } from "@/lib/article-metadata";
import { fetchTrustData, withHouseStyleNotes } from "@/lib/trust";
import TrustMain from "@/components/pages/TrustMain";

// Incremental Static Regeneration: the page is statically served and refreshed
// from the product repository at most once an hour. If a background refresh
// fails, the render throws and Next keeps serving the last good page, so a
// visitor never sees a broken or half-rendered page. All fetching happens on
// the server; the browser only ever talks to cogeto.eu.
export const revalidate = 3600;

const { site } = getCommon(defaultLocale);

export const metadata: Metadata = {
  title: "Trust scores",
  description:
    "Cogeto publishes its measured accuracy for every release, per language and per model configuration, including the numbers below their targets. The public data files sit behind every number.",
  alternates: { canonical: "/trust", languages: languageAlternates("/trust") },
  openGraph: {
    title: `Trust scores | ${site.name}`,
    description:
      "The measured accuracy of Cogeto, published per release like an uptime page, with links to the exact data files.",
    url: `${site.url}/trust`,
    type: "website",
  },
};

export default async function TrustPage() {
  const raw = await fetchTrustData();
  // Normalize transcribed release notes to the site's no-dash house style at the
  // server boundary, so no em or en dash reaches the served HTML (including the
  // hydration payload). The exact text stays linked per release for fidelity.
  const data = {
    ...raw,
    releases: raw.releases.map((r) => ({ ...r, release: withHouseStyleNotes(r.release) })),
  };
  return <TrustMain data={data} t={getTrust(defaultLocale)} locale={defaultLocale} />;
}
