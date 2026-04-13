"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { ArrowRight, Tag } from "lucide-react";

/* --- HUD corners -------------------------------- */
function HudCorners({ color = "rgba(96,165,250,0.3)" }: { color?: string }) {
  const border = `1.5px solid ${color}`;
  const s = "14px";
  return (
    <>
      <span className="absolute top-0 left-0 pointer-events-none" style={{ width: s, height: s, borderTop: border, borderLeft: border }} />
      <span className="absolute top-0 right-0 pointer-events-none" style={{ width: s, height: s, borderTop: border, borderRight: border }} />
      <span className="absolute bottom-0 left-0 pointer-events-none" style={{ width: s, height: s, borderBottom: border, borderLeft: border }} />
      <span className="absolute bottom-0 right-0 pointer-events-none" style={{ width: s, height: s, borderBottom: border, borderRight: border }} />
    </>
  );
}

/* --- Blinking dot ------------------------------- */
function BlinkDot({ on }: { on: boolean }) {
  return (
    <span
      className="inline-block w-[5px] h-[5px] rounded-full bg-[#60a5fa] transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0.15 }}
    />
  );
}

/* --- Product card ------------------------------- */
function ProductCard({ project, index, visible, tick }: { project: Project; index: number; visible: boolean; tick: boolean }) {
  const isFeatured = index < 2;
  const delay = `${index * 70}ms`;
  const code = `RW-${String(index + 1).padStart(3, "0")}`;

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ease ${delay}, transform 0.55s ease ${delay}`,
      }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full group">
        <div className="relative h-full rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 overflow-hidden transition-all duration-300 hover:border-[#2563eb]/40 hover:shadow-[0_8px_40px_rgba(37,99,235,0.12)] hover:-translate-y-1">
          <HudCorners color={isFeatured ? "rgba(37,99,235,0.5)" : "rgba(96,165,250,0.2)"} />

          {/* -- Cover image with HUD overlay -- */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#050a14]">
            {/* Base image */}
            <Image
              src={project.coverImage || "/images/logo.png"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Blue tint */}
            <div className="absolute inset-0 bg-[#030d1f]/30 group-hover:bg-[#030d1f]/20 transition-colors duration-300" />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.045]"
              style={{
                backgroundImage: "linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* CRT scan lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,1) 2px, rgba(0,0,0,1) 4px)" }}
            />

            {/* Sweep line - visible on hover */}
            <div
              className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                top: "40%",
                background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.7), transparent)",
                boxShadow: "0 0 6px rgba(96,165,250,0.4)",
                animation: "hudSweep 2s linear infinite",
              }}
            />

            {/* -- HUD corners on image -- */}
            <span className="absolute top-2.5 left-2.5 w-4 h-4 pointer-events-none" style={{ borderTop: "1.5px solid rgba(96,165,250,0.6)", borderLeft: "1.5px solid rgba(96,165,250,0.6)" }} />
            <span className="absolute top-2.5 right-2.5 w-4 h-4 pointer-events-none" style={{ borderTop: "1.5px solid rgba(96,165,250,0.6)", borderRight: "1.5px solid rgba(96,165,250,0.6)" }} />
            <span className="absolute bottom-2.5 left-2.5 w-4 h-4 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.6)", borderLeft: "1.5px solid rgba(96,165,250,0.6)" }} />
            <span className="absolute bottom-2.5 right-2.5 w-4 h-4 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.6)", borderRight: "1.5px solid rgba(96,165,250,0.6)" }} />

            {/* -- Top HUD bar -- */}
            <div
              className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-3 pb-6 pointer-events-none"
              style={{ background: "linear-gradient(to bottom, rgba(1,4,9,0.75), transparent)" }}
            >
              <div className="flex items-center gap-1.5">
                <BlinkDot on={tick} />
                <span className="font-mono text-[8px] text-[#60a5fa]/60 tracking-widest">ACTIVE</span>
              </div>
              <span className="font-mono text-[8px] text-[#60a5fa]/40 tracking-widest">{code}</span>
              {isFeatured && (
                <span className="font-mono text-[8px] text-white bg-[#2563eb]/70 border border-[#2563eb]/50 px-2 py-0.5 rounded-full tracking-wider backdrop-blur-sm">
                  FEATURED
                </span>
              )}
            </div>

            {/* -- Crosshair - hover only -- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              <div className="relative w-10 h-10">
                <span className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#60a5fa]/35" />
                <span className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#60a5fa]/35" />
                <span className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#60a5fa]/50" />
              </div>
            </div>

            {/* -- Bottom status bar -- */}
            <div
              className="absolute bottom-0 left-0 right-0 px-4 pt-6 pb-2.5 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(1,4,9,0.9), transparent)" }}
            >
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="flex-1 h-[1.5px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${55 + (index * 13) % 40}%`,
                      background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
                      boxShadow: "0 0 4px rgba(96,165,250,0.5)",
                    }}
                  />
                </div>
                <span className="font-mono text-[7px] text-[#60a5fa]/50 w-8 text-right">
                  {55 + (index * 13) % 40}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[7px] text-[#4a5568] tracking-widest">SYS LOAD</span>
                <div className="flex items-center gap-1">
                  <BlinkDot on={!tick} />
                  <span className="font-mono text-[7px] text-[#60a5fa]/40 tracking-widest">ONLINE</span>
                </div>
              </div>
            </div>
          </div>

          {/* -- Content -- */}
          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#60a5fa] transition-colors duration-200">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="mt-0.5 text-[10px] text-[#4a5568] font-mono">{project.subtitle}</p>
                )}
              </div>
              <span className="font-mono text-[8px] text-[#2563eb]/30 tracking-widest mt-0.5 flex-shrink-0">{code}</span>
            </div>

            <p className="mt-2 text-xs text-[#a0aec0] leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((t) => (
                  <span key={t} className="inline-flex items-center gap-1 font-mono text-[8px] text-[#60a5fa]/60 border border-[#1e3a5f]/50 rounded px-2 py-0.5 bg-[#1e3a5f]/10">
                    <Tag size={6} />{t}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="font-mono text-[8px] text-[#4a5568] px-1">+{project.tags.length - 4}</span>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#60a5fa]/50 group-hover:text-[#60a5fa] transition-colors duration-200">
                <span>View details</span>
                <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
              <span className="font-mono text-[7px] text-[#2563eb]/25 tracking-widest">ROBOWAY</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* --- Page ---------------------------------------- */
