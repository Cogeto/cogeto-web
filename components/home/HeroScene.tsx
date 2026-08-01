"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  BookOpen,
  FileText,
  FlaskConical,
  GitCompareArrows,
  History,
  Inbox,
  Mail,
  ScanLine,
  StickyNote,
  Table,
  type LucideIcon,
} from "lucide-react";
import type { HomeContent, HeroVignette } from "@/content/en/home";

const icons: Record<string, LucideIcon> = {
  FileText,
  BookOpen,
  FlaskConical,
  Mail,
  ScanLine,
  Table,
  StickyNote,
};

/* Fixed px offsets from center, one per fragment; kept small enough that
   every chip stays inside the scene at 320px wide. */
const scatterOffsets = [
  { x: -118, y: -112, rotate: -8 },
  { x: 112, y: -124, rotate: 6 },
  { x: -128, y: 26, rotate: 5 },
  { x: 118, y: 42, rotate: -5 },
  { x: -12, y: 128, rotate: 9 },
  { x: 120, y: -42, rotate: 7 },
  { x: -22, y: -132, rotate: -6 },
] as const;

const ease = [0.33, 1, 0.68, 1] as const;

const SCATTER_MS = 2000;

function VignetteCard({ vignette }: { vignette: HeroVignette }) {
  return (
    <div className="w-[min(20rem,80vw)] rounded-2xl border border-brand-navy/10 bg-white/95 p-5 shadow-xl shadow-brand-navy/10 backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-navy/50">
        {vignette.label}
      </p>

      {vignette.kind === "finding" && (
        <>
          <ul className="mt-3 space-y-2.5">
            {vignette.claims.map((claim) => (
              <li
                key={claim.text}
                className="rounded-xl border border-brand-navy/10 bg-surface/60 px-3.5 py-2.5"
              >
                <p className="text-sm font-medium leading-snug text-brand-navy">
                  {claim.text}
                </p>
                <p className="mt-0.5 text-[0.65rem] text-brand-navy/50">{claim.source}</p>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-800">
              <GitCompareArrows size={12} strokeWidth={2} aria-hidden="true" />
              {vignette.chip}
            </span>
          </p>
        </>
      )}

      {vignette.kind === "ingest" && (
        <>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-brand-navy">
            <Inbox
              size={15}
              strokeWidth={1.75}
              aria-hidden="true"
              className="text-brand-teal-ink"
            />
            {vignette.text}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/70">
            {vignette.detail}
          </p>
          <p className="mt-3 text-xs text-brand-teal-ink">
            <span className="rounded-full bg-brand-teal/15 px-2 py-0.5 font-medium">
              {vignette.chip}
            </span>
          </p>
        </>
      )}

      {(vignette.kind === "qa" || vignette.kind === "timetravel") && (
        <>
          <p className="mt-1.5 text-sm leading-relaxed text-brand-navy/80">
            {vignette.question}
          </p>
          <div className="mt-4 rounded-xl bg-surface px-4 py-3">
            <p className="text-sm font-semibold leading-relaxed text-brand-navy">
              {vignette.answer}
            </p>
            {vignette.kind === "timetravel" ? (
              <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-brand-navy/60">
                <History size={14} strokeWidth={1.75} aria-hidden="true" />
                {vignette.citation}
                <span className="rounded-full bg-brand-navy/10 px-2 py-0.5 font-medium text-brand-navy/70">
                  {vignette.chip}
                </span>
              </p>
            ) : (
              <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-brand-teal-ink">
                <BadgeCheck size={14} strokeWidth={1.75} aria-hidden="true" />
                {vignette.citation}
                <span className="rounded-full bg-brand-teal/15 px-2 py-0.5 font-medium">
                  {vignette.chip}
                </span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * The hero's story in one loop: scattered fragments of a document set
 * (specifications, manuals, test reports, mail, scans, spreadsheets, notes)
 * converge into a rotating set of resolved cards: a verified answer with its
 * citation, a contradiction finding with both sources, an ingestion
 * confirmation, and a past state recalled via time travel. Static resolved
 * frame under reduced motion.
 */
export default function HeroScene({
  scene,
}: {
  scene: HomeContent["hero"]["scene"];
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"scatter" | "resolved">("scatter");
  const [vignette, setVignette] = useState(0);

  const vignettes = scene.vignettes;

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(
      () => {
        // Advance while the card is hidden, so it always fades out showing
        // the same vignette it faded in with.
        if (phase === "scatter") {
          setVignette((v) => (v + 1) % vignettes.length);
        }
        setPhase((p) => (p === "scatter" ? "resolved" : "scatter"));
      },
      phase === "scatter" ? SCATTER_MS : vignettes[vignette].holdMs,
    );
    return () => clearTimeout(t);
  }, [phase, reduce, vignette, vignettes]);

  return (
    <div
      role="img"
      aria-label={scene.ariaLabel}
      className="relative mx-auto aspect-[5/4] w-full max-w-md select-none lg:max-w-lg"
    >
      <div aria-hidden="true" className="absolute inset-0">
        {scene.fragments.map((fragment, i) => {
          const Icon = icons[fragment.icon];
          const offset = scatterOffsets[i % scatterOffsets.length];
          return (
            <motion.div
              key={fragment.label}
              className="absolute left-1/2 top-1/2"
              initial={false}
              animate={
                reduce
                  ? {
                      x: offset.x,
                      y: offset.y,
                      rotate: offset.rotate,
                      opacity: 0.35,
                      scale: 1,
                    }
                  : phase === "scatter"
                    ? {
                        x: offset.x,
                        y: offset.y,
                        rotate: offset.rotate,
                        opacity: 1,
                        scale: 1,
                      }
                    : { x: 0, y: 0, rotate: 0, opacity: 0, scale: 0.55 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : phase === "scatter"
                    ? { duration: 0.8, ease, delay: i * 0.06 }
                    : { duration: 0.7, ease, delay: i * 0.05 }
              }
            >
              <span
                className="hero-frag-float flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-xl border border-brand-navy/10 bg-white/85 px-3 py-2 text-xs font-medium text-brand-navy/70 shadow-sm"
                style={{ animationDelay: `${i * -0.7}s` }}
              >
                <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
                {fragment.label}
              </span>
            </motion.div>
          );
        })}

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={
            reduce || phase === "resolved"
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.92, y: 10 }
          }
          transition={
            reduce
              ? { duration: 0 }
              : phase === "resolved"
                ? { duration: 0.6, ease, delay: 0.35 }
                : { duration: 0.4, ease }
          }
        >
          <VignetteCard vignette={reduce ? vignettes[0] : vignettes[vignette]} />
        </motion.div>
      </div>
    </div>
  );
}
