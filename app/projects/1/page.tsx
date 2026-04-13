"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuoteRequest from "@/components/QuoteRequest";
import {
  Activity, Eye, AlertTriangle, UserCheck, Brain, MonitorSmartphone,
  Play, ChevronRight, Shield, HeartPulse, Home, FlaskConical,
  Cpu, Camera, Server, Code2, BarChart3, Bell,
  Zap, Sparkles, ArrowRight,
} from "lucide-react";

/* ── Constants ─────────────────────────────────────────────── */
const COVER =
  "https://pub-5b38ed672e594e3cba36e4d949fbf958.r2.dev/uploads/images/1769910739163-pgu8t9r.png";
const IMG2 =
  "https://pub-5b38ed672e594e3cba36e4d949fbf958.r2.dev/uploads/images/1769910749190-g00rnhc.png";
const ACTION_IMG =
  "https://pub-5b38ed672e594e3cba36e4d949fbf958.r2.dev/uploads/images/1769912110256-87m48rc.png";
const YOUTUBE_EMBED = "https://www.youtube.com/embed/EpDhKz89HVo?autoplay=1&rel=0";
const YOUTUBE_THUMB = COVER;

const BLUE = "rgba(37,99,235,";
const GREEN = BLUE; // alias kept for HUD helpers
const G = (a: number) => `${GREEN}${a})`;

/* ── HUD Corners ───────────────────────────────────────────── */
function HudCorners({ color = G(0.35) }: { color?: string }) {
  const b = `1.5px solid ${color}`;
  const s = "14px";
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ width: s, height: s, borderTop: b, borderLeft: b }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ width: s, height: s, borderTop: b, borderRight: b }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ width: s, height: s, borderBottom: b, borderLeft: b }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ width: s, height: s, borderBottom: b, borderRight: b }} />
    </>
  );
}

/* ── CountUp ───────────────────────────────────────────────── */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 40);
    const id = setInterval(() => {
      start = Math.min(start + step, to);
      setV(start);
      if (start >= to) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [to]);
  return <>{v}{suffix}</>;
}

/* ── Features ──────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Activity,
    title: "Real-Time Pose Estimation",
    desc: "YOLO-Pose skeletal keypoint analysis detects head, torso, and limb positions frame-by-frame at 20–30 FPS per camera stream.",
  },
  {
    icon: AlertTriangle,
    title: "Fall Detection",
    desc: "Instant alerts when a patient falls — seconds of response time saved can be life-critical in ICU or post-operative recovery.",
  },
  {
    icon: Eye,
    title: "Abnormal Movement Detection",
    desc: "Identifies unsafe or unexpected movements including reaching, rolling off-bed, or sudden convulsions with immediate alarm.",
  },
  {
    icon: UserCheck,
    title: "Activity Recognition",
    desc: "Classifies patient states — lying, sitting, standing, walking — enabling automated care logs without manual entry.",
  },
  {
    icon: MonitorSmartphone,
    title: "Zone-Based Logic",
    desc: "Tracks patient entry and exit in defined zones (washroom, bed area) for context-aware event classification.",
  },
  {
    icon: Brain,
    title: "Edge + Cloud Hybrid",
    desc: "Runs inference on edge devices (Jetson Orin / RPi 5) with optional server aggregation for multi-room, multi-patient deployments.",
  },
];

/* ── Hardware Specs ─────────────────────────────────────────── */
const HW = [
  { label: "Edge Device (Recommended)", value: "NVIDIA Jetson Orin Nano / Orin NX" },
  { label: "Alternative Edge", value: "RPi 5 + Hailo / Coral AI Accelerator" },
  { label: "Inference Speed", value: "20–30 FPS per stream" },
  { label: "Camera", value: "IP / USB · min 1080p @ 30 FPS" },
  { label: "Lens", value: "Wide-angle (ICU full-coverage)" },
  { label: "Server (Multi-Room)", value: "Intel i7 / Ryzen 7 · RTX 3060+" },
  { label: "RAM", value: "16–32 GB (server setup)" },
  { label: "Storage", value: "SSD (event image & log archive)" },
];

