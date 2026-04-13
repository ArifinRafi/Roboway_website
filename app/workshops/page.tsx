"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Satellite, Cpu, Zap, Bell, Clock, Radio,
  ChevronRight, Radar, Shield,
} from "lucide-react";

/* ── HUD Corners ──────────────────────────────────────── */
function HudCorners({ color = "rgba(37,99,235,0.35)" }: { color?: string }) {
  const b = `1.5px solid ${color}`;
  const s = "16px";
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ width: s, height: s, borderTop: b, borderLeft: b }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ width: s, height: s, borderTop: b, borderRight: b }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ width: s, height: s, borderBottom: b, borderLeft: b }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ width: s, height: s, borderBottom: b, borderRight: b }} />
    </>
  );
}

/* ── Blinking dot ─────────────────────────────────────── */
function BlinkDot({ color = "#60a5fa" }: { color?: string }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full transition-opacity duration-500"
      style={{ background: color, opacity: on ? 1 : 0.2 }}
    />
  );
}

/* ── Upcoming workshops (placeholder cards) ────────────── */
const UPCOMING = [
  {
    icon: Satellite,
    code: "WS-001",
    title: "CanSat Workshop",
    tag: "Aerospace · Embedded Systems",
    desc: "Build and deploy a real CanSat — 4-day hands-on programme covering satellite subsystems, embedded programming, and live drone deployment.",
  },
  {
    icon: Cpu,
    code: "WS-002",
    title: "Robotics & AI Bootcamp",
    tag: "Robotics · Computer Vision",
    desc: "Intensive workshop on robot design, ROS2, computer vision, and real-time AI inference on edge hardware.",
  },
  {
    icon: Radar,
    code: "WS-003",
    title: "Drone Systems Workshop",
    tag: "UAV · Flight Systems",
    desc: "From frame assembly to PX4 autopilot — a complete hands-on course in autonomous drone design and deployment.",
  },
];

/* ── Readout row ──────────────────────────────────────── */
function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] font-mono text-[#4a5568] tracking-widest">{label}</span>
      <span className="text-[11px] font-mono text-[#60a5fa]/70">{value}</span>
    </div>
  );
}

export default function WorkshopsPage() {
  const [visible, setVisible] = useState(false);
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Animated scan line
  useEffect(() => {
    const id = setInterval(() => setScanPos((v) => (v + 1) % 101), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-dvh bg-[#010409]">
      <Navbar />

      <main className="pt-24 pb-28">
        <div className="mx-auto max-w-6xl px-6">

          {/* ── Top HUD bar ─────────────────────────────────── */}
          <div
            className="flex items-center justify-between mb-12 flex-wrap gap-4"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
          >
            <div className="flex items-center gap-3">
              <BlinkDot />
              <span className="text-[10px] font-mono text-[#4a5568] tracking-widest">ROBOWAY TECHNOLOGIES · WORKSHOP COMMAND</span>
            </div>
            <div className="flex items-center gap-6">
              <Readout label="SYSTEM" value="ONLINE" />
              <Readout label="MODULES" value="3 PENDING" />
              <Readout label="LOCATION" value="DHAKA · BD" />
            </div>
          </div>

          {/* ── Hero ────────────────────────────────────────── */}
          <div
            className="relative text-center mb-20 py-16"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}
          >
            {/* Background grid */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl"
              style={{ backgroundImage: "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            {/* Animated scan line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div
                className="absolute left-0 right-0 h-[1px] transition-none"
                style={{ top: `${scanPos}%`, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.25), transparent)" }}
              />
            </div>

            {/* Radial glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08), transparent 65%)" }} />

            {/* Content */}
            <div className="relative">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 px-4 py-1.5 mb-8">
                <BlinkDot />
                <span className="text-[10px] font-mono text-[#60a5fa] tracking-widest">WORKSHOP PORTAL · INITIALIZING</span>
              </div>

              {/* Big title */}
              <h1 className="text-5xl font-black text-white sm:text-6xl lg:text-7xl tracking-tight mb-4">
                Will Be <span className="gradient-text">Announced</span>
                <br />
                <span className="gradient-text">Soon</span>
              </h1>

              <p className="text-sm text-[#4a5568] max-w-xl mx-auto leading-relaxed mt-4">
                Our upcoming workshop programmes are currently in final preparation.
                Dates, venues, and registration links will go live shortly.
              </p>

              {/* CTA */}
              <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
                <a
                  href="/#contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-6 py-2.5 font-mono text-[11px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
                  <Bell size={12} className="relative" />
                  <span className="relative">Get Notified</span>
                </a>
                <a
                  href="/#contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/[0.12] px-6 py-2.5 font-mono text-[11px] tracking-widest text-[#a0aec0] uppercase transition-all duration-300 hover:border-[#2563eb]/40 hover:text-white hover:bg-[#2563eb]/[0.06] hover:-translate-y-0.5"
                >
                  <span className="relative">Contact Us</span>
                  <ChevronRight size={12} className="relative" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Scan divider ───────────────────────────────── */}
          <div className="relative h-px mb-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60a5fa]/30 to-transparent"
              style={{ animation: "hud-scan 4s linear infinite" }} />
          </div>

          {/* ── Upcoming workshop cards ─────────────────────── */}
          <div
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Clock size={14} className="text-[#2563eb]/60" />
              <span className="text-[10px] font-mono text-[#4a5568] tracking-widest">UPCOMING PROGRAMMES · DETAILS PENDING</span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {UPCOMING.map((w, i) => (
                <div
                  key={w.code}
                  className="relative rounded-2xl border border-white/[0.06] bg-[#0a0a0a]/80 p-6 overflow-hidden group"
                  style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.55s ease ${i * 80 + 400}ms, transform 0.55s ease ${i * 80 + 400}ms` }}
                >
                  <HudCorners color="rgba(37,99,235,0.2)" />

                  {/* Scan lines on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(37,99,235,0.012) 3px, rgba(37,99,235,0.012) 4px)" }} />

                  {/* Status overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 font-mono text-[9px] text-[#4a5568]">
                    <BlinkDot color="rgba(96,165,250,0.4)" />
                    TBA
                  </div>

                  <div className="relative">
                    {/* Code */}
                    <div className="font-mono text-[9px] text-[#2563eb]/50 tracking-widest mb-3">{w.code}</div>

                    {/* Icon */}
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#2563eb]/20 bg-[#2563eb]/10 text-[#60a5fa] mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                      <w.icon size={18} />
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-[#60a5fa] transition-colors duration-200 mb-1">
                      {w.title}
                    </h3>
                    <div className="font-mono text-[9px] text-[#2563eb]/60 tracking-wide mb-3">{w.tag}</div>
                    <p className="text-xs text-[#4a5568] leading-relaxed">{w.desc}</p>

                    {/* Coming soon chip */}
                    <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[9px] font-mono text-[#4a5568]">
                      <Clock size={9} />
                      COMING SOON
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom status bar ──────────────────────────── */}
          <div
            className="mt-20 flex items-center justify-between flex-wrap gap-4 border-t border-white/[0.04] pt-8"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}
          >
            <div className="flex items-center gap-2">
              <Shield size={12} className="text-[#2563eb]/40" />
              <span className="text-[9px] font-mono text-[#4a5568] tracking-widest">ROBOWAY TECHNOLOGIES · ALL RIGHTS RESERVED</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio size={12} className="text-[#2563eb]/40" />
              <span className="text-[9px] font-mono text-[#4a5568] tracking-widest">WORKSHOPS LAUNCHING SOON · STAY TUNED</span>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
