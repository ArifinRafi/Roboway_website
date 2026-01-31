"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ADMIN_SESSION_KEY } from "@/lib/adminAuth";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    router.replace("/admin/login");
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-zinc-400">Manage orders, innovations, and careers.</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        >
          Logout
        </button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
        <Link
          href="/admin/orders"
          className="rounded-2xl border border-white/10 bg-[#0f1620] p-6 transition hover:border-[#3b82f6]/40"
        >
          <h2 className="text-lg font-semibold text-white">Orders</h2>
          <p className="mt-2 text-sm text-zinc-400">View and manage 3D print orders.</p>
        </Link>
        <Link
          href="/admin/innovations"
          className="rounded-2xl border border-white/10 bg-[#0f1620] p-6 transition hover:border-[#3b82f6]/40"
        >
          <h2 className="text-lg font-semibold text-white">Innovations</h2>
          <p className="mt-2 text-sm text-zinc-400">Add and update innovation projects.</p>
        </Link>
        <Link
          href="/admin/careers"
          className="rounded-2xl border border-white/10 bg-[#0f1620] p-6 transition hover:border-[#3b82f6]/40"
        >
          <h2 className="text-lg font-semibold text-white">Careers</h2>
          <p className="mt-2 text-sm text-zinc-400">Post and manage engineering roles.</p>
        </Link>
        <Link
          href="/admin/workshops/satellite"
          className="rounded-2xl border border-white/10 bg-[#0f1620] p-6 transition hover:border-[#3b82f6]/40"
        >
          <h2 className="text-lg font-semibold text-white">Workshop</h2>
          <p className="mt-2 text-sm text-zinc-400">View Satellite Workshop registrations.</p>
        </Link>
      </div>
    </div>
  );
}
