import Link from "next/link";
import { experience, type ExperienceEntry } from "@/lib/experience";
import Reveal from "./shared/Reveal";

const typeLabel: Record<string, string> = {
  work: "Employment",
  founder: "Founder",
  freelance: "Freelance",
  gamedev: "Game Dev",
};

function TechTags({
  stack,
  align = "left",
}: {
  stack?: readonly string[];
  align?: "left" | "right";
}) {
  if (!stack?.length) return null;

  return (
    <ul
      className={`mt-5 flex flex-wrap gap-1.5 ${
        align === "right" ? "sm:justify-end" : ""
      }`}
    >
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-paper-dim transition-colors hover:border-signal/30 hover:text-paper"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function Card({
  item,
  compact,
  align,
}: {
  item: ExperienceEntry;
  compact: boolean;
  align: "left" | "right";
}) {
  const right = align === "right";

  return (
    <div className={right ? "sm:text-right" : ""}>
      <div
        className={`mb-3 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-signal ${
          right ? "sm:justify-end" : ""
        }`}
      >
        <span>{item.period}</span>
        <span className="text-paper-dim/40">·</span>
        <span className="text-paper-dim">{typeLabel[item.type]}</span>
      </div>

      <h3 className="text-xl font-semibold tracking-tight text-paper sm:text-2xl">
        {item.role}
      </h3>

      <p className="mt-1 text-sm text-paper-dim">{item.org}</p>

      <p
        className={`mt-4 max-w-xl text-sm leading-relaxed text-paper-dim ${
          right ? "sm:ml-auto" : ""
        }`}
      >
        {item.summary}
      </p>

      {!compact && item.highlights?.length > 0 && (
        <ul className={`mt-5 space-y-2 max-w-xl ${right ? "sm:ml-auto" : ""}`}>
          {item.highlights.map((highlight) => (
            <li
              key={highlight}
              className={`flex gap-2.5 text-sm leading-relaxed text-paper-dim ${
                right ? "sm:flex-row-reverse" : ""
              }`}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal/80" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      <TechTags stack={item.stack} align={align} />
    </div>
  );
}

export default function Experience({ compact = false }: { compact?: boolean }) {
  const entries = compact ? experience.slice(0, 3) : experience;

  return (
    <section id="experience" className="relative mx-auto max-w-5xl px-6 py-24">
      <Reveal>
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <div className="mb-3 flex items-center justify-between gap-4 md:mb-0">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-signal">
                Experience
              </p>
              <Link
                href="/about#experience"
                className="inline text-xs font-medium text-signal link-underline md:hidden"
              >
                Full history →
              </Link>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Where I&apos;ve been
            </h2>
          </div>

          {compact && (
            <Link
              href="/about#experience"
              className="hidden text-xs font-medium text-signal link-underline md:block"
            >
              Full history →
            </Link>
          )}
        </div>
      </Reveal>

      <ol className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1.5 top-0 w-px bg-linear-to-b from-signal/0 via-signal/25 to-signal/0 sm:left-1/2 sm:-translate-x-1/2"
        />

        {entries.map((item, i) => {
          const isRight = i % 2 === 1;

          return (
            <li key={item.id} className="relative mb-12 last:mb-0 sm:mb-16">
              <div
                aria-hidden="true"
                className="absolute left-0 top-1.5 z-20 flex h-3 w-3 items-center justify-center rounded-full border border-signal bg-ink shadow-[0_0_12px_rgba(59,158,255,0.45)] sm:left-1/2 sm:-translate-x-1/2"
              >
                <span className="h-1 w-1 rounded-full bg-signal" />
              </div>

              <Reveal direction={isRight ? "right" : "left"} delay={(i % 5) + 1}>
                <div className="pl-8 sm:grid sm:grid-cols-2 sm:gap-16 sm:pl-0">
                  {isRight ? (
                    <>
                      <div className="hidden sm:block" />
                      <div className="relative z-10 sm:pl-8">
                        <div className="glass-card rounded-2xl p-6">
                          <Card item={item} compact={compact} align="left" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative z-10 sm:pr-8">
                        <div className="glass-card rounded-2xl p-6">
                          <Card
                            item={item}
                            compact={compact}
                            align={compact ? "left" : "right"}
                          />
                        </div>
                      </div>
                      <div className="hidden sm:block" />
                    </>
                  )}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
