"use client";

import { useEffect, useState } from "react";
import { CircleCheck, Mail } from "lucide-react";
import { ProofChips } from "@/components/conversion";

/**
 * /api/contact, which relays server-side through Mailgun (EU region), so
 * the browser never talks to a third party. On failure the direct email
 * path is offered. A hidden honeypot field and a render timestamp back the
 * server's bot checks.
 */
export default function ContactPilot({
  email,
  heading,
  sub,
  steps,
  chips,
  nameLabel,
  emailLabel,
  messageLabel,
  messagePlaceholder,
  submitLabel,
  sendingLabel,
  sentTitle,
  sentBody,
  errorBody,
  directLine,
}: {
  email: string;
  heading: string;
  sub: string;
  steps: string[];
  chips: string[];
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  sentTitle: string;
  sentBody: string;
  errorBody: string;
  directLine: string;
}) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [renderedAt, setRenderedAt] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: from,
          message,
          company,
          t: renderedAt,
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  const inputCls =
    "w-full rounded-xl border border-brand-navy/20 bg-white px-4 py-2.5 text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-teal-ink focus:outline-none";

  return (
    <section id="contact" className="scroll-mt-24 bg-brand-navy-deep">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2">
        <div>
          <h2 className="text-headline text-balance text-white">{heading}</h2>
          <p className="mt-3 max-w-lg text-pretty leading-relaxed text-white/75">{sub}</p>
          <ol className="mt-6 space-y-3">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm leading-relaxed text-white/85">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal text-xs font-semibold text-brand-navy-deep">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <ProofChips chips={chips} />
          </div>
        </div>

        {state === "sent" ? (
          <div
            role="status"
            className="flex flex-col items-start justify-center rounded-3xl border border-brand-teal/40 bg-white/5 p-8 sm:p-10"
          >
            <CircleCheck
              size={32}
              strokeWidth={1.75}
              aria-hidden="true"
              className="text-brand-teal"
            />
            <p className="mt-4 text-xl font-semibold text-white">{sentTitle}</p>
            <p className="mt-2 max-w-md text-pretty leading-relaxed text-white/75">
              {sentBody}
            </p>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <label className="block text-sm font-medium text-white/85">
              {nameLabel}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className={`mt-1.5 ${inputCls}`}
              />
            </label>
            <label className="mt-4 block text-sm font-medium text-white/85">
              {emailLabel}
              <input
                type="email"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                autoComplete="email"
                className={`mt-1.5 ${inputCls}`}
              />
            </label>
            <label className="mt-4 block text-sm font-medium text-white/85">
              {messageLabel}
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder={messagePlaceholder}
                className={`mt-1.5 ${inputCls}`}
              />
            </label>
            {/* Honeypot: hidden from people, attractive to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto">
              <label>
                Company
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-5 w-full rounded-full bg-brand-teal px-6 py-3 text-sm font-semibold text-brand-navy-deep transition-colors hover:bg-brand-teal/90 disabled:opacity-60"
            >
              {state === "sending" ? sendingLabel : submitLabel}
            </button>
            {state === "error" && (
              <p role="alert" className="mt-4 text-center text-sm text-amber-300">
                {errorBody}
              </p>
            )}
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-white/60">
              <Mail size={13} strokeWidth={1.75} aria-hidden="true" />
              {directLine}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
