import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-white">Who We Are</h2>
          <p className="mt-4 text-zinc-300">
            We are a robotics and AI firm building intelligent systems across
            humanoid platforms, autonomous vehicles, and IoT devices. Our
            mission is to push the boundaries of human–machine collaboration
            through cutting-edge research and real-world deployments.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
          <Image
            src="/images/shark_tank_team.jpg"
            alt="Roboway Robotics"
            fill
            className="object-cover"
          />
          {/* <div className="absolute inset-0 bg-[rgb(59,130,246)] opacity-30" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" /> */}
        </div>
      </div>
    </section>
  );
}


