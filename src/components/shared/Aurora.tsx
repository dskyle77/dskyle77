type AuroraProps = {
  intensity?: number;
  className?: string;
};

/**
 * Soft ambient glow. Uses a static CSS blur (GPU-friendly) and only
 * animates transform/opacity via the classes in globals.css.
 */
export default function Aurora({
  intensity = 0.05,
  className = "",
}: AuroraProps) {
  const opacity = Math.max(0, Math.min(1, intensity));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute h-80 w-80 rounded-full bg-blue-500 blur-[100px] ${className}`}
      style={{ opacity }}
    />
  );
}
