import { NextResponse } from "next/server";

/**
 * Pilot contact form endpoint. The browser posts here; the server relays
 * to Mailgun's EU API, so the zero-external-request rule holds: the
 * visitor's browser never talks to a third party.
 *
 * Spam protection without third parties (no reCAPTCHA, which would break
 * the no-external-resources privacy promise): a honeypot field, a minimum
 * time-to-submit, and a per-IP rate limit.
 *
 * Configuration comes from the environment (.env.local on the server,
 * never committed): MAILGUN_API_KEY is required; the rest have defaults.
 */

const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN ?? "mg.cogeto.eu";
const MAILGUN_BASE =
  (process.env.MAILGUN_REGION ?? "eu") === "eu"
    ? "https://api.eu.mailgun.net"
    : "https://api.mailgun.net";
const CONTACT_TO = process.env.CONTACT_TO ?? "hi@cogeto.eu";
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Cogeto website <website@mg.cogeto.eu>";

/** Submissions faster than this after form render are treated as bots. */
const MIN_FILL_MS = 2500;

/** Per-IP limit: at most 5 submissions per hour. In-memory is sufficient
 * for the single pm2 process this site runs as. */
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_MAX;
}

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot: humans never see or fill this field. */
  company?: string;
  /** Client render timestamp for the time-to-submit check. */
  t?: number;
};

export async function POST(request: Request) {
  const key = process.env.MAILGUN_API_KEY;
  if (!key) {
    // Fails honestly: the client shows the direct-email fallback.
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 200);
  const email = (body.email ?? "").trim().slice(0, 200);
  const message = (body.message ?? "").trim().slice(0, 5000);

  // Honeypot and timing: pretend success so bots learn nothing.
  if (body.company) return NextResponse.json({ ok: true });
  if (typeof body.t === "number" && Date.now() - body.t < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const form = new URLSearchParams({
    from: CONTACT_FROM,
    to: CONTACT_TO,
    subject: `Pilot request${name ? ` from ${name}` : ""}`,
    text: `${message}\n\n---\nName: ${name || "not given"}\nEmail: ${email}`,
    "h:Reply-To": email,
  });

  try {
    const res = await fetch(`${MAILGUN_BASE}/v3/${MAILGUN_DOMAIN}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${key}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });
    if (!res.ok) {
      console.error(`[contact] mailgun responded ${res.status}`);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] mailgun unreachable:", err);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