const SW = [
  { label: "AI Model", value: "YOLO Pose (custom-tuned)" },
  { label: "Backend", value: "Python · OpenCV · PyTorch" },
  { label: "API Layer", value: "FastAPI / Flask" },
  { label: "Dashboard", value: "Web-based · Live video preview" },
  { label: "Alerts", value: "Sound + push notification" },
  { label: "Access Control", value: "Role-based (doctor / nurse / admin)" },
  { label: "Multi-Camera", value: "Supported" },
  { label: "Data", value: "Event snapshots + timeline logs" },
];

/* ── Use Cases ──────────────────────────────────────────────── */
const USE_CASES = [
  {
    icon: HeartPulse,
    title: "Hospitals & ICUs",
    desc: "Continuous monitoring of sedated, post-operative, or high-risk patients. Instant fall detection and self-harm prevention without increasing nurse workload.",
  },
  {
    icon: Shield,
    title: "Elderly Care Centers",
    desc: "24/7 non-intrusive visual monitoring for senior residents — reducing dependency on constant physical supervision while maintaining dignity.",
  },
  {
    icon: Home,
    title: "Home Healthcare",
    desc: "Remote patient monitoring with caregiver notification. Ideal for bedridden patients recovering at home with minimal on-site presence.",
  },
  {
    icon: FlaskConical,
    title: "Medical Research",
    desc: "Longitudinal patient behavior analysis, recovery pattern monitoring, and anonymised clinical data generation for research insights.",
  },
];

/* ── Upgrades ───────────────────────────────────────────────── */
const UPGRADES = [
  { icon: Zap, title: "IoT Patient Bracelet", desc: "Heart rate, SpO₂, and accelerometer data fused with visual pose estimation for unprecedented monitoring accuracy." },
  { icon: Brain, title: "Predictive AI Alerts", desc: "ML models trained on historical event data to anticipate falls and critical incidents seconds before they happen." },
  { icon: BarChart3, title: "Clinical Analytics Suite", desc: "Aggregate patient behaviour data into clinical dashboards for doctor review, audit trails, and outcome research." },
];

