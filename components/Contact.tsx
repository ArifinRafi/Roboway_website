"use client";

import { useRef, useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Zap } from "lucide-react";

function BlinkDot({ on }: { on: boolean }) {
  return (
    <span
      className="inline-block w-[5px] h-[5px] rounded-full bg-[#60a5fa] transition-opacity duration-500"
      style={{ opacity: on ? 1 : 0.15 }}
    />
  );
}

const inputClass =
  "w-full rounded-lg border border-white/[0.07] bg-[#060c18]/80 px-4 py-3 text-sm text-white outline-none placeholder:text-[#2d3a4a] font-mono transition-all duration-300 focus:border-[#2563eb]/60 focus:bg-[#060c18] focus:ring-1 focus:ring-[#2563eb]/20 focus:shadow-[0_0_12px_rgba(37,99,235,0.12)]";

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTick((v) => !v), 1000);
    return () => clearInterval(id);
  }, []);

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
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json?.error || "Failed to send message");
      setStatus("sent");
      formRef.current?.reset();
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Failed to send message");
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24">

      {/* ── Section header ─────────────────────────── */}
      <div className="mb-14 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/50 bg-[#1e3a5f]/10 px-4 py-1.5 mb-5">
          <BlinkDot on={tick} />
          <span className="font-mono text-[11px] text-[#60a5fa] tracking-widest">OPEN CHANNEL</span>
        </div>
        <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl tracking-tight">
          Get in{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Touch
          </span>
        </h2>
        <p className="mt-3 mx-auto max-w-md text-sm text-[#a0aec0]">
          Send us a transmission — we respond within 1–2 business days.
        </p>
        <div className="relative h-px mt-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2563eb]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60a5fa]/40 to-transparent" style={{ animation: "hud-scan 3.5s linear infinite" }} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">

        {/* ── Form panel ─────────────────────────────── */}
        <div className="lg:col-span-3">
          <div className="relative rounded-2xl border border-white/[0.07] bg-[#040810]/90 overflow-hidden">

            {/* HUD corner brackets */}
            <span className="absolute top-0 left-0 w-5 h-5 pointer-events-none" style={{ borderTop: "1.5px solid rgba(37,99,235,0.5)", borderLeft: "1.5px solid rgba(37,99,235,0.5)" }} />
            <span className="absolute top-0 right-0 w-5 h-5 pointer-events-none" style={{ borderTop: "1.5px solid rgba(37,99,235,0.5)", borderRight: "1.5px solid rgba(37,99,235,0.5)" }} />
            <span className="absolute bottom-0 left-0 w-5 h-5 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(37,99,235,0.5)", borderLeft: "1.5px solid rgba(37,99,235,0.5)" }} />
            <span className="absolute bottom-0 right-0 w-5 h-5 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(37,99,235,0.5)", borderRight: "1.5px solid rgba(37,99,235,0.5)" }} />

            {/* Subtle grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: "linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Top HUD bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.05]" style={{ background: "rgba(37,99,235,0.04)" }}>
              <div className="flex items-center gap-2">
                <BlinkDot on={tick} />
                <span className="font-mono text-[9px] text-[#4a5568] tracking-widest">MSG COMPOSER</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-[#2563eb]/40 tracking-widest">CHANNEL · OPEN</span>
                <div className="flex gap-1">
                  {[1,2,3].map(i => <span key={i} className="w-1 h-1 rounded-full bg-[#2563eb]/30" />)}
                </div>
              </div>
            </div>

            <form ref={formRef} onSubmit={onSubmit} className="p-6 space-y-4">
              {/* Name + Email row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-[#4a5568] tracking-widest uppercase">Sender Name</label>
                  <input name="user_name" required className={inputClass} placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-[9px] text-[#4a5568] tracking-widest uppercase">Email Address</label>
                  <input name="user_email" type="email" required className={inputClass} placeholder="you@example.com" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="font-mono text-[9px] text-[#4a5568] tracking-widest uppercase">Message Payload</label>
                <textarea name="message" required rows={5} className={`${inputClass} resize-none`} placeholder="Describe your project, partnership, or inquiry..." />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-4 py-3 font-mono text-[11px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
                {status === "sending" ? (
                  <>
                    <svg className="relative h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="relative">Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} className="relative" />
                    <span className="relative">Send Transmission</span>
                  </>
                )}
              </button>

              {/* Status messages */}
              {status === "sent" && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-emerald-400 tracking-wide">TRANSMISSION SUCCESSFUL · WE WILL RESPOND SHORTLY</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.07] px-4 py-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span className="font-mono text-[10px] text-red-400 tracking-wide">ERROR · {error}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ── Info panel ─────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Contact info card */}
          <div className="relative rounded-2xl border border-white/[0.07] bg-[#040810]/90 overflow-hidden flex-1">
            <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none" style={{ borderTop: "1.5px solid rgba(96,165,250,0.25)", borderLeft: "1.5px solid rgba(96,165,250,0.25)" }} />
            <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none" style={{ borderTop: "1.5px solid rgba(96,165,250,0.25)", borderRight: "1.5px solid rgba(96,165,250,0.25)" }} />
            <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.25)", borderLeft: "1.5px solid rgba(96,165,250,0.25)" }} />
            <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" style={{ borderBottom: "1.5px solid rgba(96,165,250,0.25)", borderRight: "1.5px solid rgba(96,165,250,0.25)" }} />

            <div className="px-5 py-3 border-b border-white/[0.05]" style={{ background: "rgba(37,99,235,0.03)" }}>
              <div className="flex items-center gap-2">
                <BlinkDot on={!tick} />
                <span className="font-mono text-[9px] text-[#4a5568] tracking-widest">CONTACT MATRIX</span>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {[
                { icon: Mail,    label: "EMAIL",    value: "teamroboway@gmail.com",   href: "mailto:teamroboway@gmail.com" },
                { icon: Phone,   label: "PHONE",    value: "+8801611240524",           href: "tel:+8801611240524" },
                { icon: MapPin,  label: "LOCATION", value: "Dhaka, Bangladesh",        href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-[#1e3a5f]/20 border border-[#1e3a5f]/30 text-[#60a5fa] transition-all duration-300 group-hover:bg-[#1e3a5f]/30 group-hover:shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                    <Icon size={14} />
                  </div>
                  <div>
                    <div className="font-mono text-[8px] text-[#4a5568] tracking-widest mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-sm text-[#a0aec0] hover:text-[#60a5fa] transition-colors duration-200 break-all">{value}</a>
                    ) : (
                      <span className="text-sm text-[#a0aec0]">{value}</span>
                    )}
                  </div>
                </div>
              ))}

              <div className="pt-2 border-t border-white/[0.04]">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={10} className="text-[#2563eb]/50" />
                  <span className="font-mono text-[8px] text-[#4a5568] tracking-widest">RESPONSE TIME</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[1.5px] bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full w-[70%] rounded-full" style={{ background: "linear-gradient(90deg, #1d4ed8, #60a5fa)", boxShadow: "0 0 4px rgba(96,165,250,0.4)" }} />
                  </div>
                  <span className="font-mono text-[9px] text-[#60a5fa]/60">1–2 DAYS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status readout */}
          <div className="relative rounded-2xl border border-white/[0.05] bg-[#040810]/80 overflow-hidden px-5 py-4">
            <span className="absolute top-0 left-0 w-3 h-3 pointer-events-none" style={{ borderTop: "1px solid rgba(96,165,250,0.2)", borderLeft: "1px solid rgba(96,165,250,0.2)" }} />
            <span className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none" style={{ borderBottom: "1px solid rgba(96,165,250,0.2)", borderRight: "1px solid rgba(96,165,250,0.2)" }} />
            <div className="grid grid-cols-3 gap-3">
              {[
                { k: "STATUS",   v: "ONLINE"  },
                { k: "ENCRYPT",  v: "ACTIVE"  },
                { k: "LATENCY",  v: "< 2MS"   },
              ].map(({ k, v }) => (
                <div key={k} className="text-center">
                  <div className="font-mono text-[7px] text-[#4a5568] tracking-widest mb-0.5">{k}</div>
                  <div className="font-mono text-[9px] text-[#60a5fa]/60">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
