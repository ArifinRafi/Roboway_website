import Link from "next/link";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ArcReactor from "@/components/ui/ArcReactor";
import HudCorners from "@/components/ui/HudCorners";

export default function Join() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#0a0a0a] via-black to-[#0a0a0a] p-10">
        <AnimatedBackground variant="cta" />
        <HudCorners color="rgba(96, 165, 250, 0.25)" size={30} />

        {/* Arc reactor background */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2">
          <ArcReactor size={250} opacity={0.06} />
        </div>

        <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-2xl font-bold gradient-text">Join Our Mission</h3>
            <p className="mt-3 max-w-2xl text-[#a0aec0]">
              We collaborate with researchers, engineers, and learners. Reach out for
              partnerships, internships, and open roles.
            </p>
          </div>
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-6 py-3 font-mono text-[11px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
            <span className="relative">Get in Touch</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
