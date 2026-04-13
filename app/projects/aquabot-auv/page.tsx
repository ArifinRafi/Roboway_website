"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequest from "@/components/QuoteRequest";
import {
  Eye, Navigation, Wifi, Shield, AlertTriangle,
  Globe, Activity, ChevronRight, Play, Settings, Gauge,
  Cpu, Radio, Check, Volume2
} from "lucide-react";

/* ─── Primitives ──────────────────────────────── */
function HudCorners({ size = 16, color = "rgba(96,165,250,0.45)" }: { size?: number; color?: string }) {
  const s = `${size}px`, border = `1.5px solid ${color}`;
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ width: s, height: s, borderTop: border, borderLeft: border }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ width: s, height: s, borderTop: border, borderRight: border }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ width: s, height: s, borderBottom: border, borderLeft: border }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ width: s, height: s, borderBottom: border, borderRight: border }} />
    </>
  );
}

function CountUp({ end, suffix = "", duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
          if (p < 1) requestAnimationFrame(step); else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => { i++; setDisplayed(text.slice(0, i)); if (i >= text.length) clearInterval(iv); }, 38);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(t);
  }, [started, text, delay]);
  return <span ref={ref}>{displayed}<span className="animate-blink">|</span></span>;
}

const IMAGES = [
  { src: "/images/aquabot1.jpeg", label: "Aquabot Prototype" },
  { src: "/images/aquabot2.jpg",  label: "Underwater Configuration" },
];

