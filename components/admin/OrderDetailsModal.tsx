"use client";

import { useState } from "react";
import { X, Download, Loader2, FileText } from "lucide-react";

type Order = {
  orderId: string;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  fileInfo: {
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
  };
  fileInfos?: {
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
  }[];
  printConfig: {
    material: string;
    infillDensity: number;
    layerHeight?: number;
    volume: number;
    weight: number;
    pricePerGram: number;
    totalPrice: number;
  };
  status: string;
  createdAt: string;
};

type OrderDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export default function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  if (!isOpen || !order) return null;

  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [downloadAllLoading, setDownloadAllLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceError, setInvoiceError] = useState("");

  const fileList =
    order.fileInfos && order.fileInfos.length > 0 ? order.fileInfos : [order.fileInfo];

  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError("");
    try {
      const res = await fetch("/api/admin/orders/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: order.fileInfo.filePath }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create download link");
      if (!data?.url) throw new Error("Download link was not generated");
      window.open(data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : "Failed to download file");
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadAll = async () => {
    setDownloadAllLoading(true);
    setDownloadError("");
    try {
      const res = await fetch(`/api/admin/orders/download-all?orderId=${order.orderId}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create zip");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `order-${order.orderId}-files.zip`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError(err instanceof Error ? err.message : "Failed to download files");
    } finally {
      setDownloadAllLoading(false);
    }
  };

  const handleInvoiceDownload = async () => {
    setInvoiceLoading(true);
    setInvoiceError("");
    try {
      const res = await fetch(`/api/admin/orders/invoice?orderId=${order.orderId}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate invoice");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${order.orderId}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setInvoiceError(err instanceof Error ? err.message : "Failed to download invoice");
    } finally {
      setInvoiceLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0f1620] p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Order Details</h2>
          <p className="mt-2 text-sm text-zinc-400">Order ID: {order.orderId}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">Customer Info</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-zinc-400">Name:</span>{" "}
                <span className="text-white">{order.customerInfo.fullName}</span>
              </p>
              <p>
                <span className="text-zinc-400">Email:</span>{" "}
                <span className="text-white">{order.customerInfo.email}</span>
              </p>
              <p>
                <span className="text-zinc-400">Phone:</span>{" "}
                <span className="text-white">{order.customerInfo.phone}</span>
              </p>
              <p>
                <span className="text-zinc-400">Address:</span>{" "}
                <span className="text-white">{order.customerInfo.address}</span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">Print Config</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-zinc-400">Material:</span>{" "}
                <span className="text-white">{order.printConfig.material}</span>
              </p>
              <p>
                <span className="text-zinc-400">Infill:</span>{" "}
                <span className="text-white">{order.printConfig.infillDensity}%</span>
              </p>
              <p>
                <span className="text-zinc-400">Volume:</span>{" "}
                <span className="text-white">{order.printConfig.volume.toFixed(2)} cm³</span>
              </p>
              <p>
                <span className="text-zinc-400">Weight:</span>{" "}
                <span className="text-white">{order.printConfig.weight.toFixed(2)} g</span>
              </p>
              <p>
                <span className="text-zinc-400">Price/Gram:</span>{" "}
                <span className="text-white">{order.printConfig.pricePerGram} BDT</span>
              </p>
              <p>
                <span className="text-zinc-400">Total:</span>{" "}
                <span className="text-[#3b82f6] font-semibold">
                  {order.printConfig.totalPrice.toFixed(2)} BDT
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 md:col-span-2">
            <h3 className="mb-3 text-sm font-semibold text-zinc-300">File Info</h3>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-zinc-400">Files:</span>{" "}
                  <span className="text-white">{fileList.length}</span>
                </p>
                {fileList.map((file, index) => (
                  <div key={`${file.fileName}-${index}`} className="rounded-md border border-white/10 bg-white/5 p-2">
                    <div className="text-xs text-zinc-400">File {index + 1}</div>
                    <div className="text-white">{file.fileName}</div>
                    <div className="text-xs text-zinc-400">{file.mimeType}</div>
                    <div className="text-xs text-zinc-400">{formatBytes(file.fileSize)}</div>
                  </div>
                ))}
                {downloadError ? (
                  <p className="text-xs text-red-400">{downloadError}</p>
                ) : null}
                {invoiceError ? (
                  <p className="text-xs text-red-400">{invoiceError}</p>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-60"
                  title="Generate signed download link"
                >
                  {downloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  {downloading ? "Generating..." : "Download first"}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  disabled={downloadAllLoading}
                  className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-60"
                >
                  {downloadAllLoading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                  {downloadAllLoading ? "Preparing zip..." : "Download all"}
                </button>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleInvoiceDownload}
                disabled={invoiceLoading}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10 disabled:opacity-60"
              >
                {invoiceLoading ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} />}
                {invoiceLoading ? "Generating invoice..." : "Download Invoice"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-[#3b82f6] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#2563eb]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
