import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/site";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" intro="Short version: this website keeps only what you type into the waitlist form, and the app keeps your reflections on your own device." updated="10 October 2026">
      <h2>1. This website</h2>
      <ul>
        <li>There are no accounts, cookies, trackers or analytics on this website.</li>
        <li>We do not collect anything when you read these pages.</li>
        <li>
          <strong>The waitlist form</strong> asks for your name, email, an optional WhatsApp number and what you are interested in. We use these only to tell you about Sharthi&rsquo;s launch and to decide what to
          open first. We do not send newsletters or share the list. Ask us at {site.phoneDisplay} and we will remove you.
        </li>
        <li>Like any website, the hosting provider may keep short-lived technical logs (such as the IP address and time of a request) to run and protect the service.</li>
      </ul>
      <h2>2. The Sharthi app</h2>
      <p>When the app launches, it is designed so that your data stays with you:</p>
      <ul>
        <li>
          <strong>Stored on your device.</strong> Your profile (name, age, goals, language), daily reflections, reports, chat history and any scripture PDFs, links or notes you add are stored in your own browser. We do not
          have a server copy of them.
        </li>
        <li>
          <strong>No account.</strong> You do not need to sign up, and we do not know who you are.
        </li>
        <li>
          <strong>Optional AI guide.</strong> If live AI answers are switched on, the question you ask, your latest reflection and your life stage are sent to an AI model provider so it can write a reply. This is only what is
          needed to answer you. Without the AI guide, Sharthi answers entirely offline.
        </li>
        <li>
          <strong>Adding a PDF or link.</strong> The file or page is read on the server only to extract its text; the text is then stored in your browser and the file is not kept.
        </li>
        <li>
          <strong>Voice.</strong> Listening and speaking use your browser&rsquo;s own speech features. Where the browser cannot recognise speech, a short recording may be sent to a transcription service and is not kept.
        </li>
        <li>
          <strong>Deleting your data.</strong> Clearing the app&rsquo;s data in your browser, or using the reset option in the app, removes everything.
        </li>
      </ul>
      <h2>3. Children</h2>
      <p>
        Sharthi has a voice mode for children aged ten and under. It is meant to be set up and used with a parent or guardian. The app does not collect any information about a child beyond what is stored on the family&rsquo;s
        own device.
      </p>
      <h2>4. Your rights</h2>
      <p>
        Because we hold no personal data about you, there is nothing for us to access, correct or delete on our side; you are in full control of what is on your device. If you have a question about privacy, contact us at{" "}
        {site.phoneDisplay}.
      </p>
      <h2>5. Changes</h2>
      <p>If the way Sharthi handles data changes, for example when accounts and sync across devices are added, this policy will be updated and the date at the top will change.</p>
      <h2>6. Contact</h2>
      <p>
        {site.owner}, {site.phoneDisplay}.
      </p>
    </LegalPage>
  );
}
