"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";

type Registration = {
  _id: string;
  fullName: string;
  educationLevel: string;
  classSemester: string;
  phone: string;
  email: string;
  bkashCode: string;
  createdAt: string;
};

export default function AdminSatelliteWorkshopPage() {
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [editing, setEditing] = useState<Registration | null>(null);
  const [deleting, setDeleting] = useState<Registration | null>(null);
  const [editForm, setEditForm] = useState({
    fullName: "",
    educationLevel: "",
    classSemester: "",
    phone: "",
    email: "",
    bkashCode: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/workshops/satellite");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load registrations");
        setItems(data.registrations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load registrations");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const resetMessages = () => {
    setActionError("");
    setActionSuccess("");
  };

  const startEdit = (registration: Registration) => {
    resetMessages();
    setEditing(registration);
    setEditForm({
      fullName: registration.fullName,
      educationLevel: registration.educationLevel,
      classSemester: registration.classSemester,
      phone: registration.phone,
      email: registration.email,
      bkashCode: registration.bkashCode,
    });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    if (!editing) return;
    resetMessages();
    try {
      const res = await fetch("/api/admin/workshops/satellite", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing._id, ...editForm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update registration");
      setItems((prev) => prev.map((r) => (r._id === editing._id ? data.registration : r)));
      setEditing(null);
      setActionSuccess("Registration updated.");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update registration");
    }
  };

  const handleDelete = async () => {
    if (!deleting) return;
    resetMessages();
    try {
      const res = await fetch("/api/admin/workshops/satellite", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleting._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete registration");
      setItems((prev) => prev.filter((r) => r._id !== deleting._id));
      setDeleting(null);
      setActionSuccess("Registration deleted.");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete registration");
    }
  };

  const inputClass =
    "w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#3b82f6]";

  const editFields = useMemo(
    () => [
      { label: "Full Name", name: "fullName", type: "text" },
      { label: "Education Level", name: "educationLevel", type: "text" },
      { label: "Class/Semester", name: "classSemester", type: "text" },
      { label: "Phone", name: "phone", type: "text" },
      { label: "Email", name: "email", type: "email" },
      { label: "bKash Code", name: "bkashCode", type: "text" },
    ],
    []
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-bold">Satellite Workshop Registrations</h1>
      <p className="mt-2 text-sm text-zinc-400">View submitted registrations from the workshop page.</p>

      {loading && (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-zinc-400">
          Loading registrations...
        </div>
      )}
      {error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}
      {actionError && (
        <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {actionError}
        </div>
      )}
      {actionSuccess && (
        <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
          {actionSuccess}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-[#0f1620]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-zinc-400">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Education</th>
                <th className="px-6 py-4">Class/Semester</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">bKash Code</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {items.map((r) => (
                <tr key={r._id} className="text-zinc-200">
                  <td className="px-6 py-4">{r.fullName}</td>
                  <td className="px-6 py-4">{r.educationLevel}</td>
                  <td className="px-6 py-4">{r.classSemester}</td>
                  <td className="px-6 py-4">{r.phone}</td>
                  <td className="px-6 py-4">{r.email}</td>
                  <td className="px-6 py-4 font-mono text-xs">{r.bkashCode}</td>
                  <td className="px-6 py-4">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(r)}
                        className="rounded-md border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/10"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          resetMessages();
                          setDeleting(r);
                        }}
                        className="rounded-md border border-red-500/30 px-3 py-1 text-xs text-red-300 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Edit Registration"
      >
        <div className="space-y-3">
          {editFields.map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-xs text-zinc-400">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={editForm[field.name as keyof typeof editForm]}
                onChange={handleEditChange}
                className={inputClass}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-md border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-md bg-[#3b82f6] px-3 py-1 text-xs font-semibold text-white hover:bg-[#2563eb]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title="Delete Registration"
      >
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">{deleting?.fullName}</span>?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setDeleting(null)}
            className="rounded-md border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-red-500/30 px-3 py-1 text-xs text-red-200 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
