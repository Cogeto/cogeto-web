"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import type { ChatExchange } from "@/content/en/case-studies";

export interface ChatUiLabels {
  header: string;
  you: string;
  remember: string;
  fromMemory: string;
  thinking: string;
  standsOn: string;
  placeholder: string;
  hint: string;
}

/**
 * a question types itself, Cogeto thinks, a cited answer streams in,
 * chips pop, the STANDS ON row lands, then the next exchange. Matches
 * docs/reference-ui. Starts on scroll into view; loops forever. Under
 * reduced motion the first exchange renders complete and static. The
 * animated region is aria-hidden; a visually hidden transcript carries
 * the content for assistive tech. DOM, CSS, and timers only.
 */

const mono = "font-mono tracking-[0.15em] uppercase";

function Chip({ label, pop }: { label: string; pop: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-brand-navy/15 bg-white px-2.5 py-0.5 text-[0.65rem] font-medium text-brand-navy/75 ${
        pop ? "chip-pop" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="inline-block h-1.5 w-1.5 rotate-45 border border-brand-teal-ink"
      />
      {label}
    </span>
  );
}

function CogetoLabel({ text }: { text: string }) {
  return (
    <p className={`${mono} flex items-center gap-1.5 text-[0.6rem] font-semibold text-brand-navy/70`}>
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
      {text}
    </p>
  );
}

type Phase = "idle" | "typing" | "thinking" | "streaming" | "stands" | "fade";

export default function ChatDemo({
  exchanges,
  ui,
}: {
  exchanges: ChatExchange[];
  ui: ChatUiLabels;
}) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [exIndex, setExIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(0);
  const [streamed, setStreamed] = useState(0);

  const ex = exchanges[exIndex];
  const words = ex.segments
    .flatMap((s) => s.text.split(" "))
    .concat(ex.conflict ? ex.conflict.text.split(" ") : []);
  const segEnds: number[] = [];
  let acc = 0;
  for (const s of ex.segments) {
    acc += s.text.split(" ").length;
    segEnds.push(acc);
  }

  // Start only when scrolled into view.
  useEffect(() => {
    if (reduce || started) return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          setPhase("typing");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, started]);

  // The state machine, one timer at a time.
  useEffect(() => {
    if (reduce || phase === "idle") return;
    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (typed < ex.question.length) {
        t = setTimeout(() => setTyped((n) => n + 1), 22 + Math.random() * 35);
      } else {
        t = setTimeout(() => setPhase("thinking"), 400);
      }
    } else if (phase === "thinking") {
      t = setTimeout(() => setPhase("streaming"), ex.silence ? 1100 : 800);
    } else if (phase === "streaming") {
      if (streamed < words.length) {
        t = setTimeout(() => setStreamed((n) => n + 1), 28 + Math.random() * 30);
      } else {
        t = setTimeout(() => setPhase("stands"), 400);
      }
    } else if (phase === "stands") {
      t = setTimeout(() => setPhase("fade"), 9000);
    } else if (phase === "fade") {
      t = setTimeout(() => {
        setExIndex((i) => (i + 1) % exchanges.length);
        setTyped(0);
        setStreamed(0);
        setPhase("typing");
      }, 450);
    }
    return () => clearTimeout(t);
  }, [phase, typed, streamed, reduce, ex, words.length, exchanges.length]);

  const done = reduce === true;
  const showTranscript = done || phase !== "typing";
  const showAnswer = done || phase === "streaming" || phase === "stands" || phase === "fade";
  const showStands = done || phase === "stands" || phase === "fade";
  const shownEx = done ? exchanges[0] : ex;
  const wordsShown = done ? Number.MAX_SAFE_INTEGER : streamed;

  const segText = (i: number) => {
    const seg = shownEx.segments[i];
    if (done) return seg.text;
    const start = i === 0 ? 0 : segEnds[i - 1];
    const n = Math.max(0, Math.min(wordsShown, segEnds[i]) - start);
    return seg.text.split(" ").slice(0, n).join(" ");
  };
  const conflictShown = shownEx.conflict
    ? done || wordsShown > (segEnds[segEnds.length - 1] ?? 0)
    : false;

  return (
    <div ref={rootRef}>
      {/* Screen reader transcript: the full scripted exchanges, static. */}
      <div className="sr-only">
        {exchanges.map((e) => (
          <p key={e.question}>
            {e.question} {e.segments.map((s) => s.text).join(" ")}{" "}
            {e.conflict?.text} {e.silence && `${e.silence.title} ${e.silence.banner}`}{" "}
            {e.standsOn.length > 0 && `Stands on: ${e.standsOn.join(", ")}.`}
          </p>
        ))}
      </div>

      <div
        aria-hidden="true"
        className={`mx-auto max-w-2xl select-none rounded-3xl border border-brand-navy/10 bg-white shadow-lg shadow-brand-navy/5 transition-opacity duration-500 motion-reduce:transition-none ${
          phase === "fade" ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Header */}
        <p className={`${mono} border-b border-brand-navy/10 px-6 py-3 text-[0.6rem] font-semibold text-brand-navy/60`}>
          COGETO · <span className="text-brand-navy">{ui.header}</span>
        </p>

        {/* Transcript */}
        <div className="flex min-h-[21rem] flex-col justify-start px-6 py-5 sm:px-8">
          {showTranscript && (
            <>
              <p className={`${mono} text-[0.6rem] font-semibold text-brand-navy/50`}>{ui.you}</p>
              <p className="mt-1.5 text-xl font-bold leading-snug text-brand-navy sm:text-2xl">
                {shownEx.question}
              </p>
              <p className={`${mono} mt-1.5 text-[0.6rem] font-semibold text-brand-navy/45 underline underline-offset-2`}>
                {ui.remember}
              </p>

              <div className="mt-5 border-l-2 border-brand-teal pl-4">
                <CogetoLabel text={ui.fromMemory} />
                {!showAnswer ? (
                  <p className="mt-2 flex items-center gap-2 text-sm text-brand-navy/60">
                    <span className="chat-dots inline-flex gap-1" aria-hidden="true">
                      <span /><span /><span />
                    </span>
                    {ui.thinking}
                  </p>
                ) : shownEx.silence ? (
                  <>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-brand-navy">
                      {shownEx.silence.title}
                    </p>
                    <p className="mt-2 w-fit rounded-lg border border-brand-navy/15 bg-brand-navy/5 px-2.5 py-1 text-xs font-semibold text-brand-navy/70">
                      {shownEx.silence.banner}
                    </p>
                  </>
                ) : (
                  <div className="mt-2 space-y-2">
                    {shownEx.segments.map((seg, i) => {
                      const text = segText(i);
                      if (!text) return null;
                      const complete = done || wordsShown >= segEnds[i];
                      return (
                        <p key={seg.text} className="text-sm leading-relaxed text-brand-navy">
                          {text}{" "}
                          {complete &&
                            seg.chips?.map((c) => <Chip key={c} label={c} pop={!done} />)}
                        </p>
                      );
                    })}
                    {conflictShown && shownEx.conflict && (
                      <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800">
                        {shownEx.conflict.text}{" "}
                        {shownEx.conflict.chips?.map((c) => (
                          <Chip key={c} label={c} pop={!done} />
                        ))}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {showStands && shownEx.standsOn.length > 0 && (
                <div className={done ? "" : "chip-pop"}>
                  <p className={`${mono} mt-5 text-[0.6rem] font-semibold text-brand-navy/50`}>
                    {ui.standsOn}
                  </p>
                  <p className="mt-1.5 flex flex-wrap gap-1.5">
                    {shownEx.standsOn.map((c) => (
                      <Chip key={c} label={c} pop={false} />
                    ))}
                  </p>
                  <div className="mt-4 border-t border-dashed border-brand-navy/15" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Input bar */}
        <div className="px-6 pb-4 sm:px-8">
          <div className="flex items-center gap-3 rounded-full border border-brand-teal/50 px-4 py-2.5">
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0 rounded-full border-2 border-brand-teal"
            />
            <span className="flex-1 truncate text-sm text-brand-navy">
              {!done && phase === "typing" && typed > 0 ? (
                <>
                  {ex.question.slice(0, typed)}
                  <span className="chat-cursor" aria-hidden="true" />
                </>
              ) : (
                <span className="text-brand-navy/40">{ui.placeholder}</span>
              )}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-teal text-white">
              <ArrowUp size={15} strokeWidth={2.25} aria-hidden="true" />
            </span>
          </div>
          <p className={`${mono} mt-2.5 text-center text-[0.55rem] text-brand-navy/45`}>
            {ui.hint}
          </p>
        </div>
      </div>
    </div>
  );
}
