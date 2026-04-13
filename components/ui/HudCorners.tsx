"use client";

export default function HudCorners({
  color = "rgba(96, 165, 250, 0.4)",
  size = 20,
  thickness = 1,
  className = "",
}: {
  color?: string;
  size?: number;
  thickness?: number;
  className?: string;
}) {
  const style = {
    position: "absolute" as const,
    width: size,
    height: size,
    pointerEvents: "none" as const,
  };

  const borderStyle = `${thickness}px solid ${color}`;

  return (
    <div className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
      {/* Top-left */}
      <div style={{ ...style, top: -1, left: -1, borderTop: borderStyle, borderLeft: borderStyle }} />
      {/* Top-right */}
      <div style={{ ...style, top: -1, right: -1, borderTop: borderStyle, borderRight: borderStyle }} />
      {/* Bottom-left */}
      <div style={{ ...style, bottom: -1, left: -1, borderBottom: borderStyle, borderLeft: borderStyle }} />
      {/* Bottom-right */}
      <div style={{ ...style, bottom: -1, right: -1, borderBottom: borderStyle, borderRight: borderStyle }} />
    </div>
  );
}
