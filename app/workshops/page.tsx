import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/mongodb";
import Workshop from "@/models/Workshop";

const defaultWorkshops = [
  { title: "Satellite Workshop", slug: "satellite-workshop", description: "Hands-on CubeSat design fundamentals." },
];

async function getWorkshops() {
  try {
    await connectDB();
    const workshops = await Workshop.find({ isActive: true })
      .sort({ createdAt: -1 })
      .select({ title: 1, slug: 1, description: 1, _id: 0 })
      .lean();
    if (workshops.length > 0) return workshops;
  } catch {
    // fallback
  }
  return defaultWorkshops;
}

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <section className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-3xl font-bold text-white">Workshops</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Choose a workshop to view details and register.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {workshops.map((w: { title: string; slug: string; description?: string }) => (
              <Link
                key={w.slug}
                href={`/workshops/${w.slug}`}
                className="rounded-2xl border border-white/10 bg-[#0f1620] p-6 transition hover:border-[#3b82f6]/40"
              >
                <h2 className="text-lg font-semibold text-white">{w.title}</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  {w.description || "Learn more about this workshop."}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
