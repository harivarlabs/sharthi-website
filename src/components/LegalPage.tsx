import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

/** Shared frame for the text pages: About, Terms, Privacy, Disclaimer. */
export function LegalPage({ title, intro, updated, children }: { title: string; intro: string; updated?: string; children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="dawn border-b border-line">
          <div className="mx-auto max-w-3xl px-4 pb-12 pt-14 sm:px-6 lg:pt-20">
            <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
            <p className="mt-4 text-lg text-ink-2">{intro}</p>
            {updated && <p className="mt-4 text-sm text-ink-3">Last updated {updated}</p>}
          </div>
        </section>
        <article className="prose-sharthi mx-auto max-w-3xl px-4 py-14 sm:px-6">{children}</article>
      </main>
      <SiteFooter />
    </>
  );
}
