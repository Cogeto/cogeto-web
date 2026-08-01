import type { MetadataRoute } from "next";
import { defaultLocale } from "@/lib/i18n";
import { getCommon } from "@/lib/content-loader";

const { site } = getCommon(defaultLocale);

// Everything is public. AI crawlers are listed explicitly on purpose:
// being read by chatbots and answer engines is part of the goal.
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "CCBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
