import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  FileSignature,
  FileText,
  FlaskConical,
  History,
  Mail,
  ScanLine,
  StickyNote,
  type LucideIcon,
} from "lucide-react";
import type { BentoItem, HomeContent } from "@/content/en/home";
import Reveal from "@/components/Reveal";

const sourceIcons: Record<string, LucideIcon> = {
  specification: FileText,
  manual: BookOpen,
  "test report": FlaskConical,
  mail: Mail,
  scan: ScanLine,
  note: StickyNote,
};

/* Mini product-style vignettes, one per capability. Decorative: the markup's
   default styling is the final state, so reduced motion (which removes the
   bento-* animations) leaves every tile readable. */
function Vignette({ item }: { item: BentoItem }) {
  switch (item.kind) {
    case "memory":
      return (
        <div className="flex flex-wrap items-center gap-2">
          {item.sources.map((source, i) => {
            const Icon = sourceIcons[source] ?? FileText;
            return (
              <span
                key={source}
                className="bento-drift flex items-center gap-1.5 rounded-lg border border-brand-navy/10 bg-white px-2.5 py-1.5 text-[0.7rem] font-medium text-brand-navy/70 shadow-sm"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <Icon size={12} strokeWidth={1.75} aria-hidden="true" />
                {source}
              </span>
            );
          })}
          <ArrowRight
            size={16}
            strokeWidth={1.75}
            aria-hidden="true"
            className="shrink-0 text-brand-navy/30"
          />
          <span className="shrink-0 rounded-lg bg-brand-navy px-3 py-1.5 text-[0.7rem] font-medium text-white shadow-sm">
            {item.memoryLabel}
          </span>
        </div>
      );
    case "qa":
    case "timetravel":
      return (
        <div className="space-y-2.5">
          <p className="bento-pop ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-brand-navy px-3.5 py-2 text-xs leading-relaxed text-white">
            {item.question}
          </p>
          <div
            className="bento-pop w-fit max-w-[85%] rounded-2xl rounded-bl-sm border border-brand-navy/10 bg-white px-3.5 py-2 shadow-sm"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-xs font-semibold text-brand-navy">{item.answer}</p>
            <p
              className={`mt-0.5 flex items-center gap-1 text-[0.65rem] ${
                item.kind === "timetravel" ? "text-brand-navy/60" : "text-brand-teal-ink"
              }`}
            >
              {item.kind === "timetravel" ? (
                <History size={11} strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <BadgeCheck size={11} strokeWidth={1.75} aria-hidden="true" />
              )}
              {item.source}
            </p>
          </div>
        </div>
      );
    case "changed":
      return (
        <div className="space-y-2">
          <p className="relative w-fit text-xs text-brand-navy/45">
            {item.oldValue}
            <span className="bento-strike absolute left-0 top-1/2 h-px w-full origin-left bg-brand-navy/50" />
          </p>
          <p
            className="bento-pop flex w-fit items-center gap-1.5 text-xs font-semibold text-brand-navy"
            style={{ animationDelay: "0.6s" }}
          >
            <BadgeCheck
              size={13}
              strokeWidth={1.75}
              aria-hidden="true"
              className="text-brand-teal-ink"
            />
            {item.newValue}
          </p>
          <p className="w-fit rounded-full bg-amber-100 px-2 py-0.5 text-[0.65rem] font-medium text-amber-800">
            {item.tag}
          </p>
        </div>
      );
    case "report":
      return (
        <div className="rounded-xl border border-brand-navy/10 bg-white p-3.5 shadow-sm">
          <p className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-brand-navy/50">
            <FileSignature size={12} strokeWidth={1.75} aria-hidden="true" />
            {item.header}
          </p>
          <div className="mt-2.5 space-y-1.5">
            <span className="bento-type block h-1.5 w-full origin-left rounded-full bg-brand-navy/15" />
            <span
              className="bento-type block h-1.5 w-5/6 origin-left rounded-full bg-brand-navy/15"
              style={{ animationDelay: "0.5s" }}
            />
            <span
              className="bento-type block h-1.5 w-3/5 origin-left rounded-full bg-brand-navy/15"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <p className="mt-3">
            <span
              className="bento-fade inline-block rounded-full bg-brand-teal/15 px-2 py-0.5 text-[0.65rem] font-medium text-brand-teal-ink"
              style={{ animationDelay: "1.6s" }}
            >
              {item.chip}
            </span>
          </p>
        </div>
      );
    case "silence":
      return (
        <div className="space-y-2">
          <p className="bento-lift w-fit rounded-lg border border-brand-navy/15 bg-brand-navy/5 px-2.5 py-1 text-xs font-semibold text-brand-navy/70">
            {item.banner}
          </p>
          <p className="text-xs leading-relaxed text-brand-navy/55">{item.answer}</p>
        </div>
      );
  }
}

const tileSpans: Record<BentoItem["kind"], string> = {
  memory: "md:col-span-2",
  qa: "",
  changed: "",
  report: "",
  timetravel: "",
  silence: "",
};

/** The animated capability grid: each tile is a miniature of the product. */
export default function Bento({ content }: { content: HomeContent["bento"] }) {
  return (
    <section
      id="what-is"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-28"
      aria-labelledby="what-is-heading"
    >
      <Reveal>
        <h2
          id="what-is-heading"
          className="text-center text-3xl font-semibold tracking-tight text-brand-navy"
        >
          {content.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-pretty leading-relaxed text-brand-navy/70">
          {content.subtitle}
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-3">
        {content.items.map((item, i) => (
          <Reveal key={item.title} delay={0.04 * i} className={`h-full ${tileSpans[item.kind]}`}>
            <article className="flex h-full flex-col rounded-3xl border border-brand-navy/10 bg-surface/60 p-6">
              <div aria-hidden="true" className="flex flex-1 items-center">
                <div className="w-full">
                  <Vignette item={item} />
                </div>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-brand-navy">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/70">{item.text}</p>
            </article>
          </Reveal>
        ))}

        <Reveal delay={0.04 * content.items.length} className="h-full md:col-span-2">
          <Link
            href={content.cta.href}
            className="group flex h-full flex-col justify-center rounded-3xl bg-brand-navy-deep p-6 text-white transition-colors hover:bg-brand-navy sm:p-8"
          >
            <span className="flex items-center gap-3 text-lg font-semibold">
              {content.cta.title}
              <ArrowRight
                size={20}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </span>
            <span className="mt-1.5 text-sm text-white/70">{content.cta.text}</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
