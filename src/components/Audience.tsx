"use client";

import { useEffect, useState } from "react";

const WHO = ["students with exams ahead", "parents with no hour to spare", "elders who want a daily routine", "children, by voice"];

/** A rotating "who it's for" line. Static list when the viewer prefers reduced motion. */
export function Audience() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      setI((n) => (n + 1) % WHO.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="mt-5 text-ink-2">
      For{" "}
      <span key={i} className="rise inline-block font-semibold text-brass">
        {WHO[i]}
      </span>
      <span className="sr-only">; also for {WHO.filter((_, k) => k !== i).join(", ")}</span>
    </p>
  );
}
