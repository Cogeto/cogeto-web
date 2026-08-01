/**
 * Shapes of the per-locale content modules. Every locale must satisfy
 * these types, which is what keeps translations structurally complete:
 * a missing string is a compile error, never a silently English page.
 *
 * the product does today, no em or en dashes, no emoji, no exclamation
 * marks, concrete numbers over adjectives.
 */

export interface SiteContent {
  name: string;
  domain: string;
  url: string;
  /** Meta description, sourced from the content doc copy bank. */
  description: string;
  /** Meta title, sourced from the content doc copy bank. */
  metaTitle: string;
  email: string;
  github: string;
  companiesLine: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavContent {
  /** Disclosure dropdown groups in the header, in order. */
  groups: readonly { label: string; links: readonly NavLink[] }[];
  /** Flat top-level links after the groups. */
  links: readonly NavLink[];
  /** The filled call to action button. */
  ctaLabel: string;
  ctaHref: string;
  /** Accessible name for the language switcher in the header. */
  languageAria: string;
  homeAria: string;
  githubLabel: string;
  githubAria: string;
  menuLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
  skipToContent: string;
}

export interface FooterColumn {
  heading: string;
  links: readonly (NavLink & { external?: boolean })[];
}

export interface FooterContent {
  description: string;
  openSourceNote: string;
  companies: readonly { name: string; linkedin: string }[];
  columns: readonly FooterColumn[];
  licenseLines: readonly string[];
}

export interface NotFoundContent {
  eyebrow: string;
  title: string;
  body: string;
  homeLabel: string;
  links: readonly NavLink[];
}

export interface CommonContent {
  site: SiteContent;
  nav: NavContent;
  footer: FooterContent;
  notFound: NotFoundContent;
}

/** One block of a long-form article page (product, security, open source). */
export interface ArticleSection {
  heading: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  table?: { columns: readonly string[]; rows: readonly (readonly string[])[] };
  /** An evidence card: a product artifact rendered as the product reports it. */
  card?: {
    title: string;
    chip?: string;
    items: readonly { text: string; source?: string }[];
    caption?: string;
  };
  links?: readonly (NavLink & { external?: boolean })[];
  /** Question and answer disclosures rendered as native details elements. */
  faq?: readonly { question: string; answer: string }[];
  /** Interactive product demo rendered after the section's text. */
  demo?: "statusLifecycle";
}

export interface ArticleContent {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lede: string;
  sections: readonly ArticleSection[];
  cta?: { label: string; href: string; note?: string };
}
