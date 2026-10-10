"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { NAV } from "@/nav";
import { Logo } from "./Logo";

const subscribe = (cb: () => void) => {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
};

// Hysteresis: compact after 64px, expanded again only once back within 8px of the top,
// so the header never flickers around a single threshold.
let compact = false;
const getScrolled = () => {
  if (!compact && window.scrollY > 64) compact = true;
  else if (compact && window.scrollY < 8) compact = false;
  return compact;
};
const getServerScrolled = () => false;

/**
 * Fixed at the top with the big logo; shrinks once the reader scrolls.
 * A spacer keeps the page layout at the expanded height so shrinking never moves the content.
 */
export function SiteHeader() {
  const scrolled = useSyncExternalStore(subscribe, getScrolled, getServerScrolled);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 border-b border-line bg-paper/85 backdrop-blur" data-scrolled={scrolled || undefined}>
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 transition-[height] duration-300 ease-out sm:px-6 ${
            scrolled ? "h-16 sm:h-20" : "h-24 sm:h-[7.5rem]"
          }`}
        >
          <Link href="/" aria-label="Sharthi home" className="flex items-center rounded-md">
            <Logo className={`transition-[height] duration-300 ease-out ${scrolled ? "h-12! sm:h-16!" : ""}`} />
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-ink-2 md:flex" aria-label="Sections">
            {NAV.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-ink">
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/#waitlist" className="whitespace-nowrap rounded-full bg-ink px-4.5 py-2 text-sm font-semibold text-paper transition-colors hover:bg-night">
            Join the waitlist
          </Link>
        </div>
      </header>
      <div className="h-24 sm:h-[7.5rem]" aria-hidden />
    </>
  );
}
