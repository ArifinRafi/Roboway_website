"use client";

import { type ReactNode } from "react";

export default function GlowText({
  children,
  color = "#60a5fa",
  intensity = 40,
  className = "",
}: {
  children: ReactNode;
  color?: string;
  intensity?: number;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        textShadow: `0 0 10px ${color}, 0 0 ${intensity}px ${color}40`,
        color,
      }}
    >
      {children}
    </span>
  );
}
