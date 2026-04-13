"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import NeonCard from "@/components/ui/NeonCard";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { Upload, Calculator, CheckCircle, AlertCircle } from "lucide-react";

type Material = {
  name: string;
  pricePerGram: number;
  density: number;
};

const materials: Material[] = [
  { name: "PLA+", pricePerGram: 12, density: 1.24 },
  { name: "PLA", pricePerGram: 9, density: 1.24 },
  { name: "ABS", pricePerGram: 14, density: 1.04 },
];

type Quotation = {
  material: string;
  volume: number;
  weight: number;
  pricePerGram: number;
  totalPrice: number;
  fileNames?: string[];
};

export default function Printing3D() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const [infillDensity, setInfillDensity] = useState<number>(20);
  const [wallCount, setWallCount] = useState<number>(2);
  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [orderId, setOrderId] = useState("");

  const addFiles = (incoming: File[]) => {
    if (incoming.length === 0) return;
    const invalid = incoming.find(
      (file) => !file.name.endsWith(".stl") && !file.name.endsWith(".obj")
    );
    if (invalid) {
      setError("Please upload valid STL or OBJ files only");
      return;
    }
    setSelectedFiles((prev) => {
      const next = [...prev, ...incoming];
      const seen = new Set<string>();
      return next.filter((file) => {
        const key = `${file.name}-${file.size}-${file.lastModified}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    });
    setError("");
    setQuotation(null);
    setOrderConfirmed(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    addFiles(files);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const calculatePrice = async () => {
    if (selectedFiles.length === 0) {
      setError("Please upload a file first");
      return;
    }

    setIsCalculating(true);
    setError("");

    try {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("files", file));
      formData.append("fileCount", selectedFiles.length.toString());
      formData.append("fileNames", selectedFiles.map((file) => file.name).join("||"));
      formData.append("material", selectedMaterial.name);
      formData.append("density", selectedMaterial.density.toString());
      formData.append("pricePerGram", selectedMaterial.pricePerGram.toString());
      formData.append("infillDensity", infillDensity.toString());
      formData.append("wallCount", wallCount.toString());

      const response = await fetch("/api/3d-printing/calculate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to calculate price");
      }

      const data = await response.json();
      setQuotation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to calculate price");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleOrderClick = () => {
    if (!quotation || selectedFiles.length === 0) {
      setError("Please calculate price first");
      return;
    }
    setIsModalOpen(true);
    setError("");
  };

  const handleOrderSuccess = (orderId: string) => {
    setOrderConfirmed(true);
    setIsModalOpen(false);
    setOrderId(orderId);
    router.push(`/invoice/${orderId}`);
  };

  return (
    <div className="min-h-dvh">
      <Navbar />
      <main className="pt-20">
        {/* Banner */}
        <section className="relative isolate">
          <AnimatedBackground variant="hero" />
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">3D Printing Products</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-[#a0aec0]">
              Upload your 3D model and get an instant quote for professional 3D printing services
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* File Upload Card */}
            <NeonCard className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a5f]/20 text-[#60a5fa] border border-white/10">
                  <Upload size={32} />
                </div>
                <h2 className="text-xl font-semibold text-white">Drop your STL or OBJ file</h2>
                <p className="mt-2 text-sm text-[#4a5568]">
                  Uploading your 3D model is the best way to get an instant quote.
                </p>
                <div className="mt-6 w-full">
                  <label className="flex w-full cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] p-8 transition-all hover:border-[#2563eb]/30 hover:bg-white/[0.04]">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".stl,.obj"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {selectedFiles.length > 0 ? (
                      <div className="text-center">
                        <CheckCircle className="mx-auto mb-2 text-emerald-400" size={32} />
                        <p className="text-sm font-medium text-white">
                          {selectedFiles.length} file(s) selected
                        </p>
                        <p className="mt-1 text-xs text-[#4a5568]">
                          Click to add more files
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto mb-2 text-[#4a5568]" size={32} />
                        <p className="text-sm text-[#a0aec0]">Click to upload or drag and drop</p>
                        <p className="mt-1 text-xs text-[#4a5568]">STL or OBJ files only</p>
                      </div>
                    )}
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-[#2563eb]/40 bg-[#2563eb]/10 px-3 py-2 font-mono text-[9px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/20 hover:border-[#2563eb]/70 hover:shadow-[0_0_12px_rgba(37,99,235,0.3)]"
                    >
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.08), transparent)" }} />
                      <span className="relative">Add More Files</span>
                    </button>
                    {selectedFiles.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedFiles([])}
                        className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-white/[0.08] px-3 py-2 font-mono text-[9px] tracking-widest text-[#4a5568] uppercase transition-all duration-300 hover:border-white/20 hover:text-[#a0aec0] hover:bg-white/[0.03]"
                      >
                        <span className="relative">Clear All</span>
                      </button>
                    )}
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2 text-xs">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${file.size}-${index}`}
                          className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2"
                        >
                          <div className="truncate">
                            <span className="text-white">{file.name}</span>
                            <span className="ml-2 text-[#4a5568] font-mono">
                              {(file.size / 1024).toFixed(2)} KB
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-xs text-red-400 hover:text-red-300"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-[#4a5568]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  All uploads are secure and confidential
                </p>
              </div>
            </NeonCard>

            {/* Print Settings Card */}
            <NeonCard className="p-8">
              <h2 className="mb-6 text-xl font-semibold text-white">Print Settings</h2>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#a0aec0]">Material Type</label>
                  <select
                    value={selectedMaterial.name}
                    onChange={(e) => {
                      const material = materials.find((m) => m.name === e.target.value);
                      if (material) setSelectedMaterial(material);
                    }}
                    className="w-full rounded-lg border border-white/[0.08] bg-black/50 px-4 py-2.5 text-white transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 focus:outline-none"
                  >
                    {materials.map((material) => (
                      <option key={material.name} value={material.name}>
                        {material.name} ({material.pricePerGram} BDT per gram)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#a0aec0]">
                    Infill Density: <span className="text-[#60a5fa] font-mono">{infillDensity}%</span>
                  </label>
                  <input
                    type="range" min="0" max="100" step="5"
                    value={infillDensity}
                    onChange={(e) => setInfillDensity(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-[#4a5568] font-mono">
                    <span>0% Hollow</span>
                    <span>50% Medium</span>
                    <span>100% Solid</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#a0aec0]">
                    Wall Count: <span className="text-[#60a5fa] font-mono">{wallCount}</span>
                  </label>
                  <input
                    type="range" min="1" max="6" step="1"
                    value={wallCount}
                    onChange={(e) => setWallCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-[#4a5568] font-mono">
                    <span>1</span>
                    <span>3</span>
                    <span>6</span>
                  </div>
                </div>
              </div>

              <button
                onClick={calculatePrice}
                disabled={selectedFiles.length === 0 || isCalculating}
                className="group relative mt-8 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-6 py-3 font-mono text-[11px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_24px_rgba(37,99,235,0.45)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
                {isCalculating ? (
                  <>
                    <svg className="relative h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="relative">Processing...</span>
                  </>
                ) : (
                  <>
                    <Calculator size={14} className="relative" />
                    <span className="relative">Calculate Price</span>
                  </>
                )}
              </button>
            </NeonCard>
          </div>

          {/* Quotation Display */}
          {quotation && (
            <NeonCard className="mt-8 p-8">
              <h3 className="mb-6 text-xl font-semibold gradient-text">Quotation</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
                  <p className="text-xs text-[#4a5568]">Material</p>
                  <p className="mt-1 text-lg font-semibold text-white font-mono">{quotation.material}</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
                  <p className="text-xs text-[#4a5568]">Volume</p>
                  <p className="mt-1 text-lg font-semibold text-white font-mono">{quotation.volume.toFixed(2)} cm³</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
                  <p className="text-xs text-[#4a5568]">Weight</p>
                  <p className="mt-1 text-lg font-semibold text-white font-mono">{quotation.weight.toFixed(2)} g</p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
                  <p className="text-xs text-[#4a5568]">Total Price</p>
                  <p className="mt-1 text-lg font-semibold text-[#60a5fa] neon-glow font-mono">{quotation.totalPrice.toFixed(2)} BDT</p>
                </div>
              </div>
              {!orderConfirmed ? (
                <button
                  onClick={handleOrderClick}
                  className="group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-[#2563eb]/50 bg-[#2563eb]/15 px-6 py-3 font-mono text-[11px] tracking-widest text-white uppercase transition-all duration-300 hover:bg-[#2563eb]/28 hover:border-[#2563eb]/80 hover:shadow-[0_0_24px_rgba(37,99,235,0.45)]"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.1), transparent)" }} />
                  <span className="relative">Order Now</span>
                </button>
              ) : (
                <NeonCard className="mt-6 p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-emerald-500/20 p-2 text-emerald-400">
                      <CheckCircle size={22} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Thanks for ordering!</p>
                      <p className="mt-1 text-sm text-[#a0aec0]">We will contact you soon with order details.</p>
                      {orderId ? (
                        <p className="mt-2 text-xs text-[#4a5568]">
                          Order ID: <span className="font-mono text-[#60a5fa]">{orderId}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-[#4a5568]">Redirecting to invoice...</p>
                </NeonCard>
              )}
            </NeonCard>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6 rounded-lg bg-red-500/10 border border-red-500/30 p-4 flex items-center gap-2">
              <AlertCircle className="text-red-400" size={20} />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </section>
      </main>
      <Footer />

      {quotation && selectedFiles.length > 0 && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          quotation={quotation}
          selectedFiles={selectedFiles}
          material={selectedMaterial.name}
          infillDensity={infillDensity}
          onOrderSuccess={handleOrderSuccess}
        />
      )}
    </div>
  );
}
