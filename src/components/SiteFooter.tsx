import Link from "next/link";
import { NAV } from "@/nav";
import { LogoLockup } from "./Logo";

const COLUMNS = [
  { title: "Explore", links: NAV },
  {
    title: "Company",
    links: [
      ["About Sharthi", "/about"],
      ["Join the waitlist", "/#waitlist"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms of use", "/terms"],
      ["Privacy policy", "/privacy"],
      ["Disclaimer", "/disclaimer"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 text-sm text-ink-2 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <LogoLockup width={190} />
        </div>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <p className="font-semibold text-ink">{c.title}</p>
            <ul className="mt-3 space-y-2">
              {c.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5 text-xs text-ink-3 sm:px-6">
          <p>© 2026 Sharthi. All rights reserved.</p>
          <p>Sharthi offers reflection and encouragement, not medical or psychological advice.</p>
        </div>
      </div>
    </footer>
  );
}
