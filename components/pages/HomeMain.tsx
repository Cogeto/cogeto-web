import type { HomeContent } from "@/content/en/home";
import type { TrustContent } from "@/content/en/trust";
import Hero from "@/components/home/Hero";
import Bento from "@/components/home/Bento";
import Flow from "@/components/home/Flow";
import { GettingStarted, Sovereignty } from "@/components/home/sections";
import ProofStrip from "@/components/home/ProofStrip";
import Logos from "@/components/home/Logos";
import AskAssistant from "@/components/home/AskAssistant";
import { CtaBand } from "@/components/conversion";

/**
 * The homepage body, shared by every locale. Content arrives as props
 * from the route; the proof strip reads the published trust-score files
 * server-side, so routes using this keep hourly revalidation.
 */
export default function HomeMain({
  home,
  trustLabels,
  cta,
}: {
  home: HomeContent;
  trustLabels: TrustContent;
  cta: { label: string; href: string };
}) {
  return (
    <main id="main">
      <Hero content={home.hero} />
      <Bento content={home.bento} />
      <Flow content={home.how} />
      <Sovereignty content={home.sovereignty} />
      <ProofStrip content={home.proof} trustLabels={trustLabels} />
      <Logos content={home.clients} />
      <AskAssistant content={home.askAssistant} />
      <GettingStarted content={home.gettingStarted} />
      <CtaBand
        heading={home.closing.heading}
        sub={home.closing.sub}
        secondary={home.closing.secondary}
        primaryLabel={cta.label}
        primaryHref={cta.href}
      />
    </main>
  );
}
