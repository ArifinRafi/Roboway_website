"use client";

import { useEffect, useMemo, useState } from "react";

type Quotation = {
  _id: string;
  projectSlug: string;
  projectTitle: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  details?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
};

export default function AdminQuotationsPage() {
  const [items, setItems] = useState<Quotation[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/quotations");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load quotations");
        setItems(data.quotations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quotations");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.projectTitle.toLowerCase().includes(q)
      );
    });
  }, [items, search]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Quotation Requests</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Review customer quotation queries by project.
          </p>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, phone, or project"
          className="w-full max-w-sm rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-zinc-500"
        />
      </div>

      {loading ? (
        <div className="mt-6 text-sm text-zinc-400">Loading quotations...</div>
      ) : error ? (
        <div className="mt-6 text-sm text-red-400">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 text-sm text-zinc-400">No quotation requests found.</div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Project</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item._id} className="bg-black/20">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-white">{item.name}</div>
                    {item.organization ? (
                      <div className="text-xs text-zinc-400">{item.organization}</div>
                    ) : null}
                  </td>
                  <td className="px-4 py-4 text-zinc-300">
                    <div className="font-semibold">{item.projectTitle}</div>
                    <div className="text-xs text-zinc-500">{item.projectSlug}</div>
                  </td>
                  <td className="px-4 py-4 text-zinc-300">
                    <div>{item.phone}</div>
                    <div className="text-xs text-zinc-500">{item.email}</div>
                  </td>
                  <td className="px-4 py-4 text-xs text-zinc-300">
                    {item.details || "—"}
                  </td>
                  <td className="px-4 py-4 text-xs text-zinc-400">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
