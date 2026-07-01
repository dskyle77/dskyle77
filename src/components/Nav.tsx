"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="border-b border-hairline relative bg-ink">
      <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between z-50 relative bg-ink">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-mono text-sm tracking-wide text-paper hover:text-signal transition-colors"
        >
          {site.handle}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-paper-dim">
          <Link
            href="/projects"
            className="hover:text-signal transition-colors"
          >
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

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          className="flex sm:hidden flex-col justify-center items-center w-6 h-6 gap-1.25 focus:outline-none"
        >
          <span
            className={`h-[1.5px] w-5 bg-paper transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 bg-paper transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 bg-paper transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 translate-y-[-6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`absolute top-full left-0 w-full border-b border-hairline bg-ink transition-all duration-300 ease-in-out z-40 sm:hidden overflow-hidden ${
          isOpen
            ? "max-h-64 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <nav className="flex flex-col gap-5 px-6 py-6 font-mono text-xs uppercase tracking-wider text-paper-dim">
          <Link
            href="/projects"
            onClick={closeMenu}
            className="hover:text-signal transition-colors w-full"
          >
            Projects
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="hover:text-signal transition-colors w-full"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="hover:text-signal transition-colors w-full"
          >
            Contact
          </Link>
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="hover:text-signal transition-colors w-full"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
