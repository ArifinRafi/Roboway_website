"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequest from "@/components/QuoteRequest";
import {
  Plane, Eye, Shield, Navigation, AlertTriangle, TreePine, Car,
  Cpu, Battery, Camera, Wifi, Radio, ChevronRight, Play, Volume2
} from "lucide-react";

/* ─── CountUp ─────────────────────────────────── */
function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(step);
          else setCount(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── HUD Corner Brackets ─────────────────────── */
function HudCorners({ size = 16, color = "rgba(96,165,250,0.6)" }: { size?: number; color?: string }) {
  const s = `${size}px`;
  const style = { borderColor: color };
  return (
    <>
      <span className="absolute top-0 left-0" style={{ width: s, height: s, borderTop: `1.5px solid`, borderLeft: `1.5px solid`, ...style }} />
      <span className="absolute top-0 right-0" style={{ width: s, height: s, borderTop: `1.5px solid`, borderRight: `1.5px solid`, ...style }} />
      <span className="absolute bottom-0 left-0" style={{ width: s, height: s, borderBottom: `1.5px solid`, borderLeft: `1.5px solid`, ...style }} />
      <span className="absolute bottom-0 right-0" style={{ width: s, height: s, borderBottom: `1.5px solid`, borderRight: `1.5px solid`, ...style }} />
    </>
  );
}

/* ─── Typing Text ─────────────────────────────── */
function TypeWriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, text, delay]);

  return (
    <span ref={ref}>
      {displayed}
      <span className="animate-blink">|</span>
    </span>
  );
}

const IMAGES = [
  "/images/tanvin1.jpeg",
  "/images/tanvin2.jpeg",
  "/images/tanvin3.jpeg",
  "/images/tanvin4.jpeg",
  "/images/tanvin5.jpeg",
];

const GALLERY_LABELS = [
  "In Flight",
  "Structural Design",
  "Field Deployment",
  "Ground Operations",
  "Mission Ready",
];

