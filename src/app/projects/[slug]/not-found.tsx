import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BackgroundGrid from "@/components/shared/BackgroundGrid";

export default function ProjectNotFound() {
  return (
    <div className="relative min-h-[70vh]">
      <BackgroundGrid size={{ x: "32px", y: "32px" }} />
      <section className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl text-paper sm:text-4xl">
          Project not found
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-paper-dim sm:text-base">
          That project isn&apos;t in the portfolio. It may have been renamed or
          removed.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2.5 font-mono text-xs text-signal hover:bg-signal/20 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All projects
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-hairline px-4 py-2.5 font-mono text-xs text-paper-dim hover:text-paper transition-colors"
          >
            Home
          </Link>
        </div>
      </section>
    </div>
  );
}
