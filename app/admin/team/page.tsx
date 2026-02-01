"use client";

import { useEffect, useState } from "react";

type TeamMember = {
  _id?: string;
  slug: string;
  name: string;
  title: string;
  image: string;
  summary?: string;
  socials?: { linkedin?: string; github?: string; twitter?: string };
  education?: string[];
  expertise?: string[];
};

const emptyForm = {
  slug: "",
  name: "",
  title: "",
  image: "",
  summary: "",
  socials: { linkedin: "", github: "", twitter: "" },
  education: "",
  expertise: "",
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#3b82f6] focus:outline-none";

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/team");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load team");
        setItems(data.team || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load team");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Image upload failed");
    return data.path as string;
  };

  const handleImageUpload = async (file?: File) => {
    if (!file) return;
    setError("");
    try {
      const path = await uploadImage(file);
      setForm((prev) => ({ ...prev, image: path }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      slug: form.slug.trim(),
      name: form.name.trim(),
      title: form.title.trim(),
      image: form.image.trim(),
      summary: form.summary.trim() || undefined,
      socials: {
        linkedin: form.socials.linkedin?.trim() || undefined,
        github: form.socials.github?.trim() || undefined,
        twitter: form.socials.twitter?.trim() || undefined,
      },
      education: parseLines(form.education),
      expertise: parseLines(form.expertise),
    };

    try {
      const res = await fetch("/api/admin/team", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save team member");

      if (editingId) {
        setItems((prev) => prev.map((m) => (m._id === editingId ? data.member : m)));
        setSuccess("Team member updated successfully.");
      } else {
        setItems((prev) => [data.member, ...prev]);
        setSuccess("Team member added successfully.");
      }
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save team member");
    }
  };

  const startEdit = (item: TeamMember) => {
    setEditingId(item._id || null);
    setForm({
      slug: item.slug,
      name: item.name,
      title: item.title,
      image: item.image,
      summary: item.summary || "",
      socials: {
        linkedin: item.socials?.linkedin || "",
        github: item.socials?.github || "",
        twitter: item.socials?.twitter || "",
      },
      education: (item.education || []).join("\n"),
      expertise: (item.expertise || []).join("\n"),
    });
  };

  const handleDelete = async (item: TeamMember) => {
    if (!item._id) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete team member");
      setItems((prev) => prev.filter((m) => m._id !== item._id));
      setSuccess("Team member deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete team member");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <h1 className="text-2xl font-bold">Manage Team</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Upload team photos to R2 and keep your team profiles updated.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-white/10 bg-[#0f1620] p-6"
      >
        <h2 className="text-lg font-semibold text-white">
          {editingId ? "Update Team Member" : "Add Team Member"}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs text-zinc-400">Slug *</label>
            <input
              name="slug"
              className={inputClass}
              value={form.slug}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Name *</label>
            <input
              name="name"
              className={inputClass}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Title *</label>
            <input
              name="title"
              className={inputClass}
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Team Photo *</label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files?.[0])}
                className="text-xs text-zinc-400"
                required={!form.image}
              />
              {form.image ? (
                <span className="text-xs text-emerald-400">Image uploaded</span>
              ) : (
                <span className="text-xs text-zinc-500">Upload a square photo</span>
              )}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-zinc-400">Summary</label>
            <textarea
              name="summary"
              className={`${inputClass} min-h-[90px]`}
              value={form.summary}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">LinkedIn</label>
            <input
              className={inputClass}
              value={form.socials.linkedin}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, socials: { ...prev.socials, linkedin: e.target.value } }))
              }
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">GitHub</label>
            <input
              className={inputClass}
              value={form.socials.github}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, socials: { ...prev.socials, github: e.target.value } }))
              }
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Twitter/X</label>
            <input
              className={inputClass}
              value={form.socials.twitter}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, socials: { ...prev.socials, twitter: e.target.value } }))
              }
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Education (one per line)</label>
            <textarea
              className={`${inputClass} min-h-[90px]`}
              value={form.education}
              onChange={(e) => setForm((prev) => ({ ...prev, education: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-xs text-zinc-400">Expertise (one per line)</label>
            <textarea
              className={`${inputClass} min-h-[90px]`}
              value={form.expertise}
              onChange={(e) => setForm((prev) => ({ ...prev, expertise: e.target.value }))}
            />
          </div>
        </div>

        {error ? <div className="mt-3 text-xs text-red-400">{error}</div> : null}
        {success ? <div className="mt-3 text-xs text-emerald-400">{success}</div> : null}

        <div className="mt-4 flex items-center gap-2">
          <button
            type="submit"
            className="rounded-full bg-[#3b82f6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2563eb]"
          >
            {editingId ? "Update Member" : "Add Member"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 hover:bg-white/5"
          >
            Clear
          </button>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white">Existing Team Members</h2>
        {loading ? (
          <div className="mt-4 text-sm text-zinc-400">Loading team...</div>
        ) : items.length === 0 ? (
          <div className="mt-4 text-sm text-zinc-400">No team members found.</div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item._id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-white/10">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                    ) : null}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-zinc-400">{item.title}</div>
                    <div className="text-[10px] text-zinc-500">{item.slug}</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-zinc-300 hover:bg-white/5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="rounded-full border border-red-500/40 px-3 py-1 text-[11px] text-red-300 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
