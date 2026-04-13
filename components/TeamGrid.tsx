import Image from "next/image";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import type { ProjectTeamMember } from "@/data/projects";

export default function TeamGrid({ team }: { team?: ProjectTeamMember[] }) {
  if (!team || team.length === 0) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((m) => (
        <div
          key={m.name}
          className="rounded-xl border border-white/[0.08] bg-black/50 p-4"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/[0.08] bg-white/10">
              {m.image ? (
                <Image src={m.image} alt={m.name} fill className="object-cover" />
              ) : null}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{m.name}</div>
              {m.role ? (
                <div className="text-xs text-[#4a5568]">{m.role}</div>
              ) : null}
            </div>
            <div className="ml-auto flex items-center gap-3 text-[#4a5568]">
              {m.socials?.linkedin ? (
                <a href={m.socials.linkedin} aria-label="LinkedIn" className="hover:text-[#60a5fa]">
                  <FaLinkedin />
                </a>
              ) : null}
              {m.socials?.github ? (
                <a href={m.socials.github} aria-label="GitHub" className="hover:text-[#60a5fa]">
                  <FaGithub />
                </a>
              ) : null}
              {m.socials?.twitter ? (
                <a href={m.socials.twitter} aria-label="Twitter/X" className="hover:text-[#60a5fa]">
                  <FaXTwitter />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
