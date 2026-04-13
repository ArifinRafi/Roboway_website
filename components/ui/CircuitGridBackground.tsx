export default function CircuitGridBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.03] ${className}`}
      style={{
        backgroundImage: `linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        animation: "grid-scroll 20s linear infinite",
      }}
    />
  );
}
