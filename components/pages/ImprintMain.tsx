import type { ImprintContent } from "@/content/en/imprint";
import PageHeader from "@/components/PageHeader";

/** The imprint page body, shared by every locale. */
export default function ImprintMain({ c }: { c: ImprintContent }) {
  return (
    <main id="main" className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
      <PageHeader eyebrow={c.eyebrow} title={c.title} lede={c.lede} />

      <div className="mt-10 space-y-8">
        {c.entities.map((entity) => (
          <section
            key={entity.name}
            aria-label={entity.name}
            className="rounded-3xl border border-brand-navy/10 bg-white p-7 sm:p-8"
          >
            <h2 className="text-lg font-semibold text-brand-navy">{entity.name}</h2>
            <dl className="mt-5 space-y-2.5">
              {entity.fields.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
                  <dt className="shrink-0 text-sm font-medium text-brand-navy sm:w-48 sm:pt-0.5">
                    {label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-brand-navy/75 sm:pt-0.5">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <p className="mt-10 leading-relaxed text-brand-navy/75">
        {c.contactLabel}{" "}
        <a
          href={`mailto:${c.email}`}
          className="font-medium text-brand-teal-ink hover:underline"
        >
          {c.email}
        </a>
      </p>
    </main>
  );
}
