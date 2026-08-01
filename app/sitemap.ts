import type { MetadataRoute } from "next";
import { defaultLocale, prefixedLocales } from "@/lib/i18n";
import { getCommon } from "@/lib/content-loader";

const { site } = getCommon(defaultLocale);

// the homepages and trust pages refresh their data via ISR without a redeploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  type Freq = "weekly" | "hourly" | "monthly" | "yearly";
  const entry = (path: string, changeFrequency: Freq, priority: number) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  // Every route that exists in all three locales, with its base metadata.
  const localized: [string, Freq, number][] = [
    ["", "weekly", 1],
    ["/product/contradiction-findings", "monthly", 0.9],
    ["/product/verified-memory", "monthly", 0.9],
    ["/product/findings-report", "monthly", 0.9],
    ["/security", "monthly", 0.8],
    ["/trust", "hourly", 0.8],
    ["/open-source", "monthly", 0.7],
    ["/whitepaper", "monthly", 0.7],
    ["/get-started", "monthly", 0.8],
    ["/case-studies", "monthly", 0.8],
    ["/case-studies/medical-devices", "monthly", 0.7],
    ["/case-studies/defense", "monthly", 0.7],
    ["/case-studies/automotive-paint", "monthly", 0.7],
    ["/case-studies/engineering-teams", "monthly", 0.7],
    ["/docs", "monthly", 0.7],
    ["/docs/quickstart", "monthly", 0.7],
    ["/docs/self-hosted", "monthly", 0.7],
    ["/docs/offline", "monthly", 0.7],
    ["/compliance", "monthly", 0.6],
    ["/privacy", "yearly", 0.3],
    ["/imprint", "yearly", 0.3],
  ];

  return [
    ...localized.map(([path, freq, priority]) => entry(path, freq, priority)),
    ...prefixedLocales.flatMap((locale) =>
      localized.map(([path, freq, priority]) =>
        entry(`/${locale}${path}`, freq, priority),
      ),
    ),
  ];
}
