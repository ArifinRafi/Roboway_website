"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Modal from "@/components/Modal";

type QuoteRequestProps = {
  projectSlug: string;
  projectTitle: string;
};

const inputClass =
  "w-full rounded-lg border border-white/[0.08] bg-black/50 px-3 py-2 text-sm text-white placeholder:text-[#4a5568] transition focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20";

export default function QuoteRequest({ projectSlug, projectTitle }: QuoteRequestProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [details, setDetails] = useState("");

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setOrganization("");
    setDetails("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectSlug,
          projectTitle,
          name,
          email,
          phone,
          organization,
          details,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit quotation");
      setSuccess("Our sales team will be contacting you shortly.");
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit quotation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-5 py-2 font-mono text-[10px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5"
      >
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
        <span className="relative">Ask for Quotation</span>
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Request a Quotation">
        <div className="rounded-xl border border-white/[0.08] bg-gradient-to-b from-[#0a0a0a] to-[#0a0a0a]/95 p-4">
          {!success ? (
            <>
              <p className="text-xs text-[#4a5568]">
                Share your needs and timeline. Our team will prepare a tailored proposal.
              </p>
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="text-xs text-[#4a5568]">Name *</label>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-[#4a5568]">Email *</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#4a5568]">Contact Number *</label>
                    <input
                      className={inputClass}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#4a5568]">Organization (optional)</label>
                  <input
                    className={inputClass}
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#4a5568]">Details</label>
                  <textarea
                    className={`${inputClass} min-h-[110px]`}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us the use case, quantity, timeline, or any special requirements."
                  />
                </div>
                {error ? <div className="text-xs text-red-400">{error}</div> : null}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-white/[0.08] px-4 py-2 font-mono text-[9px] tracking-widest text-[#4a5568] uppercase transition-all duration-300 hover:border-white/20 hover:text-[#a0aec0] hover:bg-white/[0.03]"
                  >
                    <span className="relative">Cancel</span>
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-4 py-2 font-mono text-[9px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_16px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
                    <span className="relative">{loading ? "Transmitting..." : "Submit Request"}</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
              <h4 className="text-base font-semibold text-white">Thank you for your request!</h4>
              <p className="text-xs text-[#a0aec0]">
                Our sales team will be contacting you shortly with the next steps.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="group relative mt-2 inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-white/[0.08] px-4 py-2 font-mono text-[9px] tracking-widest text-[#4a5568] uppercase transition-all duration-300 hover:border-white/20 hover:text-[#a0aec0] hover:bg-white/[0.03]"
              >
                <span className="relative">Close</span>
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
