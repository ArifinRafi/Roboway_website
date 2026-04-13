"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequest from "@/components/QuoteRequest";
import {
  Eye, Shield, Bell, Database, Brain, Car, Flame,
  ChevronRight, Check, X, Wifi, Cpu, Building2,
  AlertTriangle, Camera, Radio, Lock, TrendingUp,
  Zap, Globe, ArrowRight, Play, Volume2
} from "lucide-react";

/* ─── Reusable primitives ─────────────────────── */
function HudCorners({ size = 16, color = "rgba(96,165,250,0.5)" }: { size?: number; color?: string }) {
  const s = `${size}px`;
  const border = `1.5px solid ${color}`;
  return (
    <>
      <span className="absolute top-0 left-0" style={{ width: s, height: s, borderTop: border, borderLeft: border }} />
      <span className="absolute top-0 right-0" style={{ width: s, height: s, borderTop: border, borderRight: border }} />
      <span className="absolute bottom-0 left-0" style={{ width: s, height: s, borderBottom: border, borderLeft: border }} />
      <span className="absolute bottom-0 right-0" style={{ width: s, height: s, borderBottom: border, borderRight: border }} />
    </>
  );
}

function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setCount(Math.floor(eased * end));
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

function AnimatedBar({ value, color = "#60a5fa", delay = 0 }: { value: number; color?: string; delay?: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(value), delay);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, delay]);
  return (
    <div ref={ref} className="h-2 rounded-full bg-white/5 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}

const YOUTUBE_EMBED = "https://www.youtube.com/embed/93YRrJedH74";

const IMAGES = [
  { src: "/images/detectx1.png", label: "Detector V1 Hardware", tag: "HARDWARE" },
  { src: "/images/detectx2.png", label: "Live ANPR Detection", tag: "AI INFERENCE" },
  { src: "/images/detectx3.jpeg", label: "Field Deployment", tag: "DEPLOYMENT" },
  { src: "/images/detectx4.jpeg", label: "Surveillance Feed", tag: "MONITORING" },
  { src: "/images/detectx5.jpeg", label: "Real-time Analysis", tag: "ANALYTICS" },
];

export default function DetectXPage() {
  const [videoStarted, setVideoStarted] = useState(false);

  return (
    <div className="min-h-dvh bg-[#010409] text-white overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative isolate min-h-[92vh] flex items-end pb-16 overflow-hidden pt-20">
        {/* BG: detectx1 hardware shot */}
        <div className="absolute inset-0 -z-10">
          <Image src="/images/detectx1.png" alt="DetectX" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-[#010409]/80 to-[#010409]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#010409]/80 via-[#010409]/30 to-transparent" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 20%, rgba(37,99,235,0.10), transparent 55%)" }} />
        </div>

        {/* Scan line */}
        <div className="absolute inset-x-0 h-[1px] pointer-events-none"
          style={{ background: "linear-gradient(90deg,transparent,rgba(96,165,250,0.4),transparent)", animation: "hud-scan 10s linear infinite" }} />

        {/* HUD top-right readout */}
        <div className="absolute top-28 right-6 md:right-12 font-mono text-[10px] text-[#60a5fa]/40 space-y-1 text-right pointer-events-none hidden md:block">
          <div className="animate-pulse-glow text-[#60a5fa]/60">SYS :: ACTIVE</div>
          <div>STREAMS :: MONITORING</div>
          <div>ANPR :: ONLINE</div>
          <div>THREAT-DETECT :: ARMED</div>
          <div>DETECTX v1.0</div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#60a5fa]/20 bg-[#1e3a5f]/20 backdrop-blur-sm px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[11px] font-mono text-[#60a5fa]">PROACTIVE AI SURVEILLANCE ECOSYSTEM</span>
          </div>

          {/* Tagline */}
          <p className="text-[#60a5fa] font-mono text-sm tracking-[0.25em] uppercase mb-3">
            SEE MORE. REACT FASTER. STAY SECURE.
          </p>

          <h1 className="text-6xl font-black sm:text-8xl tracking-tight leading-none">
            <span className="block text-white">DETECT</span>
            <span className="block gradient-text">X</span>
          </h1>

          <p className="mt-3 text-[#a0aec0] text-base md:text-lg font-light max-w-2xl leading-relaxed">
            CCTV-Based Vehicle Number Plate &amp; Hazard Detection System.<br />
            AI-Powered Surveillance for High-Security Government, Corporate &amp; Smart City Infrastructure.
          </p>

          {/* Stat row */}
          <div className="mt-8 flex flex-wrap gap-10">
            {[
              { val: 98, suffix: "%", label: "ANPR ACCURACY" },
              { val: 1000, suffix: "+", label: "CAMERA STREAMS" },
              { val: 3, suffix: "", label: "AI MODULES" },
              { val: 85, suffix: "%", label: "CCTV MARKET GROWTH" },
            ].map(({ val, suffix, label }) => (
              <div key={label}>
                <div className="text-3xl font-black font-mono text-white">
                  <CountUp end={val} suffix={suffix} />
                </div>
                <div className="text-[9px] font-mono text-[#4a5568] tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["Bengali ANPR", "Fire Detection", "Weapon Sensing", "Edge AI", "PX4 Jetson Nano", "Smart City"].map(t => (
              <span key={t} className="font-mono text-[10px] text-[#60a5fa]/70 border border-[#1e3a5f]/60 rounded px-2.5 py-1 bg-[#010409]/60">
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#modules" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-sm font-semibold transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Explore Capabilities <ChevronRight size={14} />
            </a>
            <a href="#ecosystem" className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-6 py-2.5 text-sm font-semibold backdrop-blur-sm hover:border-white/40 transition-all">
              View Products <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE PROBLEM
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono text-red-400/70 tracking-widest mb-2">THE PROBLEM</p>
            <h2 className="text-3xl font-bold text-white mb-6">The Passive Surveillance Crisis</h2>
            <div className="space-y-5">
              {[
                { icon: AlertTriangle, color: "text-red-400", title: "Manual Fatigue", desc: "Logging vehicles manually is slow and prone to high error rates, creating critical security gaps." },
                { icon: Globe, color: "text-orange-400", title: "Local Language Gap", desc: "Existing foreign systems fail to recognize Bengali number plates — accuracy sub-40%." },
                { icon: Camera, color: "text-yellow-400", title: "Passive Monitoring", desc: "Current CCTV only records history. It doesn't prevent incidents or trigger responses." },
                { icon: Zap, color: "text-red-400", title: "Delayed Response", desc: "Hazard detection (Fire/Weapons) relies on human eyes — often too late to intervene." },
              ].map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className={`mt-0.5 shrink-0 ${color}`}><Icon size={16} /></div>
                  <div>
                    <span className="text-sm font-semibold text-white">{title}: </span>
                    <span className="text-sm text-[#a0aec0]">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
              <p className="text-sm text-red-400 font-medium">
                Result: Increased security breaches and risk to human life in Bangladesh.
              </p>
            </div>
          </div>

          {/* Right: product image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-video">
            <Image src={IMAGES[1].src} alt="DetectX detection feed" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/10 to-transparent" />
            <HudCorners size={18} color="rgba(37,99,235,0.5)" />
            <div className="absolute top-3 left-3 font-mono text-[9px] text-[#60a5fa]/60 space-y-0.5">
              <div>LIVE DETECTION FEED</div>
              <div>ANPR :: ACTIVE</div>
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#60a5fa]/60 text-right">
              <div>CONFIDENCE :: HIGH</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SOLUTION
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/40 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">OUR SOLUTION</p>
            <h2 className="text-3xl font-bold gradient-text">Proactive AI Ecosystem</h2>
            <p className="mt-3 text-sm text-[#a0aec0] max-w-2xl mx-auto leading-relaxed">
              Transform existing passive CCTV networks into an intelligent, autonomous security workforce.
              Our software detects Bengali number plates, fires, and local weapons in real-time with ultra-low latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: Cpu, label: "Edge Computing", desc: "100% on-device inference. No cloud round-trip, no latency, no privacy risk." },
              { icon: Globe, label: "Bengali Optimized", desc: "Proprietary models trained exclusively on Bangladeshi Bengali fonts and plate formats." },
              { icon: Zap, label: "Ultra-Low Latency", desc: "Detection and alert dispatch happens in milliseconds — before threats escalate." },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 p-6 text-center group hover:border-[#2563eb]/30 transition-all duration-300">
                <HudCorners size={12} color="rgba(96,165,250,0.2)" />
                <div className="w-12 h-12 mx-auto rounded-xl bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa] mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{label}</h3>
                <p className="text-xs text-[#a0aec0] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Detectx2 image with overlay */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-video max-w-4xl mx-auto">
            <Image src={IMAGES[2].src} alt="DetectX deployment" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#010409]/60 via-transparent to-[#010409]/60" />
            <HudCorners size={20} color="rgba(37,99,235,0.4)" />
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/20 to-transparent"
              style={{ animation: "hud-scan 5s linear infinite" }} />
            <div className="absolute top-4 left-4 font-mono text-[9px] text-[#60a5fa]/60">FIELD DEPLOYMENT · DETECTX</div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CORE INTELLIGENCE MODULES
      ═══════════════════════════════════════════ */}
      <section id="modules" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">AI INTELLIGENCE STACK</p>
          <h2 className="text-3xl font-bold gradient-text">Core Intelligence Modules</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Car, title: "Localized ANPR", badge: "NUMBER PLATES",
              desc: "Proprietary algorithms trained on Bangladeshi Bengali fonts and plate formats. 98% accuracy in diverse lighting conditions.",
              stat: "98%", statLabel: "ACCURACY",
            },
            {
              icon: Flame, title: "Fire & Smoke", badge: "HAZARD DETECTION",
              desc: "Visual smoke and flame detection triggers alarms before heat sensors activate. Drastically reduces property damage.",
              stat: "<2s", statLabel: "RESPONSE TIME",
            },
            {
              icon: Shield, title: "Weapon Sensing", badge: "SECURITY THREAT",
              desc: "Detects firearms and local weapons (knives, machetes). Specialized for Bangladesh's specific security threat profiles.",
              stat: "Real-time", statLabel: "DETECTION",
            },
            {
              icon: Bell, title: "Instant Alerts", badge: "NOTIFICATION",
              desc: "Zero-latency siren triggering and mobile push notifications for immediate on-ground intervention.",
              stat: "0ms", statLabel: "LATENCY",
            },
            {
              icon: Database, title: "Evidence Vault", badge: "DATA ARCHIVAL",
              desc: "Automated archiving of vehicle images, timestamps, and hazard snapshots with searchable metadata.",
              stat: "100%", statLabel: "AUTO-ARCHIVED",
            },
            {
              icon: Brain, title: "Continuous Learning", badge: "ADAPTIVE AI",
              desc: "Self-improving AI models that adapt to environmental changes and new weapon shapes over time.",
              stat: "Self", statLabel: "IMPROVING",
            },
          ].map(({ icon: Icon, title, badge, desc, stat, statLabel }) => (
            <div key={title}
              className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 group hover:border-[#2563eb]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.08)] hover:-translate-y-0.5 overflow-hidden">
              <HudCorners size={14} color="rgba(96,165,250,0.25)" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/15 to-transparent"
                  style={{ animation: "hud-scan 4s linear infinite" }} />
              </div>
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa] transition-all duration-300 group-hover:bg-[#1e3a5f]/60">
                  <Icon size={20} />
                </div>
                <span className="font-mono text-[9px] text-[#60a5fa]/50 border border-[#1e3a5f]/40 rounded px-2 py-0.5">{badge}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1">{title}</h3>
              <div className="text-xl font-black font-mono text-[#60a5fa]/80 mb-1">{stat}
                <span className="text-[10px] text-[#4a5568] ml-1 font-mono">{statLabel}</span>
              </div>
              <p className="text-xs text-[#a0aec0] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PRODUCT ECOSYSTEM
      ═══════════════════════════════════════════ */}
      <section id="ecosystem" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">PRODUCT LINEUP</p>
          <h2 className="text-3xl font-bold gradient-text">Product Ecosystem</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detector V1 */}
          <div className="relative rounded-2xl border border-[#2563eb]/30 bg-gradient-to-br from-[#0a0a0a] to-[#001428]/60 p-8 overflow-hidden group hover:border-[#2563eb]/50 transition-all duration-300">
            <HudCorners size={18} color="rgba(37,99,235,0.5)" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/15 to-transparent"
                style={{ animation: "hud-scan 5s linear infinite" }} />
            </div>
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/40 border border-[#2563eb]/30 flex items-center justify-center text-[#60a5fa]">
                <Cpu size={22} />
              </div>
              <span className="font-mono text-[10px] text-white bg-[#2563eb]/80 px-3 py-1 rounded-full font-semibold">HARDWARE + AI</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Detector V1</h3>
            <p className="text-[#60a5fa] text-sm font-mono mb-5">&ldquo;Smart Edge AI for Small Premises&rdquo;</p>
            <ul className="space-y-3 mb-6">
              {[
                "Jetson Nano based independent device",
                "Plug-and-play CCTV integration",
                "No cloud dependency (Privacy First)",
                "Low power & affordable",
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#a0aec0]">
                  <Check size={14} className="text-[#60a5fa] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-[#4a5568]">TARGET: </span>
              <span className="text-xs font-semibold text-white">Homes, Malls, Small Offices</span>
            </div>
          </div>

          {/* Enterprise Platform */}
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 p-8 overflow-hidden group hover:border-[#2563eb]/30 transition-all duration-300">
            <HudCorners size={18} color="rgba(96,165,250,0.25)" />
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa]">
                <Radio size={22} />
              </div>
              <span className="font-mono text-[10px] text-white border border-[#60a5fa]/40 px-3 py-1 rounded-full">SOFTWARE ONLY</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Enterprise Platform</h3>
            <p className="text-[#60a5fa] text-sm font-mono mb-5">&ldquo;City-Scale Surveillance Intelligence&rdquo;</p>
            <ul className="space-y-3 mb-6">
              {[
                "Scalable GPU Server deployment",
                "Supports 1000+ camera streams",
                "API for Police/Traffic integration",
                "Centralized Command Control",
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#a0aec0]">
                  <Check size={14} className="text-[#60a5fa] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-[#4a5568]">TARGET: </span>
              <span className="text-xs font-semibold text-white">Airports, Smart Cities, Government</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DEMO FLOW / PIPELINE
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/30 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">HOW IT WORKS</p>
            <h2 className="text-3xl font-bold gradient-text">Detector V1 — Processing Pipeline</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Pipeline diagram */}
            <div className="space-y-3">
              {[
                { step: "01", label: "IP Camera feeds Video Stream", color: "border-[#1e3a5f]/60 bg-[#1e3a5f]/10", arrow: true },
                { step: "02", label: "Jetson Nano Processing — AI Inference (ANPR + Fire + Weapons)", color: "border-[#2563eb]/50 bg-[#2563eb]/10", arrow: true },
                { step: "03a", label: "Log Entry & Plate to Evidence Vault", color: "border-green-500/30 bg-green-500/5", arrow: false },
                { step: "03b", label: "Trigger Local Siren + Push Alert", color: "border-red-500/30 bg-red-500/5", arrow: true },
                { step: "04", label: "Upload Metadata to Cloud Dashboard", color: "border-[#4a5568]/40 bg-white/[0.03]", arrow: false },
              ].map(({ step, label, color, arrow }, i) => (
                <div key={step}>
                  <div className={`relative flex items-center gap-4 rounded-xl border ${color} p-4 backdrop-blur-sm`}>
                    <span className="font-mono text-[10px] text-[#60a5fa]/50 shrink-0 w-8">{step}</span>
                    <span className="text-sm text-white">{label}</span>
                  </div>
                  {arrow && (
                    <div className="flex justify-center my-1">
                      <ChevronRight size={16} className="text-[#60a5fa]/30 rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Hardware image */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-square max-w-sm mx-auto">
              <Image src={IMAGES[0].src} alt="Detector V1 Hardware" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/10 to-transparent" />
              <HudCorners size={20} color="rgba(37,99,235,0.5)" />
              <div className="absolute top-3 left-3 font-mono text-[9px] text-[#60a5fa]/60 space-y-0.5">
                <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> SYSTEM :: ACTIVE</div>
                <div>ANPR :: DETECTING</div>
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#60a5fa]/50 text-right">
                <div>DETECTX · DETECTOR V1</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARKET NEED: BANGLADESH 2026
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">MARKET OPPORTUNITY</p>
          <h2 className="text-3xl font-bold gradient-text">Market Need: Bangladesh 2026</h2>
          <p className="mt-2 text-sm text-[#4a5568] max-w-lg mx-auto italic">
            &ldquo;Heavy reliance on foreign systems creates security vulnerabilities and high costs. We bridge the local technology gap.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {[
              { label: "CCTV Adoption Rate", value: 85, color: "#2563eb", display: "85% YoY Increase", delay: 0 },
              { label: "Bengali ANPR Accuracy (Foreign Tech)", value: 40, color: "#ef4444", display: "Poor (Sub-40%)", delay: 200 },
              { label: "Our Solution Accuracy", value: 98, color: "#22c55e", display: "Industry Leading 98%", delay: 400 },
              { label: "Local Support Demand", value: 90, color: "#06b6d4", display: "90% Critical Need", delay: 600 },
            ].map(({ label, value, color, display, delay }) => (
              <div key={label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#a0aec0]">{label}</span>
                  <span className="font-mono text-xs font-semibold" style={{ color }}>{display}</span>
                </div>
                <AnimatedBar value={value} color={color} delay={delay} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: 85, suffix: "%", label: "YoY CCTV Growth", sub: "Bangladesh market" },
              { val: 98, suffix: "%", label: "Our ANPR Accuracy", sub: "vs sub-40% foreign" },
              { val: 90, suffix: "%", label: "Local Support Need", sub: "critical demand" },
              { val: 40, suffix: "+", label: "Lac Market Size", sub: "addressable" },
            ].map(({ val, suffix, label, sub }) => (
              <div key={label} className="relative rounded-xl border border-white/[0.08] bg-[#0a0a0a]/80 p-5 text-center overflow-hidden">
                <HudCorners size={10} color="rgba(96,165,250,0.2)" />
                <div className="text-2xl font-black font-mono text-white mb-0.5">
                  <CountUp end={val} suffix={suffix} />
                </div>
                <div className="text-xs font-semibold text-white mb-0.5">{label}</div>
                <div className="text-[10px] text-[#4a5568]">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          COMPETITIVE EDGE
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/30 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">WHY DETECTX</p>
            <h2 className="text-3xl font-bold gradient-text">Competitive Edge</h2>
          </div>

          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 overflow-hidden">
            <HudCorners size={16} color="rgba(37,99,235,0.3)" />
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#2563eb]/20 border-b border-white/[0.08]">
              <div className="px-6 py-4 text-xs font-mono text-[#60a5fa]">FEATURE</div>
              <div className="px-6 py-4 text-xs font-mono text-[#a0aec0] border-l border-white/[0.06]">GENERIC AI SYSTEMS</div>
              <div className="px-6 py-4 text-xs font-mono text-[#60a5fa] border-l border-white/[0.06]">DETECTX</div>
            </div>
            {[
              { feature: "Bengali Plate Accuracy", generic: "Low / Not Supported", ours: "High (Optimized)", good: true },
              { feature: "Local Weapon Detection", generic: "Generic Only", ours: "Specific (Machete/Knife)", good: true },
              { feature: "Offline Capability", generic: "Often Cloud-Dependent", ours: "100% Edge-Based", good: true },
              { feature: "Cost to Deploy", generic: "High ($$$)", ours: "Optimized for local ROI", good: true },
            ].map(({ feature, generic, ours, good }) => (
              <div key={feature} className="grid grid-cols-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                <div className="px-6 py-4 text-sm text-[#a0aec0]">{feature}</div>
                <div className="px-6 py-4 border-l border-white/[0.04] flex items-center gap-2 text-sm text-[#4a5568]">
                  <X size={12} className="text-red-400 shrink-0" />
                  {generic}
                </div>
                <div className="px-6 py-4 border-l border-white/[0.04] flex items-center gap-2 text-sm text-white font-semibold">
                  <Check size={12} className="text-green-400 shrink-0" />
                  {ours}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OPERATIONAL USE CASES
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">DEPLOYMENT SCENARIOS</p>
          <h2 className="text-3xl font-bold gradient-text">Operational Excellence</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Car, title: "Parking Automation", desc: "Seamless entry/exit with LPR, OTP payment gateway via bKash, occupancy management, and security blacklist integration.", agency: "MALLS · CORPORATES" },
            { icon: Flame, title: "Fire Prevention", desc: "Visual flame and smoke detection for factories and warehouses. Triggers alarms before heat sensors — saving lives and property.", agency: "INDUSTRIAL · FACTORIES" },
            { icon: Building2, title: "Safe City Control", desc: "Centralized city-scale monitoring with API integration for police and municipal government dashboards.", agency: "POLICE · MUNICIPAL GOV" },
            { icon: Shield, title: "Border & Traffic", desc: "Real-time ANPR for law enforcement, blacklisted vehicle flagging, crowd control, and border perimeter monitoring.", agency: "BORDER FORCES · POLICE" },
          ].map(({ icon: Icon, title, desc, agency }) => (
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
          I-PARKING DEEP DIVE
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/30 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">SMART PARKING MODULE</p>
              <h2 className="text-3xl font-bold text-white mb-4">I-Parking</h2>
              <p className="text-sm text-[#a0aec0] mb-6 leading-relaxed">
                Intelligent parking management powered by Bengali ANPR and edge AI.
                Eliminates manual ticketing and enables frictionless digital payment workflows.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Wifi, title: "Seamless Digital Onboarding", desc: "Vehicle registration via bKash or credit/debit cards, linking Bengali number plates to a digital wallet." },
                  { icon: Zap, title: "Edge-Powered Entry/Exit Analytics", desc: "High-speed real-time LPR and hazard screening at access points — barrier control without human intervention." },
                  { icon: Lock, title: "Frictionless OTP Payment", desc: "Automated parking fee collection triggered via OTP, billing directly to the user's mobile account." },
                  { icon: TrendingUp, title: "Occupancy & Space Management", desc: "Live tracking of available slots using existing CCTV infrastructure, reducing congestion." },
                  { icon: Database, title: "Metadata-Only Cloud Sync", desc: "Processes video locally on Jetson Nano — only event triggers and timestamps sync to cloud." },
                  { icon: Shield, title: "Security Blacklist Integration", desc: "Automatic flagging of unauthorized or blacklisted vehicles with instant security notifications." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="mt-0.5 w-7 h-7 rounded-lg bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa] shrink-0">
                      <Icon size={12} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">{title}: </span>
                      <span className="text-sm text-[#a0aec0]">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-video">
              <Image src={IMAGES[3].src} alt="I-Parking" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/10 to-transparent" />
              <HudCorners size={18} color="rgba(37,99,235,0.4)" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECHNICAL SPECIFICATIONS
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">ENGINEERING DATA</p>
          <h2 className="text-3xl font-bold gradient-text">Technical Specifications</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              icon: Cpu, label: "HARDWARE SPECS",
              items: [
                { k: "Edge Device", v: "NVIDIA Jetson Nano" },
                { k: "CCTV Integration", v: "Plug-and-play IP cameras" },
                { k: "Connectivity", v: "Wired / Wireless LAN" },
                { k: "Power Consumption", v: "Low power edge compute" },
                { k: "ANPR Accuracy", v: "98% Bengali plates" },
                { k: "Cloud Dependency", v: "None — Privacy First" },
                { k: "Alert Hardware", v: "Local siren + mobile push" },
              ]
            },
            {
              icon: Radio, label: "SOFTWARE STACK",
              items: [
                { k: "Detection Engine", v: "Custom ANPR + YOLO" },
                { k: "Language Support", v: "Bengali script optimized" },
                { k: "Hazard Detection", v: "Fire, Smoke, Weapons" },
                { k: "Enterprise Streams", v: "1000+ concurrent cameras" },
                { k: "Cloud Sync", v: "Metadata-only (events)" },
                { k: "Revenue Model", v: "SaaS Hybrid" },
                { k: "API Integration", v: "Police / Traffic / Gov" },
              ]
            }
          ].map(({ icon: Icon, label, items }) => (
            <div key={label} className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 p-6 overflow-hidden">
              <HudCorners size={16} color="rgba(37,99,235,0.35)" />
              <div className="flex items-center gap-2 mb-6">
                <Icon size={14} className="text-[#60a5fa]" />
                <span className="text-xs font-mono text-[#60a5fa] tracking-widest">{label}</span>
              </div>
              <dl className="space-y-3">
                {items.map(({ k, v }) => (
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
          ROADMAP
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/30 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">DEPLOYMENT ROADMAP</p>
            <h2 className="text-3xl font-bold gradient-text">The Path Ahead</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { phase: "01", title: "Phase 1", items: ["Detector V1 Launch", "Small-scale Retail Pilots"], active: true },
              { phase: "02", title: "Phase 2", items: ["Enterprise Platform Rollout", "Government & Airport Integration"], active: false },
              { phase: "03", title: "Phase 3", items: ["Smart City Connectivity", "National Traffic AI Prediction"], active: false },
            ].map(({ phase, title, items, active }) => (
              <div key={phase}
                className={`relative rounded-2xl border p-8 text-center overflow-hidden transition-all duration-300 ${
                  active ? "border-[#2563eb]/50 bg-[#1e3a5f]/10" : "border-white/[0.08] bg-[#0a0a0a]/80"
                }`}>
                <HudCorners size={14} color={active ? "rgba(37,99,235,0.5)" : "rgba(96,165,250,0.2)"} />
                <div className={`w-14 h-14 mx-auto rounded-full border-2 flex items-center justify-center font-mono text-base font-bold mb-4 ${
                  active ? "border-[#2563eb] text-[#60a5fa] bg-[#1e3a5f]/30" : "border-[#4a5568]/40 text-[#4a5568]"
                }`}>
                  {phase}
                </div>
                <h3 className={`text-sm font-bold mb-3 ${active ? "text-[#60a5fa]" : "text-[#a0aec0]"}`}>{title}</h3>
                {items.map(i => (
                  <p key={i} className="text-xs text-[#a0aec0] leading-relaxed">{i}</p>
                ))}
                {active && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-mono text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    IN PROGRESS
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CLIENTS
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">TRUSTED BY</p>
          <h2 className="text-2xl font-bold gradient-text">Current Deployments &amp; Clients</h2>
        </div>
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 p-8 overflow-hidden">
          <HudCorners size={16} color="rgba(37,99,235,0.25)" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Banglalink", type: "Telecom · Pilot" },
              { name: "VEON", type: "Enterprise · Client" },
              { name: "Robi", type: "Telecom · Client" },
              { name: "ICT Division", type: "Government" },
              { name: "Bangladesh Dept. of Agricultural Extension", type: "Government · Active" },
              { name: "European University of Bangladesh", type: "Education" },
              { name: "Stack International", type: "Enterprise" },
              { name: "Dept. of Mango Production", type: "Government" },
            ].map(({ name, type }) => (
              <div key={name} className="text-center p-4 rounded-xl border border-white/[0.04] hover:border-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#1e3a5f]/30 border border-[#2563eb]/20 flex items-center justify-center mx-auto mb-2">
                  <Building2 size={16} className="text-[#60a5fa]" />
                </div>
                <p className="text-xs font-semibold text-white mb-0.5">{name}</p>
                <p className="text-[10px] text-[#4a5568]">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FULL GALLERY
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="text-center mb-10">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">PRODUCT VISUALS</p>
          <h2 className="text-2xl font-bold gradient-text">DetectX in Action</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {IMAGES.map((img, i) => (
            <div key={i} className={`relative group overflow-hidden rounded-2xl border border-white/[0.08] hover:border-[#2563eb]/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(37,99,235,0.15)] ${i === 0 ? "col-span-2 aspect-video" : "aspect-square"}`}>
              <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <HudCorners size={12} color="rgba(96,165,250,0.3)" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-semibold text-white">{img.label}</p>
                <p className="text-[10px] font-mono text-[#60a5fa]/60">DETECTX · {img.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          YOUTUBE VIDEO
      ═══════════════════════════════════════════ */}
      <section id="video" className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">LIVE DEMONSTRATION</p>
          <h2 className="text-3xl font-bold gradient-text">DetectX in Action</h2>
          <p className="mt-2 text-sm text-[#4a5568]">
            Watch real-time Bengali ANPR, fire detection, and weapon sensing running live on Detector V1.
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden group">
          <HudCorners size={18} color="rgba(37,99,235,0.4)" />

          {!videoStarted ? (
            <div className="relative aspect-video cursor-pointer" onClick={() => setVideoStarted(true)}>
              <Image src="/images/detectx2.png" alt="DetectX video thumbnail" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <button
                  onClick={() => setVideoStarted(true)}
                  className="w-20 h-20 rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-110 group-hover:shadow-[0_0_40px_rgba(96,165,250,0.4)]"
                >
                  <Play size={28} className="text-white ml-1" />
                </button>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">DetectX — Live Demo</p>
                  <p className="text-[#a0aec0] text-xs mt-1">Real-time ANPR · Fire Detection · Weapon Sensing</p>
                </div>
              </div>
              {/* HUD overlays on thumbnail */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-[#60a5fa]/50 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  LIVE DETECTION FEED
                </div>
                <div className="flex items-center gap-1.5"><Volume2 size={8} /> AUDIO AVAILABLE</div>
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#60a5fa]/40">
                DETECTX v1.0 · OFFICIAL DEMO
              </div>
              {/* Scan line */}
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/20 to-transparent"
                style={{ animation: "hud-scan 6s linear infinite" }} />
            </div>
          ) : (
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`${YOUTUBE_EMBED}?autoplay=1`}
                title="DetectX Live Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[10px] text-[#a0aec0]">ROBOWAY TECHNOLOGIES</span>
            </div>
            <span className="font-mono text-[10px] text-[#4a5568]">DETECTX · OFFICIAL FOOTAGE</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-8">
        <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a0a0a] via-black to-[#001428] p-10 text-center md:p-14 overflow-hidden">
          <HudCorners size={24} color="rgba(37,99,235,0.4)" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at top center, #60a5fa, transparent 60%)" }} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/15 to-transparent"
              style={{ animation: "hud-scan 8s linear infinite" }} />
          </div>
          <div className="relative">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-3">DEPLOYMENT INQUIRY</p>
            <h3 className="text-2xl font-bold gradient-text sm:text-3xl mb-3">
              Deploy DetectX for Your Organization
            </h3>
            <p className="mx-auto max-w-xl text-sm text-[#a0aec0] leading-relaxed mb-6">
              Whether you need Detector V1 for a small premises or the Enterprise Platform for city-scale
              surveillance, we&apos;ll prepare a tailored deployment plan and live demonstration.
            </p>
            <QuoteRequest projectSlug="detectx-surveillance-system" projectTitle="DetectX" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
