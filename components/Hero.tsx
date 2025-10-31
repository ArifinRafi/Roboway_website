"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[90dvh] items-center justify-center pt-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_45%)]" />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
        >
          Innovating the Future with Robotics, AI, and Automation.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-300"
        >
          Roboway Technologies builds intelligent robotic systems, embedded IoT platforms,
          and modern software that power the next generation of automation.
        </motion.p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="#projects"
            className="rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3b82f6]/30 transition-transform hover:scale-[1.02]"
          >
            Explore Projects
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-white hover:border-zinc-500"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}


