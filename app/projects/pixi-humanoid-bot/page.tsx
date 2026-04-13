"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequest from "@/components/QuoteRequest";
import {
  UserRound, Eye, Route, Sparkles, Boxes, Building2,
  HeartPulse, Factory, GraduationCap, Store,
  ChevronRight, Cpu, Radio, Check, ArrowRight,
} from "lucide-react";

/* ─── Primitives ──────────────────────────────── */
function HudCorners({ size = 16, color = "rgba(96,165,250,0.45)" }: { size?: number; color?: string }) {
  const s = `${size}px`, b = `1.5px solid ${color}`;
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ width: s, height: s, borderTop: b, borderLeft: b }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ width: s, height: s, borderTop: b, borderRight: b }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ width: s, height: s, borderBottom: b, borderLeft: b }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ width: s, height: s, borderBottom: b, borderRight: b }} />
    </>
  );
}

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / 1800, 1);
          setN(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(step); else setN(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── Images ──────────────────────────────────── */
const IMAGES = [
  { src: "/images/pixi1.jpg",         label: "Pixi — Full View",          tag: "PROFILE" },
  { src: "/images/pixiv1.jpg",        label: "Pixi — Side Profile",       tag: "DESIGN" },
  { src: "/images/pixi_handshake.jpg",label: "Human-Robot Handshake",     tag: "INTERACTION" },
  { src: "/images/pixi_hand.jpg",     label: "Dexterous Hand Detail",     tag: "HARDWARE" },
  { src: "/images/pixi_control.jpg",  label: "Control Interface",         tag: "SOFTWARE" },
];

const ICON_MAP: Record<string, React.ElementType> = {
  UserRound, Eye, Route, Sparkles, Boxes, Building2,
  HeartPulse, Factory, GraduationCap, Store,
};

export default function PixiPage() {
  const [activeImg, setActiveImg] = useState(0);

  // Auto-cycle hero image
  useEffect(() => {
    const id = setInterval(() => setActiveImg(p => (p + 1) % IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-dvh bg-[#010409] text-white overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO — split layout
      ═══════════════════════════════════════════ */}
      <section className="relative isolate min-h-screen flex items-center overflow-hidden pt-20">
        {/* Full bleed bg image (current active) */}
        <div className="absolute inset-0 -z-10">
          {IMAGES.map((img, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === activeImg ? 1 : 0 }}>
              <Image src={img.src} alt={img.label} fill className="object-cover object-top" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#010409] via-[#010409]/85 to-[#010409]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-transparent to-[#010409]/30" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 40%, rgba(37,99,235,0.10), transparent 55%)" }} />
        </div>

        {/* Scan line */}
        <div className="absolute inset-x-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.4),transparent)", animation: "hud-scan 8s linear infinite" }} />

        {/* HUD readout */}
        <div className="absolute top-28 right-6 md:right-12 font-mono text-[10px] text-[#60a5fa]/40 space-y-1 text-right pointer-events-none hidden md:block">
          <div className="text-[#60a5fa]/60">SYS :: ONLINE</div>
          <div>MOTION :: 24-DOF</div>
          <div>VISION :: ACTIVE</div>
          <div>SPEECH :: READY</div>
          <div>PIXI v1.0</div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 w-full py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 backdrop-blur-sm px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
              <span className="text-[11px] font-mono text-[#60a5fa] tracking-widest">NEXT-GEN HUMANOID ROBOT</span>
            </div>

            <h1 className="text-7xl font-black sm:text-9xl tracking-tight leading-none">
              <span className="block text-white">PIXI</span>
              <span className="block gradient-text text-4xl sm:text-5xl font-bold tracking-wide mt-2">
                Humanoid Bot
              </span>
            </h1>

            <p className="mt-5 text-sm text-[#a0aec0] leading-relaxed max-w-lg">
              Roboway&apos;s next-generation humanoid — combining real-time AI vision, natural speech interaction,
              and whole-body ROS2 motion control into a modular, expressive platform built for the real world.
            </p>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-sm">
              {[
                { val: 24, suffix: "", label: "DOF" },
                { val: 6, suffix: "hr", label: "Runtime" },
                { val: 150, suffix: "cm", label: "Height" },
              ].map(({ val, suffix, label }) => (
                <div key={label} className="relative rounded-xl border border-white/[0.08] bg-[#0a0a0a]/60 p-3 text-center overflow-hidden">
                  <HudCorners size={8} color="rgba(96,165,250,0.25)" />
                  <div className="text-xl font-black font-mono text-white"><CountUp end={val} suffix={suffix} /></div>
                  <div className="text-[9px] font-mono text-[#4a5568] tracking-widest mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {["Humanoid", "Face Recognition", "Speech AI", "ROS2", "CNN Vision"].map(t => (
                <span key={t} className="font-mono text-[10px] text-[#60a5fa]/70 border border-[#1e3a5f]/60 rounded px-2.5 py-1 bg-[#010409]/60">{t}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#capabilities" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-sm font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                Explore Capabilities <ChevronRight size={14} />
              </a>
              <a href="#gallery" className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-6 py-2.5 text-sm font-semibold hover:border-white/40 transition-all">
                View Gallery <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Image indicator dots */}
          <div className="absolute bottom-10 left-6 flex gap-2">
            {IMAGES.map((_, i) => (
              <button key={i} onClick={() => setActiveImg(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === activeImg ? "w-6 bg-[#60a5fa]" : "w-2 bg-white/20 hover:bg-white/40"}`} />
            ))}
          </div>

          {/* Active image label */}
          <div className="absolute bottom-10 right-6 font-mono text-[10px] text-[#60a5fa]/50 text-right">
            <div>{IMAGES[activeImg].tag}</div>
            <div className="text-white/40">{String(activeImg + 1).padStart(2, "0")} / {IMAGES.length}</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OVERVIEW — split with stacked images
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">ABOUT PIXI</p>
            <h2 className="text-3xl font-bold text-white mb-5">
              A Humanoid That Understands You
            </h2>
            <p className="text-sm text-[#a0aec0] leading-relaxed mb-4">
              Pixi is built on the belief that robots should feel approachable, not mechanical. Designed from the ground up by Roboway Technologies,
              it combines a <span className="text-white">24-DOF servo-actuated body</span> with an AI stack that sees, hears,
              speaks, and responds — all on-device, in real time.
            </p>
            <p className="text-sm text-[#a0aec0] leading-relaxed mb-6">
              The <span className="text-white">ROS2-powered</span> motion system delivers smooth, human-like movement,
              while the onboard <span className="text-white">CNN vision pipeline</span> and <span className="text-white">speech recognition engine</span> allow
              Pixi to perceive and react to its environment with genuine intelligence. Its modular design
              means Pixi grows with your needs — swap components, add capabilities, scale up.
            </p>
            <div className="space-y-2.5">
              {[
                "Real-time face recognition + speech on edge compute",
                "24-DOF ROS2 whole-body motion control",
                "Quantized CNN for fast, accurate object detection",
                "Expressive behavior engine — natural interaction",
                "48V Li-ion battery · 6-hour continuous operation",
                "Modular hardware for rapid upgrades",
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-[#a0aec0]">
                  <Check size={13} className="mt-0.5 text-[#60a5fa] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: 2 images side by side + 1 below */}
          <div className="grid grid-cols-2 gap-3">
            {/* Large left */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] row-span-2" style={{ aspectRatio: "3/4" }}>
              <Image src="/images/pixi1.jpg" alt="Pixi full view" fill className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010409]/60 to-transparent" />
              <HudCorners size={14} color="rgba(37,99,235,0.45)" />
              <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#60a5fa]/60">FULL BODY VIEW</div>
            </div>
            {/* Top right */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]" style={{ aspectRatio: "1/1" }}>
              <Image src="/images/pixi_handshake.jpg" alt="Pixi handshake" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010409]/50 to-transparent" />
              <HudCorners size={12} color="rgba(96,165,250,0.3)" />
              <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#60a5fa]/60">INTERACTION</div>
            </div>
            {/* Bottom right */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]" style={{ aspectRatio: "1/1" }}>
              <Image src="/images/pixi_hand.jpg" alt="Pixi hand" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010409]/50 to-transparent" />
              <HudCorners size={12} color="rgba(96,165,250,0.3)" />
              <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#60a5fa]/60">DEXTERITY</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CAPABILITIES
      ═══════════════════════════════════════════ */}
      <section id="capabilities" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/35 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">INTELLIGENCE STACK</p>
            <h2 className="text-3xl font-bold gradient-text">Core Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: UserRound, title: "Face & Speech Recognition", stat: "Real-time", desc: "Identifies faces and understands natural speech entirely on-device — no cloud latency, full privacy." },
              { icon: Eye,       title: "CNN Object Detection",       stat: "Edge AI",  desc: "Quantized CNN model for fast scene understanding, obstacle detection, and object classification." },
              { icon: Route,     title: "ROS2 Motion Control",        stat: "24-DOF",   desc: "Whole-body motion primitives via ROS2 with 24 high-precision servo actuators for fluid, lifelike movement." },
              { icon: Sparkles,  title: "Expressive Behavior Engine", stat: "Natural",  desc: "Context-aware expressions, gestures, and responses create genuinely natural human-robot interaction." },
              { icon: Boxes,     title: "Modular Architecture",       stat: "Scalable", desc: "Swappable hardware modules mean upgrades, repairs, and capability expansions never require full replacement." },
              { icon: Building2, title: "Multi-Environment Ready",    stat: "Anywhere", desc: "Tested across homes, hospitals, industrial settings, and educational institutions without reconfiguration." },
            ].map(({ icon: Icon, title, stat, desc }) => (
              <div key={title}
                className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 group hover:border-[#2563eb]/30 transition-all duration-300 hover:shadow-[0_0_28px_rgba(37,99,235,0.09)] hover:-translate-y-0.5 overflow-hidden">
                <HudCorners size={13} color="rgba(96,165,250,0.2)" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/15 to-transparent"
                    style={{ animation: "hud-scan 4s linear infinite" }} />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa] transition-all duration-300 group-hover:bg-[#1e3a5f]/60 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold text-white/50">{stat}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-[#a0aec0] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PHOTO GALLERY
      ═══════════════════════════════════════════ */}
      <section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">VISUAL DOCUMENTATION</p>
          <h2 className="text-3xl font-bold gradient-text">Pixi in Action</h2>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Row 1: 1 wide + 2 square */}
          <div className="col-span-2 relative group overflow-hidden rounded-2xl border border-white/[0.08] aspect-video hover:border-[#2563eb]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(37,99,235,0.12)]">
            <Image src="/images/pixi1.jpg" alt="Pixi full view" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <HudCorners size={14} color="rgba(96,165,250,0.3)" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-semibold text-white">Full Profile View</p>
              <p className="text-[10px] font-mono text-[#60a5fa]/60">PIXI · PROFILE</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl border border-white/[0.08] aspect-square hover:border-[#2563eb]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(37,99,235,0.12)]">
            <Image src="/images/pixiv1.jpg" alt="Pixi side" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <HudCorners size={12} color="rgba(96,165,250,0.25)" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs font-semibold text-white">Side Profile</p>
              <p className="text-[10px] font-mono text-[#60a5fa]/60">PIXI · DESIGN</p>
            </div>
          </div>

          {/* Row 2: 3 squares */}
          <div className="relative group overflow-hidden rounded-2xl border border-white/[0.08] aspect-square hover:border-[#2563eb]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(37,99,235,0.12)]">
            <Image src="/images/pixi_handshake.jpg" alt="Pixi handshake" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <HudCorners size={12} color="rgba(96,165,250,0.25)" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs font-semibold text-white">Handshake</p>
              <p className="text-[10px] font-mono text-[#60a5fa]/60">PIXI · INTERACTION</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl border border-white/[0.08] aspect-square hover:border-[#2563eb]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(37,99,235,0.12)]">
            <Image src="/images/pixi_hand.jpg" alt="Pixi hand" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <HudCorners size={12} color="rgba(96,165,250,0.25)" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs font-semibold text-white">Dexterous Hand</p>
              <p className="text-[10px] font-mono text-[#60a5fa]/60">PIXI · HARDWARE</p>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-2xl border border-white/[0.08] aspect-square hover:border-[#2563eb]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(37,99,235,0.12)]">
            <Image src="/images/pixi_control.jpg" alt="Pixi control" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <HudCorners size={12} color="rgba(96,165,250,0.25)" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs font-semibold text-white">Control Interface</p>
              <p className="text-[10px] font-mono text-[#60a5fa]/60">PIXI · SOFTWARE</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SPECIFICATIONS
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/30 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">ENGINEERING DATA</p>
            <h2 className="text-3xl font-bold gradient-text">Technical Specifications</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              {
                icon: Cpu, label: "HARDWARE",
                rows: [
                  { k: "Processor",    v: "ARM Cortex-A78 Quad-Core" },
                  { k: "Sensors",      v: "LiDAR, Ultrasonics, RGB-D, Force-Torque" },
                  { k: "Actuators",    v: "24-DOF High-Precision Servomotors" },
                  { k: "Power",        v: "48V Li-ion · 6-hour runtime" },
                  { k: "Materials",    v: "Aerospace-grade Aluminium + CFRP" },
                  { k: "Dimensions",   v: "150cm × 60cm × 40cm" },
                ],
              },
              {
                icon: Radio, label: "SOFTWARE",
                rows: [
                  { k: "OS",           v: "Custom Linux (RobOS)" },
                  { k: "AI Frameworks",v: "TensorFlow, PyTorch, ROS2" },
                  { k: "Connectivity", v: "Wi-Fi 6, BT 5.3, 5G optional" },
                  { k: "API",          v: "gRPC, REST, ROS2 topics" },
                  { k: "Security",     v: "Encrypted comms, secure boot" },
                  { k: "Learning",     v: "RL, few-shot, online adaptation" },
                ],
              },
            ].map(({ icon: Icon, label, rows }) => (
              <div key={label} className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 p-6 overflow-hidden">
                <HudCorners size={16} color="rgba(37,99,235,0.35)" />
                <div className="flex items-center gap-2 mb-6">
                  <Icon size={14} className="text-[#60a5fa]" />
                  <span className="text-xs font-mono text-[#60a5fa] tracking-widest">{label}</span>
                </div>
                <dl className="space-y-3">
                  {rows.map(({ k, v }) => (
                    <div key={k} className="flex justify-between items-center gap-4 py-2 border-b border-white/[0.04] last:border-0">
                      <dt className="text-xs text-[#4a5568] shrink-0">{k}</dt>
                      <dd className="text-xs text-white font-mono text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          USE CASES
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">APPLICATIONS</p>
          <h2 className="text-3xl font-bold gradient-text">Where Pixi Excels</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: HeartPulse, title: "Elderly Care",        agency: "HEALTHCARE · HOME",    desc: "Vital sign monitoring, medication reminders, fall detection, and companionship for elderly and disabled individuals." },
            { icon: Factory,    title: "Industrial Automation",agency: "MANUFACTURING · INDUSTRY", desc: "Autonomous operation in repetitive, hazardous, or high-precision manufacturing and logistics environments." },
            { icon: GraduationCap, title: "Education & Research", agency: "UNIVERSITIES · LABS", desc: "Interactive demonstrations of AI and robotics concepts for universities, research labs, and STEM outreach." },
            { icon: Store,      title: "Retail & Hospitality", agency: "COMMERCIAL · SERVICE",  desc: "Customer-facing assistance, wayfinding, product guidance, and service automation in commercial spaces." },
          ].map(({ icon: Icon, title, agency, desc }) => (
            <div key={title}
              className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 p-6 group hover:border-[#2563eb]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.08)] overflow-hidden">
              <HudCorners size={12} color="rgba(96,165,250,0.2)" />
              <div className="w-10 h-10 rounded-xl bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa] mb-4 group-hover:bg-[#1e3a5f]/50 transition-all">
                <Icon size={18} />
              </div>
              <span className="font-mono text-[9px] text-[#60a5fa]/50 tracking-widest">{agency}</span>
              <h3 className="mt-1 text-sm font-semibold text-white mb-2">{title}</h3>
              <p className="text-xs text-[#a0aec0] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a0a0a] via-black to-[#001428] p-10 text-center md:p-14 overflow-hidden">
          <HudCorners size={24} color="rgba(37,99,235,0.4)" />
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at top center, #60a5fa, transparent 60%)" }} />
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/15 to-transparent pointer-events-none"
            style={{ animation: "hud-scan 9s linear infinite" }} />
          <div className="relative">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-3">DEPLOYMENT INQUIRY</p>
            <h3 className="text-2xl font-bold gradient-text sm:text-3xl mb-3">Bring Pixi to Your Organization</h3>
            <p className="mx-auto max-w-xl text-sm text-[#a0aec0] leading-relaxed mb-6">
              Whether for healthcare, industry, education, or research — we&apos;ll prepare a tailored
              deployment plan and live demonstration of Pixi&apos;s capabilities.
            </p>
            <QuoteRequest projectSlug="pixi-humanoid-bot" projectTitle="Pixi Humanoid Bot" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