export default function Innovations() {
  const [items, setItems] = useState<Project[]>(projects);
  const [ready, setReady] = useState(false);
  const [tick, setTick]   = useState(false);

  useEffect(
    () => {
      const t = requestAnimationFrame(() => setReady(true));
      const blink = setInterval(() => setTick((v) => !v), 1000);

      fetch("/api/innovations")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (Array.isArray(data?.innovations) && data.innovations.length > 0) {
            setItems((current) => {
              const merged = [...current];
              for (const apiItem of data.innovations) {
                if (!merged.find((p: Project) => p.slug === apiItem.slug)) {
                  merged.push(apiItem);
                }
              }
              return merged;
            });
          }
        })
        .catch(() => {});

      return () => {
        cancelAnimationFrame(t);
        clearInterval(blink);
      };
    },
    []
  );

  return (
    <div className="min-h-dvh bg-[#010409]">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* -- Page hero -- */}
        <div className="mx-auto max-w-7xl px-6 mb-16 text-center relative">
          <div className="absolute inset-x-0 top-0 h-40 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.10), transparent 70%)" }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/50 bg-[#1e3a5f]/10 px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#60a5fa] animate-pulse" />
              <span className="text-[11px] font-mono text-[#60a5fa] tracking-widest">ROBOWAY TECHNOLOGIES</span>
            </div>
            <h1 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl tracking-tight">
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="mt-4 mx-auto max-w-2xl text-sm text-[#a0aec0] leading-relaxed">
              Groundbreaking robotics and AI systems engineered for real-world impact -
              from autonomous drones to intelligent surveillance ecosystems.
            </p>

            {/* Stats */}
            <div className="mt-8 flex items-center justify-center gap-8 flex-wrap">
              {[
                { val: items.length, label: "Products" },
                { val: "3+",         label: "Categories" },
                { val: "8+",         label: "Industry Clients" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-black font-mono text-white">{val}</div>
                  <div className="text-[10px] font-mono text-[#4a5568] tracking-widest mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* -- Grid -- */}
        <div className="mx-auto max-w-7xl px-6">
          {/* Scan-line divider */}
          <div className="relative h-px mb-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60a5fa]/40 to-transparent"
              style={{ animation: "hud-scan 4s linear infinite" }} />
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((project, i) => (
              <ProductCard
                key={project.slug}
                project={project}
                index={i}
                visible={ready}
                tick={tick}
              />
            ))}
          </div>

          <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          <p className="mt-8 text-center text-xs text-[#4a5568] font-mono">
            MORE PRODUCTS IN DEVELOPMENT - ROBOWAY TECHNOLOGIES - {new Date().getFullYear()}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
