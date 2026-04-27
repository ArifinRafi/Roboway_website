"use client";

import Image from "next/image";

const CLIENT_LOGOS = [
  { src: "/images/client1.png", alt: "Client 1" },
  { src: "/images/client2.png", alt: "Client 2" },
  { src: "/images/client3.png", alt: "Client 3" },
  { src: "/images/client4.svg.png", alt: "Client 4" },
  { src: "/images/client5.png", alt: "Client 5" },
  { src: "/images/client6.png", alt: "Client 6" },
];

// Duplicate twice for seamless infinite loop
const TRACK = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

export default function Clients() {
  return (
    <section id="clients" className="mx-auto max-w-7xl px-6 py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/50 bg-[#1e3a5f]/10 px-4 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
          <span className="text-[11px] font-mono text-[#60a5fa] tracking-widest">TRUSTED BY INDUSTRY LEADERS</span>
        </div>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Our <span className="gradient-text">Clients</span>
        </h2>
        <p className="mt-3 text-sm text-[#a0aec0] max-w-xl mx-auto">
          Proudly partnering with government agencies, leading enterprises, and innovative organizations across Bangladesh and beyond.
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10"
          style={{ background: "linear-gradient(90deg, #010409 0%, transparent 100%)" }} />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10"
          style={{ background: "linear-gradient(270deg, #010409 0%, transparent 100%)" }} />

        <div className="flex gap-10 items-center" style={{ animation: "marquee 30s linear infinite" }}>
          {TRACK.map((logo, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm px-8 py-5 w-44 h-24 transition-all duration-300 hover:border-[#2563eb]/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(37,99,235,0.08)] group"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={56}
                className="object-contain max-h-14 w-auto opacity-90 transition-all duration-300 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * (176px + 40px) * ${CLIENT_LOGOS.length})); }
        }
      `}</style>
    </section>
  );
}
