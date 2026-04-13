"use client";

export default function ArcReactor({
  size = 300,
  opacity = 0.08,
  className = "",
}: {
  size?: number;
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size, opacity }}
    >
      {/* Core glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(96,165,250,0.6) 0%, rgba(37,99,235,0.2) 40%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: size * 0.3,
          height: size * 0.3,
        }}
      />
      {/* Ring 1 - slow */}
      <div
        className="absolute inset-0 rounded-full border border-[#2563eb]/30"
        style={{
          animation: "arc-spin-1 12s linear infinite",
          width: size * 0.5,
          height: size * 0.5,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderTopColor: "rgba(96, 165, 250, 0.6)",
          borderRightColor: "transparent",
        }}
      />
      {/* Ring 2 - medium */}
      <div
        className="absolute inset-0 rounded-full border border-[#1e3a5f]/20"
        style={{
          animation: "arc-spin-2 8s linear infinite reverse",
          width: size * 0.7,
          height: size * 0.7,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderTopColor: "rgba(37, 99, 235, 0.4)",
          borderLeftColor: "transparent",
          borderRightColor: "transparent",
        }}
      />
      {/* Ring 3 - fast outer */}
      <div
        className="absolute inset-0 rounded-full border border-[#1e3a5f]/10"
        style={{
          animation: "arc-spin-1 20s linear infinite",
          width: size * 0.9,
          height: size * 0.9,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          borderBottomColor: "rgba(96, 165, 250, 0.2)",
          borderLeftColor: "transparent",
        }}
      />
    </div>
  );
}
