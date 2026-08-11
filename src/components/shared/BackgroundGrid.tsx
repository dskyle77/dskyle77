export default function BackgroundGrid({
  size,
}: {
  size?: {
    x: string;
    y: string;
  };
}) {
  return (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 opacity-[0.035] `}
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: `${size?.x ?? "48px"} ${size?.y ?? "48px"}`,
        }}
      />
  );
}
