"use client";

import { useEffect, useRef, useState } from "react";
import { SAMPLE_SPOKES, Wheel } from "./Wheel";

/* ---------- The phone in the hero: cycles through the app's screens ---------- */

const SCREENS = ["Reflect", "Report", "Ask", "Wisdom", "Journey"] as const;
type Screen = (typeof SCREENS)[number];
const AUTO_MS = 4500;
const PAUSE_MS = 12000;

/**
 * The app's screens in its night theme, inside a phone. The hero's one big element.
 * Advances on its own every few seconds; a tap on a tab (or a spoke) pauses it for a while.
 */
export function PhoneDemo({ fixed }: { fixed?: Screen }) {
  const [screen, setScreen] = useState<Screen>(fixed ?? "Reflect");
  const [paused, setPaused] = useState(false);
  const resume = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance, except while paused by a tap, pinned to one screen, or when the viewer prefers reduced motion.
  useEffect(() => {
    if (paused || fixed) return;
    const id = setInterval(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setScreen((s) => SCREENS[(SCREENS.indexOf(s) + 1) % SCREENS.length]);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [paused, fixed]);

  useEffect(() => () => {
    if (resume.current) clearTimeout(resume.current);
  }, []);

  const touch = () => {
    setPaused(true);
    if (resume.current) clearTimeout(resume.current);
    resume.current = setTimeout(() => setPaused(false), PAUSE_MS);
  };
  const go = (s: Screen) => {
    setScreen(s);
    touch();
  };

  return (
    <DeviceFrame>
      <div className="night flex h-full flex-col px-4 pb-2 pt-3.5 sm:px-5">
        <StatusBar />

        <div key={screen} className="rise mt-5 min-h-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,black_86%,transparent)]" aria-live="polite">
          {screen === "Reflect" && <ReflectScreen />}
          {screen === "Report" && <ReportScreen onTouch={touch} />}
          {screen === "Ask" && <AskScreen />}
          {screen === "Wisdom" && <WisdomScreen />}
          {screen === "Journey" && <JourneyScreen />}
        </div>

        <div className="mt-2 flex justify-center gap-1.5" aria-hidden>
          {SCREENS.map((s) => (
            <span key={s} className={`h-1 rounded-full transition-all ${s === screen ? "w-4 bg-night-brass" : "w-1 bg-night-3"}`} />
          ))}
        </div>
        <nav className="mt-2 flex justify-between border-t border-night-line pt-2.5" aria-label="App screens">
          {SCREENS.map((s) => (
            <button
              key={s}
              onClick={() => go(s)}
              aria-pressed={s === screen}
              className={`rounded px-1 py-1 text-[0.68rem] transition-colors ${s === screen ? "font-semibold text-night-brass" : "text-sandal-3 hover:text-sandal"}`}
            >
              {s}
            </button>
          ))}
        </nav>
        <span className="mx-auto mt-2 block h-1 w-28 rounded-full bg-sandal/70" aria-hidden />
      </div>
    </DeviceFrame>
  );
}

/** A modern phone: titanium edge with buttons, thin bezel, Dynamic Island, glare. */
function DeviceFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[18rem] sm:w-[20rem]" aria-hidden={false}>
      {/* side buttons */}
      <span className="absolute -left-[3px] top-[6.5rem] h-7 w-[3px] rounded-l bg-[#6b6d7a]" aria-hidden />
      <span className="absolute -left-[3px] top-[9.5rem] h-12 w-[3px] rounded-l bg-[#6b6d7a]" aria-hidden />
      <span className="absolute -left-[3px] top-[13rem] h-12 w-[3px] rounded-l bg-[#6b6d7a]" aria-hidden />
      <span className="absolute -right-[3px] top-[11rem] h-16 w-[3px] rounded-r bg-[#6b6d7a]" aria-hidden />
      {/* titanium edge */}
      <div className="rounded-[3.1rem] bg-[linear-gradient(160deg,#c9cad3_0%,#8b8d99_30%,#5f6170_60%,#a6a8b3_100%)] p-[3px] shadow-[0_50px_90px_-36px_rgba(16,19,58,0.7),0_0_0_1px_rgba(0,0,0,0.25)]">
        {/* black bezel */}
        <div className="rounded-[2.9rem] bg-[#0b0b10] p-[9px]">
          {/* screen */}
          <div className="relative h-[37rem] overflow-hidden rounded-[2.35rem] bg-night">
            {children}
            {/* Dynamic Island */}
            <span className="absolute left-1/2 top-2.5 h-[1.55rem] w-[6.2rem] -translate-x-1/2 rounded-full bg-[#0b0b10]" aria-hidden>
              <span className="absolute right-3 top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-[#1a1b26] ring-1 ring-[#2a2b38]" />
            </span>
            {/* glare */}
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.03)_28%,transparent_45%)]" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-1 text-[0.78rem] font-semibold text-sandal" aria-hidden>
      <span className="tabular-nums">9:41</span>
      <span className="flex items-center gap-1.5">
        {/* signal */}
        <svg viewBox="0 0 18 12" className="h-3 w-[18px]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.7" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="0.7" />
          <rect x="10" y="3" width="3" height="9" rx="0.7" />
          <rect x="15" y="0" width="3" height="12" rx="0.7" />
        </svg>
        {/* wifi */}
        <svg viewBox="0 0 16 12" className="h-3 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M1.5 4.2a9.5 9.5 0 0 1 13 0" />
          <path d="M4 7a5.8 5.8 0 0 1 8 0" />
          <path d="M6.6 9.7a2 2 0 0 1 2.8 0" />
        </svg>
        {/* battery */}
        <svg viewBox="0 0 27 12" className="h-3 w-[27px]" fill="none">
          <rect x="0.75" y="0.75" width="22" height="10.5" rx="3" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
          <rect x="2.5" y="2.5" width="16" height="7" rx="1.5" fill="currentColor" />
          <path d="M24.5 4v4a2 2 0 0 0 0-4Z" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

