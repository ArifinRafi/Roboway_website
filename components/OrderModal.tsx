"use client";

import { useState, FormEvent } from "react";
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react";

type Quotation = {
  material: string;
  volume: number;
  weight: number;
  pricePerGram: number;
  totalPrice: number;
  fileNames?: string[];
};

type OrderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  quotation: Quotation;
  selectedFiles: File[];
  material: string;
  infillDensity: number;
  onOrderSuccess: (orderId: string) => void;
};

export default function OrderModal({
  isOpen,
  onClose,
  quotation,
  selectedFiles,
  material,
  infillDensity,
  onOrderSuccess,
}: OrderModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Accepts international format: +1234567890 or local: 1234567890
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return;
    }
    if (!formData.address.trim()) {
      setError("Address is required");
      return;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return;
    }
    if (!validatePhone(formData.phone)) {
      setError("Please enter a valid phone number");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email address is required");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!selectedFiles || selectedFiles.length === 0) {
      setError("STL files are missing. Please upload files first.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData to send file and form data
      const orderFormData = new FormData();
      selectedFiles.forEach((file) => orderFormData.append("files", file));
      orderFormData.append("fileCount", selectedFiles.length.toString());
      orderFormData.append("fileNames", selectedFiles.map((file) => file.name).join("||"));
      orderFormData.append("fullName", formData.fullName.trim());
      orderFormData.append("address", formData.address.trim());
      orderFormData.append("phone", formData.phone.trim());
      orderFormData.append("email", formData.email.trim().toLowerCase());
      orderFormData.append("material", material);
      orderFormData.append("infillDensity", infillDensity.toString());
      orderFormData.append("quotation", JSON.stringify(quotation));

      const response = await fetch("/api/3d-printing/order", {
        method: "POST",
        body: orderFormData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create order");
      }

      const data = await response.json();
      setOrderId(data.orderId);
      setSuccess(true);
      onOrderSuccess(data.orderId);

      // Keep the success view open for invoice download.
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setFormData({ fullName: "", address: "", phone: "", email: "" });
    setSuccess(false);
    setOrderId("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-[#4a5568] transition hover:bg-white/10 hover:text-[#60a5fa]"
          disabled={isSubmitting}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Your Order</h2>
          <p className="mt-2 text-sm text-[#4a5568]">
            Please provide your contact information to proceed with the order.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-2xl border border-white/[0.08] bg-black/50 p-6">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-green-500/20 p-2 text-green-400">
                <CheckCircle size={22} />
              </div>
              <div>
                <p className="text-lg font-semibold text-white">Thanks for ordering!</p>
                <p className="mt-1 text-sm text-[#a0aec0]">
                  We will contact you soon with order details.
                </p>
                <p className="mt-2 text-xs text-[#4a5568]">
                  Order ID: <span className="font-mono text-zinc-200">{orderId}</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Order Summary */}
        {!success && (
          <div className="mb-6 rounded-lg border border-white/[0.08] bg-black/50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-[#a0aec0]">Order Summary</h3>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#4a5568]">Files:</span>
                <span className="text-white">{quotation.fileNames?.length || 1}</span>
              </div>
              {quotation.fileNames && quotation.fileNames.length > 0 ? (
                <div className="text-xs text-[#4a5568]">
                  {quotation.fileNames.join(", ")}
                </div>
              ) : null}
              <div className="flex justify-between">
                <span className="text-[#4a5568]">Material:</span>
                <span className="text-white">{quotation.material}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4a5568]">Infill:</span>
                <span className="text-white">{infillDensity}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4a5568]">Total Price:</span>
                <span className="text-lg font-semibold text-[#60a5fa]">
                  {quotation.totalPrice.toFixed(2)} BDT
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[#a0aec0]">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-2 text-white placeholder:text-[#4a5568] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="mb-2 block text-sm font-medium text-[#a0aec0]">
                Address <span className="text-red-400">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isSubmitting}
                rows={3}
                className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-2 text-white placeholder:text-[#4a5568] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none disabled:opacity-50 resize-none"
                placeholder="Street address, City, Postal Code"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#a0aec0]">
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                inputMode="tel"
                autoComplete="tel"
                className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-2 text-white placeholder:text-[#4a5568] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none disabled:opacity-50"
                placeholder="+880 1234 567890"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#a0aec0]">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                inputMode="email"
                autoComplete="email"
                className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-2 text-white placeholder:text-[#4a5568] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none disabled:opacity-50"
                placeholder="john.doe@example.com"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="group relative flex-1 inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full border border-white/[0.08] px-6 py-3 font-mono text-[10px] tracking-widest text-[#4a5568] uppercase transition-all duration-300 hover:border-white/20 hover:text-[#a0aec0] hover:bg-white/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="relative">Cancel</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative flex-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-6 py-3 font-mono text-[10px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
                {isSubmitting ? (
                  <span className="relative flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="relative">Confirm Order</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
