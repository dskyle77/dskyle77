/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-hairline bg-ink/95 transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "nav-scrolled" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between relative z-50 bg-ink/95">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-mono text-sm tracking-wide text-paper hover:text-signal transition-colors"
        >
          {site.handle}
        </Link>

        {/* Desktop */}
        <nav className="hidden sm:flex items-center gap-7 font-mono text-xs uppercase tracking-wider text-paper-dim">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${isActive(l.href) ? "is-active" : "hover:text-signal"}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link hover:text-signal"
          >
            GitHub
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex sm:hidden flex-col justify-center items-center w-8 h-8 gap-1.25 focus:outline-none"
        >
          <span
            className={`block h-[1.5px] w-5 bg-paper origin-center transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-paper transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-paper origin-center transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-[-6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`sm:hidden overflow-hidden border-b border-hairline bg-ink transition-[max-height,opacity] duration-300 ease-out ${
          isOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4 font-mono text-xs uppercase tracking-wider text-paper-dim">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className={`py-2.5 transition-colors ${
                isActive(l.href) ? "text-signal" : "hover:text-signal"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="py-2.5 hover:text-signal transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
