import { Audience } from "@/components/Audience";
import { ChatDemo } from "@/components/ChatDemo";
import { JourneyMock, PhoneDemo } from "@/components/Mockups";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TryItNow } from "@/components/TryItNow";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SAMPLE_SPOKES, Wheel } from "@/components/Wheel";
import { site } from "@/site";

const STEPS = [
  {
    icon: "🌙",
    title: "Every evening, answer a few easy questions",
    body: "When did you sleep? Did you pray? How much phone? Did anger come today? Tap an answer, or just say it out loud. Five minutes, in English, Hindi or Gujarati.",
  },
  {
    icon: "☸️",
    title: "See your day as a wheel",
    body: "Seven parts of your day, each given a score. The weak ones are marked in red, with the reason in plain words and a verse that fits.",
  },
  {
    icon: "🪔",
    title: "Take one small promise for tomorrow",
    body: "Not a long list. One thing, small enough to keep. Tomorrow evening Sharthi asks how it went.",
  },
];

const FEATURES = [
  { title: "Made for busy people", body: "No long forms. Every question is a tap. If you miss a day, nothing is lost; you just pick up the next evening." },
  { title: "Speaks your language", body: "English, हिंदी and ગુજરાતી, including Hinglish and Gujarati typed in English letters. Switch any time." },
  { title: "Works by voice", body: "Tap the mic and talk. Sharthi reads questions aloud too, so children and elders can use it without typing." },
  { title: "Wisdom you can use", body: "Verses from the Gita, Upanishads and Yoga Sutras, each with a plain meaning and one line to live it today." },
  { title: "Add your own scriptures", body: "Your satsang's PDFs, a link, or notes you type. Sharthi quotes them when they fit the question." },
  { title: "Private by design", body: "Your answers stay on your own phone. No account, no uploading, nothing to remember." },
];

const ROADMAP = [
  ["Now", "The web app: reflect each evening, see your wheel, ask questions, read verses."],
  ["Next", "Daily reminders for the evening reflection and the morning promise."],
  ["Then", "An app for Android and iPhone, and verses read by a Sanskrit teacher."],
  ["Later", "Verse collections for your sampradaya, such as the Vachanamrut or the Shikshapatri."],
] as const;

const FAQ = [
  ["Is it hard to use?", "No. Every question is answered with one tap, or by speaking. If you can use WhatsApp, you can use Sharthi."],
  ["Do I need to install anything?", "No. It opens in the browser on your phone or computer, like a website. You can add it to your home screen so it looks like an app."],
  ["Will it be free?", "Yes. The evening reflection, the wheel, the verses and the guide will all be free, with no account needed."],
  ["Which languages does it speak?", "English, Hindi and Gujarati. You can also type Hindi or Gujarati in English letters, like a WhatsApp message."],
  ["Is my information private?", "Yes. Your answers stay on your own phone. Nothing is uploaded unless you choose to send a question to the AI guide."],
  ["Is this a replacement for a doctor or counsellor?", "No. Sharthi offers reflection and encouragement grounded in scripture. If you are in distress, Tele-MANAS is free and open 24 hours: 14416."],
  ["When does it launch, and who is behind it?", `Sharthi is being built by ${site.owner}. Join the waitlist below and you will be told the moment it is ready. To talk first, call ${site.phoneDisplay}.`],
] as const;

