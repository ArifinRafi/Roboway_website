"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Users, ChevronRight } from "lucide-react";

function HudCorners({ size = 16, color = "rgba(96,165,250,0.45)" }: { size?: number; color?: string }) {
  const s = `${size}px`;
  const border = `1.5px solid ${color}`;
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ width: s, height: s, borderTop: border, borderLeft: border }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ width: s, height: s, borderTop: border, borderRight: border }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ width: s, height: s, borderBottom: border, borderLeft: border }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ width: s, height: s, borderBottom: border, borderRight: border }} />
    </>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * end));
          if (p < 1) requestAnimationFrame(step); else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function TeamVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="about-us" className="mx-auto max-w-7xl px-6 py-24">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/50 bg-[#1e3a5f]/10 px-4 py-1.5 mb-4">
          <Users size={12} className="text-[#60a5fa]" />
          <span className="text-[11px] font-mono text-[#60a5fa] tracking-widest">MEET THE TEAM</span>
        </div>
        <h2 className="text-4xl font-bold text-white sm:text-5xl">
          Let&apos;s Know{" "}
          <span className="gradient-text">About Us</span>
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-sm text-[#a0aec0] leading-relaxed">
          We are a passionate team of engineers, designers, and innovators building the next generation
          of robotics and AI systems from Bangladesh — for the world.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">

        {/* Left — stat cards */}
        <div className="lg:col-span-2 space-y-4">
          {[
            { val: 5, suffix: "+", label: "Years of Innovation", sub: "Building intelligent machines since 2019" },
            { val: 20, suffix: "+", label: "Projects Delivered", sub: "Across robotics, AI, and smart systems" },
            { val: 10, suffix: "+", label: "Team Members", sub: "Engineers, researchers, and designers" },
            { val: 8, suffix: "+", label: "Industry Partners", sub: "Government, telecom, and enterprise clients" },
          ].map(({ val, suffix, label, sub }) => (
            <div key={label}
              className="relative flex items-center gap-5 rounded-2xl border border-white/[0.07] bg-[#0a0a0a]/80 backdrop-blur-sm px-5 py-4 group hover:border-[#2563eb]/30 transition-all duration-300 overflow-hidden">
              <HudCorners size={10} color="rgba(96,165,250,0.2)" />
              <div className="shrink-0 text-center min-w-[52px]">
                <div className="text-2xl font-black font-mono text-white leading-none">
                  <CountUp end={val} suffix={suffix} />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-[#4a5568] mt-0.5">{sub}</p>
              </div>
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at left, rgba(37,99,235,0.04), transparent 60%)" }} />
            </div>
          ))}

          <a href="/#about"
            className="inline-flex items-center gap-2 text-sm text-[#60a5fa] hover:text-white transition-colors mt-2 group">
            Learn more about Roboway
            <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Right — YouTube video */}
        <div className="lg:col-span-3">
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden group shadow-[0_0_60px_rgba(37,99,235,0.06)]">
            <HudCorners size={18} color="rgba(37,99,235,0.4)" />

            {!playing ? (
              /* Custom play gate */
              <div
                className="relative aspect-video cursor-pointer"
                onClick={() => setPlaying(true)}
              >
                {/* Gradient placeholder background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#010409] via-[#0a1628] to-[#010409]" />

                {/* Animated grid lines */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(rgba(96,165,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }} />

                {/* Glowing orb behind play button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 rounded-full blur-3xl bg-[#2563eb]/20" />
                </div>

                {/* Scan line */}
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/30 to-transparent"
                  style={{ animation: "hud-scan 7s linear infinite" }} />

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <button
                    onClick={() => setPlaying(true)}
                    className="w-20 h-20 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-110 group-hover:shadow-[0_0_50px_rgba(96,165,250,0.35)]"
                  >
                    <Play size={28} className="text-white ml-1.5" fill="white" />
                  </button>
                  <div className="text-center px-6">
                    <p className="text-white font-semibold text-sm">Roboway Technologies — Team Introduction</p>
                    <p className="text-[#a0aec0] text-xs mt-1.5">
                      Meet the engineers and innovators behind the machines
                    </p>
                  </div>
                </div>

                {/* HUD labels */}
                <div className="absolute top-4 left-4 font-mono text-[9px] text-[#60a5fa]/50 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    TEAM :: ROBOWAY TECHNOLOGIES
                  </div>
                  <div>INTRO VIDEO · 2025</div>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#60a5fa]/40 text-right">
                  <div>CLICK TO PLAY</div>
                </div>
              </div>
            ) : (
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/tGVUP0OIn_g?autoplay=1&rel=0"
                  title="Roboway Technologies — Team Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Bottom bar */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
                <span className="font-mono text-[10px] text-[#a0aec0]">ROBOWAY TECHNOLOGIES</span>
              </div>
              <span className="font-mono text-[10px] text-[#4a5568]">OFFICIAL INTRO · 2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
