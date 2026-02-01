"use client";

import { useEffect, useState } from "react";

type TeamMember = {
  name: string;
  role?: string;
  image?: string;
  socials?: { linkedin?: string; github?: string; twitter?: string };
};

type ActionGalleryItem = {
  title?: string;
  image: string;
};

type Innovation = {
  _id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  videoUrl?: string;
  coverImage: string;
  gallery?: string[];
  techDetails?: string[];
  team?: TeamMember[];
  tags: string[];
  features?: { title: string; description: string; icon?: string }[];
  specsHardware?: { label: string; value: string }[];
  specsSoftware?: { label: string; value: string }[];
  useCases?: { title: string; description: string; icon?: string }[];
  actionGallery?: ActionGalleryItem[];
  upgrades?: { title: string; description: string; icon?: string }[];
  createdAt?: string;
};

const parseList = (value: string) =>
  value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

const parseLines = (value: string) =>
  value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);

const parseKeyValueLines = (value: string, label: string) =>
  parseLines(value).map((line) => {
    const [key, ...rest] = line.split("|").map((v) => v.trim());
    if (!key) {
      throw new Error(`Invalid ${label} line. Use: Label|Value`);
    }
    return { label: key, value: rest.length > 0 ? rest.join(" | ") : "" };
  });

const parseTitleDescIconLines = (value: string, label: string) =>
  parseLines(value).map((line) => {
    const [title, description, icon] = line.split("|").map((v) => v.trim());
    if (!title) {
      throw new Error(`Invalid ${label} line. Use: Title|Description|Icon(optional)`);
    }
    return {
      title,
      description: description || "",
      icon: icon || undefined,
    };
  });

const toCommaList = (value?: string[]) => (value && value.length > 0 ? value.join(", ") : "");
const toLineList = (value?: string[]) => (value && value.length > 0 ? value.join("\n") : "");
const toKeyValueLines = (value?: { label: string; value: string }[]) =>
  value && value.length > 0 ? value.map((v) => `${v.label}|${v.value}`).join("\n") : "";
const toTitleDescIconLines = (value?: { title: string; description: string; icon?: string }[]) =>
  value && value.length > 0
    ? value
        .map((v) => `${v.title}|${v.description}${v.icon ? `|${v.icon}` : ""}`)
        .join("\n")
    : "";

