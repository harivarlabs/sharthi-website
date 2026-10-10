import Image from "next/image";

/*
 * The Sharthi logo, supplied as artwork (public/logo/*.png, white background removed):
 *   emblem   – Krishna guiding the seeker, with the rising arrow
 *   wordmark – "sharthi" with the gold dot
 *   lockup   – emblem + wordmark + "ask · reflect · improve"
 * It is navy and gold, so it belongs on light backgrounds only.
 */

/** The stacked lockup without the tagline (emblem over the wordmark). For the header: 80px tall on phones, 108px from sm. */
export function Logo({ className = "" }: { className?: string }) {
  return <Image src="/logo/lockup-short.png" alt="Sharthi" width={700} height={571} priority className={`h-20 w-auto sm:h-[108px] ${className}`} />;
}

/** The full lockup with the tagline. For the footer. */
export function LogoLockup({ width = 200, className = "" }: { width?: number; className?: string }) {
  return <Image src="/logo/lockup.png" alt="Sharthi — ask, reflect, improve" width={900} height={806} className={`h-auto ${className}`} style={{ width }} />;
}
