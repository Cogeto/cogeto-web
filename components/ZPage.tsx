import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CtaBand, IconGrid, StatBand, ZBand } from "@/components/conversion";
import {
  AliasMock,
  AnswerMock,
  FindingMock,
  LogMock,
  NumericMock,
  ReportMock,
  SilenceMock,
} from "@/components/mockups";
import StatusDemo from "@/components/StatusDemo";
import Reveal from "@/components/Reveal";
import { fetchTrustData, formatPct, type MetricKey } from "@/lib/trust";
import type { MockKind, ZPageContent } from "@/content/en/product-contradiction-findings";
import type { TrustContent } from "@/content/en/trust";

function Mock({ kind }: { kind: MockKind }) {
  switch (kind) {
    case "finding-battery":
      return (
        <FindingMock
          claims={[
            {
              text: "The battery can be swapped during operation.",
              source: "operating manual",
            },
            {
              text: "Any power interruption requires re-initialization.",
              source: "specification, current revision",
            },
          ]}
        />
      );
    case "finding-cold":
      return (
        <FindingMock
          claims={[
            {
              text: "Cold start recorded at minus twenty five degrees.",
              source: "test report",
            },
            {
              text: "Cold start required at minus thirty two degrees.",
              source: "specification",
            },
          ]}
        />
      );
    case "numeric":
      return <NumericMock />;
    case "alias":
      return <AliasMock />;
    case "answer-conflict":
      return (
        <AnswerMock
          question="What does the spec require for cold start?"
          answer="Minus thirty two degrees, since revision D."
          citation="specification, revision D"
          warning="A test report disagrees; see the finding."
        />
      );
    case "silence":
      return <SilenceMock />;
    case "log":
      return <LogMock />;
    case "report":
      return <ReportMock />;
    case "status":
      return <StatusDemo />;
  }
}

/**
 * mockup, alternating bands, a live stat band from the published trust
 * scores, an icon grid, the objection block, and the closing CTA band.
 * Locale-agnostic: labels and the call to action arrive as props.
 */
export default async function ZPage({
  content,
  statKeys,
  trustLabels,
  ctaLabel,
  ctaHref,
}: {
  content: ZPageContent;
  statKeys: MetricKey[];
  trustLabels: TrustContent;
  ctaLabel: string;
  ctaHref: string;
}) {
  // Live numbers; the band is omitted entirely if the data cannot be read.
  let stats: { value: string; label: string }[] = [];
  try {
    const data = await fetchTrustData();
    const config = data.releases[0]?.release.configurations[0];
    if (config) {
      stats = statKeys.flatMap((key) => {
        const value = config.metrics.aggregate[key];
        return value === undefined
          ? []
          : [{ value: formatPct(value), label: trustLabels.metrics[key].label }];
      });
      stats.push({
        value: String(config.corpus.golden_cases),
        label: trustLabels.goldenCasesStatLabel,
      });
    }
  } catch {
    stats = [];
  }

  return (
    <main id="main">
      {/* Hero */}
      <div className="border-b border-brand-navy/10 bg-white pb-14 pt-32 sm:pt-36">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-brand-teal-ink">
                {content.eyebrow}
              </p>
              <h1 className="text-display mt-4 text-balance text-brand-navy">
                {content.headline}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-brand-navy/75">
                {content.lede}
              </p>
              <div className="mt-8">
                <ButtonLink href={ctaHref} variant="primary">
                  {ctaLabel}
                </ButtonLink>
              </div>
            </div>
            <Reveal delay={0.1}>
              <Mock kind={content.heroMock} />
            </Reveal>
          </div>
        </Container>
      </div>

      {/* Alternating bands */}
      {content.bands.map((band, i) => (
        <ZBand
          key={band.heading}
          heading={band.heading}
          advantage={band.advantage}
          mechanism={band.mechanism}
          link={band.link}
          mockup={<Mock kind={band.mock} />}
          flip={i % 2 === 1}
          tone={i % 2 === 0 ? "surface" : "white"}
        />
      ))}

      {/* Live stat band */}
      {stats.length > 0 && <StatBand stats={stats} note={content.statNote} />}

      {/* Secondary capability grid */}
      <Section>
        <h2 className="text-headline text-balance text-brand-navy">
          {content.gridHeading}
        </h2>
        <div className="mt-8">
          <IconGrid items={content.grid} />
        </div>
      </Section>

      {/* Objection block */}
      {content.objection && (
        <Section tone="surface">
          <h2 className="text-headline max-w-2xl text-balance text-brand-navy">
            {content.objection.heading}
          </h2>
          {content.objection.paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="mt-4 max-w-2xl text-pretty leading-relaxed text-brand-navy/75"
            >
              {p}
            </p>
          ))}
        </Section>
      )}

      <CtaBand
        heading={content.cta.heading}
        sub={content.cta.sub}
        secondary={content.cta.secondary}
        primaryLabel={ctaLabel}
        primaryHref={ctaHref}
      />
    </main>
  );
}