/* ── Page ───────────────────────────────────────────────────── */
export default function ICare() {
  const [videoStarted, setVideoStarted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div className="min-h-dvh bg-[#010409] text-white">
      <Navbar />

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden min-h-[92vh] flex items-end">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image src={COVER} alt="i-Care" fill className="object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#010409]/70 via-[#010409]/50 to-[#010409]" />
          {/* Green radial glow */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(37,99,235,0.12), transparent 60%)" }} />
        </div>

        {/* Scan line grid */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Floating HUD badge */}
        <div className="absolute top-28 right-8 hidden lg:flex flex-col gap-2 font-mono text-[10px] text-[#60a5fa]/60">
          <span className="border border-[#60a5fa]/20 bg-[#010409]/80 px-3 py-1.5 rounded backdrop-blur-sm">SYS: ONLINE</span>
          <span className="border border-[#60a5fa]/20 bg-[#010409]/80 px-3 py-1.5 rounded backdrop-blur-sm">AI: ACTIVE</span>
          <span className="border border-[#60a5fa]/20 bg-[#010409]/80 px-3 py-1.5 rounded backdrop-blur-sm">POSE: TRACKING</span>
        </div>

        <div className="mx-auto max-w-6xl w-full px-6 pb-20 pt-40">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 px-4 py-1.5 mb-6"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse" />
            <span className="text-[10px] font-mono text-[#2563eb] tracking-widest">ROBOWAY TECHNOLOGIES · AI HEALTHCARE</span>
          </div>

          {/* Title */}
          <h1
            className="text-5xl font-black sm:text-6xl lg:text-7xl tracking-tight"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s" }}
          >
            i-<span style={{ color: "#2563eb" }}>Care</span>
          </h1>
          <p
            className="mt-3 text-lg font-semibold text-[#a0aec0] sm:text-xl max-w-xl"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: "opacity 0.65s ease 0.18s, transform 0.65s ease 0.18s" }}
          >
            AI-Powered Patient Monitoring System
          </p>
          <p
            className="mt-4 max-w-2xl text-sm text-[#6b7280] leading-relaxed"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.6s ease 0.26s, transform 0.6s ease 0.26s" }}
          >
            Leveraging YOLO-based pose estimation for continuous, real-time surveillance in hospitals and ICUs.
            Detects falls, abnormal movements, and unsafe postures — delivering instant alerts and a centralized
            clinical dashboard to reduce caregiver workload and enhance patient safety.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-wrap items-center gap-3"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.34s" }}
          >
            <a href="#features"
              className="inline-flex items-center gap-2 rounded-full bg-[#2563eb] text-white px-6 py-2.5 text-sm font-bold shadow-[0_0_24px_rgba(37,99,235,0.3)] hover:shadow-[0_0_36px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-0.5">
              Explore Capabilities <ChevronRight size={14} />
            </a>
            <a href="#video"
              className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 text-[#2563eb] px-6 py-2.5 text-sm font-semibold hover:bg-[#2563eb]/10 transition-all duration-200">
              <Play size={14} /> Watch Demo
            </a>
            <QuoteRequest projectSlug="1" projectTitle="i-Care" />
          </div>

          {/* Stats row */}
          <div
            className="mt-12 flex flex-wrap gap-8"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.42s" }}
          >
            {[
              { val: 30, suffix: " FPS", label: "Real-Time Inference" },
              { val: 6, suffix: "+", label: "Detection Modes" },
              { val: 98, suffix: "%", label: "Pose Accuracy" },
              { val: 0, suffix: " Cloud", label: "Privacy First" },
            ].map(({ val, suffix, label }, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-black font-mono text-white">
                  {i === 3 ? "Zero" : <CountUp to={val} suffix={suffix} />}
                </div>
                <div className="text-[10px] font-mono text-[#4a5568] tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Overview ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#2563eb] tracking-widest border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" /> VERSION 01
            </div>
            <h2 className="text-3xl font-black text-white">
              Vision AI That <span style={{ color: "#2563eb" }}>Watches Over</span> Your Patients
            </h2>
            <p className="mt-5 text-sm text-[#a0aec0] leading-7">
              i-Care transforms any standard CCTV or IP camera into an intelligent patient guardian.
              By analyzing skeletal keypoints in real time, the system understands exactly what a patient
              is doing — and immediately raises the alarm when something is wrong.
            </p>
            <p className="mt-4 text-sm text-[#6b7280] leading-7">
              Unlike wearable-based solutions, i-Care requires zero patient compliance. There&apos;s nothing
              to wear, charge, or forget. One camera. Continuous protection.
            </p>

            {/* Key bullets */}
            <ul className="mt-6 space-y-3">
              {[
                "Edge inference — no data leaves the premises",
                "Works on existing hospital CCTV infrastructure",
                "Centralized dashboard for multi-room monitoring",
                "Role-based access: doctor, nurse, admin",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-[#a0aec0]">
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full border border-[#2563eb]/50 bg-[#2563eb]/10 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Image mosaic */}
          <div className="grid grid-cols-2 gap-3 h-[420px]">
            {/* Tall left */}
            <div className="relative rounded-xl overflow-hidden row-span-2 border border-[#2563eb]/10 group">
              <HudCorners color={G(0.25)} />
              <Image src={COVER} alt="i-Care monitoring" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010409]/60 to-transparent" />
              <div className="absolute bottom-3 left-3 font-mono text-[9px] text-[#2563eb]/70">POSE · TRACKING</div>
            </div>
            {/* Top right */}
            <div className="relative rounded-xl overflow-hidden border border-[#2563eb]/10 group">
              <HudCorners color={G(0.2)} />
              <Image src={IMG2} alt="i-Care interface" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010409]/50 to-transparent" />
            </div>
            {/* Bottom right */}
            <div className="relative rounded-xl overflow-hidden border border-[#2563eb]/10 group">
              <HudCorners color={G(0.2)} />
              <Image src={ACTION_IMG} alt="i-Care detection" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010409]/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        {/* Divider */}
        <div className="h-px mb-16 bg-gradient-to-r from-transparent via-[#2563eb]/20 to-transparent" />

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#2563eb] tracking-widest border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1.5 rounded-full mb-4">
            CORE CAPABILITIES
          </div>
          <h2 className="text-3xl font-black text-white">
            What i-Care <span style={{ color: "#2563eb" }}>Detects</span>
          </h2>
          <p className="mt-3 text-sm text-[#6b7280] max-w-xl mx-auto">
            Six layers of AI-powered detection working simultaneously on a single camera stream.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="relative rounded-2xl border border-white/[0.06] bg-[#010409] p-6 overflow-hidden group hover:border-[#2563eb]/25 hover:shadow-[0_0_30px_rgba(37,99,235,0.07)] transition-all duration-300"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.55s ease ${i * 60}ms, transform 0.55s ease ${i * 60}ms` }}
            >
              <HudCorners color={G(0.15)} />
              {/* Scan overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(37,99,235,0.015) 3px, rgba(37,99,235,0.015) 4px)" }} />

              <div className="relative">
                <div
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#2563eb]/20 bg-[#2563eb]/10 text-[#2563eb] mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                >
                  <f.icon size={18} />
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#60a5fa] transition-colors duration-200">
                  {f.title}
                </h3>
                <p className="mt-2 text-xs text-[#6b7280] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Specs ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-white">Technical <span style={{ color: "#2563eb" }}>Architecture</span></h2>
          <p className="mt-3 text-sm text-[#6b7280]">Hardware and software stack powering i-Care&apos;s real-time AI pipeline.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Hardware */}
          <div className="relative rounded-2xl border border-white/[0.07] bg-[#050a14]/80 backdrop-blur-sm p-7 overflow-hidden">
            <HudCorners color={G(0.2)} />
            <div className="flex items-center gap-2 mb-6">
              <Cpu size={16} className="text-[#2563eb]" />
              <span className="text-sm font-bold text-[#2563eb] font-mono tracking-wide">HARDWARE</span>
            </div>
            <dl className="space-y-3">
              {HW.map((it) => (
                <div key={it.label} className="flex justify-between items-start gap-4 border-b border-white/[0.04] pb-2.5 text-xs">
                  <dt className="text-[#4a5568] shrink-0 max-w-[45%]">{it.label}</dt>
                  <dd className="text-right text-white font-mono">{it.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Software */}
          <div className="relative rounded-2xl border border-white/[0.07] bg-[#050a14]/80 backdrop-blur-sm p-7 overflow-hidden">
            <HudCorners color={G(0.2)} />
            <div className="flex items-center gap-2 mb-6">
              <Code2 size={16} className="text-[#2563eb]" />
              <span className="text-sm font-bold text-[#2563eb] font-mono tracking-wide">SOFTWARE</span>
            </div>
            <dl className="space-y-3">
              {SW.map((it) => (
                <div key={it.label} className="flex justify-between items-start gap-4 border-b border-white/[0.04] pb-2.5 text-xs">
                  <dt className="text-[#4a5568] shrink-0 max-w-[45%]">{it.label}</dt>
                  <dd className="text-right text-white font-mono">{it.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Use Cases ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="h-px mb-16 bg-gradient-to-r from-transparent via-[#2563eb]/20 to-transparent" />

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#2563eb] tracking-widest border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1.5 rounded-full mb-4">
            WHERE IT&apos;S USED
          </div>
          <h2 className="text-3xl font-black text-white">
            Real-World <span style={{ color: "#2563eb" }}>Applications</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USE_CASES.map((u, i) => (
            <div
              key={u.title}
              className="relative rounded-2xl border border-white/[0.06] bg-[#010409] p-6 group hover:border-[#2563eb]/25 hover:-translate-y-1 transition-all duration-300"
              style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)", transition: `opacity 0.55s ease ${i * 80}ms, transform 0.55s ease ${i * 80}ms` }}
            >
              <HudCorners color={G(0.12)} />
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] mb-4 group-hover:scale-110 transition-transform duration-300">
                <u.icon size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">{u.title}</h3>
              <p className="mt-2 text-xs text-[#6b7280] leading-relaxed">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Video ───────────────────────────────────────────────── */}
      <section id="video" className="mx-auto max-w-5xl px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white">
            See i-Care <span style={{ color: "#2563eb" }}>In Action</span>
          </h2>
          <p className="mt-3 text-sm text-[#6b7280]">Watch the live pose estimation and event detection demo.</p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#2563eb]/15 bg-[#050a14]">
          <HudCorners color={G(0.3)} />
          {!videoStarted ? (
            <div
              className="relative aspect-video cursor-pointer group"
              onClick={() => setVideoStarted(true)}
            >
              <Image src={YOUTUBE_THUMB} alt="i-Care demo" fill className="object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010409]/80" />
              {/* Animated grid */}
              <div className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: "linear-gradient(rgba(37,99,235,1) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#2563eb]/20 animate-ping" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#2563eb] shadow-[0_0_40px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-300">
                    <Play size={28} className="text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-[#2563eb]/70">
                CLICK TO PLAY · i-CARE DEMO
              </div>
            </div>
          ) : (
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={YOUTUBE_EMBED}
                title="i-Care Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </section>

      {/* ── Future Upgrades ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="h-px mb-16 bg-gradient-to-r from-transparent via-[#2563eb]/20 to-transparent" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-mono text-[#2563eb] tracking-widest border border-[#2563eb]/20 bg-[#2563eb]/5 px-3 py-1.5 rounded-full mb-5">
              <Sparkles size={10} /> ROADMAP
            </div>
            <h2 className="text-3xl font-black text-white">
              i-Care <span style={{ color: "#2563eb" }}>Version 02</span>
            </h2>
            <p className="mt-4 text-sm text-[#6b7280] leading-7">
              The next evolution fuses visual AI with physiological sensing — merging YOLO pose data
              with real-time biometrics from a smart patient bracelet for near-perfect incident prediction.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-[#2563eb] font-semibold hover:gap-3 transition-all duration-200 cursor-pointer">
              Learn about the roadmap <ArrowRight size={14} />
            </div>
          </div>

          <div className="space-y-4">
            {UPGRADES.map((u, i) => (
              <div
                key={u.title}
                className="relative flex items-start gap-4 rounded-xl border border-white/[0.06] bg-[#010409] p-5 hover:border-[#2563eb]/20 transition-all duration-300 group"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(16px)", transition: `opacity 0.55s ease ${i * 100}ms, transform 0.55s ease ${i * 100}ms` }}
              >
                <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/20 flex items-center justify-center text-[#2563eb] group-hover:scale-110 transition-transform duration-300">
                  <u.icon size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{u.title}</h3>
                  <p className="mt-1 text-xs text-[#6b7280]">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="h-px mb-14 bg-gradient-to-r from-transparent via-[#2563eb]/20 to-transparent" />
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white">i-Care <span style={{ color: "#2563eb" }}>in Action</span></h2>
          <p className="mt-3 text-sm text-[#6b7280]">Real detection outputs from live hospital environments.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#2563eb]/10 group sm:col-span-2">
            <HudCorners color={G(0.2)} />
            <Image src={COVER} alt="Patient monitoring" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#010409]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 font-mono text-xs text-[#2563eb]/80">LIVE MONITORING</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative flex-1 rounded-xl overflow-hidden border border-[#2563eb]/10 group">
              <HudCorners color={G(0.15)} />
              <Image src={IMG2} alt="Detection interface" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative flex-1 rounded-xl overflow-hidden border border-[#2563eb]/10 group">
              <HudCorners color={G(0.15)} />
              <Image src={ACTION_IMG} alt="Pose estimation output" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-4">
        <div className="relative overflow-hidden rounded-3xl border border-[#2563eb]/15 bg-gradient-to-br from-[#010409] via-[#011020] to-[#010409] p-12 text-center">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(37,99,235,0.10), transparent 65%)" }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(37,99,235,1) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
          <HudCorners color={G(0.25)} />

          <div className="relative">
            <HeartPulse size={32} className="mx-auto mb-5 text-[#2563eb]" />
            <h3 className="text-3xl font-black text-white sm:text-4xl">
              Deploy i-Care in Your Facility
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[#6b7280] leading-relaxed">
              Works with your existing cameras. No wearables required. Get a custom deployment proposal
              tailored to your ward layout and patient monitoring requirements.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
              <QuoteRequest projectSlug="1" projectTitle="i-Care" />
              <a href="/innovations"
                className="inline-flex items-center gap-2 text-sm text-[#2563eb] border border-[#2563eb]/30 px-6 py-2.5 rounded-full hover:bg-[#2563eb]/10 transition-all duration-200">
                View All Products <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
