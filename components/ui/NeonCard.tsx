"use client";

import { type ReactNode, useState } from "react";
import HudCorners from "./HudCorners";

type NeonCardProps = {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
  hud?: boolean;
};

export default function NeonCard({
  children,
  className = "",
  hoverGlow = true,
  hud = false,
}: NeonCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`
        relative rounded-2xl border border-white/[0.08] backdrop-blur-md transition-all duration-300
        bg-[#0a0a0a]/80
        ${hoverGlow ? "hover:border-[#2563eb]/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.08)] hover:-translate-y-0.5" : ""}
        ${className}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hud && <HudCorners color={hovered ? "rgba(96, 165, 250, 0.5)" : "rgba(96, 165, 250, 0.2)"} />}
      {children}
    </div>
  );
}
