"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { team as fallbackTeam } from "@/data/team";

type TeamMember = typeof fallbackTeam[number];

export default function TeamSection() {
  const [items, setItems] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        if (res.ok && Array.isArray(data.team) && data.team.length > 0) {
          setItems(data.team);
        }
      } catch {
        // fallback
      }
    };
    load();
  }, []);

  return (
    <section id="team" className="mx-auto max-w-7xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Our Team</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300">
          A small, ambitious group of builders pushing robotics and AI forward.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <Link
            key={m.slug}
            href={`/team/${m.slug}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0f1620] p-6 transition hover:border-[#3b82f6]/40"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10 bg-white/10">
                <Image src={m.image || "/window.svg"} alt={m.name} fill className="object-cover" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{m.name}</div>
                <div className="text-xs text-zinc-400">{m.title}</div>
              </div>
              <div className="ml-auto flex items-center gap-3 text-zinc-400">
                {m.socials?.linkedin ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (m.socials?.linkedin) {
                        window.open(m.socials.linkedin, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    aria-label="LinkedIn"
                    className="hover:text-white"
                  >
                    <FaLinkedin />
                  </button>
                ) : null}
                {m.socials?.github ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (m.socials?.github) {
                        window.open(m.socials.github, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    aria-label="GitHub"
                    className="hover:text-white"
                  >
                    <FaGithub />
                  </button>
                ) : null}
                {m.socials?.twitter ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      if (m.socials?.twitter) {
                        window.open(m.socials.twitter, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    aria-label="Twitter/X"
                    className="hover:text-white"
                  >
                    <FaXTwitter />
                  </button>
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