export default function AdminInnovationsPage() {
  const [items, setItems] = useState<Innovation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    videoUrl: "",
    tags: "",
    techDetails: "",
    features: "",
    specsHardware: "",
    specsSoftware: "",
    useCases: "",
    upgrades: "",
  });

  const [coverImage, setCoverImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [actionGallery, setActionGallery] = useState<ActionGalleryItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/innovations");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load products");
        setItems(data.innovations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload-image", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Image upload failed");
    return data.path as string;
  };

  const handleCoverUpload = async (file?: File) => {
    if (!file) return;
    setError("");
    try {
      const path = await uploadImage(file);
      setCoverImage(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload cover image");
    }
  };

  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError("");
    try {
      const uploads = await Promise.all(Array.from(files).map(uploadImage));
      setGallery((prev) => [...prev, ...uploads]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload gallery images");
    }
  };

  const handleActionGalleryUpload = async (index: number, file?: File) => {
    if (!file) return;
    setError("");
    try {
      const path = await uploadImage(file);
      setActionGallery((prev) =>
        prev.map((item, i) => (i === index ? { ...item, image: path } : item))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload action image");
    }
  };

  const handleTeamImageUpload = async (index: number, file?: File) => {
    if (!file) return;
    setError("");
    try {
      const path = await uploadImage(file);
      setTeam((prev) => prev.map((m, i) => (i === index ? { ...m, image: path } : m)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload team image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const payload = {
        slug: form.slug.trim(),
        title: form.title.trim(),
        subtitle: form.subtitle.trim() || undefined,
        description: form.description.trim(),
        videoUrl: form.videoUrl.trim() || undefined,
        coverImage,
        tags: parseList(form.tags),
        gallery,
        techDetails: parseLines(form.techDetails),
        features: parseTitleDescIconLines(form.features, "Features"),
        specsHardware: parseKeyValueLines(form.specsHardware, "Specs Hardware"),
        specsSoftware: parseKeyValueLines(form.specsSoftware, "Specs Software"),
        useCases: parseTitleDescIconLines(form.useCases, "Use Cases"),
        upgrades: parseTitleDescIconLines(form.upgrades, "Upgrades"),
        team: team.map((m) => ({
          name: m.name.trim(),
          role: m.role?.trim() || undefined,
          image: m.image,
          socials: {
            linkedin: m.socials?.linkedin?.trim() || undefined,
            github: m.socials?.github?.trim() || undefined,
            twitter: m.socials?.twitter?.trim() || undefined,
          },
        })),
        actionGallery,
      };

      if (!payload.coverImage) throw new Error("Cover image is required");

      const res = await fetch("/api/admin/innovations", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save innovation");

      if (editingId) {
        setSuccess("Product updated successfully.");
        setItems((prev) => prev.map((item) => (item._id === editingId ? data.innovation : item)));
      } else {
        setSuccess("Product added successfully.");
        setItems((prev) => [data.innovation, ...prev]);
      }
      setEditingId(null);
      setForm({
        slug: "",
        title: "",
        subtitle: "",
        description: "",
        videoUrl: "",
        tags: "",
        techDetails: "",
        features: "",
        specsHardware: "",
        specsSoftware: "",
        useCases: "",
        upgrades: "",
      });
      setCoverImage("");
      setGallery([]);
      setTeam([]);
      setActionGallery([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save innovation");
    }
  };

  const startEdit = (item: Innovation) => {
    setError("");
    setSuccess("");
    setEditingId(item._id || null);
    setForm({
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description,
      videoUrl: item.videoUrl || "",
      tags: toCommaList(item.tags),
      techDetails: toLineList(item.techDetails),
      features: toTitleDescIconLines(item.features),
      specsHardware: toKeyValueLines(item.specsHardware),
      specsSoftware: toKeyValueLines(item.specsSoftware),
      useCases: toTitleDescIconLines(item.useCases),
      upgrades: toTitleDescIconLines(item.upgrades),
    });
    setCoverImage(item.coverImage);
    setGallery(item.gallery || []);
    setTeam(item.team || []);
    setActionGallery(item.actionGallery || []);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({
      slug: "",
      title: "",
      subtitle: "",
      description: "",
      videoUrl: "",
      tags: "",
      techDetails: "",
      features: "",
      specsHardware: "",
      specsSoftware: "",
      useCases: "",
      upgrades: "",
    });
    setCoverImage("");
    setGallery([]);
    setTeam([]);
    setActionGallery([]);
  };

  const handleDelete = async (item: Innovation) => {
    if (!item._id) return;
    const confirmed = window.confirm(`Delete "${item.title}"? This cannot be undone.`);
    if (!confirmed) return;
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/admin/innovations", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete innovation");
      setItems((prev) => prev.filter((x) => x._id !== item._id));
      setSuccess("Product deleted successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete innovation");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#3b82f6] focus:outline-none";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-bold">Manage Products</h1>
      <p className="mt-2 text-sm text-zinc-400">Add new innovation projects and content.</p>

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
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className={inputClass} />
          <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtitle (optional)" className={inputClass} />
          <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="YouTube Video URL (optional)" className={inputClass} />
        </div>

        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Short description" className={`${inputClass} h-24`} />
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className={inputClass} />

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs text-zinc-400">Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleCoverUpload(e.target.files?.[0])} className={inputClass} />
            {coverImage ? <p className="mt-2 text-xs text-zinc-400">{coverImage}</p> : null}
          </div>
          <div>
            <label className="mb-2 block text-xs text-zinc-400">Gallery Images (multiple)</label>
            <input type="file" accept="image/*" multiple onChange={(e) => handleGalleryUpload(e.target.files)} className={inputClass} />
            {gallery.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-zinc-400">
                {gallery.map((g, i) => (
                  <span key={`${g}-${i}`} className="rounded border border-white/10 px-2 py-1">{g}</span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <textarea name="techDetails" value={form.techDetails} onChange={handleChange} placeholder="Tech details (one per line)" className={`${inputClass} h-24`} />
        <textarea name="features" value={form.features} onChange={handleChange} placeholder="Features (one per line): Title|Description|Icon(optional)" className={`${inputClass} h-24`} />
        <textarea name="specsHardware" value={form.specsHardware} onChange={handleChange} placeholder="Specs Hardware (one per line): Label|Value" className={`${inputClass} h-24`} />
        <textarea name="specsSoftware" value={form.specsSoftware} onChange={handleChange} placeholder="Specs Software (one per line): Label|Value" className={`${inputClass} h-24`} />
        <textarea name="useCases" value={form.useCases} onChange={handleChange} placeholder="Use Cases (one per line): Title|Description|Icon(optional)" className={`${inputClass} h-24`} />
        <textarea name="upgrades" value={form.upgrades} onChange={handleChange} placeholder="Upgrades (one per line): Title|Description|Icon(optional)" className={`${inputClass} h-24`} />

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Team Members</h3>
            <button
              type="button"
              onClick={() => setTeam((prev) => [...prev, { name: "", role: "", socials: {} }])}
              className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/10"
            >
              Add Member
            </button>
          </div>
          <div className="mt-4 grid gap-4">
            {team.map((m, idx) => (
              <div key={idx} className="rounded-lg border border-white/10 p-3">
                <div className="grid gap-2 md:grid-cols-2">
                  <input value={m.name} onChange={(e) => setTeam((prev) => prev.map((x, i) => (i === idx ? { ...x, name: e.target.value } : x)))} placeholder="Name" className={inputClass} />
                  <input value={m.role || ""} onChange={(e) => setTeam((prev) => prev.map((x, i) => (i === idx ? { ...x, role: e.target.value } : x)))} placeholder="Role" className={inputClass} />
                  <input value={m.socials?.linkedin || ""} onChange={(e) => setTeam((prev) => prev.map((x, i) => (i === idx ? { ...x, socials: { ...x.socials, linkedin: e.target.value } } : x)))} placeholder="LinkedIn URL" className={inputClass} />
                  <input value={m.socials?.github || ""} onChange={(e) => setTeam((prev) => prev.map((x, i) => (i === idx ? { ...x, socials: { ...x.socials, github: e.target.value } } : x)))} placeholder="GitHub URL" className={inputClass} />
                  <input value={m.socials?.twitter || ""} onChange={(e) => setTeam((prev) => prev.map((x, i) => (i === idx ? { ...x, socials: { ...x.socials, twitter: e.target.value } } : x)))} placeholder="Twitter URL" className={inputClass} />
                  <input type="file" accept="image/*" onChange={(e) => handleTeamImageUpload(idx, e.target.files?.[0])} className={inputClass} />
                </div>
                {m.image ? <p className="mt-2 text-xs text-zinc-400">{m.image}</p> : null}
                <button type="button" onClick={() => setTeam((prev) => prev.filter((_, i) => i !== idx))} className="mt-2 text-xs text-red-300 hover:text-red-200">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Action Gallery</h3>
            <button
              type="button"
              onClick={() => setActionGallery((prev) => [...prev, { title: "", image: "" }])}
              className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/10"
            >
              Add Item
            </button>
          </div>
          <div className="mt-4 grid gap-4">
            {actionGallery.map((g, idx) => (
              <div key={idx} className="rounded-lg border border-white/10 p-3">
                <div className="grid gap-2 md:grid-cols-2">
                  <input value={g.title || ""} onChange={(e) => setActionGallery((prev) => prev.map((x, i) => (i === idx ? { ...x, title: e.target.value } : x)))} placeholder="Title (optional)" className={inputClass} />
                  <input type="file" accept="image/*" onChange={(e) => handleActionGalleryUpload(idx, e.target.files?.[0])} className={inputClass} />
                </div>
                {g.image ? <p className="mt-2 text-xs text-zinc-400">{g.image}</p> : null}
                <button type="button" onClick={() => setActionGallery((prev) => prev.filter((_, i) => i !== idx))} className="mt-2 text-xs text-red-300 hover:text-red-200">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="submit" className="rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2563eb]">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">Existing Products</h2>
        {loading ? (
          <div className="mt-4 text-sm text-zinc-400">Loading...</div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div key={item.slug} className="rounded-xl border border-white/10 bg-[#0f1620] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="text-xs text-zinc-400">/{item.slug}</div>
                    <div className="mt-1 text-xs text-zinc-500">{item.coverImage}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="rounded-md border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/10"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      className="rounded-md border border-red-500/30 px-3 py-1 text-xs text-red-300 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
