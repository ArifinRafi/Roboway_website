export default function AnimatedBackground({ variant = "section" }: { variant?: "hero" | "section" | "cta" }) {
  const gradients: Record<string, string> = {
    hero: "radial-gradient(ellipse at top, rgba(30,58,95,0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(37,99,235,0.06) 0%, transparent 40%)",
    section: "radial-gradient(ellipse at center, rgba(30,58,95,0.06) 0%, transparent 60%)",
    cta: "radial-gradient(ellipse at bottom, rgba(37,99,235,0.08) 0%, transparent 50%), radial-gradient(ellipse at top left, rgba(30,58,95,0.05) 0%, transparent 40%)",
  };
  return <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: gradients[variant] }} />;
}
