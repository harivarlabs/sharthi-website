"use client";

import { useState } from "react";

export const INTERESTS = ["For myself", "For my family", "For a school or satsang group"] as const;
export type Interest = (typeof INTERESTS)[number];

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "done"; name: string } | { kind: "error"; message: string };

export function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState<Interest>("For myself");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const field = "w-full rounded-lg border border-night-line bg-night px-3.5 py-2.5 text-base text-sandal placeholder:text-sandal-3/70 focus-visible:outline-night-brass";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, phone, interest, website: (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "" }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");
      setStatus({ kind: "done", name: name.trim().split(" ")[0] });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }

  if (status.kind === "done") {
    return (
      <div className="rise rounded-2xl border border-night-brass/40 bg-night-brass-soft p-6 text-sandal" role="status">
        <p className="font-display text-2xl">You&rsquo;re on the list{status.name ? `, ${status.name}` : ""}.</p>
        <p className="mt-2 text-sandal-2">We&rsquo;ll write to you the moment Sharthi is ready. Until then, go gently.</p>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={submit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium text-sandal-2">
          Your name
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Asha Mehta" autoComplete="name" required maxLength={80} className={field} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium text-sandal-2">
          Email
          <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" required maxLength={120} className={field} />
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium text-sandal-2">
        WhatsApp number (optional)
        <input name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 …" autoComplete="tel" maxLength={20} className={field} />
      </label>
      {/* Honeypot: real people never see or fill this. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <fieldset className="grid gap-1.5">
        <legend className="text-sm font-medium text-sandal-2">I&rsquo;m most interested in</legend>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {INTERESTS.map((o) => (
            <label
              key={o}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-night-brass ${
                interest === o ? "border-night-brass bg-night-brass text-night" : "border-night-line text-sandal-2 hover:text-sandal"
              }`}
            >
              <input type="radio" name="interest" value={o} checked={interest === o} onChange={() => setInterest(o)} className="sr-only" />
              {o}
            </label>
          ))}
        </div>
      </fieldset>
      {status.kind === "error" && (
        <p className="rounded-lg border border-night-kumkum/50 bg-night px-3.5 py-2.5 text-sm text-sandal" role="alert">
          {status.message}
        </p>
      )}
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="mt-1 inline-flex items-center justify-center justify-self-start rounded-full bg-night-brass px-6 py-3 text-base font-semibold text-night transition-[transform,filter] hover:brightness-105 active:scale-[0.98] disabled:opacity-60 focus-visible:outline-night-brass"
      >
        {status.kind === "sending" ? "Adding you…" : "Join the waitlist"}
      </button>
      <p className="text-xs text-sandal-3">We&rsquo;ll only use these details to tell you about Sharthi&rsquo;s launch. No newsletters, no sharing.</p>
    </form>
  );
}
