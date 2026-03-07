"use client"

import type { Product, Order } from "@/lib/types"
import { Download, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

interface SettingsTabProps {
  products: Product[]
  orders: Order[]
  onRefresh: () => void
}

export function SettingsTab({ products, orders, onRefresh }: SettingsTabProps) {
  function downloadJSON(data: unknown, filename: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`${filename} berhasil diunduh!`)
  }

  async function handleReset() {
    if (
      !confirm(
        "BAHAYA! Yakin ingin menghapus SEMUA data produk dan pesanan? Tindakan ini TIDAK bisa dibatalkan."
      )
    )
      return

    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      })
      toast.success("Semua data berhasil direset!")
      onRefresh()
    } catch {
      toast.error("Gagal mereset data")
    }
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-foreground">
        Pengaturan
      </h1>

      <div className="flex flex-col gap-6">
        {/* Export */}
        <div className="rounded-2xl border border-white/5 bg-card p-6">
          <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
            Export Data
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadJSON(products, "products.json")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-cyan/30 hover:bg-muted/80"
            >
              <Download className="h-4 w-4 text-cyan" />
              Export Produk (JSON)
            </button>
            <button
              onClick={() => downloadJSON(orders, "orders.json")}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-cyan/30 hover:bg-muted/80"
            >
              <Download className="h-4 w-4 text-cyan" />
              Export Pesanan (JSON)
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <h2 className="font-heading text-lg font-semibold text-destructive">
              Danger Zone
            </h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg border border-destructive bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/20"
          >
            Reset Semua Data
          </button>
        </div>
      </div>
    </div>
  )
}
