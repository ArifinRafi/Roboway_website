"use client";

export default function TracingBorder({
  color = "#2563eb",
  duration = 2,
  thickness = 1,
  className = "",
  active = false,
}: {
  color?: string;
  duration?: number;
  thickness?: number;
  className?: string;
  active?: boolean;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x={thickness / 2}
          y={thickness / 2}
          width="calc(100% - 1px)"
          height="calc(100% - 1px)"
          rx="16"
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeOpacity={active ? 0.6 : 0}
          strokeDasharray="1000"
          strokeDashoffset={active ? "0" : "1000"}
          style={{
            transition: `stroke-dashoffset ${duration}s ease-in-out, stroke-opacity 0.3s`,
          }}
        />
      </svg>
    </div>
  );
}
