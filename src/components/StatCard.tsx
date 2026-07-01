import { site } from "@/lib/site";

// The signature element: a game-HUD-style stat panel applied to real,
// professional facts. Borders and label/value grammar borrowed from
// character-sheet UI — content stays serious.

const stats: { label: string; value: string }[] = [
  { label: "Class", value: site.role },
  { label: "Base", value: site.location },
  { label: "Stack", value: "Next.js / TS / Firebase" },
  { label: "Status", value: "Available" },
];

export default function StatCard() {
  return (
    <div className="rounded-md border border-signal/40 bg-ink-raised p-4 shadow-[0_0_28px_-8px_rgba(46,158,255,0.45)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-signal mb-3">
        // dskyle77.dat
      </p>
      <dl className="space-y-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center justify-between gap-4 border-b border-hairline pb-2 last:border-none last:pb-0"
          >
            <dt className="font-mono text-[11px] uppercase tracking-wider text-paper-dim">
              {stat.label}
            </dt>
            <dd className="font-mono text-xs text-paper text-right">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
