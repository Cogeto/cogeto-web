import localFont from "next/font/local";

// Poppins is the brand typeface (named in the brand's animated-logo reference).
// Self-hosted woff2, subset to latin plus latin-ext so Croatian and German
// diacritics render in Poppins, not a fallback font. No external font
export const poppins = localFont({
  src: [
    { path: "../fonts/poppins-400-latin.woff2", weight: "400", style: "normal" },
    { path: "../fonts/poppins-500-latin.woff2", weight: "500", style: "normal" },
    { path: "../fonts/poppins-600-latin.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins-700-latin.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});
