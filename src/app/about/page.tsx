import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/site";

export const metadata: Metadata = { title: "About Sharthi" };

export default function AboutPage() {
  return (
    <LegalPage title="About Sharthi" intro="A small daily practice, built for people whose days leave no room for one.">
      <h2>Why it exists</h2>
      <p>
        Most of us were raised with someone to ask: a grandmother, a teacher, a family elder who would listen to how the day went and say one useful thing. Busy lives have quietly taken that away. Sharthi is an attempt to give
        a little of it back: a few minutes each evening to look at the day honestly, see which part of life is being neglected, and decide one small thing for tomorrow.
      </p>
      <h2>The name</h2>
      <p>
        <em>Sarathi</em> is the charioteer. In the Katha Upanishad the body is a chariot, the senses its horses, the mind the reins, and the intellect the charioteer who steers. Sharthi is built around that image: the daily
        report draws your day as a seven-spoke wheel, and the app&rsquo;s job is to help your own intellect hold the reins.
      </p>
      <h2>What it is, and is not</h2>
      <ul>
        <li>It is a tool for reflection, grounded in the Bhagavad Gita, the Upanishads, the Yoga Sutras and Ayurvedic daily routine.</li>
        <li>It is not a substitute for a doctor, a counsellor or a guru. See the <a href="/disclaimer">disclaimer</a>.</li>
        <li>It keeps your reflections on your own device. See the <a href="/privacy">privacy policy</a>.</li>
      </ul>
      <h2>Who is behind it</h2>
      <p>
        Sharthi is built by {site.owner}. The verse meanings and the &ldquo;live it today&rdquo; lines were written fresh for the app rather than copied from any published translation, and the Sanskrit was checked against open
        scripture sources.
      </p>
      <h2>Get in touch</h2>
      <p>
        For a walkthrough, or to bring Sharthi to your family, school or satsang group, call or message {site.phoneDisplay}.
      </p>
    </LegalPage>
  );
}
