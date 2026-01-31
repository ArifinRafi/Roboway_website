"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import { Upload, Calculator, CheckCircle, AlertCircle } from "lucide-react";

type Material = {
  name: string;
  pricePerGram: number;
  density: number; // grams per cm³
};

const materials: Material[] = [
  { name: "PLA+", pricePerGram: 15, density: 1.24 },
  { name: "ABS", pricePerGram: 12, density: 1.04 },
  { name: "PETG", pricePerGram: 14, density: 1.27 },
  { name: "TPU", pricePerGram: 18, density: 1.21 },
  { name: "Nylon", pricePerGram: 20, density: 1.15 },
];

type Quotation = {
  material: string;
  volume: number; // cm³
  weight: number; // grams
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
      // Upload file and calculate
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
        <section className="relative isolate bg-gradient-to-b from-black/90 to-black">
          <div className="mx-auto max-w-7xl px-6 py-16 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">3D Printing Products</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-300">
              Upload your 3D model and get an instant quote for professional 3D printing services
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* File Upload Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0f1620] p-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#3b82f6]/20 text-[#3b82f6]">
                  <Upload size={32} />
                </div>
                <h2 className="text-xl font-semibold text-white">Drop your STL or OBJ file</h2>
                <p className="mt-2 text-sm text-zinc-400">
                  Uploading your 3D model is the best way to get an instant quote.
                </p>
                <div className="mt-6 w-full">
                  <label className="flex w-full cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-white/20 bg-white/5 p-8 hover:border-[#3b82f6]/40">
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
                        <CheckCircle className="mx-auto mb-2 text-green-500" size={32} />
                        <p className="text-sm font-medium text-white">
                          {selectedFiles.length} file(s) selected
                        </p>
                        <p className="mt-1 text-xs text-zinc-400">
                          Click to add more files (hold Cmd/Ctrl or Shift to select multiple)
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto mb-2 text-zinc-400" size={32} />
                        <p className="text-sm text-zinc-300">Click to upload or drag and drop</p>
                        <p className="mt-1 text-xs text-zinc-400">STL or OBJ files only</p>
                      </div>
                    )}
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
                    >
                      Add more files
                    </button>
                    {selectedFiles.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setSelectedFiles([])}
                        className="rounded-lg border border-white/10 px-3 py-2 text-xs text-zinc-300 hover:bg-white/10"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2 text-xs text-zinc-300">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${file.size}-${index}`}
                          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                        >
                          <div className="truncate">
                            <span className="text-white">{file.name}</span>
                            <span className="ml-2 text-zinc-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-xs text-red-300 hover:text-red-200"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  All uploads are secure and confidential
                </p>
              </div>
            </div>

            {/* Print Settings Card */}
            <div className="rounded-2xl border border-white/10 bg-[#0f1620] p-8">
              <h2 className="mb-6 text-xl font-semibold text-white">Print Settings</h2>
              
              <div className="space-y-4">
                {/* Material Type */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Material Type
                  </label>
                  <select
                    value={selectedMaterial.name}
                    onChange={(e) => {
                      const material = materials.find((m) => m.name === e.target.value);
                      if (material) setSelectedMaterial(material);
                    }}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-[#3b82f6] focus:outline-none"
                  >
                    {materials.map((material) => (
                      <option key={material.name} value={material.name}>
                        {material.name} ({material.pricePerGram} BDT per gram)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Infill Density */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Infill Density: {infillDensity}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={infillDensity}
                    onChange={(e) => setInfillDensity(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-zinc-500">
                    <span>0% (Hollow)</span>
                    <span>50% (Medium)</span>
                    <span>100% (Solid)</span>
                  </div>
                </div>

                {/* Wall Count */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">
                    Wall Count: {wallCount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={wallCount}
                    onChange={(e) => setWallCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-zinc-500">
                    <span>1</span>
                    <span>3</span>
                    <span>6</span>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculatePrice}
                disabled={selectedFiles.length === 0 || isCalculating}
                className="mt-6 w-full rounded-lg bg-[#3b82f6] px-6 py-3 font-semibold text-white transition hover:bg-[#2563eb] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCalculating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Calculator size={20} />
                    Calculate Price
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Quotation Display */}
          {quotation && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0f1620] p-8">
              <h3 className="mb-4 text-xl font-semibold text-white">Quotation</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-zinc-400">Material</p>
                  <p className="mt-1 text-lg font-semibold text-white">{quotation.material}</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-zinc-400">Volume</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {quotation.volume.toFixed(2)} cm³
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-zinc-400">Weight</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    {quotation.weight.toFixed(2)} g
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-zinc-400">Total Price</p>
                  <p className="mt-1 text-lg font-semibold text-[#3b82f6]">
                    {quotation.totalPrice.toFixed(2)} BDT
                  </p>
                </div>
              </div>
              {!orderConfirmed ? (
                <button
                  onClick={handleOrderClick}
                  className="mt-6 w-full rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  Order Now
                </button>
              ) : (
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-full bg-green-500/20 p-2 text-green-400">
                      <CheckCircle size={22} />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">Thanks for ordering!</p>
                      <p className="mt-1 text-sm text-zinc-300">
                        We will contact you soon with order details.
                      </p>
                      {orderId ? (
                        <p className="mt-2 text-xs text-zinc-400">
                          Order ID: <span className="font-mono text-zinc-200">{orderId}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-zinc-400">Redirecting to invoice...</p>
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6 rounded-lg bg-red-500/20 border border-red-500/50 p-4 flex items-center gap-2">
              <AlertCircle className="text-red-500" size={20} />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </section>
      </main>
      <Footer />

      {/* Order Modal */}
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

