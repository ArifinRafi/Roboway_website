"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type OrderData = {
  orderId: string;
  createdAt: string;
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  printConfig: {
    material: string;
    infillDensity: number;
    volume: number;
    weight: number;
    pricePerGram: number;
    totalPrice: number;
  };
};

export default function InvoicePage() {
  const params = useParams<{ orderId?: string | string[] }>();
  const paramId = Array.isArray(params?.orderId) ? params?.orderId[0] : params?.orderId;
  const [resolvedOrderId, setResolvedOrderId] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (paramId) {
      setResolvedOrderId(paramId);
      return;
    }
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/");
      const last = parts[parts.length - 1];
      if (last) {
        setResolvedOrderId(last);
      }
    }
  }, [paramId]);

  useEffect(() => {
    let isMounted = true;
    const loadLogo = async () => {
      try {
        const res = await fetch("/images/roboway-og.png");
        if (!res.ok) return;
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onload = () => {
          if (isMounted) {
            setLogoDataUrl(typeof reader.result === "string" ? reader.result : null);
          }
        };
        reader.readAsDataURL(blob);
      } catch {
        // Ignore logo load errors
      }
    };
    loadLogo();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        if (!resolvedOrderId) return;
        setLoading(true);
        setError("");
        const res = await fetch(`/api/orders/${resolvedOrderId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load invoice");
        setOrder(data.order);
      } catch (err) {
        setError("Unable to load invoice details.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [resolvedOrderId]);

  const formattedDate = useMemo(() => {
    if (!order?.createdAt) return "";
    return new Date(order.createdAt).toLocaleString();
  }, [order?.createdAt]);

  const handleDownloadPdf = () => {
    if (!order) return;
    const doc = new jsPDF();
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, "PNG", 14, 12, 18, 18);
    }
    doc.setFontSize(18);
    doc.text("Roboway Technologies", 38, 20);
    doc.setFontSize(11);
    doc.text("Invoice", 38, 28);

    doc.setFontSize(10);
    doc.text(`Order ID: ${order.orderId}`, 14, 40);
    doc.text(`Date: ${formattedDate}`, 14, 46);

    autoTable(doc, {
      startY: 54,
      head: [["Customer Info", "Details"]],
      body: [
        ["Name", order.customerInfo.fullName],
        ["Email", order.customerInfo.email],
        ["Phone", order.customerInfo.phone],
        ["Address", order.customerInfo.address],
      ],
      styles: { fontSize: 9 },
    });

    const tableEnd = (doc as any).lastAutoTable?.finalY || 90;
    autoTable(doc, {
      startY: tableEnd + 10,
      head: [["Print Details", "Value"]],
      body: [
        ["Material", order.printConfig.material],
        ["Infill", `${order.printConfig.infillDensity}%`],
        ["Volume", `${order.printConfig.volume.toFixed(2)} cm³`],
        ["Weight", `${order.printConfig.weight.toFixed(2)} g`],
        ["Price/Gram", `${order.printConfig.pricePerGram} BDT`],
        ["Total", `${order.printConfig.totalPrice.toFixed(2)} BDT`],
      ],
      styles: { fontSize: 9 },
    });

    doc.save(`invoice-${order.orderId}.pdf`);
  };

  return (
    <div className="min-h-dvh bg-black text-white">
      <Navbar />
      <main className="pt-20">
        <section className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/5 p-2">
                  <img src="/images/roboway-og.png" alt="Roboway Technologies" className="h-full w-full object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">Invoice</h1>
                  <p className="text-sm text-[#4a5568]">Roboway Technologies</p>
                  <p className="text-xs text-[#4a5568]">Dhaka, Bangladesh</p>
                </div>
              </div>
              {order ? (
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold transition hover:bg-[#1d4ed8]"
                >
                  Download PDF
                </button>
              ) : null}
            </div>
            <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/5 p-4 text-sm text-[#a0aec0]">
              Thanks for ordering. We will contact you soon with order details.
            </div>

            {loading && (
              <div className="mt-6 rounded-lg border border-white/[0.08] bg-white/5 p-4 text-sm text-[#4a5568]">
                Loading invoice...
              </div>
            )}
            {error && (
              <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            {order && (
              <div className="mt-6 space-y-4 text-sm text-[#a0aec0]">
                <div className="rounded-lg border border-white/[0.08] bg-white/5 p-4">
                  <div className="text-xs text-[#4a5568]">Order ID</div>
                  <div className="mt-1 font-mono text-white">{order.orderId}</div>
                  <div className="mt-2 text-xs text-[#4a5568]">Date</div>
                  <div className="mt-1 text-white">{formattedDate}</div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-white/[0.08] bg-white/5 p-4">
                    <div className="text-xs text-[#4a5568]">Customer</div>
                    <div className="mt-1 text-white">{order.customerInfo.fullName}</div>
                    <div className="mt-2 text-xs text-[#4a5568]">Email</div>
                    <div className="mt-1 text-white">{order.customerInfo.email}</div>
                    <div className="mt-2 text-xs text-[#4a5568]">Phone</div>
                    <div className="mt-1 text-white">{order.customerInfo.phone}</div>
                    <div className="mt-2 text-xs text-[#4a5568]">Address</div>
                    <div className="mt-1 text-white">{order.customerInfo.address}</div>
                  </div>

                  <div className="rounded-lg border border-white/[0.08] bg-white/5 p-4">
                    <div className="text-xs text-[#4a5568]">Print Details</div>
                    <div className="mt-1 text-white">Material: {order.printConfig.material}</div>
                    <div className="mt-2 text-white">Infill: {order.printConfig.infillDensity}%</div>
                    <div className="mt-2 text-white">
                      Volume: {order.printConfig.volume.toFixed(2)} cm³
                    </div>
                    <div className="mt-2 text-white">
                      Weight: {order.printConfig.weight.toFixed(2)} g
                    </div>
                    <div className="mt-2 text-white">
                      Price/Gram: {order.printConfig.pricePerGram} BDT
                    </div>
                    <div className="mt-4 text-lg font-semibold text-[#60a5fa]">
                      Total: {order.printConfig.totalPrice.toFixed(2)} BDT
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
