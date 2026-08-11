"use client";

import { site } from "@/lib/site";
import Reveal from "./shared/Reveal";
import Aurora from "./shared/Aurora";

export default function Skills() {
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20">
      <Aurora intensity={0.3} className="top-0 left-0" />
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-signal">
          Stack
        </p>

        <h2 className="mb-12 font-display text-2xl leading-tight text-paper sm:text-3xl">
          What I build with
        </h2>
      </Reveal>

      <div className="grid gap-12 sm:grid-cols-2">
        {Object.entries(site.stack).map(([category, skills], catIndex) => (
          <Reveal key={category} delay={(catIndex + 1) as 1 | 2}>
            <div>
              {/* Category header */}
              <div className="mb-5 flex items-center gap-3">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-paper-dim">
                  {category}
                </h3>

                <span className="h-px flex-1 bg-white/8" />
              </div>

              {/* Skills */}
              <div className="grid grid-cols-2 gap-2.5">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative rounded-md border border-white/8 bg-ink-raised px-4 py-3.5 transition-all duration-200 hover:border-signal/40 hover:bg-white/2.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal/60 transition-colors group-hover:bg-signal" />

                      <span className="font-mono text-sm text-paper">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Bottom note */}
      <Reveal delay={3}>
        <div className="mt-12 border-t border-white/8 pt-5">
          <p className="max-w-2xl font-mono text-xs leading-6 text-paper-dim">
            I care less about collecting technologies and more about knowing how
            to use the right ones to ship something that works.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
