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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-hairline/80 bg-ink/80 backdrop-blur-xl transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "nav-scrolled shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]" : ""
      }`}
    >
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-sm font-semibold tracking-tight text-paper transition-colors hover:text-signal"
        >
          {site.handle}
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "bg-white/[0.06] text-paper"
                  : "text-paper-dim hover:bg-white/[0.04] hover:text-paper"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-full border border-white/10 px-3.5 py-1.5 text-sm font-medium text-paper-dim transition-colors hover:border-signal/40 hover:text-signal"
          >
            GitHub
          </a>
        </nav>

        <button
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 focus:outline-none sm:hidden"
        >
          <span
            className={`block h-[1.5px] w-5 origin-center bg-paper transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-paper transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 origin-center bg-paper transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-[-7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden border-b border-hairline bg-ink/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-out sm:hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-0.5 px-6 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive(l.href)
                  ? "bg-white/[0.06] text-paper"
                  : "text-paper-dim hover:bg-white/[0.04] hover:text-paper"
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
            className="rounded-lg px-3 py-2.5 text-sm font-medium text-paper-dim transition-colors hover:text-signal"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
