import type { PrivacyContent } from "@/content/en/privacy";
import PageHeader from "@/components/PageHeader";

/** The privacy policy page body, shared by every locale. */
export default function PrivacyMain({ c }: { c: PrivacyContent }) {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <PageHeader
        eyebrow={c.eyebrow}
        title={c.title}
        meta={<p className="mt-3 text-sm text-brand-navy/70">{c.lastUpdated}</p>}
      />

      {c.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-xl font-semibold text-brand-navy">{section.heading}</h2>
          <div className="mt-3 space-y-4">
            {section.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-brand-navy/75">
                {p}
              </p>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
