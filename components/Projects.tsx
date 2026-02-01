import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-2xl font-semibold text-white">Products & Projects</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            className="rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-[#3b82f6]/40 hover:bg-white/[0.07]"
          >
            <h3 className="text-base font-semibold text-white">
              {p.title}
              {p.subtitle ? (
                <span className="ml-2 text-xs font-normal text-zinc-400">{p.subtitle}</span>
              ) : null}
            </h3>
            <p className="mt-2 text-sm text-zinc-300">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/15 px-2 py-1 text-[10px] text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


