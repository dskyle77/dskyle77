/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { buildLog } from "@/lib/site";

export default function BuildLog() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
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

    // Typing forward
    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 26);

      return () => clearTimeout(t);
    }

    // Pause after fully typing
    if (!deleting && displayed.length === current.length) {
      const t = setTimeout(() => {
        setDeleting(true);
      }, 2200);

      return () => clearTimeout(t);
    }

    // Delete backwards
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 18);

      return () => clearTimeout(t);
    }

    // Move to next line after deletion
    if (deleting && displayed.length === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % buildLog.length);
      }, 300);

      return () => clearTimeout(t);
    }
  }, [displayed, deleting, index, reduced]);

  return (
    <div className="rounded-md border border-hairline bg-ink-raised px-4 py-3 font-mono text-xs text-paper-dim">
      <span aria-hidden="true">
        {displayed || (reduced ? buildLog[0] : "")}
      </span>

      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-3.5 w-1.5 align-middle bg-signal cursor-blink"
      />

      <span className="sr-only">Recent activity: {buildLog.join(". ")}</span>
    </div>
  );
}
