import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/site";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" intro="The plain-language rules for using this website and, when it launches, the Sharthi app." updated="10 October 2026">
      <h2>1. Who we are</h2>
      <p>
        This website and the Sharthi app (together, &ldquo;Sharthi&rdquo;) are operated by {site.owner} (&ldquo;we&rdquo;, &ldquo;us&rdquo;). You can reach us at {site.phoneDisplay}.
      </p>
      <h2>2. Agreeing to these terms</h2>
      <p>By using this website or the app you agree to these terms and to the <a href="/privacy">privacy policy</a> and <a href="/disclaimer">disclaimer</a>. If you do not agree, please do not use Sharthi.</p>
      <h2>3. What Sharthi is for</h2>
      <p>
        Sharthi is a tool for personal reflection and encouragement, drawing on the Bhagavad Gita, the Upanishads, the Yoga Sutras and Ayurvedic daily routine. It is offered for general wellbeing and self-study. It is not a
        medical, psychological, legal or religious service, and nothing in it is professional advice.
      </p>
      <h2>4. Your use</h2>
      <ul>
        <li>You may use Sharthi for your own personal, non-commercial purposes.</li>
        <li>You are responsible for anything you add to the app, including scripture PDFs, links and pasted text, and for having the right to use that material.</li>
        <li>You must not try to break, overload, copy or reverse-engineer Sharthi, or use it to harm others.</li>
        <li>If you set up Sharthi for a child, you are responsible for supervising their use of it.</li>
      </ul>
      <h2>5. Our content</h2>
      <p>
        The design, text, verse meanings, &ldquo;live it today&rdquo; lines, illustrations and code of Sharthi belong to us or our licensors. The Sanskrit verses themselves are ancient texts in the public domain. You may
        quote short passages from Sharthi with attribution; you may not republish it as a whole.
      </p>
      <h2>6. Your content</h2>
      <p>
        Anything you add to the app stays yours. Because it is stored on your own device, we do not see it, copy it or claim any rights over it. If you choose to send a question to the optional AI guide, the text you send
        is processed to answer you and is not used by us for anything else.
      </p>
      <h2>7. Availability and changes</h2>
      <p>
        Sharthi is in development. Features shown on this website may change, arrive later, or not arrive at all. We may update or stop any part of Sharthi at any time. We may also update these terms; the date at the
        top shows the latest version.
      </p>
      <h2>8. No warranty, limited liability</h2>
      <p>
        Sharthi is provided &ldquo;as is&rdquo;. We do our best to make it useful and accurate, but we cannot promise that it will always be available, error-free, or right for your situation. To the extent the law allows,
        we are not liable for any loss arising from your use of Sharthi. Nothing in these terms limits liability that cannot be limited under applicable law.
      </p>
      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of India. Any dispute will be handled by the courts of Gujarat, India.</p>
      <h2>10. Contact</h2>
      <p>Questions about these terms: {site.phoneDisplay}.</p>
    </LegalPage>
  );
}