function ScreenTitle({ kicker, title, aside }: { kicker: string; title: string; aside?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <p className="text-xs text-sandal-3">{kicker}</p>
        <p className="font-display text-xl leading-tight text-sandal sm:text-2xl">{title}</p>
      </div>
      {aside}
    </div>
  );
}

function ReflectScreen() {
  const choices = [
    ["😊", "Not at all"],
    ["😐", "A little irritation"],
    ["😠", "Lost my temper"],
  ];
  return (
    <div className="flex h-full flex-col">
      <ScreenTitle kicker="Question 7 of 13" title="Did anger visit you today?" />
      <p lang="hi" className="mt-0.5 text-sm text-sandal-3">
        आज गुस्सा आया?
      </p>
      <span className="mt-3 block h-1 rounded-full bg-night-3">
        <span className="block h-full w-[54%] rounded-full bg-night-peacock" />
      </span>
      <div className="mt-4 grid gap-2 text-sm">
        {choices.map(([cue, text], i) => (
          <div key={text} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 ${i === 1 ? "border-night-brass bg-night-brass-soft text-sandal" : "border-night-line text-sandal-2"}`}>
            <span aria-hidden>{cue}</span>
            {text}
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-lg bg-night px-3 py-2.5 text-sm text-sandal-2">Noticing the irritation is already a step. Six more questions, then your wheel.</p>
      <div className="mt-auto flex flex-col items-center gap-1.5 pb-1">
        <span className="flex size-12 items-center justify-center rounded-full bg-night-brass text-night" aria-hidden>
          <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
            <path d="M12 15a4 4 0 0 0 4-4V6a4 4 0 1 0-8 0v5a4 4 0 0 0 4 4Zm6-4a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.94V22h2v-3.06A8 8 0 0 0 20 11h-2Z" />
          </svg>
        </span>
        <p className="text-[0.7rem] text-sandal-3">Tap and say it, or choose above</p>
      </div>
    </div>
  );
}

function ReportScreen({ onTouch }: { onTouch: () => void }) {
  const [active, setActive] = useState("Senses");
  const spoke = SAMPLE_SPOKES.find((s) => s.name === active) ?? SAMPLE_SPOKES[0];
  const tone = spoke.care ? "text-night-kumkum" : "text-night-peacock";
  return (
    <div>
      <ScreenTitle
        kicker="Thursday evening"
        title="Your day as a wheel"
        aside={
          <div className="shrink-0 text-right">
            <p className="font-display text-3xl leading-none text-night-brass">65</p>
            <p className="whitespace-nowrap text-[0.7rem] text-sandal-3">Day score</p>
          </div>
        }
      />
      <Wheel
        night
        active={active}
        onSelect={(n) => {
          setActive(n);
          onTouch();
        }}
        className="mx-auto mt-1 w-[82%]"
      />
      <p className="text-center text-[0.7rem] text-sandal-3">Tap any part of the wheel to see why</p>
      <div key={active} className="rise mt-2 rounded-lg bg-night px-3 py-2 text-sm">
        <div className="flex items-center justify-between">
          <span className={`font-semibold ${tone}`}>
            {spoke.name}
            {spoke.care && <span className="font-normal text-sandal-2"> needs care</span>}
          </span>
          <span className="tabular-nums text-sandal-3">{spoke.score}/10</span>
        </div>
        <span className="mt-1.5 block h-1 rounded-full bg-night-3">
          <span className={`block h-full rounded-full ${spoke.care ? "bg-night-kumkum" : "bg-night-peacock"}`} style={{ width: `${spoke.score * 10}%` }} />
        </span>
        <p className="mt-1 text-sandal-2">{spoke.note}</p>
      </div>
      <div key={`s-${active}`} className="rise mt-2 rounded-xl border border-night-brass/40 bg-night-brass-soft px-3 py-2 text-sm text-sandal">
        <span className="font-semibold text-night-brass">Your promise for tomorrow</span>
        <br />
        {spoke.sankalp}
      </div>
    </div>
  );
}

function AskScreen() {
  return (
    <div className="flex h-full flex-col text-sm">
      <ScreenTitle kicker="Ask" title="What is on your mind?" />
      <div className="mt-4 space-y-2.5">
        <p lang="gu" className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-night-3 px-3.5 py-2 text-sandal">
          ભણવામાં મન નથી લાગતું, ધ્યાન ભટકે છે.
        </p>
        <p lang="gu" className="max-w-[92%] rounded-2xl rounded-bl-sm bg-night-brass-soft px-3.5 py-2 text-sandal">
          મન ભટકે એ સ્વાભાવિક છે; અર્જુને પણ એ જ કહ્યું હતું.
        </p>
        <figure className="max-w-[92%] rounded-xl border border-night-brass/40 bg-night px-3.5 py-2.5">
          <p lang="sa" className="sanskrit text-[0.95rem] text-night-brass">
            अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते
          </p>
          <figcaption className="text-xs text-sandal-2">By practice and by letting go, the mind is held. Gita 6.35</figcaption>
        </figure>
        <p lang="gu" className="max-w-[92%] rounded-2xl rounded-bl-sm bg-night-brass-soft px-3.5 py-2 text-sandal">
          <span className="font-semibold text-night-brass">એક પગલું: </span>આવતીકાલે ૨૫ મિનિટનો એક જ વિષય, ફોન બીજા રૂમમાં.
        </p>
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-full border border-night-line bg-night px-3.5 py-2 text-sandal-3">
        <span className="size-2 rounded-full bg-night-kumkum" aria-hidden />
        Type or speak, any language
      </div>
    </div>
  );
}

function WisdomScreen() {
  const verses = [
    { ref: "Gita 2.47", sa: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन", en: "Your right is to the work alone, never to its fruits.", today: "Do the next task fully, then let it go." },
    { ref: "Katha Upanishad 1.3.3", sa: "बुद्धिं तु सारथिं विद्धि", en: "Know the intellect as the charioteer.", today: "Before reacting, ask who is holding the reins." },
  ];
  return (
    <div className="text-sm">
      <ScreenTitle kicker="Wisdom" title="47 verses, in your language" />
      <div className="mt-3 flex items-center gap-2 rounded-full border border-night-line bg-night px-3.5 py-2 text-sandal-3">
        <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden>
          <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        Search: anger, sleep, focus…
      </div>
      <div className="mt-2.5 flex gap-1.5 text-[0.7rem]">
        {["All", "Gita", "Upanishads", "Yoga Sutra", "My wisdom"].map((c, i) => (
          <span key={c} className={`rounded-full px-2.5 py-1 ${i === 0 ? "bg-night-brass text-night" : "border border-night-line text-sandal-2"}`}>
            {c}
          </span>
        ))}
      </div>
      <div className="mt-3 space-y-2.5">
        {verses.map((v) => (
          <figure key={v.ref} className="rounded-xl border border-night-line bg-night px-3.5 py-3">
            <div className="flex items-center justify-between text-[0.7rem] text-sandal-3">
              <span>{v.ref}</span>
              <span aria-hidden>🔊</span>
            </div>
            <p lang="sa" className="sanskrit mt-1 text-[0.95rem] text-night-brass">
              {v.sa}
            </p>
            <figcaption className="text-sandal-2">{v.en}</figcaption>
            <p className="mt-1.5 text-xs text-night-peacock">Live it today: {v.today}</p>
          </figure>
        ))}
      </div>
    </div>
  );
}

function JourneyScreen() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const sattva = [48, 55, 52, 61, 65, 70, null];
  return (
    <div className="text-sm">
      <ScreenTitle
        kicker="Journey"
        title="This week"
        aside={
          <div className="shrink-0 text-right">
            <p className="font-display text-3xl leading-none text-night-brass">6</p>
            <p className="whitespace-nowrap text-[0.7rem] text-sandal-3">day streak</p>
          </div>
        }
      />
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {days.map((d, i) => {
          const v = sattva[i];
          return (
            <div key={i} className="text-center">
              <div className="flex h-24 items-end rounded-md bg-night">{v !== null && <div className="w-full rounded-md bg-night-peacock" style={{ height: `${v}%` }} />}</div>
              <p className="mt-1 text-[0.7rem] text-sandal-3">{d}</p>
            </div>
          );
        })}
      </div>
      <dl className="mt-3 grid gap-2">
        {[
          ["Seven-day average", "58", "text-sandal"],
          ["Most improved", "Screens, +3", "text-night-peacock"],
          ["Next week's focus", "Mind", "text-night-kumkum"],
        ].map(([k, v, c]) => (
          <div key={k} className="flex items-center justify-between rounded-lg bg-night px-3 py-2">
            <dt className="text-sandal-3">{k}</dt>
            <dd className={`font-semibold ${c}`}>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-center text-[0.7rem] text-sandal-3">Your day score, one evening at a time</p>
    </div>
  );
}

/* ---------- Light-theme mockups used further down the page ---------- */

/** One question from the evening reflection, with the picture-cue answers the app uses. */
export function ReflectMock() {
  const choices = [
    ["😊", "Not at all"],
    ["😐", "A little irritation"],
    ["😠", "Lost my temper"],
  ];
  return (
    <div className="rounded-2xl border border-line bg-white p-4 text-sm shadow-[0_12px_28px_-18px_rgba(25,27,68,0.4)]">
      <div className="flex items-center justify-between text-xs text-ink-3">
        <span>Question 7 of 13</span>
        <span className="h-1 w-24 rounded-full bg-paper-2">
          <span className="block h-full w-[54%] rounded-full bg-peacock" />
        </span>
      </div>
      <p className="mt-3 font-display text-xl text-ink">Did anger visit you today?</p>
      <p lang="hi" className="text-ink-3">
        आज गुस्सा आया?
      </p>
      <div className="mt-3 grid gap-1.5">
        {choices.map(([cue, text], i) => (
          <div key={text} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 ${i === 1 ? "border-brass bg-brass-soft text-ink" : "border-line text-ink-2"}`}>
            <span aria-hidden>{cue}</span>
            {text}
          </div>
        ))}
      </div>
      <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-ink-2">Noticing the irritation is already a step. Six more questions, then your wheel.</p>
    </div>
  );
}

