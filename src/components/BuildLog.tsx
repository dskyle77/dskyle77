"use client";

import { useEffect, useState } from "react";
import { buildLog } from "@/lib/site";

export default function BuildLog() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = buildLog[index];

    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 28);
      return () => clearTimeout(t);
    }

    const pause = setTimeout(() => {
      setCharIndex(0);
      setDisplayed("");
      setIndex((i) => (i + 1) % buildLog.length);
    }, 2200);
    return () => clearTimeout(pause);
  }, [charIndex, index]);

  return (
    <div className="rounded-md border border-hairline bg-ink-raised px-4 py-3 font-mono text-xs text-paper-dim">
      <span aria-hidden="true">{displayed}</span>
      <span className="ml-0.5 inline-block w-2 bg-signal animate-pulse">
        &nbsp;
      </span>
      <span className="sr-only">Recent activity: {buildLog.join(". ")}</span>
    </div>
  );
}
