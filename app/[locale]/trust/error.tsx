"use client";

// Safety net for the rare case where a localized trust page renders
// dynamically and the published data cannot be read. Error boundaries
// receive no route params, so the locale is read from the URL.

import { usePathname } from "next/navigation";
import { trust as hrTrust } from "@/content/hr/trust";
import { trust as deTrust } from "@/content/de/trust";
import TrustErrorMain from "@/components/pages/TrustErrorMain";

export default function TrustError() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/de") ? "de" : "hr";
  const t = locale === "de" ? deTrust : hrTrust;
  return <TrustErrorMain t={t} homeHref={`/${locale}`} />;
}
