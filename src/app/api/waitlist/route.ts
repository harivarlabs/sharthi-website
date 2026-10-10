import { appendFile, mkdir } from "node:fs/promises";
import { NextResponse } from "next/server";
import { site } from "@/site";

const INTERESTS = new Set(["For myself", "For my family", "For a school or satsang group"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Entry = { name: string; email: string; phone: string; interest: string; at: string };

/**
 * Waitlist sign-up. Each entry goes to the first channel that works:
 *   1. RESEND_API_KEY (from the Resend integration on Vercel): emailed to WAITLIST_TO (default: site.email).
 *   2. WAITLIST_WEBHOOK_URL: POSTed there as JSON (Google Sheet script, Zapier, Make…).
 *   3. Outside production: appended to data/waitlist.jsonl.
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

  const entry: Entry = { name, email, phone, interest, at: new Date().toISOString() };

  // Try each configured channel in turn so a sign-up is never lost to one failing (e.g. Resend before the domain is verified).
  if (process.env.RESEND_API_KEY && (await sendEmail(entry))) return NextResponse.json({ ok: true });
  if (process.env.WAITLIST_WEBHOOK_URL && (await postWebhook(entry))) return NextResponse.json({ ok: true });
  if (process.env.NODE_ENV !== "production") {
    await mkdir("data", { recursive: true });
    await appendFile("data/waitlist.jsonl", JSON.stringify(entry) + "\n", "utf8");
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "We couldn't save that just now. Please try again in a minute." }, { status: 502 });
}

async function postWebhook(e: Entry): Promise<boolean> {
  const res = await fetch(process.env.WAITLIST_WEBHOOK_URL!, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(e) }).catch(() => null);
  return !!res && res.ok;
}

/** One email per sign-up to the team inbox, with reply-to set to the person who signed up. */
async function sendEmail(e: Entry): Promise<boolean> {
  const to = process.env.WAITLIST_TO ?? site.email;
  const domain = process.env.RESEND_EMAIL_DOMAIN ?? site.email.split("@")[1];
  const from = process.env.WAITLIST_FROM ?? `Sharthi waitlist <waitlist@${domain}>`;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["WhatsApp", e.phone || "—"],
    ["Interested", e.interest],
    ["Signed up", new Date(e.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST"],
  ];

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: e.email,
      subject: `Waitlist: ${e.name} (${e.interest.toLowerCase()})`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<table style="font:15px/1.6 system-ui,sans-serif;border-collapse:collapse">${rows
        .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#66698f">${k}</td><td style="padding:4px 0;color:#191b44"><strong>${esc(v)}</strong></td></tr>`)
        .join("")}</table>`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    console.error("waitlist: Resend returned", res?.status, await res?.text().catch(() => ""));
    return false;
  }
  return true;
}