export default function AquabotPage() {
  const [videoStarted, setVideoStarted] = useState(false);

  return (
    <div className="min-h-dvh bg-[#010409] text-white overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative isolate min-h-[90vh] flex items-end pb-16 overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/aquabot1.jpeg" alt="Aquabot" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-[#010409]/75 to-[#010409]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#010409]/70 via-[#010409]/20 to-transparent" />
          {/* Deep-sea blue atmosphere */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 65% 30%, rgba(14,116,144,0.12), transparent 55%)" }} />
        </div>

        {/* Scan line */}
        <div className="absolute inset-x-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.35),transparent)", animation: "hud-scan 9s linear infinite" }} />

        {/* HUD top-right */}
        <div className="absolute top-28 right-6 md:right-12 font-mono text-[10px] text-[#60a5fa]/40 space-y-1 text-right pointer-events-none hidden md:block">
          <div className="text-[#60a5fa]/60 animate-pulse-glow">SYS :: OPERATIONAL</div>
          <div>DEPTH :: SURFACE</div>
          <div>THRUSTER :: STANDBY</div>
          <div>VISION :: ACTIVE</div>
          <div>AQUABOT v1.0</div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0e7490]/40 bg-[#0e7490]/10 backdrop-blur-sm px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-mono text-cyan-400 tracking-widest">PROTOTYPE · AUTONOMOUS UNDERWATER VEHICLE</span>
          </div>

          <h1 className="text-6xl font-black sm:text-8xl tracking-tight leading-none">
            <span className="block text-white">AQUA</span>
            <span className="block gradient-text">BOT</span>
          </h1>
          <p className="mt-3 text-[#a0aec0] text-lg font-light tracking-widest uppercase">
            Autonomous Underwater Vehicle
          </p>
          <p className="mt-4 max-w-xl text-sm text-[#a0aec0]/80 leading-relaxed">
            A next-generation prototype AUV equipped with on-board computer vision, Pixhawk 4 precision control,
            and depth sensing — built for exploration, defense, and emergency response.
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["AUV", "Computer Vision", "RPi 5B", "Pixhawk 4", "6-DOF", "Defense"].map(t => (
              <span key={t} className="font-mono text-[10px] text-[#60a5fa]/70 border border-[#1e3a5f]/60 rounded px-2.5 py-1 bg-[#010409]/60">
                {t}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-10">
            {[
              { val: 100, suffix: "m", label: "MAX DEPTH" },
              { val: 6, suffix: "-DOF", label: "MANEUVERABILITY" },
              { val: 8, suffix: "GB", label: "RPi 5 RAM" },
              { val: 4, suffix: "", label: "PIXHAWK GEN" },
            ].map(({ val, suffix, label }) => (
              <div key={label}>
                <div className="text-3xl font-black font-mono text-white"><CountUp end={val} suffix={suffix} /></div>
                <div className="text-[9px] font-mono text-[#4a5568] tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#specs" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-sm font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
              View Specs <ChevronRight size={14} />
            </a>
            <a href="#video" className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-6 py-2.5 text-sm font-semibold hover:border-white/40 transition-all">
              <Play size={14} fill="white" /> Watch Demo
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OVERVIEW
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">PROJECT OVERVIEW</p>
            <h2 className="text-3xl font-bold text-white mb-5">
              <TypeWriter text="Intelligence Beneath the Surface" />
            </h2>
            <p className="text-sm text-[#a0aec0] leading-relaxed mb-4">
              Aquabot is Roboway Technologies&apos; prototype Autonomous Underwater Vehicle — designed to push
              the boundary of what small-form AUVs can do. At its core is a <span className="text-white">Raspberry Pi 5B</span> paired
              with a dedicated <span className="text-white">AI accelerator</span>, enabling full computer vision inference
              entirely on-board without any surface processing dependency.
            </p>
            <p className="text-sm text-[#a0aec0] leading-relaxed mb-6">
              Navigation and stabilization is handled by a <span className="text-white">Pixhawk 4</span> flight controller
              running ArduSub, while a <span className="text-white">Bar100 depth sensor</span> provides millimetre-accurate
              depth measurement down to 100m. The 6-DOF thruster configuration gives Aquabot full spatial
              freedom underwater — forward, lateral, vertical, and rotational.
            </p>
            <div className="space-y-2.5">
              {[
                "On-board YOLOv8 computer vision with AI accelerator",
                "Pixhawk 4 + ArduSub: depth hold & attitude stabilization",
                "Bar100 sensor: precise depth measurement to 100m",
                "6-DOF thruster array for full spatial maneuverability",
                "Tethered HD video + MAVLink telemetry to surface",
                "Modular design for mission-specific payload swaps",
              ].map(item => (
                <div key={item} className="flex items-start gap-3 text-sm text-[#a0aec0]">
                  <Check size={13} className="mt-0.5 text-[#60a5fa] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Images stacked */}
          <div className="space-y-4">
            {IMAGES.map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden border border-white/[0.08] group"
                style={{ aspectRatio: i === 0 ? "16/9" : "16/7" }}>
                <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e7490]/08 to-transparent" />
                <HudCorners size={16} color="rgba(14,116,144,0.45)" />
                <div className="absolute bottom-3 left-3 font-mono text-[9px] text-cyan-400/60">{img.label.toUpperCase()}</div>
                <div className="absolute top-3 right-3 font-mono text-[9px] text-[#60a5fa]/40">
                  AQUABOT · {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CORE FEATURES
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/35 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">TECHNOLOGY</p>
            <h2 className="text-3xl font-bold gradient-text">Core Capabilities</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Eye,        title: "On-Board AI Vision",      stat: "YOLOv8",  desc: "Raspberry Pi 5B + AI accelerator runs real-time object detection and obstacle avoidance fully on-board." },
              { icon: Navigation, title: "Pixhawk 4 Control",       stat: "6-DOF",   desc: "Industry-grade Pixhawk 4 handles depth hold, attitude lock, and autonomous maneuvering via ArduSub." },
              { icon: Gauge,      title: "Precision Depth Sensing",  stat: "100m",    desc: "Bar100 pressure sensor delivers millimetre-accurate depth readings across the full 100m operating range." },
              { icon: Wifi,       title: "HD Tethered Telemetry",    stat: "HD",      desc: "Live HD video feed and full MAVLink sensor telemetry streamed to the surface operator in real time." },
              { icon: Settings,   title: "6-DOF Thruster Array",     stat: "360°",    desc: "Multi-thruster configuration enables free movement in all directions — no heading limitations." },
              { icon: Shield,     title: "Multi-Mission Ready",      stat: "3+",      desc: "Switchable mission profiles: exploration, defense recon, and emergency response operations." },
            ].map(({ icon: Icon, title, stat, desc }) => (
              <div key={title}
                className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 group hover:border-[#2563eb]/30 transition-all duration-300 hover:shadow-[0_0_28px_rgba(37,99,235,0.09)] hover:-translate-y-0.5 overflow-hidden">
                <HudCorners size={13} color="rgba(96,165,250,0.2)" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/15 to-transparent"
                    style={{ animation: "hud-scan 4s linear infinite" }} />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa] transition-all duration-300 group-hover:bg-[#1e3a5f]/60 group-hover:scale-110">
                    <Icon size={18} />
                  </div>
                  <span className="font-mono text-lg font-black text-white/80">{stat}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-[#a0aec0] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECHNICAL SPECIFICATIONS
      ═══════════════════════════════════════════ */}
      <section id="specs" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">ENGINEERING DATA</p>
          <h2 className="text-3xl font-bold gradient-text">Technical Specifications</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              icon: Cpu, label: "HARDWARE",
              rows: [
                { k: "Onboard Computer",  v: "Raspberry Pi 5B (8GB RAM)" },
                { k: "AI Accelerator",    v: "Edge AI co-processor" },
                { k: "Flight Controller", v: "Pixhawk 4" },
                { k: "Depth Sensor",      v: "Bar100 (0 – 100m)" },
                { k: "Camera",            v: "HD wide-angle + IR" },
                { k: "Thrusters",         v: "6-DOF array" },
                { k: "Communication",     v: "Tethered high-speed link" },
                { k: "Frame",             v: "Acrylic + aluminium chassis" },
              ],
            },
            {
              icon: Radio, label: "SOFTWARE",
              rows: [
                { k: "Vision Model",   v: "YOLOv8 (custom-trained)" },
                { k: "Control Stack",  v: "ArduSub / PX4 Underwater" },
                { k: "OS",             v: "Ubuntu 22.04 (RPi 5)" },
                { k: "Comms Protocol", v: "MAVLink over tether" },
                { k: "Telemetry UI",   v: "QGroundControl + custom" },
                { k: "Data Logging",   v: "On-board SD + cloud sync" },
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
                    <dt className="text-xs text-[#4a5568]">{k}</dt>
                    <dd className="text-xs text-white font-mono text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          USE CASES
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/30 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">APPLICATIONS</p>
            <h2 className="text-3xl font-bold gradient-text">Mission Use Cases</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Globe,         title: "Underwater Exploration",     agency: "SURVEY · MAPPING",  desc: "Seabed mapping, reef survey, and underwater structure inspection in rivers, lakes, and coastal zones." },
              { icon: Shield,        title: "Defense & Reconnaissance",   agency: "NAVAL · SECURITY",  desc: "Covert underwater surveillance, port security monitoring, and naval reconnaissance operations." },
              { icon: AlertTriangle, title: "River Accident Response",    agency: "RESCUE · DISASTER", desc: "Rapid deployment for drowning rescue support, sunken vehicle location, and flood disaster response." },
              { icon: Activity,      title: "Pipeline & Infrastructure",  agency: "INDUSTRY · CIVIL",  desc: "Inspection of underwater pipelines, bridge foundations, and dam structures with HD visual data." },
            ].map(({ icon: Icon, title, agency, desc }) => (
              <div key={title}
                className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 p-6 group hover:border-[#2563eb]/30 transition-all duration-300 overflow-hidden">
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          YOUTUBE VIDEO
      ═══════════════════════════════════════════ */}
      <section id="video" className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">PROTOTYPE DEMO</p>
          <h2 className="text-3xl font-bold gradient-text">Aquabot in Action</h2>
          <p className="mt-2 text-sm text-[#4a5568]">
            Watch the Aquabot prototype operating underwater — vision, depth control, and maneuverability on display.
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden group">
          <HudCorners size={18} color="rgba(37,99,235,0.4)" />

          {!videoStarted ? (
            <div className="relative aspect-video cursor-pointer" onClick={() => setVideoStarted(true)}>
              <Image src="/images/aquabot2.jpg" alt="Aquabot demo thumbnail" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <button
                  onClick={() => setVideoStarted(true)}
                  className="w-20 h-20 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-110 group-hover:shadow-[0_0_50px_rgba(14,116,144,0.5)]"
                >
                  <Play size={28} className="text-white ml-1.5" fill="white" />
                </button>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">Aquabot — Prototype Demo</p>
                  <p className="text-[#a0aec0] text-xs mt-1.5">Underwater maneuverability · Vision · Depth control</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 font-mono text-[9px] text-cyan-400/50 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  PROTOTYPE FOOTAGE
                </div>
                <div className="flex items-center gap-1.5"><Volume2 size={8} /> AUDIO AVAILABLE</div>
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#60a5fa]/40">AQUABOT · ROBOWAY TECH</div>
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
                style={{ animation: "hud-scan 6s linear infinite" }} />
            </div>
          ) : (
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/2obeKBDe9_Y?autoplay=1&rel=0"
                title="Aquabot Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              <span className="font-mono text-[10px] text-[#a0aec0]">ROBOWAY TECHNOLOGIES</span>
            </div>
            <span className="font-mono text-[10px] text-[#4a5568]">AQUABOT · PROTOTYPE DEMO</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a0a0a] via-black to-[#001428] p-10 text-center md:p-14 overflow-hidden">
          <HudCorners size={24} color="rgba(37,99,235,0.4)" />
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at top center, #0e7490, transparent 60%)" }} />
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/15 to-transparent pointer-events-none"
            style={{ animation: "hud-scan 9s linear infinite" }} />
          <div className="relative">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-3">COLLABORATION & PROCUREMENT</p>
            <h3 className="text-2xl font-bold gradient-text sm:text-3xl mb-3">
              Interested in Aquabot?
            </h3>
            <p className="mx-auto max-w-xl text-sm text-[#a0aec0] leading-relaxed mb-6">
              Whether you&apos;re looking for a research partner, a defense prototype, or an emergency response system —
              let&apos;s discuss how Aquabot can be configured for your mission requirements.
            </p>
            <QuoteRequest projectSlug="aquabot-auv" projectTitle="Aquabot AUV" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
