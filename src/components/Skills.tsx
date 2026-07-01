import { site } from "@/lib/site";

export default function Skills() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-widest text-signal mb-3">
        Stack
      </p>
      <h2 className="font-mono font-bold text-2xl sm:text-3xl text-paper mb-10">
        Technologies I work with
      </h2>

      <div className="grid gap-10 sm:grid-cols-2">
        {Object.entries(site.stack).map(([category, skills]) => (
          <div key={category}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-paper-dim mb-4">
              {category}
            </h3>
            <ul className="space-y-3">
              {skills.map((skill) => (
                <li key={skill.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm text-paper">
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs text-signal">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-hairline overflow-hidden">
                    <div
                      className="h-full rounded-full bg-signal"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
