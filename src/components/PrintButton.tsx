"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-secondary !text-xs !uppercase !tracking-wider !px-4 !py-2"
    >
      Print / Save PDF
    </button>
  );
}
