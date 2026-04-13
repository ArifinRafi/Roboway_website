"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { services } from "@/data/services";

/* ── Blinking dot ──────────────────────────────── */
function BlinkDot({ on }: { on: boolean }) {
  return (
    <span
      className="inline-block w-[5px] h-[5px] rounded-full bg-[#60a5fa] transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0.15 }}
    />
  );
}

/* ── Stat row ──────────────────────────────────── */
function StatRow({ label, value, bar }: { label: string; value: string; bar: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[7px] text-[#4a5568] tracking-widest w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 h-[1.5px] bg-white/[0.05] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${bar}%`,
            background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
            boxShadow: "0 0 4px rgba(96,165,250,0.5)",
          }}
        />
      </div>
      <span className="font-mono text-[7px] text-[#60a5fa]/50 w-6 text-right">{bar}%</span>
    </div>
  );
}

const cardMeta = [
  { code: "SVC-001", stats: [{ label: "EFFICIENCY", bar: 94 }, { label: "PRECISION", bar: 88 }, { label: "UPTIME", bar: 99 }] },
  { code: "SVC-002", stats: [{ label: "ACCURACY", bar: 97 }, { label: "SPEED",    bar: 91 }, { label: "SCALE",   bar: 85 }] },
  { code: "SVC-003", stats: [{ label: "LATENCY",  bar: 96 }, { label: "COVERAGE", bar: 80 }, { label: "SYNC",    bar: 92 }] },
  { code: "SVC-004", stats: [{ label: "RANGE",    bar: 90 }, { label: "ALTITUDE", bar: 83 }, { label: "PAYLOAD", bar: 78 }] },
];

export default function Services() {
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick((v) => !v), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-24">

      {/* ── Section header ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/50 bg-[#1e3a5f]/10 px-4 py-1.5 mb-5">
          <BlinkDot on={tick} />
          <span className="text-[11px] font-mono text-[#60a5fa] tracking-widest">CAPABILITY MATRIX</span>
        </div>

        <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl tracking-tight">
          Our{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Expertise
          </span>
        </h2>
        <p className="mt-4 mx-auto max-w-xl text-sm text-[#a0aec0] leading-relaxed">
          Cutting-edge research combined with practical applications to deliver transformative
          solutions across diverse industries.
        </p>

        {/* Scan-line divider */}
        <div className="relative h-px mt-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60a5fa]/50 to-transparent"
            style={{ animation: "hud-scan 3s linear infinite" }}
          />
        </div>
      </motion.div>

      {/* ── Cards grid ──────────────────────────────── */}
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s, i) => {
          const Icon = (Icons as any)[s.icon] ?? Icons.Cpu;
          const meta = cardMeta[i] ?? cardMeta[0];

          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="group relative rounded-2xl border border-white/[0.07] bg-[#0a0a0a]/80 overflow-hidden transition-all duration-300 hover:border-[#2563eb]/40 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(37,99,235,0.12)]">

                {/* HUD corner brackets */}
                <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none" style={{ borderTop: "1.5px solid rgba(96,165,250,0.3)", borderLeft: "1.5px solid rgba(96,165,250,0.3)" }} />
                <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none" style={{ borderTop: "1.5px solid rgba(96,165,250,0.3)", borderRight: "1.5px solid rgba(96,165,250,0.3)" }} />
                <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.3)", borderLeft: "1.5px solid rgba(96,165,250,0.3)" }} />
                <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.3)", borderRight: "1.5px solid rgba(96,165,250,0.3)" }} />

                {/* Hover corner brackets — brighter */}
                <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderTop: "1.5px solid rgba(96,165,250,0.7)", borderLeft: "1.5px solid rgba(96,165,250,0.7)" }} />
                <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderTop: "1.5px solid rgba(96,165,250,0.7)", borderRight: "1.5px solid rgba(96,165,250,0.7)" }} />
                <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.7)", borderLeft: "1.5px solid rgba(96,165,250,0.7)" }} />
                <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.7)", borderRight: "1.5px solid rgba(96,165,250,0.7)" }} />

                {/* Sweep line on hover */}
                <div
                  className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    top: "50%",
                    background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.4), transparent)",
                    animation: "hudSweep 2.5s linear infinite",
                  }}
                />

                {/* Subtle grid background */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.025] group-hover:opacity-[0.04] transition-opacity duration-300"
                  style={{
                    backgroundImage: "linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom, transparent, #2563eb, transparent)" }}
                />

                <div className="relative p-6">
                  {/* Top row: icon + code */}
                  <div className="flex items-start justify-between mb-5">
                    {/* Icon block */}
                    <div className="relative">
                      {/* Outer ring */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ boxShadow: "0 0 16px rgba(37,99,235,0.3)", border: "1px solid rgba(37,99,235,0.3)" }}
                      />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a5f]/20 text-[#60a5fa] border border-[#1e3a5f]/30 transition-all duration-300 group-hover:bg-[#1e3a5f]/30">
                        <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      {/* Ping on hover */}
                      <span className="absolute inset-0 rounded-xl bg-[#2563eb]/10 opacity-0 group-hover:animate-ping" />
                    </div>

                    {/* Code + status */}
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-[8px] text-[#2563eb]/40 tracking-widest">{meta.code}</span>
                      <div className="flex items-center gap-1.5">
                        <BlinkDot on={tick} />
                        <span className="font-mono text-[7px] text-[#60a5fa]/40 tracking-widest">ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-[#60a5fa] transition-colors duration-200 mb-1">
                    {s.title}
                  </h3>

                  {/* Divider */}
                  <div className="h-px mb-3 bg-gradient-to-r from-[#2563eb]/20 via-[#2563eb]/10 to-transparent group-hover:from-[#2563eb]/40 transition-all duration-300" />

                  {/* Description */}
                  <p className="text-sm text-[#a0aec0] leading-relaxed mb-5">
                    {s.description}
                  </p>

                  {/* Stats bars */}
                  <div className="space-y-2">
                    {meta.stats.map((st) => (
                      <StatRow key={st.label} label={st.label} value="" bar={st.bar} />
                    ))}
                  </div>

                  {/* Bottom bar */}
                  <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="font-mono text-[7px] text-[#4a5568] tracking-widest">ROBOWAY TECH</span>
                    <div className="flex items-center gap-1">
                      <BlinkDot on={!tick} />
                      <span className="font-mono text-[7px] text-[#60a5fa]/30 tracking-widest">ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Bottom system readout ────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 flex items-center justify-center gap-6 flex-wrap"
      >
        {[
          { k: "ACTIVE MODULES", v: services.length.toString() },
          { k: "SYSTEM STATUS",  v: "ONLINE"  },
          { k: "VERSION",        v: "MARK II" },
        ].map(({ k, v }) => (
          <div key={k} className="flex items-center gap-2">
            <span className="font-mono text-[8px] text-[#4a5568] tracking-widest">{k}</span>
            <span className="font-mono text-[8px] text-[#2563eb]/50">·</span>
            <span className="font-mono text-[8px] text-[#60a5fa]/60 tracking-widest">{v}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
