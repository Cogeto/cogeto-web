import Link from "next/link";
import { Award, Code, WifiOff, type LucideIcon } from "lucide-react";
import type { HomeContent } from "@/content/en/home";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import HeroScene from "@/components/home/HeroScene";

const badgeIcons: Record<string, LucideIcon> = { Code, Award, WifiOff };

/**
 * The hero: positioning line with a gradient accent, mechanics subhead, two
 * CTAs, the animated scene (documents converging into verified answers,
 * findings, and time travel), and the linked trust strip.
 */
export default function Hero({ content }: { content: HomeContent["hero"] }) {
  return (
    <div className="relative overflow-hidden border-b border-brand-navy/10 pb-14 pt-32 sm:pt-36">
      {/* Ambient color, drifting slowly; static under reduced motion. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="hero-blob absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-brand-teal/15 blur-3xl" />
        <div className="hero-blob hero-blob-2 absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-brand-navy/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/60 via-white to-white" />
      </div>

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <h1 className="text-display text-balance text-brand-navy">
              {content.headlineA}{" "}
              <span className="bg-gradient-to-r from-brand-navy via-brand-teal-ink to-brand-teal bg-clip-text text-transparent">
                {content.headlineB}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-brand-navy/75">
              {content.subhead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={content.ctaPrimary.href} variant="primary">
                {content.ctaPrimary.label}
              </ButtonLink>
              <ButtonLink href={content.ctaSecondary.href} variant="secondary">
                {content.ctaSecondary.label}
              </ButtonLink>
            </div>
          </div>

          <HeroScene scene={content.scene} />
        </div>

        {/* Proof badges: the three strongest verifiable facts, each linked
            to its evidence. The rest of the proof lives in the sections
            below (sovereignty, live scores). */}
        <ul className="mt-12 flex flex-wrap items-center gap-3 border-t border-brand-navy/10 pt-7">
          {content.trustStrip.map((item) => {
            const Icon = badgeIcons[item.icon] ?? Code;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-navy/15 bg-white/80 px-4 py-2 text-sm font-medium text-brand-navy/80 shadow-sm transition-colors hover:border-brand-teal-ink hover:text-brand-teal-ink"
                >
                  <Icon
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className="text-brand-teal-ink"
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
