"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { team } from "@/data/team";

export default function TeamSection() {
  return (
    <section id="team" className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Our Team</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300">
          A small, ambitious group of builders pushing robotics and AI forward.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((m) => (
          <Link
            key={m.slug}
            href={`/team/${m.slug}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0f1620] p-6 transition hover:border-[#3b82f6]/40"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10 bg-white/10">
                <Image src={m.image} alt={m.name} fill className="object-cover" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{m.name}</div>
                <div className="text-xs text-zinc-400">{m.title}</div>
              </div>
              <div className="ml-auto flex items-center gap-3 text-zinc-400">
                {m.socials?.linkedin ? (
                  <a onClick={(e) => e.stopPropagation()} href={m.socials.linkedin} aria-label="LinkedIn" className="hover:text-white">
                    <FaLinkedin />
                  </a>
                ) : null}
                {m.socials?.github ? (
                  <a onClick={(e) => e.stopPropagation()} href={m.socials.github} aria-label="GitHub" className="hover:text-white">
                    <FaGithub />
                  </a>
                ) : null}
                {m.socials?.twitter ? (
                  <a onClick={(e) => e.stopPropagation()} href={m.socials.twitter} aria-label="Twitter/X" className="hover:text-white">
                    <FaXTwitter />
                  </a>
                ) : null}
              </div>
            </div>
            {m.summary ? (
              <p className="mt-4 text-xs leading-6 text-zinc-300">
                {m.summary}
              </p>
            ) : null}
          </Link>
        ))}
      </div>
    </section>
  );
}


