import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamGrid from "@/components/TeamGrid";
import QuoteRequest from "@/components/QuoteRequest";
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
  const heroImage = project.coverImage || project.gallery?.[0] || "/images/logo.png";

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        {/* Hero with background image */}
        <section className="relative isolate">
          <div className="absolute inset-0 -z-10">
            <Image src={heroImage} alt={project.title} fill className="object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top, rgba(37, 99, 235, 0.08), transparent 60%)" }} />
          </div>
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">{project.title}</h1>
            {project.subtitle ? (
              <p className="mt-2 text-[#a0aec0]">{project.subtitle}</p>
            ) : null}
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[#a0aec0]">{project.description}</p>
            <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-[#60a5fa]/80 font-mono">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#features" className="rounded-full bg-white text-black px-6 py-2.5 text-sm font-semibold shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                Discover {project.title.split(" ")[0]}&apos;s Capabilities
              </a>
              <QuoteRequest projectSlug={project.slug} projectTitle={project.title} />
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold gradient-text">Key Features</h2>
            <p className="mt-2 text-sm text-[#4a5568]">Discover the core capabilities that make {project.title} a leader.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(project.features ?? project.tags.map((t) => ({ title: t, description: "", icon: undefined }))).map((f) => {
              const Icon = (f.icon ? (Icons as any)[f.icon as keyof typeof Icons] : null) ?? Icons.Sparkles;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 transition-all duration-300 hover:border-[#2563eb]/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)] hover:-translate-y-0.5"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e3a5f]/20 text-[#60a5fa] border border-white/10">
                    {Icon ? <Icon size={18} /> : null}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-white">{f.title}</h3>
                  {f.description ? (
                    <p className="mt-2 text-xs leading-6 text-[#a0aec0]">{f.description}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold gradient-text">Technical Specifications</h2>
            <p className="mt-2 text-sm text-[#4a5568]">In-depth details about the hardware and software architecture.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6">
              <div className="text-sm font-semibold text-[#60a5fa]">Hardware</div>
              <dl className="mt-4 grid grid-cols-1 gap-3 text-xs">
                {(project.specsHardware ?? []).map((it) => (
                  <div key={it.label} className="flex justify-between gap-4 border-b border-white/[0.03] pb-2">
                    <dt className="text-[#4a5568]">{it.label}</dt>
                    <dd className="text-right text-white font-mono">{it.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6">
              <div className="text-sm font-semibold text-[#60a5fa]">Software</div>
              <dl className="mt-4 grid grid-cols-1 gap-3 text-xs">
                {(project.specsSoftware ?? []).map((it) => (
                  <div key={it.label} className="flex justify-between gap-4 border-b border-white/[0.03] pb-2">
                    <dt className="text-[#4a5568]">{it.label}</dt>
                    <dd className="text-right text-white font-mono">{it.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {videoEmbed ? (
          <section className="mx-auto max-w-7xl px-6 py-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold gradient-text">Project Video</h2>
              <p className="mt-2 text-sm text-[#4a5568]">Watch a short highlight of this innovation.</p>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a]/50">
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
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold gradient-text">Use Cases</h2>
            <p className="mt-2 text-sm text-[#4a5568]">Where {project.title} excels.</p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(project.useCases ?? []).map((u) => {
              const Icon = (u.icon ? (Icons as any)[u.icon as keyof typeof Icons] : null) ?? Icons.Sparkles;
              return (
                <div key={u.title} className="rounded-xl border border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md p-6 transition-all duration-300 hover:border-white/15">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a5f]/20 text-[#60a5fa] mb-3">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-white">{u.title}</h3>
                  <p className="mt-2 text-xs text-[#a0aec0]">{u.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* In Action / Gallery */}
        {(() => {
          const rawGallery =
            project.actionGallery && project.actionGallery.length > 0
              ? project.actionGallery
              : (project.gallery ?? []).slice(0, 3).map((src) => ({ title: "", image: src }));
          const actionGallery = rawGallery.filter((item) => Boolean(item.image));

          if (actionGallery.length === 0) return null;

          return (
            <section className="mx-auto max-w-7xl px-6 py-10">
              <div className="text-center">
                <h2 className="text-2xl font-bold gradient-text">{project.title.split(" ")[0]} in Action</h2>
                <p className="mt-2 text-sm text-[#4a5568]">A closer look in real-world scenarios.</p>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {actionGallery.map((item, index) => (
                  <div key={index} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/[0.08] transition-all duration-300 hover:border-[#2563eb]/30 hover:shadow-[0_0_20px_rgba(37,99,235,0.1)]">
                      <Image src={item.image} alt={item.title || "action"} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
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

        {/* Team */}
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <h2 className="text-lg font-semibold gradient-text">Team</h2>
          <div className="mt-4">
            <TeamGrid team={project.team} />
          </div>
        </section>

        {/* Quotation CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0a0a0a] via-black to-[#001a33] p-10 text-center sm:p-12 md:p-14 lg:p-16">
            <div
              className="absolute inset-0 opacity-30"
              style={{ backgroundImage: "radial-gradient(circle at top, #60a5fa, transparent 60%)" }}
            />
            <div className="relative">
              <h3 className="text-2xl font-bold gradient-text sm:text-3xl">
                Need a Quotation for {project.title}?
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-[#a0aec0] sm:text-base">
                Share your requirements and we&apos;ll prepare a tailored proposal for your team.
              </p>
              <div className="mt-6 flex justify-center">
                <QuoteRequest projectSlug={project.slug} projectTitle={project.title} />
              </div>
            </div>
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
