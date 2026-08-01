import Image from "next/image";
import type { HomeContent } from "@/content/en/home";
import { Section } from "@/components/ui/Container";

export default function Logos({ content }: { content: HomeContent["clients"] }) {
  return (
    <Section>
      <div className="max-w-3xl">
        <h2 className="text-headline text-balance text-brand-navy">{content.title}</h2>
        <p className="mt-3 text-pretty leading-relaxed text-brand-navy/75">
          {content.subtitle}
        </p>
      </div>
      <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {content.items.map((item) => (
          <li
            key={item.name}
            className="relative flex flex-col items-center justify-center rounded-2xl border border-brand-navy/10 bg-white p-5"
          >
            {item.badge && (
              <span className="absolute right-2 top-2 rounded-full bg-brand-teal/10 px-2 py-0.5 text-[0.65rem] font-medium text-brand-teal-ink">
                {item.badge}
              </span>
            )}
            <Image
              src={item.image}
              alt={item.name}
              width={240}
              height={120}
              className="h-14 w-auto object-contain opacity-80"
            />
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-brand-navy/70">
        {content.disclaimer}
      </p>
    </Section>
  );
}
