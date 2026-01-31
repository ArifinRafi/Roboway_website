"use client";

import { useEffect, useState } from "react";

type Career = {
  _id?: string;
  slug: string;
  title: string;
  location?: string;
  type?: string;
  summary: string;
  createdAt?: string;
};

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);

export default function AdminCareersPage() {
  const [items, setItems] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    slug: "",
    title: "",
    location: "",
    type: "",
    summary: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/careers");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load careers");
        setItems(data.careers || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load careers");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        location: form.location.trim() || undefined,
        type: form.type.trim() || undefined,
        summary: form.summary.trim(),
        responsibilities: parseLines(form.responsibilities),
        requirements: parseLines(form.requirements),
        benefits: parseLines(form.benefits),
      };

      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create career");

      setSuccess("Career added successfully.");
      setItems((prev) => [data.career, ...prev]);
      setForm({
        slug: "",
        title: "",
        location: "",
        type: "",
        summary: "",
        responsibilities: "",
        requirements: "",
        benefits: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create career");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#3b82f6] focus:outline-none";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-bold">Manage Careers</h1>
      <p className="mt-2 text-sm text-zinc-400">Add and manage engineering job posts.</p>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-[#0f1620] p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug (unique)" className={inputClass} />
          <input name="title" value={form.title} onChange={handleChange} placeholder="Job Title" className={inputClass} />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location (optional)" className={inputClass} />
          <input name="type" value={form.type} onChange={handleChange} placeholder="Type (Full-time / Internship)" className={inputClass} />
        </div>
        <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Short summary" className={`${inputClass} h-24`} />
        <textarea name="responsibilities" value={form.responsibilities} onChange={handleChange} placeholder="Responsibilities (one per line)" className={`${inputClass} h-24`} />
        <textarea name="requirements" value={form.requirements} onChange={handleChange} placeholder="Requirements (one per line)" className={`${inputClass} h-24`} />
        <textarea name="benefits" value={form.benefits} onChange={handleChange} placeholder="Benefits (one per line, optional)" className={`${inputClass} h-24`} />

        <button type="submit" className="rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2563eb]">
          Add Career
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">Existing Careers</h2>
        {loading ? (
          <div className="mt-4 text-sm text-zinc-400">Loading...</div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div key={item.slug} className="rounded-xl border border-white/10 bg-[#0f1620] p-4">
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="text-xs text-zinc-400">/{item.slug}</div>
                <div className="mt-1 text-xs text-zinc-500">{item.location} • {item.type}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
