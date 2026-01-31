import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectGallery from "@/components/ProjectGallery";
import TeamGrid from "@/components/TeamGrid";
import { projects } from "@/data/projects";
import Image from "next/image";
import * as Icons from "lucide-react";
import connectDB from "@/lib/mongodb";
import Innovation from "@/models/Innovation";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Roboway Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return notFound();

  const videoEmbed = getYouTubeEmbedUrl(project.videoUrl);
  const heroImage = project.coverImage || project.gallery?.[0] || "/window.svg";

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        {/* Hero with background image */}
        <section className="relative isolate">
          <div className="absolute inset-0 -z-10">
            <Image src={heroImage} alt={project.title} fill className="object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
          </div>
          <div className="mx-auto max-w-5xl px-6 py-16 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">{project.title}</h1>
            {project.subtitle ? (
              <p className="mt-2 text-zinc-300">{project.subtitle}</p>
            ) : null}
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-300">{project.description}</p>
            <div className="mt-6 flex items-center justify-center gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/15 px-2 py-1 text-[10px] text-zinc-300">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6">
              <a href="#features" className="rounded-full bg-[#3b82f6] px-5 py-2 text-sm font-semibold text-white">Discover {project.title.split(" ")[0]}'s Capabilities</a>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Key Features</h2>
            <p className="mt-2 text-sm text-zinc-400">Discover the core innovations that make {project.title} a leader.</p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(project.features ?? project.tags.map((t) => ({ title: t, description: "", icon: undefined }))).map((f) => {
              const Icon = (f.icon ? (Icons as any)[f.icon as keyof typeof Icons] : null) ?? Icons.Sparkles;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/10 bg-[#1a1f26] p-6 shadow-sm transition hover:shadow-md hover:border-[#3b82f6]/40"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                    {Icon ? <Icon size={18} /> : null}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-white">{f.title}</h3>
                  {f.description ? (
                    <p className="mt-2 text-xs leading-6 text-zinc-300">{f.description}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mx-auto max-w-7xl px-6 py-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Technical Specifications</h2>
            <p className="mt-2 text-sm text-zinc-400">In‑depth details about the hardware and software architecture.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#1f2937] p-5">
              <div className="text-sm font-semibold text-white">Hardware</div>
              <dl className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-300">
                {(project.specsHardware ?? []).map((it) => (
                  <div key={it.label} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                    <dt className="text-zinc-400">{it.label}</dt>
                    <dd className="text-right">{it.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#1f2937] p-5">
              <div className="text-sm font-semibold text-white">Software</div>
              <dl className="mt-3 grid grid-cols-1 gap-2 text-xs text-zinc-300">
                {(project.specsSoftware ?? []).map((it) => (
                  <div key={it.label} className="flex justify-between gap-4 border-b border-white/5 pb-2">
                    <dt className="text-zinc-400">{it.label}</dt>
                    <dd className="text-right">{it.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {videoEmbed ? (
          <section className="mx-auto max-w-7xl px-6 py-10">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">Project Video</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Watch a short highlight of this innovation.
              </p>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={videoEmbed}
                  title={`${project.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        ) : null}

        {/* Use Cases */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Use Cases</h2>
            <p className="mt-2 text-sm text-zinc-400">Where {project.title} excels.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {(project.useCases ?? []).map((u) => (
              <div key={u.title} className="rounded-xl border border-white/10 bg-[#2b2f36] p-5">
                <h3 className="text-sm font-semibold text-white">{u.title}</h3>
                <p className="mt-2 text-xs text-zinc-300">{u.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pixi in Action / Gallery */}
        {(() => {
          const rawGallery =
            project.actionGallery && project.actionGallery.length > 0
              ? project.actionGallery
              : (project.gallery ?? []).slice(0, 3).map((src) => ({ title: "", image: src }));
          const actionGallery = rawGallery.filter((item) => Boolean(item.image));

          if (actionGallery.length === 0) return null;

          return (
            <section className="mx-auto max-w-7xl px-6 py-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white">{project.title.split(" ")[0]} in Action</h2>
                <p className="mt-2 text-sm text-zinc-400">A closer look in real‑world scenarios.</p>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {actionGallery.map((item, index) => (
                  <div key={index} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[#3b82f6]/40">
                      <Image src={item.image} alt={item.title || "action"} fill className="object-cover" />
                    </div>
                    {item.title ? (
                      <h3 className="mt-3 text-center text-sm font-semibold text-white">{item.title}</h3>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Future Upgrades */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white">Future Upgrades</h2>
            <p className="mt-2 text-sm text-zinc-400">Our commitment to continuous innovation.</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {(project.upgrades ?? []).map((u) => (
              <div key={u.title} className="rounded-xl border border-white/10 bg-[#2b2f36] p-5">
                <h3 className="text-sm font-semibold text-white">{u.title}</h3>
                <p className="mt-2 text-xs text-zinc-300">{u.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team (keep same) */}
        <section className="mx-auto max-w-7xl px-6 pb-10">
          <h2 className="text-lg font-semibold text-white">Team</h2>
          <div className="mt-3">
            <TeamGrid team={project.team} />
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <h3 className="text-base font-semibold text-white">Ready to Experience the Future?</h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-300">
              Contact us to learn more about {project.title} and how it can benefit your organization or home.
            </p>
            <a href="/#contact" className="mt-4 inline-block rounded-full bg-[#3b82f6] px-5 py-2 text-sm font-semibold text-white">
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

async function getProjectBySlug(slug: string) {
  const fallback = projects.find((p) => p.slug === slug);
  try {
    await connectDB();
    const project = await Innovation.findOne({ slug }).lean();
    return project || fallback;
  } catch {
    return fallback;
  }
}

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.replace("/", "")}`;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}


