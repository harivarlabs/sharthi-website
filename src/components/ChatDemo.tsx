"use client";

import { useState } from "react";

type Example = {
  chip: string;
  lang: "en" | "hi" | "gu";
  question: string;
  answer: string;
  verse: { ref: string; sanskrit: string; meaning: string };
  step: string;
  reads: [string, string][];
};

const EXAMPLES: Example[] = [
  {
    chip: "Anger at work",
    lang: "en",
    question: "I lost my temper with a colleague today and I feel bad about it.",
    answer: "Anger that is noticed is already half-tamed. The Gita says it rises from a wish that was blocked, so ask what you wanted in that moment.",
    verse: { ref: "Bhagavad Gita 2.63", sanskrit: "क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः", meaning: "From anger comes confusion; from confusion, the memory wanders." },
    step: "Tomorrow, before replying when irritated, take three slow breaths and name the feeling to yourself.",
    reads: [
      ["spoke", "Mind"],
      ["theme", "anger"],
      ["verse", "Gita 2.63"],
      ["asks next", "What did you want in that moment?"],
    ],
  },
  {
    chip: "नींद नहीं आती",
    lang: "hi",
    question: "रात को नींद नहीं आती, फ़ोन देखता रहता हूँ।",
    answer: "देर रात की रोशनी मन को दिन समझा देती है। रात्रि-चर्या में सोने से पहले एक घंटा शांत रखने की सलाह है।",
    verse: { ref: "Bhagavad Gita 6.17", sanskrit: "युक्ताहारविहारस्य युक्तचेष्टस्य कर्मसु", meaning: "Balanced food, rest and effort: this yoga removes sorrow." },
    step: "आज रात सोने से एक घंटा पहले फ़ोन दूसरे कमरे में रख दें; उसकी जगह दो पन्ने पढ़ें।",
    reads: [
      ["spoke", "Rhythm"],
      ["theme", "sleep, screens"],
      ["verse", "Gita 6.17"],
      ["asks next", "कल किस समय सोने का विचार है?"],
    ],
  },
  {
    chip: "મન નથી લાગતું",
    lang: "gu",
    question: "ભણવામાં મન નથી લાગતું, ધ્યાન ભટકે છે.",
    answer: "મન ભટકે એ સ્વાભાવિક છે; અર્જુને પણ એ જ કહ્યું હતું. અભ્યાસ અને વૈરાગ્યથી જ મન ધીમે ધીમે ઠરે છે.",
    verse: { ref: "Bhagavad Gita 6.35", sanskrit: "अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते", meaning: "By practice and by letting go, the mind is held." },
    step: "આવતીકાલે ૨૫ મિનિટનો એક જ વિષય, ફોન બીજા રૂમમાં; પછી પાંચ મિનિટ વિરામ.",
    reads: [
      ["spoke", "Mind"],
      ["theme", "focus"],
      ["verse", "Gita 6.35"],
      ["asks next", "સવારે ક્યારે ભણો છો?"],
    ],
  },
  {
    chip: "Seva",
    lang: "en",
    question: "How do I serve others when I barely have time for myself?",
    answer: "Seva is not a separate task on the list; it is the spirit in which the list is done. Start with one small act inside the day you already have.",
    verse: { ref: "Bhagavad Gita 3.19", sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर", meaning: "Therefore, without attachment, always do the work that is to be done." },
    step: "Tomorrow, do one chore at home without being asked, and do not mention it.",
    reads: [
      ["spoke", "Seva"],
      ["theme", "karma yoga"],
      ["verse", "Gita 3.19"],
      ["asks next", "Who at home could use a hand this week?"],
    ],
  },
];

const STEP_LABEL = { en: "One step:", hi: "एक कदम:", gu: "એક પગલું:" } as const;

export function ChatDemo() {
  const [i, setI] = useState(0);
  const ex = EXAMPLES[i];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Example questions">
        {EXAMPLES.map((e, k) => (
          <button
            key={e.chip}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            lang={e.lang}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              k === i
                ? "border-night-brass bg-night-brass text-night"
                : "border-night-line bg-night-2 text-sandal-2 hover:border-night-brass/60 hover:text-sandal"
            }`}
          >
            {e.chip}
          </button>
        ))}
      </div>

      <div key={i} className="rise mt-5 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <div className="rounded-2xl border border-night-line bg-night-2 p-4 sm:p-5">
          <p lang={ex.lang} className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-night-3 px-4 py-2.5 text-[0.95rem] text-sandal">
            {ex.question}
          </p>
          <div className="mt-3 max-w-[92%] space-y-3">
            <p lang={ex.lang} className="rounded-2xl rounded-bl-sm bg-night-brass-soft px-4 py-2.5 text-[0.95rem] text-sandal">
              {ex.answer}
            </p>
            <figure className="rounded-xl border border-night-brass/40 bg-night px-4 py-3">
              <p lang="sa" className="sanskrit text-[1.05rem] text-night-brass">
                {ex.verse.sanskrit}
              </p>
              <figcaption className="mt-1 text-sm text-sandal-2">
                {ex.verse.meaning} <span className="text-sandal-3">({ex.verse.ref})</span>
              </figcaption>
            </figure>
            <p lang={ex.lang} className="rounded-2xl rounded-bl-sm bg-night-brass-soft px-4 py-2.5 text-[0.95rem] text-sandal">
              <span className="font-semibold text-night-brass">{STEP_LABEL[ex.lang]} </span>
              {ex.step}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-night-line bg-night-2 p-4 sm:p-5">
          <p className="font-display text-xl text-sandal">What Sharthi noticed</p>
          <dl className="mt-3 divide-y divide-night-line text-sm">
            {ex.reads.map(([k, v]) => (
              <div key={k} className="flex gap-4 py-2.5">
                <dt className="w-20 shrink-0 text-sandal-3">{k}</dt>
                <dd className="text-sandal">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-sandal-3">Example conversation. Answers are written fresh for your day and your life stage.</p>
        </div>
      </div>
    </div>
  );
}
