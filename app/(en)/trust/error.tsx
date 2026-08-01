"use client";

// Safety net for the rare case where the trust page renders dynamically and the
// published data cannot be read. In normal operation ISR serves the last good
// page and this never appears; it exists so a visitor never meets a raw error.

import { trust } from "@/content/en/trust";
import TrustErrorMain from "@/components/pages/TrustErrorMain";

export default function TrustError() {
  return <TrustErrorMain t={trust} homeHref="/" />;
}