/** A short exchange from Ask. */
export function AskMock() {
  return (
    <div className="rounded-2xl border border-line bg-white p-4 text-sm shadow-[0_12px_28px_-18px_rgba(25,27,68,0.4)]">
      <p lang="gu" className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-paper-2 px-3.5 py-2 text-ink">
        ભણવામાં મન નથી લાગતું.
      </p>
      <p lang="gu" className="mt-2 max-w-[90%] rounded-2xl rounded-bl-sm bg-brass-soft px-3.5 py-2 text-ink">
        મન ભટકે એ સ્વાભાવિક છે; અર્જુને પણ એ જ કહ્યું હતું.
      </p>
      <figure className="mt-2 max-w-[90%] rounded-xl border border-brass/40 px-3.5 py-2.5">
        <p lang="sa" className="sanskrit text-[0.95rem] text-brass">
          अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते
        </p>
        <figcaption className="text-xs text-ink-3">By practice and by letting go, the mind is held. Gita 6.35</figcaption>
      </figure>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-ink-3">
        <span className="size-2 rounded-full bg-kumkum" aria-hidden />
        Tap the mic, or type in any language
      </div>
    </div>
  );
}

/** The Journey screen: a week at a glance. */
export function JourneyMock() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const sattva = [48, 55, 52, 61, 65, 70, null];
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_12px_28px_-18px_rgba(25,27,68,0.4)]">
      <div className="flex items-baseline justify-between">
        <p className="font-display text-xl text-ink">This week</p>
        <p className="text-sm text-ink-3">6-day streak</p>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2">
        {days.map((d, i) => {
          const v = sattva[i];
          return (
            <div key={i} className="text-center">
              <div className="mx-auto flex h-20 w-full items-end rounded-md bg-paper">
                {v !== null && <div className="w-full rounded-md bg-peacock" style={{ height: `${v}%` }} aria-label={`${d}: Sattva ${v}`} />}
              </div>
              <p className="mt-1.5 text-xs text-ink-3">{d}</p>
            </div>
          );
        })}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-paper px-3 py-2">
          <dt className="text-ink-3">Most improved</dt>
          <dd className="font-semibold text-peacock">Screens, +3</dd>
        </div>
        <div className="rounded-lg bg-paper px-3 py-2">
          <dt className="text-ink-3">Next week&rsquo;s focus</dt>
          <dd className="font-semibold text-kumkum">Mind</dd>
        </div>
      </dl>
    </div>
  );
}
