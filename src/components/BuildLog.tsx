"use client";

import { useEffect, useState } from "react";
import { buildLog } from "@/lib/site";

export default function BuildLog() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setDisplayed(buildLog[0]);
    }
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;

    const current = buildLog[index];

    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 26);
      return () => clearTimeout(t);
    }

    const pause = setTimeout(() => {
      setCharIndex(0);
      setDisplayed("");
      setIndex((i) => (i + 1) % buildLog.length);
    }, 2200);
    return () => clearTimeout(pause);
  }, [charIndex, index, reduced]);

  return (
    <div className="rounded-md border border-hairline bg-ink-raised px-4 py-3 font-mono text-xs text-paper-dim">
      <span aria-hidden="true">{displayed || (reduced ? buildLog[0] : "")}</span>
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block w-1.5 h-3.5 align-middle bg-signal cursor-blink"
      />
      <span className="sr-only">Recent activity: {buildLog.join(". ")}</span>
    </div>
  );
}
