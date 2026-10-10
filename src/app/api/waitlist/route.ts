import { appendFile, mkdir } from "node:fs/promises";
import { NextResponse } from "next/server";

const INTERESTS = new Set(["For myself", "For my family", "For a school or satsang group"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Waitlist sign-up.
 * With WAITLIST_WEBHOOK_URL set, each entry is POSTed there as JSON (Google Sheet script, Zapier, Make…).
 * Without it (local development), entries are appended to data/waitlist.jsonl.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Please fill in the form." }, { status: 400 });

  // Honeypot filled in: a bot. Pretend it worked.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const interest = String(body.interest ?? "");

  if (name.length < 2 || name.length > 80) return NextResponse.json({ error: "Please tell us your name." }, { status: 400 });
  if (!EMAIL.test(email) || email.length > 120) return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  if (phone && !/^[+\d][\d\s().-]{6,19}$/.test(phone)) return NextResponse.json({ error: "That WhatsApp number doesn't look right." }, { status: 400 });
  if (!INTERESTS.has(interest)) return NextResponse.json({ error: "Please choose what you're interested in." }, { status: 400 });

  const entry = { name, email, phone, interest, at: new Date().toISOString() };

  const hook = process.env.WAITLIST_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(entry) }).catch(() => null);
    if (!res || !res.ok) return NextResponse.json({ error: "We couldn't save that just now. Please try again in a minute." }, { status: 502 });
  } else {
    await mkdir("data", { recursive: true });
    await appendFile("data/waitlist.jsonl", JSON.stringify(entry) + "\n", "utf8");
  }

  return NextResponse.json({ ok: true });
}