/* Rendered once on each layout: under the headline on desktop, after the phone on mobile. */
const verse = (
  <blockquote className="max-w-xl border-l-2 border-brass pl-4 text-ink-2 lg:mt-10">
    <p lang="sa" className="sanskrit text-[1.05rem] text-ink">
      बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च
    </p>
    <p className="mt-1 text-sm">The intellect is the charioteer, the mind the reins. Katha Upanishad 1.3.3</p>
  </blockquote>
);

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero */}
        <section className="dawn overflow-hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-x-12 lg:pb-28 lg:pt-20">
            <div className="min-w-0 max-w-xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1 text-sm text-ink-2">
                <span className="size-2 rounded-full bg-peacock" aria-hidden />
                Coming soon · English · हिंदी · ગુજરાતી
              </p>
              <h1 className="mt-5 font-display text-[2.5rem] leading-[1.05] text-ink sm:text-6xl lg:text-[4rem]">One guide for a busy life.</h1>
              <p className="mt-5 text-[1.05rem] text-ink-2 sm:text-lg">
                Five minutes every evening. Sharthi asks how your day went, shows you which part of life needs care, and gives you one small thing to do tomorrow, with a verse from the Gita to hold on to.
              </p>
              <Audience />
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#try" className="flex-1 basis-40 whitespace-nowrap rounded-full bg-ink px-4 py-3.5 text-center text-[0.95rem] font-semibold text-paper transition-colors hover:bg-night sm:flex-none sm:basis-auto sm:px-6 sm:text-base">
                  Try it in one minute
                </a>
                <a href="#waitlist" className="flex-1 basis-40 whitespace-nowrap rounded-full border border-line-strong bg-white/70 px-4 py-3.5 text-center text-[0.95rem] font-semibold text-ink hover:border-ink/40 sm:flex-none sm:basis-auto sm:px-6 sm:text-base">
                  Join the waitlist
                </a>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
                {["Nothing to install", "Free, no account", "Works by voice too"].map((t) => (
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

        {/* How it works: three steps, a real sequence */}
        <section id="how" className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">How it works</h2>
            <p className="mt-3 max-w-xl text-lg text-ink-2">Think of it as a kind elder you talk to for five minutes every evening.</p>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-[1.5rem] border border-line bg-paper p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-white text-2xl shadow-[0_1px_2px_rgba(25,27,68,0.08)]" aria-hidden>
                      {s.icon}
                    </span>
                    <span className="font-display text-3xl text-brass">{i + 1}</span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-snug text-ink">{s.title}</h3>
                  <p className="mt-2 text-ink-2">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Try it now */}
        <section id="try" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <p className="text-sm font-semibold text-peacock">Try it now</p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">Answer three questions about today.</h2>
          <p className="mt-3 max-w-xl text-lg text-ink-2">See what Sharthi would say to you this evening. Takes a minute, and nothing is saved.</p>
          <div className="mt-10">
            <TryItNow />
          </div>
        </section>

        {/* Ask: the night section */}
        <section id="ask" className="night">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
            <div>
              <p className="text-sm font-semibold text-night-peacock">Ask anything</p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-sandal sm:text-5xl">Ask the way you would ask an elder.</h2>
              <p className="mt-5 text-sandal-2">
                Type or speak in your own words, in any language. Sharthi answers simply, gives a verse that fits, and suggests one step for tomorrow. Tap the examples to see.
              </p>
              <ul className="mt-6 space-y-2.5 text-sandal-2">
                {["Speak or type in English, हिंदी or ગુજરાતી", "Every answer comes with a verse and its meaning", "Ends with one thing you can do tomorrow"].map((t) => (
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

        {/* The wheel, explained simply */}
        <section id="report" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-peacock">Your day as a wheel</p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">Seven parts of a day. One look tells you where to put care.</h2>
              <p className="mt-5 text-ink-2">
                Sleep, prayer, food, screens, mind, work and helping others. Each gets a score out of 10. When one part is low, the whole day feels rough; Sharthi shows which one, why, and the first small step.
              </p>
              <p className="mt-3 text-sm text-ink-3">The picture comes from the Katha Upanishad: the body is a chariot and your own good sense is the charioteer.</p>
            </div>
            <div className="rounded-[1.75rem] border border-line bg-white p-5 sm:p-7">
              <div className="grid items-center gap-4 sm:grid-cols-[1fr_auto]">
                <Wheel animate={false} className="w-full max-w-[18rem] justify-self-center" />
                <ul className="w-full space-y-1.5 text-sm sm:w-48">
                  {SAMPLE_SPOKES.map((s) => (
                    <li key={s.name} className="flex items-center justify-between gap-3">
                      <span className={s.care ? "font-semibold text-kumkum" : "text-ink-2"}>
                        {s.name} <span className="font-normal text-ink-3">· {s.sanskrit}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-14 rounded-full bg-paper-2">
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
            {FEATURES.map((f) => (
              <div key={f.title}>
                <h3 className="font-display text-2xl text-ink">{f.title}</h3>
                <p className="mt-1.5 text-ink-2">{f.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid items-center gap-10 rounded-[1.75rem] border border-line bg-paper-2/60 p-6 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold text-peacock">Week by week</p>
              <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-4xl">See yourself getting better.</h3>
              <p className="mt-4 text-ink-2">A streak for every evening you show up, your score over the week, and the part of life that improved most. Small changes become visible.</p>
            </div>
            <JourneyMock />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-y border-line bg-white">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <h2 className="font-display text-4xl leading-tight text-ink sm:text-5xl">Questions people ask</h2>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {FAQ.map(([q, a]) => (
                <details key={q} className="group py-4">
                  <summary className="flex min-h-12 cursor-pointer items-center justify-between gap-6 text-lg font-semibold text-ink">
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
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">What&rsquo;s coming</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROADMAP.map(([when, what]) => (
              <li key={when} className="border-t-2 border-brass pt-4">
                <p className="font-display text-2xl text-brass">{when}</p>
                <p className="mt-1 text-ink-2">{what}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="night grid gap-10 rounded-[1.75rem] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
            <div>
              <p className="text-sm font-semibold text-night-peacock">Be first</p>
              <h2 className="mt-2 font-display text-4xl leading-tight text-sandal sm:text-5xl">Tell us where to send the invitation.</h2>
              <p className="mt-5 text-sandal-2">Leave your name and email, and we will write to you the day Sharthi is ready. No newsletters, nothing else.</p>
              <p className="mt-8 text-sm text-sandal-3">
                Prefer to talk? {site.owner} is on {site.phoneDisplay}.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
