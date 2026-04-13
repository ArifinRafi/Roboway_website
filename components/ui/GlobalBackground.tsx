"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ParticleBackground = dynamic(() => import("@/components/ui/ParticleBackground"), { ssr: false });

export default function GlobalBackground() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <ParticleBackground density={60} color="#3b82f6" />

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[15%] h-[800px] w-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(30,58,95,0.025) 40%, transparent 70%)",
            animation: "float-orb-1 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-[10%] -right-[15%] h-[700px] w-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.04) 0%, rgba(37,99,235,0.02) 40%, transparent 70%)",
            animation: "float-orb-2 30s ease-in-out infinite",
          }}
        />
        <div
          className="absolute top-[30%] left-[50%] h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.03) 0%, rgba(30,58,95,0.015) 40%, transparent 70%)",
            animation: "float-orb-3 20s ease-in-out infinite",
          }}
        />
      </div>

      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-x-0 h-[25%]"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(37, 99, 235, 0.02) 50%, transparent 100%)",
            animation: "hud-scan 10s linear infinite",
          }}
        />
      </div>

      <div
        className="fixed inset-0 -z-10 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          animation: "grid-scroll 30s linear infinite",
        }}
      />
    </>
  );
}
