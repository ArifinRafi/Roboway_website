"use client";

import { motion } from "framer-motion";

const hudItems = [
  { text: "SYS::ONLINE", position: "top-left" },
  { text: "LAT 23.8103 // LNG 90.4125", position: "top-right" },
  { text: "ROBOWAY TECH v2.0", position: "bottom-left" },
  { text: "STATUS::ACTIVE", position: "bottom-right" },
];

export default function HudOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`}>
      {hudItems.map((item, i) => {
        const isTop = item.position.includes("top");
        const isLeft = item.position.includes("left");
        return (
          <motion.div
            key={item.position}
            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.2, duration: 0.6 }}
            className={`absolute flex items-center gap-2 ${
              isTop ? "top-6" : "bottom-6"
            } ${isLeft ? "left-6" : "right-6"}`}
          >
            {isLeft && (
              <div className="h-px w-6 bg-gradient-to-r from-[#2563eb]/60 to-transparent" />
            )}
            <span className="font-mono text-[10px] tracking-widest text-[#60a5fa]/40 uppercase">
              {item.text}
            </span>
            {!isLeft && (
              <div className="h-px w-6 bg-gradient-to-l from-[#2563eb]/60 to-transparent" />
            )}
          </motion.div>
        );
      })}

      {/* Corner lines */}
      <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-[#2563eb]/30 to-transparent" />
      <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-[#2563eb]/30 to-transparent" />
      <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-[#2563eb]/30 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-[#2563eb]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-20 h-px bg-gradient-to-r from-[#2563eb]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-px h-20 bg-gradient-to-t from-[#2563eb]/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-[#2563eb]/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-[#2563eb]/30 to-transparent" />
    </div>
  );
}
