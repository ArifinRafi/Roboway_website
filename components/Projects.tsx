"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import NeonCard from "@/components/ui/NeonCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, Tag } from "lucide-react";

function BlinkDot({ on }: { on: boolean }) {
  return (
    <span
      className="inline-block w-[5px] h-[5px] rounded-full bg-[#60a5fa] transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0.15 }}
    />
  );
}

export default function Projects() {
  const [tick, setTick] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setTick((v) => !v), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
      <SectionHeading title="Products & Projects" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => {
          const isFeatured = i < 2;
          const code = `RW-${String(i + 1).padStart(3, "0")}`;
          const loadPct = 55 + (i * 13) % 40;

          return (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/projects/${p.slug}`}>
                <NeonCard className="group h-full overflow-hidden" hud={isFeatured}>
                  {/* ── Cover image with HUD overlay ── */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#050a14]">
                    {/* Base image */}
                    <Image
                      src={p.coverImage}
                      alt={p.title}
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

                    {/* Sweep line on hover */}
                    <div
                      className="absolute left-0 right-0 h-[1px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        top: "40%",
                        background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.7), transparent)",
                        boxShadow: "0 0 6px rgba(96,165,250,0.4)",
                        animation: "hudSweep 2s linear infinite",
                      }}
                    />

                    {/* Image HUD corners */}
                    <span className="absolute top-2.5 left-2.5 w-4 h-4 pointer-events-none" style={{ borderTop: "1.5px solid rgba(96,165,250,0.6)", borderLeft: "1.5px solid rgba(96,165,250,0.6)" }} />
                    <span className="absolute top-2.5 right-2.5 w-4 h-4 pointer-events-none" style={{ borderTop: "1.5px solid rgba(96,165,250,0.6)", borderRight: "1.5px solid rgba(96,165,250,0.6)" }} />
                    <span className="absolute bottom-2.5 left-2.5 w-4 h-4 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.6)", borderLeft: "1.5px solid rgba(96,165,250,0.6)" }} />
                    <span className="absolute bottom-2.5 right-2.5 w-4 h-4 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.6)", borderRight: "1.5px solid rgba(96,165,250,0.6)" }} />

                    {/* Top HUD bar */}
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

                    {/* Crosshair on hover */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="relative w-10 h-10">
                        <span className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#60a5fa]/35" />
                        <span className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#60a5fa]/35" />
                        <span className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#60a5fa]/50" />
                      </div>
                    </div>

                    {/* Bottom status bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 px-4 pt-6 pb-2.5 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(1,4,9,0.9), transparent)" }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="flex-1 h-[1.5px] bg-white/[0.06] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${loadPct}%`,
                              background: "linear-gradient(90deg, #1d4ed8, #60a5fa)",
                              boxShadow: "0 0 4px rgba(96,165,250,0.5)",
                            }}
                          />
                        </div>
                        <span className="font-mono text-[7px] text-[#60a5fa]/50 w-8 text-right">{loadPct}%</span>
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

                  {/* ── Content ── */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-[#60a5fa] transition-colors duration-200">
                          {p.title}
                          {p.subtitle ? <span className="ml-2 text-xs font-normal text-[#4a5568] font-mono">{p.subtitle}</span> : null}
                        </h3>
                      </div>
                      <span className="font-mono text-[8px] text-[#2563eb]/30 tracking-widest mt-1 flex-shrink-0">{code}</span>
                    </div>
                    <p className="mt-2 text-sm text-[#a0aec0] line-clamp-2">{p.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t, ti) => (
                        <motion.span
                          key={t}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + ti * 0.05 }}
                          className="inline-flex items-center gap-1 rounded-full border border-[#1e3a5f]/60 px-2.5 py-1 text-[10px] text-[#60a5fa]/70 font-mono bg-[#1e3a5f]/10 transition-colors hover:bg-white/5"
                        >
                          <Tag size={7} />{t}
                        </motion.span>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm text-[#60a5fa]/50 group-hover:text-[#60a5fa] transition-colors duration-200">
                        <span>View details</span>
                        <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                      <span className="font-mono text-[7px] text-[#2563eb]/25 tracking-widest">ROBOWAY</span>
                    </div>
                  </div>
                </NeonCard>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
