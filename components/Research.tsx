"use client";

import dynamic from "next/dynamic";
import NeonCard from "@/components/ui/NeonCard";
import ScanLine from "@/components/ui/ScanLine";
import TypeWriter from "@/components/ui/TypeWriter";

const DataStream = dynamic(() => import("@/components/ui/DataStream"), { ssr: false });

export default function Research() {
  return (
    <section id="research" className="mx-auto max-w-7xl px-6 py-24">
      <NeonCard className="relative overflow-hidden p-10" hud>
        <DataStream columns={10} opacity={0.02} speed={80} />
        <ScanLine speed={10} color="rgba(37, 99, 235, 0.03)" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold gradient-text sm:text-4xl">Research & Vision</h2>
          <div className="mt-3 h-[2px] w-16 animate-pulse-glow rounded-full bg-[#2563eb]" />
          <div className="mt-6 max-w-3xl text-[#a0aec0] leading-relaxed font-mono text-sm">
            <TypeWriter
              text="Pushing the Boundaries of Intelligent Systems and Autonomous Robotics. We explore perception, embodied intelligence, human–robot interaction, and resilient autonomy to create systems that thrive in complex, real-world environments."
              speed={15}
              delay={300}
            />
          </div>
        </div>
      </NeonCard>
    </section>
  );
}
