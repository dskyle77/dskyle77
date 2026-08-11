"use client";

import { useEffect, useRef } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
};

/**
 * Lightweight reveal using CSS transitions + IntersectionObserver.
 * Avoids motion/react (framer) to keep the client bundle small and
 * paints cheap (transform + opacity only).
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Map delay index (1,2,3...) to the existing CSS delay classes
  const delayClass =
    delay >= 1 && delay <= 5 ? `reveal-delay-${Math.min(5, Math.round(delay))}` : "";

  // Direction-specific initial transforms via data attribute (kept simple;
  // primary motion is still the shared .reveal translateY for consistency)
  const dirClass =
    direction === "left"
      ? "reveal-left"
      : direction === "right"
        ? "reveal-right"
        : direction === "scale"
          ? "reveal-scale"
          : direction === "fade"
            ? "reveal-fade"
            : "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible (e.g. SSR + reduced motion handled by CSS)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${delayClass} ${dirClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}
