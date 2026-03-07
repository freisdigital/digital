"use client"

import type { Order } from "@/lib/types"
import { formatRupiah, STATUS_COLORS } from "@/lib/types"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

interface OrdersTabProps {
  orders: Order[]
  onRefresh: () => void
}

export function OrdersTab({ orders, onRefresh }: OrdersTabProps) {
  const sortedOrders = [...orders].reverse()

  async function updateStatus(id: string, status: string) {
    try {
      await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      toast.success(`Status diperbarui ke ${status}`)
      onRefresh()
    } catch {
      toast.error("Gagal memperbarui status")
    }
  }

  async function deleteOrder(id: string) {
    if (!confirm("Yakin hapus pesanan ini?")) return
    try {
      await fetch(`/api/orders?id=${id}`, { method: "DELETE" })
      toast.success("Pesanan dihapus!")
      onRefresh()
    } catch {
      toast.error("Gagal menghapus pesanan")
    }
  }

  async function deleteAll() {
    if (!confirm("Yakin hapus SEMUA pesanan? Tindakan ini tidak bisa dibatalkan.")) return
    try {
      await fetch("/api/orders?id=all", { method: "DELETE" })
      toast.success("Semua pesanan dihapus!")
      onRefresh()
    } catch {
      toast.error("Gagal menghapus pesanan")
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Pesanan
        </h1>
        {orders.length > 0 && (
          <button
            onClick={deleteAll}
            className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            <Trash2 className="h-4 w-4" />
            Hapus Semua
          </button>
        )}
      </div>

      <div className="rounded-2xl border border-white/5 bg-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-sm text-muted-foreground">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Nama</th>
              <th className="px-4 py-3 font-medium">Produk</th>
              <th className="px-4 py-3 font-medium">WA/TG</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Keterangan</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-muted-foreground">
                  Belum ada pesanan.
                </td>
              </tr>
            ) : (
              sortedOrders.map((order, i) => (
                <tr key={order.id} className="border-b border-border/50">
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {sortedOrders.length - i}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="text-foreground">{order.productName}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatRupiah(order.productPrice)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {order.customerContact}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {order.customerEmail || "-"}
                  </td>
                  <td className="max-w-[200px] px-4 py-3 text-sm text-muted-foreground">
                    <span className="line-clamp-2">{order.notes || "-"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_COLORS[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => updateStatus(order.id, "done")}
                        className="rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20"
                      >
                        Selesai
                      </button>
                      <button
                        onClick={() => updateStatus(order.id, "pending")}
                        className="rounded-md bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-400 hover:bg-amber-500/20"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="rounded-md bg-red-500/10 px-2 py-1 text-xs font-medium text-red-400 hover:bg-red-500/20"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
