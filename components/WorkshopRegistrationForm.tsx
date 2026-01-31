"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

type FormState = {
  fullName: string;
  educationLevel: "School" | "College" | "University" | "";
  classSemester: string;
  phone: string;
  email: string;
  bkashCode: string;
};

const initialState: FormState = {
  fullName: "",
  educationLevel: "",
  classSemester: "",
  phone: "",
  email: "",
  bkashCode: "",
};

export default function WorkshopRegistrationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [seatsRemaining, setSeatsRemaining] = useState<number | null>(null);
  const [maxSeats, setMaxSeats] = useState<number | null>(null);
  const [seatsError, setSeatsError] = useState("");

  const inputClass =
    "w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#3b82f6]";

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const validatePhone = (phone: string) => /^[0-9+\-\s]{8,20}$/.test(phone.trim());

  useEffect(() => {
    let isMounted = true;

    const fetchSeats = async () => {
      try {
        setSeatsError("");
        const res = await fetch("/api/workshops/satellite/seats");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load seats");
        if (!isMounted) return;
        setSeatsRemaining(data.remaining);
        setMaxSeats(data.max);
      } catch (err) {
        if (!isMounted) return;
        setSeatsError(err instanceof Error ? err.message : "Failed to load seats");
      }
    };

    fetchSeats();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim()) return setError("Full name is required");
    if (!form.educationLevel) return setError("Education level is required");
    if (!form.classSemester.trim()) return setError("Class / semester is required");
    if (!validatePhone(form.phone)) return setError("Enter a valid phone number");
    if (!validateEmail(form.email)) return setError("Enter a valid email address");
    if (!form.bkashCode.trim()) return setError("bKash transaction code is required");

    if (seatsRemaining === 0) {
      return setError("All seats are filled");
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/workshops/satellite/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit registration");

      setForm(initialState);
      setIsOpen(true);
      if (typeof data.remaining === "number") {
        setSeatsRemaining(data.remaining);
      }
      if (typeof data.max === "number") {
        setMaxSeats(data.max);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit registration");
    } finally {
      setSubmitting(false);
    }
  };

  const isSoldOut = seatsRemaining === 0;
  const seatsLabel =
    seatsRemaining !== null && maxSeats !== null
      ? `${seatsRemaining} Seats Remaining`
      : "Checking seats...";

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white">Register Now</h3>
      <p className="mt-1 text-sm text-zinc-400">
        Fill out the form and submit your payment reference to reserve your seat.
      </p>
      <p className="mt-3 text-sm font-semibold text-[#93c5fd]">{seatsLabel}</p>
      {seatsError && <p className="mt-2 text-xs text-zinc-500">{seatsError}</p>}
      {isSoldOut && <p className="mt-2 text-xs text-amber-400">All seats are filled.</p>}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div>
          <label className="mb-1 block text-sm text-zinc-300">Full Name</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Education Level</label>
          <select
            name="educationLevel"
            value={form.educationLevel}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select level</option>
            <option value="School">School</option>
            <option value="College">College</option>
            <option value="University">University</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Class / Semester</label>
          <input
            name="classSemester"
            value={form.classSemester}
            onChange={handleChange}
            placeholder="e.g. Class 10 / Semester 3"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Phone Number</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+880 1234 567890"
            className={inputClass}
            inputMode="tel"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">Email Address</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
            inputMode="email"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">bKash Transaction Code</label>
          <input
            name="bkashCode"
            value={form.bkashCode}
            onChange={handleChange}
            placeholder="Transaction code"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={submitting || isSoldOut}
          className="rounded-md bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2563eb] disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Registration"}
        </button>
      </form>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Registration Submitted"
      >
        Thank you for registering. Our team will be contacting you shortly.
      </Modal>
    </div>
  );
}
