import { ChatDemo } from "@/components/ChatDemo";
import { Audience } from "@/components/Audience";
import { AskMock, JourneyMock, PhoneDemo, ReflectMock } from "@/components/Mockups";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SAMPLE_SPOKES, Wheel } from "@/components/Wheel";
import { site } from "@/site";

const STEPS = [
  {
    title: "Answer thirteen quick questions",
    body: "Each evening Sharthi asks about your day: when you woke and slept, prayer, movement, food, screens, anger, stress, focus, seva, family, gratitude, and a free note. Tap an answer or just say it.",
  },
  {
    title: "See your day as a wheel",
    body: "Seven spokes are scored from your answers. The weakest ones are marked for care, with the reason why, a verse that speaks to it, and three steps tuned to your age and stage of life.",
  },
  {
    title: "Take one sankalp for tomorrow",
    body: "A single resolution, small enough to keep. Tomorrow evening Sharthi asks how it went, and the wheel turns a little.",
  },
];

const REPORT_FEATURES = [
  { title: "Seven spokes", body: "Rhythm, sadhana, food and body, senses, mind, karma, seva. Each scored 0 to 10, with a Sattva score and your guna for the day." },
  { title: "Tuned to your stage of life", body: "Age sets your ashrama, from vidyarthi to vanaprastha, and with it sensible targets for sleep, movement, screens and sadhana." },
  { title: "A verse for the weak spoke", body: "Forty-seven verses from the Gita, the Upanishads and the Yoga Sutras, each with Sanskrit, meaning and a line to live it today." },
  { title: "Your own scriptures", body: "Add PDFs, links or pasted text. Sharthi quotes them in answers and in the daily report, and you can mark which sources it should prefer." },
  { title: "Voice mode for children", body: "Questions are read aloud, the child answers in their own words, and the day's summary is spoken back. On by default for ages ten and under." },
  { title: "Private by design", body: "Reflections, chat and your PDFs stay on your own device. There is no account to create and nothing to upload." },
];

const ROADMAP = [
  ["Now", "The web app: reflect, report, ask, wisdom library and journey, in three languages."],
  ["Next", "Daily reminders for the evening reflection and the morning sankalp."],
  ["Then", "An app for Android and iPhone, and verses recorded by a Sanskrit teacher."],
  ["Later", "Verse sets curated for a sampradaya, such as the Vachanamrut or the Shikshapatri."],
] as const;

const FAQ = [
  ["When does Sharthi launch?", "It is being built now. This page shows the concept and the screens as they stand. Join the waitlist and you will hear the moment the first release is out."],
  ["Will it be free?", "Yes. Reflection, the report, the verse library and the offline guide will work without an account or a subscription."],
  ["Which languages will it speak?", "English, Hindi and Gujarati, including Hinglish and Gujarati typed in English letters. You switch any time from the profile screen."],
  ["Will I need to install an app?", "Not at first. Sharthi opens in the browser on a phone or computer and can be added to the home screen. A Play Store and App Store version is planned."],
  ["Is my data private?", "Reflections, chat and any PDFs you add are stored only in your browser. Nothing is uploaded except what you choose to send to the AI guide."],
  ["Is this medical or psychological advice?", "No. Sharthi offers reflection and encouragement grounded in scripture. If you are in distress, Tele-MANAS is free and open 24 hours: 14416."],
  ["Who is behind Sharthi?", `Sharthi is built by ${site.owner}. For a walkthrough, or to bring it to your family, school or satsang group, call ${site.phoneDisplay}.`],
] as const;

