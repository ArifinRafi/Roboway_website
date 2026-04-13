"use client";

export default function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <h2 className="text-3xl font-bold gradient-text sm:text-4xl">{title}</h2>
      <div
        className={`mt-3 h-[2px] w-16 animate-pulse-glow rounded-full bg-[#2563eb] ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p className={`mt-4 max-w-3xl text-sm leading-relaxed text-[#a0aec0] ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
