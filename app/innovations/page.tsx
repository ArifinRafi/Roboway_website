"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Innovations() {
  const [items, setItems] = useState(projects);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/innovations");
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.innovations) && data.innovations.length > 0) {
          setItems(data.innovations);
        }
      } catch {
        // Keep fallback to static data
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        <section className="max-w-6xl mx-auto text-center px-6 pt-8 pb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-blue-500">
          Our Innovations.
        </h2>
        <p className="text-gray-400 mb-10">
          Explore the groundbreaking projects and solutions that are shaping the future
          of robotics and AI at Roboway Technologies.
        </p>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {items.map((project) => {
            const coverImage = project.coverImage || "/window.svg";
            return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full max-w-sm"
            >
              <Image
                src={coverImage}
                alt={project.title}
                width={400}
                height={250}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            </Link>
          );
          })}
        </div>

        <button className="mt-10 px-6 py-3 bg-gray-700 hover:bg-blue-600 rounded-lg text-white font-medium transition">
          View More Projects
        </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
