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
          className="rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-white/10">
              {m.image ? (
                <Image src={m.image} alt={m.name} fill className="object-cover" />
              ) : null}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{m.name}</div>
              {m.role ? (
                <div className="text-xs text-zinc-400">{m.role}</div>
              ) : null}
            </div>
            <div className="ml-auto flex items-center gap-3 text-zinc-400">
              {m.socials?.linkedin ? (
                <a href={m.socials.linkedin} aria-label="LinkedIn" className="hover:text-white">
                  <FaLinkedin />
                </a>
              ) : null}
              {m.socials?.github ? (
                <a href={m.socials.github} aria-label="GitHub" className="hover:text-white">
                  <FaGithub />
                </a>
              ) : null}
              {m.socials?.twitter ? (
                <a href={m.socials.twitter} aria-label="Twitter/X" className="hover:text-white">
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


