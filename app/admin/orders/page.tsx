"use client";

import { useEffect, useMemo, useState } from "react";
import OrderDetailsModal from "@/components/admin/OrderDetailsModal";
import Modal from "@/components/Modal";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CalendarRange } from "lucide-react";

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

const STATUS_OPTIONS = ["pending", "confirmed", "in_progress", "completed", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [editingStatus, setEditingStatus] = useState("pending");
  const [deletingOrder, setDeletingOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/3d-printing/orders");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to fetch orders");
        }
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const term = search.trim().toLowerCase();
    const parseDate = (value: string, isEnd?: boolean) => {
      if (!value) return null;
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return null;
      if (isEnd) {
        date.setHours(23, 59, 59, 999);
      } else {
        date.setHours(0, 0, 0, 0);
      }
      return date.getTime();
    };
    const fromValue = parseDate(dateFrom);
    const toValue = parseDate(dateTo, true);

    return orders.filter((order) => {
      const name = order.customerInfo.fullName.toLowerCase();
      const email = order.customerInfo.email.toLowerCase();
      const phone = order.customerInfo.phone.toLowerCase();
      const matchesSearch = !term || name.includes(term) || email.includes(term) || phone.includes(term);

      const created = new Date(order.createdAt);
      const createdTime = created.getTime();
      const afterFrom = fromValue === null || createdTime >= fromValue;
      const beforeTo = toValue === null || createdTime <= toValue;
      return matchesSearch && afterFrom && beforeTo;
    });
  }, [orders, search, dateFrom, dateTo]);

  const exportRows = useMemo(
    () =>
      filteredOrders.map((order) => ({
        orderId: order.orderId,
        name: order.customerInfo.fullName,
        email: order.customerInfo.email,
        phone: order.customerInfo.phone,
        address: order.customerInfo.address,
        material: order.printConfig.material,
        infill: `${order.printConfig.infillDensity}%`,
        price: order.printConfig.totalPrice,
        status: order.status || "pending",
        createdAt: new Date(order.createdAt).toLocaleString(),
      })),
    [filteredOrders]
  );

  const handleExportXls = () => {
    if (exportRows.length === 0) return;
    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    const rangeLabel = dateFrom || dateTo ? `${dateFrom || "start"}_to_${dateTo || "now"}` : "all";
    XLSX.writeFile(workbook, `orders-${rangeLabel}.xlsx`);
  };

  const handleExportPdf = () => {
    if (exportRows.length === 0) return;
    const doc = new jsPDF({ orientation: "landscape" });
    doc.text("3D Print Orders", 14, 12);
    autoTable(doc, {
      startY: 18,
      head: [[
        "Order ID",
        "Name",
        "Email",
        "Phone",
        "Material",
        "Infill",
        "Price",
        "Status",
        "Created At",
      ]],
      body: exportRows.map((row) => [
        row.orderId,
        row.name,
        row.email,
        row.phone,
        row.material,
        row.infill,
        `${row.price} BDT`,
        row.status,
        row.createdAt,
      ]),
      styles: { fontSize: 8 },
    });
    const rangeLabel = dateFrom || dateTo ? `${dateFrom || "start"}_to_${dateTo || "now"}` : "all";
    doc.save(`orders-${rangeLabel}.pdf`);
  };

  const resetActionMessages = () => {
    setActionError("");
    setActionSuccess("");
  };

  const startEdit = (order: Order) => {
    resetActionMessages();
    setEditingOrder(order);
    setEditingStatus(order.status || "pending");
  };

  const handleUpdate = async () => {
    if (!editingOrder) return;
    resetActionMessages();
    try {
      const res = await fetch("/api/3d-printing/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: editingOrder.orderId, status: editingStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update order");
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === editingOrder.orderId ? data.order : order
        )
      );
      setEditingOrder(null);
      setActionSuccess("Order updated.");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update order");
    }
  };

  const handleDelete = async () => {
    if (!deletingOrder) return;
    resetActionMessages();
    try {
      const res = await fetch("/api/3d-printing/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: deletingOrder.orderId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete order");
      setOrders((prev) => prev.filter((o) => o.orderId !== deletingOrder.orderId));
      setDeletingOrder(null);
      setActionSuccess("Order deleted.");
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to delete order");
    }
  };

  const openDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeDetails = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-dvh bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-bold">3D Print Orders</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Admin view for all incoming 3D printing orders.
        </p>

        {loading && (
          <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-6 text-center text-zinc-400">
            Loading orders...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
            {error}
          </div>
        )}
        {actionError && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {actionError}
          </div>
        )}
        {actionSuccess && (
          <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-300">
            {actionSuccess}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f1620]">
              <div className="border-b border-white/10 p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-end">
                    <div className="flex-1">
                      <label className="mb-2 block text-xs text-zinc-400">Search</label>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, email, or phone"
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#3b82f6] focus:outline-none"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-xs text-zinc-400">
                          <CalendarRange size={14} /> From
                        </label>
                        <input
                          type="date"
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-[#3b82f6] focus:outline-none md:w-[190px]"
                        />
                      </div>
                      <div>
                        <label className="mb-2 flex items-center gap-2 text-xs text-zinc-400">
                          <CalendarRange size={14} /> To
                        </label>
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-[#3b82f6] focus:outline-none md:w-[190px]"
                        />
                      </div>
                      {(dateFrom || dateTo) && (
                        <button
                          type="button"
                          onClick={() => {
                            setDateFrom("");
                            setDateTo("");
                          }}
                          className="h-10 rounded-lg border border-white/10 px-3 text-xs text-zinc-200 hover:bg-white/10 md:self-end"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={handleExportXls}
                      disabled={exportRows.length === 0}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10 disabled:opacity-60"
                    >
                      Export XLS
                    </button>
                    <button
                      type="button"
                      onClick={handleExportPdf}
                      disabled={exportRows.length === 0}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10 disabled:opacity-60"
                    >
                      Export PDF
                    </button>
                  </div>
                </div>
              </div>
              {orders.length === 0 ? (
                <div className="p-6 text-center text-zinc-400">No orders found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 text-zinc-400">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone Number</th>
                  <th className="px-6 py-4">Order Date</th>
                  <th className="px-6 py-4">Estimated Price</th>
                  <th className="px-6 py-4">Material</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredOrders.map((order) => (
                  <tr key={order.orderId} className="text-zinc-200">
                    <td className="px-6 py-4 font-mono text-xs">{order.orderId}</td>
                    <td className="px-6 py-4">{order.customerInfo.fullName}</td>
                    <td className="px-6 py-4">{order.customerInfo.email}</td>
                    <td className="px-6 py-4">{order.customerInfo.phone}</td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-[#3b82f6]">
                      {order.printConfig.totalPrice.toFixed(2)} BDT
                    </td>
                    <td className="px-6 py-4">{order.printConfig.material}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-300">
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => openDetails(order)}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => startEdit(order)}
                          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white transition hover:bg-white/10"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            resetActionMessages();
                            setDeletingOrder(order);
                          }}
                          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <OrderDetailsModal
        isOpen={isModalOpen}
        onClose={closeDetails}
        order={selectedOrder}
      />

      <Modal
        isOpen={Boolean(editingOrder)}
        onClose={() => setEditingOrder(null)}
        title="Update Order Status"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-xs text-zinc-400">Status</label>
            <select
              value={editingStatus}
              onChange={(e) => setEditingStatus(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-[#3b82f6]"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditingOrder(null)}
              className="rounded-md border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-md bg-[#3b82f6] px-3 py-1 text-xs font-semibold text-white hover:bg-[#2563eb]"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(deletingOrder)}
        onClose={() => setDeletingOrder(null)}
        title="Delete Order"
      >
        <p>
          Delete order{" "}
          <span className="font-semibold text-white">{deletingOrder?.orderId}</span>?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setDeletingOrder(null)}
            className="rounded-md border border-white/10 px-3 py-1 text-xs text-white hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-md border border-red-500/30 px-3 py-1 text-xs text-red-200 hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
}
