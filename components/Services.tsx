import * as Icons from "lucide-react";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-20 bg-black">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#3b82f6]">Our Expertise</h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm text-zinc-300">
          At Roboway Technologies, we combine cutting‑edge research with practical
          applications to deliver transformative solutions across diverse industries.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((s) => {
          const Icon = (Icons as any)[s.icon] ?? Icons.Cpu;
          return (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-[#2b2f36] p-6 text-center shadow-sm transition hover:shadow-md hover:border-[#3b82f6]/40"
            >
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                <Icon size={22} />
              </div>
              <h3 className="text-base font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-xs leading-6 text-zinc-300">{s.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}


