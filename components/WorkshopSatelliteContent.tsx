"use client";

/* ─────────────────────────────────────────────────────────────────
   CanSat Workshop content is temporarily hidden.
   Uncomment the block below when the workshop is reopened.
───────────────────────────────────────────────────────────────── */

/*
import Image from "next/image";
import WorkshopRegistrationForm from "@/components/WorkshopRegistrationForm";

const highlights = [
  { title: "Organizer", value: "Roboway Technologies" },
  { title: "Program", value: "Productive Ramadan: Let's Make a Satellite" },
  { title: "Venue", value: "Dacca House, 7D, Tropical Alauddin Tower, Sector 3, Uttara, Dhaka 1230" },
  { title: "Event Dates & Time", value: "Starts: 20 February 2026 (2nd Ramadan) · 12:00 PM – 4:00 PM (Daily)" },
];

const gallery = [
  { src: "/images/underwater-rov.svg", alt: "Satellite model" },
  { src: "/images/pixi-humanoid.svg", alt: "Workshop activity" },
  { src: "/images/autonomous-rc.svg", alt: "Expected outcomes" },
];

export default function WorkshopSatelliteContent() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">CanSat Workshop</h1>
          ... (full content) ...
        </div>
        <WorkshopRegistrationForm />
      </div>
    </section>
  );
}
*/

import { useEffect, useState } from "react";
import { Satellite, Clock, Bell, ChevronRight } from "lucide-react";

function HudCorners({ color = "rgba(37,99,235,0.35)" }: { color?: string }) {
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

export default function WorkshopSatelliteContent() {
  const [tick, setTick] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setTick((v) => !v), 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 flex flex-col items-center text-center">
      {/* Satellite icon with pulse */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-[#2563eb]/10 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#2563eb]/30 bg-[#0a0a0a]">
          <Satellite size={32} className="text-[#60a5fa]" />
        </div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 px-4 py-1.5 mb-6">
        <span className={`w-1.5 h-1.5 rounded-full bg-[#60a5fa] transition-opacity duration-700 ${tick ? "opacity-100" : "opacity-30"}`} />
        <span className="text-[10px] font-mono text-[#60a5fa] tracking-widest">SATELLITE WORKSHOP · STATUS: PENDING</span>
      </div>

      <h2 className="text-3xl font-black text-white sm:text-4xl mb-4">
        Will Be <span className="gradient-text">Announced Soon</span>
      </h2>
      <p className="text-sm text-[#4a5568] max-w-md leading-relaxed">
        The CanSat Workshop details are currently being finalized. Stay tuned for updates on dates, venue, and registration.
      </p>

      <div className="mt-10 relative rounded-2xl border border-white/[0.07] bg-[#0a0a0a]/80 px-10 py-8">
        <HudCorners />
        <div className="flex items-center gap-3 text-[#4a5568] text-xs font-mono">
          <Clock size={14} className="text-[#2563eb]/60" />
          <span>CHECK BACK LATER · ROBOWAY TECHNOLOGIES</span>
        </div>
      </div>
    </section>
  );
}
