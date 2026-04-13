"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground({
  density = 60,
  color = "#3b82f6",
  className = "",
}: {
  density?: number;
  color?: string;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;
  if (typeof window !== "undefined" && window.innerWidth < 640) return null;

  return (
    <Particles
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      options={{
        fpsLimit: 30,
        particles: {
          number: { value: isMobile ? Math.floor(density * 0.4) : density, density: { enable: true } },
          color: { value: color },
          opacity: { value: { min: 0.08, max: 0.2 } },
          size: { value: { min: 1, max: 2.5 } },
          move: { enable: true, speed: 0.5, direction: "none", outModes: { default: "out" } },
          links: { enable: !isMobile, distance: 180, color, opacity: 0.07, width: 1 },
        },
        detectRetina: true,
      }}
    />
  );
}
