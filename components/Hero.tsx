"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import GlowText from "@/components/ui/GlowText";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import HudOverlay from "@/components/ui/HudOverlay";
import ScanLine from "@/components/ui/ScanLine";
import TypeWriter from "@/components/ui/TypeWriter";

const HeroScene = dynamic(() => import("@/components/ui/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10">
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1e3a5f]/20 blur-[80px] animate-pulse" />
    </div>
  ),
});

const DataStream = dynamic(() => import("@/components/ui/DataStream"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[90dvh] items-center justify-center pt-20 overflow-hidden">
      <AnimatedBackground variant="hero" />
      <HeroScene />
      <DataStream columns={6} opacity={0.03} />
      <ScanLine speed={8} color="rgba(37, 99, 235, 0.04)" />
      <HudOverlay />

      <div className="mx-auto max-w-5xl px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Innovating the Future with{" "}
          <GlowText color="#60a5fa">Robotics</GlowText>,{" "}
          <GlowText color="#60a5fa">AI</GlowText>, and{" "}
          <GlowText color="#60a5fa">Automation</GlowText>.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#a0aec0] font-mono"
        >
          <TypeWriter
            text="Roboway Technologies builds intelligent robotic systems, embedded IoT platforms, and modern software that power the next generation of automation."
            speed={20}
            delay={800}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-7 py-3.5 font-mono text-[11px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_24px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
            <span className="relative">Explore Projects</span>
          </Link>
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/[0.12] px-7 py-3.5 font-mono text-[11px] tracking-widest text-[#a0aec0] uppercase transition-all duration-300 hover:border-[#2563eb]/40 hover:text-white hover:bg-[#2563eb]/[0.06] hover:-translate-y-0.5"
          >
            <span className="relative">Contact Us</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={24} className="text-[#60a5fa]/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
