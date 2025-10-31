import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { jobs } from "@/data/jobs";

export default function Careers() {
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <section className="max-w-3xl mx-auto text-center px-6 pt-12 pb-10">
          <h2 className="text-4xl font-bold mb-4 text-[#3b82f6]">
            Join Our Mission.
          </h2>
          <p className="text-zinc-300 mb-8 text-lg leading-relaxed">
            Be part of an ambitious team shaping the future of robotics and artificial intelligence.
            At <span className="text-[#60a5fa] font-semibold">Roboway Technologies</span>, we’re driven
            by innovation, collaboration, and a passion for creating groundbreaking solutions that
            transform industries and improve lives. If you're ready to push boundaries and make a
            real impact, we want to hear from you.
          </p>
          <a href="#openings" className="mt-4 inline-block px-8 py-3 rounded-full bg-[#3b82f6] text-white font-medium transition hover:brightness-110">
            Explore Open Positions
          </a>
        </section>

        <section id="openings" className="mx-auto max-w-7xl px-6 pb-16">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white">Open Roles</h3>
            <p className="mt-2 text-sm text-zinc-400">We hire across robotics, AI, and embedded systems.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {jobs.map((job) => (
              <Link
                key={job.slug}
                href={`/careers/${job.slug}`}
                className="rounded-2xl border border-white/10 bg-[#1a1f26] p-6 transition hover:border-[#3b82f6]/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base font-semibold text-white">{job.title}</h4>
                    <div className="mt-1 text-xs text-zinc-400">
                      {job.location} • {job.type}
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-zinc-300">Apply</span>
                </div>
                <p className="mt-3 text-sm text-zinc-300">{job.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
