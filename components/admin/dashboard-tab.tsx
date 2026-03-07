"use client"

import type { Product, Order } from "@/lib/types"
import { formatRupiah, STATUS_COLORS } from "@/lib/types"
import { Package, ShoppingCart, Clock, CheckCircle, Check, X } from "lucide-react"
import { toast } from "sonner"

interface DashboardTabProps {
  products: Product[]
  orders: Order[]
  onRefresh: () => void
}

export function DashboardTab({ products, orders, onRefresh }: DashboardTabProps) {
  const pendingCount = orders.filter((o) => o.status === "pending").length
  const doneCount = orders.filter((o) => o.status === "done").length
  const recentOrders = [...orders].reverse().slice(0, 5)

  const stats = [
    { label: "Total Produk", value: products.length, icon: Package, color: "text-cyan" },
    { label: "Total Pesanan", value: orders.length, icon: ShoppingCart, color: "text-purple" },
    { label: "Pending", value: pendingCount, icon: Clock, color: "text-amber-400" },
    { label: "Selesai", value: doneCount, icon: CheckCircle, color: "text-emerald-400" },
  ]

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

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/5 bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 font-heading text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-2xl border border-white/5 bg-card">
        <div className="border-b border-border p-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Pesanan Terbaru
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-sm text-muted-foreground">
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Produk</th>
                <th className="px-4 py-3 font-medium">Kontak</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Belum ada pesanan.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50">
                    <td className="px-4 py-3 text-sm text-foreground">
                      {order.customerName}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      <div>{order.productName}</div>
                      <div className="text-xs text-muted-foreground">
                        {formatRupiah(order.productPrice)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {order.customerContact}
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
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateStatus(order.id, "done")}
                          className="rounded-lg p-1.5 text-emerald-400 hover:bg-emerald-400/10"
                          title="Selesai"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(order.id, "cancel")}
                          className="rounded-lg p-1.5 text-red-400 hover:bg-red-400/10"
                          title="Batalkan"
                        >
                          <X className="h-4 w-4" />
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
    </div>
  )
}