/* Rendered once on each layout: under the headline on desktop, after the phone on mobile. */
const verse = (
  <blockquote className="max-w-xl border-l-2 border-brass pl-4 text-ink-2 lg:mt-10">
    <p lang="sa" className="sanskrit text-[1.05rem] text-ink">
      बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च
    </p>
    <p className="mt-1 text-sm">Know the intellect as the charioteer, and the mind as the reins. Katha Upanishad 1.3.3</p>
  </blockquote>
);

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero */}
        <section className="dawn overflow-hidden">
          {/* Mobile order: words, buttons, phone, verse. Desktop: words and verse left, phone right. */}
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-x-12 lg:pb-28 lg:pt-20">
            <div className="min-w-0 max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 text-sm text-ink-2">
                <span className="size-2 rounded-full bg-peacock" aria-hidden />
                Coming soon, in English · हिंदी · ગુજરાતી
              </p>
              <h1 className="mt-5 font-display text-[2.5rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4rem]">One guide for a busy life.</h1>
              <p className="mt-5 text-[1.05rem] text-ink-2 sm:text-lg">
                Busy days leave no one to ask. Sharthi is that guide: a five-minute evening conversation, your day drawn as a seven-spoke wheel, and one small step for tomorrow, with a verse from the Gita to hold on to.
              </p>
              <Audience />
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#waitlist" className="flex-1 basis-40 whitespace-nowrap rounded-full bg-ink px-4 py-3 text-center text-[0.95rem] font-semibold text-paper transition-colors hover:bg-night sm:flex-none sm:basis-auto sm:px-6 sm:text-base">
                  Join the waitlist
                </a>
                <a href="#how" className="flex-1 basis-40 whitespace-nowrap rounded-full border border-line-strong bg-white/70 px-4 py-3 text-center text-[0.95rem] font-semibold text-ink hover:border-ink/40 sm:flex-none sm:basis-auto sm:px-6 sm:text-base">
                  See how it works
                </a>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
                {["No app to install", "Works offline, in your browser", "English · हिंदी · ગુજરાતી"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <svg viewBox="0 0 16 16" className="size-4 text-peacock" fill="none" aria-hidden>
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.4" />
                      <path d="m5 8.2 2 2 4-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="hidden lg:block">{verse}</div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute inset-x-8 top-10 -z-10 h-[85%] rounded-full bg-[radial-gradient(closest-side,rgba(221,176,98,0.35),transparent)]" aria-hidden />
              <PhoneDemo />
            </div>

            <div className="lg:hidden">{verse}</div>
          </div>
        </section>

        {/* Two ways in */}
        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">An evening habit, and a guide for any hour.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="grid content-start gap-6 rounded-[1.5rem] border border-line bg-paper p-6 sm:p-8">
                <div>
                  <p className="text-sm font-semibold text-peacock">Reflect, every evening</p>
                  <h3 className="mt-2 font-display text-3xl text-ink">Five minutes to see the whole day.</h3>
                  <p className="mt-3 text-ink-2">Thirteen gentle questions, answered by tap or by voice. Sharthi reacts as you go, then draws your day as a wheel and tells you where to put care tomorrow.</p>
                </div>
                <ReflectMock />
              </div>
              <div className="grid content-start gap-6 rounded-[1.5rem] border border-line bg-paper p-6 sm:p-8">
                <div>
                  <p className="text-sm font-semibold text-brass">Ask, any time</p>
                  <h3 className="mt-2 font-display text-3xl text-ink">A question in your own words.</h3>
                  <p className="mt-3 text-ink-2">Anger, sleep, focus, family, seva. Type or speak in English, Hindi, Gujarati or a mix. Answers cite verses, give practical steps and ask one question back about your routine.</p>
                </div>
                <AskMock />
              </div>
            </div>
          </div>
        </section>

        {/* How it works: a real sequence, so numbering earns its place */}
        <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <h2 className="max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">From a short conversation to a clear next step.</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="border-t-2 border-brass pt-5">
                <span className="font-display text-3xl text-brass">{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-2 text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Ask: the night section */}
        <section id="ask" className="night">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
            <div>
              <p className="text-sm font-semibold text-night-peacock">Ask Sharthi</p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-sandal sm:text-5xl">Say it the way you would say it to an elder.</h2>
              <p className="mt-5 text-sandal-2">No commands, no menus. Sharthi reads the question, finds the spoke of life it touches, chooses a verse that actually speaks to it, and answers with a step you can take tomorrow.</p>
              <ul className="mt-6 space-y-2.5 text-sandal-2">
                {[
                  "Type or speak in English, हिंदी, ગુજરાતી, or Hinglish",
                  "Verses appear as cards with Sanskrit and meaning",
                  "Quotes your own PDFs and links when they match",
                  "Every answer ends with one question about your routine",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-night-brass" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <ChatDemo />
          </div>
        </section>

        {/* Report */}
        <section id="report" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-peacock">Your daily report</p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">One wheel, seven spokes, the whole of a life.</h2>
              <p className="mt-5 text-ink-2">
                Born from the Katha Upanishad&rsquo;s image of the body as a chariot. Each spoke is one part of the day; when one is short, the ride is rough. Sharthi shows which spoke to mend, why, and what tomorrow&rsquo;s first step is.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-line bg-white p-5 sm:p-7">
              <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto]">
                <Wheel animate={false} className="w-full max-w-[18rem] justify-self-center" />
                <ul className="w-full space-y-1.5 text-sm sm:w-44">
                  {SAMPLE_SPOKES.map((s) => (
                    <li key={s.name} className="flex items-center justify-between gap-3">
                      <span className={s.care ? "font-semibold text-kumkum" : "text-ink-2"}>{s.name}</span>
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-16 rounded-full bg-paper-2">
                          <span className={`block h-full rounded-full ${s.care ? "bg-kumkum" : "bg-peacock"}`} style={{ width: `${s.score * 10}%` }} />
                        </span>
                        <span className="w-5 text-right tabular-nums text-ink-3">{s.score}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {REPORT_FEATURES.map((f) => (
              <div key={f.title}>
                <h3 className="font-display text-2xl text-ink">{f.title}</h3>
                <p className="mt-1.5 text-ink-2">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid items-center gap-10 rounded-[1.75rem] border border-line bg-paper-2/60 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold text-peacock">Your journey</p>
              <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">The wheel turns a little each day.</h3>
              <p className="mt-4 text-ink-2">Streak, seven-day average, Sattva over time and a week at a glance. Sharthi names the most improved spoke and picks next week&rsquo;s focus, so growth is something you can see, not just hope for.</p>
            </div>
            <JourneyMock />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-line bg-white">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">Good to know.</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-semibold text-ink">
                    {q}
                    <svg className="chev size-5 shrink-0 text-ink-3" viewBox="0 0 20 20" fill="none" aria-hidden>
                      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <p className="mt-3 max-w-prose text-ink-2">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* What's coming */}
        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">What&rsquo;s coming.</h2>
            <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ROADMAP.map(([when, what]) => (
                <li key={when} className="border-t-2 border-brass pt-4">
                  <p className="font-display text-2xl text-brass">{when}</p>
                  <p className="mt-1 text-ink-2">{what}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="night grid gap-10 rounded-[1.75rem] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
            <div>
              <p className="text-sm font-semibold text-night-peacock">Early access</p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-sandal sm:text-5xl">Be first to have a guide for your busy days.</h2>
              <p className="mt-5 text-sandal-2">
                Join the waitlist and we&rsquo;ll let you know the moment Sharthi is ready. Telling us who it&rsquo;s for helps us decide what to open first.
              </p>
              <p className="mt-8 text-sm text-sandal-3">Prefer to talk? {site.owner} is on {site.phoneDisplay}.</p>
            </div>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
