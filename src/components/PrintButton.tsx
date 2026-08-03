"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-md border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-paper hover:border-signal hover:text-signal transition-colors"
    >
      Print / Save PDF
    </button>
  );
}
