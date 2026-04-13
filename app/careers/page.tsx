import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { jobs } from "@/data/jobs";
import connectDB from "@/lib/mongodb";
import Career from "@/models/Career";

async function getCareers() {
  try {
    await connectDB();
    const careers = await Career.find({}).sort({ createdAt: -1 }).lean();
    if (careers.length > 0) {
      return careers;
    }
  } catch {
    // Fallback to static data
  }
  return jobs;
}

export default async function Careers() {
  const careers = await getCareers();
  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <section className="max-w-3xl mx-auto text-center px-6 pt-12 pb-10">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Join Our Mission.
          </h2>
          <p className="text-[#a0aec0] mb-8 text-lg leading-relaxed">
            Be part of an ambitious team shaping the future of robotics and artificial intelligence.
            At <span className="text-[#60a5fa] font-semibold">Roboway Technologies</span>, we&apos;re driven
            by innovation, collaboration, and a passion for creating groundbreaking solutions that
            transform industries and improve lives.
          </p>
          <a href="#openings" className="mt-4 inline-block px-8 py-3 rounded-full bg-white text-black font-semibold transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.03]">
            Explore Open Positions
          </a>
        </section>

        <section id="openings" className="mx-auto max-w-7xl px-6 pb-20">
          <div className="text-center">
            <h3 className="text-2xl font-semibold gradient-text">Open Roles</h3>
            <p className="mt-2 text-sm text-[#4a5568]">We hire across robotics, AI, and embedded systems.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {careers.map((job) => (
              <Link
                key={job.slug}
                href={`/careers/${job.slug}`}
                className="group rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 transition-all duration-300 hover:border-[#2563eb]/30 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base font-semibold text-white">{job.title}</h4>
                    <div className="mt-1 text-xs text-[#4a5568]">
                      {job.location} &bull; {job.type}
                    </div>
                  </div>
                  <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-[#60a5fa] font-mono">Apply</span>
                </div>
                <p className="mt-3 text-sm text-[#a0aec0]">{job.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
