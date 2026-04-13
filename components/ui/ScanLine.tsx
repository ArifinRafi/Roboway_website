"use client";

export default function ScanLine({
  speed = 6,
  color = "rgba(96, 165, 250, 0.07)",
  className = "",
}: {
  speed?: number;
  color?: string;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-x-0 h-[30%]"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
          animation: `hud-scan ${speed}s linear infinite`,
        }}
      />
    </div>
  );
}
