"use client";

import { useEffect, useRef } from "react";

export default function DataStream({
  columns = 8,
  opacity = 0.04,
  speed = 50,
  className = "",
}: {
  columns?: number;
  opacity?: number;
  speed?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "0123456789ABCDEF";
    const fontSize = 12;
    let drops: number[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      w = canvas.parentElement?.clientWidth || 800;
      h = canvas.parentElement?.clientHeight || 600;
      canvas.width = w;
      canvas.height = h;
      const colCount = columns;
      const spacing = w / colCount;
      drops = Array.from({ length: colCount }, () => Math.random() * h / fontSize);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = `rgba(96, 165, 250, ${opacity * 5})`;
      ctx.font = `${fontSize}px monospace`;

      const spacing = w / columns;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * spacing + spacing / 2, drops[i] * fontSize);

        if (drops[i] * fontSize > h && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
    };

    const interval = setInterval(draw, speed);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, [columns, opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
    />
  );
}
