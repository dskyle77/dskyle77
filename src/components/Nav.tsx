import Link from "next/link";
import { site } from "@/lib/site";

export default function Nav() {
  return (
    <header className="border-b border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-wide text-paper hover:text-signal transition-colors"
        >
          {site.handle}
        </Link>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-paper-dim">
          <Link href="/projects" className="hover:text-signal transition-colors">
            Projects
          </Link>
          <Link href="/about" className="hover:text-signal transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-signal transition-colors">
            Contact
          </Link>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-signal transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
