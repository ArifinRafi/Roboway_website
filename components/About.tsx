"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import CircuitGridBackground from "@/components/ui/CircuitGridBackground";
import TracingBorder from "@/components/ui/TracingBorder";

/* ── Blinking dot ─────────────────────────────────────── */
function BlinkDot({ color = "#60a5fa", ms = 900 }: { color?: string; ms?: number }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), ms);
    return () => clearInterval(id);
  }, [ms]);
  return (
    <span
      className="inline-block rounded-full transition-opacity duration-500"
      style={{ width: 6, height: 6, background: color, opacity: on ? 1 : 0.2 }}
    />
  );
}

/* ── Animated counter ─────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let n = 0;
    const step = Math.max(1, Math.ceil(to / 36));
    const id = setInterval(() => {
      n = Math.min(n + step, to);
      setV(n);
      if (n >= to) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [to]);
  return <>{v}{suffix}</>;
}

export default function About() {
  const [hovered, setHovered] = useState(false);
  const [scanY, setScanY] = useState(0);

  /* Continuous vertical scan line */
  useEffect(() => {
    const id = setInterval(() => setScanY((v) => (v + 0.6) % 100), 20);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-24">
      <CircuitGridBackground />
      <div className="grid items-center gap-12 md:grid-cols-2">

        {/* ── Text ────────────────────────────────────────── */}
        <div>
          <h2 className="text-3xl font-bold gradient-text sm:text-4xl">Who We Are</h2>
          <div className="mt-3 h-[2px] w-16 animate-pulse-glow rounded-full bg-[#2563eb]" />
          <p className="mt-6 text-[#a0aec0] leading-relaxed">
            We are a robotics and AI firm building intelligent systems across
            humanoid platforms, autonomous vehicles, and IoT devices. Our
            mission is to push the boundaries of human–machine collaboration
            through cutting-edge research and real-world deployments.
          </p>
        </div>

        {/* ── Image with HUD overlay ───────────────────────── */}
        <div
          className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/[0.08] transition-all duration-500 hover:border-[#2563eb]/30"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <TracingBorder active={hovered} color="#2563eb" duration={1} />

          {/* Base image */}
          <Image
            src="/images/shark_tank_team.jpg"
            alt="Roboway Technologies Team"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Blue tint */}
          <div className="absolute inset-0 bg-[#1e3a5f] opacity-[0.15]" />

          {/* Scan line grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Moving scan sweep */}
          <div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{
              top: `${scanY}%`,
              background: "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.5) 30%, rgba(96,165,250,0.9) 50%, rgba(37,99,235,0.5) 70%, transparent 100%)",
              boxShadow: "0 0 8px rgba(96,165,250,0.4)",
              transition: "none",
            }}
          />

          {/* CRT scan lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)",
            }}
          />

          {/* ── HUD Corners ─────────────────────────────── */}
          {/* Top-left */}
          <div className="absolute top-3 left-3 pointer-events-none">
            <div className="relative w-8 h-8">
              <span className="absolute top-0 left-0 w-full h-[1.5px] bg-[#60a5fa]" />
              <span className="absolute top-0 left-0 w-[1.5px] h-full bg-[#60a5fa]" />
            </div>
          </div>
          {/* Top-right */}
          <div className="absolute top-3 right-3 pointer-events-none">
            <div className="relative w-8 h-8">
              <span className="absolute top-0 right-0 w-full h-[1.5px] bg-[#60a5fa]" />
              <span className="absolute top-0 right-0 w-[1.5px] h-full bg-[#60a5fa]" />
            </div>
          </div>
          {/* Bottom-left */}
          <div className="absolute bottom-3 left-3 pointer-events-none">
            <div className="relative w-8 h-8">
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#60a5fa]" />
              <span className="absolute bottom-0 left-0 w-[1.5px] h-full bg-[#60a5fa]" />
            </div>
          </div>
          {/* Bottom-right */}
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <div className="relative w-8 h-8">
              <span className="absolute bottom-0 right-0 w-full h-[1.5px] bg-[#60a5fa]" />
              <span className="absolute bottom-0 right-0 w-[1.5px] h-full bg-[#60a5fa]" />
            </div>
          </div>

          {/* ── Top HUD bar ─────────────────────────────── */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 pt-4 pb-2 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(1,4,9,0.7), transparent)" }}>
            <div className="flex items-center gap-2">
              <BlinkDot color="#60a5fa" ms={800} />
              <span className="font-mono text-[9px] text-[#60a5fa]/70 tracking-widest">SYS::ACTIVE</span>
            </div>
            <span className="font-mono text-[9px] text-[#60a5fa]/50 tracking-widest">ROBOWAY · BD</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-[#60a5fa]/50 tracking-widest">LAT 23.81 // LNG 90.41</span>
              <BlinkDot color="#2563eb" ms={1200} />
            </div>
          </div>

          {/* ── Crosshair center ────────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="relative w-16 h-16">
              {/* Horizontal line */}
              <span className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#60a5fa]/40" />
              {/* Vertical line */}
              <span className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#60a5fa]/40" />
              {/* Center dot */}
              <span className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#60a5fa]/60" />
            </div>
          </div>

          {/* ── Side readout (right) ─────────────────────── */}
          <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {[
              { label: "TEAM", val: "20+", unit: "MBRS" },
              { label: "PROJ", val: "8+",  unit: "DONE" },
              { label: "YRS",  val: "5+",  unit: "EXP"  },
            ].map((r) => (
              <div key={r.label} className="text-right">
                <div className="font-mono text-[8px] text-[#4a5568] tracking-widest">{r.label}</div>
                <div className="font-mono text-[13px] font-bold text-[#60a5fa] leading-none">{r.val}</div>
                <div className="font-mono text-[7px] text-[#2563eb]/60 tracking-widest">{r.unit}</div>
              </div>
            ))}
          </div>

          {/* ── Bottom HUD bar ───────────────────────────── */}
          <div
            className="absolute bottom-0 left-0 right-0 px-5 pt-2 pb-4 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(1,4,9,0.85), transparent)" }}
          >
            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-[8px] text-[#4a5568] tracking-widest">SYSTEM LOAD</span>
              <div className="flex-1 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "72%",
                    background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
                    boxShadow: "0 0 6px rgba(96,165,250,0.5)",
                  }}
                />
              </div>
              <span className="font-mono text-[8px] text-[#60a5fa]/60">72%</span>
            </div>

            {/* Stats row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {[
                  { k: "PROJECTS", v: "20+" },
                  { k: "CLIENTS",  v: "8+"  },
                  { k: "PRODUCTS", v: "5+"  },
                ].map((s) => (
                  <div key={s.k} className="flex flex-col">
                    <span className="font-mono text-[7px] text-[#4a5568] tracking-widest">{s.k}</span>
                    <span className="font-mono text-[11px] font-bold text-[#60a5fa]/80">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <BlinkDot color="#60a5fa" ms={700} />
                <span className="font-mono text-[8px] text-[#60a5fa]/50 tracking-widest">ONLINE</span>
              </div>
            </div>
          </div>

          {/* ── Vignette ────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{
              boxShadow: "inset 0 0 40px rgba(1,4,9,0.5)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
