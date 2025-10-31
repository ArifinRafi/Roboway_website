import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobs } from "@/data/jobs";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return {};
  return { title: `${job.title} | Careers | Roboway` };
}

export default async function JobDetail({ params }: Params) {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return notFound();

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <section className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-white/10 bg-[#0f1620] p-8">
            <h1 className="text-2xl font-bold text-white">{job.title}</h1>
            <div className="mt-1 text-xs text-zinc-400">{job.location} • {job.type}</div>
            <p className="mt-4 text-sm text-zinc-300">{job.summary}</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#1a1f26] p-5">
                <h2 className="text-sm font-semibold text-white">Responsibilities</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-zinc-300">
                  {job.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#1a1f26] p-5">
                <h2 className="text-sm font-semibold text-white">Requirements</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-zinc-300">
                  {job.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {job.benefits && job.benefits.length > 0 ? (
              <div className="mt-6 rounded-xl border border-white/10 bg-[#1a1f26] p-5">
                <h2 className="text-sm font-semibold text-white">Benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-zinc-300">
                  {job.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-8 text-center">
              <a href="mailto:careers@roboway.example.com" className="rounded-full bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-white">Apply Now</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


