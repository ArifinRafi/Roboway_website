"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Modal from "@/components/Modal";

type QuoteRequestProps = {
  projectSlug: string;
  projectTitle: string;
};

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-zinc-500 transition focus:border-[#3b82f6] focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/30";

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
        className="rounded-full border border-white/20 bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-[#2563eb] hover:to-[#60a5fa]"
      >
        Ask for Quotation
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Request a Quotation">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#0b1220] to-[#0f1620] p-4">
          {!success ? (
            <>
              <p className="text-xs text-zinc-400">
                Share your needs and timeline. Our team will prepare a tailored proposal.
              </p>
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="text-xs text-zinc-400">Name *</label>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-zinc-400">Email *</label>
                    <input
                      type="email"
                      className={inputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400">Contact Number *</label>
                    <input
                      className={inputClass}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-zinc-400">Organization (optional)</label>
                  <input
                    className={inputClass}
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400">Details</label>
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
                    className="rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-[#3b82f6] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2563eb] disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Submit Request"}
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
              <p className="text-xs text-zinc-300">
                Our sales team will be contacting you shortly with the next steps.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full border border-white/10 px-4 py-2 text-xs text-zinc-300 hover:bg-white/5"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
