import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { team as fallbackTeam } from "@/data/team";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) return {};
  return { title: `${member.name} | Team | Roboway` };
}

export default async function TeamMemberPage({ params }: Params) {
  const { slug } = await params;
  const member = await getTeamMember(slug);
  if (!member) return notFound();

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <div className="rounded-2xl border border-white/10 bg-[#0f1620] p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                <Image src={member.image || "/window.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{member.name}</h1>
                <div className="text-sm text-zinc-400">{member.title}</div>
              </div>
            </div>

            {member.summary ? (
              <p className="mt-6 text-sm text-zinc-300">{member.summary}</p>
            ) : null}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {member.education && member.education.length ? (
                <div className="rounded-xl border border-white/10 bg-[#1a1f26] p-5">
                  <h2 className="text-sm font-semibold text-white">Education</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-zinc-300">
                    {member.education.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {member.expertise && member.expertise.length ? (
                <div className="rounded-xl border border-white/10 bg-[#1a1f26] p-5">
                  <h2 className="text-sm font-semibold text-white">Expertise</h2>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-zinc-300">
                    {member.expertise.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

async function getTeamMember(slug: string) {
  const fallback = fallbackTeam.find((m) => m.slug === slug);
  try {
    await connectDB();
    const member = await TeamMember.findOne({ slug }).lean();
    return member || fallback;
  } catch {
    return fallback;
  }
}


