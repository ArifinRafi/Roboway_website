"use client";

import { useRef, useState } from "react";

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    try {
      const formData = new FormData(formRef.current!);
      const payload = {
        name: String(formData.get("user_name") || "").trim(),
        email: String(formData.get("user_email") || "").trim(),
        message: String(formData.get("message") || "").trim(),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json?.error || "Failed to send message");
      }
      setStatus("sent");
      formRef.current?.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Failed to send message");
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-2xl font-semibold text-white">Contact</h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <div className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm text-zinc-300">Name</label>
              <input
                name="user_name"
                required
                className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#3b82f6]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-300">Email</label>
              <input
                name="user_email"
                type="email"
                required
                className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#3b82f6]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-zinc-300">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#3b82f6]"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "sent" && (
              <p className="text-sm text-emerald-400">Message sent successfully.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">{error}</p>
            )}
          </div>
        </form>

        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-base font-semibold text-white">Contact Info</h3>
          <p className="mt-3 text-sm text-zinc-300">
            Email: contact@roboway.example.com
            <br />
            Phone: +1 (000) 000-0000
          </p>
          <div className="mt-4 text-sm text-zinc-400">
            We respond within 1–2 business days.
          </div>
        </div>
      </div>
    </section>
  );
}


