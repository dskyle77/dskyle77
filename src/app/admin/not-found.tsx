import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="mx-auto max-w-lg py-20 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-ink-soft text-paper-dim">
        <FileQuestion className="h-6 w-6" />
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-signal">
        404
      </p>
      <h1 className="mt-2 font-display text-2xl text-paper">
        Admin page not found
      </h1>
      <p className="mt-2 text-sm text-paper-dim">
        That admin route doesn&apos;t exist.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 rounded-lg border border-signal/40 bg-signal/10 px-4 py-2 font-mono text-xs text-signal hover:bg-signal/20"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Blog admin
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-hairline px-4 py-2 font-mono text-xs text-paper-dim hover:text-paper"
        >
          Public site
        </Link>
      </div>
    </div>
  );
}