export default function TanvinPage() {
  const [videoStarted, setVideoStarted] = useState(false);

  return (
    <div className="min-h-dvh bg-[#010409] text-white overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative isolate min-h-[90vh] flex items-end pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMAGES[0]}
            alt="Tanvin Mini 1.0"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010409] via-[#010409]/70 to-[#010409]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#010409]/60 via-transparent to-[#010409]/40" />
          {/* Blue atmospheric glow */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(37,99,235,0.12), transparent 60%)" }} />
        </div>

        {/* HUD scan line */}
        <div className="absolute inset-x-0 h-[2px] pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.4), transparent)", animation: "hud-scan 8s linear infinite" }} />

        {/* HUD top-right readout */}
        <div className="absolute top-24 right-6 md:right-12 font-mono text-[10px] text-[#60a5fa]/50 space-y-1 text-right pointer-events-none">
          <div className="animate-pulse-glow">SYS :: ONLINE</div>
          <div>ALT :: 450m AGL</div>
          <div>LAT :: 23.8103° N</div>
          <div>LNG :: 90.4125° E</div>
          <div className="text-[#60a5fa]/30">TANVIN-MINI-1.0</div>
        </div>

        {/* HUD bottom-left mission status */}
        <div className="absolute bottom-24 left-6 md:left-12 font-mono text-[10px] text-[#60a5fa]/50 space-y-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>MISSION :: ACTIVE</span>
          </div>
          <div>SPEED :: 85 km/h</div>
          <div>SIGNAL :: STRONG</div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 w-full">
          {/* Dedication badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#60a5fa]/20 bg-[#1e3a5f]/20 backdrop-blur-sm px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
            <span className="text-[11px] font-mono text-[#60a5fa]">IN MEMORY OF MARTYR JAHIDUZZAMAN TANVIN</span>
          </div>

          <h1 className="text-5xl font-bold sm:text-7xl tracking-tight">
            <span className="block text-white">TANVIN</span>
            <span className="block gradient-text">MINI 1.0</span>
          </h1>
          <p className="mt-3 text-[#a0aec0] text-lg font-light tracking-widest uppercase">
            VTOL Surveillance Drone
          </p>
          <p className="mt-4 max-w-xl text-sm text-[#a0aec0]/80 leading-relaxed">
            Advanced vertical take-off and landing drone engineered for multi-agency surveillance,
            real-time AI object detection, and autonomous long-range operations.
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["VTOL", "Surveillance", "AI Vision", "PX4 Firmware", "Autonomous Nav", "ANPR"].map((tag) => (
              <span key={tag} className="font-mono text-[10px] text-[#60a5fa]/70 border border-[#1e3a5f]/60 rounded px-2.5 py-1 bg-[#010409]/60 backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-8">
            {[
              { label: "TRANSMISSION RANGE", val: 10, suffix: " km" },
              { label: "PAYLOAD CAPACITY", val: 5, suffix: " kg" },
              { label: "CAMERA RESOLUTION", val: 20, suffix: " MP" },
              { label: "BATTERY", val: 12000, suffix: " mAh" },
            ].map(({ label, val, suffix }) => (
              <div key={label} className="min-w-[80px]">
                <div className="text-2xl font-bold font-mono text-white">
                  <CountUp end={val} suffix={suffix} />
                </div>
                <div className="text-[9px] font-mono text-[#4a5568] mt-0.5 tracking-widest">{label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#specifications"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-sm font-semibold transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Explore Specs <ChevronRight size={14} />
            </a>
            <a href="#video"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 text-white px-6 py-2.5 text-sm font-semibold backdrop-blur-sm transition-all hover:border-white/40">
              <Play size={14} /> Watch in Action
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          DEDICATION SECTION
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="relative rounded-2xl border border-[#1e3a5f]/40 bg-gradient-to-br from-[#0a0a0a] to-[#001428]/60 overflow-hidden">
          <HudCorners size={20} color="rgba(37,99,235,0.4)" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06), transparent 70%)" }} />

          {/* Tribute photo — full width on top */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden">
            <Image
              src="/images/tribute.jpg"
              alt="Martyr Jahiduzzaman Tanvin"
              fill
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#010409]/30 to-transparent" />
            {/* Scan line */}
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/20 to-transparent"
              style={{ animation: "hud-scan 8s linear infinite" }} />
          </div>

          {/* Text content below photo */}
          <div className="relative flex flex-col sm:flex-row gap-5 items-start p-8 md:p-10">
            <div className="shrink-0 w-10 h-10 rounded-full border border-[#60a5fa]/30 bg-[#1e3a5f]/30 flex items-center justify-center text-lg">
              🕊️
            </div>
            <div>
              <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">DEDICATION</p>
              <h2 className="text-xl font-bold text-white mb-3">In Memory of Martyr Jahiduzzaman Tanvin</h2>
              <p className="text-sm text-[#a0aec0] leading-relaxed">
                This project is dedicated in loving memory of <span className="text-white font-medium">Martyr Jahiduzzaman Tanvin</span>,
                whose name lives on through this innovation. Tanvin Mini 1.0 was conceived as more than
                a technological achievement — it is a tribute to those who gave everything for a better future.
                May his legacy inspire generations of engineers and innovators to build systems that protect,
                serve, and uplift humanity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          OVERVIEW — WHAT IS TANVIN MINI 1.0
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">PROJECT OVERVIEW</p>
            <h2 className="text-3xl font-bold text-white mb-4">
              <TypeWriter text="Next-Gen VTOL Intelligence Platform" />
            </h2>
            <p className="text-sm text-[#a0aec0] leading-relaxed mb-4">
              Tanvin Mini 1.0 is a purpose-built VTOL (Vertical Take-Off and Landing) surveillance drone
              designed for high-performance multi-agency operations. The platform integrates a pusher motor
              configuration that dramatically extends flight endurance while maintaining VTOL flexibility.
            </p>
            <p className="text-sm text-[#a0aec0] leading-relaxed mb-6">
              Equipped with an NVIDIA Jetson Nano 8GB onboard computer, the drone runs advanced AI models
              including YOLO Tiny for real-time object detection and SSD MobileNet for classification — all
              processed at the edge without cloud dependency. The custom BengalX Flight Operations UI provides
              operators with a full-featured ground control station.
            </p>
            <div className="space-y-3">
              {[
                "VTOL with pusher motor for extended range and endurance",
                "GPS-based autonomous navigation with full auto-pilot",
                "Real-time encrypted video + telemetry up to 10 km",
                "On-board AI with Jetson Nano — no cloud required",
                "PX4 firmware with encrypted MAVLink protocol",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-[#a0aec0]">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#60a5fa] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] aspect-square bg-black/20">
              <Image src={IMAGES[1]} alt="Tanvin structural view" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/10 to-transparent" />
              <HudCorners size={20} color="rgba(37,99,235,0.5)" />
              {/* Corner data overlays */}
              <div className="absolute top-3 left-3 font-mono text-[9px] text-[#60a5fa]/60 space-y-0.5">
                <div>FRAME :: CARBON FIBER</div>
                <div>WEIGHT :: OPTIMIZED</div>
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[9px] text-[#60a5fa]/60 text-right space-y-0.5">
                <div>DESIGN :: AERODYNAMIC</div>
                <div>STATUS :: OPERATIONAL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          AI COMPUTER VISION
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        {/* Background tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/40 to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">AI INTELLIGENCE STACK</p>
            <h2 className="text-3xl font-bold gradient-text">On-Board Computer Vision</h2>
            <p className="mt-2 text-sm text-[#4a5568] max-w-xl mx-auto">
              All AI inference runs locally on the Jetson Nano 8GB — real-time, private, and reliable even in denied-communications environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "YOLO Tiny Detection",
                subtitle: "Real-time object detection",
                desc: "Lightweight YOLO Tiny model optimized for edge inference. Detects and classifies objects, vehicles, and personnel in real time at 30+ FPS on the Jetson Nano.",
                badge: "OBJECT DETECTION",
                stat: "30+ FPS",
              },
              {
                icon: Cpu,
                title: "SSD MobileNet",
                subtitle: "Classification + tracking",
                desc: "SSD MobileNet architecture provides multi-class detection with efficient bounding box regression. Runs concurrently with YOLO for layered detection confidence.",
                badge: "MULTI-CLASS AI",
                stat: "HIGH ACCURACY",
              },
              {
                icon: Camera,
                title: "Bengali ANPR System",
                subtitle: "98.5% license plate precision",
                desc: "Custom-trained Automatic Number Plate Recognition model for Bengali script license plates. Achieves 98.5% precision in real-world conditions for law enforcement use.",
                badge: "ANPR",
                stat: "98.5%",
              },
            ].map(({ icon: Icon, title, subtitle, desc, badge, stat }) => (
              <div key={title}
                className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 group hover:border-[#2563eb]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] overflow-hidden">
                <HudCorners size={14} color="rgba(96,165,250,0.25)" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/20 to-transparent"
                    style={{ animation: "hud-scan 3s linear infinite" }} />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa]">
                    <Icon size={18} />
                  </div>
                  <span className="font-mono text-[9px] text-[#60a5fa]/50 border border-[#1e3a5f]/40 rounded px-2 py-0.5">{badge}</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white mb-1">{stat}</div>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-[11px] text-[#60a5fa]/60 font-mono mb-3">{subtitle}</p>
                <p className="text-xs text-[#a0aec0] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          KEY FEATURES
      ═══════════════════════════════════════════ */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">PLATFORM CAPABILITIES</p>
          <h2 className="text-3xl font-bold gradient-text">Key Features</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Plane, title: "VTOL Capability", desc: "Vertical take-off and landing with pusher motor for extended range. No runway required — deploy anywhere.", color: "#60a5fa" },
            { icon: Eye, title: "AI Computer Vision", desc: "YOLO + SSD MobileNet on Jetson Nano 8GB for real-time object detection, tracking, and ANPR.", color: "#60a5fa" },
            { icon: Shield, title: "Multi-Agency Use", desc: "Designed for military, civilian, disaster response, wildlife, and law enforcement applications.", color: "#60a5fa" },
            { icon: Navigation, title: "Autonomous Nav", desc: "GPS-based autonomous flight with full auto-pilot: takeoff, landing, waypoint missions, and RTH.", color: "#60a5fa" },
            { icon: Wifi, title: "10 km Encrypted Link", desc: "Long-range encrypted video and telemetry transmission. Stable signal with redundancy.", color: "#60a5fa" },
            { icon: Radio, title: "BengalX GUI", desc: "Custom ground control station UI designed for operational efficiency and situational awareness.", color: "#60a5fa" },
            { icon: Battery, title: "Extended Endurance", desc: "12,000 mAh LiPo with optimized power management. 70-minute charge cycle for rapid deployment.", color: "#60a5fa" },
            { icon: Camera, title: "20 MP Optics", desc: "High-resolution camera with 10X optical zoom for detailed visual intelligence gathering at altitude.", color: "#60a5fa" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title}
              className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-5 group hover:border-[#2563eb]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)]">
              <HudCorners size={12} color="rgba(96,165,250,0.2)" />
              <div className="w-9 h-9 rounded-lg bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa] mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon size={16} />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
              <p className="text-xs text-[#a0aec0] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TECHNICAL SPECIFICATIONS
      ═══════════════════════════════════════════ */}
      <section id="specifications" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">ENGINEERING DATA</p>
          <h2 className="text-3xl font-bold gradient-text">Technical Specifications</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hardware */}
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 overflow-hidden">
            <HudCorners size={16} color="rgba(37,99,235,0.4)" />
            <div className="flex items-center gap-2 mb-6">
              <Cpu size={14} className="text-[#60a5fa]" />
              <span className="text-xs font-mono text-[#60a5fa] tracking-widest">HARDWARE SPECS</span>
            </div>
            <dl className="space-y-3">
              {[
                { label: "Drone Type", value: "VTOL with Pusher Motor" },
                { label: "Transmission Range", value: "10 km" },
                { label: "External Payload", value: "5 KG capacity" },
                { label: "Battery", value: "12,000 mAh Li-Po" },
                { label: "Camera", value: "20 MP · 10X Optical Zoom" },
                { label: "Onboard Computer", value: "Jetson Nano 8GB" },
                { label: "Body Material", value: "PLA / Carbon Fiber" },
                { label: "Charger", value: "B6 Li-Po · ~70 min" },
              ].map(({ label, value }, i) => (
                <div key={label}
                  className="flex justify-between items-center gap-4 py-2 border-b border-white/[0.04] last:border-0"
                  style={{ animationDelay: `${i * 50}ms` }}>
                  <dt className="text-xs text-[#4a5568]">{label}</dt>
                  <dd className="text-xs text-white font-mono text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Software */}
          <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 overflow-hidden">
            <HudCorners size={16} color="rgba(37,99,235,0.4)" />
            <div className="flex items-center gap-2 mb-6">
              <Radio size={14} className="text-[#60a5fa]" />
              <span className="text-xs font-mono text-[#60a5fa] tracking-widest">SOFTWARE STACK</span>
            </div>
            <dl className="space-y-3">
              {[
                { label: "Ground Control UI", value: "BengalX Flight Ops UI" },
                { label: "Flight Firmware", value: "PX4 + Encrypted MAVLink" },
                { label: "Operating System", value: "Ubuntu 20.04 LTS" },
                { label: "AI / ML Models", value: "YOLO Tiny · SSD MobileNet" },
                { label: "ANPR Precision", value: "98.5% (Bengali plates)" },
                { label: "Navigation Mode", value: "GPS Autonomous + Auto-pilot" },
              ].map(({ label, value }, i) => (
                <div key={label}
                  className="flex justify-between items-center gap-4 py-2 border-b border-white/[0.04] last:border-0"
                  style={{ animationDelay: `${i * 50}ms` }}>
                  <dt className="text-xs text-[#4a5568]">{label}</dt>
                  <dd className="text-xs text-white font-mono text-right">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Extra stats grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "ANPR PRECISION", val: 98, suffix: "%" },
                { label: "AI MODELS", val: 2, suffix: "+" },
              ].map(({ label, val, suffix }) => (
                <div key={label} className="rounded-xl border border-white/[0.06] bg-[#1e3a5f]/10 p-3 text-center">
                  <div className="text-xl font-bold font-mono text-white">
                    <CountUp end={val} suffix={suffix} />
                  </div>
                  <div className="text-[9px] font-mono text-[#4a5568] mt-1 tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          USE CASES / MULTI-AGENCY APPLICATIONS
      ═══════════════════════════════════════════ */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001428]/30 to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">MISSION APPLICATIONS</p>
            <h2 className="text-3xl font-bold gradient-text">Multi-Agency Use Cases</h2>
            <p className="mt-2 text-sm text-[#4a5568] max-w-xl mx-auto">
              Tanvin Mini 1.0 is built for versatile deployment across defense, civilian, and emergency response agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Shield,
                title: "Border & Military Surveillance",
                desc: "Army and coast guard operations for border monitoring, anti-terror reconnaissance, and threat detection along sensitive perimeters.",
                agency: "MILITARY · BORDER FORCES",
              },
              {
                icon: AlertTriangle,
                title: "Disaster Response & Rescue",
                desc: "Flood zone mapping, search-and-rescue coordination, and real-time situational awareness for civil defense and NDRF teams.",
                agency: "DISASTER MGMT · NDRF",
              },
              {
                icon: TreePine,
                title: "Wildlife & Forest Monitoring",
                desc: "Forest department operations: wildlife tracking, illegal logging surveillance, poaching prevention, and wildfire early detection.",
                agency: "FOREST DEPT · WILDLIFE",
              },
              {
                icon: Car,
                title: "Traffic & Law Enforcement",
                desc: "Urban aerial surveillance, real-time traffic monitoring, crowd control support, and vehicle ANPR for law enforcement.",
                agency: "POLICE · TRAFFIC AUTH",
              },
            ].map(({ icon: Icon, title, desc, agency }) => (
              <div key={title}
                className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 group hover:border-[#2563eb]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.08)] overflow-hidden">
                <HudCorners size={12} color="rgba(96,165,250,0.2)" />
                <div className="w-10 h-10 rounded-xl bg-[#1e3a5f]/30 border border-white/10 flex items-center justify-center text-[#60a5fa] mb-4 transition-all duration-300 group-hover:bg-[#1e3a5f]/50">
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
          IN ACTION — FULL GALLERY
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">FIELD DOCUMENTATION</p>
          <h2 className="text-3xl font-bold gradient-text">Tanvin in Action</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {IMAGES.map((src, i) => (
            <div
              key={i}
              className={`relative group overflow-hidden rounded-2xl border border-white/[0.08] transition-all duration-300 hover:border-[#2563eb]/40 hover:shadow-[0_0_24px_rgba(37,99,235,0.15)] ${
                i === 0 ? "col-span-2 aspect-video" : "aspect-square"
              }`}
            >
              <Image src={src} alt={GALLERY_LABELS[i]} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <HudCorners size={12} color="rgba(96,165,250,0.3)" />
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs font-semibold text-white">{GALLERY_LABELS[i]}</p>
                <p className="text-[10px] font-mono text-[#60a5fa]/60">TANVIN MINI 1.0 · {String(i + 1).padStart(2, "0")}</p>
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
          <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-2">MISSION FOOTAGE</p>
          <h2 className="text-3xl font-bold gradient-text">Watch Tanvin Mini 1.0 in Flight</h2>
          <p className="mt-2 text-sm text-[#4a5568]">See the VTOL capabilities, AI detection, and autonomous navigation in real-world conditions.</p>
        </div>

        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0a0a] overflow-hidden group">
          <HudCorners size={18} color="rgba(37,99,235,0.4)" />

          {!videoStarted ? (
            /* Thumbnail / play gate */
            <div className="relative aspect-video cursor-pointer" onClick={() => setVideoStarted(true)}>
              <Image src={IMAGES[0]} alt="Video thumbnail" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <button
                  className="w-20 h-20 rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:border-white hover:scale-110 group-hover:shadow-[0_0_40px_rgba(96,165,250,0.4)]"
                  onClick={() => setVideoStarted(true)}
                >
                  <Play size={28} className="text-white ml-1" />
                </button>
                <div className="text-center">
                  <p className="text-white font-semibold text-sm">Tanvin Mini 1.0 — Flight Demo</p>
                  <p className="text-[#a0aec0] text-xs mt-1">Click to watch on YouTube</p>
                </div>
              </div>
              {/* HUD overlay on thumbnail */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-[#60a5fa]/50 space-y-1">
                <div className="flex items-center gap-1.5"><Volume2 size={8} /> AUDIO AVAILABLE</div>
                <div>DURATION :: FULL FLIGHT</div>
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#60a5fa]/40">
                TANVIN MINI 1.0 · FLIGHT FOOTAGE
              </div>
            </div>
          ) : (
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/YWxIL7rYQ10?autoplay=1"
                title="Tanvin Mini 1.0 Flight Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.05] bg-[#0a0a0a]">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-[10px] text-[#a0aec0]">ROBOWAY TECHNOLOGIES</span>
            </div>
            <span className="font-mono text-[10px] text-[#4a5568]">TANVIN MINI 1.0 · OFFICIAL FOOTAGE</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA / QUOTE
      ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a0a0a] via-black to-[#001428] p-10 text-center md:p-14 overflow-hidden">
          <HudCorners size={24} color="rgba(37,99,235,0.4)" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at top center, #60a5fa, transparent 60%)" }} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/15 to-transparent"
              style={{ animation: "hud-scan 8s linear infinite" }} />
          </div>
          <div className="relative">
            <p className="text-[11px] font-mono text-[#60a5fa]/60 tracking-widest mb-3">PROCUREMENT INQUIRY</p>
            <h3 className="text-2xl font-bold gradient-text sm:text-3xl mb-3">
              Deploy Tanvin Mini 1.0 for Your Agency
            </h3>
            <p className="mx-auto max-w-xl text-sm text-[#a0aec0] leading-relaxed mb-6">
              Interested in deploying Tanvin Mini 1.0 for surveillance, disaster response, or law enforcement?
              Contact us for a tailored proposal, live demonstration, and configuration options.
            </p>
            <QuoteRequest projectSlug="tanvin-vtol-drone" projectTitle="Tanvin Mini 1.0" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
