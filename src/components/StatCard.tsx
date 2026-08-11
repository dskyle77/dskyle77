import { site } from "@/lib/site";

const stats: { label: string; value: string }[] = [
  { label: "Class", value: site.role },
  { label: "Base", value: site.location },
  { label: "Main", value: "Next.js · TS · Firebase" },
  { label: "Status", value: "Available" },
];

export default function StatCard() {
  return (
    <div className="rounded-md border border-signal/35 bg-ink-raised p-4 shadow-[0_0_32px_-10px_rgba(46,158,255,0.4)] transition-shadow duration-300 hover:shadow-[0_0_40px_-8px_rgba(46,158,255,0.5)]">
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
