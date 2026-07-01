import Link from "next/link";
import { experience, type ExperienceEntry } from "@/lib/experience";

const typeLabel: Record<string, string> = {
  work: "Employment",
  founder: "Founder",
  freelance: "Freelance",
  gamedev: "Game Dev",
};

function Card({
  item,
  compact,
  align,
}: {
  item: ExperienceEntry;
  compact: boolean;
  align: "left" | "right";
}) {
  const alignRight = align === "right";

  return (
    <div className={alignRight ? "sm:text-right" : undefined}>
      <p className="font-mono text-[10px] uppercase tracking-widest text-signal mb-1">
        {item.period} · {typeLabel[item.type]}
      </p>
      <h3 className="font-mono text-base font-semibold text-paper">
        {item.role}
      </h3>
      <p className="font-mono text-xs text-paper-dim mb-3">{item.org}</p>
      <p
        className={`text-sm text-paper-dim leading-relaxed max-w-md ${
          alignRight ? "sm:ml-auto" : undefined
        }`}
      >
        {item.summary}
      </p>

      {!compact && (
        <ul
          className={`mt-3 space-y-1.5 text-sm text-paper-dim max-w-md ${
            alignRight ? "sm:ml-auto" : undefined
          }`}
        >
          {item.highlights.map((h) => (
            <li
              key={h}
              className={`flex gap-2 ${
                alignRight ? "sm:flex-row-reverse" : ""
              }`}
            >
              <span className="text-signal shrink-0">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}

      {item.stack && (
        <ul
          className={`mt-3 flex flex-wrap gap-2 ${
            alignRight ? "sm:justify-end" : ""
          }`}
        >
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="rounded border border-line px-2 py-1 font-mono text-[10px] text-paper-dim"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Experience({ compact = false }: { compact?: boolean }) {
  const entries = compact ? experience.slice(0, 3) : experience;

  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-baseline justify-between mb-10 gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
            Experience
          </p>
          <h2 className="font-mono font-bold text-2xl sm:text-3xl text-paper">
            Where I&apos;ve been
          </h2>
        </div>
        {compact && (
          <Link
            href="/about#experience"
            className="font-mono text-xs text-signal hover:underline whitespace-nowrap"
          >
            Full history →
          </Link>
        )}
      </div>

      <ol className="relative">
        {/* timeline rail: left-aligned on mobile, centered on sm+ */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-px bg-hairline left-1.75 sm:left-1/2 sm:-translate-x-1/2"
        />

        {entries.map((item, i) => {
          const isRight = i % 2 === 1;

          return (
            <li key={item.id} className="relative mb-10 last:mb-0">
              <span
                aria-hidden="true"
                className="absolute top-1.5 left-0 sm:left-1/2 sm:-translate-x-1/2 h-3.5 w-3.5 rounded-full border-2 border-signal bg-ink z-10"
              />

              <div className="pl-8 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10">
                {isRight ? (
                  <>
                    <div aria-hidden="true" className="hidden sm:block" />
                    <div className="sm:pl-10">
                      <Card item={item} compact={compact} align="left" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sm:pr-10">
                      <Card item={item} compact={compact} align="left" />
                    </div>
                    <div aria-hidden="true" className="hidden sm:block" />
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
