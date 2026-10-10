import { appendFile, mkdir } from "node:fs/promises";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/site";

const INTERESTS = new Set(["For myself", "For my family", "For a school or satsang group"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Entry = { name: string; email: string; phone: string; interest: string; at: string };

/**
 * Waitlist sign-up.
 *
 * Step 1, record it (the sign-up counts as saved if any of these succeed):
 *   - Resend Contacts (RESEND_API_KEY): the person is stored in the Resend audience with phone/interest/date.
 *     This does not depend on the sending domain being verified.
 *   - WAITLIST_WEBHOOK_URL: the entry is POSTed there as JSON.
 *   - Outside production: appended to data/waitlist.jsonl.
 * Step 2, tell the team (best effort, never fails the sign-up):
 *   - email via Resend, else via SMTP_HOST/SMTP_USER/SMTP_PASS (the team's own mailbox).
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

  let saved = false;
  if (process.env.RESEND_API_KEY) saved = await saveContact(entry);
  if (!saved && process.env.WAITLIST_WEBHOOK_URL) saved = await postWebhook(entry);
  if (!saved && process.env.NODE_ENV !== "production") {
    await mkdir("data", { recursive: true });
    await appendFile("data/waitlist.jsonl", JSON.stringify(entry) + "\n", "utf8");
    saved = true;
  }

  // Notify the team. If this fails the sign-up is still safely recorded above.
  const notified = (process.env.RESEND_API_KEY && (await sendEmail(entry))) || (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && (await sendSmtp(entry)));

  if (saved || notified) return NextResponse.json({ ok: true });
  return NextResponse.json({ error: "We couldn't save that just now. Please try again in a minute." }, { status: 502 });
}

/** Store the person as a Resend contact (shows in the Resend dashboard under Contacts). Updates if already present. */
async function saveContact(e: Entry): Promise<boolean> {
  const [first, ...rest] = e.name.split(/\s+/);
  const payload = {
    email: e.email,
    first_name: first,
    last_name: rest.join(" ") || undefined,
    unsubscribed: false,
    properties: { phone: e.phone || "-", interest: e.interest, signed_up: e.at },
  };
  const headers = { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" };
  let res = await fetch("https://api.resend.com/contacts", { method: "POST", headers, body: JSON.stringify(payload) }).catch(() => null);
  if (res && res.status === 409) {
    // Already on the list: refresh their details instead.
    res = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(e.email)}`, { method: "PATCH", headers, body: JSON.stringify(payload) }).catch(() => null);
  }
  if (!res || !res.ok) {
    console.error("waitlist: Resend contact save returned", res?.status, await res?.text().catch(() => ""));
    return false;
  }
  return true;
}

async function postWebhook(e: Entry): Promise<boolean> {
  const res = await fetch(process.env.WAITLIST_WEBHOOK_URL!, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(e) }).catch(() => null);
  return !!res && res.ok;
}

/** The notification email: one per sign-up to the team inbox, reply-to set to the person who signed up. */
function message(e: Entry) {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
  const rows: [string, string][] = [
    ["Name", e.name],
    ["Email", e.email],
    ["WhatsApp", e.phone || "—"],
    ["Interested", e.interest],
    ["Signed up", new Date(e.at).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }) + " IST"],
  ];
  return {
    to: process.env.WAITLIST_TO ?? site.email,
    replyTo: e.email,
    subject: `Waitlist: ${e.name} (${e.interest.toLowerCase()})`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<table style="font:15px/1.6 system-ui,sans-serif;border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#66698f">${k}</td><td style="padding:4px 0;color:#191b44"><strong>${esc(v)}</strong></td></tr>`)
      .join("")}</table>`,
  };
}

/** Via Resend. Sender domain follows the team address (verified in Resend), not the integration's RESEND_EMAIL_DOMAIN. */
async function sendEmail(e: Entry): Promise<boolean> {
  const m = message(e);
  const from = process.env.WAITLIST_FROM ?? `Sharthi waitlist <waitlist@${site.email.split("@")[1]}>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [m.to], reply_to: m.replyTo, subject: m.subject, text: m.text, html: m.html }),
  }).catch(() => null);
  if (!res || !res.ok) {
    console.error("waitlist: Resend email returned", res?.status, await res?.text().catch(() => ""));
    return false;
  }
  return true;
}

/** Via the team's own mailbox over SMTP (Zoho: smtp.zoho.in, port 465). Sends from the mailbox itself. */
async function sendSmtp(e: Entry): Promise<boolean> {
  const m = message(e);
  const port = Number(process.env.SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 8000,
  });
  try {
    await transport.sendMail({ from: `Sharthi waitlist <${process.env.SMTP_USER}>`, to: m.to, replyTo: m.replyTo, subject: m.subject, text: m.text, html: m.html });
    return true;
  } catch (err) {
    console.error("waitlist: SMTP failed", err instanceof Error ? err.message : err);
    return false;
  }
}
