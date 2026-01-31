"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_CREDENTIALS, ADMIN_SESSION_KEY } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email.trim() !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      setError("Invalid admin credentials");
      return;
    }

    localStorage.setItem(ADMIN_SESSION_KEY, "1");
    router.replace("/admin");
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-md items-center px-6">
      <div className="w-full rounded-2xl border border-white/10 bg-[#0f1620] p-8">
        <h1 className="text-2xl font-bold text-white">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-400">Sign in to manage orders and content.</p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
              Admin ID
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-[#3b82f6] focus:outline-none"
              placeholder="teamroboway@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-[#3b82f6] focus:outline-none"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#3b82f6] px-4 py-2 font-semibold text-white transition hover:bg-[#2563eb]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
