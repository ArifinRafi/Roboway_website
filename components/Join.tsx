import Link from "next/link";

export default function Join() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#111111] to-[#0f172a] p-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold text-white">Join Our Mission</h3>
            <p className="mt-2 max-w-2xl text-zinc-300">
              We collaborate with researchers, engineers, and learners. Reach out for
              partnerships, internships, and open roles.
            </p>
          </div>
          <Link
            href="#contact"
            className="rounded-full bg-[#3b82f6] px-5 py-3 text-sm font-semibold text-white"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}


