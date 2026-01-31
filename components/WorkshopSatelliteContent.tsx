"use client";

import Image from "next/image";
import WorkshopRegistrationForm from "@/components/WorkshopRegistrationForm";

const highlights = [
  { title: "Organizer", value: "Roboway Technologies" },
  { title: "Program", value: "Productive Ramadan: Let’s Make a Satellite" },
  { title: "Venue", value: "Dacca House, 7D, Tropical Alauddin Tower, Sector 3, Uttara, Dhaka 1230" },
  { title: "Event Dates & Time", value: "Starts: 20 February 2026 (2nd Ramadan) • 12:00 PM – 4:00 PM (Daily)" },
];

const gallery = [
  { src: "/images/underwater-rov.svg", alt: "Satellite model" },
  { src: "/images/pixi-humanoid.svg", alt: "Workshop activity" },
  { src: "/images/autonomous-rc.svg", alt: "Expected outcomes" },
];

export default function WorkshopSatelliteContent() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">CanSat Workshop</h1>
          <p className="mt-3 text-sm text-zinc-300">
            Under the special Ramadan initiative “Productive Ramadan: Let’s Make a Satellite”, this
            hands-on CanSat workshop introduces participants to the fundamentals of satellite
            engineering through practical learning. Over four intensive days, participants will
            explore real-world aerospace concepts, embedded systems, and mission deployment—culminating
            in a live CanSat deployment using a drone.
          </p>
          <p className="mt-3 text-sm text-zinc-300">
            This workshop aims to nurture research mindset, innovation, and practical engineering
            skills while making Ramadan a time of productive learning and technological growth.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[#3b82f6]/40"
              >
                <div className="text-xs text-zinc-400">{item.title}</div>
                <div className="mt-1 text-sm font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {gallery.map((img) => (
              <div
                key={img.alt}
                className="relative h-32 overflow-hidden rounded-xl border border-white/10 bg-white/5"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5">
            <h2 className="text-sm font-semibold text-white">Workshop Structure & Topics</h2>
            <div className="mt-4 grid gap-4">
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-[#93c5fd] font-semibold">Day 1 – Introduction to CanSat & Space Systems</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                  <li>What is a CanSat and its role in space research</li>
                  <li>Overview of satellite subsystems</li>
                  <li>CanSat mission objectives and international competitions</li>
                  <li>Introduction to workshop hardware and safety briefing</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-[#93c5fd] font-semibold">Day 2 – Electronics, Sensors & Embedded Systems</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                  <li>Microcontroller selection and architecture</li>
                  <li>Sensor integration (altitude, temperature, pressure, etc.)</li>
                  <li>Power system design</li>
                  <li>Circuit assembly and testing</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-[#93c5fd] font-semibold">Day 3 – Programming, Communication & Data Handling</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                  <li>Embedded programming for CanSat</li>
                  <li>Telemetry and communication basics</li>
                  <li>Data logging and analysis</li>
                  <li>Pre-deployment testing and mission simulation</li>
                </ul>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-[#93c5fd] font-semibold">Day 4 – Mission Day: CanSat Deployment</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                  <li>Final system integration</li>
                  <li>Pre-flight checklist and validation</li>
                  <li>Live CanSat deployment using a drone</li>
                  <li>Data recovery, analysis, and mission evaluation</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-[#1a1f26] p-5">
            <h2 className="text-sm font-semibold text-white">Expected Outcomes</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-xs text-zinc-300">
              <li>Practical understanding of CanSat design and development</li>
              <li>Hands-on experience with embedded systems and aerospace hardware</li>
              <li>Exposure to real-world satellite mission workflow</li>
              <li>Enhanced problem-solving and teamwork skills</li>
              <li>Inspiration to pursue aerospace, robotics, and space research projects</li>
            </ul>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-[#1a1f26] p-5">
            <h2 className="text-sm font-semibold text-white">Registration & Fee Details</h2>
            <div className="mt-3 grid gap-2 text-xs text-zinc-300">
              <div><span className="text-zinc-400">Registration Fee:</span> 4500 BDT</div>
              <div><span className="text-zinc-400">Payment Method:</span> bKash (Send Money)</div>
              <div><span className="text-zinc-400">Number:</span> 01611240524</div>
              <div className="text-zinc-400">After sending the payment:</div>
              <div>1) Fill up the registration form</div>
              <div>2) Enter your bKash Transaction ID in the form as payment confirmation</div>
              <div className="text-amber-400">
                ⚠️ Registration will be confirmed only after verifying the transaction ID.
              </div>
              <div className="text-[#93c5fd]">🔹 Limited to 10 participants only</div>
            </div>
          </div>
        </div>

        <WorkshopRegistrationForm />
      </div>
    </section>
  );
}
