"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { team as fallbackTeam } from "@/data/team";

type TeamMember = typeof fallbackTeam[number];

function BlinkDot({ on }: { on: boolean }) {
  return (
    <span
      className="inline-block w-[5px] h-[5px] rounded-full bg-[#60a5fa] transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0.15 }}
    />
  );
}

function MemberCard({ m, index, tick }: { m: TeamMember; index: number; tick: boolean }) {
  const code = `CREW-${String(index + 1).padStart(3, "0")}`;

  return (
    <Link href={`/team/${m.slug}`} className="block h-full group">
      <div className="relative h-full rounded-2xl border border-white/[0.07] bg-[#040810]/90 overflow-hidden transition-all duration-300 hover:border-[#2563eb]/40 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(37,99,235,0.12)]">

        {/* HUD corner brackets */}
        <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none transition-all duration-300" style={{ borderTop: "1.5px solid rgba(96,165,250,0.25)", borderLeft: "1.5px solid rgba(96,165,250,0.25)" }} />
        <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none transition-all duration-300" style={{ borderTop: "1.5px solid rgba(96,165,250,0.25)", borderRight: "1.5px solid rgba(96,165,250,0.25)" }} />
        <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none transition-all duration-300" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.25)", borderLeft: "1.5px solid rgba(96,165,250,0.25)" }} />
        <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none transition-all duration-300" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.25)", borderRight: "1.5px solid rgba(96,165,250,0.25)" }} />

        {/* Hover corners — brighter */}
        <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderTop: "1.5px solid rgba(96,165,250,0.7)", borderLeft: "1.5px solid rgba(96,165,250,0.7)" }} />
        <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderTop: "1.5px solid rgba(96,165,250,0.7)", borderRight: "1.5px solid rgba(96,165,250,0.7)" }} />
        <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.7)", borderLeft: "1.5px solid rgba(96,165,250,0.7)" }} />
        <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.7)", borderRight: "1.5px solid rgba(96,165,250,0.7)" }} />

        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02] group-hover:opacity-[0.035] transition-opacity duration-300"
          style={{
            backgroundImage: "linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Sweep line on hover */}
        <div
          className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            top: "35%",
            background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.35), transparent)",
            animation: "hudSweep 2.5s linear infinite",
          }}
        />

        {/* Top HUD bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]" style={{ background: "rgba(37,99,235,0.03)" }}>
          <div className="flex items-center gap-1.5">
            <BlinkDot on={tick} />
            <span className="font-mono text-[8px] text-[#4a5568] tracking-widest">PERSONNEL</span>
          </div>
          <span className="font-mono text-[8px] text-[#2563eb]/35 tracking-widest">{code}</span>
        </div>

        <div className="p-5">
          {/* Profile row */}
          <div className="flex items-start gap-4 mb-4">
            {/* Avatar with HUD overlay */}
            <div className="relative flex-shrink-0">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a12] group-hover:border-[#2563eb]/40 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]">
                <Image
                  src={m.image || "/images/logo.png"}
                  alt={m.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Blue tint on hover */}
                <div className="absolute inset-0 bg-[#030d1f]/0 group-hover:bg-[#030d1f]/20 transition-colors duration-300" />
                {/* Crosshair on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="relative w-6 h-6">
                    <span className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#60a5fa]/40" />
                    <span className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#60a5fa]/40" />
                    <span className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#60a5fa]/50" />
                  </div>
                </div>
              </div>
              {/* Active indicator */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#040810] bg-emerald-500/80" />
            </div>

            {/* Name + title */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-white group-hover:text-[#60a5fa] transition-colors duration-200 leading-tight">
                {m.name}
              </h3>
              <p className="mt-0.5 font-mono text-[9px] text-[#4a5568] tracking-wide leading-relaxed line-clamp-2">
                {m.title}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-3 bg-gradient-to-r from-[#2563eb]/15 via-[#2563eb]/08 to-transparent group-hover:from-[#2563eb]/35 transition-all duration-300" />

          {/* Summary */}
          {m.summary && (
            <p className="text-xs text-[#a0aec0] leading-relaxed mb-4 line-clamp-2">
              {m.summary}
            </p>
          )}

          {/* Expertise tags */}
          {m.expertise && m.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {m.expertise.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded px-2 py-0.5 font-mono text-[8px] text-[#60a5fa]/60 border border-[#1e3a5f]/40 bg-[#1e3a5f]/10 tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom row: socials + status */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.04]">
            <div className="flex items-center gap-2.5">
              {m.socials?.linkedin && (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); window.open(m.socials!.linkedin!, "_blank", "noopener,noreferrer"); }}
                  aria-label="LinkedIn"
                  className="w-6 h-6 flex items-center justify-center rounded border border-white/[0.07] bg-white/[0.03] text-[#4a5568] hover:text-[#60a5fa] hover:border-[#2563eb]/40 hover:bg-[#2563eb]/10 transition-all duration-200"
                >
                  <FaLinkedin size={10} />
                </button>
              )}
              {m.socials?.github && (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); window.open(m.socials!.github!, "_blank", "noopener,noreferrer"); }}
                  aria-label="GitHub"
                  className="w-6 h-6 flex items-center justify-center rounded border border-white/[0.07] bg-white/[0.03] text-[#4a5568] hover:text-[#60a5fa] hover:border-[#2563eb]/40 hover:bg-[#2563eb]/10 transition-all duration-200"
                >
                  <FaGithub size={10} />
                </button>
              )}
              {m.socials?.twitter && (
                <button
                  onClick={(e) => { e.stopPropagation(); e.preventDefault(); window.open(m.socials!.twitter!, "_blank", "noopener,noreferrer"); }}
                  aria-label="Twitter/X"
                  className="w-6 h-6 flex items-center justify-center rounded border border-white/[0.07] bg-white/[0.03] text-[#4a5568] hover:text-[#60a5fa] hover:border-[#2563eb]/40 hover:bg-[#2563eb]/10 transition-all duration-200"
                >
                  <FaXTwitter size={10} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1">
              <BlinkDot on={!tick} />
              <span className="font-mono text-[7px] text-[#60a5fa]/30 tracking-widest">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TeamSection() {
  const [items, setItems] = useState<TeamMember[]>(fallbackTeam);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const blink = setInterval(() => setTick((v) => !v), 1000);
    const load = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        if (res.ok && Array.isArray(data.team) && data.team.length > 0) setItems(data.team);
      } catch { /* fallback */ }
    };
    load();
    return () => clearInterval(blink);
  }, []);

  return (
    <section id="team" className="relative mx-auto max-w-7xl px-6 py-24">

      {/* ── Section header ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/50 bg-[#1e3a5f]/10 px-4 py-1.5 mb-5">
          <BlinkDot on={tick} />
          <span className="font-mono text-[11px] text-[#60a5fa] tracking-widest">PERSONNEL ROSTER</span>
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
            Team
          </span>
        </h2>
        <p className="mt-4 mx-auto max-w-md text-sm text-[#a0aec0] leading-relaxed">
          A small, ambitious crew of builders pushing robotics and AI forward.
        </p>

        {/* Stats row */}
        <div className="mt-7 flex items-center justify-center gap-8 flex-wrap">
          {[
            { val: "10+",             label: "MEMBERS" },
            { val: "3+",             label: "DOMAINS"  },
            { val: "ACTIVE",         label: "STATUS"   },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="font-mono text-lg font-black text-white">{val}</div>
              <div className="font-mono text-[8px] text-[#4a5568] tracking-widest mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Scan-line divider */}
        <div className="relative h-px mt-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60a5fa]/40 to-transparent" style={{ animation: "hud-scan 3.5s linear infinite" }} />
        </div>
      </motion.div>

      {/* ── Grid ───────────────────────────────────── */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <motion.div
            key={m.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MemberCard m={m} index={i} tick={tick} />
          </motion.div>
        ))}
      </div>

      {/* ── Bottom readout ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 flex items-center justify-center gap-6 flex-wrap"
      >
        {[
          { k: "TEAM SIZE",   v: "10+ ACTIVE"                },
          { k: "BASE",        v: "DHAKA · BD"                },
          { k: "UNIT",        v: "ROBOWAY MARK II"           },
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
