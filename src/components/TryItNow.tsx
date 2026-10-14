"use client";

import { useState } from "react";
import { Wheel, type Spoke } from "./Wheel";

/*
 * A one-minute taste of the evening reflection: three questions about today,
 * answered by tapping. Nothing is sent anywhere; it only lives on this page.
 */

type Choice = { label: string; cue: string; score: number };
type Question = { spoke: "Sleep" | "Screens" | "Prayer"; ask: string; hint: string; choices: Choice[] };

const QUESTIONS: Question[] = [
  {
    spoke: "Sleep",
    ask: "How much did you sleep last night?",
    hint: "नींद कितनी हुई? · ઊંઘ કેટલી થઈ?",
    choices: [
      { label: "Less than 6 hours", cue: "🥱", score: 3 },
      { label: "6 to 7 hours", cue: "😐", score: 6 },
      { label: "7 hours or more", cue: "😊", score: 9 },
    ],
  },
  {
    spoke: "Screens",
    ask: "How long were you on your phone or TV, just for fun?",
    hint: "फ़ोन-टीवी पर कितना समय? · ફોન-ટીવી પર કેટલો સમય?",
    choices: [
      { label: "Under 1 hour", cue: "🌿", score: 9 },
      { label: "1 to 3 hours", cue: "📱", score: 6 },
      { label: "More than 3 hours", cue: "😵", score: 3 },
    ],
  },
  {
    spoke: "Prayer",
    ask: "Did you get a few quiet minutes today, for prayer or just stillness?",
    hint: "प्रार्थना या शांति के कुछ पल? · પ્રાર્થના કે શાંતિની થોડી પળો?",
    choices: [
      { label: "Not today", cue: "❌", score: 3 },
      { label: "A little", cue: "🙏", score: 6 },
      { label: "Yes, properly", cue: "🪔", score: 9 },
    ],
  },
];

/** What Sharthi says about the weakest of the three, in plain words, with a verse that actually fits. */
const ADVICE: Record<Question["spoke"], { say: string; promise: string; verse: string; meaning: string; ref: string }> = {
  Sleep: {
    say: "A short night makes everything else harder: patience, food choices, focus. Sleep is the first thing to mend.",
    promise: "Tonight, lights off 30 minutes earlier than usual.",
    verse: "युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु",
    meaning: "Balanced food, rest and effort remove sorrow.",
    ref: "Bhagavad Gita 6.17",
  },
  Screens: {
    say: "The screen is not the enemy; the late hours are. Most of that time came after dark, when the mind needed to slow down.",
    promise: "Tomorrow, the phone stays out of the bedroom after 9.",
    verse: "इन्द्रियाणि प्रमाथीनि हरन्ति प्रसभं मनः",
    meaning: "The restless senses carry the mind away by force.",
    ref: "Bhagavad Gita 2.60",
  },
  Prayer: {
    say: "A day with no quiet in it runs on its own momentum. Even five still minutes give you back the steering.",
    promise: "Tomorrow morning, five minutes of quiet before the phone.",
    verse: "अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते",
    meaning: "By practice and by letting go, the mind is held.",
    ref: "Bhagavad Gita 6.35",
  },
};

export function TryItNow() {
  const [answers, setAnswers] = useState<Partial<Record<Question["spoke"], number>>>({});
  const step = QUESTIONS.findIndex((q) => answers[q.spoke] === undefined);
  const done = step === -1;

  const spokes: Spoke[] = QUESTIONS.map((q) => ({
    name: q.spoke,
    sanskrit: "",
    score: answers[q.spoke] ?? 0,
    care: (answers[q.spoke] ?? 10) <= 3,
    note: "",
    sankalp: "",
  }));
  const weakest = done ? [...QUESTIONS].sort((a, b) => answers[a.spoke]! - answers[b.spoke]!)[0].spoke : null;
  const total = done ? Math.round((Object.values(answers).reduce((a, b) => a + b, 0) / (QUESTIONS.length * 10)) * 100) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-start">
      {/* Questions */}
      <div className="rounded-[1.5rem] border border-line bg-white p-5 sm:p-7">
        {!done ? (
          <div key={step} className="rise">
            <p className="text-sm text-ink-3">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-snug text-ink sm:text-3xl">{QUESTIONS[step].ask}</h3>
            <p lang="hi" className="mt-1 text-sm text-ink-3">
              {QUESTIONS[step].hint}
            </p>
            <div className="mt-5 grid gap-2.5">
              {QUESTIONS[step].choices.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setAnswers((a) => ({ ...a, [QUESTIONS[step].spoke]: c.score }))}
                  className="flex min-h-14 items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-left text-base font-medium text-ink transition-colors hover:border-brass hover:bg-brass-soft active:scale-[0.99]"
                >
                  <span className="text-xl" aria-hidden>
                    {c.cue}
                  </span>
                  {c.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button onClick={() => setAnswers({})} className="mt-4 text-sm text-ink-3 underline-offset-4 hover:underline">
                Start again
              </button>
            )}
          </div>
        ) : (
          <div className="rise">
            <p className="text-sm font-semibold text-peacock">Sharthi says</p>
            <p className="mt-2 text-lg leading-relaxed text-ink">{ADVICE[weakest!].say}</p>
            <figure className="mt-4 rounded-xl border border-brass/40 bg-brass-soft px-4 py-3">
              <p lang="sa" className="sanskrit text-[1.05rem] text-brass">
                {ADVICE[weakest!].verse}
              </p>
              <figcaption className="mt-1 text-sm text-ink-2">
                {ADVICE[weakest!].meaning} <span className="text-ink-3">({ADVICE[weakest!].ref})</span>
              </figcaption>
            </figure>
            <div className="mt-4 rounded-xl bg-night px-4 py-3 text-sandal">
              <p className="text-sm font-semibold text-night-brass">Your promise for tomorrow</p>
              <p className="mt-0.5">{ADVICE[weakest!].promise}</p>
            </div>
            <p className="mt-4 text-sm text-ink-2">In the app, Sharthi asks 13 questions like these and remembers your answers, so it can see you change week by week.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#waitlist" className="rounded-full bg-ink px-5 py-3 text-base font-semibold text-paper hover:bg-night">
                I want this, join the waitlist
              </a>
              <button onClick={() => setAnswers({})} className="rounded-full border border-line-strong px-5 py-3 text-base font-semibold text-ink hover:border-ink/40">
                Try again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Their wheel */}
      <div className="rounded-[1.5rem] border border-line bg-paper-2/60 p-5 sm:p-7">
        <div className="flex items-baseline justify-between">
          <p className="font-display text-xl text-ink">Your day so far</p>
          {done && (
            <p className="text-sm text-ink-3">
              Day score <span className="font-display text-2xl text-ink">{total}</span>
            </p>
          )}
        </div>
        <Wheel spokes={spokes} animate={false} className="mx-auto mt-2 w-full max-w-[17rem]" />
        <ul className="mt-2 grid gap-1.5 text-sm">
          {QUESTIONS.map((q) => {
            const v = answers[q.spoke];
            return (
              <li key={q.spoke} className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                <span className={v !== undefined && v <= 3 ? "font-semibold text-kumkum" : "text-ink"}>{q.spoke}</span>
                <span className="text-ink-3">{v === undefined ? "not yet" : v <= 3 ? "needs care" : v >= 9 ? "good" : "okay"}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-ink-3">Only three of the seven parts today. Nothing you tap here is saved or sent.</p>
      </div>
    </div>
  );
}
